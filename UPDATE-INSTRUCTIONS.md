# Updating the Half-Sheet Generator

Two parts: **how to push any change** (permanent reference), and **what changed in the
August 2026 update** (this round's notes).

---

# Part 1 — How to push a change

Applies to every update, including the small edits under Part 3.

1. Open **GitHub Desktop**, signed in as **av-fbcm**.
   If the repo isn't cloned: **File → Clone repository** → `av-fbcm/halfsheet`.
2. Copy the changed files into your local repo, replacing what's there.
   Almost always this is just `src/HalfSheetGenerator.jsx`.
3. GitHub Desktop lists the changed files. **Untick anything ending in `-preview.html`** —
   those are scratch files and one contains member names.
4. Write a short summary → **Commit to main** → **Push origin**.
5. The push starts the "Build Installers" workflow. After ~5 minutes:
   github.com → repo → **Actions** → the completed run → **Artifacts** →
   download the new `.exe` / `.dmg` and reinstall on staff computers.

**Never commit `.env`.** It holds two live API keys. It's gitignored and has never been
committed — keep it that way.

## Testing before you push

```bash
npm run electron:dev
```

Not `npm run dev` — PDF export needs the desktop app.

Paste a real Wednesday Weekly, then a real worship order, and check:

- the date on both sheets matches the **worship order**, not the email
- the sermon title and passage look right in the front-page message box
- the QR code in the back footer scans to `fbcmuncie.churchtrac.com`
- Who's Serving is portrait and one page
- **read the whole sheet** — see the warning in Part 4

---

# Part 2 — What changed, August 2026

The bulletin's back page used to be sermon notes. It's now the order of worship, so deacons
and offering counters can see when they're needed without a separate briefing.

**New**
- Order of worship on the back page, with section headings, leaders, and passages
- A second **Who's Serving Sunday** page — deacon duties, every serving team, offering block
- **PDF export**, replacing "open the HTML and press Ctrl+P"
- **Google Drive with permanent links** — fixed filenames overwritten weekly, plus a dated archive
- **This Sunday's Message** box moved to the front page
- Automatic Old/New Testament reading labels
- `Deacon X (or designee)` on the sermon reading, when the reader is a deacon

**Changed**
- Model bumped to `claude-sonnet-5`
- QR code now points to `fbcmuncie.churchtrac.com`. It had been showing the church logo by
  mistake, so the printed sheet had never carried a working QR
- Announcements reduced from 9 to 8 to make room for the message box; on communion Sundays a
  standing children's-ministry announcement is added back as a ninth
- The two children's bullets moved out of the Lord's Supper block, which is now communion
  instruction only
- Logo and theme line removed from the back page (the theme line moved into the footer) to
  give the order of worship more room
- Panel text contrast raised throughout — some of it had been near-invisible

**Keeping the old back page:** the "Back page shows" dropdown switches between Sermon Notes
and Order of Worship per week.

---

# Part 3 — Edits you'll need to make over time

All near the top of `src/HalfSheetGenerator.jsx`. Change the value, push via Part 1.

### The diaconate — due January 2027

```js
const DEACONS = ["Janis Wright", "Gayle Songer", "Richard Flaherty", "Jim Butler", "Aaron Smith"];
```

Five deacons — complete as of August 2026.

This drives the `Deacon X (or designee)` label on the sermon reading. It has to live here
because the worship plan's "Deacons" field lists only the deacons *at the table* for
communion — the floating/reading deacon isn't recorded anywhere in the plan.

Don't confuse this with **care circles**, of which there are seven: the five deacons plus
Rev. Ellis and Rev. Balmer, who each carry one. Only the five belong in `DEACONS`.

**A missing name fails quietly:** that person simply prints without the title, and nothing
looks broken. Update the list the same week the diaconate changes.

If someone goes by a different name in worship plans, add them:

```js
const DEACON_ALIASES = { "dick flaherty": "richard flaherty" };
```

### The reading rotation

```js
const FLOATING_DEACON_BY_WEEK = { 1: "Janis Wright", 2: "Gayle Songer",
                                  3: "Richard Flaherty", 4: "Jim Butler", 5: "Aaron Smith" };
```

Reference only — nothing currently reads it. It exists so the rotation is written down
somewhere durable, and so a future mismatch check has something to check against.

### Offering contacts

```js
const OFFERING_LEAD = "Terry Harke";
const OFFERING_CONTACTS = ["Terry Harke", "Dick Flaherty"];
```

### Staff titles

```js
const STAFF_TITLES = {
  "Kendall Ellis":   { prefix: "Rev." },
  "Jonathan Balmer": { prefix: "Rev." },
  "Cynthia Smith":   { suffix: "Worship Director" },
};
```

Prefixes appear everywhere. Suffixes only appear on Who's Serving, because they're too long
for the half-sheet's leader column — set `SUFFIX_ON_HALFSHEET = true` to change that.

---

# Part 4 — Read the sheet before printing

The app is accurate about names, dates, songs, and passages — those are copied from documents
you wrote.

The one place it composes original text is the **sermon description** in the front-page message
box, drawn from the Wednesday Weekly. That field once produced *"Paul wrestles with what God's
mercy means…"* for a sermon on Genesis 32 — where the person wrestling is Jacob, and Paul
belongs to the other reading that morning. It was fluent, plausible, and wrong.

The prompt now forbids describing or interpreting the passage, and the teaser sentence was
dropped from the printed box. But this is the field to check each week. Everything else on the
sheet is transcription; that line is generation.

If it's ever wrong, edit it in the panel before exporting — or clear it. A missing sentence is
better than a wrong one in three hundred hands.
