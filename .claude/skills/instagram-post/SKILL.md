---
name: instagram-post
description: Write ready-to-post Instagram content for Rawlings Munemo's two businesses: Enotri Wine Imports (a boutique, terroir-driven wine agency in Alberta) and 1er Cru Elite Services (Edmonton post-construction and possession cleaning). Produces the caption, carousel slide text, image picks from the repo, alt text, hashtags, and an AGLC liquor-advertising compliance check. Use this whenever Rawlings asks for an Instagram post, caption, carousel, Reel idea, story, content calendar, or "something for socials" about a wine, a grower, a region, a wine dinner or tasting, the founder story, or a 1er Cru cleaning job, even if the request does not say "Instagram" and only names a wine, producer, event, or job site.
---

# Instagram Post

Turn a wine, a grower, an event, or a cleaning job into a post Rawlings can copy straight into Instagram. Every post should sound like its brand, use only facts that can be checked, and be safe to publish.

## The two accounts

| | Enotri Wine Imports | 1er Cru Elite Services |
|---|---|---|
| What it is | AGLC-registered liquor agency importing boutique wines into Alberta | Edmonton cleaning business: post-construction, re-cleans, possession cleans, bi-weekly spec-home cleans |
| Audience | Restaurant, shop, and hotel buyers, plus Alberta wine drinkers (18+) | Builders, site supers, project managers, realtors, people taking possession |
| Goal of a post | Trust in the growers, which leads to price-list requests and trade appointments | Quote requests |
| Voice | Warm, polished, boutique, grounded in growers and terroir. Reads like a museum label. | Short, precise, cooperative, factually clear. Contractor to contractor. |
| Read before writing | `references/enotri.md` and `references/compliance.md` | `references/1er-cru.md` |

A post is always for one account. If the request doesn't make the brand obvious, ask.

## Workflow

1. **Pin down the brief.** Brand, subject (which wine, producer, event, or job), and post type. When Rawlings gives only a subject ("do one on Pasetti"), choose the content pillar and format yourself and say which you chose.
2. **Gather the facts first, then write.** For Enotri, read the producer and wine entries in `Enotriwebsite/src/lib/portfolio.ts` (the `producers` and `wines` arrays). That file is the source of truth for region, farming, grapes, history, and tasting notes. For 1er Cru, use only what Rawlings tells you about the job.
   - When a fact you need isn't there (vintage, event date, venue, price, square footage, a producer's Instagram handle), don't fill the gap. Put a `[CONFIRM: …]` marker in the draft and list it at the top. The reason: AGLC requires liquor advertising to be accurate and verifiable (Handbook 4.1.3). Besides, one invented "fifth generation" seen by a sommelier costs more trust than a plainer post.
3. **Read the brand reference** for that account (table above).
4. **Pick the visuals.** Choose real image files and look at each one before you choose it, because filenames don't prove what a photo shows. Check two more things for every image:
   - **Size.** Aim for 1080px or more on the short side. Below about 800px (many website images are 570px wide), the photo will look soft on a phone, so flag it and suggest a higher-res source or a text slide.
   - **Who is in it.** For Enotri, look at every person in the frame. Producer family photos often include children, and a photo with a minor can't run in liquor advertising at all (see `compliance.md`).

   If nothing in the repo fits, write a short shot list instead (what to shoot, the angle, the light).
5. **Write the post** using the output template below.
6. **Run the check.** For Enotri, go through every line of `references/compliance.md`. For 1er Cru, use the privacy and claims checklist in `references/1er-cru.md`. Fix anything you can. Flag anything that needs Rawlings's judgment.
7. **Save and show.** Write the draft to `projects/instagram/drafts/YYYY-MM-DD-<brand>-<slug>.md` (`<brand>` is `enotri` or `1ercru`) and show the full draft in chat.

Nothing here can publish to Instagram. Rawlings posts from the Instagram app or Meta Business Suite. If Rawlings asks you to "post it," say so and hand over the final copy.

## Instagram specs (2026)

| Item | Spec | Why it matters |
|---|---|---|
| Feed image | 1080×1350 (4:5). 3:4 (1080×1440) works only when posting in the app. | 4:5 is accepted everywhere, including schedulers. |
| Carousel | Up to 20 slides in the app (10 through Meta Business Suite or schedulers). Use one aspect ratio for all slides. | Mixed ratios get cropped. |
| Reel / Story | 1080×1920 (9:16). Keep text inside the centre 4:5 area. | The profile grid crops Reels to the centre. |
| Caption | 2,200 characters max. Only about the first 125 show before "more". | The first line has to work on its own. |
| Hashtags | **Maximum 5** (Instagram's limit since Dec 2025). Use 3–5 specific ones. | Extra tags are ignored, and generic tags add nothing. |
| Alt text | Always write custom alt text, about 100–125 characters, describing what is actually in the frame. | Accessibility, and Instagram uses it to understand the image. |

**Choosing a format:**
- **Carousel:** producer stories, "meet the grower," before-and-afters, checklists. These get saved most.
- **Single image:** one wine, one strong photo, announcements.
- **Reel:** harvest, cellar, or walk-through footage. Only suggest one when footage exists or Rawlings can shoot it.

## Output template

Use this layout so each field can be copied straight into Instagram:

```markdown
# [Enotri | 1er Cru] · [Pillar] · [Working title]

> **Confirm before posting:** [list each [CONFIRM] item, or "Nothing to confirm"]

**Format:** Carousel, 5 slides, 4:5 (1080×1350)
**Suggested time:** Tue, 11:30 AM MT

## Visuals
1. `path/to/file.webp`: what it shows · crop note
   Slide text: "…" (or "none")
2. …

## Caption
[Hook line: works alone, under ~125 characters]

[Body]

[Call to action]

[3–5 hashtags]

## Alt text
1. …
2. …

## Tags
- [@handle, or [CONFIRM: producer's Instagram handle]]
- Location tag: […]

## Fact sources
- `Enotriwebsite/src/lib/portfolio.ts`: Ferrero Federico (region, founded 1905, farming)

## Compliance check
- ✅ Accurate and verifiable: every fact traced above
- ⚠️ …: [what to fix or decide]
```

## Content plans

When Rawlings asks for a week or a month of posts:
- Start with a plan table (date, pillar, subject, format, one-line idea) and get Rawlings's OK before writing every post in full. It's much cheaper to reorder a table than to rewrite ten captions.
- Rotate the pillars in the brand reference. Don't repeat a producer within two weeks. Mix formats.
- Default cadence is 3 posts a week for Enotri and 2 for 1er Cru, unless Rawlings sets another.
- Suggested times are in Mountain Time. Weekday late morning (11–1) and early evening (6–8) are reasonable defaults for both audiences. Once the account has Instagram Insights data, use its own best times.
- Tie Enotri posts to the season where it fits: Northern Hemisphere harvest runs Sept–Oct, Southern Hemisphere (South Africa) Feb–Apr. Holiday entertaining and gift season is Nov–Dec.

## Before you hand it over

- Read the first line alone. Does it say something concrete?
- Count the hashtags. Five at most.
- Every fact appears under **Fact sources**, and every gap appears as a `[CONFIRM]` at the top.
- For Enotri, every compliance line is ✅ or has a clear ⚠️ with the fix.
