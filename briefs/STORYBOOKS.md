# Storybook briefs — the text is written; the pictures are not

Reza, 2026-09-06: *"for any stories with pictures build it out without the
pictures and leave notes for AI to complete it."*

Done. The six books below exist **as picture-free stories** in
`stories-text.js` (ids in the headings, each marked `art: 'pending'`), with
audio, on the site now, and on the path as each station's first step. What
is left is the art. This file is the brief for whichever AI makes it
(Antigravity, or any image model), one prompt per line.

Read `DESIGN.md` §1 before drawing. The rules that bind pictures:

1. **The picture carries the meaning.** A child who reads nothing must get
   the line from the picture alone. If the line is *Lulu is on a bed*, the
   picture is Lulu on a bed and nothing competing. Function words (فِي,
   فَوْقَ, تَحْتَ, مَعَ) get their **relation** drawn: same object, moved.
2. **Same cast, same clothes, every page.** Character sheets:
   `NOTEBOOKLM_KIDS_ARABIC.md` §2 — Adam (5, curly dark hair, teal
   sweater), Maryam (2, twin hair puffs, red bows, pink floral dress), Baba
   (beard, white thobe), Mama (soft teal hijab, coral collar), Lulu (plump
   ginger tabby, green eyes), plus the elephant from the fables.
3. **Style:** warm watercolor, sunny home interiors, like
   `art/lulu1-cover.jpg`. Landscape 1024 × 768. No text in the image, no
   Latin letters anywhere, no speech bubbles.
4. **Nothing scary, nothing loud.** A "no" is a gentle head-shake, never a
   frown at the child.

## How to attach the pictures once they exist

Two ways; the first is less work and keeps the story on the path as it is.

**A. Illustrate the text story in place** (preferred). Put the JPGs in
`art/<story-id>/01.jpg … NN.jpg` (one per line, numbered from 1) and add to
the story object `art: { dir: 'art/<story-id>', pages: NN }`. The text-story
reader will need one small change to show `art/<id>/<n>.jpg` above line *n*
when present — note it in `text-story-ui.js`; `test-stories-text.js` must
keep rejecting `<img` **inside** the story object, so the reader builds the
tag, the data never contains it. Run `node scripts/sync-sw.js`.

**B. Make it a picture book** on the other shelf: a `book-<id>.js` in the
shape of `book-lulu1.js` (`words`, `pages`, `game`), art via `artIcon()`,
then the three edits (file, `index.html` before `kids.js`, `sw.js`), and add
`{ "type": "book", "ref": "<id>" }` as a later step of the same station in
`data/path.json`. Keep the text story too; the path wants both.

Either way, finish with all nine suites and `node scripts/sync-sw.js`.

---

## 1 · «لُولُو جَائِعَة» *Lulu is hungry* — L1 · `lulu-jaia` · station s01

Setting: the kitchen, morning light. Adam is the one talking to Lulu.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | هَذِهِ لُولُو. | Lulu sitting on the kitchen rug, looking up, tail curled. |
| 2 | لُولُو جَائِعَة. | Lulu beside an empty bowl, one paw on its rim, hopeful. |
| 3 | أَنَا هُنَا. | Adam in the kitchen doorway, hand raised in a small wave. |
| 4 | هَذَا أَدَم. | Adam kneeling to Lulu, pointing at himself. |
| 5 | مَاذَا تُرِيدُ؟ | Adam palms up, asking; Lulu looking at the fridge. |
| 6 | أُرِيدُ لَبَن. | Lulu with both paws on a milk carton. |
| 7 | هَذَا لَبَن يَا لُولُو. | Adam pouring milk into the bowl. |
| 8 | لَبَن لَذِيذ! | Lulu lapping, milk drops on her whiskers, eyes closed happily. |
| 9 | أُرِيدُ مَاء. | Lulu pawing at the tap over the sink. |
| 10 | هَذَا مَاء. | Adam holding a small bowl of water down to her. |
| 11 | وَأُرِيدُ عَصِير! | Lulu stretching up towards a jug of orange juice on the table. |
| 12 | لَا يَا لُولُو! | Adam gently shaking his head, hand over the jug. |
| 13 | لَا عَصِير هُنَا. | The jug moved to a high shelf; Lulu below looking up. |
| 14 | هَذَا بَابَا. | Baba entering, tall, smiling, morning light behind him. |
| 15 | بَابَا كَبِير. | Baba standing full height beside the tiny Lulu, same frame. |
| 16 | لُولُو صَغِيرَة. | Close on Lulu looking very small next to one of Baba's feet. |
| 17 | أُرِيدُ بَابَا! | Lulu leaping up at Baba, paws out. |
| 18 | لُولُو مَعَ بَابَا. | Baba holding Lulu against his shoulder, both content. Cover image. |

## 2 · «فِيل فِي دَار» *An elephant in a house* — L1 · `feel-dar` · station s02

Setting: the front door and the small living room. The elephant is gentle
and slightly embarrassed to be so big.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | هَذَا فِيل. | An elephant standing at the open front door, filling it. |
| 2 | فِيل كَبِير! | Adam looking up at the elephant, mouth open, tiny by comparison. |
| 3 | فِيل هُنَا. | The elephant has stepped inside; trunk curled politely. |
| 4 | مَاذَا تُرِيدُ يَا فِيل؟ | Adam palms up, asking the elephant. |
| 5 | أُرِيدُ مَاء. | The elephant pointing with its trunk at a jug. |
| 6 | هَذَا مَاء يَا فِيل. | Adam holding up a bucket of water. |
| 7 | مَاء كَثِير! | The elephant spraying water from its trunk, Adam laughing, puddles. |
| 8 | أُرِيدُ دَار. | The elephant pointing at the house's roof, hopeful. |
| 9 | هَذِهِ دَار. | Adam gesturing at the small living room. |
| 10 | فِيل فِي دَار! | The elephant squeezed into the room, ceiling on its head, sofa pushed aside. |
| 11 | دَار صَغِيرَة. | Same room, the elephant's back bending the ceiling lamp. |
| 12 | فِيل كَبِير. | Its rump still sticking out of the front door. |
| 13 | هَذِهِ لُولُو. | Lulu appearing between the elephant's legs. |
| 14 | لُولُو صَغِيرَة. | Lulu beside one elephant foot, the foot bigger than her. |
| 15 | مَاذَا تُرِيدُ يَا لُولُو؟ | Adam kneeling to Lulu, asking. |
| 16 | أُرِيدُ فِيل! | Lulu stretching up at the elephant, wanting to climb. |
| 17 | فِيل مَعَ لُولُو. | Lulu asleep on top of the elephant's head; the elephant smiling. Cover. |

## 3 · «أَيْنَ مَامَا؟» *Where is Mama?* — L2 · `ayna-mama` · station s03

Setting: four rooms of the house; the same table appears twice (lines 6 and
17) so the child can recognise it.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | مَرْيَم فِي الْبَيْت. | Maryam in the hallway, holding her bear. |
| 2 | أَيْنَ مَامَا؟ | Maryam looking around, hand shading her eyes. |
| 3 | مَامَا فِي الْمَطْبَخ؟ | Maryam peeking round the kitchen door. |
| 4 | لَا. أَدَم فِي الْمَطْبَخ. | Adam at the kitchen table, alone, waving. |
| 5 | عِنْدِي كِتَاب. | Adam holding up a picture book. |
| 6 | الْكِتَاب فَوْقَ الْمَائِدَة. | The book lying on the table, Adam's hands off it. |
| 7 | مَامَا فِي الْغُرْفَة؟ | Maryam peeking into the bedroom. |
| 8 | لَا. لُولُو فِي الْغُرْفَة. | The bedroom, only Lulu in it. |
| 9 | أَيْنَ لُولُو؟ | Maryam looking left and right in the bedroom. |
| 10 | لُولُو فَوْقَ سَرِير. | Lulu curled on top of the bed. |
| 11 | لُولُو فِي الْبَيْت. | Wide shot: the house cut-away, Lulu on the bed, Maryam in the hall. |
| 12 | هَلْ عِنْدَكَ مَاء؟ | Maryam holding an empty cup out to Adam. |
| 13 | مَا عِنْدِي مَاء. | Adam turning his empty hands out. |
| 14 | مَامَا عِنْدَهَا مَاء! | Maryam brightening, pointing off-frame. |
| 15 | مَامَا! أَيْنَ أَنْتِ؟ | Maryam calling, hands cupped at her mouth. |
| 16 | هَذَا بَابَا. | Baba in the doorway, finger to his lips, smiling, pointing down. |
| 17 | مَامَا تَحْتَ الْمَائِدَة! | Mama crouched under the kitchen table with a jug of water, giggling. |
| 18 | وَلُولُو تَحْتَ الْمَائِدَة! | Same, Lulu now under the table too, Maryam crawling in to join. Cover. |

## 4 · «مَنْ قَالَ مِيَاو؟» *Who said miaow?* — L3 · `man-qala` · station s05

Setting: evening, warm lamps. The mystery is gentle; everyone is amused.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | أَدَم فِي الْبَيْت. | Adam on the sofa with a book, lamp lit. |
| 2 | كَيْفَ حَالُكَ؟ | Mama leaning in the doorway, asking. |
| 3 | أَنَا سَعِيد. | Adam grinning, thumbs up. |
| 4 | مِيَاو! | Adam's ears pricked; a sound line drawn as a small curl from off-frame. |
| 5 | مَنْ قَالَ مِيَاو؟ | Adam standing, looking round the room, finger up. |
| 6 | قَالَ بَابَا: لَيْسَ أَنَا. | Baba shrugging, palms up, newspaper on his lap. |
| 7 | قَالَتْ مَامَا: لَيْسَ أَنَا. | Mama shaking her head, holding a tea tray. |
| 8 | مِيَاو! مِيَاو! | Two sound curls from the hallway. |
| 9 | أَيْنَ لُولُو؟ | Adam looking under the sofa. |
| 10 | لُولُو فِي صُنْدُوق؟ لَا. | An empty cardboard box, Adam peering in. |
| 11 | قَالَ الْفِيل: أُرِيدُ عَصِير! | The elephant's head at the window, trunk pointing at a juice jug. |
| 12 | لَيْسَ الْفِيل! | Adam laughing, waving the elephant off. |
| 13 | قَالَ بَابَا: هَيَّا. | Baba up, beckoning Adam towards the hallway. |
| 14 | هَيَّا إِلَى الْغُرْفَة. | Baba and Adam tiptoeing to the bedroom door. |
| 15 | مِيَاو! هَذِهِ مَرْيَم! | Maryam on the bed on all fours, saying miaow to Lulu. |
| 16 | مَرْيَم قَالَتْ مِيَاو! | Everyone in the doorway laughing; Maryam pleased. |
| 17 | وَلُولُو قَالَتْ: مِيَاو. | Lulu answering Maryam nose to nose. |
| 18 | أُحِبُّ أُمِّي. | Adam hugging Mama round the waist. |
| 19 | وَأُحِبُّ لُولُو! | Adam holding Lulu up, cheek to cheek. Cover. |

## 5 · «الشَّمْسُ وَالْقَمَر» *The sun and the moon* — L4 · `shams-qamar` · station s06

Setting: the market by day, the house by night. The sun and moon should be
drawn the same size and place in the sky, so the child sees the swap.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | فِي الصَّبَاحِ الشَّمْسُ فِي السَّمَاءِ. | A big warm sun over the rooftops, morning. |
| 2 | قَالَ أَدَم: الشَّمْسُ كَبِيرَةٌ وَجَمِيلَةٌ. | Adam at the window, arms wide at the sun. |
| 3 | ذَهَبَ أَدَم مَعَ بَابَا إِلَى السُّوقِ. | Adam and Baba walking hand in hand towards market stalls. |
| 4 | اِشْتَرَى بَابَا الْخُبْزَ وَالتُّفَّاحَ. | Baba at a stall taking bread and red apples. |
| 5 | قَالَ أَدَم: أُرِيدُ الْمَوْزَ! | Adam pointing at a hanging bunch of bananas. |
| 6 | قَالَ بَابَا: هَذَا الْمَوْزُ لَكَ يَا أَدَم. | Baba handing Adam the bananas, Adam delighted. |
| 7 | رَجَعَا إِلَى الْبَيْتِ وَالشَّمْسُ فَوْقَ الْجَبَلِ. | The two walking home, sun low over a mountain, long shadows. |
| 8 | جَاءَ اللَّيْلُ وَذَهَبَتِ الشَّمْسُ. | The same skyline, now dark blue, the sun gone. |
| 9 | نَظَرَ أَدَم مِنَ الْبَابِ. | Adam at the open front door looking up. |
| 10 | الْقَمَر جَمِيل. | A full moon where the sun was in line 1. |
| 11 | النُّجُومُ فِي السَّمَاءِ وَالْقَمَرُ مَعَهَا. | The moon among many stars. |
| 12 | قَالَتْ مَرْيَم: أَيْنَ لُولُو؟ | Maryam in pyjamas looking behind the door. |
| 13 | لُولُو فِي السَّلَّةِ مَعَ الْمَوْزِ! | Lulu asleep in the market basket, bananas around her. |
| 14 | نَامَ الْبَيْتُ تَحْتَ الْقَمَرِ. | The house from outside, one window lit, moon above. Cover. |

## 6 · «يَوْم مَرْيَم» *A day with Maryam* — L5 · `yawm-maryam` · station s07

Setting: one full day. Lines 3, 6 and 8 are the duas; draw the mouth
closed and the hands still, a quiet moment, not a performance. Line 12 is
an ayah: draw the open page and the lamp, never the text.

| line | Arabic | picture prompt |
|---|---|---|
| 1 | فِي الصَّبَاحِ قَامَتْ مَرْيَم مِنَ النَّوْمِ. | Maryam sitting up in bed, sun through the curtain. |
| 2 | قَالَتْ مَامَا: مَاذَا نَقُولُ فِي الصَّبَاحِ؟ | Mama at the bedside, asking gently. |
| 3 | قَالَتْ مَرْيَم: الْحَمْدُ لِلَّهِ. | Maryam, hands in her lap, calm smile. |
| 4 | جَلَسَتْ مَرْيَم مَعَ أَدَم لِلْفُطُورِ. | Breakfast table, Maryam in a high chair beside Adam. |
| 5 | قَالَ أَدَم: مَاذَا نَقُولُ قَبْلَ الطَّعَامِ؟ | Adam pausing with bread in hand, looking at Maryam. |
| 6 | قَالَتْ مَرْيَم: بِسْمِ اللَّهِ. | Maryam, plate in front, hands still, about to eat. |
| 7 | أَكَلَتْ مَرْيَم الْخُبْزَ وَشَرِبَتِ اللَّبَنَ. | Maryam eating bread, a cup of milk. |
| 8 | وَبَعْدَ الطَّعَامِ قَالَتْ: الْحَمْدُ لِلَّهِ. | Empty plate, Maryam content. |
| 9 | ذَهَبَ بَابَا إِلَى الْمَسْجِدِ وَقَالَ: هَيَّا يَا أَدَم. | Baba at the door in his thobe, beckoning Adam, masjid dome down the street. |
| 10 | لَعِبَتْ مَرْيَم مَعَ لُولُو فِي الْبَيْتِ. | Maryam and Lulu with a ball on the rug. |
| 11 | جَاءَ اللَّيْلُ وَقَالَتْ مَامَا: قَبْلَ النَّوْمِ نَقْرَأُ. | Evening, Mama with a small book at the bedside. |
| 12 | قَرَأَتْ مَرْيَم: قُلْ هُوَ اللَّهُ أَحَدٌ. | Maryam looking at the open book, lamp lit; no text visible. |
| 13 | نَامَتْ مَرْيَم وَنَامَتْ لُولُو فَوْقَ السَّرِيرِ. | Maryam asleep, Lulu curled on the blanket. |
| 14 | وَفِي الصَّبَاحِ قَالَتْ: الْحَمْدُ لِلَّهِ. | Morning again, same bed, Maryam sitting up smiling. Cover. |

---

## Checklist before saying a book is illustrated

- [ ] one picture per line, numbered, same cast and clothes throughout
- [ ] every picture shows the line's meaning with the text hidden
- [ ] no letters of any alphabet in any image
- [ ] attached by method A or B above; `art: 'pending'` removed or replaced
- [ ] all nine suites pass; `node scripts/sync-sw.js` run
- [ ] `build-status.js`: the story leaves *waiting*; `HANDOVER.md` §3 counts updated
