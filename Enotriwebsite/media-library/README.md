# Enotri media library

This is the private source library for images and artwork that have not yet been
selected for the live site. Files here are not referenced by the application.
The original, high-resolution files stay out of `public/` so they are not
served to visitors or included in the production site by accident.

## Where assets belong

| Library folder | Suggested website use |
| --- | --- |
| `site/homepage/hero-candidates/web/` | Review as possible homepage imagery for `/`; choose and optimize one before replacing the current hero. |
| `producers/<producer>/vineyard/`, `estate/`, `cellar/`, `harvest/`, `people/` | Producer detail pages and producer-story galleries. Use only images that match the producer and have approved captions and alt text. |
| `producers/<producer>/wine-labels/` | Wine-card and wine-detail product imagery when the label artwork is suitable for web display. |
| `producers/<producer>/technical-sheets/` | Download links from the matching wine detail pages. |
| `wines/bottle-images/` | Portfolio cards and wine detail pages after matching each image to the correct wine. |
| `site/about/people/` | About page and team profiles, after confirming each person's identity and preferred credit. |
| `site/contact/` | Contact or trade-enquiry page imagery. |
| `site/trade-and-events/` | Trade, tasting, and event storytelling; use captions and permissions appropriate to each photo. |
| `site/vineyards/`, `site/winery/` | General editorial imagery where the location and producer are confirmed. |
| `brand/affiliations/` | Industry affiliation or credibility content, subject to logo-use approval. |
| `producers/pasetti/source-artwork/` | Original design files only; keep these out of the browser-facing asset directory. |
| `references/design/` | Internal design reference only; do not publish as site content. |

## Before using an image

The folders are classified from their supplied names and folder labels; filenames
alone do not verify the subject, rights, producer, or intended crop. Review the
actual image, confirm its attribution and intended use, and write accurate alt
text before selecting it for a page. For production, create a suitably sized,
compressed web image under `public/images/` and update the relevant route or
portfolio data to use that derivative. Keep originals and print/design files in
this library.

Current page entry points include `src/routes/index.tsx` (home), `src/routes/about.tsx`
(about), `src/routes/contact.tsx` (contact), `src/routes/producers.index.tsx`
(producer listing), `src/routes/producers.$slug.tsx` (producer details), and
`src/routes/wines.tsx` (wine portfolio).
