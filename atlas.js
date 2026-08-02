// Code Atlas 2.0 — 共享运行时：主题 / 进度 / 全站搜索 / 工具函数
window.CodeAtlas2 = (() => {
  // ===== 主题（兼容旧 key） =====
  const THEME_KEY = "code-atlas-state";
  function loadTheme() {
    try {
      return JSON.parse(localStorage.getItem(THEME_KEY) || "{}").theme || "light";
    } catch { return "light"; }
  }
  function saveTheme(theme) {
    try {
      const raw = JSON.parse(localStorage.getItem(THEME_KEY) || "{}");
      raw.theme = theme;
      localStorage.setItem(THEME_KEY, JSON.stringify(raw));
    } catch { /* ignore */ }
  }
  function initTheme() {
    const t = loadTheme();
    document.documentElement.dataset.theme = t;
    return t;
  }
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    saveTheme(next);
    return next;
  }

  // ===== 知识点进度（浏览 / 理解 / 练习通过） =====
  const PROG_KEY = "code-atlas-progress";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROG_KEY) || "{}"); }
    catch { return {}; }
  }
  function saveProgress(p) { localStorage.setItem(PROG_KEY, JSON.stringify(p)); }
  function markProgress(id, field) {
    const p = loadProgress();
    p[id] = p[id] || {};
    p[id][field] = true;
    saveProgress(p);
  }
  function getProgress(id) { return (loadProgress())[id] || {}; }
  function progressSummary() {
    const p = loadProgress();
    return {
      browsed: Object.values(p).filter((v) => v.browsed).length,
      understood: Object.values(p).filter((v) => v.understood).length,
      passed: Object.values(p).filter((v) => v.passed).length,
    };
  }

  // ===== 全站搜索索引 =====
  let index = null;
  function buildIndex() {
    if (index) return index;
    const items = [];
    const D2 = window.CODE_ATLAS_2;
    const ADV = window.CODE_ATLAS_ADVANCED;
    if (D2) {
      (D2.modules || []).forEach((m) => {
        items.push({ type: "模块", title: `${m.id} ${m.title}`, desc: m.objective, href: `modules.html#${m.id}`, keywords: m.title + m.objective });
      });
      (D2.concepts || []).forEach((c) => {
        items.push({ type: "知识点", title: c.title, desc: `${c.module_id} · ${c.objectives ? c.objectives[0] : ""}`, href: `concept.html?c=${c.id}`, keywords: c.title + (c.core || "") });
      });
    }
    if (ADV) {
      (ADV.topics || []).forEach((t) => {
        const langName = (D2 && D2.languages.find((l) => l.id === t.lang) || {}).name || t.lang;
        items.push({ type: "语言进阶", title: `${langName} ${t.no} ${t.title}`, desc: t.core, href: `language.html?t=${t.id}`, keywords: langName + t.title + t.core });
      });
    }
    // 术语纳入搜索
    const GLO = window.CODE_ATLAS_GLOSSARY;
    if (GLO) {
      (GLO.terms || []).forEach((t) => {
        items.push({ type: "术语", title: `${t.term} · ${t.en}`, desc: t.def, href: `concept.html?c=${t.concept}`, keywords: t.term + t.en + t.def });
      });
    }
    index = items;
    return index;
  }
  function search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return buildIndex().filter((it) => (it.title + it.desc + it.keywords).toLowerCase().includes(q)).slice(0, 12);
  }

  // 顶部搜索框绑定（所有页面共用）
  function bindSearch(inputSel, resultsSel) {
    const input = document.querySelector(inputSel);
    const results = document.querySelector(resultsSel);
    if (!input || !results) return;
    input.addEventListener("input", () => {
      const hits = search(input.value);
      if (!input.value.trim()) { results.innerHTML = ""; results.classList.add("hidden"); return; }
      results.innerHTML = hits.length
        ? hits.map((h) => `<a class="search-result" href="${h.href}">
            <span class="sr-type">${h.type}</span><strong>${h.title}</strong><span>${h.desc}</span>
          </a>`).join("")
        : `<div class="search-result"><span class="sr-type">无结果</span><strong>未找到「${input.value}」</strong><span>试试其他关键词</span></div>`;
      results.classList.remove("hidden");
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const first = results.querySelector("a");
        if (first) location.href = first.getAttribute("href");
      }
      if (e.key === "Escape") { results.innerHTML = ""; results.classList.add("hidden"); input.blur(); }
    });
    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !results.contains(e.target)) { results.classList.add("hidden"); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input && !/^(input|textarea|select)$/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ===== 工具 =====
  function esc(text) {
    return String(text ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  function qs(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }
  function langById(id) {
    const D2 = window.CODE_ATLAS_2;
    return (D2 && D2.languages.find((l) => l.id === id)) || { id, name: id, tag: id.slice(0, 3).toUpperCase(), color: "#ff5b35" };
  }
  function showToast(msg) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("visible"), 1600);
  }
  // 轻量语法高亮（与 1.0 同款，保持代码块观感）
  function highlight(code) {
    const escaped = esc(code);
    return escaped
      .replace(/(&quot;.*?&quot;|".*?"|'.*?'|`.*?`)/g, '<span style="color:#d7ba7d">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color:#6a9955">$1</span>')
      .replace(/^(\s*)(#.*)$/gm, '$1<span style="color:#6a9955">$2</span>')
      .replace(/\b(class|function|def|fn|func|public|private|static|const|let|var|if|else|elif|for|while|return|import|from|use|struct|impl|match|try|catch|except|throw|throws|new|package|async|await|go|defer|true|false|True|False|bool|int|double|float|string|String|void|mut|enum|record|final|constexpr|mutex|select|yield)\b/g, '<span style="color:#c586c0">$1</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span style="color:#b5cea8">$1</span>');
  }
  // 语义块高亮：给代码行加背景色（按语义块角色）
  function applySemanticHighlights(codeEl, blocks) {
    if (!blocks || !blocks.length) return;
    const lines = codeEl.querySelectorAll("span.cl-line, br + *") || [];
    // 直接操作 pre > code 的行：把代码按行拆 span 不可靠，改用行内高亮标记
    // 简化方案：在 code 的每行包裹 span，再对语义块行号上色
    const text = codeEl.textContent;
    const html = codeEl.innerHTML;
    const rawLines = text.split("\n");
    if (rawLines.length < 2) return;
    const roles = { "declare": "s1", "rebind": "s2", "condition": "s3", "branch": "s2", "match": "s1", "destructure": "s4", "mutate": "s3", "call": "s2", "return-err": "s1", "ok": "s3", "propagate": "s4", "check": "s1", "iterate": "s2", "index": "s3", "comprehend": "s4", "map": "s1", "stream": "s2", "transform": "s3", "value-only": "s4", "map-range": "s3", "iterator-chain": "s2", "raise": "s1", "try": "s2", "catch": "s3", "throw": "s1", "return-error": "s1", "pool": "s2", "spawn": "s1", "await-all": "s3", "join-all": "s4", "wait-all": "s3", "define": "s2", "declare-param": "s1", "declare": "s1" };
    const lineMap = {};
    blocks.forEach((b) => {
      const cls = roles[b.role] || "s1";
      for (let ln = b.start; ln <= b.end; ln++) lineMap[ln] = cls;
    });
    // 用 textContent 重建带行号高亮的 HTML（在行首插入标记 span）
    let out = "";
    const inner = codeEl.textContent;
    const linesArr = inner.split("\n");
    linesArr.forEach((line, i) => {
      const cls = lineMap[i + 1];
      const tag = cls ? `semantic-line-${cls}` : "";
      out += `<span class="cl ${tag}">${esc(line)}</span>`;
      if (i < linesArr.length - 1) out += "\n";
    });
    codeEl.innerHTML = out;
  }

  return {
    loadTheme, saveTheme, initTheme, toggleTheme,
    loadProgress, saveProgress, markProgress, getProgress, progressSummary,
    buildIndex, search, bindSearch,
    esc, qs, langById, showToast, highlight, applySemanticHighlights,
  };
})();
