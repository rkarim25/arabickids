# Painting the books — briefs for Gemini

Reza generates, Claude wires in. This file is the running list of what to ask
for and, just as importantly, **how to keep the family looking like the same
family from one book to the next.**

---

## 0. The rules that matter more than any single picture

1. **NO TEXT ANYWHERE IN THE IMAGE.** Not Arabic, not English, not a sign on a
   wall, not a book cover in the background. Image models garble Arabic script,
   and the Arabic on these pages has to stay as real text in the page anyway —
   that is what makes every word tappable, which is the whole reader.
2. **Do the reference sheet first (§1) and attach it to every later prompt.**
   Without it the children change face between pages, and a child who tracks a
   story by recognising who is who loses the thread. This is the single thing
   most likely to go wrong.
3. **Download the real file, do not screenshot it.** The first one arrived at
   583px wide and is slightly soft on a tablet. Use Gemini's download button.
   Anything from about 1200px wide is plenty.
4. **4:3-ish landscape**, and keep the important action in the middle — the
   frame is 800×520, so a little is lost at top and bottom on some screens.
5. **Name the file as this document says** (`hadiqa-3.png` etc). Then they can
   be wired in without a round of "which one is this?".
6. **One idea per picture.** The picture has to carry the sentence on its own to
   a child who cannot read a word of it (DESIGN.md rule 2). If a page says
   "there is a bee on the rose", the bee is on the rose and large enough to see.

---

## 1. FIRST: the reference sheet

Generate this **once**, keep the file, and attach it to every prompt afterwards.
Save as `art/cast-reference.png`.

```
A character reference sheet for a children's picture book, soft watercolour
style, plain cream background, all six characters standing in a row facing
forward, full body, evenly spaced, clear gaps between them, no text or labels
anywhere.

From left to right:
1. ADAM — a boy of about five. Warm brown skin, short black curly hair, big
   dark eyes, green long-sleeved t-shirt, blue trousers, bare feet. Cheerful.
2. MARYAM — a girl of about four. Warm brown skin, black hair in two little
   puffs tied with red bands, a dusty-rose pinafore dress over a cream top,
   red shoes. Slightly shy smile.
3. MAMA — a woman in her thirties. Warm brown skin, soft teal headscarf worn
   loosely, long mustard-yellow dress, calm and kind.
4. BABA — a man in his thirties. Warm brown skin, short black hair, a neat full
   black beard, cream long shirt over grey trousers, relaxed and friendly.
5. JADDA (grandmother) — a woman in her sixties. Warm brown skin, silver hair
   under a soft lilac headscarf, small round glasses, a long dusty-purple
   dress, a warm crinkly smile.
6. LULU — a small round ginger tabby cat, cream chest and paws, big round green
   eyes, a permanently pleased expression. Cat-sized, not stylised into a
   cartoon person.

Soft watercolour with visible paper texture, warm muted palette, gentle rounded
shapes, no hard black outlines, friendly and calm. No text of any kind.
```

**Check before you keep it:** six characters, all facing forward, no writing
anywhere. If Lulu comes out huge or standing on two legs, regenerate — she has
to read as an ordinary cat.

---

## 2. The style line — paste this in front of every scene prompt

```
Soft watercolour children's book illustration with visible paper texture. Warm
cream background, gentle muted palette, rounded friendly shapes, no hard black
outlines. Wide landscape scene, 4:3. Use the exact same characters, faces,
clothes and colours as the attached reference sheet. Absolutely no text,
letters, numbers or writing anywhere in the image.
```

---

## 3. Book in progress: «حَدِيقَةُ جَدَّتِي» — Grandmother's Garden

**Level 3 (Yellow أَصْفَر).** The band where characters start to speak — قَالَ and
قَالَتْ carry the book — and where shadda and tanween arrive. Which is why the
grandmother is in it: جَدَّتِي has the shadda, and a new person to talk to is
what makes all the speaking natural rather than bolted on.

The joke is the last two pages, and it is Lulu, because on this site the joke
is the drill.

Eight images. Save each as `art/<name>.png` — Claude converts to WebP.

| # | file | the Arabic on the page | what the picture must show |
|---|---|---|---|
| 0 | `hadiqa-cover.png` | (title page) | the garden, wide and inviting |
| 1 | `hadiqa-1.png` | هَذِهِ حَدِيقَةُ جَدَّتِي. | grandmother in her garden |
| 2 | `hadiqa-2.png` | قَالَتْ جَدَّتِي: اُنْظُرْ يَا أَدَم! | she points something out to Adam |
| 3 | `hadiqa-3.png` | عَلَى الْوَرْدَةِ نَحْلَةٌ صَغِيرَة. | a bee on a red rose |
| 4 | `hadiqa-4.png` | قَالَ أَدَم: أَيْنَ لُولُو؟ | Adam looking around, no cat |
| 5 | `hadiqa-5.png` | لُولُو فَوْقَ شَجَرَةٍ عَالِيَة! | Lulu stuck up a tall tree |
| 6 | `hadiqa-6.png` | قَالَتْ جَدَّتِي: وَأَيْنَ الْكَعْك؟ | empty cake plate on the table |
| 7 | `hadiqa-7.png` | أَكَلَتْهُ لُولُو أَيْضًا! | Lulu, crumbs on her face, unrepentant |

### The prompts

**0 — cover** → `hadiqa-cover.png`
```
[style line] A sunny walled garden seen wide: a low stone wall with pink and
red roses climbing it, a small apple tree on the right, a wooden bench, a
watering can on the grass, butterflies. Nobody in the picture yet. Warm
late-afternoon light. No text anywhere.
```

**1** → `hadiqa-1.png`
```
[style line] JADDA the grandmother standing in her walled garden among the
rose bushes, one hand resting on a watering can, smiling warmly towards the
viewer. The same garden as before: stone wall, climbing roses, apple tree on
the right, wooden bench. No text anywhere.
```

**2** → `hadiqa-2.png`
```
[style line] JADDA crouching down beside ADAM in the garden, one arm around
him, her other hand pointing towards a rose bush on the left. Adam looking
where she points, eyes wide with interest. Same garden, same bench and wall.
No text anywhere.
```

**3** → `hadiqa-3.png`
```
[style line] A close-up of a single large red rose filling the middle of the
picture, with one fat friendly bumblebee resting on its petals. Soft blurred
green garden behind. The bee is clearly visible and clearly ON the flower.
No text anywhere.
```

**4** → `hadiqa-4.png`
```
[style line] ADAM standing in the middle of the garden looking around him with
both hands turned up, puzzled, searching for something. No cat anywhere in the
picture. Same garden, wooden bench, stone wall, apple tree on the right.
No text anywhere.
```

**5** → `hadiqa-5.png`
```
[style line] Looking up at the apple tree: LULU the ginger cat sitting high on
a branch among the leaves looking pleased with herself. Below, small at the
bottom of the frame, ADAM and JADDA looking up at her. Blue sky through the
leaves. No text anywhere.
```

**6** → `hadiqa-6.png`
```
[style line] A wooden garden table with a pretty flowered plate on it, and the
plate is EMPTY except for a few crumbs. JADDA standing behind it with her hands
on her hips, eyebrows raised. Same garden behind her. No text anywhere.
```

**7** → `hadiqa-7.png`
```
[style line] Close-up of LULU the ginger cat sitting on the grass with cake
crumbs on her nose and whiskers, looking completely unbothered and rather
pleased. ADAM and JADDA behind her, laughing. Warm and funny. No text anywhere.
```

---

## 4. When the files land

Drop them in `art/` and say so. Claude then:

- converts to WebP (the first one went 306KB → 25KB),
- builds `book-hadiqa.js` with the Arabic above,
- runs `test-books.js`, which enforces the Level 3 band on the actual
  sentences — no sun-letter اَلْ, at most six words a line, every word vowelled —
  and now also fails if a painted scene is referenced but the file is missing,
- registers it in `index.html` and `sw.js` (three edits, trap 10),
- `sync-sw.js`, then deploy.

Paintings are **not** in the service worker's eager CORE list, on purpose: the
shell has to install fast, and `sw.js` runtime-caches every same-origin file it
serves, so a scene is available offline from the first time it is seen.

## 5. Later, if this works

The picture shelf is the thin one — seven books, one each at Levels 3, 4 and 5.
The existing vector scenes can be repainted the same way, a book at a time,
starting with «أَيْنَ لُولُو؟» whose couch scene is already painted.

**What must NOT be painted:** the قِصَص بِلَا صُوَر shelf. Those stories have no
pictures by design — that is the step where reading actually begins, and the
words have to do the work (DESIGN.md §2). And the printables stay black-on-white
Twemoji, because watercolour does not print on a home printer.
