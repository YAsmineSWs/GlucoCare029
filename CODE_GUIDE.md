# GlucoCare: code guide for the demo

## A short introduction you can say

“GlucoCare is a mobile interface built with React. The screen content and initial records are hardcoded. React makes the buttons, forms, navigation and status updates interactive. CSS creates the white phone frame, mint and teal design, and transitions. Data is saved in the visitor’s browser, and GitHub Pages hosts the app.”

## How the project connects

```text
index.html
  → src/main.tsx starts React and loads styles.css
    → src/App.tsx controls state, navigation and the main screens
      → src/components/UI.tsx provides shared interface components
      → src/pages/Reports.tsx provides report and history components
      → src/lib/model.js provides initial data, validation and updates
      → src/lib/types.ts describes data shapes for TypeScript
```

## Every source file

| File | What is inside | What to say during the demo |
| --- | --- | --- |
| `index.html` | The browser document, page title, viewport settings, root element and link to `src/main.tsx`. | “This is the HTML entry point. React renders the interface inside the root element.” |
| `src/main.tsx` | Imports React, App and CSS; uses `createRoot` to mount App inside React StrictMode. | “This starts the application and loads its styling.” |
| `src/App.tsx` | Shared state, screen navigation, browser storage, main screens, input handlers, reset dialog and trend drawing. | “This coordinates the application: it decides which screen is visible and keeps information consistent between screens.” |
| `src/components/UI.tsx` | Reusable `Card`, `Button`, `Badge`, `Header`, `Success` and `Shell` components. Shell draws the phone, status bar, app branding and four navigation tabs. MontrealClock updates the time every second in the America/Toronto time zone, including daylight saving changes. | “Shared components give every screen the same buttons, cards, status labels and phone layout.” |
| `src/pages/Reports.tsx` | `ReportsHome`, `Selection`, `Preview`, `Explainer`, `InsulinHistory`, the three category names and predefined laboratory values/explanations. | “This groups the reporting screens, category selection and printable summary.” |
| `src/lib/model.js` | Initial doses/readings, storage key, glucose and dose validators, dose recording, stored-data checks and loading fallback. | “This contains the data rules independently of the visual interface.” |
| `src/lib/types.ts` | TypeScript definitions for `Dose`, `Reading`, `Data` and `Category`. | “These describe the structure of the data and help catch incorrect usage during development.” |
| `src/styles.css` | Tailwind import and custom CSS for colors, cards, typography, white phone, mobile layout, navigation, red validation outlines, transitions, reduced motion and print output. | “This creates the appearance and movement. The layout adapts to narrow screens and print.” |
| `tests/model.test.mjs` | Five Node tests covering glucose validation, dose recording/duplicate prevention, storage recovery, fresh initial status and dose validation. | “These check the important data rules. They do not automate clicks or verify the visual layout.” |

### Inside App.tsx: the parts to point to

- **State:** `data` holds doses/readings; `screen` identifies the visible page; `trail` stores navigation history. Other state holds form values, errors, selected categories and dialog visibility.
- **Persistence:** an effect writes `data` to localStorage. The initial state calls `loadData`. If saving fails, the interface displays a message.
- **Navigation:** `go`, `back` and `changeScreen` switch pages. There is no React Router: conditional rendering displays the matching screen. Native View Transitions animate forward/back navigation and tab changes where supported; CSS entry animation provides a fallback.
- **Dose entry:** `log` selects a scheduled injection and prefills its dose. The input validates on blur; after an error, changes revalidate it. Confirm checks again before recording. The red card and input outlines come from CSS classes.
- **Glucose entry:** `save` validates the value/date, asks for an extra confirmation outside the 2–30 demonstration range, creates a reading, and opens the success screen.
- **Dashboard and history:** values come from the shared `data`, so a saved action is reflected across screens. Readings are sorted by timestamp.
- **Summary selection:** the selected categories control which sections `Preview` includes. Selecting none shows an error.
- **Reset:** a native HTML dialog asks before restoring initial records.
- **Trend:** `Trend` draws an SVG line from recorded readings. It is a custom SVG chart, not Recharts.

### Inside model.js: functions to explain

| Name | Purpose |
| --- | --- |
| `STORAGE_KEY` | Names this version of the saved browser data: `glucocare-v4`. |
| `initialData()` | Returns a new set of four scheduled doses and three glucose readings. No injections start as Taken; the first is Due and the others are Upcoming. |
| `validateGlucose(raw)` | Returns an explanatory error for empty, malformed, negative or zero values; otherwise returns an empty string. |
| `validateDose(raw, scheduledUnits)` | Rejects empty, malformed, negative, zero or mismatched values. Matching the scheduled units is a prototype consistency rule, not a medical recommendation. |
| `recordDose(data, id, date)` | Returns updated data with the selected dose marked Taken and a timestamp. Prevents overwriting a dose already recorded and does not mutate the original array. |
| `validData(data)` | Performs basic structural checks on stored doses/readings before loading them. |
| `loadData(storage)` | Reads and parses saved records; falls back to initial data if storage is missing, malformed or incompatible. |

## Configuration and generated files

| File or folder | What is inside |
| --- | --- |
| `package.json` | Project name, dependencies and commands: `dev` starts Vite; `build` runs TypeScript and creates a production build; `test` runs Node’s tests. |
| `package-lock.json` | Generated dependency version lock used for repeatable installs. Do not manually edit it. |
| `vite.config.ts` | Enables the React and Tailwind plugins for Vite. GitHub’s workflow supplies the deployed base path at build time. |
| `tsconfig.json` | TypeScript rules: browser libraries, JSX support, strict checks, module resolution and JavaScript imports. |
| `.gitignore` | Keeps dependencies, generated output, TypeScript build metadata and macOS metadata out of Git. |
| `.github/workflows/pages.yml` | On a push to `main` or manual run: installs dependencies, runs tests, builds with the GitHub Pages path, uploads `dist`, and deploys it. |
| `node_modules/` | Installed dependencies. Generated by `npm install`; excluded from Git. |
| `dist/` | Generated deployable HTML, CSS and JavaScript. Created by `npm run build`; excluded from Git. |
| `tsconfig.tsbuildinfo` (if present) | Generated TypeScript build metadata; excluded from Git. |
| `.git/` | Local Git history and repository configuration. Not application source code. |

## Documentation files

| Document | What you can find inside |
| --- | --- |
| `README.md` | Setup commands, project overview, browser-local data and GitHub Pages publication instructions. |
| `OUTPUT_C_DOCUMENTATION.md` | Design progression, retained features, usability rationale, screen inventory, task flows, accessibility and limitations. Evaluation suggestions are proposed steps, not completed participant research. |
| `TEST_REPORT.md` | Verification results and limits. Distinguishes automated rule/build checks from browser checks that were not performed. |
| `CODE_GUIDE.md` | This file: the architecture, file-by-file explanation, functions and demo speaking notes. |

## A simple demo order

1. **Show Today.** “The phone frame and navigation are reusable components. The cards display information from shared state.”
2. **Open Log Dose and enter -5.** Leave the field or press Confirm. “The validator returns a specific explanation. React displays it and applies the red outline; nothing is recorded.”
3. **Restore the displayed scheduled dose and confirm.** “The record is updated immutably, given a timestamp, and saved locally. The schedule now displays Taken.”
4. **Open Log Reading.** Try a negative value, correct it and save. “Validation preserves the input for correction. A successful reading appears on the dashboard and in history.”
5. **Open Doctor Summary.** Toggle categories and generate. “The preview includes only selected sections and uses the current records.”
6. **Choose Export Summary.** “This calls `window.print()`. Print CSS removes the phone and controls so the report can be saved as PDF.”
7. **Mention hosting.** “GitHub Actions builds the project and GitHub Pages serves it at the public link.”

## Be precise if asked

- Hardcoded means the initial content is predefined. It does not mean every screen is a static image: React updates the interface after interactions.
- React renders HTML elements in the browser; `.tsx` files combine component logic with JSX markup.
- Tailwind is configured and imported, but most of the design uses custom CSS classes.
- Lucide supplies the interface icons. SVG is used directly for the trend chart.
- There is no backend, login, database server, live medical integration or AI service.
- localStorage is browser-local persistence, not a shared database. Each visitor’s entries stay in their browser.
- Five automated tests check data rules; the build checks TypeScript and bundling. These do not prove that browser interactions, animations or PDF layout were tested visually.
- The fixed starting schedule is November 4, 2026. New entries use local device time.
- The app records the predefined schedule; it does not calculate insulin doses or provide treatment recommendations.
