(function () {
  const M = SUPPORT.metrics;
  const customers = M.customers || [];
  const pill = (kind, text) => `<span class="status-pill ${kind}">${text}</span>`;
  const healthKind = (h) => ({ critical: "off", at_risk: "off", watch: "watch", on_track: "on" }[h] || "watch");

  function deptSummary() {
    const critical = customers.filter((c) => c.health === "critical");
    const atRisk = customers.filter((c) => c.health === "at_risk");
    return {
      title: "Department briefing",
      body:
        `Support is meeting its quality bar this period (${SUPPORT.period}): SLA ${M.sla.attainment}% (target ${M.sla.target}%), CSAT ${M.csat.pct}% on ${M.csat.n} surveys, median first response ${M.frt.hours}h, MTTR ${M.mttr.hours}h. ` +
        `Volume is ${M.cases.handled} cases handled (${M.cases.delta}). ` +
        `The board is not green. Ticket deflection is ${M.deflection.pct}% against a ${M.deflection.target}% target — resets and status still leak into the queue. ` +
        `${M.escalations.open} escalations are open (${critical.length} critical, ${atRisk.length} at-risk banks). ` +
        `Contact mix this period: AMER ${M.cases.byRegion[0].value}, EMEA ${M.cases.byRegion[1].value}, APAC ${M.cases.byRegion[2].value}. APAC first-response SLA (${M.cases.byRegion[2].sla}%) is the soft spot — coverage does not yet follow the sun. ` +
        `P3 MTTR is ${M.mttr.byPriority.find((p) => p.name === "P3").hours}h, the only priority over the 6h target. ` +
        `First-response SLA is ${M.sla.byPriority.find((p) => p.name.startsWith("First")).value}%, just under 95%.`,
      cite: "daily_metrics · tickets · banks.contact_region · 16 Aug 2026"
    };
  }

  function answers() {
    const nlb = customers.find((c) => c.id === "BNK-NLB");
    const apr = customers.find((c) => c.id === "BNK-APR");
    return {
      dept: deptSummary(),
      attention: {
        title: "Executive attention",
        body:
          `1) ${nlb.name} (VIP, P1) — ${nlb.headline} Ask: ${nlb.ask} ` +
          `2) ${apr.name} (at-risk) — ${apr.headline} Ask: ${apr.ask} ` +
          `Helios Health (EMEA) is a VIP SBA file that needs an SME review, not an exec call, unless Sara cannot close it today. Cobalt (EMEA) is a knowledge-base miss aging 4 days — close it, don’t escalate further. Aperture is the only open APAC escalation; do not wait for AMER morning.`,
        cite: "escalations open · banks.contact_region · VIP path"
      },
      region: {
        title: "APAC · EMEA · AMER",
        body:
          `AMER (${M.cases.byRegion[0].hours}) is ${M.cases.byRegion[0].value} cases (SLA ${M.cases.byRegion[0].sla}%) with ${M.cases.byRegion[0].open} open — ${M.cases.byRegion[0].banks}. Northline P1 is the only executive item. ` +
          `EMEA (${M.cases.byRegion[1].hours}) is ${M.cases.byRegion[1].value} cases (SLA ${M.cases.byRegion[1].sla}%) with Helios (VIP 504) and Cobalt (CRE exhibits) still open; London/Frankfurt hours are live now. ` +
          `APAC (${M.cases.byRegion[2].hours}) is ${M.cases.byRegion[2].value} cases (SLA ${M.cases.byRegion[2].sla}%, below 95%) — Aperture Retail in Singapore is at-risk and the L3 mapping ticket is aging while AMER sleeps. Route P2+ APAC to Elena’s APAC overlap or page Priya; do not park it on the ET queue.`,
        cite: "cases.byRegion · banks.contact_region"
      },
      deflect: {
        title: "Deflection gap",
        body:
          `Deflection is ${M.deflection.pct}% (${M.deflection.delta}) versus ${M.deflection.target}%. How-to/enablement is the largest ticket type (${M.cases.byType[0].value}). Email is still the fattest channel (${M.cases.byChannel[0].value}). ` +
          `The first three articles to push in-product: password reset, loan status, CRE/SBA document checklist. Until those widgets ship, L1 will keep answering questions the help center already has. Do not hire L1 to fix a content and in-app problem.`,
        cite: "ai_deflections · cases.byType · knowledge_articles"
      },
      northline: {
        title: "Northline Bank — talking points",
        body: nlb.talkingPoints.map((t, i) => `${i + 1}. ${t}`).join(" "),
        cite: "CS-1842 · VIP owner Priya Nair · next update 05:00 UTC"
      },
      staff: {
        title: "Headcount vs automation",
        body:
          `You are still Stage A (dozens of banks). Hire the SBA SME to full productivity before adding L1. ` +
          `Automation next, in order: in-app status, password macro as default, CRE checklist article, SLA 80% page (already on). ` +
          `A fourth L1 now would hide the deflection miss. Stage B (40–120 banks) is when you add the Team Lead seat you already sampled and a dedicated Support Ops owner.`,
        cite: "BRD Stage A/B · daily_metrics.deflection_pct"
      }
    };
  }

  function matchQuestion(text) {
    const q = text.toLowerCase();
    const map = answers();
    if (/northline|diana|live close|p1/.test(q)) return map.northline;
    if (/aperture|at-risk|at risk/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-APR"));
    if (/helios|504|sba/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-HLH"));
    if (/cobalt|cre|exhibit/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-CBL"));
    if (/harbor|onboard/.test(q)) return customerBrief(customers.find((c) => c.id === "BNK-FHC"));
    if (/apac|emea|amer|region|follow.the.sun|timezone/.test(q)) return map.region;
    if (/deflect|self-service|help center|bot/.test(q)) return map.deflect;
    if (/hire|headcount|staff|automat/.test(q)) return map.staff;
    if (/who|attention|today|risk|escalat/.test(q)) return map.attention;
    if (/csat|frt|mttr|sla|department|how are we|summary|brief/.test(q)) return map.dept;
    const named = customers.find((c) => q.includes(c.name.toLowerCase().split(" ")[0].toLowerCase()));
    if (named) return customerBrief(named);
    return {
      title: "Grounded answer",
      body: "I can brief the department, name who needs attention, compare APAC / EMEA / AMER, explain the deflection gap, draft Northline talking points, or compare hiring vs automation. Ask about a bank by name. I will not invent a credit or SBA eligibility decision.",
      cite: "insight engine · sample data only"
    };
  }

  function customerBrief(c) {
    if (!c) return matchQuestion("department");
    return {
      title: c.name,
      body: `${c.headline} Region: ${c.region} (${c.city}, ${c.hours}). Health: ${c.health.replace("_", " ")}. Tier: ${c.tier}. Owner: ${c.owner}. Open tickets ${c.openTickets}, escalations ${c.escalations}, last touch ${c.lastTouch}. ${c.csat == null ? "No CSAT yet this period." : "CSAT " + c.csat + "%"} Risks: ${c.risks.join("; ")}. Wins: ${c.wins.join("; ")}. Ask: ${c.ask} Talking points: ${c.talkingPoints.join(" ")}`,
      cite: `${c.id} · ${c.region} · ${c.owner}`
    };
  }

  function renderDept() {
    const s = deptSummary();
    const el = document.getElementById("deptBrief");
    if (!el) return;
    el.innerHTML = `<p>${s.body}</p><p class="lead">${s.cite}</p>
      <ol class="actions">
        <li><strong>Today:</strong> close the Northline P1 loop with a timed update; pair Sara on the Helios 504 list.</li>
        <li><strong>This week:</strong> Aperture joint CSM call; publish the CRE exhibit article and close Cobalt.</li>
        <li><strong>This month:</strong> ship in-app status + reset widgets or miss the 35% deflection target.</li>
      </ol>
      <div class="fb" data-target="dept">
        <span>Was this briefing useful?</span>
        <button type="button" data-v="up">Yes</button>
        <button type="button" class="ghost" data-v="down">Needs work</button>
        <span class="lead" id="deptFb"></span>
      </div>`;
  }

  function renderCustomers() {
    const box = document.getElementById("customerList");
    if (!box) return;
    box.innerHTML = customers.map((c) => `
      <article class="customer-card" data-id="${c.id}">
        <h3>${c.name} ${pill("watch", c.region)} ${pill(healthKind(c.health), c.health.replace("_", " "))} ${c.tier === "vip" ? pill("watch", "VIP") : ""}</h3>
        <p>${c.headline}</p>
      </article>`).join("");
    box.querySelectorAll(".customer-card").forEach((card) => {
      card.addEventListener("click", () => selectCustomer(card.dataset.id));
    });
    selectCustomer(customers[0].id);
  }

  function selectCustomer(id) {
    document.querySelectorAll(".customer-card").forEach((c) => c.classList.toggle("on", c.dataset.id === id));
    const c = customers.find((x) => x.id === id);
    const d = document.getElementById("customerDetail");
    if (!c || !d) return;
    d.innerHTML = `
      <h2>${c.name}</h2>
      <p class="lead">${c.region} · ${c.city} · ${c.hours} · ${c.tier.toUpperCase()} · ${c.stage} · owner ${c.owner} · last touch ${c.lastTouch}</p>
      <p>${c.headline}</p>
      <div class="stat-split">
        <div class="stat"><b>${c.openTickets}</b><span>Open tickets</span></div>
        <div class="stat"><b>${c.escalations}</b><span>Escalations</span></div>
        <div class="stat"><b>${c.csat == null ? "—" : c.csat + "%"}</b><span>CSAT</span></div>
      </div>
      <h3>Risks</h3><ul>${c.risks.map((r) => `<li>${r}</li>`).join("")}</ul>
      <h3>What’s working</h3><ul>${c.wins.map((r) => `<li>${r}</li>`).join("")}</ul>
      <h3>Ask of the executive</h3><p>${c.ask}</p>
      <h3>Talking points</h3><ol>${c.talkingPoints.map((t) => `<li>${t}</li>`).join("")}</ol>
      <div class="fb" data-target="${c.id}">
        <span>Is this customer brief usable?</span>
        <button type="button" data-v="up">Yes</button>
        <button type="button" class="ghost" data-v="down">Needs work</button>
        <span class="lead fb-note"></span>
      </div>`;
  }

  function addBubble(log, role, ans) {
    const div = document.createElement("div");
    div.className = `bubble ${role}`;
    div.innerHTML = role === "bot"
      ? `<strong>${ans.title}</strong><br>${ans.body}<span class="cite">${ans.cite}</span>`
      : ans;
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
    addBubble(log, "bot", {
      title: "AI insights",
      body: "Ask the board a question. Answers are grounded in this period’s sample metrics — not a live model. I will cite the tables I used.",
      cite: "insight engine on GitHub Pages · no API key in the browser"
    });
    (SUPPORT.presets || []).forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = p.label;
      b.addEventListener("click", () => ask(p.label));
      chips.appendChild(b);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      ask(input.value);
      input.value = "";
    });
    const q = new URLSearchParams(location.search).get("q");
    if (q) ask(q);
  }

  function bindFeedback() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".fb button");
      if (!btn) return;
      const wrap = btn.closest(".fb");
      const rec = { v: btn.dataset.v, at: new Date().toISOString() };
      const all = JSON.parse(localStorage.getItem("cs-insight-fb") || "[]");
      all.push({ target: wrap.dataset.target, ...rec });
      localStorage.setItem("cs-insight-fb", JSON.stringify(all));
      const note = wrap.querySelector(".fb-note, #deptFb");
      if (note) note.textContent = rec.v === "up" ? "Saved — we’ll keep this shape." : "Saved — we’ll tighten the brief.";
    });
  }

  function renderDashboardStrip() {
    const el = document.getElementById("aiStrip");
    if (!el) return;
    const s = deptSummary();
    const attn = customers.filter((c) => c.health === "critical" || c.health === "at_risk");
    el.innerHTML = `
      <h2>AI briefing</h2>
      <p class="lead">Department summary plus the customers that need a human today. Full chat and per-bank briefs live on <a href="insights.html">AI insights</a>.</p>
      <p>${s.body.split("The board is not green.")[0]}</p>
      <p><strong>Attention:</strong> ${attn.map((c) => c.name + " — " + c.ask).join(" · ")}</p>
      <div class="chips">
        ${(SUPPORT.presets || []).map((p) => `<a class="chip" href="insights.html?q=${encodeURIComponent(p.label)}">${p.label}</a>`).join("")}
      </div>`;
  }

  renderDept();
  renderCustomers();
  bindChat();
  bindFeedback();
  renderDashboardStrip();
})();
