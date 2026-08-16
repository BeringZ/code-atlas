// Code Atlas 2.0 — Concept Schema v2 数据（微型课程增强）
// 向后兼容：仅有 hook 字段的 concept 才触发 v2 学习流布局
// 加载顺序：concept-data.js → concepts-supplement.js → concept-v2-data.js
window.CODE_ATLAS_V2 = {
  concepts: [
    // ================================================================
    // 黄金样板 1：变量绑定与可变性（状态模型）
    // ================================================================
    {
      id: "value.binding",
      estimatedTime: 8,
      difficulty: "beginner",

      hook: {
        question: "第二行到底修改了什么？",
        code: "score = 10\nscore = 20",
        options: [
          "修改了数字 10，把它变成了 20",
          "让 score 这个名字指向了新的值 20",
          "创建了另一个名为 score 的变量"
        ],
        answer: 1,
        explanation: "score 只是一个名字（标签），不是装值的盒子。第二行没有修改 10——10 仍然存在于内存中。score 这个名字被重新绑定到了 20。这就是「变量绑定」的核心：变量是名字→值的映射，赋值是改变这个映射，而不是改变值本身。"
      },

      mentalModel: {
        title: "变量是名字，不是盒子",
        description: "初学者常把变量想象成「装值的盒子」。更准确的模型是：变量是一个标签（名字），它指向内存中的某个值。赋值不是修改盒子里的东西，而是把标签贴到新的值上。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:24px;font-family:ui-monospace,Menlo,monospace">
  <div>
    <div style="text-align:center;font-size:13px;color:var(--muted);margin-bottom:8px">第一行：score = 10</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:32px">
      <div style="text-align:center">
        <div style="font-size:18px;font-weight:700;color:var(--accent);padding:8px 16px;border:2px solid var(--accent);border-radius:10px">score</div>
        <div style="font-size:24px;margin:6px 0">│</div>
      </div>
      <div style="font-size:32px;font-weight:800">10</div>
    </div>
  </div>
  <div style="width:2px;height:24px;background:var(--line)"></div>
  <div>
    <div style="text-align:center;font-size:13px;color:var(--muted);margin-bottom:8px">第二行：score = 20</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:32px">
      <div style="text-align:center">
        <div style="font-size:18px;font-weight:700;color:var(--accent);padding:8px 16px;border:2px solid var(--accent);border-radius:10px">score</div>
        <div style="font-size:24px;margin:6px 0">│</div>
      </div>
      <div style="font-size:32px;font-weight:800;color:var(--success)">20</div>
    </div>
    <div style="text-align:center;font-size:12px;color:var(--muted);margin-top:8px">10 没有被修改，score 只是指向了 20</div>
  </div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建变量 count，将名字 count 绑定到整数值 0",
          state: { count: 0 }
        },
        {
          line: 2,
          explanation: "读取 count 的当前值 0，计算 0 + 1 = 1，将 count 重新绑定到 1（不是修改 0）",
          state: { count: 1 }
        },
        {
          line: 3,
          explanation: "读取 count 的当前值 1，输出到屏幕",
          state: { count: 1 }
        }
      ],

      walkthrough: [
        { line: 1, text: "声明变量 count，初始绑定到整数值 0。此时内存中存在值 0，count 这个名字指向它。" },
        { line: 2, text: "先读取 count 的值（0），计算 0 + 1 = 1，然后将 count 重新绑定到 1。原来的 0 没有被修改。" },
        { line: 3, text: "读取 count 的当前值 1，输出到屏幕。" }
      ],

      realWorldExample: {
        title: "记录登录失败次数",
        problem: "你需要统计用户连续登录失败的次数。每次失败时增加计数，成功时重置为 0。这是变量重新绑定最常见的实际用途——用新值更新计数器。",
        code: "failed = 0\n\ndef on_login_fail():\n    global failed\n    failed = failed + 1\n    print(f'失败 {failed} 次')\n\ndef on_login_success():\n    global failed\n    failed = 0\n\non_login_fail()   # 失败 1 次\non_login_fail()   # 失败 2 次\non_login_success() # 重置\non_login_fail()   # 失败 1 次\nprint(f'当前失败次数: {failed}')",
        language: "python",
        connections: ["control.conditionals", "function.parameter-passing"]
      },

      confusions: [
        {
          left: "重新绑定",
          right: "修改对象",
          explanation: "重新绑定是让变量名指向一个全新的对象；修改对象是改变对象内部的内容。两者完全独立——可以重新绑定但不修改对象，也可以修改对象但不重新绑定。",
          leftExample: "x = [3, 4]\nx = [5, 6]  # x 指向新列表\n# 原来的 [3, 4] 没有被改变",
          rightExample: "x = [3, 4]\nx.append(5)  # 原列表内部增加元素\n# x 仍然指向同一个列表"
        },
        {
          left: "let（JS）",
          right: "const（JS）",
          explanation: "let 允许重新绑定（变量名指向新值）；const 禁止重新绑定。但两者都不限制值内部的修改——const 对象的属性仍然可以改。",
          leftExample: "let x = 1;\nx = 2;  // OK，重新绑定",
          rightExample: "const x = 1;\nx = 2;  // TypeError\nconst list = [];\nlist.push(1);  // OK，修改对象内部"
        }
      ],

      errors: [
        {
          code: "// Rust\nlet x = 1;\nx = 2;",
          message: "error[E0384]: cannot assign twice to immutable variable `x`",
          cause: "Rust 默认绑定不可变（let 而非 let mut），编译器拒绝第二次赋值。这是 Rust 的安全设计：如果你不打算修改，就不该能修改。",
          fix: "改为 let mut x = 1; 声明可变绑定，或使用遮蔽 let x = 2; 创建新的绑定。",
          variantCode: "// Rust\nlet mut x = 1;\nx = 2;  // OK：mut 绑定允许重新赋值\n\n// 遮蔽：创建新绑定，覆盖旧名字\nlet y = 1;\nlet y = 2;  // OK：这不是赋值，是新绑定"
        }
      ],

      exercises: [
        {
          id: "value.binding.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个操作属于「变量重新绑定」？",
          options: [
            "x.append(3)",
            "x = [1, 2]",
            "x[0] = 5",
            "del x[0]"
          ],
          answer: 1,
          feedback: "x = [1, 2] 让 x 指向一个全新的列表，是重新绑定。其余三个都是修改 x 指向的对象内部。"
        },
        {
          id: "value.binding.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nx = 2\nx += 3\nprint(x)",
          options: ["2", "3", "5", "6"],
          answer: 2,
          feedback: "x = 2 绑定到 2，x += 3 等价于 x = x + 3 = 5，重新绑定到 5。"
        },
        {
          id: "value.binding.ex03",
          level: "B",
          type: "read",
          question: "Java 中 `final List<String> list = new ArrayList<>();` 后执行 `list.add(\"x\")` 会怎样？",
          options: [
            "list 变为 null",
            "抛出运行时异常",
            "正常执行（final 只约束绑定，不约束对象内部）",
            "编译错误"
          ],
          answer: 2,
          feedback: "final 只禁止 list 重新指向另一个 ArrayList，但不限制 list 指向的对象内部修改。"
        },
        {
          id: "value.binding.ex04",
          level: "C",
          type: "fill",
          question: "修改以下 Rust 代码，使 count 可以被重新赋值：",
          options: [
            "let count = 0;",
            "let mut count = 0;",
            "const count = 0;",
            "var count = 0;"
          ],
          answer: 1,
          feedback: "Rust 需要 let mut 才允许重新赋值。let 是不可变绑定，const 是编译期常量。",
          starterCode: "let count = 0;\ncount = count + 1;"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "创建变量 temperature：1. 初始值 25；2. 增加 3；3. 输出结果",
        hints: [
          "用赋值语句创建变量：变量名 = 值",
          "增加可以用 += 或 temperature = temperature + 3",
          "输出用 print(temperature)"
        ],
        solution: "temperature = 25\ntemperature = temperature + 3\nprint(temperature)",
        solutionOutput: "28"
      },

      connections: {
        current: "值、变量与类型",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">类型系统</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">值 ── 变量 ── 可变性</div>
  <div>│</div>
  <div style="color:var(--muted)">作用域</div>
</div>`,
        prerequisites: ["runtime.minimal-program"],
        related: ["value.semantics", "value.mutability", "value.scope-lifetime"],
        next: ["value.constants", "value.semantics"]
      },

      nextStep: {
        title: "值语义与引用语义",
        description: "理解变量绑定后，下一步要搞清楚：当你把变量传给函数时，传递的是值本身，还是对值的引用？这决定了函数内部修改参数是否会影响到外部。",
        targetId: "value.semantics"
      }
    },

    // ================================================================
    // 黄金样板 2：条件分支（控制流模型）—— 预留，下一批填充
    // ================================================================
    // { id: "control.conditionals", ... }

    // ================================================================
    // 黄金样板 3：函数定义（调用模型）—— 预留，下一批填充
    // ================================================================
    // { id: "function.lambda", ... }
  ]
};

// ===== 合并 v2 字段到已有概念（按 ID 匹配，仅添加新字段，不覆盖已有字段） =====
(function mergeV2() {
  if (!window.CODE_ATLAS_2 || !window.CODE_ATLAS_V2) return;
  const main = window.CODE_ATLAS_2;
  const v2 = window.CODE_ATLAS_V2.concepts || [];
  const byId = {};
  (main.concepts || []).forEach((c) => { byId[c.id] = c; });

  v2.forEach((v2c) => {
    const target = byId[v2c.id];
    if (!target) {
      console.warn(`[v2] 概念 ${v2c.id} 未在主数据中找到，跳过`);
      return;
    }
    // 合并 v2 新字段（不覆盖已有字段）
    const v2Fields = [
      "estimatedTime", "difficulty",
      "hook", "mentalModel", "executionSteps", "walkthrough",
      "realWorldExample", "confusions", "challenge", "connections", "nextStep"
    ];
    v2Fields.forEach((f) => {
      if (v2c[f] !== undefined && target[f] === undefined) {
        target[f] = v2c[f];
      }
    });
    // errors 和 exercises 特殊处理：如果有 v2 版本，整体替换（因为 v2 添加了 level/id/variantCode 等字段）
    if (v2c.errors) target.errors = v2c.errors;
    if (v2c.exercises) target.exercises = v2c.exercises;
  });
})();
