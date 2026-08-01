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
    level: loadLevel(),
  };

  function loadLevel() {
    try {
      return localStorage.getItem("code-atlas-learning-level") || "";
    } catch {
      return "";
    }
  }
  function saveLevel(level) {
    try {
      localStorage.setItem("code-atlas-learning-level", level);
    } catch { /* ignore */ }
  }

  // 读取主站学习进度（已完成的章节数），用于个性化建议参考
  function mainSiteProgress() {
    try {
      const raw = JSON.parse(localStorage.getItem("code-atlas-state") || "{}");
      return Array.isArray(raw.completed) ? raw.completed.length : 0;
    } catch {
      return 0;
    }
  }

  function currentLanguage() {
    return languages.find((l) => l.id === state.languageId) || languages[0];
  }

  function esc(text) {
    return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  // ============ 学习路径建议 ============
  function renderPaths() {
    const lang = currentLanguage();
    const paths = (data.learningPaths && data.learningPaths[lang.id]) || [];
    const progress = mainSiteProgress();
    const savedLevel = state.level;

    const levelHtml = ["入门", "中级", "高级"]
      .map(
        (lv) => `
        <button class="path-level-btn ${savedLevel === lv ? "active" : ""}" data-level="${lv}">${lv}</button>
      `
      )
      .join("");

    const active = paths.find((p) => p.level === savedLevel) || null;

    $("#pathSection").innerHTML = `
      <div class="section-heading path-heading">
        <div>
          <span class="eyebrow">Learning path</span>
          <h2>学习路径建议</h2>
          <p class="category-desc">选择你当前的掌握水平，获取个性化学习顺序；主站已完成章节数：${progress}/13，会作为参考。</p>
        </div>
      </div>
      <div class="path-levels">${levelHtml}</div>
      <div class="path-recommend">
        ${
          active
            ? `
            <div class="path-note">${esc(active.note)}</div>
            <ol class="path-steps">
              ${active.steps.map((s) => `<li>${esc(s)}</li>`).join("")}
            </ol>
          `
            : `<div class="path-empty">点击上方按钮，查看对应水平的推荐学习路径。</div>`
        }
      </div>
    `;

    $("#pathSection").querySelectorAll("[data-level]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.level = btn.dataset.level;
        saveLevel(state.level);
        renderPaths();
      });
    });
  }

  // ============ 学习辅导：知识点 + 逐行解读 + 误区 + 互动练习 ============
  function renderCoaching() {
    const lang = currentLanguage();
    const coaching = (data.coaching && data.coaching[lang.id]) || [];
    if (!coaching.length) {
      $("#coachingSection").innerHTML = "";
      return;
    }

    $("#coachingSection").innerHTML = `
      <div class="section-heading coaching-heading">
        <div>
          <span class="eyebrow">Coaching</span>
          <h2>学习辅导 · 知识点精讲</h2>
          <p class="category-desc">每个知识点包含：要点讲解、代码逐行解读、常见误区与互动练习（点选即得反馈）。</p>
        </div>
        <button class="ghost-button" id="expandAll">全部展开</button>
      </div>
      <div class="coaching-list">
        ${coaching
          .map(
            (item, i) => `
            <article class="coach-card" data-coach="${i}">
              <button class="coach-head" aria-expanded="false">
                <span class="coach-index">${String(i + 1).padStart(2, "0")}</span>
                <span class="coach-title">${esc(item.topic)}</span>
                <span class="coach-level ${item.level === "高级" ? "advanced" : item.level === "中级" ? "intermediate" : "beginner"}">${esc(item.level)}</span>
                <span class="coach-toggle">▸</span>
              </button>
              <div class="coach-body">
                <p class="coach-explanation">${esc(item.explanation)}</p>

                <div class="coach-sub">
                  <h4>代码示例 · 逐行解读</h4>
                  <pre class="coach-code"><code>${esc(item.code.text)}</code></pre>
                  <ul class="code-notes">
                    ${item.code.notes
                      .map(
                        (n) => `<li><span class="note-line">L${n.line}</span>${esc(n.note)}</li>`
                      )
                      .join("")}
                  </ul>
                </div>

                <div class="coach-sub">
                  <h4>⚠️ 常见误区</h4>
                  <ul class="pitfall-list">
                    ${item.pitfalls.map((p) => `<li>${esc(p)}</li>`).join("")}
                  </ul>
                </div>

                <div class="coach-sub exercise-wrap" data-answer="${item.exercise.answer}">
                  <h4>✏️ 互动练习 · 点击选项查看反馈</h4>
                  <p class="exercise-question">${esc(item.exercise.question.replaceAll("\\n", "<br/>"))}</p>
                  <div class="exercise-options">
                    ${item.exercise.options
                      .map(
                        (opt, oi) => `
                        <button class="exercise-option" data-opt="${oi}">
                          <span class="opt-key">${String.fromCharCode(65 + oi)}</span>
                          <span>${esc(opt)}</span>
                        </button>
                      `
                      )
                      .join("")}
                  </div>
                  <div class="exercise-feedback hidden"></div>
                </div>
              </div>
            </article>
          `
          )
          .join("")}
      </div>
    `;

    // 折叠交互
    const cards = $("#coachingSection").querySelectorAll(".coach-card");
    cards.forEach((card) => {
      const head = card.querySelector(".coach-head");
      head.addEventListener("click", () => {
        const isOpen = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!isOpen));
        card.classList.toggle("open", !isOpen);
        head.querySelector(".coach-toggle").textContent = isOpen ? "▸" : "▾";
      });
    });

    // 全部展开 / 收起
    const expandBtn = $("#coachingSection").querySelector("#expandAll");
    if (expandBtn) {
      let expanded = false;
      expandBtn.addEventListener("click", () => {
        expanded = !expanded;
        expandBtn.textContent = expanded ? "全部收起" : "全部展开";
        cards.forEach((card) => {
          const head = card.querySelector(".coach-head");
          head.setAttribute("aria-expanded", String(expanded));
          card.classList.toggle("open", expanded);
          head.querySelector(".coach-toggle").textContent = expanded ? "▾" : "▸";
        });
      });
    }

    // 互动练习：即时反馈
    $("#coachingSection").querySelectorAll(".exercise-wrap").forEach((wrap) => {
      const answer = Number(wrap.dataset.answer);
      const feedback = wrap.querySelector(".exercise-feedback");
      const options = wrap.querySelectorAll(".exercise-option");
      const questionIndex = Number(wrap.closest(".coach-card").dataset.coach);
      const correctText = coaching[questionIndex].exercise.feedback;

      options.forEach((opt) => {
        opt.addEventListener("click", () => {
          const chosen = Number(opt.dataset.opt);
          const isCorrect = chosen === answer;
          options.forEach((o) => {
            const oi = Number(o.dataset.opt);
            o.classList.remove("correct", "wrong");
            if (oi === answer) o.classList.add("correct");
            if (oi === chosen && !isCorrect) o.classList.add("wrong");
          });
          feedback.classList.remove("hidden");
          feedback.className = "exercise-feedback " + (isCorrect ? "ok" : "no");
          feedback.textContent = (isCorrect ? "✅ 回答正确！" : "❌ 回答错误。") + " " + correctText;
        });
      });
    });
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
    renderPaths();
    renderCoaching();
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
