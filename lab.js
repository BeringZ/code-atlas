// Code Atlas 2.0 — 功能实验室（P6）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  const LAB = window.CODE_ATLAS_LAB;
  if (!LAB || !D2) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  const state = { taskId: A.qs("t") || (LAB.tasks[0] && LAB.tasks[0].id) };

  function currentTask() {
    return LAB.tasks.find((t) => t.id === state.taskId) || LAB.tasks[0];
  }

  function render() {
    const task = currentTask();
    const l = A.langById(task.lang);
    const root = document.querySelector("#labRoot");

    const listHtml = `
      <aside class="lab-list">
        ${LAB.tasks.map((t) => {
          const tl = A.langById(t.lang);
          const active = t.id === state.taskId ? "active" : "";
          return `<a class="${active}" href="lab.html?t=${t.id}">
            <span class="lab-no">${t.lang.toUpperCase()}</span>
            <span>${A.esc(t.title)}</span>
          </a>`;
        }).join("")}
      </aside>`;

    const detailHtml = `
      <div style="min-width:0">
        <div class="eyebrow">${l.name} · 综合任务</div>
        <h1 style="margin:10px 0 6px;font-size:clamp(22px,3vw,32px);letter-spacing:-0.035em">${A.esc(task.title)}</h1>
        <div class="concept-meta">
          <span class="meta-tag module">${A.esc(task.difficulty)}</span>
          <span class="meta-tag">${A.esc(task.duration)}</span>
        </div>
        <p style="color:var(--muted);font-size:14px;line-height:1.85;margin:14px 0 0">${A.esc(task.background)}</p>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Requirements</span><h2>需求拆解与目标</h2></div></div>
          <div class="objectives"><ul>${task.goals.map((g) => `<li>${A.esc(g)}</li>`).join("")}</ul></div>
          <div class="kp-chips">${task.knowledge_points.map((kp) => `<span class="kp-chip">${A.esc(kp)}</span>`).join("")}</div>
        </div>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Skills</span><h2>技术要点清单</h2></div></div>
          <div class="kp-chips" style="gap:7px">${task.techPoints.map((t) => `<span class="concept-chip" style="font-size:11px">${A.esc(t)}</span>`).join("")}</div>
        </div>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Phases</span><h2>分阶段实现步骤</h2></div></div>
          ${task.phases.map((p, i) => `
            <div class="phase-card">
              <span class="phase-num">${String(i + 1).padStart(2, "0")}</span>
              <h4>${A.esc(p.title)}</h4>
              <ul>${p.tasks.map((t) => `<li>${A.esc(t)}</li>`).join("")}</ul>
            </div>`).join("")}
        </div>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Acceptance</span><h2>验收标准 / 自测清单</h2></div></div>
          <div class="acceptance-list">${task.acceptance.map((a) => `<div class="acceptance-item"><span class="check">✓</span><span>${A.esc(a)}</span></div>`).join("")}</div>
        </div>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Cross-language</span><h2>多语言实现对照</h2><p class="desc">同一需求在其他语言的实现要点（设计权衡）。</p></div></div>
          <div class="cross-lang-grid">
            ${Object.entries(task.cross_lang).map(([langId, note]) => {
              const ll = A.langById(langId);
              return `<div class="cross-lang-item"><b style="color:${ll.color}">${ll.name}</b><p>${A.esc(note)}</p></div>`;
            }).join("")}
          </div>
        </div>

        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Hints</span><h2>参考实现与思路提示</h2><p class="desc">先独立完成，卡住再看——不提供完整代码。</p></div></div>
          <div class="diff-card" style="padding:18px">
            <ul>${task.hints.map((h) => `<li>${A.esc(h)}</li>`).join("")}</ul>
            <p style="margin:14px 0 0;color:var(--muted);font-size:12px;line-height:1.7">📐 ${A.esc(task.referenceNote)}</p>
          </div>
        </div>
      </div>`;

    root.innerHTML = listHtml + detailHtml;
    document.querySelectorAll(".phase-card").forEach(() => {});
  }

  window.addEventListener("popstate", () => {
    state.taskId = A.qs("t") || (LAB.tasks[0] && LAB.tasks[0].id);
    render();
  });

  render();
})();
