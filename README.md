# Customer Success Executive Dashboard

Public starter dashboard for Customer Success executive management.

Live page: open [`index.html`](./index.html) in a browser, or enable GitHub Pages on this repository (Settings → Pages → Deploy from branch `main` / root).

## What’s on the board

| Metric | What it shows |
| --- | --- |
| **SLA** | Share of cases that met contracted first-response and resolution targets |
| **Cases handled** | Volume this period, plus open / in progress / resolved |
| **MTTR** | Mean time to resolution, in hours, against a 6-hour target |
| **Escalations** | Open executive / specialist cases with owner and age |
| **Maintenance window** | Next planned change window and upcoming / completed work |

The first cut uses **sample data** so the page is usable immediately. Numbers are labeled as sample on the dashboard.

## Edit the numbers

All starter figures live in the `DATA` object near the bottom of `index.html`. Change the values, save, and refresh the page. No build step.

## Local preview

```bash
# from this folder
python -m http.server 8080
```

Then open `http://localhost:8080`.
