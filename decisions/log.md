# Decision Log

Append-only. When a meaningful decision is made, log it here.

Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

---

[2026-09-14] DECISION: Codified Enotri's brand guidelines as a standing reference at `references/brand-guidelines.html`, published as an Artifact. | REASONING: The scroll-craft build (`scrollcraft/builds/enotri/`) already established a real design system — Cellar Charcoal / Warm Paper / Harvest Gold / Estate Umber palette, Fraunces + DM Sans type, the terroir-trace and rolling-hills motifs — but it only existed as CSS and a creative brief, not a reference a non-technical collaborator or future build could check against. | CONTEXT: Colors, type, and voice pulled directly from `enotri.css` and `BRIEF.md`; nothing invented. Extend this file in place as the brand evolves rather than starting a second one.
[2026-10-13] DECISION: Built the `instagram-post` skill at `.claude/skills/instagram-post/` for Enotri and 1er Cru Instagram content, with drafts saved to `projects/instagram/drafts/`. | REASONING: Social media foundations are a Q3 goal and priority #4; a skill keeps voice, facts, and AGLC compliance consistent without re-explaining each time. | CONTEXT: Enotri voice from `references/brand-guidelines.html`; facts from `Enotriwebsite/src/lib/portfolio.ts`; compliance from the AGLC Liquor Agency Handbook (2026-09-10 edition, s.4–5); Instagram caps hashtags at 5 since Dec 2025. First test excluded `federico-ferrero-family.jpg` (children in frame, AGLC 4.1.5).
