# Madison calendars — September 22, 2026

## Monday–Sunday weekly display

Both Madison Basketball and Madison Hub now open on the current Pacific-time week, with Monday first and Sunday last.

- Previous week, Next week, and This week controls.
- Seven day columns on wide screens; Monday–Sunday day sections stack on smaller screens.
- Every day is shown, including days without events.
- Today is highlighted. Events are ordered by start time.
- Team filters and event details are retained.
- Events spanning multiple days appear on each applicable day, including across month and year boundaries.
- Basketball's Next tournament button opens that tournament's week.
- Hub keeps its device-local imported schedule, progress, trips, and checkmarks. Weekly OCR Pink sessions remain included without an import.

## OCR Pink recurring sessions

Effective September 22, 2026; all times America/Los_Angeles.

| Day | Session | Time | Location |
| --- | --- | --- | --- |
| Tuesday | Practice | 7:30–9:00 PM | Zion Church, Anaheim, CA |
| Monday and Friday | Basketball Academy | 7:45–9:15 PM | Covenant Church, Orange, CA |

## Project records

- Madison Basketball: https://madison27.tomongo.chatgpt.site
- Madison Hub: https://quyenvi.github.io/madison-hub/#basketball
- Hub repository: https://github.com/quyenvi/madison-hub
- Shared date logic: `weekly-calendar.js`.
- Shared OCR Pink recurrence data: `ocr-weekly.js`.
- Display and navigation: `app.js`, `index.html`, and `styles.css`.
- Basketball packaging: `build.cjs`.
- Basketball local preview: `server.cjs` now accepts the requested host and port flags.
- Hub offline cache: `sw.js`, updated for this release.

## Desktop handoff

Known project folder: Desktop → Ai Chatgpt → Madison 13U.

This update was made to the hosted projects and their source repositories. The desktop folder was not directly accessible from this session. Save this note there. A desktop checkout linked to either updated repository can receive the matching source and this change record through its normal Git sync.

For an installed Hub app, open it online, then close all Hub app windows/tabs and reopen so the new offline version can activate.
