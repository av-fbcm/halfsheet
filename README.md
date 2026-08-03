# FBC Muncie Half-Sheet Generator

A desktop app that turns two copy-pasted documents into the week's printed materials.

**Paste in:**
1. The Wednesday Weekly email → announcements and the sermon title
2. The Sunday worship order → order of service, leaders, and volunteer rosters

**Get out:**
1. **FBC Half-Sheet** — the congregational bulletin, 11″ × 8.5″ landscape, printed two-up and cut in half
2. **Who's Serving Sunday** — a single 8.5″ × 11″ portrait page for deacons and volunteers

Both export as PDF and can be saved to Google Drive with permanent links.

---

## What's on each sheet

### Half-sheet — front
Wednesday Weekly date, Church Connect banner, a **This Sunday's Message** box (series,
title, passage), then up to 8 announcements. On communion Sundays a ninth standing
announcement about children's ministry is appended automatically.

### Half-sheet — back
Order of worship with liturgical section headings, element names, and leaders, followed by
**Ways to Respond** or **The Lord's Supper** (chosen by whether it's the first Sunday), then
Stay Connected with the QR code and the "Praise & Proclaim" theme line.

The back page can also be switched to **Sermon Notes** (blank note-taking lines) using the
"Back page shows" dropdown, which is how the sheet worked before August 2026.

### Who's Serving Sunday
Deacon duties in the left column, every serving team in the right, and a highlighted
**Offering** block naming the specific song the offering is collected during. Not printed
with the bulletin — it's linked from the Wednesday Weekly and printed for the deacons on duty.

---

## Things the app works out on its own

| Behaviour | How it decides |
|---|---|
| Communion Sunday content | First Sunday of the month |
| Old vs. New Testament reading label | Looks the book up in a table of all 66 books; leaves the plan's own wording if it can't identify the passage |
| `Deacon X (or designee)` on the sermon reading | Only if the reader is on the `DEACONS` list; a non-deacon designee prints as their plain name |
| Praise team collapsed to one line | Any element led by instrumentalists or vocalists; soloists and the choir keep their names |
| `Rev.` before clergy names | The `STAFF_TITLES` table |
| Offering timing | The `***Offering Collected Here***` marker in the plan; falls back to "first song after the sermon / after the Lord's Supper" |
| Service date | Taken from the worship order, not the Weekly. Warns if the two disagree |
| Type size | Auto-fits: if a page overruns, everything scales down together |

Everything above is editable after extraction. The app fills the fields in; it never
prevents you from changing them.

---

## Settings you may need to change

All near the top of `src/HalfSheetGenerator.jsx`.

| Constant | What it's for | When to touch it |
|---|---|---|
| `DEACONS` | Who counts as a deacon for the reading label | **Diaconate changes — next January 2027** |
| `DEACON_ALIASES` | Same person, two names (`dick flaherty` → `richard flaherty`) | A deacon goes by a nickname in plans |
| `FLOATING_DEACON_BY_WEEK` | The greeter-float / reading rotation. Reference only — nothing reads it yet | The sign-up sheet changes |
| `OFFERING_LEAD`, `OFFERING_CONTACTS` | Names in the Offering block | Someone else takes it over |
| `STAFF_TITLES` | `Rev.` prefixes and the `Worship Director` suffix | Staff changes |
| `SUFFIX_ON_HALFSHEET` | Whether long titles show in the narrow half-sheet column | Set `true` to show "Cynthia Smith, Worship Director" there too |
| `KIDS_COMMUNION_ANNOUNCEMENT` | The standing communion-Sunday announcement | Wording changes |
| `FRONT_MAX` / `TOTAL_MAX` | How many announcements print | You routinely have more than 8 |
| `FOLDER_ID` | The Google Drive folder | The Wednesday Weekly folder moves |

---

## Google Drive

**Save Both PDFs to Drive** writes four files in one sign-in:

- `FBC Half-Sheet.pdf` and `Whos Serving Sunday.pdf` — **overwritten in place every week.**
  The file IDs never change, so the buttons in the Wednesday Weekly are set once and keep working.
- `Archive/YYYY-MM-DD FBC Half-Sheet.pdf` and the matching serving sheet — dated copies that
  sort chronologically. Re-running the same week overwrites that week rather than duplicating it.

After a successful upload the app shows both permanent URLs with copy buttons.

Two things to know:

- The folder must be shared **Anyone with the link → Viewer**, or the congregation hits a permission wall.
- The app can only see files it created (`drive.file` scope). If someone manually uploads a
  file with one of those names, the app won't find it and will create a duplicate.

---

## Installing (volunteers)

**Windows** — download `FBC-Half-Sheet-Generator Setup.exe`, double-click, open from the desktop shortcut.

**Mac** — download `FBC-Half-Sheet-Generator.dmg`, drag to Applications. On first launch,
right-click → Open to get past the Gatekeeper warning (the app is unsigned).

---

## Local development

```bash
npm install
npm run electron:dev   # desktop app — use this one
npm run dev            # browser only; PDF export won't work
```

PDF export runs through Electron's print engine in the main process, so it needs
`electron:dev`. In a browser the app says so rather than failing silently.

You need a `.env` file in the project root with **both** keys:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_GOOGLE_CLIENT_SECRET=GOCSPX-...
```

Missing the Google secret makes Drive uploads fail with `invalid_client`, which looks like a
code bug but isn't. `.env` is gitignored and has never been committed.

---

## Building and distributing

Push to `main` and GitHub Actions builds both installers (~5 minutes). Repo → **Actions** →
completed run → **Artifacts** → download `FBC-HalfSheet-Windows` / `FBC-HalfSheet-Mac`.

Both keys are injected at build time from repository secrets, so changing a key means
rebuilding and reinstalling — existing installs keep the old one.

---

## The AI model

`claude-sonnet-5`, at `effort: "low"` with `max_tokens: 8000`, in one shared helper
(`callClaudeJSON`) used by both extractions. Changing models is a one-line edit there.

`max_tokens` covers thinking *and* output on this model generation. If you lower it and start
seeing "the response was cut off before it finished," that's why.

Cost is a few cents per week. Worth setting a low monthly spend cap in the Anthropic Console:
the key is embedded in every installer and can be extracted from one, so a cap turns a worst
case from an unbounded bill into a capped annoyance.

---

## API keys and billing

The Anthropic key belongs to the Console account under **info@fbcmuncie.org**, so billing and
access stay with the church office rather than any individual.

To rotate:

1. console.anthropic.com as info@fbcmuncie.org → Settings → API Keys → create a new key
2. GitHub repo → **Settings → Secrets and variables → Actions** → update `VITE_ANTHROPIC_API_KEY`
3. Actions → **Build Installers** → **Run workflow**
4. Distribute the new installers, then delete the old key

The Google OAuth client secret works the same way (`VITE_GOOGLE_CLIENT_SECRET`). Rotating that
one is rarely worth it — desktop apps are public clients that can't keep a secret, which is why
the app uses PKCE, and the `drive.file` scope only reaches files the app itself created.
