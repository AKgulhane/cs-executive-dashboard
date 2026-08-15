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
      byPriority: [
        { name: "P1", hours: 1.4 },
        { name: "P2", hours: 4.1 },
        { name: "P3", hours: 7.6 }
      ] },
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
    maintenance: {
      next: "23 Aug, 02:00–04:00 UTC",
      windows: [
        { date: "23 Aug", time: "02:00–04:00 UTC", title: "Identity API failover drill", impact: "Read-only admin console", status: "Scheduled" },
        { date: "30 Aug", time: "01:00–03:00 UTC", title: "Document store patch", impact: "Upload latency possible", status: "Scheduled" },
        { date: "09 Aug", time: "02:00–02:45 UTC", title: "CDN certificate rotation", impact: "None observed", status: "Completed" }
      ]
    }
  }
};
