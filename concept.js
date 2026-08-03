// Code Atlas 2.0 — 基础知识点详情（P2 + P3 对比）
(() => {
  const A = window.CodeAtlas2;
  const D2 = window.CODE_ATLAS_2;
  const ADV = window.CODE_ATLAS_ADVANCED;
  if (!D2) return;

  A.initTheme();
  A.bindSearch("#globalSearch", "#searchResults");
  document.querySelector("#themeToggle").addEventListener("click", A.toggleTheme);

  const conceptsById = {};
  (D2.concepts || []).forEach((c) => { conceptsById[c.id] = c; });
  const moduleById = {};
  (D2.modules || []).forEach((m) => { moduleById[m.id] = m; });

  const state = {
    conceptId: A.qs("c") || "value.binding",
    language: "python",
    compare: null,
  };

  function currentConcept() {
    return conceptsById[state.conceptId] || null;
  }
  function currentModule() {
    const c = currentConcept();
    return c ? moduleById[c.module_id] : null;
  }
  function langName(id) { return A.langById(id).name; }

  // ===== 左侧知识点树 =====
  function renderTree() {
    const c = currentConcept();
    const m = currentModule();
    if (!c || !m) return "";
    return `
      <aside class="concept-tree">
        <div class="tree-module">${m.id} ${A.esc(m.title)}</div>
        ${m.concepts.map((id) => {
          const item = conceptsById[id];
          if (!item) {
            return `<a href="#" class="draft" title="建设中">${A.esc(id.split(".")[1].replace(/-/g, " "))} · 建设中</a>`;
          }
          const active = id === state.conceptId ? "active" : "";
          const cls = item.status === "published" ? "" : "draft";
          return `<a class="${active} ${cls}" href="concept.html?c=${id}">${A.esc(item.title)}</a>`;
        }).join("")}
        <div class="tree-module" style="margin-top:16px">前置知识</div>
        ${c.prerequisites && c.prerequisites.length
          ? c.prerequisites.map((pid) => {
              const pc = conceptsById[pid];
              return pc ? `<a href="concept.html?c=${pc.id}">← ${A.esc(pc.title)}</a>` : `<span class="draft" style="padding:8px 10px;display:block">${A.esc(pid)}</span>`;
            }).join("")
          : `<span style="padding:8px 10px;display:block;color:var(--muted);font-size:12px">无（起点知识点）</span>`}
      </aside>`;
  }

  // ===== 语言切换器 =====
  function renderSwitcher(c) {
    const hasVariants = c.variants && Object.keys(c.variants).length;
    if (!hasVariants) return "";
    return `
      <div class="lang-switcher" id="langSwitcher">
        ${D2.languages.map((l) => {
          const active = l.id === state.language ? "active" : "";
          return `<button class="${active}" data-lang="${l.id}" style="--lang-color:${l.color}">
            <span class="dot"></span>${l.name}
          </button>`;
        }).join("")}
      </div>`;
  }

  // ===== 代码面板（语义块高亮） =====
  function renderCodePanel(title, variant) {
    const code = variant.minimal_code;
    // 渲染时给每行加 class 以便语义块高亮
    const roles = { "declare": "s1", "rebind": "s2", "condition": "s3", "branch": "s2", "match": "s1", "destructure": "s4", "mutate": "s3", "call": "s2", "return-err": "s1", "ok": "s3", "propagate": "s4", "check": "s1", "iterate": "s2", "index": "s3", "comprehend": "s4", "map": "s1", "stream": "s2", "transform": "s3", "value-only": "s4", "map-range": "s3", "iterator-chain": "s2", "raise": "s1", "try": "s2", "catch": "s3", "throw": "s1", "return-error": "s1", "pool": "s2", "spawn": "s1", "await-all": "s3", "join-all": "s4", "wait-all": "s3", "define": "s2", "declare-param": "s1" };
    const lineMap = {};
    (variant.semantic_blocks || []).forEach((b) => {
      const cls = roles[b.role] || "s1";
      for (let ln = b.start; ln <= b.end; ln++) lineMap[ln] = cls;
    });
    const lines = code.split("\n");
    const body = lines.map((line, i) => {
      const cls = lineMap[i + 1];
      const tag = cls ? `semantic-line-${cls}` : "";
      return `<span class="cl ${tag}">${A.esc(line)}</span>`;
    }).join("\n");

    const legend = (variant.semantic_blocks || []).map((b, i) => {
      const colors = { s1: "#ff5b35", s2: "#3b82f6", s3: "#16805c", s4: "#d97706" };
      return `<span><i style="background:${colors[roles[b.role]] || "#ff5b35"}"></i>${A.esc(b.role)}</span>`;
    }).join("");

    return `
      <div class="code-panel">
        <div class="code-panel-head">
          <span class="file">${title}</span>
          <span class="role-tag">语义块对齐</span>
        </div>
        <pre><code>${body}</code></pre>
      </div>
      ${legend ? `<div class="semantic-legend">${legend}</div>` : ""}`;
  }

  // ===== 右侧差异四类 =====
  function renderDiff(variant) {
    const sections = [
      ["语法差异", variant.syntax_notes],
      ["语义差异", variant.semantic_notes],
      ["惯用写法", variant.idioms],
      ["常见陷阱", variant.pitfalls],
    ];
    return `
      <div class="diff-grid">
        ${sections.map(([t, items]) => `
          <div class="diff-card">
            <h4>${t}</h4>
            <ul>${items.map((i) => `<li>${A.esc(i)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>`;
  }

  // ===== 同题任务（工作流 H 第 4 层：六语言同题输入输出协议） =====
  function renderCommonTask(c) {
    if (!c.commonTask) return "";
    const io = c.commonTask.expectedOutput || {};
    const rows = Object.entries(io).map(([k, v]) => `<span class="meta-tag">${k} = ${v}</span>`).join("");
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Same-task protocol</span><h2>同题任务 · 统一输入输出</h2></div></div>
        <div class="diff-card" style="padding:16px 18px">
          <p style="margin:0 0 10px;color:var(--muted);font-size:13px;line-height:1.9"><b style="color:var(--text)">输入：</b>${A.esc(c.commonTask.input)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${rows}</div>
        </div>
      </div>`;
  }

  // ===== 结构化差异矩阵（工作流 I：维度 × 语言，替代单段 lang_diff 文本） =====
  function renderComparisonMatrix(c) {
    if (!c.comparisonDimensions || !c.comparisonDimensions.length) return "";
    const dims = c.comparisonDimensions;
    const langs = D2.languages;
    const dimLabel = {
      "unicode-representation": "Unicode 表示",
      "type-checking": "静态/动态检查",
      "failure-mode": "失败模式",
      "idiomatic-style": "惯用写法",
      "runtime-cost": "运行时代价",
      "mutability": "可变性",
      "memory-model": "内存模型",
      "error-propagation": "错误传播",
      "ownership": "所有权"
    };
    const cells = dims.map((dim) => `
      <tr>
        <th>${dimLabel[dim] || dim}</th>
        ${langs.map((l) => {
          const v = c.variants && c.variants[l.id];
          const txt = v && v.comparison && v.comparison[dim];
          return `<td class="${txt ? "" : "dim-na"}">${txt ? A.esc(txt) : "—"}</td>`;
        }).join("")}
      </tr>`).join("");
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Comparison matrix</span><h2>六语言语义差异矩阵</h2></div></div>
        <div class="cmp-scroll">
          <table class="cmp-table">
            <thead><tr><th>维度</th>${langs.map((l) => `<th style="color:${l.color}">${l.name}</th>`).join("")}</tr></thead>
            <tbody>${cells}</tbody>
          </table>
        </div>
      </div>`;
  }

  // ===== 跨语言迁移练习（工作流 H 第 7 层） =====
  function renderTransferExercises(c) {
    if (!c.transferExercises || !c.transferExercises.length) return "";
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Transfer</span><h2>跨语言迁移练习</h2></div></div>
        ${c.transferExercises.map((ex, i) => `
          <div class="exercise-card" data-answer="${ex.answer}" data-feedback="${A.esc(ex.feedback)}">
            <span class="ex-type">迁移</span>
            <h4>${A.esc(ex.question)}</h4>
            <div class="exercise-options">
              ${ex.options.map((opt, oi) => `
                <button class="exercise-option" data-opt="${oi}">
                  <span class="ex-opt-key">${String.fromCharCode(65 + oi)}</span>
                  <span>${A.esc(opt)}</span>
                </button>`).join("")}
            </div>
            <div class="exercise-feedback hidden"></div>
          </div>`).join("")}
      </div>`;
  }

  // ===== 综合验收（工作流 H 第 8 层 + L4 硬性要求） =====
  function renderAcceptanceTests(c) {
    if (!c.acceptanceTests || !c.acceptanceTests.length) return "";
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Acceptance</span><h2>综合验收 · 可运行断言</h2></div></div>
        <div class="diff-card" style="padding:16px 18px">
          ${c.acceptanceTests.map((t) => `
            <p style="margin:0 0 8px;color:var(--muted);font-size:13px;font-family:ui-monospace,Menlo,monospace">
              <span class="meta-tag" style="background:color-mix(in srgb,var(--success) 12%,transparent);color:var(--success)">${A.esc(t.input)}</span>
              &nbsp;${A.esc(t.assert)}&nbsp;→&nbsp;<b style="color:var(--text)">${A.esc(t.expect)}</b>
            </p>`).join("")}
        </div>
      </div>`;
  }

  // ===== 错误案例 =====
  function renderErrors(c) {
    if (!c.errors || !c.errors.length) return "";
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Error clinic</span><h2>错误案例与诊断</h2></div></div>
        ${c.errors.map((e) => `
          <div class="error-panel">
            <h4>错误代码</h4>
            <pre><code>${A.esc(e.code)}</code></pre>
            <p class="err-msg">${A.esc(e.message)}</p>
            <p class="err-fix"><b>原因：</b>${A.esc(e.cause)}<br/><b>修复：</b>${A.esc(e.fix)}</p>
          </div>`).join("")}
      </div>`;
  }

  // ===== 练习 =====
  function renderExercises(c) {
    if (!c.exercises || !c.exercises.length) return "";
    const typeLabel = { concept: "概念判断", read: "代码阅读", pair: "语义配对", diagnose: "错误诊断", fill: "代码补全" };
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Practice</span><h2>练习与即时反馈</h2></div></div>
        ${c.exercises.map((ex, i) => `
          <div class="exercise-card" data-answer="${ex.answer}" data-feedback="${A.esc(ex.feedback)}">
            <span class="ex-type">${typeLabel[ex.type] || ex.type}</span>
            <h4>${A.esc(ex.question)}</h4>
            <div class="exercise-options">
              ${ex.options.map((opt, oi) => `
                <button class="exercise-option" data-opt="${oi}">
                  <span class="ex-opt-key">${String.fromCharCode(65 + oi)}</span>
                  <span>${A.esc(opt)}</span>
                </button>`).join("")}
            </div>
            <div class="exercise-feedback hidden"></div>
          </div>`).join("")}
      </div>`;
  }

  // ===== 相关进阶 =====
  function renderRelated(c) {
    if (!c.related_advanced || !c.related_advanced.length) return "";
    const adv = (ADV.topics || []).filter((t) => c.related_advanced.includes(t.id));
    if (!adv.length) return "";
    return `
      <div class="diff-grid" style="margin-top:14px">
        ${adv.map((t) => {
          const l = A.langById(t.lang);
          return `<a class="diff-card" style="text-decoration:none;display:block" href="language.html?t=${t.id}">
            <h4>→ 进阶：${l.name} ${t.no} ${A.esc(t.title)}</h4>
            <span style="color:var(--muted);font-size:11.5px;line-height:1.6">${A.esc(t.core)}</span>
          </a>`;
        }).join("")}
      </div>`;
  }

  // ===== 完整渲染 =====
  function render() {
    const c = currentConcept();
    const root = document.querySelector("#conceptRoot");
    if (!c) {
      root.innerHTML = `<div style="padding:60px 0;text-align:center;color:var(--muted)"><h2>知识点不存在或建设中</h2><p>该知识点尚未发布，返回<a href="modules.html">模块目录</a>。</p></div>`;
      return;
    }
    A.markProgress(c.id, "browsed");

    const m = currentModule();
    const hasVariants = c.variants && Object.keys(c.variants).length;
    const variant = hasVariants ? c.variants[state.language] : null;

    // 中央内容
    let mainHtml = `
      <div class="concept-main">
        <div class="eyebrow">${m.id} · ${A.esc(m.title)}</div>
        <h1 class="concept-title">${A.esc(c.title)}</h1>
        <div class="concept-meta">
          <span class="meta-tag module">${m.id}</span>
          <span class="meta-tag ${c.status === "published" ? "published" : "draft"}">${c.status === "published" ? "已发布" : "建设中"}</span>
          <span class="meta-tag">${D2.languages.map((l) => l.name).join(" / ")}</span>
        </div>
        <div class="objectives">
          <h4>本节只需掌握</h4>
          <ul>${c.objectives.map((o) => `<li>${A.esc(o)}</li>`).join("")}</ul>
        </div>
        <p class="concept-core">${A.esc(c.core)}</p>
        ${renderSwitcher(c)}
      </div>`;

    if (hasVariants && variant) {
      mainHtml += `
        <div class="concept-main" style="margin-top:6px">
          <div class="section-heading"><div><span class="eyebrow">Minimal example · ${langName(state.language)}</span><h2>最小示例</h2></div></div>
          ${renderCodePanel(`main${A.langById(state.language).tag.toLowerCase() === "js" ? ".js" : A.langById(state.language).id === "cpp" ? ".cpp" : "." + (state.language === "javascript" ? "js" : state.language === "cpp" ? "cpp" : state.language === "java" ? "java" : state.language === "go" ? "go" : state.language === "rust" ? "rs" : "py")}`, variant)}
          <div class="section-heading" style="margin-top:34px"><div><span class="eyebrow">Language differences</span><h2>${langName(state.language)} 的差异说明</h2></div></div>
          ${renderDiff(variant)}
        </div>`;
    } else if (c.lang_diff) {
      mainHtml += `
        <div class="concept-main" style="margin-top:6px">
          <div class="section-heading"><div><span class="eyebrow">Language differences</span><h2>六语言差异</h2></div></div>
          <div class="diff-card" style="padding:16px 18px"><p style="margin:0;color:var(--muted);font-size:13px;line-height:1.9">${A.esc(c.lang_diff)}</p></div>
        </div>`;
    }

    mainHtml += renderCommonTask(c) + renderComparisonMatrix(c) + renderErrors(c) + renderTransferExercises(c) + renderAcceptanceTests(c) + renderExercises(c);

    // 深入机制 + 总结迁移
    mainHtml += `
      <div class="section-block">
        ${c.deep_dive ? `
          <details class="detail-fold">
            <summary>🔬 深入机制（默认折叠）</summary>
            <div class="fold-body">${A.esc(c.deep_dive)}</div>
          </details>` : ""}
        ${c.summary ? `
          <div class="detail-fold" style="margin-top:12px">
            <summary style="cursor:default">总结与迁移</summary>
            <div class="fold-body">${A.esc(c.summary)}</div>
          </div>` : ""}
      </div>`;

    // 前后置导航
    const moduleConcepts = m.concepts;
    const idx = moduleConcepts.indexOf(c.id);
    const prev = idx > 0 ? conceptsById[moduleConcepts[idx - 1]] : null;
    const next = idx < moduleConcepts.length - 1 ? conceptsById[moduleConcepts[idx + 1]] : null;
    mainHtml += `
      <div class="concept-nav">
        ${prev ? `<a class="prev" href="concept.html?c=${prev.id}"><span class="nav-label">← 上一知识点</span><strong>${A.esc(prev.title)}</strong></a>` : `<a style="visibility:hidden"></a>`}
        ${next ? `<a class="next" href="concept.html?c=${next.id}"><span class="nav-label">下一知识点 →</span><strong>${A.esc(next.title)}</strong></a>` : ""}
      </div>`;

    // 右侧辅助
    const rightHtml = `
      <aside style="position:sticky;top:84px">
        <div class="diff-card" style="margin-bottom:12px">
          <h4>🎯 本节目标</h4>
          <ul>${c.objectives.map((o) => `<li>${A.esc(o)}</li>`).join("")}</ul>
        </div>
        <div class="diff-card" style="margin-bottom:12px">
          <h4>🔗 相关进阶专题</h4>
          ${c.related_advanced && c.related_advanced.length ? renderRelated(c) : `<p style="color:var(--muted);font-size:12px;margin:0">暂无</p>`}
        </div>
        <div class="diff-card">
          <h4>📌 掌握状态</h4>
          <div id="masteryBox" style="display:grid;gap:8px"></div>
        </div>
      </aside>`;

    root.innerHTML = renderTree() + `<div style="min-width:0">${mainHtml}</div>` + rightHtml;

    // 绑定：语言切换
    const switcher = document.querySelector("#langSwitcher");
    if (switcher) {
      switcher.querySelectorAll("[data-lang]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.language = btn.dataset.lang;
          render();
          const codePanel = document.querySelector(".code-panel");
          if (codePanel) codePanel.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    // 绑定：练习即时反馈
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
          if (ok) A.markProgress(c.id, "passed");
        });
      });
    });

    // 掌握状态按钮
    const mastery = A.getProgress(c.id);
    document.querySelector("#masteryBox").innerHTML = `
      <button class="ghost-button ${mastery.browsed ? "primary-button" : ""}" id="btnBrowsed" style="text-align:center">已浏览 ${mastery.browsed ? "✓" : ""}</button>
      <button class="ghost-button ${mastery.understood ? "primary-button" : ""}" id="btnUnderstood" style="text-align:center">已理解 ${mastery.understood ? "✓" : ""}</button>
      <button class="ghost-button ${mastery.passed ? "primary-button" : ""}" id="btnPassed" style="text-align:center">练习通过 ${mastery.passed ? "✓" : ""}</button>`;
    const bindBtn = (sel, field) => {
      const el = document.querySelector(sel);
      if (el) el.addEventListener("click", () => { A.markProgress(c.id, field); render(); A.showToast("状态已更新"); });
    };
    bindBtn("#btnUnderstood", "understood");

    document.querySelector("#footerRight").textContent = `${m.id} · ${A.esc(c.title)} · ${langName(state.language)}`;
  }

  // 路由：?c= 变化
  window.addEventListener("popstate", () => {
    state.conceptId = A.qs("c") || "value.binding";
    render();
  });

  render();
})();
