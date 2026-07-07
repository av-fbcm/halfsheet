# Half-Sheet Generator Update — July 2026

Two changes: (A) ChurchTrac/Church Connect text and links, (B) move the Claude API billing to info@fbcmuncie.org.

---

## Part A — Push the updated files with GitHub Desktop

Two files changed: `src/HalfSheetGenerator.jsx` and `README.md`.

1. Open **GitHub Desktop**, signed in to the **av-fbcm** account.
2. If the repo isn't cloned yet: **File → Clone repository** → select `av-fbcm/halfsheet`.
3. In File Explorer, copy the two files from this folder into your local repo, replacing the existing ones:
   - `src/HalfSheetGenerator.jsx` → into the repo's `src` folder
   - `README.md` → into the repo's root folder
4. GitHub Desktop will show both files as changed. Summary: `Switch to ChurchTrac Church Connect; update links` → **Commit to main** → **Push origin**.
5. The push triggers the "Build Installers" workflow automatically. After ~5 minutes: repo on github.com → **Actions** tab → completed run → **Artifacts** → download the new `.exe` / `.dmg` and reinstall on staff computers.

### What changed in the app
- "Church Center App" → "Church Connect App" (all footers and exports)
- Full-WW blurb now reads: *"View the full WW anytime on the **Church Connect** app: **bit.ly/churchtracFBCM**"* (replaces bit.ly/fbc-ww and the app-store sentence)
- "New Here? Visit bit.ly/FBCMnew" → "New Here? Visit bit.ly/churchtracFBCM"

> ⚠️ Note: the "New Here?" line and the blurb now point to the same link. If you'd rather keep a separate new-visitor form link, just tell Claude and it's a one-line change.
> ⚠️ Also check the printed **QR code** in the footer — if it points to a Planning Center page, it needs a new image.

---

## Part B — Move the Claude API to info@fbcmuncie.org

**Wait to do this until after Part A is pushed** (or do both, then rebuild once).

### 1. Create the new Anthropic Console account
1. Go to **https://console.anthropic.com** in a browser where you are *not* signed in to the pastor's account (or use a private window).
2. Sign up with **info@fbcmuncie.org** → verify via the emailed link/code.
3. When asked, create an organization (e.g., "First Baptist Church Muncie").

### 2. Add billing
1. In the Console: **Settings → Billing**.
2. Add the church card and buy initial credits (usage is modest — a weekly half-sheet run costs cents; $5–$25 of credit lasts a long time). Consider enabling auto-reload with a low monthly limit so it never runs dry mid-bulletin.

### 3. Create the API key
1. **Settings → API Keys → Create Key**. Name it `halfsheet-generator`.
2. Copy the `sk-ant-...` key immediately — it is shown only once.

### 4. Put the key in GitHub
1. On github.com (signed in as av-fbcm): `halfsheet` repo → **Settings → Secrets and variables → Actions**.
2. Find `VITE_ANTHROPIC_API_KEY` → **Update** → paste the new key → save.

### 5. Rebuild and distribute
1. **Actions** tab → **Build Installers** → **Run workflow** (or just push any commit).
2. Download the new installers from Artifacts and reinstall on staff machines.
   The key is baked in at build time — old installs keep using the old key until updated.

### 6. Decommission the old key
1. Once the new build is confirmed working (paste a test email, check extraction runs), log in to the **pastor's** console.anthropic.com account and **delete/disable** the old API key.
2. Optionally remove billing from that account.

---

## Ongoing

- Key rotation, billing, and usage now all live under info@fbcmuncie.org — no dependence on any individual's account.
- The GitHub repo stays under av@fbcmuncie.org (av-fbcm), which is fine: the repo holds only code; the secret is write-only and can't be read back out.
