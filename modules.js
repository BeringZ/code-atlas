// Code Atlas 2.0 — 基础模块目录（P1）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  if (!D2) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  const conceptsById = {};
  (D2.concepts || []).forEach((c) => { conceptsById[c.id] = c; });

  function render(targetModuleId) {
    const grid = document.querySelector("#moduleGrid");
    grid.innerHTML = D2.modules
      .map((m) => {
        const conceptObjs = m.concepts.map((id) => conceptsById[id]).filter(Boolean);
        const chips = m.concepts.map((id) => {
          const c = conceptsById[id];
          const state = c ? A.getProgress(id) : {};
          const cls = c && c.status === "published" ? (state.passed ? "done" : "") : "";
          const done = c && (state.passed || state.understood) ? "done" : "";
          const label = c ? c.title : id.split(".")[1];
          const href = c ? (c.status === "published" ? `concept.html?c=${c.id}` : "#") : "#";
          return `<a class="concept-chip ${done}" href="${href}">${A.esc(label)}</a>`;
        });
        return `
          <article class="module-card" id="${m.id}" ${targetModuleId === m.id ? 'style="border-color:var(--accent)"' : ""}>
            <h3><span class="mid">${m.id}</span>${A.esc(m.title)}</h3>
            <p>${A.esc(m.objective)}</p>
            <div class="concept-chips">${chips.join("")}</div>
          </article>`;
      })
      .join("");

    // 锚点滚动
    if (targetModuleId) {
      const el = document.getElementById(targetModuleId);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }

  render(location.hash.replace("#", ""));
  window.addEventListener("hashchange", () => render(location.hash.replace("#", "")));
})();
