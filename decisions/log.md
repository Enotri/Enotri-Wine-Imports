# Decision Log

Append-only. When a meaningful decision is made, log it here.

Format: [YYYY-MM-DD] DECISION: ... | REASONING: ... | CONTEXT: ...

---

[2026-09-14] DECISION: Codified Enotri's brand guidelines as a standing reference at `references/brand-guidelines.html`, published as an Artifact. | REASONING: The scroll-craft build (`scrollcraft/builds/enotri/`) already established a real design system — Cellar Charcoal / Warm Paper / Harvest Gold / Estate Umber palette, Fraunces + DM Sans type, the terroir-trace and rolling-hills motifs — but it only existed as CSS and a creative brief, not a reference a non-technical collaborator or future build could check against. | CONTEXT: Colors, type, and voice pulled directly from `enotri.css` and `BRIEF.md`; nothing invented. Extend this file in place as the brand evolves rather than starting a second one.

[2026-10-21] DECISION: Skills must be merged into `main` in the same session. Business-critical trigger phrases are listed in a Standing workflows table at the top of `CLAUDE.md`, and `CLAUDE.md` now loads `EXECUTIVE_ASSISTANT.md`. | REASONING: A day-before site-supervisor possession message Rawlings had set up was never saved to `main`, so a new session couldn't find it and drafted the wrong message. Seven other skills (cru-invoice, instagram-post, design-taste-frontend, four WhatsApp skills) sit on unmerged branches with the same risk. | CONTEXT: Rebuilt as `.claude/skills/possession-message/` from Rawlings' own text templates. A subagent would not fix this: it also starts from `main` with no memory.
