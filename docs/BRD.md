# Business Requirements Document

**Initiative:** Build the customer support function from scratch  
**Customer segment:** Banks using the commercial lending / SBA platform  
**Version:** 1.0  
**Date:** 16 August 2026  
**Author:** Head of Customer Support

## 1. Business context

Move from founder-led support to a named Customer Support function as the book grows from dozens of banks to hundreds. Banks expect bank-grade responsiveness, an audit trail, and people who understand commercial lending and SBA—not a generic SaaS queue.

## 2. Objectives

Protect renewal. Scale headcount slower than tickets. Be consultative on lending and SBA. Stay examinable. Give executives one board (SLA, cases, MTTR, escalations, maintenance, CSAT, FRT, deflection).

## 3. Team structure

**Stage A (0–40 banks, 3.5 FTE):** Head of Support, 2 L1 generalists, fractional lending SME. Head still takes P1/VIP.  
**Stage B (40–120, 9 FTE):** + Team Lead, 4 L1, Lending SME, SBA SME, Support Ops.  
**Stage C (120–300+):** VIP pod, Knowledge Manager, Automation/AI owner. Keep L1:bank under 1:35 unless deflection > 40%.

Hiring bar: banking or fintech support preferred. 10-day academy (product, lending language, SBA 7(a)/504, VIP tone) before unsupervised chat.

## 4. Channels

Email (attachments/audit), chat (access/status), phone (VIP/P1), in-product (always-on, attach page + object id). Hours: Mon–Fri 08:00–20:00 ET. P1 is 24/7.

## 5. SLA rules

| Priority | First response | Resolve | VIP first response |
| --- | --- | --- | --- |
| P1 production / funds blocked | 15 min | 4 hours | 10 min |
| P2 major workflow blocked | 1 hour | 8 hours | 30 min |
| P3 standard | 4 hours | 1 business day | 2 hours |
| P4 request | 1 business day | 3 business days | 4 hours |

Pause only for customer-pending, bank-core / E-Tran, or announced maintenance.

## 6. Escalation

L1 (macros/KB) → L2 (lending/SBA/ops) → L3 (eng/product) → Executive.  
Parallel: Compliance for complaints / fair lending.  
VIP P1 and exec-originated skip L1. Record from, to, impact, owner, next update time.

## 7. Knowledge and self-service

Customer: passwords, status, document checklists, 7(a) vs 504 chooser, incidents.  
Internal: SBA decision tree, when to escalate to Credit, VIP tone, complaints.  
In-app widgets on login, pipeline, upload, program picker.

## 8. Tooling

Phase 1 required: helpdesk (system of record), phone, KB, CSAT, status page.  
Stage B required: AI triage, chatbot for access/status/docs.  
Bar: SOC 2, SSO, audit export, acceptable residency, API.

## 9. Automation and AI

Automate: password reset, loan status, missing-doc list, SLA risk alerts, incident/maintenance notices, CSAT, silent-account health check.  
Humans keep: eligibility, SBA interpretation, complaints, VIP emotion, anything that could be a credit decision.  
AI may suggest. AI may not invent program rules.

## 10. Metrics

CSAT, first response time, resolution time (MTTR), ticket deflection, cases handled, escalations open, SLA attainment, maintenance windows.

Assumptions: banks are the customer (not borrowers); English only in v1; Credit owns credit policy; sample data in this repo is illustrative.
