// Code Atlas 2.0 — 知识点详情（v2 微型课程 + v1 兼容）
// v2 概念（含 hook 字段）渲染完整学习流；v1 概念保持原有布局不变
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
    // v2 interactive state
    execStep: 0,
    hookAnswered: false,
    challengeHintLevel: 0,
    challengeRevealed: false,
    debugLabRevealed: {},
    langSectionOpen: false,
  };

  function currentConcept() { return conceptsById[state.conceptId] || null; }
  function currentModule() {
    const c = currentConcept();
    return c ? moduleById[c.module_id] : null;
  }
  function langName(id) { return A.langById(id).name; }
  function isV2(c) { return !!(c && c.hook); }
  function fileExt(lang) {
    const map = { python: "py", javascript: "js", java: "java", cpp: "cpp", go: "go", rust: "rs" };
    return map[lang] || "txt";
  }

  // ================================================================
  // v2 组件
  // ================================================================

  // 01. 顶部学习概览
  function renderLearningOverview(c, m) {
    const diffLabel = { beginner: "基础", intermediate: "进阶", advanced: "高级" };
    const diff = diffLabel[c.difficulty] || "基础";
    const time = c.estimatedTime || 8;
    return `
      <section class="v2-hero" id="learningOverview">
        <div class="v2-hero-breadcrumb">${m.id} · ${A.esc(m.title)}</div>
        <h1 class="v2-hero-title">${A.esc(c.title)}</h1>
        <div class="v2-hero-meta">
          <span class="v2-meta-pill"><span class="v2-meta-icon">⏱</span> 预计 ${time} 分钟</span>
          <span class="v2-meta-pill"><span class="v2-meta-icon">📊</span> 难度：${diff}</span>
          <span class="v2-meta-pill"><span class="v2-meta-icon">📖</span> ${c.level || "L2"}</span>
        </div>
        <div class="v2-hero-objectives">
          <p class="v2-hero-objectives-label">学完以后你可以：</p>
          <ul>${(c.objectives || []).map((o) => `<li><span class="v2-check">✓</span> ${A.esc(o)}</li>`).join("")}</ul>
        </div>
        <button class="v2-start-btn" onclick="document.getElementById('hookSection')?.scrollIntoView({behavior:'smooth'})">
          开始学习 →
        </button>
      </section>`;
  }

  // 02. 问题引入（Hook）
  function renderHook(c) {
    const h = c.hook;
    if (!h) return "";
    return `
      <section class="v2-section" id="hookSection">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Hook · 问题引入</span>
          <h2>先想一个问题</h2>
        </div>
        ${h.code ? `<pre class="v2-hook-code"><code>${A.esc(h.code)}</code></pre>` : ""}
        <p class="v2-hook-question">${A.esc(h.question)}</p>
        <div class="v2-hook-options" id="hookOptions">
          ${h.options.map((opt, i) => `
            <button class="v2-hook-option" data-opt="${i}">
              <span class="v2-opt-key">${String.fromCharCode(65 + i)}</span>
              <span>${A.esc(opt)}</span>
            </button>`).join("")}
        </div>
        <div class="v2-hook-explanation hidden" id="hookExplanation">
          <div class="v2-explanation-box">
            <p id="hookExplanationText"></p>
          </div>
        </div>
      </section>`;
  }

  // 03. 心智模型（Mental Model）
  function renderMentalModel(c) {
    const mm = c.mentalModel;
    if (!mm) return "";
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Mental model · 心智模型</span>
          <h2>${A.esc(mm.title || "建立直观模型")}</h2>
        </div>
        ${mm.description ? `<p class="v2-model-desc">${A.esc(mm.description)}</p>` : ""}
        ${mm.diagram ? `<div class="v2-model-diagram">${mm.diagram}</div>` : ""}
      </section>`;
  }

  // 04. 核心解释（Core Explanation）
  function renderCoreExplanation(c) {
    if (!c.core) return "";
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Core · 核心解释</span>
          <h2>理解概念</h2>
        </div>
        <div class="v2-core-text">${A.esc(c.core)}</div>
      </section>`;
  }

  // 05. 执行过程（Execution Stepper）
  function renderExecutionStepper(c) {
    const steps = c.executionSteps;
    if (!steps || !steps.length) return "";
    if (state.execStep >= steps.length) state.execStep = 0;
    const step = steps[state.execStep];
    const code = (c.variants && c.variants[state.language] && c.variants[state.language].minimal_code) || "";
    const codeLines = code ? code.split("\n") : [];

    const stateRows = step.state
      ? Object.entries(step.state).map(([k, v]) => {
          const display = typeof v === "object" ? JSON.stringify(v) : String(v);
          return `<div class="v2-state-row"><span class="v2-state-var">${A.esc(k)}</span><span class="v2-state-val">${A.esc(display)}</span></div>`;
        }).join("")
      : '<div class="v2-state-empty">（无变量变化）</div>';

    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Execution · 执行过程</span>
          <h2>程序如何一步步运行</h2>
        </div>
        <div class="v2-exec-container">
          <div class="v2-exec-code">
            ${codeLines.map((line, i) => {
              const ln = i + 1;
              const active = ln === step.line ? "v2-exec-active" : "";
              return `<div class="v2-exec-line ${active}"><span class="v2-exec-ln">${ln}</span><span class="v2-exec-code-text">${A.esc(line)}</span></div>`;
            }).join("")}
          </div>
          <div class="v2-exec-side">
            <div class="v2-exec-state">
              <h4>程序状态</h4>
              ${stateRows}
            </div>
            <p class="v2-exec-explain">${A.esc(step.explanation)}</p>
          </div>
        </div>
        <div class="v2-exec-controls">
          <button class="v2-step-btn" id="execPrev" ${state.execStep === 0 ? "disabled" : ""}>← 上一步</button>
          <span class="v2-step-count">${state.execStep + 1} / ${steps.length}</span>
          <button class="v2-step-btn" id="execNext" ${state.execStep === steps.length - 1 ? "disabled" : ""}>下一步 →</button>
        </div>
      </section>`;
  }

  // 06. 最小示例 + 逐行解释（Walkthrough）
  function renderMinimalExampleWithWalkthrough(c) {
    const variant = c.variants && c.variants[state.language];
    if (!variant || !variant.minimal_code) return "";
    const walkthrough = c.walkthrough || [];
    const codeLines = variant.minimal_code.split("\n");

    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Minimal example · ${langName(state.language)}</span>
          <h2>最小示例</h2>
        </div>
        ${renderCodePanel(`main.${fileExt(state.language)}`, variant)}
        ${walkthrough.length ? `
          <div class="v2-walkthrough">
            <h4>逐行解释</h4>
            ${codeLines.map((line, i) => {
              const wt = walkthrough.find((w) => w.line === i + 1);
              if (!wt) return "";
              return `<div class="v2-wt-row">
                <span class="v2-wt-ln">${i + 1}</span>
                <div class="v2-wt-content">
                  <code class="v2-wt-code">${A.esc(line)}</code>
                  <p class="v2-wt-text">${A.esc(wt.text)}</p>
                </div>
              </div>`;
            }).join("")}
          </div>` : ""}
      </section>`;
  }

  // 07. 真实场景（Real World Example）
  function renderRealWorldExample(c) {
    const rw = c.realWorldExample;
    if (!rw) return "";
    const connLinks = (rw.connections || []).map((cid) => {
      const target = conceptsById[cid];
      return target ? `<a class="v2-conn-link" href="concept.html?c=${cid}">${A.esc(target.title)}</a>` : "";
    }).filter(Boolean).join("");
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Real world · 真实场景</span>
          <h2>${A.esc(rw.title || "解决真实问题")}</h2>
        </div>
        ${rw.problem ? `<p class="v2-rw-problem">${A.esc(rw.problem)}</p>` : ""}
        ${rw.code ? `<pre class="v2-rw-code"><code>${A.esc(rw.code)}</code></pre>` : ""}
        ${connLinks ? `
          <div class="v2-rw-connections">
            <span class="v2-rw-conn-label">本例连接了：</span>
            <div class="v2-rw-conn-links">${connLinks}</div>
          </div>` : ""}
      </section>`;
  }

  // 08. 易混概念（Confusions）
  function renderConfusions(c) {
    const confs = c.confusions;
    if (!confs || !confs.length) return "";
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Confusion · 易混概念</span>
          <h2>别搞混这些</h2>
        </div>
        ${confs.map((cf) => `
          <div class="v2-confusion-card">
            <div class="v2-confusion-pair">
              <div class="v2-confusion-left">
                <h4>${A.esc(cf.left)}</h4>
                ${cf.leftExample ? `<pre><code>${A.esc(cf.leftExample)}</code></pre>` : ""}
              </div>
              <div class="v2-confusion-vs">vs</div>
              <div class="v2-confusion-right">
                <h4>${A.esc(cf.right)}</h4>
                ${cf.rightExample ? `<pre><code>${A.esc(cf.rightExample)}</code></pre>` : ""}
              </div>
            </div>
            <p class="v2-confusion-explain">${A.esc(cf.explanation)}</p>
          </div>`).join("")}
      </section>`;
  }

  // 09. Debug Lab（升级版错误诊断）
  function renderDebugLab(c) {
    const errors = c.errors;
    if (!errors || !errors.length) return "";
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Debug lab · 错误诊断</span>
          <h2>调试实验室</h2>
        </div>
        ${errors.map((e, i) => {
          const revealed = state.debugLabRevealed[i] || 0;
          return `
          <div class="v2-debug-card" data-debug-idx="${i}">
            <h4>错误代码</h4>
            <pre class="v2-debug-code"><code>${A.esc(e.code)}</code></pre>
            <div class="v2-debug-step">
              <p class="v2-debug-q">你认为发生了什么？</p>
              <div class="v2-debug-choices" data-step="0" data-idx="${i}">
                <button class="v2-debug-choice" data-choice="0">编译/运行报错</button>
                <button class="v2-debug-choice" data-choice="1">运行正常但结果不对</button>
                <button class="v2-debug-choice" data-choice="2">运行正常无问题</button>
              </div>
            </div>
            <div class="v2-debug-reveal ${revealed >= 1 ? "" : "hidden"}" data-reveal="1">
              <div class="v2-debug-result">
                <span class="v2-debug-badge v2-badge-err">运行结果</span>
                <p>${A.esc(e.message)}</p>
              </div>
            </div>
            <div class="v2-debug-reveal ${revealed >= 2 ? "" : "hidden"}" data-reveal="2">
              <div class="v2-debug-cause">
                <span class="v2-debug-badge v2-badge-cause">原因</span>
                <p>${A.esc(e.cause)}</p>
              </div>
              <div class="v2-debug-fix">
                <span class="v2-debug-badge v2-badge-fix">修复</span>
                <p>${A.esc(e.fix)}</p>
              </div>
            </div>
            ${e.variantCode ? `
              <div class="v2-debug-reveal ${revealed >= 3 ? "" : "hidden"}" data-reveal="3">
                <div class="v2-debug-variant">
                  <span class="v2-debug-badge v2-badge-variant">变体问题</span>
                  <pre><code>${A.esc(e.variantCode)}</code></pre>
                  <p>为什么这个却合法？思考一下绑定可变与值可变的区别。</p>
                </div>
              </div>` : ""}
            ${revealed < 3 ? `
              <button class="v2-debug-next-btn" data-idx="${i}" data-current="${revealed}">
                ${revealed === 0 ? "查看运行结果 →" : revealed === 1 ? "查看原因与修复 →" : "查看变体问题 →"}
              </button>` : ""}
          </div>`;
        }).join("")}
      </section>`;
  }

  // 10. 多语言增强（可折叠）
  function renderMultiLangSection(c) {
    const hasVariants = c.variants && Object.keys(c.variants).length;
    if (!hasVariants && !c.lang_diff) return "";
    const variant = hasVariants ? c.variants[state.language] : null;
    const open = state.langSectionOpen ? "open" : "";

    return `
      <section class="v2-section">
        <details class="v2-lang-details" ${open}>
          <summary class="v2-lang-summary">
            <span class="v2-eyebrow">Multi-language · 多语言增强</span>
            <span class="v2-lang-toggle">${state.langSectionOpen ? "收起" : "▶ 查看其他语言怎么表达"}</span>
          </summary>
          <div class="v2-lang-body">
            ${renderSwitcher(c)}
            ${variant ? `
              <div class="v2-lang-code">
                ${renderCodePanel(`main.${fileExt(state.language)}`, variant)}
              </div>
              <div class="v2-lang-diff">
                ${renderDiff(variant)}
              </div>` : c.lang_diff ? `
              <div class="diff-card" style="padding:16px 18px">
                <p style="margin:0;color:var(--muted);font-size:13px;line-height:1.9">${A.esc(c.lang_diff)}</p>
              </div>` : ""}
            ${renderCommonTask(c)}
            ${renderComparisonMatrix(c)}
            ${renderTransferExercises(c)}
            ${renderAcceptanceTests(c)}
          </div>
        </details>
      </section>`;
  }

  // 11. 四级练习（Exercise Levels A-D）
  function renderExerciseLevels(c) {
    const exercises = c.exercises;
    if (!exercises || !exercises.length) return "";
    const levelLabel = { A: "Level A · 识别", B: "Level B · 预测", C: "Level C · 修改", D: "Level D · 生成" };
    const typeLabel = { concept: "概念判断", read: "代码阅读", pair: "语义配对", diagnose: "错误诊断", fill: "代码补全", output: "输出预测", migrate: "跨语言迁移", design: "设计选择" };
    const levels = ["A", "B", "C", "D"].filter((lv) => exercises.some((e) => e.level === lv));

    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Practice · 梯度练习</span>
          <h2>练一练</h2>
        </div>
        ${levels.map((lv) => {
          const levelExs = exercises.filter((e) => e.level === lv);
          if (!levelExs.length) return "";
          return `
            <div class="v2-ex-level">
              <h3 class="v2-ex-level-title">${levelLabel[lv]}</h3>
              ${levelExs.map((ex) => `
                <div class="exercise-card" data-answer="${ex.answer}" data-feedback="${A.esc(ex.feedback || "")}">
                  <span class="ex-type">${typeLabel[ex.type] || ex.type}</span>
                  ${ex.id ? `<span class="v2-ex-id">${A.esc(ex.id)}</span>` : ""}
                  <h4>${A.esc(ex.question)}</h4>
                  ${ex.starterCode ? `<pre class="v2-ex-starter"><code>${A.esc(ex.starterCode)}</code></pre>` : ""}
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
        }).join("")}
      </section>`;
  }

  // 12. 30 秒挑战（Quick Challenge）
  function renderQuickChallenge(c) {
    const ch = c.challenge;
    if (!ch) return "";
    const hints = ch.hints || [];
    const visibleHints = hints.slice(0, state.challengeHintLevel);
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Challenge · 30 秒挑战</span>
          <h2>${A.esc(ch.title || "30 秒挑战")}</h2>
        </div>
        <div class="v2-challenge-card">
          <p class="v2-challenge-prompt">${A.esc(ch.prompt)}</p>
          ${visibleHints.length ? `
            <div class="v2-challenge-hints">
              ${visibleHints.map((h, i) => `<div class="v2-hint">💡 ${A.esc(h)}</div>`).join("")}
            </div>` : ""}
          <div class="v2-challenge-actions">
            ${state.challengeHintLevel < hints.length ? `<button class="v2-ch-btn v2-ch-hint-btn" id="challengeHint">显示提示 (${state.challengeHintLevel}/${hints.length})</button>` : ""}
            <button class="v2-ch-btn v2-ch-reveal-btn" id="challengeReveal">${state.challengeRevealed ? "隐藏答案" : "查看答案"}</button>
          </div>
          ${state.challengeRevealed ? `
            <div class="v2-challenge-solution">
              <pre><code>${A.esc(ch.solution || "")}</code></pre>
              ${ch.solutionOutput ? `<p class="v2-challenge-output">输出：<code>${A.esc(ch.solutionOutput)}</code></p>` : ""}
            </div>` : ""}
        </div>
      </section>`;
  }

  // 13. 知识连接（Knowledge Connections）
  function renderKnowledgeConnections(c) {
    const conn = c.connections;
    if (!conn) return "";
    const prereqs = (conn.prerequisites || c.prerequisites || []).map((pid) => {
      const t = conceptsById[pid];
      return t ? `<a class="v2-kc-link v2-kc-prev" href="concept.html?c=${pid}">← ${A.esc(t.title)}</a>` : "";
    }).filter(Boolean).join("");
    const related = (conn.related || []).map((rid) => {
      const t = conceptsById[rid];
      return t ? `<a class="v2-kc-link v2-kc-rel" href="concept.html?c=${rid}">→ ${A.esc(t.title)}</a>` : "";
    }).filter(Boolean).join("");
    const nexts = (conn.next || c.next || []).map((nid) => {
      const t = conceptsById[nid];
      return t ? `<a class="v2-kc-link v2-kc-next" href="concept.html?c=${nid}">→ ${A.esc(t.title)}</a>` : "";
    }).filter(Boolean).join("");

    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Connections · 知识连接</span>
          <h2>你现在在哪里</h2>
        </div>
        <div class="v2-kc-container">
          ${conn.current ? `<p class="v2-kc-current">当前所在：<strong>${A.esc(conn.current)}</strong></p>` : ""}
          ${conn.diagram ? `<div class="v2-kc-diagram">${conn.diagram}</div>` : ""}
          <div class="v2-kc-grid">
            ${prereqs ? `<div class="v2-kc-col"><h4>前置知识</h4>${prereqs || "<span class='v2-kc-none'>无（起点知识点）</span>"}</div>` : ""}
            ${related ? `<div class="v2-kc-col"><h4>相关知识</h4>${related}</div>` : ""}
            ${nexts ? `<div class="v2-kc-col"><h4>下一步</h4>${nexts}</div>` : ""}
          </div>
        </div>
      </section>`;
  }

  // 14. 能力确认 + 自评（Learning Summary）
  function renderLearningSummary(c) {
    if (!c.objectives || !c.objectives.length) return "";
    const progress = A.getProgress(c.id);
    const selfAssessment = progress.selfAssessment || 0;
    const labels = ["还不会", "基本理解", "能够独立使用", "完全掌握"];
    return `
      <section class="v2-section">
        <div class="v2-section-head">
          <span class="v2-eyebrow">Summary · 能力确认</span>
          <h2>完成本节后，你应该可以</h2>
        </div>
        <div class="v2-summary-checklist">
          ${c.objectives.map((o) => `<div class="v2-summary-item"><span class="v2-check">✓</span> ${A.esc(o)}</div>`).join("")}
        </div>
        <div class="v2-self-assess">
          <p class="v2-self-assess-label">自评：</p>
          <div class="v2-self-assess-btns" id="selfAssessBtns">
            ${labels.map((label, i) => `
              <button class="v2-assess-btn ${selfAssessment === i ? "active" : ""}" data-assess="${i}">${label}</button>
            `).join("")}
          </div>
        </div>
      </section>`;
  }

  // 15. 下一步（Next Step）
  function renderNextStep(c) {
    const ns = c.nextStep;
    if (!ns) return "";
    return `
      <section class="v2-next-step">
        <div class="v2-next-step-card">
          <span class="v2-eyebrow">Next · 下一步</span>
          <h3>${A.esc(ns.title || "继续学习")}</h3>
          ${ns.description ? `<p>${A.esc(ns.description)}</p>` : ""}
          ${ns.targetId && conceptsById[ns.targetId] ? `<a class="v2-next-btn" href="concept.html?c=${ns.targetId}">前往 ${A.esc(conceptsById[ns.targetId].title)} →</a>` : ""}
        </div>
      </section>`;
  }

  // ================================================================
  // v1 组件（保持不变）
  // ================================================================

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
          const v2Badge = isV2(item) ? '<span class="v2-tree-badge">★</span>' : "";
          return `<a class="${active} ${cls}" href="concept.html?c=${id}">${A.esc(item.title)} ${v2Badge}</a>`;
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
    const roles = { "declare": "s1", "rebind": "s2", "condition": "s3", "branch": "s2", "match": "s1", "destructure": "s4", "mutate": "s3", "call": "s2", "return-err": "s1", "ok": "s3", "propagate": "s4", "check": "s1", "iterate": "s2", "index": "s3", "comprehend": "s4", "map": "s1", "stream": "s2", "transform": "s3", "value-only": "s4", "map-range": "s3", "iterator-chain": "s2", "raise": "s1", "try": "s2", "catch": "s3", "throw": "s1", "return-error": "s1", "pool": "s2", "spawn": "s1", "await-all": "s3", "join-all": "s4", "wait-all": "s3", "define": "s2", "declare-param": "s1", "print": "s3" };
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

    const legend = (variant.semantic_blocks || []).map((b) => {
      const colors = { s1: "#ff5b35", s2: "#3b82f6", s3: "#16805c", s4: "#d97706" };
      return `<span><i style="background:${colors[roles[b.role]] || "#ff5b35"}"></i>${A.esc(b.role)}</span>`;
    }).join("");

    return `
      <div class="code-panel">
        <div class="code-panel-head">
          <span class="file">${A.esc(title)}</span>
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
            <ul>${(items || []).map((i) => `<li>${A.esc(i)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>`;
  }

  // ===== 同题任务 =====
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

  // ===== 差异矩阵 =====
  function renderComparisonMatrix(c) {
    if (!c.comparisonDimensions || !c.comparisonDimensions.length) return "";
    const dims = c.comparisonDimensions;
    const langs = D2.languages;
    const dimLabel = {
      "unicode-representation": "Unicode 表示", "type-checking": "静态/动态检查",
      "failure-mode": "失败模式", "idiomatic-style": "惯用写法",
      "runtime-cost": "运行时代价", "mutability": "可变性",
      "memory-model": "内存模型", "error-propagation": "错误传播", "ownership": "所有权"
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

  // ===== 跨语言迁移练习 =====
  function renderTransferExercises(c) {
    if (!c.transferExercises || !c.transferExercises.length) return "";
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Transfer</span><h2>跨语言迁移练习</h2></div></div>
        ${c.transferExercises.map((ex) => `
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

  // ===== 综合验收 =====
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

  // ===== v1 错误案例 =====
  function renderErrorsV1(c) {
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

  // ===== v1 练习 =====
  function renderExercisesV1(c) {
    if (!c.exercises || !c.exercises.length) return "";
    const typeLabel = { concept: "概念判断", read: "代码阅读", pair: "语义配对", diagnose: "错误诊断", fill: "代码补全" };
    return `
      <div class="section-block">
        <div class="section-heading"><div><span class="eyebrow">Practice</span><h2>练习与即时反馈</h2></div></div>
        ${c.exercises.map((ex) => `
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

  // ================================================================
  // 主渲染
  // ================================================================
  function render() {
    const c = currentConcept();
    const root = document.querySelector("#conceptRoot");
    if (!c) {
      root.innerHTML = `<div style="padding:60px 0;text-align:center;color:var(--muted)"><h2>知识点不存在或建设中</h2><p>该知识点尚未发布，返回<a href="modules.html">模块目录</a>。</p></div>`;
      return;
    }
    A.markProgress(c.id, "viewed");
    const m = currentModule();

    // 重置 v2 交互状态（切换概念时）
    if (state._lastConceptId !== state.conceptId) {
      state.execStep = 0;
      state.hookAnswered = false;
      state.challengeHintLevel = 0;
      state.challengeRevealed = false;
      state.debugLabRevealed = {};
      state.langSectionOpen = false;
      state._lastConceptId = state.conceptId;
    }

    let mainHtml;
    if (isV2(c)) {
      mainHtml = renderV2(c, m);
    } else {
      mainHtml = renderV1(c, m);
    }

    // 右侧辅助栏（v1/v2 共用）
    const rightHtml = renderSidebar(c);

    root.innerHTML = renderTree() + `<div style="min-width:0">${mainHtml}</div>` + rightHtml;

    // 绑定事件
    bindEvents(c);
    document.querySelector("#footerRight").textContent = `${m.id} · ${A.esc(c.title)} · ${langName(state.language)}`;
  }

  // ===== v2 完整渲染 =====
  function renderV2(c, m) {
    let html = renderLearningOverview(c, m);
    html += renderHook(c);
    html += renderMentalModel(c);
    html += renderCoreExplanation(c);
    html += renderExecutionStepper(c);
    html += renderMinimalExampleWithWalkthrough(c);
    html += renderRealWorldExample(c);
    html += renderConfusions(c);
    html += renderDebugLab(c);
    html += renderMultiLangSection(c);
    html += renderExerciseLevels(c);
    html += renderQuickChallenge(c);
    html += renderKnowledgeConnections(c);
    html += renderLearningSummary(c);
    html += renderNextStep(c);
    return html;
  }

  // ===== v1 原有渲染（保持不变） =====
  function renderV1(c, m) {
    const hasVariants = c.variants && Object.keys(c.variants).length;
    const variant = hasVariants ? c.variants[state.language] : null;

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
          <ul>${(c.objectives || []).map((o) => `<li>${A.esc(o)}</li>`).join("")}</ul>
        </div>
        <p class="concept-core">${A.esc(c.core || "")}</p>
        ${renderSwitcher(c)}
      </div>`;

    if (hasVariants && variant) {
      mainHtml += `
        <div class="concept-main" style="margin-top:6px">
          <div class="section-heading"><div><span class="eyebrow">Minimal example · ${langName(state.language)}</span><h2>最小示例</h2></div></div>
          ${renderCodePanel(`main.${fileExt(state.language)}`, variant)}
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

    mainHtml += renderCommonTask(c) + renderComparisonMatrix(c) + renderErrorsV1(c) + renderTransferExercises(c) + renderAcceptanceTests(c) + renderExercisesV1(c);

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

    const moduleConcepts = m.concepts;
    const idx = moduleConcepts.indexOf(c.id);
    const prev = idx > 0 ? conceptsById[moduleConcepts[idx - 1]] : null;
    const next = idx < moduleConcepts.length - 1 ? conceptsById[moduleConcepts[idx + 1]] : null;
    mainHtml += `
      <div class="concept-nav">
        ${prev ? `<a class="prev" href="concept.html?c=${prev.id}"><span class="nav-label">← 上一知识点</span><strong>${A.esc(prev.title)}</strong></a>` : `<a style="visibility:hidden"></a>`}
        ${next ? `<a class="next" href="concept.html?c=${next.id}"><span class="nav-label">下一知识点 →</span><strong>${A.esc(next.title)}</strong></a>` : ""}
      </div>`;
    return mainHtml;
  }

  // ===== 右侧辅助栏 =====
  function renderSidebar(c) {
    const mastery = A.getProgress(c.id);
    const isV2Concept = isV2(c);
    return `
      <aside style="position:sticky;top:84px">
        <div class="diff-card" style="margin-bottom:12px">
          <h4>🎯 本节目标</h4>
          <ul>${(c.objectives || []).map((o) => `<li>${A.esc(o)}</li>`).join("")}</ul>
        </div>
        ${isV2Concept ? `
          <div class="diff-card" style="margin-bottom:12px">
            <h4>📊 学习进度</h4>
            <div id="masteryV2Box" style="display:grid;gap:8px">
              ${renderMasteryV2(c.id, mastery)}
            </div>
          </div>` : `
          <div class="diff-card" style="margin-bottom:12px">
            <h4>📌 掌握状态</h4>
            <div id="masteryBox" style="display:grid;gap:8px">
              <button class="ghost-button ${mastery.browsed || mastery.viewed ? "primary-button" : ""}" id="btnBrowsed" style="text-align:center">已浏览 ${mastery.browsed || mastery.viewed ? "✓" : ""}</button>
              <button class="ghost-button ${mastery.understood ? "primary-button" : ""}" id="btnUnderstood" style="text-align:center">已理解 ${mastery.understood ? "✓" : ""}</button>
              <button class="ghost-button ${mastery.passed ? "primary-button" : ""}" id="btnPassed" style="text-align:center">练习通过 ${mastery.passed ? "✓" : ""}</button>
            </div>
          </div>`}
        <div class="diff-card">
          <h4>🔗 相关进阶专题</h4>
          ${c.related_advanced && c.related_advanced.length ? renderRelated(c) : `<p style="color:var(--muted);font-size:12px;margin:0">暂无</p>`}
        </div>
      </aside>`;
  }

  function renderMasteryV2(id, m) {
    const score = m.score || 0;
    const level = score >= 80 ? "掌握" : score >= 60 ? "能够使用" : score >= 40 ? "基本理解" : score >= 20 ? "已接触" : "未学习";
    const color = score >= 80 ? "var(--success)" : score >= 60 ? "var(--info)" : score >= 40 ? "var(--warn)" : "var(--muted)";
    return `
      <div class="v2-mastery-bar">
        <div class="v2-mastery-fill" style="width:${score}%;background:${color}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px">
        <span style="color:${color}">${level}</span>
        <span style="color:var(--muted)">${score}/100</span>
      </div>`;
  }

  // ================================================================
  // 事件绑定
  // ================================================================
  function bindEvents(c) {
    // 语言切换
    const switcher = document.querySelector("#langSwitcher");
    if (switcher) {
      switcher.querySelectorAll("[data-lang]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.language = btn.dataset.lang;
          render();
        });
      });
    }

    // 多语言区域折叠
    const langDetails = document.querySelector(".v2-lang-details");
    if (langDetails) {
      langDetails.addEventListener("toggle", () => {
        state.langSectionOpen = langDetails.open;
        const toggle = langDetails.querySelector(".v2-lang-toggle");
        if (toggle) toggle.textContent = langDetails.open ? "收起" : "▶ 查看其他语言怎么表达";
      });
    }

    // Hook 选项
    document.querySelectorAll(".v2-hook-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const chosen = Number(opt.dataset.opt);
        const answer = c.hook.answer;
        const ok = chosen === answer;
        document.querySelectorAll(".v2-hook-option").forEach((o) => {
          const oi = Number(o.dataset.opt);
          o.classList.remove("correct", "wrong");
          if (oi === answer) o.classList.add("correct");
          if (oi === chosen && !ok) o.classList.add("wrong");
        });
        const exp = document.querySelector("#hookExplanation");
        const expText = document.querySelector("#hookExplanationText");
        exp.classList.remove("hidden");
        expText.textContent = (ok ? "✅ 没错！" : "❌ 再想想。") + (c.hook.explanation || "");
        state.hookAnswered = true;
        A.markProgress(c.id, "hookCompleted");
      });
    });

    // 执行步骤导航
    const execPrev = document.querySelector("#execPrev");
    const execNext = document.querySelector("#execNext");
    if (execPrev) execPrev.addEventListener("click", () => { if (state.execStep > 0) { state.execStep--; render(); } });
    if (execNext) execNext.addEventListener("click", () => {
      const steps = c.executionSteps || [];
      if (state.execStep < steps.length - 1) { state.execStep++; render(); }
    });

    // Debug Lab 步进
    document.querySelectorAll(".v2-debug-next-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        const current = Number(btn.dataset.current);
        state.debugLabRevealed[idx] = current + 1;
        render();
      });
    });

    // Debug Lab 选择（仅视觉效果，不阻塞）
    document.querySelectorAll(".v2-debug-choice").forEach((choice) => {
      choice.addEventListener("click", () => {
        choice.parentElement.querySelectorAll(".v2-debug-choice").forEach((c) => c.classList.remove("selected"));
        choice.classList.add("selected");
      });
    });

    // 练习即时反馈（v1 + v2 共用）
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
          feedback.textContent = (ok ? "✅ 回答正确！" : "❌ 回答错误。") + (card.dataset.feedback || "");
          if (ok) {
            A.markProgress(c.id, "passed");
            A.updateMasteryScore(c.id);
          }
        });
      });
    });

    // 30 秒挑战
    const hintBtn = document.querySelector("#challengeHint");
    if (hintBtn) hintBtn.addEventListener("click", () => {
      state.challengeHintLevel++;
      render();
    });
    const revealBtn = document.querySelector("#challengeReveal");
    if (revealBtn) revealBtn.addEventListener("click", () => {
      state.challengeRevealed = !state.challengeRevealed;
      if (state.challengeRevealed) A.markProgress(c.id, "challengeCompleted");
      render();
    });

    // 自评
    document.querySelectorAll(".v2-assess-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = Number(btn.dataset.assess);
        A.setSelfAssessment(c.id, val);
        render();
        A.showToast("自评已记录");
      });
    });

    // v1 掌握状态按钮
    const bindBtn = (sel, field) => {
      const el = document.querySelector(sel);
      if (el) el.addEventListener("click", () => { A.markProgress(c.id, field); render(); A.showToast("状态已更新"); });
    };
    bindBtn("#btnUnderstood", "understood");
  }

  // 路由
  window.addEventListener("popstate", () => {
    state.conceptId = A.qs("c") || "value.binding";
    render();
  });

  render();
})();
