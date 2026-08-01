// Code Atlas — 进阶学习页交互逻辑
(() => {
  const data = window.CODE_ATLAS_LEARNING;
  const languages = data.languages;
  const categories = data.categories;
  const tutorials = data.tutorials;

  const $ = (selector) => document.querySelector(selector);

  // 主题与主站共享 localStorage key "code-atlas-state"，保持两页主题同步
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
    } catch {
      /* ignore */
    }
  }

  const state = {
    theme: loadTheme(),
    languageId: (location.hash || "#python").replace("#", ""),
  };

  function currentLanguage() {
    return languages.find((l) => l.id === state.languageId) || languages[0];
  }

  function levelBadge(level) {
    const map = { "入门": "beginner", "中级": "intermediate", "高级": "advanced" };
    return `<span class="level-badge ${map[level] || "intermediate"}">${level}</span>`;
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

  function renderSections() {
    const lang = currentLanguage();
    const langTutorials = tutorials.filter((t) => t.lang === lang.id);
    const categoryTotal = (catId) => langTutorials.filter((t) => t.category === catId).length;

    $("#categorySections").innerHTML = categories
      .map((cat) => {
        const items = langTutorials.filter((t) => t.category === cat.id);
        if (!items.length) return "";
        return `
          <section class="learning-category">
            <div class="section-heading">
              <div>
                <span class="eyebrow">${cat.id}</span>
                <h2>${cat.name}</h2>
                <p class="category-desc">${cat.desc}</p>
              </div>
              <span class="category-count">${items.length} 条</span>
            </div>
            <div class="tutorial-grid">
              ${items
                .map(
                  (t) => `
                  <a class="tutorial-card" href="${t.url}" target="_blank" rel="noopener noreferrer">
                    <div class="tutorial-meta">
                      <span class="tutorial-source">${t.source}</span>
                      ${levelBadge(t.level)}
                    </div>
                    <h3>${t.title}</h3>
                    <p>${t.description}</p>
                    <span class="tutorial-open">访问教程 →</span>
                  </a>
                `
                )
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }

  function renderHero() {
    const lang = currentLanguage();
    const langTutorials = tutorials.filter((t) => t.lang === lang.id);
    const levels = { "入门": 0, "中级": 0, "高级": 0 };
    langTutorials.forEach((t) => { levels[t.level] = (levels[t.level] || 0) + 1; });

    $("#crumbLanguage").textContent = lang.name;
    $("#learningTitle").textContent = `${lang.name} · 进阶学习路径`;
    $("#learningSubtitle").textContent =
      `从官方文档到权威课程与经典书籍，精选 ${langTutorials.length} 条高质量资源，` +
      `覆盖 ${categories.length} 个方向，链接均已逐一验证有效。`;
    $("#learningStats").innerHTML = `
      <div class="stat"><strong>${langTutorials.length}</strong><span>精选教程</span></div>
      <div class="stat"><strong>${levels["入门"]}</strong><span>入门</span></div>
      <div class="stat"><strong>${levels["中级"]}</strong><span>中级</span></div>
      <div class="stat"><strong>${levels["高级"]}</strong><span>高级</span></div>
    `;
  }

  function render() {
    document.documentElement.dataset.theme = state.theme;
    renderTabs();
    renderHero();
    renderSections();
  }

  // 主题切换（与主站同步）
  $("#themeToggle").addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    saveTheme(state.theme);
    render();
  });

  $("#backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("hashchange", () => {
    state.languageId = (location.hash || "#python").replace("#", "");
    render();
  });

  render();
})();
