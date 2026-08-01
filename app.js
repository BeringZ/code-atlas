(() => {
  const data = window.CODE_ATLAS_DATA;
  const chapters = data.chapters;
  const languages = data.languages;

  let raw;
  try {
    raw = JSON.parse(localStorage.getItem("code-atlas-state") || "{}");
  } catch {
    raw = {};
  }
  const saved = raw;
  const state = {
    chapterId: saved.chapterId || chapters[0].id,
    language: saved.language || "python",
    compareLanguage: saved.compareLanguage || "javascript",
    comparing: Boolean(saved.comparing),
    completed: new Set(saved.completed || []),
    theme: saved.theme || "light",
    query: "",
  };

  const $ = (selector) => document.querySelector(selector);
  const elements = {
    sidebar: $("#sidebar"),
    scrim: $("#scrim"),
    menuButton: $("#menuButton"),
    searchInput: $("#searchInput"),
    chapterNav: $("#chapterNav"),
    progressText: $("#progressText"),
    progressFill: $("#progressFill"),
    resetProgress: $("#resetProgress"),
    languageSelect: $("#languageSelect"),
    compareLanguageSelect: $("#compareLanguageSelect"),
    compareToggle: $("#compareToggle"),
    compareControls: $("#compareControls"),
    compareCard: $("#compareCard"),
    codeGrid: $("#codeGrid"),
    themeToggle: $("#themeToggle"),
    chapterGroup: $("#chapterGroup"),
    chapterIndex: $("#chapterIndex"),
    chapterSubtitle: $("#chapterSubtitle"),
    chapterTitle: $("#chapterTitle"),
    chapterGoal: $("#chapterGoal"),
    completeButton: $("#completeButton"),
    conceptTags: $("#conceptTags"),
    stepsList: $("#stepsList"),
    languageSummary: $("#languageSummary"),
    fileName: $("#fileName"),
    languageBadge: $("#languageBadge"),
    codeBlock: $("#codeBlock"),
    codeNote: $("#codeNote"),
    copyButton: $("#copyButton"),
    compareFileName: $("#compareFileName"),
    compareLanguageBadge: $("#compareLanguageBadge"),
    compareCodeBlock: $("#compareCodeBlock"),
    compareCodeNote: $("#compareCodeNote"),
    compareCopyButton: $("#compareCopyButton"),
    runButton: $("#runButton"),
    terminal: $("#terminal"),
    outputBlock: $("#outputBlock"),
    clearOutput: $("#clearOutput"),
    languageCards: $("#languageCards"),
    previousChapter: $("#previousChapter"),
    nextChapter: $("#nextChapter"),
    footerPosition: $("#footerPosition"),
    toast: $("#toast"),
  };

  function persist() {
    localStorage.setItem(
      "code-atlas-state",
      JSON.stringify({
        chapterId: state.chapterId,
        language: state.language,
        compareLanguage: state.compareLanguage,
        comparing: state.comparing,
        completed: [...state.completed],
        theme: state.theme,
      })
    );
  }

  function currentChapter() {
    return chapters.find((chapter) => chapter.id === state.chapterId) || chapters[0];
  }

  function currentIndex() {
    return chapters.findIndex((chapter) => chapter.id === state.chapterId);
  }

  function escapeHtml(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function highlight(code) {
    const escaped = escapeHtml(code);
    return escaped
      .replace(
        /(&quot;.*?&quot;|".*?"|'.*?'|`.*?`)/g,
        '<span style="color:#d7ba7d">$1</span>'
      )
      .replace(
        /(\/\/.*)/g,
        '<span style="color:#6a9955">$1</span>'
      )
      .replace(
        /^(\s*)(#.*)$/gm,
        '$1<span style="color:#6a9955">$2</span>'
      )
      .replace(
        /\b(class|function|def|fn|func|public|private|static|const|let|var|if|else|elif|for|while|return|import|from|use|struct|impl|match|try|catch|except|throw|throws|new|package|async|await|go|defer|true|false|True|False|bool|int|double|float|string|String|void|mut|enum|record|final|constexpr)\b/g,
        '<span style="color:#c586c0">$1</span>'
      )
      .replace(
        /\b(\d+(?:\.\d+)?)\b/g,
        '<span style="color:#b5cea8">$1</span>'
      );
  }

  function languageOptions(selected) {
    return Object.entries(languages)
      .map(([id, language]) => {
        const isSelected = id === selected ? "selected" : "";
        return `<option value="${id}" ${isSelected}>${language.name}</option>`;
      })
      .join("");
  }

  function renderSelects() {
    elements.languageSelect.innerHTML = languageOptions(state.language);
    elements.compareLanguageSelect.innerHTML = languageOptions(state.compareLanguage);
  }

  function renderNav() {
    const groups = new Map();
    chapters.forEach((chapter, index) => {
      if (!groups.has(chapter.group)) groups.set(chapter.group, []);
      groups.get(chapter.group).push({ chapter, index });
    });

    const query = state.query.trim().toLowerCase();
    elements.chapterNav.innerHTML = [...groups.entries()]
      .map(([group, items]) => {
        const visibleItems = items.filter(({ chapter }) => {
          const haystack = [
            chapter.title,
            chapter.subtitle,
            chapter.goal,
            ...chapter.concepts,
          ]
            .join(" ")
            .toLowerCase();
          return !query || haystack.includes(query);
        });

        if (!visibleItems.length) return "";

        return `
          <div class="nav-group">
            <div class="nav-group-title">${group}</div>
            ${visibleItems
              .map(({ chapter, index }) => {
                const active = chapter.id === state.chapterId ? "active" : "";
                const completed = state.completed.has(chapter.id) ? "completed" : "";
                return `
                  <button class="nav-item ${active} ${completed}" data-chapter="${chapter.id}">
                    <span class="nav-index">${String(index + 1).padStart(2, "0")}</span>
                    <span class="nav-label">${chapter.title}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        `;
      })
      .join("");

    elements.chapterNav.querySelectorAll("[data-chapter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.chapterId = button.dataset.chapter;
        persist();
        render();
        closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function renderProgress() {
    const count = state.completed.size;
    const total = chapters.length;
    elements.progressText.textContent = `${count} / ${total}`;
    elements.progressFill.style.width = `${(count / total) * 100}%`;
  }

  function renderCodeCard(languageId, isCompare = false) {
    const chapter = currentChapter();
    const language = languages[languageId];
    const snippet = chapter.snippets[languageId];

    if (!snippet) {
      console.warn("renderCodeCard: no snippet for", languageId, "in chapter", chapter.id);
      return;
    }
    if (!language) {
      console.warn("renderCodeCard: no language data for", languageId);
      return;
    }

    const fileNameEl = isCompare ? elements.compareFileName : elements.fileName;
    const badgeEl = isCompare ? elements.compareLanguageBadge : elements.languageBadge;
    const codeEl = isCompare ? elements.compareCodeBlock : elements.codeBlock;
    const noteEl = isCompare ? elements.compareCodeNote : elements.codeNote;

    if (!codeEl) {
      console.error("renderCodeCard: code element missing for", isCompare ? "compareCodeBlock" : "codeBlock");
      return;
    }

    console.log("renderCodeCard", languageId, "snippet length:", snippet.code.length);
    fileNameEl.textContent = `main${language.extension}`;
    badgeEl.textContent = language.name;
    const html = highlight(snippet.code);
    console.log("HTML length:", html.length, "first 50:", html.substring(0, 50));
    codeEl.innerHTML = html;
    noteEl.textContent = snippet.note;
  }

  function renderLanguageCards() {
    elements.languageCards.innerHTML = Object.entries(languages)
      .map(([id, language]) => {
        const active = id === state.language ? "active" : "";
        return `
          <button class="language-card ${active}" data-language="${id}">
            <strong>${language.name}</strong>
            <span>${language.version} · ${language.extension}</span>
          </button>
        `;
      })
      .join("");

    elements.languageCards.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        state.language = button.dataset.language;
        renderSelects();
        persist();
        renderChapter();
        elements.codeGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderChapter() {
    const chapter = currentChapter();
    const index = currentIndex();
    const language = languages[state.language];

    elements.chapterGroup.textContent = chapter.group;
    elements.chapterIndex.textContent = String(index + 1).padStart(2, "0");
    elements.chapterSubtitle.textContent = chapter.subtitle;
    elements.chapterTitle.textContent = chapter.title;
    elements.chapterGoal.textContent = chapter.goal;
    elements.languageSummary.textContent =
      `${language.name} · ${language.version}。${language.summary}`;

    elements.conceptTags.innerHTML = chapter.concepts
      .map((concept) => `<span class="tag">${concept}</span>`)
      .join("");

    elements.stepsList.innerHTML = chapter.steps
      .map((step) => `<li>${step}</li>`)
      .join("");

    const completed = state.completed.has(chapter.id);
    elements.completeButton.classList.toggle("completed", completed);
    elements.completeButton.lastElementChild.textContent = completed ? "已完成" : "标记完成";

    renderCodeCard(state.language);
    renderCodeCard(state.compareLanguage, true);

    elements.compareControls.classList.toggle("hidden", !state.comparing);
    elements.compareCard.classList.toggle("hidden", !state.comparing);
    elements.codeGrid.classList.toggle("comparing", state.comparing);
    elements.compareToggle.textContent = state.comparing ? "关闭对比" : "对比模式";

    elements.outputBlock.textContent = "点击“运行结果预览”查看示例输出。";
    elements.footerPosition.textContent = `${index + 1} / ${chapters.length}`;
    elements.previousChapter.disabled = index === 0;
    elements.nextChapter.disabled = index === chapters.length - 1;

    renderLanguageCards();
  }

  function render() {
    document.documentElement.dataset.theme = state.theme;
    renderSelects();
    renderNav();
    renderProgress();
    renderChapter();
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      elements.toast.classList.remove("visible");
    }, 1600);
  }

  async function copyCode(languageId) {
    const snippet = currentChapter().snippets[languageId];
    try {
      await navigator.clipboard.writeText(snippet.code);
      showToast(`已复制 ${languages[languageId].name} 代码`);
    } catch {
      showToast("复制失败，请手动选择代码");
    }
  }

  function moveChapter(offset) {
    const nextIndex = currentIndex() + offset;
    if (nextIndex < 0 || nextIndex >= chapters.length) return;
    state.chapterId = chapters[nextIndex].id;
    persist();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeSidebar() {
    elements.sidebar.classList.remove("open");
    elements.scrim.classList.remove("visible");
  }

  elements.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    if (state.compareLanguage === state.language) {
      state.compareLanguage = Object.keys(languages).find((id) => id !== state.language);
    }
    persist();
    render();
  });

  elements.compareLanguageSelect.addEventListener("change", (event) => {
    state.compareLanguage = event.target.value;
    persist();
    renderChapter();
  });

  elements.compareToggle.addEventListener("click", () => {
    state.comparing = !state.comparing;
    if (state.compareLanguage === state.language) {
      state.compareLanguage = Object.keys(languages).find((id) => id !== state.language);
    }
    persist();
    render();
  });

  elements.completeButton.addEventListener("click", () => {
    const id = currentChapter().id;
    if (state.completed.has(id)) {
      state.completed.delete(id);
    } else {
      state.completed.add(id);
    }
    persist();
    renderNav();
    renderProgress();
    renderChapter();
  });

  elements.copyButton.addEventListener("click", () => copyCode(state.language));
  elements.compareCopyButton.addEventListener("click", () => copyCode(state.compareLanguage));

  elements.runButton.addEventListener("click", () => {
    elements.outputBlock.textContent = currentChapter().output;
    elements.terminal.animate(
      [
        { transform: "translateY(4px)", opacity: 0.65 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { duration: 180, easing: "ease-out" }
    );
  });

  elements.clearOutput.addEventListener("click", () => {
    elements.outputBlock.textContent = "";
  });

  elements.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    persist();
    render();
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderNav();
  });

  elements.resetProgress.addEventListener("click", () => {
    state.completed.clear();
    persist();
    render();
    showToast("学习进度已重置");
  });

  elements.previousChapter.addEventListener("click", () => moveChapter(-1));
  elements.nextChapter.addEventListener("click", () => moveChapter(1));

  elements.menuButton.addEventListener("click", () => {
    elements.sidebar.classList.add("open");
    elements.scrim.classList.add("visible");
  });
  elements.scrim.addEventListener("click", closeSidebar);

  elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = elements.chapterNav.querySelector("[data-chapter]");
      if (first) {
        first.click();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== elements.searchInput) {
      event.preventDefault();
      elements.searchInput.focus();
    }

    if (event.key === "Escape" && elements.sidebar.classList.contains("open")) {
      closeSidebar();
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      state.comparing = !state.comparing;
      persist();
      render();
    }

    if (event.key === "ArrowLeft" && event.altKey && !event.repeat) moveChapter(-1);
    if (event.key === "ArrowRight" && event.altKey && !event.repeat) moveChapter(1);
  });

  render();
})();
