// Code Atlas — "下载与运行"页交互逻辑
(() => {
  const data = window.CODE_ATLAS_SETUP;
  const languages = data.languages;
  const entries = data.entries;

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

  function currentEntry() {
    return entries.find((e) => e.lang === state.languageId) || entries[0];
  }
  function currentLanguage() {
    return languages.find((l) => l.id === state.languageId) || languages[0];
  }

  // 轻量转义（代码块中会出现 < >）
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
    const entry = currentEntry();
    const lang = currentLanguage();
    $("#crumbLanguage").textContent = lang.name;
    $("#setupTitle").textContent = `${lang.name} · 环境搭建`;
    $("#setupSubtitle").textContent = entry.overview;
    $("#setupChecks").innerHTML = `
      <div class="setup-check"><strong>${entry.install.length}</strong><span>平台覆盖</span></div>
      <div class="setup-check"><strong>${entry.versionManager.tool.split("·").length}</strong><span>版本工具</span></div>
      <div class="setup-check"><strong>1</strong><span>示例项目</span></div>
    `;
  }

  function renderNav() {
    const sections = [
      { id: "install", title: "安装方式" },
      { id: "env", title: "环境变量与路径" },
      { id: "version", title: "版本管理" },
      { id: "deps", title: "依赖与示例" },
    ];
    $("#setupNav").innerHTML = sections
      .map((s, i) => `<a class="setup-nav-link" href="#setup-${s.id}"><span>${i + 1}</span>${s.title}</a>`)
      .join("");
  }

  function renderSections() {
    const entry = currentEntry();
    const langs = languages.find((l) => l.id === entry.lang);

    const platformHtml = entry.install
      .map(
        (os) => `
        <div class="setup-block">
          <h3 class="setup-block-title">
            <span class="os-chip">${os.os}</span> ${os.title}
          </h3>
          ${os.methods
            .map(
              (m) => `
              <div class="setup-method">
                <h4>${esc(m.name)}</h4>
                <ol class="setup-steps">
                  ${m.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
                </ol>
              </div>
            `
            )
            .join("")}
        </div>
      `
      )
      .join("");

    const envHtml = entry.envVars
      .map(
        (env) => `
        <div class="setup-block">
          <h3 class="setup-block-title"><span class="os-chip">${esc(env.var)}</span> 配置说明</h3>
          <p class="setup-detail">${esc(env.detail)}</p>
          <div class="cmd-block"><span class="cmd-prompt">$</span><code>${esc(env.check)}</code><button class="cmd-copy" data-copy="${esc(env.check)}">复制</button></div>
        </div>
      `
      )
      .join("");

    const vm = entry.versionManager;
    const vmHtml = `
      <div class="setup-block">
        <h3 class="setup-block-title"><span class="os-chip">工具</span> ${esc(vm.tool)}</h3>
        <p class="setup-detail">${esc(vm.why)}</p>
        <div class="cmd-list">
          ${vm.commands
            .map(
              (c) => `
              <div class="cmd-block">
                <span class="cmd-prompt">$</span><code>${esc(c.cmd)}</code>
                <span class="cmd-note">${esc(c.note)}</span>
                <button class="cmd-copy" data-copy="${esc(c.cmd)}">复制</button>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;

    const deps = entry.dependencies;
    const run = entry.runExample;
    const runHtml = `
      <div class="setup-block">
        <h3 class="setup-block-title"><span class="os-chip">依赖</span> ${esc(deps.tool)}</h3>
        <ol class="setup-steps">
          ${deps.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
        </ol>
      </div>
      <div class="setup-block run-block">
        <h3 class="setup-block-title"><span class="os-chip">运行</span> ${esc(run.title)}</h3>
        ${run.files
          .map(
            (f) => `
            <div class="file-tab"><span>${esc(langs.tag)}</span></div>
            <pre class="example-code"><code>${esc(f)}</code></pre>
          `
          )
          .join("")}
        <ol class="setup-steps">
          ${run.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
        </ol>
      </div>
    `;

    $("#setupSections").innerHTML = `
      <section class="setup-category" id="setup-install">
        <div class="section-heading">
          <div><span class="eyebrow">01</span><h2>安装方式</h2><p class="category-desc">三种主流平台的官方安装路径，任选其一。</p></div>
        </div>
        <div class="setup-grid">${platformHtml}</div>
      </section>
      <section class="setup-category" id="setup-env">
        <div class="section-heading">
          <div><span class="eyebrow">02</span><h2>环境变量与路径配置</h2><p class="category-desc">确保命令行能找到编译器/运行时。</p></div>
        </div>
        ${envHtml}
      </section>
      <section class="setup-category" id="setup-version">
        <div class="section-heading">
          <div><span class="eyebrow">03</span><h2>版本管理</h2><p class="category-desc">在同一台机器上切换多个 SDK / 工具链版本。</p></div>
        </div>
        ${vmHtml}
      </section>
      <section class="setup-category" id="setup-deps">
        <div class="section-heading">
          <div><span class="eyebrow">04</span><h2>下载依赖并运行示例</h2><p class="category-desc">从一个真实示例走通「建项目 → 装依赖 → 跑起来」全流程。</p></div>
        </div>
        ${runHtml}
      </section>
    `;

    // 复制命令
    $("#setupSections").querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          showToast("命令已复制");
        } catch {
          showToast("复制失败，请手动选择");
        }
      });
    });
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("visible"), 1600);
  }

  function render() {
    document.documentElement.dataset.theme = state.theme;
    renderTabs();
    renderHero();
    renderNav();
    renderSections();
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
