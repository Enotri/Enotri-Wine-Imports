---
name: possession-message
description: Acknowledge a new 1er Cru Elite Services possession clean job. Finds the builder's Possession Clean PO email in Gmail, saves a short "noted with thanks" reply as a Gmail draft in Rawlings' voice, and checks the job is on the Possession Clean calendar. Use when Rawlings says "possession message", "cru elite possession message", "reply to the new possession", "acknowledge the possession job", or forwards a Possession Clean / App Set Up PO email.
---

# Possession Message — 1er Cru Elite Services

**Never send.** Save Gmail drafts only. Rawlings sends them himself.

**This repo is public.** Do not write client names, email addresses or phone numbers into this file or into any commit. Read them from the email each time.

## 1. Find the job email

- If Rawlings names a job number or address, search for that.
- Otherwise search Gmail: `subject:"Possession Clean" "BuildPro Order" newer_than:14d`
- Read each thread in full with `get_thread` (`PLAIN_TEXT`). Search results only preview the thread.
- Skip a thread that already has a sent reply from Rawlings.
- Check `list_drafts` for the subject. If a reply draft already exists, say so. Do not make a second one.

## 2. Pull the job details

| Field | Where to find it |
|---|---|
| Job number, street address, community | Subject: `Community, JOB# - ADDRESS, Possession Clean …` |
| PO number | First bracket in the subject, shaped like `00000-00000-6320` |
| Date needed | Body → JOB INFORMATION → DATE NEEDED |
| Possession time | The coordinator's note ("Possession at 1 PM") or SUPPLIER INSTRUCTIONS |
| Site supervisor | The coordinator's note first, else "Please direct questions … to:" |
| Square footage | QTY next to the Possession Clean line |
| Coordinator's first name | Her sign-off |
| Special asks | Anything else in her note: extra attention, photo team, early deadline |

Do not guess. If a field is missing, leave it out of the reply and list it in the report.

## 3. Check before drafting

- **Addressed to someone else** (the email greets a different cleaner by name): don't acknowledge the job. Draft this instead:
  > Hi {first name},
  >
  > Just wanted to check in, this job came through to me, but it opens with "Hi {other name}." Wanted to make sure it was intended for me.
  >
  > Many thanks,
- **Date needed already passed**: flag it to Rawlings and don't draft.

## 4. Draft the reply

Use `create_draft`:
- `replyToMessageId`: the coordinator's message id
- `to`: her address, taken from the email
- `subject`: `Re: {original subject}`
- `includeSignature: true`. Do not type a signature in the body. If the draft comes back without one, tell Rawlings.
- Plain text only, no Markdown.

Standard reply:

```
Hi {first name},

New possession with {supervisor first name} for Job {job#} – {street address} on {Weekday, Month D} at {time} noted with thanks.

Thank you,
```

Adjust only as needed:
- No supervisor named: drop "with {supervisor first name}".
- No possession time: drop "at {time}".
- Extra attention asked for: add "We'll make sure to go in early, allow extra time, and give ourselves adequate time to thoroughly clean."
- Hard deadline (photo team, early handover): add "We'll have it completed before {time}."

Voice: short, warm and cooperative, one or two sentences. Match Rawlings' sent replies ("noted with thanks", "Thank you,"). No filler.

## 5. Check the calendar

Possession jobs go on the **Possession Clean** calendar, which is the account's primary calendar. Use time zone America/Edmonton.

- Search that calendar on the date needed for the street address.
- **Found:** note it in the report. If more than one event exists for the same address, flag the duplicates. Don't delete them.
- **Missing:** offer to add it. Don't create it without a yes. Match the existing format:
  - Title: `Possession Clean – {Community} – {street address}`
  - Location: full job address
  - Time: 8:00–11:00 AM on the date needed, so it's done well before a 1 PM possession. Use a different time if Rawlings asks.
  - colorId: `9`
  - Description:
    ```
    Type of cleaning: Possession Clean
    Job number: {job#}
    PO number: {PO}
    Address: {full address}
    Community: {community}
    Square footage: {sq ft} sq ft
    Basement: {Developed / Undeveloped / Not stated in job email}
    ```

## 6. Report back

Give one table row per job:

| Job | Address | Possession | Supervisor | Draft | Calendar |
|---|---|---|---|---|---|

- Link each draft as a markdown link using its `viewUrl`.
- Then list any missing fields, duplicates or flags in one short bullet each.
