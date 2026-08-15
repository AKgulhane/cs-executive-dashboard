(function () {
  const M = SUPPORT.metrics;
  const customers = M.customers || [];
  const pill = (kind, text) => `<span class="status-pill ${kind}">${text}</span>`;
  const healthKind = (h) => ({ critical: "off", at_risk: "off", watch: "watch", on_track: "on" }[h] || "watch");
  function deptSummary() {
    const critical = customers.filter((c) => c.health === "critical");
    const atRisk = customers.filter((c) => c.health === "at_risk");
    const p3 = (M.mttr.byPriority.find((p) => p.name === "P3") || {}).hours;
    const fr = (M.sla.byPriority.find((p) => p.name.indexOf("First") === 0) || {}).value;
    return {
      title: "Department briefing",
      body: `Support is meeting its quality bar this period (${SUPPORT.period}): SLA ${M.sla.attainment}% (target ${M.sla.target}%), CSAT ${M.csat.pct}% on ${M.csat.n} surveys, median first response ${M.frt.hours}h, MTTR ${M.mttr.hours}h. Volume is ${M.cases.handled} cases handled (${M.cases.delta}). The board is not green. Ticket deflection is ${M.deflection.pct}% against a ${M.deflection.target}% target. ${M.escalations.open} escalations are open (${critical.length} critical, ${atRisk.length} at-risk banks). P3 MTTR is ${p3}h. First-response SLA is ${fr}%.`,
      cite: "daily_metrics · tickets · escalations · 16 Aug 2026"
    };
  }
  function customerBrief(c) {
    if (!c) return { title: "Unknown bank", body: "No matching customer in this period.", cite: "customers" };
    return {
      title: c.name,
      body: `${c.headline} Health: ${c.health.replace("_", " ")}. Tier: ${c.tier}. Owner: ${c.owner}. Open tickets ${c.openTickets}, escalations ${c.escalations}, last touch ${c.lastTouch}. ${c.csat == null ? "No CSAT yet." : "CSAT " + c.csat + "%"} Risks: ${c.risks.join("; ")}. Wins: ${c.wins.join("; ")}. Ask: ${c.ask} Talking points: ${c.talkingPoints.join(" ")}`,
      cite: c.id + " · " + c.owner
    };
  }
  function answers() {
    const nlb = customers.find((c) => c.id === "BNK-NLB") || {};
    const apr = customers.find((c) => c.id === "BNK-APR") || {};
    return {
      dept: deptSummary(),
      attention: { title: "Executive attention", body: `1) ${nlb.name} (VIP, P1) — ${nlb.headline} Ask: ${nlb.ask} 2) ${apr.name} (at-risk) — ${apr.headline} Ask: ${apr.ask} Helios needs an SME review, not an exec call. Cobalt is a KB miss aging 4 days — close it.`, cite: "escalations · bank.stage" },
      deflect: { title: "Deflection gap", body: `Deflection is ${M.deflection.pct}% versus ${M.deflection.target}%. How-to is the largest type (${M.cases.byType[0].value}). Push in-product reset, status, and CRE/SBA checklists before hiring more L1.`, cite: "ai_deflections · cases.byType" },
      northline: { title: "Northline Bank — talking points", body: (nlb.talkingPoints || []).map((t, i) => (i + 1) + ". " + t).join(" "), cite: "CS-1842 · Priya Nair" },
      staff: { title: "Headcount vs automation", body: "Stage A: finish SBA SME academy before adding L1. Automation next: in-app status, password default, CRE article. A fourth L1 now hides the deflection miss.", cite: "BRD Stage A/B" }
    };
  }
  function matchQuestion(text) {
    const q = text.toLowerCase();
    const map = answers();
    if (/northline|diana|live close|p1/.test(q)) return map.northline;
    if (/aperture/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-APR"));
    if (/helios|504|sba/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-HLH"));
    if (/cobalt|cre/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-CBL"));
    if (/harbor|onboard/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-FHC"));
    if (/deflect|self-service|help center|bot/.test(q)) return map.deflect;
    if (/hire|headcount|staff|automat/.test(q)) return map.staff;
    if (/who|attention|today|risk|escalat/.test(q)) return map.attention;
    if (/csat|frt|mttr|sla|department|how are we|summary|brief|perform/.test(q)) return map.dept;
    return { title: "Grounded answer", body: "I can brief the department, name who needs attention, explain deflection, draft Northline talking points, or compare hiring vs automation. Ask a bank by name. I will not invent a credit or SBA decision.", cite: "insight engine" };
  }
  function renderDept() {
    const el = document.getElementById("deptBrief");
    if (!el) return;
    const s = deptSummary();
    el.innerHTML = `<p>${s.body}</p><p class="lead">${s.cite}</p><ol class="actions"><li><strong>Today:</strong> Northline timed update; pair Sara on Helios 504.</li><li><strong>This week:</strong> Aperture CSM call; publish CRE article; close Cobalt.</li><li><strong>This month:</strong> in-app status + reset or miss 35% deflection.</li></ol><div class="fb" data-target="dept"><span>Was this briefing useful?</span><button type="button" data-v="up">Yes</button><button type="button" class="ghost" data-v="down">Needs work</button><span class="lead" id="deptFb"></span></div>`;
  }
  function selectCustomer(id) {
    document.querySelectorAll(".customer-card").forEach((c) => c.classList.toggle("on", c.dataset.id === id));
    const c = customers.find((x) => x.id === id);
    const d = document.getElementById("customerDetail");
    if (!c || !d) return;
    d.innerHTML = `<h2>${c.name}</h2><p class="lead">${c.tier.toUpperCase()} · ${c.stage} · ${c.owner} · ${c.lastTouch}</p><p>${c.headline}</p><div class="stat-split"><div class="stat"><b>${c.openTickets}</b><span>Open tickets</span></div><div class="stat"><b>${c.escalations}</b><span>Escalations</span></div><div class="stat"><b>${c.csat == null ? "—" : c.csat + "%"}</b><span>CSAT</span></div></div><h3>Risks</h3><ul>${c.risks.map((r) => "<li>" + r + "</li>").join("")}</ul><h3>What’s working</h3><ul>${c.wins.map((r) => "<li>" + r + "</li>").join("")}</ul><h3>Ask of the executive</h3><p>${c.ask}</p><h3>Talking points</h3><ol>${c.talkingPoints.map((t) => "<li>" + t + "</li>").join("")}</ol><div class="fb" data-target="${c.id}"><span>Is this customer brief usable?</span><button type="button" data-v="up">Yes</button><button type="button" class="ghost" data-v="down">Needs work</button><span class="lead fb-note"></span></div>`;
  }
  function renderCustomers() {
    const box = document.getElementById("customerList");
    if (!box) return;
    box.innerHTML = customers.map((c) => `<article class="customer-card" data-id="${c.id}"><h3>${c.name} ${pill(healthKind(c.health), c.health.replace("_", " "))} ${c.tier === "vip" ? pill("watch", "VIP") : ""}</h3><p>${c.headline}</p></article>`).join("");
    box.querySelectorAll(".customer-card").forEach((card) => card.addEventListener("click", () => selectCustomer(card.dataset.id)));
    if (customers[0]) selectCustomer(customers[0].id);
  }
  function addBubble(log, role, ans) {
    const div = document.createElement("div");
    div.className = "bubble " + role;
    div.innerHTML = role === "bot" ? `<strong>${ans.title}</strong><br>${ans.body}<span class="cite">${ans.cite}</span>` : ans;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
  function ask(text) {
    const log = document.getElementById("chatLog");
    if (!log || !text.trim()) return;
    addBubble(log, "user", text.trim());
    addBubble(log, "bot", matchQuestion(text));
  }
  function bindChat() {
    const log = document.getElementById("chatLog");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const chips = document.getElementById("presetChips");
    if (!log || !form) return;
    addBubble(log, "bot", { title: "AI insights", body: "Ask the board. Answers are grounded in this period’s sample metrics and cite their tables.", cite: "no API key on GitHub Pages" });
    (SUPPORT.presets || []).forEach((p) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip"; b.textContent = p.label;
      b.addEventListener("click", () => ask(p.label));
      chips.appendChild(b);
    });
    form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); input.value = ""; });
    const q = new URLSearchParams(location.search).get("q");
    if (q) ask(q);
  }
  function bindFeedback() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".fb button");
      if (!btn) return;
      const wrap = btn.closest(".fb");
      const all = JSON.parse(localStorage.getItem("cs-insight-fb") || "[]");
      all.push({ target: wrap.dataset.target, v: btn.dataset.v, at: new Date().toISOString() });
      localStorage.setItem("cs-insight-fb", JSON.stringify(all));
      const note = wrap.querySelector(".fb-note, #deptFb");
      if (note) note.textContent = btn.dataset.v === "up" ? "Saved — keep this shape." : "Saved — we will tighten the brief.";
    });
  }
  function renderDashboardStrip() {
    const el = document.getElementById("aiStrip");
    if (!el) return;
    const s = deptSummary();
    const attn = customers.filter((c) => c.health === "critical" || c.health === "at_risk");
    el.innerHTML = `<h2>AI briefing</h2><p class="lead">Department summary plus who needs a human today. Full chat on <a href="insights.html">AI insights</a>.</p><p>${s.body.split("The board is not green.")[0]}</p><p><strong>Attention:</strong> ${attn.map((c) => c.name + " — " + c.ask).join(" · ")}</p><div class="chips">${(SUPPORT.presets || []).map((p) => `<a class="chip" href="insights.html?q=${encodeURIComponent(p.label)}">${p.label}</a>`).join("")}</div>`;
  }
  renderDept();
  renderCustomers();
  bindChat();
  bindFeedback();
  renderDashboardStrip();
})();
