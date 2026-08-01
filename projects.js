// Code Atlas — "项目实践"页交互逻辑
(() => {
  const data = window.CODE_ATLAS_PROJECTS;
  const languages = data.languages;
  const projects = data.projects;

  const $ = (selector) => document.querySelector(selector);

  function loadTheme() {
    try {
      const raw = JSON.parse(localStorage.getItem("code-atlas-state") || "{}");
      return raw.theme || "light";
    } catch {
      return "light";
    }
  }
  function saveTheme(theme) {
    try {
      const raw = JSON.parse(localStorage.getItem("code-atlas-state") || "{}");
      raw.theme = theme;
      localStorage.setItem("code-atlas-state", JSON.stringify(raw));
    } catch { /* ignore */ }
  }

  const state = {
    theme: loadTheme(),
    languageId: (location.hash || "#python").replace("#", ""),
  };

  function currentProject() {
    return projects.find((p) => p.lang === state.languageId) || projects[0];
  }
  function currentLanguage() {
    return languages.find((l) => l.id === state.languageId) || languages[0];
  }

  function esc(text) {
    return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  function renderTabs() {
    $("#languageTabs").innerHTML = languages
      .map((lang) => {
        const active = lang.id === state.languageId ? "active" : "";
        return `<button class="language-tab ${active}" data-lang="${lang.id}">
          <span class="lang-tag" style="--lang-color:${lang.color}">${lang.tag}</span>
          <span>${lang.name}</span>
        </button>`;
      })
      .join("");
    $("#languageTabs").querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        state.languageId = button.dataset.lang;
        location.hash = state.languageId;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function renderHero() {
    const project = currentProject();
    const lang = currentLanguage();
    $("#crumbLanguage").textContent = lang.name;
    $("#projectTitle").textContent = project.title;
    $("#projectSubtitle").textContent = project.background;
    $("#projectBadges").innerHTML = `
      <div class="project-badge"><strong>${esc(project.difficulty.split("·")[0].trim())}</strong><span>难度</span></div>
      <div class="project-badge"><strong>${esc(project.duration)}</strong><span>建议耗时</span></div>
      <div class="project-badge"><strong>${project.phases.length}</strong><span>实施阶段</span></div>
    `;
  }

  function renderBody() {
    const project = currentProject();
    const lang = currentLanguage();

    const goalsHtml = `
      <section class="project-section" id="project-goals">
        <div class="section-heading"><div><span class="eyebrow">目标</span><h2>项目背景与目标</h2></div></div>
        <ul class="project-list">${project.goals.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
      </section>`;

    const techHtml = `
      <section class="project-section" id="project-tech">
        <div class="section-heading"><div><span class="eyebrow">要点</span><h2>技术要点清单</h2></div></div>
        <div class="tech-chips">${project.techPoints.map((t) => `<span class="tech-chip">${esc(t)}</span>`).join("")}</div>
      </section>`;

    const phasesHtml = `
      <section class="project-section" id="project-phases">
        <div class="section-heading"><div><span class="eyebrow">路径</span><h2>分阶段实现步骤</h2><p class="category-desc">逐阶段推进，每阶段完成再进入下一阶段。</p></div></div>
        <div class="phase-timeline">
          ${project.phases
            .map(
              (phase, i) => `
              <article class="phase-card">
                <div class="phase-head">
                  <span class="phase-num">${String(i + 1).padStart(2, "0")}</span>
                  <h3>${esc(phase.title)}</h3>
                </div>
                <ul class="project-list">${phase.tasks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
                <div class="phase-check"><span>阶段自检</span><p>${phase.checkpoints.map((c) => `✓ ${esc(c)}`).join("<br/>")}</p></div>
              </article>
            `
            )
            .join("")}
        </div>
      </section>`;

    const acceptanceHtml = `
      <section class="project-section" id="project-accept">
        <div class="section-heading"><div><span class="eyebrow">验收</span><h2>验收标准 / 自测清单</h2></div></div>
        <div class="acceptance-list">${project.acceptance.map((a) => `<div class="acceptance-item"><span class="check-circle">✓</span><span>${esc(a)}</span></div>`).join("")}</div>
      </section>`;

    const hintsHtml = `
      <section class="project-section" id="project-hints">
        <div class="section-heading"><div><span class="eyebrow">提示</span><h2>参考实现与思路提示</h2><p class="category-desc">先独立完成，卡住时再看提示——不提供完整代码。</p></div></div>
        <div class="hint-card">
          <h3>💡 思路提示</h3>
          <ul class="project-list">${project.hints.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div>
        <div class="hint-card reference-card">
          <h3>📐 参考实现规模</h3>
          <p>${esc(project.referenceNote)}</p>
        </div>
      </section>`;

    $("#projectBody").innerHTML = goalsHtml + techHtml + phasesHtml + acceptanceHtml + hintsHtml;
  }

  function render() {
    document.documentElement.dataset.theme = state.theme;
    renderTabs();
    renderHero();
    renderBody();
  }

  $("#themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveTheme(state.theme);
    render();
  });

  window.addEventListener("hashchange", () => {
    state.languageId = (location.hash || "#python").replace("#", "");
    render();
  });

  render();
})();
