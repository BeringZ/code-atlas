// Code Atlas 2.0 — 语言百科（P8）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  const ENC = window.CODE_ATLAS_ENCYCLOPEDIA;
  if (!D2 || !ENC) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  document.querySelector("#encGrid").innerHTML = ENC.languages
    .map((l) => `
      <article class="enc-card" id="${l.id}">
        <div class="enc-head">
          <span class="lang-tag" style="--lang-color:${l.color}">${l.tag}</span>
          <div><h3>${A.esc(l.name)}</h3><span class="enc-ver">${A.esc(l.version)}</span></div>
        </div>
        <p class="positioning">${A.esc(l.positioning)}</p>

        <h4>范式</h4>
        <ul>${l.paradigms.map((p) => `<li>${A.esc(p)}</li>`).join("")}</ul>

        <h4>工具链</h4>
        <div class="enc-tc">
          ${Object.entries(l.toolchain).map(([k, v]) => `<div><b>${A.esc(k)}</b>${A.esc(v)}</div>`).join("")}
        </div>

        <h4>生态</h4>
        <ul>${l.ecosystem.map((e) => `<li>${A.esc(e)}</li>`).join("")}</ul>

        <h4>适用场景</h4>
        <p style="margin:4px 0 0;color:var(--muted);font-size:12.5px;line-height:1.7">${A.esc(l.scenarios)}</p>

        <h4>环境搭建快速开始</h4>
        <div class="enc-quick"><pre><code>${A.esc(l.quickstart)}</code></pre></div>
      </article>`)
    .join("");

  // 锚点
  const target = location.hash.replace("#", "");
  if (target) {
    const el = document.getElementById(target);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
})();
