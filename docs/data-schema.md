# Data schema

Physical model for the Customer Support function. Source of truth: `db/schema.sql`. Starter rows: `db/seed.sql`.

The live dashboard reads the same entities (as JSON) so the board and the database stay aligned.

## Tables

| Table | Purpose |
| --- | --- |
| `teams` | L1, L2 Lending, L2 SBA, VIP, Ops |
| `agents` | Support staff, SMEs, leads |
| `banks` | Customer institutions |
| `contacts` | People at the bank |
| `sla_policies` | Priority × tier → response / resolve targets |
| `tickets` | One record per contact / case |
| `ticket_events` | Immutable audit (create, assign, escalate, pause, solve) |
| `ticket_messages` | Channel transcripts |
| `escalations` | L2 / L3 / Exec records |
| `knowledge_articles` | Help center + internal playbooks |
| `article_feedback` | Helpful / not helpful |
| `macros` | Password reset, status, docs |
| `automations` | Routing, SLA alert, follow-up, health check |
| `comms_touchpoints` | Proactive notices sent to banks |
| `incidents` | Sev-1 / Sev-2 platform events |
| `maintenance_windows` | Planned change that can pause SLA |
| `daily_metrics` | CSAT, FRT, MTTR, deflection, volume |
| `ai_deflections` | Bot / help-center resolutions |

See `db/schema.sql` for column types and constraints. Mapping to dashboard tiles is in the same file comments and on the [schema page](https://akgulhane.github.io/schema.html).
