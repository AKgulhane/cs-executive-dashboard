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
 ('BNK-NLB','Northline Bank, N.A.','Northline Bank','vip','live','mid','Priya Nair','Priya Nair','2025-11-03','America/New_York'),
 ('BNK-HLH','Helios Health Credit Union','Helios Health','vip','live','mid','Marcus Lee','Marcus Lee','2026-02-18','America/Chicago'),
 ('BNK-APR','Aperture Retail Bank','Aperture Retail','standard','at_risk','community','Elena Vargas',NULL,'2026-04-01','America/Los_Angeles'),
 ('BNK-CBL','Cobalt Logistics Bank','Cobalt Logistics','standard','live','community','Jonah Kim',NULL,'2026-01-20','America/Denver');

INSERT INTO sla_policies VALUES
 ('SLA-P1-STD','P1','standard',15,240),
 ('SLA-P2-STD','P2','standard',60,480),
 ('SLA-P3-STD','P3','standard',240,480),
 ('SLA-P4-STD','P4','standard',480,1440),
 ('SLA-P1-VIP','P1','vip',10,180),
 ('SLA-P2-VIP','P2','vip',30,360),
 ('SLA-P3-VIP','P3','vip',120,480),
 ('SLA-P4-VIP','P4','vip',240,1440);

INSERT INTO tickets VALUES
 ('CS-1842','BNK-NLB',NULL,'phone','P1','escalated','incident','Cannot complete live close — portal timeout','AGT-PRIYA','SLA-P1-VIP',NULL,'2026-08-16T03:10:00Z','2026-08-16T03:18:00Z',NULL,NULL,1),
 ('CS-1831','BNK-HLH',NULL,'email','P2','escalated','sba','504 package missing third-party reports','AGT-MARCUS','SLA-P2-VIP',NULL,'2026-08-15T14:02:00Z','2026-08-15T14:40:00Z',NULL,NULL,1),
 ('CS-1819','BNK-APR',NULL,'chat','P2','escalated','lending','Term sheet fields not mapping','AGT-ELENA','SLA-P2-STD',NULL,'2026-08-14T16:22:00Z','2026-08-14T17:05:00Z',NULL,NULL,0),
 ('CS-1804','BNK-CBL',NULL,'in_product','P3','open','documents','CRE exhibit list','AGT-JONAH','SLA-P3-STD',NULL,'2026-08-12T18:11:00Z','2026-08-12T19:00:00Z',NULL,NULL,0);

INSERT INTO escalations VALUES
 ('ESC-1842','CS-1842','VIP','EXEC','Live close blocked','AGT-PRIYA','open','2026-08-16T03:22:00Z','2026-08-16T05:00:00Z',NULL),
 ('ESC-1831','CS-1831','L1','L2','504 package completeness','AGT-SARA','open','2026-08-15T15:10:00Z','2026-08-16T14:00:00Z',NULL),
 ('ESC-1819','CS-1819','L1','L3','Product mapping after release','AGT-ELENA','open','2026-08-14T18:40:00Z','2026-08-16T16:00:00Z',NULL),
 ('ESC-1804','CS-1804','L1','L2','CRE exhibit list','AGT-REED','open','2026-08-13T12:00:00Z','2026-08-16T18:00:00Z',NULL);

INSERT INTO knowledge_articles VALUES
 ('KB-001','Reset your portal password','customer','access','Unlock a user without a ticket.','Use Forgot password. Locks after 3 failures.','AGT-ELENA','published','access','2026-08-10T00:00:00Z'),
 ('KB-002','Check application or loan status','customer','status','Where a file sits after submit.','Pipeline statuses from Draft to Booked.','AGT-JONAH','published','status','2026-08-08T00:00:00Z'),
 ('KB-004','SBA 7(a) vs 504','customer','sba','A chooser, not a credit decision.','7(a) working capital; 504 major fixed assets via CDC.','AGT-SARA','published','sba','2026-08-05T00:00:00Z');

INSERT INTO daily_metrics VALUES
 ('2026-08-16',186,18,11,157,97.2,91.0,1.6,3.8,28.0,4,9);
