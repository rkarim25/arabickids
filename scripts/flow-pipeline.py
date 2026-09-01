"""
Google Flow & Gemini Art Pipeline for Hikayat
- Supports direct API generation via Imagen / Gemini (if Pay-as-you-go billing is enabled)
- Generates exact, style-consistent prompts for Google Flow / ImageFX / VideoFX
- Optimizes and copies downloaded images/videos into art/ and updates book scenes
"""

import os
import sys
from google import genai

API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyBWSzkRbhtVNQkzo00iaZsKQEGbsuqrvPM")

SCENES = [
    {
        "id": "bayt-1",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Front exterior of a charming English stone cottage with a red tile roof, brick chimney with gentle smoke, rustic wooden front door, flower boxes filled with yellow and pink daisies, stone pathway through lush green lawn. Soft watercolor washes, warm ink outlines, gentle morning sunlight, cozy storybook illustration style. No text, no words.",
        "target": "art/bayt1-1.jpg"
    },
    {
        "id": "bayt-2",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Warm sunlit kitchen with mint green wainscoting and wooden cabinets. A cheerful 5-year-old boy named Adam with curly dark hair and bright teal crewneck shirt reaching for a red apple on a low shelf. Soft watercolor washes, clear ink outlines, cozy children storybook art. No text, no words.",
        "target": "art/bayt1-2.jpg"
    },
    {
        "id": "bayt-3",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Cheerful children bedroom with pale yellow walls and wooden floor. A cute 2-year-old toddler girl named Maryam with twin curly hair puffs tied with red ribbons, wearing a pink pinafore dress, playing with wooden blocks on a braided rug. Soft watercolor washes, clear ink outlines, storybook art. No text, no words.",
        "target": "art/bayt1-3.jpg"
    },
    {
        "id": "bayt-4",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Cozy living room with warm peach walls and a deep red fabric sofa. A friendly father named Baba with warm brown skin, a neat dark beard and moustache, wearing a white thobe collar, looking under a cozy chair. Soft watercolor washes, clear ink outlines, storybook art. No text, no words.",
        "target": "art/bayt1-4.jpg"
    },
    {
        "id": "bayt-5",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Cozy sunlit reading nook. A fluffy ginger tabby cat named Lulu with emerald green eyes, cream muzzle, and white whiskers sitting proudly on top of a tall stack of colorful hardcover children books next to a green armchair. Soft watercolor washes, clear ink outlines. No text, no words.",
        "target": "art/bayt1-5.jpg"
    },
    {
        "id": "bayt-6",
        "book": "مَنْ فِي الْبَيْت؟",
        "prompt": "Children picture-book watercolor painting. Heartwarming family scene in a cozy living room. Baba sitting on a red sofa with a patchwork quilt, Adam sitting beside him, Maryam on his lap, and ginger tabby cat Lulu curled up purring. Soft golden lighting, watercolor washes, clear ink outlines. No text, no words.",
        "target": "art/bayt1-6.jpg"
    },
    {
        "id": "arnab-1",
        "book": "الْأَرْنَبُ وَالْقِرْد",
        "prompt": "Children comic picture-book watercolor painting. A bright sunny meadow with rolling green hills, wildflowers, and fluffy white clouds. A cute fluffy white bunny with long ears and twitchy pink nose sitting peacefully munching a bright orange carrot. Playful vibrant children book illustration, soft watercolor with ink lines. No text, no words.",
        "target": "art/arnab1-1.jpg"
    },
    {
        "id": "arnab-2",
        "book": "الْأَرْنَبُ وَالْقِرْد",
        "prompt": "Children comic picture-book watercolor painting. A lush acacia tree in a sunny meadow. A cheeky playful brown monkey with round ears and a curly tail hanging upside down by its tail from a tree branch, grinning mischeviously while holding a bright yellow banana. Playful vibrant children book illustration, soft watercolor with ink lines. No text, no words.",
        "target": "art/arnab1-2.jpg"
    },
    {
        "id": "arnab-4",
        "book": "الْأَرْنَبُ وَالْقِرْد",
        "prompt": "Children comic picture-book watercolor painting. Funny slapstick cartoon moment in a sunny meadow. A cheeky brown monkey swinging down from a vine to snatch a bright orange carrot right out of a cute white bunny paws. The bunny has wide cartoon eyes in comical surprise. Dynamic comic action lines, soft watercolor and ink. No text, no words.",
        "target": "art/arnab1-4.jpg"
    },
    {
        "id": "arnab-5",
        "book": "الْأَرْنَبُ وَالْقِرْد",
        "prompt": "Children comic picture-book watercolor painting. Fast comic chase across a sunny flower garden. A cute white bunny sprinting with ears streaming back, chasing a cheeky brown monkey who is scampering ahead holding the carrot. Cartoon speed dust trails, watercolor with crisp ink lines. No text, no words.",
        "target": "art/arnab1-5.jpg"
    },
    {
        "id": "arnab-7",
        "book": "الْأَرْنَبُ وَالْقِرْد",
        "prompt": "Children comic picture-book watercolor painting. Heartwarming ending in a sunny meadow with a soft pastel rainbow in the sky. The cute white bunny and the cheeky brown monkey sitting side by side on the grass laughing joyfully as best friends, sharing a carrot and banana, floating hearts and sparkles. Soft watercolor washes, clear ink outlines. No text, no words.",
        "target": "art/arnab1-7.jpg"
    }
]

def print_prompts():
    print("=" * 80)
    print("GOOGLE FLOW / IMAGEFX / VIDEOFX PROMPT PACK FOR HIKAYAT")
    print("=" * 80)
    for i, sc in enumerate(SCENES, 1):
        print(f"\n--- Scene {i}: {sc['id']} ({sc['book']}) -> Target: {sc['target']} ---")
        print(sc["prompt"])
    print("\n" + "=" * 80)

def try_api_generate():
    client = genai.Client(api_key=API_KEY)
    print("Testing direct API image generation with API key...")
    for sc in SCENES:
        print(f"Generating {sc['id']}...")
        try:
            resp = client.models.generate_content(
                model="gemini-3.1-flash-image",
                contents=sc["prompt"]
            )
            for part in resp.candidates[0].content.parts:
                if part.inline_data:
                    with open(sc["target"], "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"  ✓ Saved to {sc['target']}")
                    break
        except Exception as e:
            print(f"  x API limit on direct call: {e}")
            break

if __name__ == "__main__":
    if "--api" in sys.argv:
        try_api_generate()
    else:
        print_prompts()
