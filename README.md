# Customer Support function

Public operating system for Customer Support as we scale from dozens of **bank** customers to hundreds.

**Live site (no install):** [https://akgulhane.github.io/](https://akgulhane.github.io/)

Anyone with the link can open the dashboard, team plan, SLAs, escalation paths, knowledge base, operations, and data schema.

## What’s in this repo

| Path | What it is |
| --- | --- |
| [docs/PRD.md](docs/PRD.md) | Product requirements |
| [docs/BRD.md](docs/BRD.md) | Business requirements — team, SLAs, escalation, tooling |
| [docs/data-schema.md](docs/data-schema.md) | Table and column dictionary |
| [db/schema.sql](db/schema.sql) | Database schema |
| [db/seed.sql](db/seed.sql) | Starter data aligned to the board |
| `*.html` | Static site for GitHub Pages |

## Board metrics

SLA · cases handled · MTTR · escalations · maintenance · **CSAT** · **first response time** · **ticket deflection**

## Create the database

```bash
sqlite3 db/support.db < db/schema.sql
sqlite3 db/support.db < db/seed.sql
```

## Site map

- [Dashboard](https://akgulhane.github.io/)
- [Team](https://akgulhane.github.io/team.html)
- [SLAs & metrics](https://akgulhane.github.io/slas.html)
- [Escalations](https://akgulhane.github.io/escalations.html)
- [Knowledge base](https://akgulhane.github.io/knowledge.html)
- [Operations](https://akgulhane.github.io/operations.html)
- [Data schema](https://akgulhane.github.io/schema.html)

Numbers are **sample data**, labeled as such on the board.
