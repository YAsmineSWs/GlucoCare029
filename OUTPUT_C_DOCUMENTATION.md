# Output C — GlucoCare

## Purpose and scope
A hardcoded, clickable university UI prototype. The user's latest clarification prioritizes the phone-shaped interface and smooth transitions. The prototype requires no backend or live services. Fictional data and minimal browser-local interactions make the screens demonstrable.

## Retained design
The supplied teal/mint reference images establish rounded white cards, prominent scheduled times, status pills, glucose values, two dashboard shortcuts, and four persistent bottom tabs. The earlier blue images provide workflow context. The blank supplied image contains no interface. The references/output-b directory was absent; attached images were the visual reference.

## Implemented refinements and rationale
- Phone bezel, camera island, status bar and home indicator make the intended mobile presentation clear on desktop.
- Short fade/slide transitions preserve continuity; reduced-motion preferences disable them.
- Shared buttons, headers and cards keep spacing and controls consistent.
- Explicit injection confirmation and duplicate prevention support error prevention.
- Inline glucose validation preserves the input for correction.
- Clear confirmation screens show task completion and next actions.
- Checkboxes expose report selections before preview; empty selection has an error.
- Print styling presents only selected report sections, removing phone decoration.
- Browser storage preserves demonstration actions; a modal reset makes the initial scenario repeatable.

## Screen inventory
Today; Insulin Schedule; Log Dose; Dose Recorded; Log Glucose Reading; Reading Saved; Glucose History and Trends; Insulin History; Reports; History and Trends chooser; Doctor Summary selection; Summary Preview; Report Explainer; Profile.

## Demonstration flows
T1: Today → Log Dose → Confirm Injection → Dose Recorded → Schedule → Taken status → Insulin History.

T2: Today → Log Reading → measurement → Save → Reading Saved → Glucose History. Enter -5 to demonstrate error recovery. Saving also updates the dashboard.

T3: Reports → Doctor Summary → select categories → Generate → Preview → Edit Selection or Export. Deselect all to demonstrate selection validation. Export invokes browser print, with Save as PDF available.

## Accessibility
Semantic buttons, labelled checkbox and glucose fields, keyboard focus indicators, live errors/status messages, text/icon status badges, native modal dialog, reduced-motion support, scrollable content and persistent navigation.

## Evaluation to complete
No real participant evaluation has been performed. Ask participants to complete T1–T3, observe navigation errors and recovery, assess text readability, and collect feedback on confidence and clarity. Record actual observations before making effectiveness claims.

## Limitations
Hardcoded sample profile and medical values; no clinical interpretation, authentication, synchronization or medical integrations. Fixed scenario date differs from new entry timestamps. Local data is confined to this browser. PDF output depends on browser printing. Trend data reflects saved sample measurements and is not a clinical assessment.
