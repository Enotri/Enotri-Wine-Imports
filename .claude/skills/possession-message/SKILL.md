---
name: possession-message
description: 1er Cru Elite Services possession clean messages. Main job — the day before a possession clean, draft a confirmation email to each site supervisor for the homes being cleaned tomorrow. Also drafts the "noted with thanks" reply when a new Possession Clean PO email arrives. Use when Rawlings says "possession message", "cru elite possession message", "message the site supervisor", "possession cleans tomorrow", "reply to the new possession", or forwards a Possession Clean / App Set Up PO email.
---

# Possession Message — 1er Cru Elite Services

**Never send.** Save Gmail drafts only. Rawlings sends them himself.

**This repo is public.** Do not write client or supervisor names, email addresses or phone numbers into this file or into any commit. Read them from Gmail and Calendar each time.

**Default:** "possession message" with nothing else means **Part A for tomorrow** (America/Edmonton). If Rawlings names a date, use that date. Use Part B only when he asks to reply to a new job email.

---

## Part A — Site supervisor message (day before)

### A1. List the jobs

- Read the **Possession Clean** calendar (the account's primary calendar) for the target day.
- Each event title reads `Possession Clean – {Community} – {street address}`. The description has the job number and PO.
- Also run Part B's Gmail search for that date. A job with a PO email but no calendar event still counts. Flag it.

### A2. Find each site supervisor

- Find the job's Possession Clean PO email: search Gmail for the job number or street address.
- Supervisor = the PO's "Please direct questions regarding the following tasks to:" name and email.
- Possession time = the coordinator's note ("Possession at 1 PM") or SUPPLIER INSTRUCTIONS. If neither has it, the time is unknown. Do not take it from the calendar block.
- Search recent emails for the job number (re-cleans, defects, urgent notices). If the coordinator calls someone else the site supervisor there, flag the mismatch. Still address the draft to the PO contact unless Rawlings says otherwise. Only use an email address that appears in Gmail.

### A3. Check for an existing message

Search `in:sent` and `list_drafts` for `"Possession Clean Tomorrow"` plus the street address. If one exists for this date, report it. Don't make a second one.

### A4. Draft one email per supervisor

If one supervisor has several homes that day, put them all in one email.

- `to`: supervisor's email from the PO
- `subject`, one home: `Possession Clean Tomorrow – {street address} (Job {job#})`
- `subject`, several homes: `Possession Cleans Tomorrow – {address} & {address} (Jobs {#} & {#})`
- `includeSignature: true`. Don't type a signature in the body.
- Plain text, no Markdown. No CC unless Rawlings asks.

Body:

```
Hi {supervisor first name},

Just confirming that 1er Cru Elite Services will be completing the possession clean tomorrow, {Weekday, Month D}, at:

{street address} – Job {job#}

We'll have the home finished ahead of the {time} possession. Please let me know if there's anything specific you'd like us to address before the walkthrough, or any access details we should be aware of.

Thank you,
```

- Several homes: write "possession cleans", put one `{address} – Job {#}` line per home, and use "We'll have both homes finished ahead of the {time} possessions." For three or more homes, write "all homes".
- Possession time unknown: write "ahead of the possession" and add "Could you please confirm the possession time?" before the last sentence. Change "Please let me know" to "Please also let me know".
- If the message is for a day other than tomorrow, replace "tomorrow" with the day and date, and put that date in the subject.

### A5. Report

| Job | Address | Possession | Supervisor | Draft |
|---|---|---|---|---|

- Link each draft as a markdown link using its `viewUrl`.
- Then give one short bullet for each flag: supervisor mismatch, unknown time, no calendar event, existing message, or anything missing.

---

## Part B — Acknowledge a new possession job

### B1. Find the job email

- If Rawlings names a job number or address, search for it. Otherwise search: `subject:"Possession Clean" "BuildPro Order" newer_than:14d`
- Read each thread in full with `get_thread` (`PLAIN_TEXT`).
- Skip a thread that already has a sent reply or a reply draft. Say so instead.

### B2. Check before drafting

- **Addressed to another cleaner** (the email greets someone else by name): don't acknowledge the job. Draft: "Just wanted to check in, this job came through to me, but it opens with "Hi {other name}." Wanted to make sure it was intended for me."
- **Date needed already passed:** flag it and don't draft.

### B3. Draft the reply

Reply in the thread:
- `replyToMessageId`: the coordinator's message id
- `to`: her address, taken from the email
- `subject`: `Re: {original subject}`
- `includeSignature: true`

```
Hi {coordinator first name},

New possession with {supervisor first name} for Job {job#} – {street address} on {Weekday, Month D} at {time} noted with thanks.

Thank you,
```

- Drop "with {supervisor}" or "at {time}" if the email doesn't give them.
- Extra attention asked for: add "We'll make sure to go in early, allow extra time, and give ourselves adequate time to thoroughly clean."
- Hard deadline: add "We'll have it completed before {time}."

### B4. Calendar

Check the Possession Clean calendar for the job on the date needed. If it's missing, offer to add it. Don't create it without a yes.
- Title: `Possession Clean – {Community} – {street address}`
- Location: full address
- Time: 8:00–11:00 AM
- colorId: `9`
- Description: these lines
  - `Type of cleaning:`
  - `Job number:`
  - `PO number:`
  - `Address:`
  - `Community:`
  - `Square footage:`
  - `Basement:`

Flag any duplicate events for the same address. Don't delete them.
