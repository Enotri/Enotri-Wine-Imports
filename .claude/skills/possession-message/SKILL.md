---
name: possession-message
description: 1er Cru Elite Services possession clean messages. Main job — the day before a possession clean, write a text message to each site supervisor for the homes being cleaned tomorrow, in Rawlings' own template, ready to copy and paste. Also drafts the "noted with thanks" email reply when a new Possession Clean PO email arrives. Use when Rawlings says "possession message", "cru elite possession message", "message the site supervisor", "possession cleans tomorrow", "reply to the new possession", or forwards a Possession Clean / App Set Up PO email.
---

# Possession Message — 1er Cru Elite Services

**This repo is public.** Do not write client or supervisor names, phone numbers or email addresses into this file or into any commit. Read them from Gmail and Calendar each time. Showing them in the chat reply is fine.

**Default:** "possession message" with nothing else means **Part A for tomorrow** (America/Edmonton). If Rawlings names a date, use that date. Use Part B only when he asks to reply to a new job email.

---

## Part A — Site supervisor text (day before)

Rawlings sends these as **text messages** from his phone. Claude can't send texts. Write each message in the chat reply, ready to copy, with the supervisor's name and phone number above it. Don't create email drafts unless he asks for email.

### A1. List the jobs

- Read the **Possession Clean** calendar (the account's primary calendar) for the target day.
- Each event title reads `Possession Clean – {Community} – {street address}`. The description has the job number and PO.
- Also search Gmail for that date: `subject:"Possession Clean" "BuildPro Order"`. A job with a PO email but no calendar event still counts. Flag it.

### A2. Find each supervisor and possession time

- Open the job's Possession Clean PO email: search Gmail for the job number or street address.
- Supervisor name and phone = the PO's "Please direct questions regarding the following tasks to:" block (NAME, PHONE).
- Possession time = the coordinator's note ("Possession at 1 PM") or SUPPLIER INSTRUCTIONS. Do not take it from the calendar block. If neither has it, the time is unknown.
- Search recent emails for the job number (re-cleans, defects, urgent notices). If the coordinator calls someone else the site supervisor there, flag it. Give that person's number too if Gmail has it.

### A3. Write one text per supervisor

If one supervisor has several homes that day, put them all in one text. Keep Rawlings' wording exactly. Only fill in the braces.

**Template 1: possession time known.** Finish time = one hour before possession.

```
Hi {first name},

Just confirming that 1er Cru Elite Services will be completing the possession clean tomorrow before {finish time} for the {possession time} Possession.

{street address} – Job {job#}

Thank you.
```

For several homes: "possession cleans", one `{street address} – Job {job#}` line per home.

**Template 2: possession time unknown, one home.**

```
Good day {first name}, hope you're doing well.

This is Rallings Munemo from 1er Cru Elite Services. I'm just confirming the possession time for tomorrow's Possession Clean at {Community}, Job {job#}, {street address}. Please let me know the scheduled time.
```

**Template 2: possession time unknown, several homes.**

```
Good day {first name}, hope you're doing well.

This is Rallings Munemo from 1er Cru Elite Services. I'm just confirming the possession times for tomorrow's Possession Cleans at {Community}:

{street address} – Job {job#}
{street address} – Job {job#}

Could you please confirm the possession times for the homes so we can plan our crew accordingly.

Thank you.
```

**Same day, with defects to fix** (only when Rawlings asks for today):

```
Hi {first name}, just confirming that we'll be completing the Possession Clean / App Set Up for today job {job#} at {street address}. We have noted that the possession is scheduled for {possession time} and will address the defects.

Thank you.
```

Time format: `12PM`, `1PM` in Template 1; `2:00 PM` in the same-day text. Use "today" or "tomorrow" only when it's true. For any other day, write the weekday and date.

### A4. Reply format

For each supervisor:
1. A bold line: `{Supervisor name} — Job {#} ({possession time or "time not given"}) — {phone}`
2. The text in its own code block, so it copies cleanly.

Then give one short bullet for each flag: supervisor mismatch, unknown time, no calendar event, or missing phone.

---

## Part B — Acknowledge a new possession job (email)

**Never send.** Save Gmail drafts only.

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
- Plain text, no Markdown.

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
