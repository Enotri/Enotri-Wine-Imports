---
name: cru-invoice
description: Builds 1er Cru Elite Services' monthly builder invoices (one for Impact, one for Coventry) from the job calendars, cross-checked against the client's PO emails, as a formula-driven spreadsheet plus a print-ready PDF in the house layout. Use when Rawlings says "do the invoices", "invoice October", "monthly invoice", "Impact invoice", "Coventry invoice", or asks what was cleaned in a month.
---

# 1er Cru monthly invoices

Two invoices go out each month to the same client: **Impact** (Impact Homes jobs) and **Coventry** (Coventry Homes jobs). They are split because the client asked for it. Each one ships as an `.xlsx` with live formulas and a `.pdf`. Each month also gets an internal billing review that is never sent.

> **This repo is public.** Never commit invoices, rates, job addresses, PO numbers, client contacts or calendar IDs.
>
> **Invoices live in the Cru Elite Google Drive, never in the Enotri workspace.** Build in the scratchpad only. Rawlings previews and approves first; only then upload to the month's Drive folder (step 8) and delete the local copies. **Never upload invoices to Drive before that approval.**

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

**Bill every job dated in the month, from the 1st to the last day, including jobs scheduled after today.** Rawlings has confirmed that all of a month's scheduled jobs get done. Never hold a job back or flag it as "not done yet". The calendar month decides it, whatever day you're building the invoice.

## 2. Cross-check Gmail. The calendar is never complete.

- **PO emails** from the client (subject like `Community, Job - Address, Service [PO][PO]`). The `QTY` on the PO is the **square footage**. Use them to fill a missing PO # or sq ft. Search by address or job # without a date limit, because POs often arrive weeks early.
- **"Impact spec list for week of …"** emails. Every list in the month is a spec round to bill. If a round is missing from the calendar, flag it with its dollar impact. Never bill a list you couldn't read.
  - **Impact spec homes are billed twice a month, never three times.** Each invoice carries the two lists received since the last one (October 2026 = lists received Sep 29 and Oct 14). A third list in the month goes on next month's invoice.
  - Lists arrive on a Tuesday. Date each round the Friday of that week.
  - Bill every home on the list **except homes whose Possession Date is on or before the round date**. Those have been handed to their buyers, so leave them off that round and list them in the review as removed. The homes stay on earlier rounds, and their possession cleans are billed as usual.
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
- **Window-only assignments at occupied homes** (booked by the client by text, no PO, e.g. a calendar event titled "… window …" at a homeowner's address) are **not invoiced**. Leave them off both builder invoices and list them in the review as "not invoiced".
- If Rawlings ever asks for a stand-alone window job to be billed, price it with the **same two tiers as the window add-on**, set by the house's sq ft (under 2,000 / 2,000 or more). Ask Rawlings for the sq ft if it's missing. Don't guess the tier.
- Extra charges (e.g. a rescheduled-visit hour) only when the client confirmed them in writing.

## 5. Dedupe, then number

- **One line per PO.** The calendars often hold the same job 2–3 times. One spec line per home per round.
- **Every invoice gets a new number every month.** Continue the `YYYY-NNN` sequence from last month's highest number: Impact first, then Coventry. Never reuse a number or copy last month's, because the accountant flags it.
- **No GST.** Never add a GST or tax line. Totals are `Net Total` and `CAD $` only.
- Invoice date = the last day of the month. Service period = the 1st to the last day.

## 6. Build

Write the jobs to a JSON file in the scratchpad, then generate both formats from it so they can't disagree.

**PDF**: fill `assets/invoice-skeleton.html` (house CSS and markup, placeholders in `{{…}}`), then print with headless Chromium. It is pre-installed:

```
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless=new --no-sandbox --no-pdf-header-footer --print-to-pdf=out.pdf file:///abs/path/invoice.html
```

**XLSX**: use the `xlsx` skill (openpyxl + `recalc.py`, zero formula errors). Use one sheet, `Invoice`, in Arial with gridlines off.

- **The line table must clone columns A–G of the client's existing invoice. Keep these names exactly:** A (blank) · `Job#` · `PO Number` · `Description` · `Address` · `Rate` · `Amount`. Rawlings requires this; don't rename or add columns.
- Row wording copies last month's invoice. Coventry example below; Impact uses "Job <number>" and "Impact Spec Cleans".

  | Row type | Job# | Description | Address | Rate |
  |---|---|---|---|---|
  | Main row | job #, then `MM/DD/YYYY` on a second line | `Coventry Homes Construction Clean-<sqft>sq ft` (likewise `Re-Clean-…`, `Possession Clean-…`) | street, then `City, AB` | `<rate>/sq ft` |
  | Basement add-on | blank | `Undeveloped Basement Charge` | blank | blank |
  | Window add-on | blank | `Window Cleaning` | `Under 2000sq ft` or `2000sq ft or more` | blank |
  | Interior add-on | blank | `Interior Construction Clean <sqft>sq ft` (likewise for re-clean and possession) | blank | `<rate>/sq ft` |

- Amount = `=ROUND(sqft*rate,2)` for per-sq-ft rows and a plain number for flat rows. `Net Total` = one `SUM` over the whole Amount column.
- Totals and payment rows keep the client's names: `Net Total`, `CAD $`, `PAYMENT DETAILS`, `Payment Method` | `EFT` | email, `Banking details Void Cheque Submitted`.
- Column widths A3 · B14 · C20 · D54 · E32 · F13 · G15, so bold text never wraps. Print setup: landscape, fit to one page wide, header row repeated, footer "Page &P of &N".

**Rawlings' corrections (Oct 2026). Never break these:**

- **No section labels or numbering** ("1 · Construction Cleans …"). The lines run as one continuous list, as on the client's own invoices: Spec → Construction → Re-clean → Possession, each by date.
- **No subtotals and no summary block.** The only total is `Net Total` / `CAD $` at the bottom.
- **Don't invent wording.** Use only text from the client's own invoices plus the factual header (name, addresses, invoice no., invoice date, service period, builder). No tagline, "Attn:", notes, "please quote…", "thank you…" or "questions" lines.
- **All text bold and dark ink**, nothing grey. Basement, window and interior add-on rows look exactly like job rows (same colour, weight and size, no indent) so they're clearly visible.

**Layout (both formats)**: masthead "1<sup>er</sup> Cru Elite Services" with the monogram (PDF), **INVOICE** and the number on the right, then the brass/ink rule. Below that:

- **From** (name, address) · **Bill to** (name, address) · **Invoice details** (no., date, service period, builder)
- The cloned A–G line table (the PDF shows the same six named columns)
- `Net Total` and `CAD $`, then the payment block in the client's wording
- Footer with the invoice number and "Page X of Y"

PDF is Letter landscape. Palette: ink `#1C2433`, brass `#A8834A` (rule and monogram only), rules `#C9CED6`. Font: Inter (PDF), Arial (XLSX).

File names: `1er Cru Invoice <no> - <Impact|Coventry> - <Month YYYY>.{xlsx,pdf}`.

## 7. QA before showing Rawlings

These come from past client corrections. Check every one:

- [ ] Nothing here was already billed last month (compare with last month's invoices)
- [ ] Every completed job in the calendars and PO emails is billed once. No duplicates.
- [ ] Every sq ft matches the PO quantity, and every PO # matches the service's cost code (6300 construction, 6310 re-clean, 6320 possession)
- [ ] Window tier matches the sq ft. The basement fee applies only to undeveloped basements.
- [ ] Exactly two spec rounds, and no home is billed on a round dated on or after its possession date
- [ ] Both invoice numbers are new (higher than last month's) and there's no GST line
- [ ] Every job dated anywhere in the month is billed, including dates after today
- [ ] The XLSX recalculates with zero errors, and its totals equal the PDF totals
- [ ] Render the PDF pages to PNG and look at them: no wrapped dates, POs, rates, descriptions or addresses, nothing overflowing
- [ ] No section labels, no numbering, no subtotals, no summary block: one total, at the bottom
- [ ] No wording that isn't on the client's own invoices (or the factual header)
- [ ] Every cell is bold dark text (check with openpyxl: no non-bold cells), and the basement and window rows read as clearly as job rows

## 8. Deliver

**Rawlings must preview and approve before anything is uploaded to Drive.** Steps 1–2 happen in the app only. Don't create the folder or upload a file until the approval arrives.

1. **Preview.** Send Rawlings both PDFs and both XLSX files in the app (`SendUserFile`), with a summary of the review: totals, decisions needed, corrections made, and next month's carry-overs.
2. **Wait for explicit approval** ("approved", "upload it", or similar). Questions, corrections or silence are not approval. After any correction, rebuild and preview again. One month's approval never covers another month.
3. **Folder (after approval).** In the Cru Elite Google Drive, use the folder named exactly `Cru Elite Invoice <Month YYYY>` (e.g. `Cru Elite Invoice November 2026`). Search for it first and create it only if it's missing. Keep one folder per month and never put the files anywhere else.
4. **Upload** the approved files into that folder:
   - Both XLSX files: `create_file` with `base64Content` (from `base64 -w0`) and `disableConversionToGoogleType: true`.
   - The internal review: `textContent` with `contentMimeType: text/markdown`, which becomes a Google Doc. Keep `**bold**` out of table cells, because the importer shows the asterisks literally.
5. **Verify every upload** with `read_file_content`. The XLSX must read back with all rows and the right `Net Total`. An empty read means the base64 got corrupted in transit, so re-upload, verify the new copy, and trash the bad one.
6. **PDFs** (about 340 KB each) are too large to upload reliably through the Drive tool. Rawlings saves the approved PDFs from the preview into the same folder.
7. **Clean up.** Delete the invoice outputs, previews and decoded spec lists from the scratchpad. Nothing invoice-related stays in the Enotri workspace.
8. **Report.** Give Rawlings the folder link and confirm what's in it.

**Nothing goes to the client until Rawlings approves.** Then offer to draft the Gmail to the client (cc the accountant), attaching the files from the month's folder.
