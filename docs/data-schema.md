# Data schema

Physical model for the Customer Support function. Source of truth: `db/schema.sql`. Starter rows: `db/seed.sql`.

The live dashboard reads the same entities (as JSON) so the board and the database stay aligned.

## Entity relationship (logical)

```
banks 1──* contacts
banks 1──* tickets
banks 1──* comms_touchpoints
agents 1──* tickets (assignee)
teams  1──* agents
tickets 1──* ticket_events
tickets 1──* ticket_messages
tickets 0──1 escalations (open)
tickets *──* knowledge_articles (suggested / used)
sla_policies 1──* tickets
knowledge_articles 1──* article_feedback
incidents 1──* tickets
maintenance_windows 1──* sla_pauses
```

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
| `ai_deflections` | Bot / help-center resolutions (no human ticket) |

## Column dictionary (core)

### banks

| Column | Type | Notes |
| --- | --- |
| bank_id | TEXT PK | `BNK-…` |
| legal_name | TEXT | |
| short_name | TEXT | Dashboard label |
| tier | TEXT | `standard` \| `vip` |
| stage | TEXT | onboarding / live / at_risk |
| aum_segment | TEXT | for staffing, not billing |
| named_csm | TEXT | |
| named_support_owner | TEXT | required if VIP |
| go_live_date | DATE | |
| contact_region | TEXT | `APAC` \| `EMEA` \| `AMER` — customer contact region; tickets and SLA clocks inherit this |
| timezone | TEXT | |

### tickets

| Column | Type | Notes |
| --- | --- |
| ticket_id | TEXT PK | `CS-…` |
| bank_id | TEXT FK | |
| contact_id | TEXT FK | |
| channel | TEXT | email, chat, phone, in_product |
| priority | TEXT | P1–P4 |
| status | TEXT | new, open, pending, escalated, solved, closed |
| intent | TEXT | access, status, documents, lending, sba, incident, billing, other |
| subject | TEXT | |
| assignee_id | TEXT FK | |
| sla_policy_id | TEXT FK | |
| first_responded_at | DATETIME | |
| solved_at | DATETIME | |
| csat_score | INTEGER | 1–5, null until surveyed |
| deflected | INTEGER | 0/1 — created only for audit of bot handoff |
| is_vip | INTEGER | denormalized from bank.tier |

### sla_policies

| Column | Type | Notes |
| --- | --- |
| sla_policy_id | TEXT PK | |
| priority | TEXT | |
| tier | TEXT | |
| first_response_minutes | INTEGER | |
| resolve_minutes | INTEGER | business minutes except P1 (clock minutes) |

### daily_metrics

| Column | Type | Notes |
| --- | --- |
| metric_date | DATE | |
| cases_handled | INTEGER | |
| cases_open | INTEGER | |
| cases_in_progress | INTEGER | |
| cases_resolved | INTEGER | |
| sla_attainment_pct | REAL | |
| csat_pct | REAL | |
| first_response_hours | REAL | median |
| mttr_hours | REAL | mean |
| deflection_pct | REAL | |
| escalations_open | INTEGER | |
| escalations_month | INTEGER | |

## Integrity rules

- A VIP bank must have `named_support_owner`.  
- P1 tickets cannot be `pending` without an incident or customer-pause event.  
- Escalation insert must write a `ticket_events` row with `event_type = 'escalated'`.  
- `article_feedback` cannot exist without a published article.  
- `daily_metrics` is one row per calendar date.
- Tickets inherit `banks.contact_region`. Business-minute SLAs use that region’s clock.

## Mapping to the dashboard

| Dashboard tile | Source |
| --- | --- |
| SLA | `daily_metrics.sla_attainment_pct` + ticket SLA clocks |
| Cases handled | `daily_metrics.cases_*` |
| Cases by region | `banks.contact_region` + tickets |
| MTTR | `daily_metrics.mttr_hours` |
| Escalations | `escalations` where status = open |
| Maintenance | `maintenance_windows` |
| CSAT | `daily_metrics.csat_pct` |
| First response | `daily_metrics.first_response_hours` |
| Ticket deflection | `daily_metrics.deflection_pct` |
