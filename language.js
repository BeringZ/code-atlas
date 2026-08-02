// Code Atlas 2.0 — 语言进阶（P4 语言首页 + P5 专题详情）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  const ADV = window.CODE_ATLAS_ADVANCED;
  const ENC = window.CODE_ATLAS_ENCYCLOPEDIA;
  if (!D2 || !ADV) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  const state = {
    lang: (location.hash || "#python").replace("#", ""),
    topicId: A.qs("t"),
  };

  function encFor(langId) {
    return (ENC && ENC.languages.find((l) => l.id === langId)) || null;
  }
  function topicsFor(langId) {
    return (ADV.topics || []).filter((t) => t.lang === langId);
  }

  // 语言标签条
  function renderStrip() {
    document.querySelector("#langStrip").innerHTML = D2.languages
      .map((l) => {
        const active = l.id === state.lang ? "active" : "";
        return `<button class="${active}" data-lang="${l.id}" style="--lang-color:${l.color}">
          <span class="dot"></span>${l.name}</button>`;
      })
      .join("");
    document.querySelector("#langStrip").querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        state.topicId = "";
        location.hash = state.lang;
        history.replaceState(null, "", `language.html#${state.lang}`);
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // 专题详情（P5）
  function renderTopicDetail(topic) {
    const l = A.langById(topic.lang);
    const detail = topic.detail;
    let html = `
      <div class="topic-detail">
        <div class="eyebrow">${l.name} · ${topic.no} · 进阶专题</div>
        <h1>${A.esc(topic.title)}</h1>
        <p class="topic-core">${A.esc(topic.core)}</p>
        <a class="ghost-button" href="language.html#${topic.lang}">← 返回 ${l.name} 专题目录</a>`;

    if (detail) {
      // 要点讲解（必有）
      if (detail.explanation) {
        html += `
        <div class="detail-block">
          <h3>📖 要点讲解</h3>
          <p class="coach-explanation">${A.esc(detail.explanation)}</p>
        </div>`;
      }
      // 代码逐行解读（可选：精讲层才有）
      if (detail.code && detail.code.text) {
        html += `
        <div class="detail-block">
          <h3>💻 代码示例 · 逐行解读</h3>
          <div class="code-panel"><pre><code>${A.highlight(detail.code.text)}</code></pre></div>
          ${(detail.code.notes && detail.code.notes.length) ? `
          <ul class="code-notes">
            ${detail.code.notes.map((n) => `<li><span class="note-line">L${n.line}</span>${A.esc(n.note)}</li>`).join("")}
          </ul>` : ""}
        </div>`;
      }
      // 常见误区（必有）
      if (detail.pitfalls && detail.pitfalls.length) {
        html += `
        <div class="detail-block">
          <h3>⚠️ 常见误区</h3>
          <ul class="pitfall-list">${detail.pitfalls.map((p) => `<li>${A.esc(p)}</li>`).join("")}</ul>
        </div>`;
      }
      // 互动练习（可选：精讲层才有）
      if (detail.exercise && detail.exercise.options) {
        html += `
        <div class="detail-block">
          <h3>✏️ 互动练习</h3>
          <div class="exercise-card" data-answer="${detail.exercise.answer}" data-feedback="${A.esc(detail.exercise.feedback)}">
            <h4>${A.esc(detail.exercise.question)}</h4>
            <div class="exercise-options">
              ${detail.exercise.options.map((opt, oi) => `
                <button class="exercise-option" data-opt="${oi}">
                  <span class="ex-opt-key">${String.fromCharCode(65 + oi)}</span><span>${A.esc(opt)}</span>
                </button>`).join("")}
            </div>
            <div class="exercise-feedback hidden"></div>
          </div>
        </div>`;
      }
    } else {
      html += `<div class="detail-block" style="padding:20px;border:1px dashed var(--line);border-radius:12px;color:var(--muted);font-size:13px">该专题的逐行精讲内容正在生产中，可先浏览<a href="concept.html">基础知识点</a>或该语言<a href="encyclopedia.html#${topic.lang}">语言百科</a>。</div>`;
    }
    html += `</div>`;
    return html;
  }

  // 语言首页（P4）
  function renderLangHome() {
    const l = A.langById(state.lang);
    const enc = encFor(state.lang);
    const topics = topicsFor(state.lang);
    const detailedCount = topics.filter((t) => t.status === "detailed").length;

    let html = `
      <div class="adv-hero page-hero">
        <div>
          <div class="eyebrow">${l.name} · 独立进阶目录</div>
          <h1>${l.name} 语言进阶</h1>
          <p>${enc ? A.esc(enc.positioning) : ""} 深入该语言真正独特且必须掌握的机制：${topics.map((t) => t.no).join(" / ")}。</p>
        </div>
        <div class="path-cards" style="grid-template-columns:1fr;min-width:260px">
          <div class="path-card">
            <span class="path-aud">${topics.length} 个专题</span>
            <h3>${detailedCount} 个精讲 · ${topics.length - detailedCount} 个待深入</h3>
            <ol>
              <li>先完成基础模块 B00-B09</li>
              <li>按编号顺序攻破 ${l.name} 机制专题</li>
              <li>到<a href="lab.html">功能实验室</a>做 ${l.name} 项目</li>
            </ol>
          </div>
        </div>
      </div>`;

    // 工具链（来自语言百科）
    if (enc) {
      html += `
        <div class="section-block">
          <div class="section-heading"><div><span class="eyebrow">Toolchain</span><h2>工具链速查</h2></div></div>
          <div class="adv-toolchain">
            ${Object.entries(enc.toolchain).map(([k, v]) => `<div class="tc-item"><b>${A.esc(k)}</b>${A.esc(v)}</div>`).join("")}
          </div>
        </div>`;
    }

    // 专题列表
    html += `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Topics</span><h2>${l.name} 进阶专题</h2><p class="desc">按机制与工程能力组织，点击进入精讲或查看待生产内容。</p></div></div>
        <div class="adv-topic-list">
          ${topics.map((t) => `
            <a class="adv-topic" href="language.html?t=${t.id}">
              <span class="adv-no">${t.no}</span>
              <span><strong>${A.esc(t.title)}</strong><span>${A.esc(t.core)}</span></span>
              <span class="adv-status ${t.status}">${t.status === "detailed" ? "精讲" : "待深入"}</span>
            </a>`).join("")}
        </div>
      </div>`;

    return html;
  }

  function render() {
    renderStrip();
    const topic = state.topicId ? (ADV.topics || []).find((t) => t.id === state.topicId) : null;
    document.querySelector("#advRoot").innerHTML = topic ? renderTopicDetail(topic) : renderLangHome();

    // 练习绑定（专题详情）
    document.querySelectorAll(".exercise-card").forEach((card) => {
      const answer = Number(card.dataset.answer);
      const feedback = card.querySelector(".exercise-feedback");
      card.querySelectorAll(".exercise-option").forEach((opt) => {
        opt.addEventListener("click", () => {
          const chosen = Number(opt.dataset.opt);
          const ok = chosen === answer;
          card.querySelectorAll(".exercise-option").forEach((o) => {
            const oi = Number(o.dataset.opt);
            o.classList.remove("correct", "wrong");
            if (oi === answer) o.classList.add("correct");
            if (oi === chosen && !ok) o.classList.add("wrong");
          });
          feedback.classList.remove("hidden");
          feedback.className = "exercise-feedback " + (ok ? "ok" : "no");
          feedback.textContent = (ok ? "✅ 回答正确！" : "❌ 回答错误。") + card.dataset.feedback;
        });
      });
    });

    document.querySelector("#footerLeft").textContent = topic
      ? `${A.langById(topic.lang).name} ${topic.no} ${topic.title}`
      : `${A.langById(state.lang).name} · 语言进阶`;
  }

  window.addEventListener("hashchange", () => {
    state.lang = (location.hash || "#python").replace("#", "");
    state.topicId = A.qs("t");
    render();
  });
  window.addEventListener("popstate", () => {
    state.topicId = A.qs("t");
    render();
  });

  render();
})();
