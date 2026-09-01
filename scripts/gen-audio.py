# Pre-generate the audio, so a sound is a FILE and not a gamble.
#
#   pip install edge-tts
#   python scripts/gen-audio.py           (incremental — skips what exists)
#
# WHY. The site was calling the browser's speechSynthesis live. Reza, 2026-08-31:
# "the sounds also arent consistent, sometimes it tapers off." He is right, and
# it is the same fault he logged on the grown-up site in August ("it said
# alhamdulil"): speechSynthesis truncates, changes voice between devices, and
# on some Androids will not say an isolated Arabic letter at all. On a site
# whose first rule is EAR FIRST, that is not a polish problem — it breaks the
# one thing the site is for. The parent site already solved it exactly this way.
#
# A pre-rendered clip plays identically every time, on every device, offline.
#
# THREE CLIPS PER LETTER, which is the other half of his message —
# "take fiy from the picture. it makes the noise fff":
#   sound  فَ      what the letter SAYS. This is what a pre-reader needs, and
#                  what tapping the big glyph now plays.
#   name   فَاء     what the letter is CALLED.
#   word   فِيل     the picture word.
# A consonant cannot be said alone without a vowel creeping in, so the sound is
# rendered as letter+fatha, which is how every Qaida voices it. For the letters
# you CAN hold (f, s, sh, m, n, l, r, z, kh, gh, th, dh, h) the sound clip is
# stretched a little, because that is what a child hears an adult do: "ffff".
#
# Output: audio/<hash>.mp3 and data/audio-manifest.json  { "<text>": "<hash>" }

import asyncio, hashlib, json, os, re, sys, unicodedata

# Windows consoles default to cp1252 and die on the first Arabic character
# printed — which turns a working run into a traceback about codecs.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

try:
    import edge_tts
except ImportError:
    sys.exit("pip install edge-tts first")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "audio")
DATA = os.path.join(ROOT, "data")

# Lively, cheerful female storyteller voice for Arabic children's books
VOICE = "ar-SA-ZariyahNeural"
# Cheerful British English companion voice
EN_VOICE = "en-GB-MaisieNeural"
RATE_WORD = "-8%"      # storybook words: lively, expressive, clear
RATE_SOUND = "-10%"    # single letter sounds: clear without slurring
RATE_EN = "+2%"        # cheerful British voice

TASHKEEL = re.compile(r"[\u064B-\u0652\u0670\u0640]")

def norm_en(s):
    return re.sub(r"\s+", " ", str(s or "").strip().lower())

def norm(s):
    """Key normalisation. MUST match norm() in js/audio.js or a clip that exists
       can never be found — 100 unreachable clips on the parent site were this."""
    s = TASHKEEL.sub("", s or "")
    s = re.sub(r"[أإآٱ]", "ا", s)
    s = s.replace("ى", "ي").replace("ة", "ه")
    s = re.sub(r"[؟،؛.!?]", "", s)
    s = re.sub(r"[^\u0600-\u06FF\s]", "", s)
    return re.sub(r"\s+", " ", s).strip()

def h(key):
    return hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]

# ---------------------------------------------------------------- collect text
def letters():
    src = open(os.path.join(ROOT, "letters.js"), encoding="utf-8").read()
    rows = re.findall(
        r"\{\s*l:\s*'(.)',\s*name:\s*'([^']+)',\s*sound:\s*'([^']*)',"
        r"[^}]*?word:\s*'([^']+)'", src)
    if not rows:
        sys.exit("could not parse LETTERS out of letters.js — has its shape changed?")
    return rows

# letters whose sound can be held; the rest get letter+fatha only
CONTINUANT = set("ث ح خ ذ ر ز س ش ص ض ظ غ ف ل م ن ه و ي".split())
FATHA = "\u064E"

def wanted():
    """every string the site will ever ask to say -> the text actually spoken"""
    out = {}
    for (l, name, sound, word) in letters():
        # ONE clean syllable, not three. This used to render (letter+fatha) x3
        # for the continuants, so ف came out as "fa-fa-fa" — a stutter, not a
        # held sound. Reza: "the letters sounds are all wrong."
        #
        # A speech engine cannot hold a bare consonant; asking it to is what
        # produced the mess. What a Qaida teacher actually says is the letter
        # WITH a fatha — فَ — and that is a real syllable, which the engine says
        # correctly. The three harakat together live in the الحَرَكَات mode.
        # ALIF IS NOT A CONSONANT and cannot take a fatha as its own sound.
        # "\u0627\u064e" is not a syllable any engine can say, so alif was coming out as
        # noise — Reza, 2026-08-31: "alif sounds like ba". What a Qaida actually
        # teaches for alif's sound is the hamza carrying the fatha: \u0623\u064e.
        out[f"snd:{l}"] = ("\u0623" if l == "\u0627" else l) + FATHA
        out[f"nam:{l}"] = name
        out[norm(word)] = word
    # every word and sentence in the books
    for f in ("app.js", "book-lulu1.js", "book-bayt.js", "books-more.js"):
        src = open(os.path.join(ROOT, f), encoding="utf-8").read()
        for w in re.findall(r"\{\s*ar:\s*'([^']+)'", src):
            out[norm(w)] = w
        for t in re.findall(r"\{\s*t:\s*'([^']+)'", src):
            out[norm(t)] = t
        for t in re.findall(r"say:\s*'([^']+)'", src):
            out[norm(t)] = t
        for w in re.findall(r"en:\s*'([^']+)'", src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\\'", "'"))
    # the sentence lessons — Arabic line, plus the ENGLISH meaning and the
    # explanation, because the whole site has to be listenable
    sp = os.path.join(ROOT, "sentences.js")
    if os.path.exists(sp):
        src = open(sp, encoding="utf-8").read()
        for w in re.findall(r"ar:\s*'([^']+)'", src):
            out[norm(w)] = w
            # EVERY WORD of a sentence is its own tap target, so every word
            # needs its own clip. Rendering only the whole line left ماما,
            # المائدة and كبيرة silent when tapped — and with no picture on
            # these screens, a silent tap gives the child nothing at all.
            for piece in w.split():
                k = norm(piece)
                if k and k not in out:
                    out[k] = piece
        # a single-quoted JS string, allowing an escaped apostrophe inside
        JS_STR = r"'((?:[^'\\]|\\.)*)'"
        for w in re.findall(r"en:\s*" + JS_STR, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\\'", "'"))
        for w in re.findall(r"why:\s*" + JS_STR, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\\'", "'"))
        # the FRAME step: the spoken permission line, and the pattern caption.
        # A mixed slot like "ureedu pen" is read by the ENGLISH voice, because
        # that is exactly how a child says it out loud.
        for w in re.findall(r"bridge:\s*" + JS_STR, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\'", "'"))
        for w in re.findall(r"say:\s*" + JS_STR, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\'", "'"))
    # ---- the Qaida ----
    # Every syllable a child taps. These are REAL syllables (بَ، بًا، بَا، أَبْ،
    # أَبَّ), which the engine says correctly — unlike a bare consonant, which is
    # what made the old letter clips a stutter. The last stage is excluded: it
    # is real Qur'anic words with the real reciter, already in audio/quran/.
    qp = os.path.join(DATA, "qaida.json")
    if os.path.exists(qp):
        Q = json.load(open(qp, encoding="utf-8"))
        for st in Q.get("stages", []):
            if st.get("id") == "kalimat":
                continue
            def add_cell(c):
                t = (c or {}).get("say") or (c or {}).get("show")
                if not t or not t.strip():
                    return
                # KEY ON THE EXACT TEXT, NOT norm(). norm() strips tashkeel, so
                # بَ, بِ and بُ all collapse to "ب" and would share one clip —
                # which destroys the only thing this stage teaches. A Qaida cell
                # IS its harakat, so the key has to keep them.
                out["q:" + t.strip()] = t.strip()
            for c in st.get("cells", []):
                add_cell(c)
            for row in st.get("rows", []):
                for c in row:
                    add_cell(c)
            for pr in st.get("pairs", []):
                add_cell(pr.get("sun"))
            for c in st.get("moon", []):
                add_cell(c)

    # ---- the no-picture stories ----
    # These matter more than the picture books: with nothing on the page but
    # words, a line without a clip is a line that says nothing at all.
    tp = os.path.join(ROOT, "stories-text.js")
    if os.path.exists(tp):
        src = open(tp, encoding="utf-8").read()
        TS = r"'((?:[^'\\]|\\.)*)'"
        for w in re.findall(r"ar:\s*" + TS, src):
            out[norm(w)] = w
            for piece in w.split():
                k = norm(piece)
                if k and k not in out:
                    out[k] = piece
        for w in re.findall(r"en:\s*" + TS, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\'", "'"))
        for w in re.findall(r"blurb:\s*" + TS, src):
            out["en:" + norm_en(w)] = ("EN", w.replace("\'", "'"))

    # ---- the surahs: every English string the module speaks ----
    # These were falling through to the browser's own voice, which is the very
    # inconsistency the whole file exists to remove. The ARABIC of an ayah is
    # never rendered here: that is a real reciter, in audio/quran/.
    sj = os.path.join(DATA, "surahs.json")
    if os.path.exists(sj):
        D = json.load(open(sj, encoding="utf-8"))
        # the CHILD glosses from surah-words.js, not the adult ones in the data
        kid_words = {}
        wp = os.path.join(ROOT, "surah-words.js")
        if os.path.exists(wp):
            wsrc = open(wp, encoding="utf-8").read()
            for k, v in re.findall(r"'([^']+)':\s*'((?:[^'\\]|\\.)*)'", wsrc):
                kid_words[unicodedata.normalize("NFC", k)] = v.replace("\\'", "'")
        for su in D.get("surahs", []):
            for a in su.get("ayat", []):
                for w in a.get("words", []):
                    g = (kid_words.get(unicodedata.normalize("NFC", w.get("ar", "")))
                         or w.get("say") or w.get("en"))
                    if g:
                        out["en:" + norm_en(g)] = ("EN", g)
    np = os.path.join(ROOT, "surah-notes.js")
    if os.path.exists(np):
        src = open(np, encoding="utf-8").read()
        JS2 = r"'((?:[^'\\]|\\.)*)'"
        for w in re.findall(r":\s*" + JS2, src):
            t = w.replace("\'", "'").strip()
            if len(t.split()) >= 2 and re.search(r"[A-Za-z]", t):
                out["en:" + norm_en(t)] = ("EN", t)

    # spoken instructions, so no screen needs reading
    for line in ["Listen.", "What does it mean?", "How it works.",
                 "Now you say it.", "Change one word.", "Well done!",
                 "Tap a word to hear it."]:
        out["en:" + norm_en(line)] = ("EN", line)
    # Lulu's lines and the praise words
    for extra in ["مَرْحَبًا! هَيَّا نَقْرَأ", "أَحْسَنْت", "اِسْمَعْ جَيِّدًا",
                  "مُمْتَاز", "مَرَّة أُخْرَى", "النِّهَايَة"]:
        out[norm(extra)] = extra
    return {k: v for k, v in out.items() if (v[1] if isinstance(v, tuple) else v).strip()}

async def render(text, path, rate, voice=VOICE, pitch="+0Hz"):
    await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(path)

# THE FILENAME HASHES THE KEY, NOT THE TEXT — and that is a trap, because the
# render is incremental. Change WHAT a key says (as the alif fix above does) and
# the file for that key already exists, so it is skipped and the old, wrong
# audio is served forever. HANDOVER used to claim filenames hash the text; they
# do not, and believing that cost a round of "why is this still wrong".
#
# So the spoken text of every clip is recorded beside the manifest, and a clip
# whose text has CHANGED is re-rendered even though its file is there.
TEXTS = os.path.join(DATA, "audio-texts.json")

def previous_texts():
    try:
        with open(TEXTS, encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

async def main():
    force = "--force" in sys.argv
    os.makedirs(AUDIO, exist_ok=True)
    os.makedirs(DATA, exist_ok=True)
    todo = wanted()
    was = previous_texts()
    spoken_now = {}
    manifest, made, skipped, restated = {}, 0, 0, 0
    for key, text in sorted(todo.items()):
        stem = h(key)
        manifest[key] = stem
        said = text[1] if isinstance(text, tuple) else text
        spoken_now[key] = said
        changed = force or (key in was and was[key] != said)
        if changed and not force:
            restated += 1
        path = os.path.join(AUDIO, stem + ".mp3")
        if not force and os.path.exists(path) and os.path.getsize(path) > 400 and not changed:
            skipped += 1
            continue
        pitch = "+0Hz"
        if isinstance(text, tuple):          # ("EN", "the words")
            voice, spoken, rate, pitch = EN_VOICE, text[1], RATE_EN, "+0Hz"
        elif key.startswith("q:") or key.startswith("snd:") or key.startswith("nam:"):
            # Qaida syllables & single letters: clear, precise, authentic Tajweed pronunciation
            voice, spoken, rate, pitch = VOICE, text, "-10%", "+0Hz"
        else:
            # Storybook sentences and lively narration
            voice, spoken, rate, pitch = VOICE, text, RATE_WORD, "+4Hz"
        try:
            await render(spoken, path, rate, voice, pitch)
            made += 1
            print(f"  {key:28s} {spoken}")
        except Exception as e:
            print(f"  !! {key}: {e}")
            if os.path.exists(path):
                os.remove(path)
            manifest.pop(key, None)
    with open(os.path.join(DATA, "audio-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0, sort_keys=True)
    with open(TEXTS, "w", encoding="utf-8") as f:
        json.dump(spoken_now, f, ensure_ascii=False, indent=0, sort_keys=True)
    print(f"\n{made} new ({restated} because their TEXT changed), "
          f"{skipped} already there, {len(manifest)} clips in the manifest")

if __name__ == "__main__":
    asyncio.run(main())
