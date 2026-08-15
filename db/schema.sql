-- Customer Support function — SQLite schema
-- sqlite3 db/support.db < db/schema.sql
PRAGMA foreign_keys = ON;

CREATE TABLE teams (
  team_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tier_level TEXT NOT NULL CHECK (tier_level IN ('L1','L2','L3','VIP','OPS','LEAD')),
  mandate TEXT NOT NULL
);
CREATE TABLE agents (
  agent_id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  team_id TEXT NOT NULL REFERENCES teams(team_id),
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','onboarding','leave')),
  hire_date DATE,
  academy_complete INTEGER NOT NULL DEFAULT 0 CHECK (academy_complete IN (0,1))
);
CREATE TABLE banks (
  bank_id TEXT PRIMARY KEY,
  legal_name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('standard','vip')),
  stage TEXT NOT NULL CHECK (stage IN ('onboarding','live','at_risk','churned')),
  aum_segment TEXT,
  named_csm TEXT,
  named_support_owner TEXT,
  go_live_date DATE,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  CHECK (tier = 'standard' OR named_support_owner IS NOT NULL)
);
CREATE TABLE contacts (
  contact_id TEXT PRIMARY KEY,
  bank_id TEXT NOT NULL REFERENCES banks(bank_id),
  full_name TEXT NOT NULL,
  title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  is_executive INTEGER NOT NULL DEFAULT 0 CHECK (is_executive IN (0,1))
);
CREATE TABLE sla_policies (
  sla_policy_id TEXT PRIMARY KEY,
  priority TEXT NOT NULL CHECK (priority IN ('P1','P2','P3','P4')),
  tier TEXT NOT NULL CHECK (tier IN ('standard','vip')),
  first_response_minutes INTEGER NOT NULL,
  resolve_minutes INTEGER NOT NULL,
  UNIQUE (priority, tier)
);
CREATE TABLE incidents (
  incident_id TEXT PRIMARY KEY,
  severity TEXT NOT NULL CHECK (severity IN ('SEV1','SEV2','SEV3')),
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('investigating','identified','monitoring','resolved')),
  started_at TEXT NOT NULL,
  resolved_at TEXT,
  customer_update_due_at TEXT
);
CREATE TABLE tickets (
  ticket_id TEXT PRIMARY KEY,
  bank_id TEXT NOT NULL REFERENCES banks(bank_id),
  contact_id TEXT REFERENCES contacts(contact_id),
  channel TEXT NOT NULL CHECK (channel IN ('email','chat','phone','in_product')),
  priority TEXT NOT NULL CHECK (priority IN ('P1','P2','P3','P4')),
  status TEXT NOT NULL CHECK (status IN ('new','open','pending','escalated','solved','closed')),
  intent TEXT NOT NULL CHECK (intent IN ('access','status','documents','lending','sba','incident','billing','other')),
  subject TEXT NOT NULL,
  assignee_id TEXT REFERENCES agents(agent_id),
  sla_policy_id TEXT NOT NULL REFERENCES sla_policies(sla_policy_id),
  incident_id TEXT REFERENCES incidents(incident_id),
  created_at TEXT NOT NULL,
  first_responded_at TEXT,
  solved_at TEXT,
  csat_score INTEGER CHECK (csat_score BETWEEN 1 AND 5),
  is_vip INTEGER NOT NULL DEFAULT 0 CHECK (is_vip IN (0,1))
);
CREATE TABLE ticket_events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT NOT NULL REFERENCES tickets(ticket_id),
  event_type TEXT NOT NULL,
  actor_id TEXT,
  note TEXT,
  occurred_at TEXT NOT NULL
);
CREATE TABLE escalations (
  escalation_id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(ticket_id),
  from_level TEXT NOT NULL,
  to_level TEXT NOT NULL CHECK (to_level IN ('L2','L3','EXEC','COMPLIANCE')),
  reason TEXT NOT NULL,
  owner_id TEXT REFERENCES agents(agent_id),
  status TEXT NOT NULL CHECK (status IN ('open','monitoring','resolved')),
  opened_at TEXT NOT NULL,
  next_update_at TEXT,
  resolved_at TEXT
);
CREATE TABLE knowledge_articles (
  article_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  audience TEXT NOT NULL CHECK (audience IN ('customer','internal')),
  domain TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  owner_id TEXT REFERENCES agents(agent_id),
  status TEXT NOT NULL DEFAULT 'published',
  deflects_intent TEXT,
  updated_at TEXT NOT NULL
);
CREATE TABLE macros (
  macro_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  intent TEXT NOT NULL,
  channel TEXT,
  body TEXT NOT NULL,
  requires_l2 INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE automations (
  automation_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  trigger TEXT NOT NULL,
  action TEXT NOT NULL,
  phase INTEGER NOT NULL CHECK (phase IN (1,2,3)),
  enabled INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE comms_touchpoints (
  touchpoint_id TEXT PRIMARY KEY,
  bank_id TEXT REFERENCES banks(bank_id),
  kind TEXT NOT NULL,
  channel TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TEXT NOT NULL,
  automated INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE maintenance_windows (
  window_id TEXT PRIMARY KEY,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  title TEXT NOT NULL,
  impact TEXT NOT NULL,
  status TEXT NOT NULL,
  customer_comms_due_at TEXT
);
CREATE TABLE ai_deflections (
  deflection_id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at TEXT NOT NULL,
  channel TEXT NOT NULL,
  intent TEXT NOT NULL,
  resolver TEXT NOT NULL,
  article_id TEXT REFERENCES knowledge_articles(article_id),
  handed_to_human INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE daily_metrics (
  metric_date DATE PRIMARY KEY,
  cases_handled INTEGER NOT NULL,
  cases_open INTEGER NOT NULL,
  cases_in_progress INTEGER NOT NULL,
  cases_resolved INTEGER NOT NULL,
  sla_attainment_pct REAL NOT NULL,
  csat_pct REAL NOT NULL,
  first_response_hours REAL NOT NULL,
  mttr_hours REAL NOT NULL,
  deflection_pct REAL NOT NULL,
  escalations_open INTEGER NOT NULL,
  escalations_month INTEGER NOT NULL
);
