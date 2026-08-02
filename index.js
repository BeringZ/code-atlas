// Code Atlas 2.0 — 学习地图（P0）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  const ADV = window.CODE_ATLAS_ADVANCED;
  if (!D2) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  // 模块主干
  const prog = A.progressSummary();
  document.querySelector("#progressSummary").innerHTML =
    `<span class="meta-tag published">已浏览 ${prog.browsed} · 已理解 ${prog.understood} · 练习通过 ${prog.passed}</span>`;

  const conceptCount = (moduleId) => (D2.modules.find((m) => m.id === moduleId) || { concepts: [] }).concepts.length;

  document.querySelector("#moduleMap").innerHTML = D2.modules
    .map((m) => {
      const published = (D2.concepts || []).filter((c) => c.module_id === m.id && c.status === "published").length;
      return `
        <a class="map-card" href="modules.html#${m.id}">
          <div class="map-head">
            <span class="map-icon">${m.icon}</span>
            <div>
              <span class="map-id">${m.id}</span>
              <h3>${A.esc(m.title)}</h3>
            </div>
          </div>
          <p>${A.esc(m.objective)}</p>
          <div class="map-meta">
            <span>${conceptCount(m.id)} 个知识点 · ${published} 已发布</span>
            ${m.prereq.length ? `<span>前置：${m.prereq.join("→")}</span>` : `<span>起点模块</span>`}
          </div>
        </a>`;
    })
    .join("");

  // 语言进阶入口
  document.querySelector("#langStrip").innerHTML = D2.languages
    .map((l) => {
      const detailed = (ADV.topics || []).filter((t) => t.lang === l.id && t.status === "detailed").length;
      return `
        <a class="lang-entry" style="--lang-color:${l.color}" href="language.html#${l.id}">
          <span class="lang-tag">${l.tag}</span>
          <span><strong>${l.name}</strong><span>10 个专题 · ${detailed} 个精讲</span></span>
        </a>`;
    })
    .join("");

  // 术语速查
  const GLO = window.CODE_ATLAS_GLOSSARY;
  if (GLO) {
    document.querySelector("#glossaryGrid").innerHTML = GLO.terms
      .map((t) => `
        <a class="glossary-item" href="concept.html?c=${t.concept}" title="查看知识点">
          <div class="g-term"><strong>${A.esc(t.term)}</strong><span>${A.esc(t.en)}</span></div>
          <p>${A.esc(t.def)}</p>
        </a>`)
      .join("");
  }

  // 点击模块卡标记浏览
  document.querySelectorAll(".map-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("href").split("#")[1];
      A.markProgress(id, "browsed");
    });
  });
})();
