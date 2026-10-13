# Enotri Wine Imports: Instagram voice and content

The brand's full reference is `references/brand-guidelines.html` at the repo root (essence, voice, colour, type, imagery). This file adapts it for Instagram. If the two disagree, the brand guidelines win.

**Facts come from:** `Enotriwebsite/src/lib/portfolio.ts`
- `producers[]`: name, region, country, farming, summary, story paragraphs, and gallery captions
- `wines[]`: name, producer, region, colour, grapes/appellation, note, producerUrl

## Voice: a museum label, not a wine-list blurb

Give a fact, a place, a name, and then stop. Confidence comes from specifics, not from stacked adjectives.

- Name the place and the person before the tasting note.
- Use at most one adjective per sentence. A noun or a number usually does more work.
- Write in sentence case. No exclamation marks and no emoji. Both read as wine marketing, and Enotri is the opposite of that.
- Keep it warm, polished, and boutique. The grower is the hero, not Enotri.
- Don't list team members or show them in posts. The public brand is founder-led (`context/team.md`).

| Write like this | Not like this |
|---|---|
| Nebbiolo, Langhe. Hand-harvested, October. | Indulge in this exquisite, show-stopping red! |
| Four generations on the same hillside in Mango. | A luxurious explosion of bold flavour. |
| Chosen for the ground it came from. | The perfect wine for every occasion. |

**Words to avoid:** indulge, exquisite, luxurious, decadent, show-stopping, explosion of flavour, must-try, perfect for any occasion, elevate, game-changer, sip sip hooray, wine o'clock, and any health word (antioxidants, guilt-free, clean wine, "no headache"; see the compliance file).

## Caption shape

1. **Hook (first line, under ~125 characters):** a place plus a person, or a concrete fact. *"Mango, Piedmont. The Ferrero family has farmed these hills since 1905."*
2. **Body (2–4 short paragraphs, 60–180 words in total):** follow the brand's order of land, then grower, then the wine. Each paragraph carries one idea.
3. **Call to action:** match it to the audience. Use one only.
   - Trade: *"Trade buyers: request the price list. Link in bio."*
   - Consumers: *"Available in Alberta. Ask your local wine shop to bring it in."* Name a specific shop or restaurant only when Rawlings confirms it stocks or pours the wine.
   - Events: date, venue, and how to book, all confirmed by Rawlings.
4. **Hashtags (3–5, on their own final line).**

Leave out prices. Each retailer sets its own retail price, and the agency's wholesale price has to be identical for every licensee (AGLC 3.8.1). Send people to the price list or their shop instead.

## Content pillars

These follow the website's own story: land, then growers, then process, then estate, then invitation.

| Pillar | What the post does | Best format | Share of posts |
|---|---|---|---|
| **The Land** | One site's soil, slope, altitude, or climate, and why it shapes the wine | Single image or carousel | ~25% |
| **The Growers** | The family or person, how long they've farmed, how they work | Carousel | ~25% |
| **The Bottle** | One wine: grapes, place, how it's made, a food pairing | Single image | ~20% |
| **Harvest & Cellar** | Process and the season's work | Reel or carousel | ~10% |
| **Founder & Enotri** | Rawlings, why these growers, bringing them to Alberta | Single image or Reel | ~10% |
| **Invitation** | Wine dinners, tastings, chef collaborations, new arrivals, the price list | Single image | ~10% |

**Carousel pattern for a grower story (5–7 slides):**
1. Cover: the strongest landscape or portrait, with 2–6 words of text (the place name).
2. Land: one fact about soil, slope, or altitude.
3. People: who farms it, and since when.
4. Method: farming and cellar work, in one or two facts.
5. The wine or wines Enotri imports: name and appellation.
6. Optional: a food pairing or where to find it.
7. Close: the Enotri wordmark on Cellar Charcoal, plus the CTA.

## Visuals

**Look and feel:** documentary, natural light, human-scaled. Sun-warmed and slightly desaturated, never a glossy "wine marketing" grade, never a styled flat-lay. Show a hand in soil, a working cellar, a real table.

**Where the images are (best first):**
1. `Enotriwebsite/media-library/producers/<producer>/…`: high-res originals, the best quality at 1080px.
2. `Enotriwebsite/public/images/producers/<slug>/` and `public/images/site/`: web-optimised versions. The `gallery` captions in `portfolio.ts` are approved and accurate, so reuse them as fact sources for the photo.
3. `assets/` at the repo root: bottle shots, producer photos, certification logos, the Enotri logo.

Producer photos come from the producers' own sites (`Enotriwebsite/public/images/producers/SOURCES.md`). Tag the producer on any post that uses their photos. If there's any doubt the producer is happy with social use, add `[CONFIRM: image permission from <producer>]`.

**Text on images:**
- Headlines in Fraunces. Small labels in DM Sans, uppercase, letter-spaced.
- Warm Paper `#F0E8DC` text on Cellar Charcoal `#0D0D0C`, or on a dark scrim over the photo.
- Harvest Gold `#D2A16D` for one accent only (a label, a rule, a single word). Never use it as a fill.
- Keep the wordmark Warm Paper on a dark ground. Never put it on an unmasked photo, and never recolour it.
- Use the least text that does the job. A good photo with a place name beats a photo with three lines of copy.

**Bottle shots:** most bottle images are narrow cut-outs on white (for example `assets/langhe-nebbiolo-nvie.jpg`, 309×1200). Place them centred on a 1080×1350 Cellar Charcoal canvas rather than posting the white-background file.

**People in photos:** everyone must clearly look like an adult (house rule: 25 or older), and a social scene can show no more than one glass per person. See `compliance.md`.

**Known no-go images.** Add to this list whenever a check rules an image out:
- `assets/federico-ferrero-family.jpg` and `Enotriwebsite/public/images/site/federico-ferrero-family.webp`: two children in frame.

## Hashtags

Use 3–5, and pick the specific ones over the popular ones:
- **Local (1–2):** #yegwine, #albertawine, #yycwine, #yegfood
- **Place or grape (1–2), taken from portfolio.ts:** for example #langhe, #nebbiolo, #soave, #verdicchio, #abruzzo, #rioja, #stellenbosch, #bergerac, #savoie, #vinhoverde, #pfalz, #bourgogne
- **Farming (0–1), only when the `farming` field supports it:** #organicwine, #biodynamicwine
- **Brand:** none yet. Ask Rawlings before inventing one.
- **Never:** #wineoclock, #winetime, #drinkup, #winemom, #instawine. They're generic, and some read as encouraging drinking.

## Founder story

- Rawlings Munemo is the founder, based in Edmonton. He brings growers' wines to Alberta one relationship at a time.
- Enotri is Black-owned. This is central to the founder story (see `scrollcraft/builds/enotri/BRIEF.md`). Don't claim "first" or "only" unless Rawlings confirms the exact wording, because liquor advertising must be verifiable.
- Founder photo: `assets/rawlings-munemo.jpg`.
