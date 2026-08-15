# Product Requirements Document

**Product:** Customer Support Platform  
**Function:** Customer Support / Customer Success for bank customers  
**Domain:** Commercial lending, SBA programs, banking operations  
**Version:** 1.0  
**Date:** 16 August 2026  
**Status:** Approved for starter build  
**Owner:** Head of Customer Support

## 1. Problem

Bank customers need fast, accurate, auditable support across email, chat, phone, and in-product channels. Volume will grow from dozens of banks to hundreds. Without a defined support system, SLAs slip, escalations stall, and specialists spend time on password resets instead of lending questions.

## 2. Product vision

A single support operating system that:

- Routes every request to the right person with a running SLA clock
- Deflects high-volume, low-complexity work with self-service and AI
- Gives specialists time for consultative work on commercial lending and SBA
- Keeps VIP and incident communication automatic, not heroic

## 3. Goals

| ID | Goal | Measure |
| --- | --- | --- |
| G1 | Stand up the support function before scale | Team, SLAs, escalation paths, KB live |
| G2 | Protect response quality as volume grows | P1 first response ≤ 15 min; CSAT ≥ 90% |
| G3 | Deflect routine work | Ticket deflection ≥ 35% in 90 days, ≥ 50% at 200 banks |
| G4 | Resolve lending and SBA questions with domain expertise | ≥ 80% of L2 tickets closed without engineering |
| G5 | Make VIP and incident comms reliable | 100% of P1 incidents have a customer update in 30 min |

Non-goals (v1): replacing the bank core, a full CRM, multi-language, marketplace apps.

## 4. Users

Bank ops, credit/SBA officers, bank executives (VIP), L1 specialists, L2 SMEs, Support lead, Head of Support.

## 5. Phased scope

**Phase 1 (dozens of banks):** tickets on every contact, SLA clocks, VIP named owner, starter KB, reset/status macros, this dashboard.  
**Phase 2 (50–120):** channel routing, AI triage, SLA alerts, in-app help, incident templates, health-check digest.  
**Phase 3 (hundreds):** pods, chatbot, CSAT sequences, doc automation, capacity model.

## 6. Functional requirements

F1 ticket from email/chat/phone/in-product (P0). F2 SLA from priority + tier (P0). F3 escalate L1→L2→L3/Exec (P0). F4 knowledge articles (P0). F5 CSAT, FRT, resolution, deflection (P0). F6 VIP skip-the-line (P0). F7 macros for reset/status/docs (P0). F8 incident/maintenance notices (P1). F9 AI classification (P1). F10 chatbot (P2). F11 in-app guidance (P2). F12 health-check emails (P2).

## 7. Success metrics

| Metric | Phase 1 | Phase 3 |
| --- | --- | --- |
| CSAT | ≥ 88% | ≥ 92% |
| First response (median) | ≤ 2h | ≤ 30m |
| MTTR | ≤ 6h | ≤ 4h |
| Ticket deflection | ≥ 25% | ≥ 50% |
| P1 first response | ≤ 15m | ≤ 10m |

Full detail lives in this file’s companion [BRD](BRD.md) and [data schema](data-schema.md).
