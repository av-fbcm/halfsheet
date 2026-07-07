# FBC Muncie Half-Sheet Generator v3

A desktop app for generating the weekly bulletin half-sheet.
Staff paste the Wednesday Weekly email → AI extracts everything → edit & export.

---

## For Volunteers (End Users)

### Windows
1. Download `FBC-Half-Sheet-Generator Setup.exe`
2. Double-click it — installs silently and creates a desktop shortcut
3. Open **FBC Half-Sheet Generator** from your desktop

### Mac
1. Download `FBC-Half-Sheet-Generator.dmg`
2. Double-click it, drag the app to your Applications folder
3. First launch: right-click → Open (to bypass Gatekeeper warning for unsigned apps)

---

## For You (Building & Distributing)

### Step 1 — Put the project on GitHub

Go to https://github.com/new and create a private repository (e.g. `fbcm-halfsheet`).

Then in your project folder run:
```
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/fbcm-halfsheet.git
git push -u origin main
```

### Step 2 — GitHub builds both installers automatically

1. Go to your repo on GitHub → click the **Actions** tab
2. "Build Installers" will be running — wait ~5 minutes
3. Click the completed run → scroll to **Artifacts**
4. Download:
   - `FBC-HalfSheet-Windows` → contains the `.exe` installer
   - `FBC-HalfSheet-Mac` → contains the `.dmg` installer

### Step 3 — Distribute

Share the `.exe` with Windows users and `.dmg` with Mac users
via email, Google Drive, or USB.

### Updating the app

Any time you change something, just push again:
```
git add .
git commit -m "describe your change"
git push
```
GitHub rebuilds both installers automatically.

---

## Local Development

```bash
npm install
npm run dev           # web app in browser
npm run electron:dev  # as a desktop app
```

---

## API Key

The Anthropic API key is **not** stored in the code. It is injected at build
time from a GitHub repository secret named `VITE_ANTHROPIC_API_KEY`.

The key belongs to the Anthropic Console account under **info@fbcmuncie.org**
(console.anthropic.com) so billing and access stay with the church office,
independent of any individual staff member.

To rotate or replace the key:

1. Log in to https://console.anthropic.com as info@fbcmuncie.org
2. Create a new API key (Settings → API Keys)
3. On GitHub: repo → **Settings → Secrets and variables → Actions** →
   edit `VITE_ANTHROPIC_API_KEY` → paste the new key
4. Trigger a rebuild: push any commit, or Actions tab → "Build Installers" →
   **Run workflow**
5. Distribute the freshly built installers (old installs keep the old baked-in
   key until users install the new build)
