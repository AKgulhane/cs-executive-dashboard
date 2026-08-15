window.SUPPORT = {
  period: "1–16 August 2026",
  asOf: "16 Aug 2026, 09:40 UTC",
  metrics: {
    sla: { attainment: 97.2, target: 95, delta: "+1.4 pts vs July",
      byPriority: [
        { name: "P1 — Critical", value: 100, target: 99 },
        { name: "P2 — High", value: 96.4, target: 95 },
        { name: "P3 — Standard", value: 97.8, target: 90 },
        { name: "First response", value: 94.1, target: 95 }
      ] },
    csat: { pct: 91, target: 88, n: 74, delta: "+3 pts vs July" },
    frt: { hours: 1.6, target: 2, delta: "−0.4h vs July" },
    cases: {
      handled: 186, delta: "+12% vs July",
      open: 18, inProgress: 11, resolved: 157,
      byType: [
        { name: "How-to / enablement", value: 72 },
        { name: "Product defect", value: 41 },
        { name: "Billing / contract", value: 28 },
        { name: "Integration", value: 45 }
      ],
      byChannel: [
        { name: "Email", value: 81 },
        { name: "Chat", value: 54 },
        { name: "In-product", value: 33 },
        { name: "Phone", value: 18 }
      ]
    },
    mttr: { hours: 3.8, targetHours: 6, delta: "−0.6h vs July",
      byPriority: [{ name: "P1", hours: 1.4 }, { name: "P2", hours: 4.1 }, { name: "P3", hours: 7.6 }] },
    deflection: { pct: 28, target: 35, delta: "help center 19 · bot 9" },
    escalations: {
      open: 4, month: 9,
      items: [
        { id: "CS-1842", customer: "Northline Bank", severity: "P1", owner: "Priya N.", age: "6h", path: "VIP → Exec" },
        { id: "CS-1831", customer: "Helios Health", severity: "P2", owner: "Marcus L.", age: "1d", path: "L1 → L2 SBA" },
        { id: "CS-1819", customer: "Aperture Retail", severity: "P2", owner: "Elena V.", age: "2d", path: "L1 → L3 Eng" },
        { id: "CS-1804", customer: "Cobalt Logistics", severity: "P3", owner: "Jonah K.", age: "4d", path: "L1 → L2 Lending" }
      ]
    },
    customers: [
      { id: "BNK-NLB", name: "Northline Bank", tier: "vip", stage: "live", health: "critical", csat: null, openTickets: 1, escalations: 1, lastTouch: "6h ago", owner: "Priya Nair",
        headline: "P1 live close blocked — Head of Support on the bridge.",
        risks: ["Portal timeout on a funded close", "Executive-originated; reputation risk"],
        wins: ["VIP path fired in 8 minutes"],
        ask: "Call Diana Cho with a next-update time, not a root-cause guess.",
        talkingPoints: ["We own CS-1842 and the next update is 05:00 UTC.", "Identity failover is the suspected path; Engineering is on the bridge.", "We will confirm whether the close can complete before the 23 Aug window."] },
      { id: "BNK-HLH", name: "Helios Health", tier: "vip", stage: "live", health: "watch", csat: 90, openTickets: 1, escalations: 1, lastTouch: "1d ago", owner: "Marcus Lee",
        headline: "504 package completeness — policy question, not a defect.",
        risks: ["SBA SME still in academy", "Wrong exhibit list would be a credit-adjacent miss"],
        wins: ["First response inside VIP SLA"],
        ask: "Have Reed or Priya sit with Sara on the third-party report list before it goes to the bank.",
        talkingPoints: ["This is a 504 file-completeness question, not an eligibility decision.", "We will send the CDC-aligned exhibit list today.", "No product defect is indicated."] },
      { id: "BNK-APR", name: "Aperture Retail", tier: "standard", stage: "at_risk", health: "at_risk", csat: 78, openTickets: 1, escalations: 1, lastTouch: "2d ago", owner: "Elena Vargas",
        headline: "At-risk: term-sheet mapping plus 11 days without a successful submit.",
        risks: ["Adoption stall after a release", "CSAT below department", "L3 aging 2 days"],
        wins: ["Health-check email already sent"],
        ask: "CSM + Support joint call this week; do not wait on the L3 fix alone.",
        talkingPoints: ["We see the mapping issue after the product change (CS-1819).", "Engineering has it; you will get a workaround or a date today.", "We want a 20-minute working session so submits resume."] },
      { id: "BNK-CBL", name: "Cobalt Logistics", tier: "standard", stage: "live", health: "watch", csat: 86, openTickets: 1, escalations: 1, lastTouch: "4d ago", owner: "Jonah Kim",
        headline: "CRE exhibit question aging 4 days on L2 Lending.",
        risks: ["Oldest non-VIP escalation", "Looks like a KB gap, not a hard problem"],
        wins: ["In-product intake captured loan context"],
        ask: "Publish the owner-occupied CRE checklist answer and close today.",
        talkingPoints: ["Standard owner-occupied CRE exhibits — we will confirm Reed’s list today.", "This should become a help-center article."] },
      { id: "BNK-FHC", name: "First Harbor", tier: "standard", stage: "onboarding", health: "on_track", csat: 100, openTickets: 0, escalations: 0, lastTouch: "5d ago", owner: "Elena Vargas",
        headline: "Onboarding clean — password reset solved in 10 minutes, CSAT 5.",
        risks: ["Quiet after go-live; watch for a silent 14-day gap"],
        wins: ["Macro deflection worked"],
        ask: "Day-21 onboarding pulse; no executive action.",
        talkingPoints: ["Access is working. Next check-in is the day-21 pulse."] }
    ],
    maintenance: {
      next: "23 Aug, 02:00–04:00 UTC",
      windows: [
        { date: "23 Aug", time: "02:00–04:00 UTC", title: "Identity API failover drill", impact: "Read-only admin console", status: "Scheduled" },
        { date: "30 Aug", time: "01:00–03:00 UTC", title: "Document store patch", impact: "Upload latency possible", status: "Scheduled" },
        { date: "09 Aug", time: "02:00–02:45 UTC", title: "CDN certificate rotation", impact: "None observed", status: "Completed" }
      ]
    }
  },
  presets: [
    { id: "dept", label: "How is the department performing?" },
    { id: "attention", label: "Who needs executive attention today?" },
    { id: "deflect", label: "Why is deflection below target?" },
    { id: "northline", label: "What should I say to Northline Bank?" },
    { id: "staff", label: "Headcount or automation next?" }
  ]
};
