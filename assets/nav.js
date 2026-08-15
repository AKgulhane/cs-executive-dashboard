(function () {
  const here = (location.pathname.split("/").pop() || "index.html");
  const links = [
    ["index.html", "Dashboard"],
    ["insights.html", "AI insights"],
    ["team.html", "Team"],
    ["slas.html", "SLAs & metrics"],
    ["escalations.html", "Escalations"],
    ["knowledge.html", "Knowledge base"],
    ["operations.html", "Operations"],
    ["schema.html", "Data schema"]
  ];
  const nav = document.createElement("nav");
  nav.className = "site";
  nav.innerHTML =
    `<a class="brand-link" href="index.html"><span class="mark">CS</span> Support</a>` +
    links.map(([href, label]) =>
      `<a href="${href}" class="${here === href ? "active" : ""}">${label}</a>`
    ).join("");
  const wrap = document.querySelector(".wrap");
  wrap.insertBefore(nav, wrap.firstChild);
  const foot = document.createElement("footer");
  foot.className = "site";
  foot.innerHTML = `Customer Support function · sample data · <a href="https://github.com/AKgulhane/cs-executive-dashboard">source</a> · <a href="https://github.com/AKgulhane/cs-executive-dashboard/tree/main/docs">PRD / BRD</a>`;
  wrap.appendChild(foot);
})();
