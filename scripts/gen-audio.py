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

import asyncio, hashlib, json, os, re, sys

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

# A warm, clear, unhurried voice. Hamed is the one the parent site settled on;
# for children it is slowed down rather than swapped, so the two sites sound
# like the same language rather than two different ones.
VOICE = "ar-SA-HamedNeural"
# The English is for the CHILD here, not the parent — Reza, 2026-08-31: "the
# entire website should be auditory", and a four-year-old cannot read the gloss.
# A warm British female reads the meanings and the explanations.
EN_VOICE = "en-GB-SoniaNeural"
RATE_WORD = "-25%"     # storybook words: slow enough to copy
RATE_SOUND = "-35%"    # single letter sounds: slower still
RATE_EN = "-12%"       # explanations: unhurried, not babyish

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
        out[f"snd:{l}"] = (l + FATHA) * (3 if l in CONTINUANT else 1)
        out[f"nam:{l}"] = name
        out[norm(word)] = word
    # every word and sentence in the books
    for f in ("app.js", "book-lulu1.js", "book-bayt.js"):
        src = open(os.path.join(ROOT, f), encoding="utf-8").read()
        for w in re.findall(r"\{\s*ar:\s*'([^']+)'", src):
            out[norm(w)] = w
        for t in re.findall(r"\{\s*t:\s*'([^']+)'", src):
            out[norm(t)] = t
        for t in re.findall(r"say:\s*'([^']+)'", src):
            out[norm(t)] = t
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

# ---------------------------------------------------------------------- render
async def render(text, path, rate, voice=VOICE):
    await edge_tts.Communicate(text, voice, rate=rate).save(path)

async def main():
    os.makedirs(AUDIO, exist_ok=True)
    os.makedirs(DATA, exist_ok=True)
    todo = wanted()
    manifest, made, skipped = {}, 0, 0
    for key, text in sorted(todo.items()):
        stem = h(key)
        manifest[key] = stem
        path = os.path.join(AUDIO, stem + ".mp3")
        if os.path.exists(path) and os.path.getsize(path) > 400:
            skipped += 1
            continue
        if isinstance(text, tuple):          # ("EN", "the words")
            voice, spoken, rate = EN_VOICE, text[1], RATE_EN
        else:
            voice, spoken = VOICE, text
            rate = RATE_SOUND if key.startswith("snd:") else RATE_WORD
        try:
            await render(spoken, path, rate, voice)
            made += 1
            print(f"  {key:28s} {spoken}")
        except Exception as e:
            print(f"  !! {key}: {e}")
            if os.path.exists(path):
                os.remove(path)
            manifest.pop(key, None)
    with open(os.path.join(DATA, "audio-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=0, sort_keys=True)
    print(f"\n{made} new, {skipped} already there, {len(manifest)} clips in the manifest")

if __name__ == "__main__":
    asyncio.run(main())
