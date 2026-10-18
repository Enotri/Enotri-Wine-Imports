---
name: cru-invoice
description: Builds 1er Cru Elite Services' monthly builder invoices (one for Impact, one for Coventry) from the job calendars, cross-checked against the client's PO emails, as a formula-driven spreadsheet plus a print-ready PDF in the house layout. Use when Rawlings says "do the invoices", "invoice October", "monthly invoice", "Impact invoice", "Coventry invoice", or asks what was cleaned in a month.
---

# 1er Cru monthly invoices

Two invoices go out each month to the same client: **Impact** (Impact Homes jobs) and **Coventry** (Coventry Homes jobs). They are split because the client asked for it. Each one ships as an `.xlsx` with live formulas and a `.pdf`. Each month also gets an internal billing review that is never sent.

> **This repo is public.** Never commit invoices, rates, job addresses, PO numbers, client contacts or calendar IDs. Build in the scratchpad, deliver to Rawlings, and offer to upload to his Google Drive.

## 1. Pull the month's jobs (source of truth)

Run `list_calendars`, then `list_events` on each of these calendars for the 1st to the last day of the month, with `orderBy: startTime`:

| Calendar | Holds |
|---|---|
| Construction Clean | Construction cleans; ad-hoc jobs sometimes land here too |
| Re Clean | Re-cleans |
| Possession Clean (primary) | Possession cleans / app set-up |
| Impact Spec Homes | Bi-weekly spec-home rounds (all-day events, one per home) |
| Cru Elite Services | Anything else |

Event descriptions carry the type, job #, PO #, address, community, sq ft and basement. Older events are free-text, so parse them carefully.

## 2. Cross-check Gmail. The calendar is never complete.

- **PO emails** from the client (subject like `Community, Job - Address, Service [PO][PO]`). The `QTY` on the PO is the **square footage**. Use them to fill a missing PO # or sq ft. Search by address or job # without a date limit, because POs often arrive weeks early.
- **"Impact spec list for week of …"** emails. Every list in the month is a spec round to bill. If a round is missing from the calendar, flag it with its dollar impact. Never bill a list you couldn't read.
  - Lists arrive on a Tuesday. The round is billed on the Friday of that week, every two weeks.
  - Bill every home on the list. Flag any home whose Possession Date falls before the round.
  - **Reading the attachment:** the Gmail tools can't download attachments. The fastest route is a copy Rawlings saved to Drive ("Save to Drive" in Gmail), which `read_file_content` reads directly. Otherwise use `get_message` with `messageFormat: RAW` and decode it in the scratchpad. Accept the data only if `xl/sharedStrings.xml` and `xl/worksheets/sheet1.xml` pass their zip CRC checks.
- **POs due in the month but missing from the calendar.** Add them to the review. POs due next month go in the review's "keep for next month" list.
- **Last month's correction emails** (subjects with "correction"). Don't repeat the same mistakes.

## 3. Rates: read them, never hard-code them here

Open last month's two invoices in Google Drive (titles like `IMPACT INVOICE <MON> - <no>` and `COVENTRY HOMES <MONTH>. <no>`). Take the per-sq-ft rates, flat fees, the window-cleaning tiers, the bill-to block, the payment details and the last invoice numbers from them. If a rate changed, Rawlings has to confirm it.

## 4. Classify and expand into lines

- **Builder**: the PO says "Impact Homes Inc. Division" or "Coventry Homes Inc. Division". Impact job numbers start with 35 (35xxx). Impact non-spec jobs (construction, re-clean, possession) go on the **Impact** invoice.
- **Construction clean** = sq ft × rate, then **+ undeveloped basement** (flat) **or** the developed-basement interior sq ft × rate (never both), then **+ window cleaning** at the flat tier set by the main floor sq ft (under 2,000 / 2,000 or more).
- **Re-clean / possession** = sq ft × rate, plus the developed-basement interior sq ft × the same rate when the PO lists it.
- **Spec home clean** = flat per home, per round.
- Extra charges (e.g. a rescheduled-visit hour) only when the client confirmed them in writing.

## 5. Dedupe, then number

- **One line per PO.** The calendars often hold the same job 2–3 times. One spec line per home per round.
- Invoice numbers continue the `YYYY-NNN` sequence from last month: Impact first, then Coventry. Never reuse a number, because the accountant flags it.
- Invoice date = the last day of the month. Service period = the 1st to the last day.

## 6. Build

Write the jobs to a JSON file in the scratchpad, then generate both formats from it so they can't disagree.

**PDF**: fill `assets/invoice-skeleton.html` (house CSS and markup, placeholders in `{{…}}`), then print with headless Chromium. It is pre-installed:

```
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless=new --no-sandbox --no-pdf-header-footer --print-to-pdf=out.pdf file:///abs/path/invoice.html
```

**XLSX**: use the `xlsx` skill (openpyxl + `recalc.py`, zero formula errors). Use one sheet, `Invoice`, in Arial with gridlines off.

- Columns: `Ln, Date, Job #, PO #, Address, City, Community, Description, Sq Ft, Rate, Amount`
- `Amount = IF(ISNUMBER(SqFt), ROUND(SqFt*Rate,2), Rate)`
- Section subtotals are `SUM`s. The summary counts jobs with `COUNTA` on Job # (add-on rows leave Job # blank). The total sums the subtotals.
- Print setup: landscape, fit to one page wide, header row repeated, footer "Page &P of &N".

**Layout (both formats)**: masthead "1<sup>er</sup> Cru Elite Services" with the monogram and tagline, **INVOICE** and the number on the right, then the brass/ink rule. Below that:

- **From / Bill to / Invoice details** blocks
- **Summary** (jobs and amount per service) with a dark **Total due** panel
- Lines grouped by service (Spec → Construction → Re-clean → Possession, skipping empty ones), each with a subtotal
- Add-ons as indented "+" lines
- Running **Ln** numbers, so the client can say "line 17" and mean the same line in the PDF and the spreadsheet
- Payment block that asks the client to quote the invoice number
- Footer with the invoice number and "Page X of Y"

Palette: ink `#1C2433`, brass `#A8834A`, muted `#5B6475`, rules `#E3E6EB`, section band `#F4F5F7`. Font: Inter (PDF), Arial (XLSX).

File names: `1er Cru Invoice <no> - <Impact|Coventry> - <Month YYYY>.{xlsx,pdf}`.

## 7. QA before showing Rawlings

These come from past client corrections. Check every one:

- [ ] Nothing here was already billed last month (compare with last month's invoices)
- [ ] Every completed job in the calendars and PO emails is billed once. No duplicates.
- [ ] Every sq ft matches the PO quantity, and every PO # matches the service's cost code (6300 construction, 6310 re-clean, 6320 possession)
- [ ] Window tier matches the sq ft. The basement fee applies only to undeveloped basements.
- [ ] The number of spec rounds matches the spec-list emails for the month
- [ ] Jobs dated after today are flagged "confirm completed"
- [ ] The XLSX recalculates with zero errors, and its totals equal the PDF totals
- [ ] Render the PDF pages to PNG and look at them: no wrapped dates, POs or rates, nothing overflowing

## 8. Deliver

Show Rawlings both PDFs, both XLSX files and the internal review: totals, decisions needed, corrections made, and next month's carry-overs. **Nothing goes to the client until he approves.** Then offer to upload to Drive and draft the Gmail to the client (cc the accountant).
