-- Starter dataset aligned to the executive dashboard (1–16 Aug 2026)

INSERT INTO teams VALUES
 ('TEAM-L1','Frontline L1','L1','Email, chat, phone, in-product. Macros and KB.'),
 ('TEAM-LEND','Lending SME','L2','Commercial credit and banking operations.'),
 ('TEAM-SBA','SBA Programs','L2','7(a), 504, eligibility, file completeness.'),
 ('TEAM-VIP','VIP / Enterprise','VIP','Named banks, executive-originated, P1.'),
 ('TEAM-OPS','Support Operations','OPS','Tooling, routing, reporting, automations.'),
 ('TEAM-LEAD','Leadership','LEAD','Queue health, hiring, exec escalations.');

INSERT INTO agents VALUES
 ('AGT-PRIYA','Priya Nair','Head of Customer Support','TEAM-LEAD','priya.nair@example.com','active','2026-01-13',1),
 ('AGT-MARCUS','Marcus Lee','Support Team Lead','TEAM-LEAD','marcus.lee@example.com','active','2026-03-02',1),
 ('AGT-ELENA','Elena Vargas','L1 Support Specialist','TEAM-L1','elena.vargas@example.com','active','2026-03-16',1),
 ('AGT-JONAH','Jonah Kim','L1 Support Specialist','TEAM-L1','jonah.kim@example.com','active','2026-04-07',1),
 ('AGT-REED','Reed Okonkwo','L2 Lending SME','TEAM-LEND','reed.okonkwo@example.com','active','2026-05-04',1),
 ('AGT-SARA','Sara Nguyen','L2 SBA / Programs SME','TEAM-SBA','sara.nguyen@example.com','onboarding','2026-08-04',0);

INSERT INTO banks VALUES
 ('BNK-NLB','Northline Bank, N.A.','Northline Bank','vip','live','mid','Priya Nair','Priya Nair','2025-11-03','AMER','America/New_York'),
 ('BNK-HLH','Helios Health Credit Union','Helios Health','vip','live','mid','Marcus Lee','Marcus Lee','2026-02-18','EMEA','Europe/London'),
 ('BNK-APR','Aperture Retail Bank','Aperture Retail','standard','at_risk','community','Elena Vargas',NULL,'2026-04-01','APAC','Asia/Singapore'),
 ('BNK-CBL','Cobalt Logistics Bank','Cobalt Logistics','standard','live','community','Jonah Kim',NULL,'2026-01-20','EMEA','Europe/Berlin'),
 ('BNK-FHC','First Harbor Community Bank','First Harbor','standard','onboarding','community','Elena Vargas',NULL,'2026-08-11','AMER','America/New_York');

INSERT INTO contacts VALUES
 ('CON-001','BNK-NLB','Diana Cho','EVP Operations','dcho@northline.example','212-555-0140',1),
 ('CON-002','BNK-HLH','Tom Alvarez','SBA Manager','talvarez@helios.example','312-555-0194',0),
 ('CON-003','BNK-APR','Nina Patel','Ops Analyst','npatel@aperture.example','415-555-0108',0),
 ('CON-004','BNK-CBL','Chris Boone','Controller','cboone@cobalt.example','720-555-0166',0);

INSERT INTO sla_policies VALUES
 ('SLA-P1-STD','P1','standard',15,240),
 ('SLA-P2-STD','P2','standard',60,480),
 ('SLA-P3-STD','P3','standard',240,480),
 ('SLA-P4-STD','P4','standard',480,1440),
 ('SLA-P1-VIP','P1','vip',10,180),
 ('SLA-P2-VIP','P2','vip',30,360),
 ('SLA-P3-VIP','P3','vip',120,480),
 ('SLA-P4-VIP','P4','vip',240,1440);

INSERT INTO incidents VALUES
 ('INC-2026-014','SEV2','Identity API failover drill','resolved','2026-08-09T02:00:00Z','2026-08-09T02:45:00Z','2026-08-09T02:30:00Z');

INSERT INTO tickets VALUES
 ('CS-1842','BNK-NLB','CON-001','phone','P1','escalated','incident','Cannot complete live close — portal timeout','AGT-PRIYA','SLA-P1-VIP','INC-2026-014','2026-08-16T03:10:00Z','2026-08-16T03:18:00Z',NULL,NULL,1),
 ('CS-1831','BNK-HLH','CON-002','email','P2','escalated','sba','504 debenture package missing third-party report list','AGT-MARCUS','SLA-P2-VIP',NULL,'2026-08-15T14:02:00Z','2026-08-15T14:40:00Z',NULL,NULL,1),
 ('CS-1819','BNK-APR','CON-003','chat','P2','escalated','lending','Term sheet fields not mapping after product change','AGT-ELENA','SLA-P2-STD',NULL,'2026-08-14T16:22:00Z','2026-08-14T17:05:00Z',NULL,NULL,0),
 ('CS-1804','BNK-CBL','CON-004','in_product','P3','open','documents','Which exhibits are required for owner-occupied CRE','AGT-JONAH','SLA-P3-STD',NULL,'2026-08-12T18:11:00Z','2026-08-12T19:00:00Z',NULL,NULL,0),
 ('CS-1790','BNK-FHC','CON-003','email','P3','solved','access','Reset portal password for new credit analyst','AGT-ELENA','SLA-P3-STD',NULL,'2026-08-11T13:04:00Z','2026-08-11T13:11:00Z','2026-08-11T13:14:00Z',5,0),
 ('CS-1784','BNK-CBL','CON-004','chat','P4','solved','status','Where is loan 8821 in underwriting','AGT-JONAH','SLA-P4-STD',NULL,'2026-08-10T15:40:00Z','2026-08-10T15:48:00Z','2026-08-10T16:10:00Z',4,0);

INSERT INTO ticket_events (ticket_id,event_type,actor_id,note,occurred_at) VALUES
 ('CS-1842','created','CON-001','Phone intake','2026-08-16T03:10:00Z'),
 ('CS-1842','first_response','AGT-PRIYA','VIP path — Head of Support on bridge','2026-08-16T03:18:00Z'),
 ('CS-1842','escalated','AGT-PRIYA','Exec + Eng on Sev-2','2026-08-16T03:22:00Z'),
 ('CS-1831','created','CON-002',NULL,'2026-08-15T14:02:00Z'),
 ('CS-1831','first_response','AGT-MARCUS',NULL,'2026-08-15T14:40:00Z'),
 ('CS-1831','escalated','AGT-MARCUS','Needs SBA SME review','2026-08-15T15:10:00Z'),
 ('CS-1790','created','CON-003',NULL,'2026-08-11T13:04:00Z'),
 ('CS-1790','first_response','AGT-ELENA','Macro: password reset','2026-08-11T13:11:00Z'),
 ('CS-1790','solved','AGT-ELENA',NULL,'2026-08-11T13:14:00Z'),
 ('CS-1790','csat','CON-003','5','2026-08-11T15:02:00Z');

INSERT INTO escalations VALUES
 ('ESC-1842','CS-1842','VIP','EXEC','Live close blocked for Northline','AGT-PRIYA','open','2026-08-16T03:22:00Z','2026-08-16T05:00:00Z',NULL),
 ('ESC-1831','CS-1831','L1','L2','504 package completeness — policy, not defect','AGT-SARA','open','2026-08-15T15:10:00Z','2026-08-16T14:00:00Z',NULL),
 ('ESC-1819','CS-1819','L1','L3','Product mapping after release','AGT-ELENA','open','2026-08-14T18:40:00Z','2026-08-16T16:00:00Z',NULL),
 ('ESC-1804','CS-1804','L1','L2','CRE exhibit list confirmation','AGT-REED','open','2026-08-13T12:00:00Z','2026-08-16T18:00:00Z',NULL);

INSERT INTO knowledge_articles VALUES
 ('KB-001','Reset your portal password','customer','access',
  'Unlock a user and send a one-time reset without a ticket.','Use Forgot password on the login page. Bank admins can also reset from Admin → Users. After three failed attempts the account locks for 15 minutes.','AGT-ELENA','published','access','2026-08-10T00:00:00Z'),
 ('KB-002','Check application or loan status','customer','status',
  'Where a file sits after submit.','Open Pipeline → the loan. Status values: Draft, Submitted, In underwriting, Credit decision, Docs requested, Ready to close, Booked. Hover the timestamp for the last human action.','AGT-JONAH','published','status','2026-08-08T00:00:00Z'),
 ('KB-003','Commercial loan document checklist','customer','documents',
  'Owner-occupied CRE and C&I starter list.','Entity docs, debt schedule, two years business tax returns, YTD financials, AR/AP aging if C&I, rent roll if investor CRE, insurance binder, personal PFS for guarantors.','AGT-REED','published','documents','2026-08-01T00:00:00Z'),
 ('KB-004','SBA 7(a) vs 504 — which program','customer','sba',
  'A bank-facing chooser, not a credit decision.','7(a) is working capital, acquisition, and refinance. 504 is major fixed assets via CDC + bank. This article does not approve eligibility. Escalate to L2 SBA if the file is mixed-use or change-of-ownership.','AGT-SARA','published','sba','2026-08-05T00:00:00Z'),
 ('KB-005','SBA 504 third-party reports','internal','sba',
  'When appraisal, environmental, and construction reports are required.','Internal playbook. Do not paste wholesale to the customer. Confirm CDC and SOP version before sending a list.','AGT-SARA','published','sba','2026-08-12T00:00:00Z'),
 ('KB-006','P1 and VIP tone','internal','operations',
  'How we speak on a live close.','Name the impact, the owner, and the next update time. Never guess a credit outcome. Conference Credit if the question is eligibility.','AGT-PRIYA','published',NULL,'2026-07-20T00:00:00Z');

INSERT INTO macros VALUES
 ('MAC-RESET','Password reset and unlock','access','email','Sent a reset link and unlocked the user. Link expires in 60 minutes.',0),
 ('MAC-STATUS','Loan status snapshot','status','chat','Current status, last actor, and next expected action from the pipeline object.',0),
 ('MAC-DOCS','Missing document list','documents','email','Attached the checklist for the product type. Reply with uploads or a question per item.',0);

INSERT INTO automations VALUES
 ('AUTO-ROUTE','Intent routing','ticket.created','Set intent + team from subject/body classifier',1,1),
 ('AUTO-SLA','SLA risk page','sla.80_percent','Notify assignee and lead on Slack + email',1,1),
 ('AUTO-VIP','VIP skip L1','ticket.created AND bank.tier=vip AND priority IN (P1,P2)','Assign named_support_owner',1,1),
 ('AUTO-CSAT','CSAT send','ticket.solved','Send survey T+1 hour',1,1),
 ('AUTO-INC','Incident notice','incident.opened','Email + in-app banner to live banks',2,1),
 ('AUTO-HEALTH','Silent account check','weekly.monday','Email CSM + Support if no login 14d',2,0),
 ('AUTO-BOT','Chatbot deflection','chat.intent IN (access,status,documents)','Resolve via article; escalate if confidence < 0.7',2,0);

INSERT INTO comms_touchpoints VALUES
 ('COM-001','BNK-NLB','incident','email','Identity API failover — next update 05:00 UTC','2026-08-16T03:25:00Z',0),
 ('COM-002',NULL,'maintenance','email','Scheduled maintenance 23 Aug 02:00–04:00 UTC','2026-08-14T15:00:00Z',1),
 ('COM-003','BNK-APR','health_check','email','Aperture Retail — 11 days without a successful submit','2026-08-15T12:00:00Z',1);

INSERT INTO maintenance_windows VALUES
 ('MW-023','2026-08-23T02:00:00Z','2026-08-23T04:00:00Z','Identity API failover drill','Read-only admin console','scheduled','2026-08-21T02:00:00Z'),
 ('MW-030','2026-08-30T01:00:00Z','2026-08-30T03:00:00Z','Document store patch','Upload latency possible','scheduled','2026-08-28T01:00:00Z'),
 ('MW-009','2026-08-09T02:00:00Z','2026-08-09T02:45:00Z','CDN certificate rotation','None observed','completed','2026-08-07T02:00:00Z');

INSERT INTO ai_deflections (occurred_at,channel,intent,resolver,article_id,handed_to_human) VALUES
 ('2026-08-16T12:04:00Z','in_app','access','help_center','KB-001',0),
 ('2026-08-16T13:22:00Z','chat','status','chatbot','KB-002',0),
 ('2026-08-15T17:01:00Z','in_app','documents','help_center','KB-003',0),
 ('2026-08-15T18:40:00Z','chat','sba','chatbot','KB-004',1);

INSERT INTO daily_metrics VALUES
 ('2026-08-16',186,18,11,157,97.2,100.0,96.4,97.8,94.1,91.0,1.6,3.8,1.4,4.1,7.6,28.0,4,9);
