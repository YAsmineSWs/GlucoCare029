# GlucoCare

A hardcoded, local, phone-shaped React UI prototype matching the teal/mint Output B references. No backend, account, API keys, or real medical integrations.

## Run

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. Production: `npm run build`; focused checks: `npm test`.

The desktop view uses a 390 × 844 phone with a bezel, camera island, status bar, and home indicator. Narrow phones use the full viewport. Navigation animates with a short fade/slide and respects reduced motion.

Sample screens include Today, Schedule, dose review and confirmation, glucose form and confirmation, history/trends, Reports, category selection, printable report preview, explainer, and Profile. All sample information is fictional. Small localStorage interactions support repeatable demonstrations; Profile can restore the initial scenario. All other content is hardcoded. The fixed schedule represents November 4, 2026; newly entered measurements default to the device's local date/time.

The demonstration input range is 2–30 mmol/L: unusual positive values show a confirmation prompt, never an automatic treatment recommendation. Export uses the browser print dialog, where Save as PDF is available.

## Verification

See TEST_REPORT.md for actual checks and limits. This is a UI demonstration, not a medical device.

## Publish on GitHub Pages

Push this project to the `main` branch of a GitHub repository. In repository Settings → Pages, choose **GitHub Actions** as the build source. The included `.github/workflows/pages.yml` installs, tests, builds with the correct repository base path, and deploys the static app. The Actions deployment provides the public website URL. A repository source link alone does not open the app.

Each visitor has independent browser-local data. Entries are not shared between visitors.

## Explaining the code

See [CODE_GUIDE.md](CODE_GUIDE.md) for a file-by-file guide, key functions and a suggested presentation walkthrough.
