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
            "编译错误",
            "正常执行（final 只约束绑定，不约束对象内部）"
          ],
          answer: 3,
          feedback: "final 只禁止 list 重新指向另一个 ArrayList，但不限制 list 指向的对象内部修改。"
        },
        {
          id: "value.binding.ex04",
          level: "C",
          type: "fill",
          question: "修改以下 Rust 代码，使 count 可以被重新赋值：",
          options: [
            "let mut count = 0;",
            "let count = 0;",
            "const count = 0;",
            "var count = 0;"
          ],
          answer: 0,
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
    // 黄金样板 2：条件分支（控制流模型）
    // ================================================================
    {
      id: "control.conditionals",
      estimatedTime: 10,
      difficulty: "beginner",

      hook: {
        question: "以下代码会输出什么？",
        code: "x = 0\nif x:\n    print(\"yes\")\nelse:\n    print(\"no\")",
        options: [
          "yes（因为 x 存在）",
          "no（因为 0 是假值）",
          "报错（x 不是布尔类型）",
          "什么都不输出"
        ],
        answer: 1,
        explanation: "在很多语言中，0 被视为「假」（falsy）。if 判断的不是「x 是否存在」，而是「x 的值是否为真」。0 是一个合法的值，但在布尔上下文中它代表假。理解「什么值算真、什么值算假」是掌握条件分支的关键第一步。"
      },

      mentalModel: {
        title: "条件是分叉路口",
        description: "程序默认从上到下逐行执行。条件语句创建了一个分叉：根据某个判断结果，选择走不同的路径。就像到了路口看路标——条件是路标，满足就走这条路，不满足就走另一条。关键是要搞清楚：判断的是什么？哪些值算真？哪些值算假？",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="padding:6px 16px;border:2px solid var(--accent);border-radius:10px;color:var(--accent);font-weight:700">if 条件</div>
  <div style="font-size:20px">?</div>
  <div style="display:flex;gap:48px;align-items:flex-start">
    <div style="text-align:center">
      <div style="color:var(--success);font-weight:700;font-size:13px">条件为真</div>
      <div style="font-size:20px;margin:4px 0">↓</div>
      <div style="padding:6px 12px;border:1px solid var(--success);border-radius:8px;background:rgba(34,197,94,.08)">执行 if 块</div>
    </div>
    <div style="text-align:center">
      <div style="color:var(--danger);font-weight:700;font-size:13px">条件为假</div>
      <div style="font-size:20px;margin:4px 0">↓</div>
      <div style="padding:6px 12px;border:1px solid var(--danger);border-radius:8px;background:rgba(239,68,68,.08)">执行 else 块</div>
    </div>
  </div>
  <div style="width:2px;height:16px;background:var(--line)"></div>
  <div style="padding:6px 16px;border:1px solid var(--line);border-radius:8px;color:var(--muted)">继续执行后续代码</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建变量 score，绑定到值 85",
          state: { score: 85 }
        },
        {
          line: 2,
          explanation: "检查 score >= 90 → 85 >= 90 → false，跳过 if 块",
          state: { score: 85, branch: "if (跳过)" }
        },
        {
          line: 4,
          explanation: "检查 score >= 60 → 85 >= 60 → true，进入 elif 块",
          state: { score: 85, branch: "elif (执行)" }
        },
        {
          line: 5,
          explanation: "输出 '及格'，跳过 else 块",
          state: { score: 85, branch: "elif (执行)", output: "及格" }
        }
      ],

      walkthrough: [
        { line: 1, text: "score = 85，将名字 score 绑定到 85。" },
        { line: 2, text: "if score >= 90：计算 85 >= 90 得 false。条件不满足，跳过 if 块的代码。" },
        { line: 4, text: "elif score >= 60：计算 85 >= 60 得 true。条件满足，进入这个分支。" },
        { line: 5, text: "print('及格') 执行，输出「及格」。之后的 else 块被整体跳过。" }
      ],

      realWorldExample: {
        title: "成绩等级判定",
        problem: "根据学生的分数输出等级：90+ 为优秀，60-89 为及格，60 以下为不及格。这是条件分支最典型的实际应用——根据不同的值范围执行不同的逻辑。",
        code: "score = 85\n\nif score >= 90:\n    grade = '优秀'\nelif score >= 60:\n    grade = '及格'\nelse:\n    grade = '不及格'\n\nprint(f'分数: {score}, 等级: {grade}')",
        language: "python",
        connections: ["value.binding", "collection.iteration"]
      },

      confusions: [
        {
          left: "if-elif-else",
          right: "switch/match",
          explanation: "if-elif-else 逐个检查条件，每个条件可以是任意表达式；switch/match 对单个值做精确匹配，通常更清晰但灵活性较低。很多语言正在用模式匹配（match）替代 switch。",
          leftExample: "if x > 0: ...\nelif x < 0: ...\nelse: ...",
          rightExample: "match x {\n    0 => \"zero\",\n    1 => \"one\",\n    _ => \"other\",\n}"
        },
        {
          left: "赋值 =",
          right: "比较 ==",
          explanation: "这是最常见的 bug 来源之一。= 是赋值（把右边的值给左边），== 是比较（判断两边是否相等）。很多语言中 if (x = 5) 不会报错而是把 5 赋给 x 然后判断 5 为真——永远进入 if 分支。",
          leftExample: "x = 5   # 赋值\n# x 变成 5",
          rightExample: "x == 5  # 比较\n# 返回 true 或 false"
        },
        {
          left: "&&（短路且）",
          right: "&（按位且）",
          explanation: "&& 是逻辑运算，且具有短路特性：如果左边为假，右边不会执行。& 是位运算，两边都会计算。在条件判断中应始终使用 && 或 and。",
          leftExample: "if p != null && p.x > 0:\n    # p 为 null 时不会访问 p.x\n    # 安全",
          rightExample: "if p != null & p.x > 0:\n    # 两边都会计算\n    # p 为 null 时会崩溃"
        }
      ],

      errors: [
        {
          code: "// JavaScript\nlet score = 85;\nif (score = 90) {\n    console.log(\"优秀\");\n}",
          message: "输出「优秀」——但 score 是 85",
          cause: "if (score = 90) 中单个 = 是赋值，不是比较。它把 90 赋给 score，然后判断 90 是否为真（是），所以永远进入 if 分支。这是 C 系语言中最经典的 bug 之一。",
          fix: "使用 == 比较或 === 严格比较。部分语言（如 Swift、Kotlin）在条件中只允许布尔表达式，从语言层面杜绝此问题。",
          variantCode: "// 正确写法\nif (score === 90) {\n    console.log(\"优秀\");\n}\n\n// 防御写法：常量在左边\nif (90 === score) { ... }\n// 如果写成 90 = score 会编译错误"
        },
        {
          code: "// C / Java\nswitch (day) {\n    case 1: printf(\"周一\");\n    case 2: printf(\"周二\");\n    default: printf(\"其他\");\n}",
          message: "day = 1 时输出「周一周二其他」",
          cause: "忘记 break。switch 的 case 默认会「穿透」（fall-through）到下一个 case，不会在匹配后自动停止。",
          fix: "在每个 case 末尾加 break。或者使用不支持穿透的语言（如 Go、Kotlin 的 when）。",
          variantCode: "switch (day) {\n    case 1: printf(\"周一\"); break;\n    case 2: printf(\"周二\"); break;\n    default: printf(\"其他\"); break;\n}"
        }
      ],

      exercises: [
        {
          id: "control.conditionals.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个值在 Python 的 if 条件中被视为「假」？",
          options: ["\"false\"", "0", "[0]", "0.0 + 1"],
          answer: 1,
          feedback: "Python 中 0、空字符串、空列表、None 等为假。「\"false\"」是非空字符串（真），[0] 是非空列表（真），0.0+1=1.0（真）。"
        },
        {
          id: "control.conditionals.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nx = 0\nif x:\n    print(\"A\")\nelse:\n    print(\"B\")",
          options: ["A", "AB", "什么都不输出", "B"],
          answer: 3,
          feedback: "x = 0，在布尔上下文中 0 为假，所以进入 else 分支，输出 B。"
        },
        {
          id: "control.conditionals.ex03",
          level: "B",
          type: "read",
          question: "以下 JavaScript 代码的输出是什么？\n\nlet x = 5;\nif (x = 10) {\n    console.log(\"yes\");\n} else {\n    console.log(\"no\");\n}",
          options: ["no", "报错", "yes", "什么都不输出"],
          answer: 2,
          feedback: "x = 10 是赋值，不是比较。它把 10 赋给 x，然后 10 为真，输出 yes。应使用 === 比较。"
        },
        {
          id: "control.conditionals.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，使 90+ 为「优秀」，60-89 为「及格」，否则「不及格」：",
          options: [
            "if score >= 90:\n    grade = '优秀'\nelif score >= 60:\n    grade = '及格'\nelse:\n    grade = '不及格'",
            "if score >= 90:\n    grade = '优秀'\nif score >= 60:\n    grade = '及格'\nelse:\n    grade = '不及格'",
            "if score > 90:\n    grade = '优秀'\nelif score > 60:\n    grade = '及格'\nelse:\n    grade = '不及格'",
            "if score >= 60:\n    grade = '及格'\nelif score >= 90:\n    grade = '优秀'\nelse:\n    grade = '不及格'"
          ],
          answer: 0,
          feedback: "elif 会在前一个条件不满足时才检查，所以先检查 >= 90 再检查 >= 60 是正确的。如果用两个独立 if，score=95 会先变成「优秀」再变成「及格」。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个判断闰年的条件：1. 能被 400 整除的是闰年；2. 能被 4 整除但不能被 100 整除的也是闰年",
        hints: [
          "用取模运算 % 判断整除：year % 4 == 0",
          "组合条件用 and / or 连接",
          "先判断 400，再判断 (4 且非 100)"
        ],
        solution: "year = 2024\nif year % 400 == 0 or (year % 4 == 0 and year % 100 != 0):\n    print(\"闰年\")\nelse:\n    print(\"平年\")",
        solutionOutput: "闰年"
      },

      connections: {
        current: "控制流",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">顺序执行</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">条件分支 ── 循环</div>
  <div>│</div>
  <div style="color:var(--muted)">函数调用</div>
</div>`,
        prerequisites: ["value.binding", "runtime.minimal-program"],
        related: ["control.loops", "expr.comparison", "expr.logic-shortcircuit"],
        next: ["control.loops", "function.lambda"]
      },

      nextStep: {
        title: "循环与迭代",
        description: "条件分支让你选择走哪条路，循环让你重复走同一段路。下一步学习 for 和 while 循环——它们和条件判断共享「布尔判断」的核心机制。",
        targetId: "control.loops"
      }
    },

    // ================================================================
    // 黄金样板 3：函数（调用模型）
    // ================================================================
    {
      id: "function.lambda",
      estimatedTime: 12,
      difficulty: "beginner",

      hook: {
        question: "以下代码输出什么？",
        code: "def add(a, b):\n    return a + b\n\nresult = add(3, 5)\nprint(result)",
        options: [
          "3 + 5（文本拼接）",
          "8（数字相加）",
          "result（变量名）",
          "报错（函数没有执行）"
        ],
        answer: 1,
        explanation: "函数是一个「处理机器」：你把值（参数）放进去，它处理后的结果通过 return 传回来。add(3, 5) 把 3 和 5 传入函数，函数计算 3 + 5 = 8，通过 return 把 8 传回来，result 绑定到 8。理解函数的关键是搞清楚「参数传入」和「返回值传出」这两个方向。"
      },

      mentalModel: {
        title: "函数是处理机器",
        description: "函数是一段有名字、可复用的代码块。你可以把它想象成一台机器：从入口投入原料（参数），机器内部处理，从出口产出成品（返回值）。调用函数就是启动机器。关键概念：定义函数（制造机器）和使用函数（启动机器）是两件事。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="display:flex;align-items:center;gap:16px">
    <div style="text-align:center">
      <div style="font-size:12px;color:var(--muted)">参数（输入）</div>
      <div style="font-size:20px">→</div>
      <div style="font-size:16px;font-weight:600">3, 5</div>
    </div>
    <div style="padding:12px 24px;border:2px solid var(--accent);border-radius:14px;text-align:center;background:rgba(99,102,241,.06)">
      <div style="font-weight:700;color:var(--accent);font-size:15px">add(a, b)</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">a + b</div>
    </div>
    <div style="text-align:center">
      <div style="font-size:20px">→</div>
      <div style="font-size:16px;font-weight:600;color:var(--success)">8</div>
      <div style="font-size:12px;color:var(--muted)">返回值（输出）</div>
    </div>
  </div>
  <div style="width:2px;height:16px;background:var(--line)"></div>
  <div style="font-size:12px;color:var(--muted)">result = 8（返回值绑定到变量）</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "定义函数 add：创建一个名为 add 的函数对象，参数为 a 和 b，函数体为 return a + b。此时函数已定义但未执行。",
          state: { functions: { add: "defined(a, b) → a + b" } }
        },
        {
          line: 4,
          explanation: "调用 add(3, 5)：创建新的栈帧，参数 a 绑定到 3，b 绑定到 5，跳转到函数体执行",
          state: { functions: { add: "defined(a, b) → a + b" }, callStack: [{ func: "add", a: 3, b: 5 }] }
        },
        {
          line: 2,
          explanation: "执行 return a + b：计算 3 + 5 = 8，将 8 作为返回值传出，栈帧销毁",
          state: { functions: { add: "defined(a, b) → a + b" }, returnValue: 8 }
        },
        {
          line: 4,
          explanation: "返回值 8 绑定到 result，继续执行下一行",
          state: { functions: { add: "defined(a, b) → a + b" }, result: 8 }
        },
        {
          line: 5,
          explanation: "执行 print(result)：输出 8",
          state: { functions: { add: "defined(a, b) → a + b" }, result: 8, output: "8" }
        }
      ],

      walkthrough: [
        { line: 1, text: "def add(a, b)：定义函数 add，声明它接收两个参数 a 和 b。此时函数体不会执行——只是「注册」了这个函数。" },
        { line: 2, text: "return a + b：这是函数体。当函数被调用时，会计算 a + b 并把结果传回调用者。return 之后的代码不会执行。" },
        { line: 4, text: "result = add(3, 5)：调用函数。创建栈帧，a=3, b=5，执行函数体，返回值 8 赋给 result。" },
        { line: 5, text: "print(result)：输出 result 的值 8。" }
      ],

      realWorldExample: {
        title: "计算含税价格",
        problem: "电商系统需要根据商品原价和税率计算最终价格。这个计算逻辑在多处复用（购物车、订单确认、发票），适合封装为函数。函数让代码更清晰、更易维护——修改税率只需改一处。",
        code: "def calculate_price(price, tax_rate):\n    tax = price * tax_rate\n    total = price + tax\n    return total\n\ncoffee = calculate_price(30, 0.06)\nbook = calculate_price(80, 0.06)\nlaptop = calculate_price(6000, 0.13)\n\nprint(f'咖啡: ¥{coffee:.2f}')\nprint(f'图书: ¥{book:.2f}')\nprint(f'笔记本: ¥{laptop:.2f}')",
        language: "python",
        connections: ["value.binding", "control.conditionals"]
      },

      confusions: [
        {
          left: "参数（形参）",
          right: "实参",
          explanation: "参数（parameter）是函数定义中的占位符，是「格子标签」。实参（argument）是调用时传入的具体值，是「放入格子的东西」。定义 def add(a, b) 中 a 和 b 是参数；调用 add(3, 5) 中 3 和 5 是实参。",
          leftExample: "def add(a, b):  # a, b 是参数\n    return a + b",
          rightExample: "add(3, 5)  # 3, 5 是实参\n# 3 绑定到 a，5 绑定到 b"
        },
        {
          left: "return",
          right: "print",
          explanation: "return 把值传回调用者，调用者可以用这个值做后续计算。print 只是把信息显示到屏幕上，不产生可用的值。最常见的初学者错误：函数里用 print 代替 return，然后发现拿不到结果。",
          leftExample: "def add(a, b):\n    return a + b\n\nx = add(1, 2)  # x = 3\n# 返回值可以被使用",
          rightExample: "def add(a, b):\n    print(a + b)\n\nx = add(1, 2)  # 输出 3\n# 但 x 是 None，拿不到值"
        },
        {
          left: "定义函数",
          right: "调用函数",
          explanation: "定义（def/function/fn）是「制造机器」——创建函数对象但不执行。调用（函数名加括号）是「启动机器」——传入参数、执行函数体、返回结果。定义后可以调用无数次。",
          leftExample: "def greet(name):\n    return f'Hello, {name}'\n# 函数已定义，但还没执行",
          rightExample: "greet('Alice')  # 调用\n# 函数体执行，返回 'Hello, Alice'"
        }
      ],

      errors: [
        {
          code: "# Python\ndef get_grade(score):\n    if score >= 60:\n        return '及格'\n    # 忘记处理 score < 60 的情况\n\nresult = get_grade(45)\nprint(result)",
          message: "输出 None",
          cause: "函数在 score < 60 时没有 return 语句，Python 默认返回 None。所有路径都必须有明确的返回值，否则调用者会拿到意外的 None。",
          fix: "确保所有条件分支都有 return，或在函数末尾添加默认返回值。",
          variantCode: "def get_grade(score):\n    if score >= 60:\n        return '及格'\n    return '不及格'\n\n# 或者\ndef get_grade(score):\n    if score >= 60:\n        return '及格'\n    else:\n        return '不及格'"
        },
        {
          code: "// JavaScript\nfunction double(x) {\n    return\n    x * 2;  // 永远不执行\n}\n\nconsole.log(double(5));",
          message: "输出 undefined",
          cause: "JavaScript 的 ASI（自动分号插入）会在 return 后插入分号，导致 return; 单独成行，后面的 x * 2 永远不执行。函数返回 undefined。",
          fix: "return 和返回值写在同一行，或用括号包裹。",
          variantCode: "function double(x) {\n    return x * 2;  // 正确\n}\n\n// 或用括号\nfunction double(x) {\n    return (\n        x * 2\n    );\n}"
        }
      ],

      exercises: [
        {
          id: "function.lambda.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个是「实参」？",
          options: [
            "def greet(name): 中的 name",
            "greet('Alice') 中的 'Alice'",
            "函数体中的 return 语句",
            "函数的返回值"
          ],
          answer: 1,
          feedback: "参数（形参）是定义中的占位符 name，实参是调用时传入的具体值 'Alice'。"
        },
        {
          id: "function.lambda.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ndef f(x):\n    print(x)\n    return x * 2\n\nresult = f(5)\nprint(result)",
          options: ["5", "10", "5\\n10", "10\\n5"],
          answer: 2,
          feedback: "调用 f(5)：先执行 print(x) 输出 5，然后 return 10。result = 10。最后 print(result) 输出 10。所以输出是 5 然后 10。"
        },
        {
          id: "function.lambda.ex03",
          level: "B",
          type: "read",
          question: "以下 Python 代码的输出是什么？\n\ndef check(x):\n    if x > 0:\n        return '正'\n\nresult = check(-5)\nprint(result)",
          options: ["'负'", "报错", "''", "None"],
          answer: 3,
          feedback: "check(-5) 中 x > 0 为 false，跳过 if 块，函数没有 return，默认返回 None。"
        },
        {
          id: "function.lambda.ex04",
          level: "C",
          type: "fill",
          question: "补全函数，使其返回两个数中的较大值：",
          options: [
            "def max_of(a, b):\n    if a > b:\n        return a\n    return b",
            "def max_of(a, b):\n    if a > b:\n        return a\n    if a < b:\n        return b",
            "def max_of(a, b):\n    if a > b:\n        a\n    else:\n        b",
            "def max_of(a, b):\n    if a > b:\n        print(a)\n    else:\n        print(b)"
          ],
          answer: 0,
          feedback: "选项 0 正确：if a > b 返回 a，否则 return b 处理所有其他情况（包括相等）。选项 1 在 a == b 时返回 None。选项 2 没有 return。选项 3 用 print 而非 return。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个函数 is_even(n)，判断 n 是否为偶数，返回 true 或 false",
        hints: [
          "用取模运算 n % 2 判断奇偶",
          "偶数的特征是 n % 2 == 0",
          "return 后面跟一个布尔表达式即可"
        ],
        solution: "def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))\nprint(is_even(7))",
        solutionOutput: "True\nFalse"
      },

      connections: {
        current: "函数",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">变量与值</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">函数定义 ── 参数传递 ── 返回值</div>
  <div>│</div>
  <div style="color:var(--muted)">递归 / 高阶函数</div>
</div>`,
        prerequisites: ["value.binding", "control.conditionals"],
        related: ["function.parameter-passing", "function.recursion", "function.higher-order"],
        next: ["function.parameter-passing", "value.scope-lifetime"]
      },

      nextStep: {
        title: "参数传递机制",
        description: "理解函数定义和调用后，下一步要搞清楚：当你把变量传给函数时，传递的是值本身还是引用？这决定了函数内部修改参数是否影响外部——这是值语义和引用语义的核心区别。",
        targetId: "function.parameter-passing"
      }
    },

    // ================================================================
    // 黄金样板扩展 4：参数传递（调用模型）
    // ================================================================
    {
      id: "function.parameter-passing",
      estimatedTime: 11,
      difficulty: "beginner",

      hook: {
        question: "函数内部修改参数，会影响到外面的变量吗？",
        code: "def add_one(x):\n    x = x + 1\n\nn = 5\nadd_one(n)\nprint(n)",
        options: [
          "输出 6（函数修改了 n）",
          "输出 5（n 没有被改变）",
          "报错（不能把变量传给函数）",
          "输出 None（函数没有返回值）"
        ],
        answer: 1,
        explanation: "Python 的 add_one(n) 把 n 的值 5 传给了参数 x。函数内 x = x + 1 只是让参数 x 重新绑定到 6，外面的 n 仍然指向 5。这是「按值传递」的直觉模型：函数拿到的是值的副本（或者指向同一对象的引用，但重新绑定参数不会影响外部变量）。理解参数传递，是理解函数副作用和值/引用语义的桥梁。"
      },

      mentalModel: {
        title: "参数是传递进来的值，不是外面变量的遥控器",
        description: "调用函数时，实参的值被复制到函数的参数里。函数内部对参数重新赋值，不会反向修改调用者的变量——就像你给打印机一份文件的复印件，打印机怎么涂改都不会影响你手里的原件。但要注意：如果传的是对象引用，修改对象内部是会共享的。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="text-align:center">
    <div style="font-size:12px;color:var(--muted);margin-bottom:6px">调用前</div>
    <div style="display:flex;gap:32px">
      <div style="text-align:center">
        <div style="font-size:16px;font-weight:700;color:var(--accent);border:2px solid var(--accent);border-radius:8px;padding:4px 12px">n</div>
        <div style="font-size:18px;margin:4px 0">↓</div>
        <div style="font-size:22px;font-weight:800">5</div>
      </div>
      <div style="text-align:center;opacity:.5">
        <div style="font-size:16px;font-weight:700;border:1px dashed var(--line);border-radius:8px;padding:4px 12px">x（参数）</div>
        <div style="font-size:18px;margin:4px 0">↓</div>
        <div style="font-size:22px;font-weight:800">5（副本）</div>
      </div>
    </div>
  </div>
  <div style="width:2px;height:20px;background:var(--line)"></div>
  <div style="text-align:center">
    <div style="font-size:12px;color:var(--muted);margin-bottom:6px">函数内 x = x + 1 之后</div>
    <div style="display:flex;gap:32px">
      <div style="text-align:center">
        <div style="font-size:16px;font-weight:700;color:var(--accent);border:2px solid var(--accent);border-radius:8px;padding:4px 12px">n</div>
        <div style="font-size:18px;margin:4px 0">↓</div>
        <div style="font-size:22px;font-weight:800;color:var(--success)">5（不变）</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:16px;font-weight:700;border:1px dashed var(--line);border-radius:8px;padding:4px 12px">x（参数）</div>
        <div style="font-size:18px;margin:4px 0">↓</div>
        <div style="font-size:22px;font-weight:800;color:var(--danger)">6</div>
      </div>
    </div>
  </div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "定义函数 add_one：参数 x，函数体为 x = x + 1。函数已定义但未执行。",
          state: { functions: { add_one: "defined(x) → x = x + 1" }, n: undefined }
        },
        {
          line: 4,
          explanation: "创建变量 n，绑定到 5",
          state: { functions: { add_one: "defined(x) → x = x + 1" }, n: 5 }
        },
        {
          line: 5,
          explanation: "调用 add_one(n)：创建新栈帧，把 n 的值 5 复制给参数 x。注意：不是把 n 本身传进去。",
          state: { functions: { add_one: "defined(x) → x = x + 1" }, n: 5, callStack: [{ func: "add_one", x: 5 }] }
        },
        {
          line: 2,
          explanation: "执行 x = x + 1：x 从 5 变成 6。这只是参数 x 的重新绑定，n 不受影响。",
          state: { functions: { add_one: "defined(x) → x = x + 1" }, n: 5, callStack: [{ func: "add_one", x: 6 }] }
        },
        {
          line: 6,
          explanation: "函数返回（没有 return，返回 None），栈帧销毁。print(n) 输出 n 的值 5",
          state: { functions: { add_one: "defined(x) → x = x + 1" }, n: 5, output: "5" }
        }
      ],

      walkthrough: [
        { line: 1, text: "定义 add_one 函数，声明参数 x。函数体是 x = x + 1。" },
        { line: 4, text: "n = 5：创建变量 n 绑定到 5。" },
        { line: 5, text: "add_one(n)：调用函数。关键点——实参 n 的『值』5 被复制到形参 x。函数拿到的是 5 这个值，不是 n 本身。" },
        { line: 2, text: "x = x + 1：x 变成 6。这只影响函数内的参数 x，外面的 n 仍是 5。" },
        { line: 6, text: "print(n) 输出 5。函数没有 return，默认返回 None，但这里没有使用返回值。" }
      ],

      realWorldExample: {
        title: "修改列表元素 vs 重新赋值参数",
        problem: "在记账系统中，你需要写一个函数给订单打折。如果函数修改传入的列表内容，外部会看到变化（引用共享）；如果函数只是给参数重新赋值，外部不会变。理解这个区别能避免一半以上的参数相关 bug。",
        code: "def apply_discount(order, rate):\n    for i in range(len(order)):\n        order[i] = round(order[i] * rate, 2)\n    # 修改对象内部 → 外部可见\n\ndef broken_discount(order, rate):\n    order = [round(p * rate, 2) for p in order]\n    # 重新绑定参数 → 外部不可见\n\nprices = [100, 200, 300]\napply_discount(prices, 0.9)\nprint(prices)      # [90, 180, 270] —— 修改生效\n\nprices2 = [100, 200, 300]\nbroken_discount(prices2, 0.9)\nprint(prices2)     # [100, 200, 300] —— 没变！",
        language: "python",
        connections: ["value.semantics", "collection.copy"]
      },

      confusions: [
        {
          left: "按值传递",
          right: "按引用传递",
          explanation: "按值传递：函数拿到值的副本，修改参数不影响外部。按引用传递：函数拿到外部变量的引用，函数内重新绑定会影响外部。多数语言（Python/Java/JS）实际是「按共享传递」——对象引用按值复制，所以修改对象内部共享，重新绑定不共享。",
          leftExample: "def f(x):\n    x = x + 1\n\nn = 5\nf(n)\nprint(n)  # 5（值传递：不变）",
          rightExample: "// C++ 按引用\nvoid f(int& x) {\n    x = x + 1;\n}\nint n = 5;\nf(n);\nstd::cout << n;  // 6（引用传递：改变）"
        },
        {
          left: "修改参数（对象内部）",
          right: "重新绑定参数",
          explanation: "如果参数指向一个对象（列表/字典/对象），修改对象内部（如 list.append）是共享的——外部变量会看到。但给参数重新赋值（如 x = 新列表）只改变参数自己，外部变量不变。这是初学者最常踩的坑。",
          leftExample: "def f(lst):\n    lst.append(1)\n\na = []\nf(a)\nprint(a)  # [1]（内部修改共享）",
          rightExample: "def f(lst):\n    lst = [9, 9]\n\na = []\nf(a)\nprint(a)  # []（重新绑定不共享）"
        },
        {
          left: "形参",
          right: "实参",
          explanation: "形参是函数定义时的占位变量（def f(x) 中的 x），实参是调用时传入的具体值（f(5) 中的 5）。实参的值在调用时被复制到形参中。",
          leftExample: "def f(x, y):  # x, y 是形参\n    return x + y",
          rightExample: "f(3, 4)  # 3, 4 是实参\n# 3→x, 4→y"
        }
      ],

      errors: [
        {
          code: "# Python\ndef reset_score(score):\n    score = 0\n\nplayer_score = 100\nreset_score(player_score)\nprint(player_score)",
          message: "输出 100，而不是 0",
          cause: "score = 0 只是重新绑定了函数内的形参 score，并没有修改外面的 player_score。期望「把分数清零」的函数实际上什么都没做。",
          fix: "返回新值并重新赋值给外部变量，或传递可变容器并修改其内部。",
          variantCode: "# 方式 1：返回新值\ndef reset_score(score):\n    return 0\n\nplayer_score = 100\nplayer_score = reset_score(player_score)\nprint(player_score)  # 0\n\n# 方式 2：用可变容器\ndef reset_score(state):\n    state['score'] = 0\n\nstate = {'score': 100}\nreset_score(state)\nprint(state['score'])  # 0"
        },
        {
          code: "// JavaScript\nfunction setToZero(list) {\n    list = [0];\n}\n\nconst arr = [1, 2, 3];\nsetToZero(arr);\nconsole.log(arr);",
          message: "输出 [1, 2, 3]，而不是 [0]",
          cause: "list = [0] 让形参 list 指向了一个新数组，但外面的 arr 仍指向原数组。很多初学者以为这样能「清空」数组。",
          fix: "要修改原数组，应使用 list.length = 0 或 list.splice(0, list.length) 等修改对象内部的方法。",
          variantCode: "function setToZero(list) {\n    list.length = 0;      // 修改对象内部\n    list.push(0);\n}\n\nconst arr = [1, 2, 3];\nsetToZero(arr);\nconsole.log(arr);  // [0]"
        }
      ],

      exercises: [
        {
          id: "function.parameter-passing.ex01",
          level: "A",
          type: "concept",
          question: "调用 f(3, 4) 时，3 和 4 分别叫做什么？",
          options: [
            "返回值",
            "局部变量",
            "形参（参数）",
            "实参（自变量）"
          ],
          answer: 3,
          feedback: "调用时传入的值叫实参（argument）；函数定义时的占位符叫形参（parameter）。"
        },
        {
          id: "function.parameter-passing.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ndef change(x):\n    x = 10\n\nn = 5\nchange(n)\nprint(n)",
          options: ["10", "5", "None", "报错"],
          answer: 1,
          feedback: "change(n) 传入 n 的值 5，函数内 x = 10 只改形参，外面的 n 仍是 5。"
        },
        {
          id: "function.parameter-passing.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\ndef add_item(lst):\n    lst.append(9)\n\na = [1, 2]\nadd_item(a)\nprint(a)",
          options: ["[1, 2]", "[9]", "[1, 2, 9]", "报错"],
          answer: 2,
          feedback: "lst.append(9) 修改的是列表对象内部，外部变量 a 和形参 lst 指向同一个列表，所以 a 变成 [1, 2, 9]。这就是「按共享传递」。"
        },
        {
          id: "function.parameter-passing.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，使函数能真正把外部变量清零：",
          options: [
            "def reset():\n    return 0\n\nscore = 100\nscore = reset()",
            "def reset(score):\n    score = 0\n\nscore = 100\nreset(score)",
            "def reset(score):\n    score = 0\n    return score\n\nscore = 100\nreset(score)",
            "def reset(score):\n    return 0\n\nscore = 100\nreset(score)"
          ],
          answer: 0,
          feedback: "选项 0 正确：reset() 返回 0，外部用 score = reset() 重新绑定。选项 1 只改形参；选项 2 返回了 0 但外部没有接收；选项 3 返回了 0 但外部也没接收。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个函数 double_list(nums)，返回一个新列表，其中每个元素翻倍（不要修改原列表）",
        hints: [
          "返回新值而不是修改参数",
          "用列表推导式或循环构建新列表",
          "return 新列表"
        ],
        solution: "def double_list(nums):\n    return [n * 2 for n in nums]\n\noriginal = [1, 2, 3]\nresult = double_list(original)\nprint(original)  # [1, 2, 3] 不变\nprint(result)    # [2, 4, 6]",
        solutionOutput: "[1, 2, 3]\n[2, 4, 6]"
      },

      connections: {
        current: "函数",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">函数定义</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">实参 → 参数传递 → 形参</div>
  <div>│</div>
  <div style="color:var(--muted)">值语义 / 引用语义 / 闭包</div>
</div>`,
        prerequisites: ["function.lambda", "value.binding"],
        related: ["value.semantics", "value.scope-lifetime", "function.closure"],
        next: ["value.semantics", "function.closure"]
      },

      nextStep: {
        title: "值语义与引用语义",
        description: "参数传递的核心问题「修改是否共享」根源于值语义和引用语义。下一步深入学习：什么类型是值（复制时独立），什么类型是引用（复制时共享），以及可变对象的陷阱。",
        targetId: "value.semantics"
      }
    },

    // ================================================================
    // 黄金样板扩展 5：集合遍历（数据模型）
    // ================================================================
    {
      id: "collection.iteration",
      estimatedTime: 10,
      difficulty: "beginner",

      hook: {
        question: "如何「挨个处理」集合里的每个元素？",
        code: "scores = [82, 47, 91]\nfor s in scores:\n    print(s)",
        options: [
          "按索引 s[0], s[1], s[2] 手工打印",
          "遍历：s 依次绑定到 82、47、91，各打印一次",
          "只打印第一个元素 82",
          "报错（不能直接 for 一个列表）"
        ],
        answer: 1,
        explanation: "for 循环的本质是「遍历（iterate）」：每次迭代，循环变量 s 绑定到集合中的下一个元素，执行一次循环体。不需要你知道集合有多大，也不需要手动管理索引——遍历结构自动处理。这是所有语言处理集合的统一心智模型。"
      },

      mentalModel: {
        title: "遍历是逐个访问元素",
        description: "想象你有一排盒子，遍历就是从头到尾每个盒子打开看一眼。循环变量是「当前盒子的标签」——每轮循环它指向一个新元素。关键是理解：遍历只读集合、按顺序访问，循环体和集合本身是两个不同的东西。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="font-size:12px;color:var(--muted)">集合 scores</div>
  <div style="display:flex;gap:10px">
    <div style="width:52px;height:52px;border:2px solid var(--accent);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(99,102,241,.08)">
      <div style="font-size:20px;font-weight:800;color:var(--accent)">82</div>
      <div style="font-size:10px;color:var(--muted)">第1轮: s</div>
    </div>
    <div style="width:52px;height:52px;border:2px solid var(--line);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div style="font-size:20px;font-weight:800">47</div>
      <div style="font-size:10px;color:var(--muted)">第2轮: s</div>
    </div>
    <div style="width:52px;height:52px;border:2px solid var(--line);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center">
      <div style="font-size:20px;font-weight:800">91</div>
      <div style="font-size:10px;color:var(--muted)">第3轮: s</div>
    </div>
  </div>
  <div style="font-size:12px;color:var(--muted)">每轮：s 指向下一个元素 → 执行循环体 → 直到末尾</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建列表 scores，包含 82、47、91 三个元素",
          state: { scores: [82, 47, 91] }
        },
        {
          line: 2,
          explanation: "遍历开始：第 1 轮，循环变量 s 绑定到第一个元素 82",
          state: { scores: [82, 47, 91], s: 82, round: 1 }
        },
        {
          line: 3,
          explanation: "print(s) 输出 82",
          state: { scores: [82, 47, 91], s: 82, output: "82" }
        },
        {
          line: 2,
          explanation: "第 2 轮：s 重新绑定到 47",
          state: { scores: [82, 47, 91], s: 47, round: 2 }
        },
        {
          line: 3,
          explanation: "print(s) 输出 47",
          state: { scores: [82, 47, 91], s: 47, output: "82\n47" }
        },
        {
          line: 2,
          explanation: "第 3 轮：s 绑定到 91，输出 91。集合遍历完毕，循环结束",
          state: { scores: [82, 47, 91], s: 91, round: 3, output: "82\n47\n91" }
        }
      ],

      walkthrough: [
        { line: 1, text: "创建列表 scores，包含三个元素。" },
        { line: 2, text: "for s in scores：Python 创建一个迭代器，从集合第一个元素开始。第 1 轮，s 绑定到 82。" },
        { line: 3, text: "执行循环体 print(s)，输出 82。循环体结束后自动回到 for 行，取下一个元素。" },
        { line: 2, text: "第 2 轮：s 绑定到 47（覆盖上一轮的 82）。再次执行循环体。" },
        { line: 3, text: "输出 47。循环体结束后取下一个元素 91。" },
        { line: 2, text: "第 3 轮：s 绑定到 91，输出 91。之后迭代器发现没有更多元素，循环自然结束，继续执行循环之后的代码。" }
      ],

      realWorldExample: {
        title: "统计不及格科目",
        problem: "学生成绩单里有多个科目的分数，需要找出所有不及格（<60）的科目。这正是遍历的典型场景：挨个检查每个元素，符合条件的收集起来。遍历 + 条件判断 + 列表收集是数据处理最常用的组合。",
        code: "scores = [82, 47, 91, 55, 68]\n\nfailed = []\nfor subject, score in scores.items() if isinstance(scores, dict) else enumerate(scores):\n    if score < 60:\n        failed.append((subject, score))\n\nprint(failed)  # [(1, 47), (3, 55)]",
        language: "python",
        connections: ["control.conditionals", "collection.filter-map-reduce"]
      },

      confusions: [
        {
          left: "遍历（for in）",
          right: "按索引（for i）",
          explanation: "for x in list 直接取元素，不需要关心位置；for i in range(n) 遍历的是索引，需要再用 list[i] 取元素。直接遍历更安全（不会越界），按索引遍历则在你需要知道位置时使用。",
          leftExample: "for s in scores:\n    print(s)  # 直接拿元素",
          rightExample: "for i in range(len(scores)):\n    print(i, scores[i])  # 需要位置时"
        },
        {
          left: "修改集合（遍历中）",
          right: "只读集合（遍历中）",
          explanation: "遍历过程中修改集合（增删元素）会导致元素跳过、重复或报错（RuntimeError: list changed size during iteration）。正确做法是遍历副本，或在遍历后统一修改。",
          leftExample: "# 危险：遍历中删除\nfor s in scores:\n    if s < 60:\n        scores.remove(s)  # 可能跳过元素",
          rightExample: "# 安全：遍历副本\nfor s in scores[:]:\n    if s < 60:\n        scores.remove(s)"
        },
        {
          left: "集合（可遍历）",
          right: "迭代器（一次性）",
          explanation: "集合是「可以遍历的对象」，可以重复遍历。迭代器是「遍历状态的快照」，用一次就耗尽。Python 的 iter(list) 返回迭代器；list 本身可以反复 for。",
          leftExample: "scores = [1, 2, 3]\nfor x in scores: ...\nfor x in scores: ...  # 可以再来一次",
          rightExample: "it = iter(scores)\nnext(it)  # 1\nnext(it)  # 2\n# 用完就没了"
        }
      ],

      errors: [
        {
          code: "# Python\nscores = [82, 47, 91, 55]\nfor s in scores:\n    if s < 60:\n        scores.remove(s)\nprint(scores)",
          message: "输出 [82, 91, 55]，而不是 [82, 91]",
          cause: "遍历过程中删除元素会改变列表长度和后续元素的索引，导致 55 被跳过——因为删除 47 后，55 移动到了 47 的位置，而循环已经指向下一个位置。遍历中修改集合是经典 bug。",
          fix: "遍历副本或先收集要删除的元素，遍历结束后再统一删除。",
          variantCode: "# 方式 1：遍历副本\nfor s in scores[:]:\n    if s < 60:\n        scores.remove(s)\n\n# 方式 2：重建列表\nscores = [s for s in scores if s >= 60]"
        },
        {
          code: "// JavaScript\nconst obj = { name: 'A', score: 82 };\nfor (const item of obj) {\n    console.log(item);\n}",
          message: "报错：obj is not iterable",
          cause: "for...of 只能遍历可迭代对象（数组、字符串、Map、Set 等）。普通对象没有迭代器，需要用 for...in（遍历键名）或 Object.entries()。",
          fix: "对对象使用 Object.entries(obj) 得到 [键, 值] 对数组再遍历。",
          variantCode: "const obj = { name: 'A', score: 82 };\nfor (const [key, value] of Object.entries(obj)) {\n    console.log(key, value);  // name A / score 82\n}"
        }
      ],

      exercises: [
        {
          id: "collection.iteration.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个属于「遍历」集合的正确方式？",
          options: [
            "scores.each()",
            "scores.iterate",
            "while scores:",
            "for s in scores:"
          ],
          answer: 3,
          feedback: "for s in scores 是 Python 遍历集合的标准方式。while scores 判断列表真假（非空为真），不是遍历每个元素。"
        },
        {
          id: "collection.iteration.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nnums = [1, 2, 3]\ntotal = 0\nfor n in nums:\n    total = total + n\nprint(total)",
          options: ["123", "6", "[1, 2, 3]", "0"],
          answer: 1,
          feedback: "循环依次把 1、2、3 累加到 total：0+1=1，1+2=3，3+3=6。输出 6。这是累加器模式。"
        },
        {
          id: "collection.iteration.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\nwords = [\"a\", \"bb\", \"ccc\"]\nfor w in words:\n    if len(w) > 1:\n        print(w)",
          options: ["a\\nbb\\nccc", "a", "bb\\nccc", "ccc"],
          answer: 2,
          feedback: "len('a')=1 不大于 1，跳过；len('bb')=2 和 len('ccc')=3 满足条件，输出 bb 和 ccc。"
        },
        {
          id: "collection.iteration.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，把列表中所有偶数收集到 evens：",
          options: [
            "evens = []\nfor n in nums:\n    if n % 2 == 0:\n        evens.append(n)",
            "evens = []\nfor n in nums:\n    evens.append(n % 2 == 0)",
            "evens = nums[::2]",
            "evens = []\nfor n in nums:\n    if n % 2 != 0:\n        evens.append(n)"
          ],
          answer: 0,
          feedback: "选项 0 正确：遍历每个数，偶数（n % 2 == 0）收集到新列表。选项 1 收集的是布尔值。选项 2 是每隔一个取元素，不是取偶数。选项 3 收集的是奇数。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "用遍历计算列表 nums 中所有负数的个数（例如 [-1, 2, -3] 中有 2 个）",
        hints: [
          "用 count 变量计数",
          "条件是 n < 0",
          "每遇到一个负数 count += 1"
        ],
        solution: "nums = [-1, 2, -3, 4, -5]\ncount = 0\nfor n in nums:\n    if n < 0:\n        count = count + 1\nprint(count)",
        solutionOutput: "3"
      },

      connections: {
        current: "集合",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">数组 / 列表</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">遍历 ── 过滤 / 映射 / 归约</div>
  <div>│</div>
  <div style="color:var(--muted)">生成器 / 迭代器</div>
</div>`,
        prerequisites: ["collection.array-list", "value.binding"],
        related: ["control.loops", "collection.filter-map-reduce", "collection.map"],
        next: ["collection.filter-map-reduce", "collection.crud"]
      },

      nextStep: {
        title: "过滤、映射与归约",
        description: "遍历是最基础的集合操作。下一步学习三个更高层的抽象：过滤（filter，留下符合条件的）、映射（map，变换每个元素）、归约（reduce，把集合合并成一个值）。它们让你的集合处理代码更清晰。",
        targetId: "collection.filter-map-reduce"
      }
    },

    // ================================================================
    // 黄金样板扩展 6：错误处理（异常模型）
    // ================================================================
    {
      id: "error.exception-vs-result",
      estimatedTime: 12,
      difficulty: "intermediate",

      hook: {
        question: "程序出错时，应该怎么「优雅地」处理？",
        code: "# Python\nx = int(\"abc\")  # 无法转成整数\nprint(x)",
        options: [
          "程序崩溃并打印堆栈跟踪",
          "x 自动变成 0",
          "什么都不发生，x 为 undefined",
          "打印 'abc'"
        ],
        answer: 0,
        explanation: "int(\"abc\") 会抛出 ValueError 异常。如果没有 try/except 捕获，异常会向上传播直到程序崩溃，打印堆栈跟踪。这就是「异常」模型：错误发生时中断正常流程，抛出一个异常对象，由调用链上的异常处理器决定如何处理。与之相对的是「错误值」模型（如 Go）：函数返回一个表示错误的值，由调用者检查。"
      },

      mentalModel: {
        title: "异常是抛出的信号球",
        description: "想象程序是一条传送带。正常情况零件一路顺利加工；出错时，传送带抛出一个红色信号球（异常对象），它会顺着调用链向上「抛」（throw），直到有人接住（catch）。如果没人接住，整个系统停机（程序崩溃）。错误值模型则是：每个工位检查零件是否损坏（检查返回值），损坏就自己处理。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="display:flex;align-items:center;gap:24px">
    <div style="text-align:center">
      <div style="padding:6px 14px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">函数 f</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">发现错误</div>
    </div>
    <div style="font-size:24px;color:var(--danger)">throw ⤴</div>
    <div style="text-align:center">
      <div style="padding:6px 14px;border:2px solid var(--line);border-radius:8px;color:var(--muted)">调用者 g</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">没接住</div>
    </div>
    <div style="font-size:24px;color:var(--danger)">throw ⤴</div>
    <div style="text-align:center">
      <div style="padding:6px 14px;border:2px solid var(--success);border-radius:8px;font-weight:700;color:var(--success)">catch 处理器</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">接住了！</div>
    </div>
  </div>
  <div style="font-size:12px;color:var(--muted)">异常沿调用链向上抛，直到被 catch 接住；无人接住则程序崩溃</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "执行 int(\"abc\")：Python 尝试把字符串 'abc' 转成整数，失败",
          state: { x: undefined }
        },
        {
          line: 2,
          explanation: "抛出 ValueError 异常，携带消息 \"invalid literal for int() with base 10: 'abc'\"。当前作用域没有 try/except，异常向上传播",
          state: { x: undefined, exception: "ValueError: invalid literal for int()..." }
        },
        {
          line: 3,
          explanation: "print(x) 永远不会执行——异常跳过了它。异常到达顶层，程序终止并打印堆栈跟踪",
          state: { x: undefined, outcome: "program crashed" }
        }
      ],

      walkthrough: [
        { line: 1, text: "int(\"abc\")：字符串 'abc' 不能被解析为整数。此时 Python 不会返回一个特殊值，而是抛出一个异常对象。" },
        { line: 2, text: "异常类型是 ValueError。因为代码不在 try 块中，异常开始沿调用链向上传播，寻找最近的异常处理器。" },
        { line: 3, text: "print(x) 永远不执行——异常跳过了它。异常传播到程序最顶层仍无人处理，程序终止并打印堆栈跟踪（traceback）。" }
      ],

      realWorldExample: {
        title: "解析用户输入",
        problem: "用户输入年龄时可能输入非数字（如 \"abc\" 或空字符串）。真实系统必须优雅处理——不能因为一个用户的输入错误就让整个程序崩溃，而是提示用户重新输入。异常处理让「正常流程」和「错误流程」分离，代码更清晰。",
        code: "def get_age():\n    while True:\n        raw = input(\"请输入年龄: \")\n        try:\n            return int(raw)\n        except ValueError:\n            print(\"输入无效，请输入数字！\")\n\nage = get_age()\nprint(f\"年龄: {age}\")",
        language: "python",
        connections: ["function.parameter-passing", "control.loops"]
      },

      confusions: [
        {
          left: "异常模型",
          right: "错误值模型",
          explanation: "异常模型（Python/Java/JS）：错误发生时中断流程，抛出异常对象，由 catch 处理。错误值模型（Go）：函数返回 (result, error)，调用者检查 err != nil。异常让错误处理不打断主流程，错误值让错误处理显式可见。",
          leftExample: "try:\n    x = int(s)\nexcept ValueError:\n    print(\"转换失败\")",
          rightExample: "// Go\nx, err := strconv.Atoi(s)\nif err != nil {\n    fmt.Println(\"转换失败\")\n}"
        },
        {
          left: "抛出异常（throw）",
          right: "捕获异常（catch）",
          explanation: "throw/raise 是主动制造异常信号；try/catch 是接住异常并处理。抛出和捕获可以在不同的函数中——抛出点只需要表达「这里出错了」，由调用链上合适的处理器决定如何处理。",
          leftExample: "def check(age):\n    if age < 0:\n        raise ValueError(\"年龄不能为负\")",
          rightExample: "try:\n    check(-5)\nexcept ValueError as e:\n    print(\"参数错误:\", e)"
        },
        {
          left: "错误处理",
          right: "程序崩溃",
          explanation: "错误处理是程序主动响应异常（提示用户、重试、降级）。程序崩溃是异常无人处理时被迫终止。同一个异常，处理了就是「优雅降级」，不处理就是「崩溃」——区别只在于是否有人 catch。",
          leftExample: "try:\n    x = int(raw)\nexcept ValueError:\n    x = 0  # 降级为默认值",
          rightExample: "x = int(raw)  # 输入非法 → 崩溃\n# Traceback (most recent call last): ..."
        }
      ],

      errors: [
        {
          code: "# Python\ndef divide(a, b):\n    return a / b\n\nresult = divide(10, 0)\nprint(result)",
          message: "崩溃：ZeroDivisionError: division by zero",
          cause: "除以 0 抛出 ZeroDivisionError，代码没有捕获。异常直接传播到顶层导致程序崩溃。",
          fix: "在可能出错的调用点捕获异常，或先检查除数是否为 0。",
          variantCode: "# 方式 1：捕获异常\ntry:\n    result = divide(10, 0)\n    print(result)\nexcept ZeroDivisionError:\n    print(\"除数不能为 0\")\n\n# 方式 2：先检查\ndef divide(a, b):\n    if b == 0:\n        return None  # 或 raise ValueError(\"除数为 0\")\n    return a / b"
        },
        {
          code: "# Python\ntry:\n    x = int(\"abc\")\nexcept ValueError:\n    print(\"转换失败\")\n\nprint(x)",
          message: "崩溃：NameError: name 'x' is not defined",
          cause: "int(\"abc\") 抛出异常后，x 从未被赋值。except 块打印提示后，程序继续执行，但 x 不存在。捕获异常后，代码仍要处理「变量未定义」的后果。",
          fix: "在 except 块中给 x 一个默认值，或把后续依赖 x 的代码也放进 try 块。",
          variantCode: "try:\n    x = int(\"abc\")\nexcept ValueError:\n    x = 0  # 默认值\n\nprint(x)  # 0，程序不崩溃"
        }
      ],

      exercises: [
        {
          id: "error.exception-vs-result.ex01",
          level: "A",
          type: "concept",
          question: "Python 中 int(\"abc\") 会发生什么？",
          options: [
            "返回 0",
            "返回 None",
            "静默失败",
            "抛出 ValueError 异常"
          ],
          answer: 3,
          feedback: "int() 无法解析 'abc' 时抛出 ValueError 异常。Python 使用异常模型而非错误值模型。"
        },
        {
          id: "error.exception-vs-result.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ntry:\n    x = int(\"abc\")\n    print(\"成功\")\nexcept ValueError:\n    print(\"失败\")\nprint(\"结束\")",
          options: ["失败\\n结束", "成功\\n结束", "失败", "崩溃"],
          answer: 0,
          feedback: "int(\"abc\") 抛异常，跳过 print(\"成功\")，进入 except 块输出「失败」，然后程序继续输出「结束」。"
        },
        {
          id: "error.exception-vs-result.ex03",
          level: "B",
          type: "read",
          question: "Go 语言通常如何处理函数错误？",
          options: [
            "抛出异常，由调用者 catch",
            "程序自动重试",
            "函数返回 (result, error)，调用者检查 err",
            "忽略错误"
          ],
          answer: 2,
          feedback: "Go 采用错误值模型：函数返回结果和 error 两个值，调用者显式检查 err != nil。没有 try/catch 机制。"
        },
        {
          id: "error.exception-vs-result.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，让除法在除数为 0 时输出「除数不能为 0」而不是崩溃：",
          options: [
            "if b == 0:\n    print(\"除数不能为 0\")\nresult = a / b\nprint(result)",
            "try:\n    result = a / b\n    print(result)\nexcept ZeroDivisionError:\n    print(\"除数不能为 0\")",
            "result = a / b or \"除数不能为 0\"\nprint(result)",
            "try:\n    result = a / b\nexcept:\n    pass\nprint(result)"
          ],
          answer: 1,
          feedback: "选项 0 正确：try 中执行除法，ZeroDivisionError 被捕获并提示。选项 1 打印提示后仍然执行了除法（崩溃）。选项 3 捕获异常但 pass 后 result 未定义。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个安全转换函数 safe_int(s)：转换成功返回整数，失败返回 None",
        hints: [
          "用 try/except 包裹 int(s)",
          "except ValueError 时返回 None",
          "成功时返回转换结果"
        ],
        solution: "def safe_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None\n\nprint(safe_int(\"42\"))   # 42\nprint(safe_int(\"abc\"))  # None",
        solutionOutput: "42\nNone"
      },

      connections: {
        current: "错误处理",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">函数调用</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">异常模型 ── 错误值模型</div>
  <div>│</div>
  <div style="color:var(--muted)">错误传播 / 自定义错误</div>
</div>`,
        prerequisites: ["function.lambda", "function.parameter-passing"],
        related: ["error.try-catch", "error.custom-types", "value.nullability"],
        next: ["error.propagation", "error.custom-types"]
      },

      nextStep: {
        title: "错误传播与包装",
        description: "理解异常和错误值的区别后，下一步学习：错误在调用链中如何逐层传播、何时应该包装（添加上下文信息）、何时应该立即处理。这决定了大型系统的错误信息质量。",
        targetId: "error.propagation"
      }
    },

    // ================================================================
    // 黄金样板扩展 7：类与对象（对象模型）
    // ================================================================
    {
      id: "model.record-struct-class",
      estimatedTime: 13,
      difficulty: "intermediate",

      hook: {
        question: "一个学生需要姓名、分数、邮箱三个信息，怎么组织？",
        code: "# Python\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\ns = Student(\"小明\", 92)\nprint(s.name)",
        options: [
          "用三个独立变量 name、score、email 分别存",
          "把相关数据和方法打包成一个「对象」，通过 s.name 访问",
          "只能用字典 {'name': ..., 'score': ...}",
          "报错（class 语法错误）"
        ],
        answer: 1,
        explanation: "类（class）把相关的数据（属性）和行为（方法）打包成一个模板。Student(\"小明\", 92) 根据模板创建了一个具体的学生对象 s，s.name 访问它的属性。这比三个散落的变量更符合现实：学生这个概念天然包含姓名、分数等，还可能有 get_grade() 这样的行为。这是对象模型的核心：数据 + 行为 绑定在一起。"
      },

      mentalModel: {
        title: "类是模具，对象是成品",
        description: "类（class）像模具：定义了一个「学生」应该有什么属性和方法。对象（instance）是模具造出的具体成品：每一个具体的学生有自己的姓名和分数。模具共享（模板定义一次），成品独立（每个对象的数据互不影响）。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="text-align:center">
    <div style="padding:8px 20px;border:2px solid var(--accent);border-radius:12px;font-weight:700;color:var(--accent);font-size:15px">class Student（模具/模板）</div>
    <div style="font-size:12px;color:var(--muted);margin-top:4px">属性: name, score │ 方法: __init__, get_grade</div>
  </div>
  <div style="font-size:22px">↓ 实例化（new / Student(...)）</div>
  <div style="display:flex;gap:24px">
    <div style="text-align:center;border:1px solid var(--line);border-radius:10px;padding:8px 16px">
      <div style="font-weight:700">对象 s1</div>
      <div style="font-size:12px;color:var(--muted)">name: 小明<br>score: 92</div>
    </div>
    <div style="text-align:center;border:1px solid var(--line);border-radius:10px;padding:8px 16px">
      <div style="font-weight:700">对象 s2</div>
      <div style="font-size:12px;color:var(--muted)">name: 小红<br>score: 88</div>
    </div>
  </div>
  <div style="font-size:12px;color:var(--muted)">每个对象的数据独立，但都来自同一个类模板</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "定义类 Student：声明了 __init__ 构造函数。此时只创建了模板，还没有任何学生对象",
          state: { classes: { Student: "defined(name, score)" } }
        },
        {
          line: 2,
          explanation: "def __init__(self, name, score)：构造函数的定义。self 指代将来创建的那个对象本身",
          state: { classes: { Student: "defined(name, score)" } }
        },
        {
          line: 6,
          explanation: "执行 Student(\"小明\", 92)：调用构造函数。Python 自动创建新对象并绑定到 self，把 \"小明\" 赋给 self.name，92 赋给 self.score",
          state: { classes: { Student: "defined(name, score)" }, objects: [{ id: "s", name: "小明", score: 92 }] }
        },
        {
          line: 6,
          explanation: "构造完成，返回新对象。变量 s 绑定到这个对象",
          state: { classes: { Student: "defined(name, score)" }, s: { name: "小明", score: 92 } }
        },
        {
          line: 7,
          explanation: "print(s.name)：通过对象访问属性，输出 小明",
          state: { classes: { Student: "defined(name, score)" }, s: { name: "小明", score: 92 }, output: "小明" }
        }
      ],

      walkthrough: [
        { line: 1, text: "class Student：定义类，创建模板。类名通常大写开头。" },
        { line: 2, text: "def __init__(self, name, score)：构造函数，在创建对象时自动调用。self 表示新创建的对象本身，self.name = name 把参数存进对象。" },
        { line: 6, text: "Student(\"小明\", 92)：实例化。Python 创建空对象 → 调用 __init__ 初始化 → 返回对象。" },
        { line: 7, text: "s.name：点号访问属性，取出对象里存的 '小明' 并输出。" }
      ],

      realWorldExample: {
        title: "游戏角色系统",
        problem: "游戏里每个角色都有血量、攻击力、名字，还有受伤（take_damage）和攻击（attack）的行为。用类组织，每个角色对象自己管自己的数据；用散乱变量，几百个角色会变成灾难。对象模型让「数据 + 行为」天然内聚。",
        code: "class Character:\n    def __init__(self, name, hp, attack):\n        self.name = name\n        self.hp = hp\n        self.attack = attack\n\n    def take_damage(self, amount):\n        self.hp -= amount\n        if self.hp < 0:\n            self.hp = 0\n        print(f'{self.name} 受到 {amount} 伤害，剩余 HP {self.hp}')\n\n    def is_alive(self):\n        return self.hp > 0\n\nhero = Character('勇者', 100, 15)\ndragon = Character('恶龙', 120, 20)\n\ndragon.take_damage(hero.attack)  # 恶龙 受到 15 伤害\nprint(dragon.is_alive())          # True",
        language: "python",
        connections: ["collection.map", "function.lambda"]
      },

      confusions: [
        {
          left: "类（class）",
          right: "对象（instance）",
          explanation: "类是模板/蓝图，定义属性和方法；对象是模板的实例，有具体的数据。类只有一个，对象可以有无数个。比如「学生」是类，「小明」是对象。",
          leftExample: "class Student:  # 类：模板\n    def __init__(self, name):\n        self.name = name",
          rightExample: "s1 = Student(\"小明\")  # 对象：实例\ns2 = Student(\"小红\")  # 另一个对象\n# s1.name 和 s2.name 互不影响"
        },
        {
          left: "属性（attribute）",
          right: "局部变量",
          explanation: "属性存在对象上（通过 self/this 访问），每个对象有自己的副本，对象存活期间一直存在。局部变量存在函数栈帧里，函数结束就销毁。属性描述对象的状态，局部变量只是计算过程中的临时值。",
          leftExample: "self.name = name\n# 存在对象上，s.name 随时可访问",
          rightExample: "def f():\n    temp = name * 2  # 局部变量\n    return temp\n# 函数结束 temp 就没了"
        },
        {
          left: "构造方法",
          right: "普通方法",
          explanation: "构造方法（__init__/constructor）在对象创建时自动调用，负责初始化属性，不手动调用（Python 中可手动调但很少）。普通方法在对象创建后通过 对象.方法() 调用。",
          leftExample: "def __init__(self, name):\n    self.name = name\n# 创建时自动调用",
          rightExample: "def greet(self):\n    print(f'Hi, {self.name}')\ns.greet()  # 手动调用"
        }
      ],

      errors: [
        {
          code: "# Python\nclass Student:\n    def __init__(self, name):\n        name = name   # 少了 self.\n\ns = Student(\"小明\")\nprint(s.name)",
          message: "崩溃：AttributeError: 'Student' object has no attribute 'name'",
          cause: "name = name 只是给局部变量 name 重新赋值，没有存到对象上。必须用 self.name = name 才能成为对象属性。这是初学者写类最常见的错误。",
          fix: "所有要成为对象属性的变量，都必须用 self.xxx 赋值。",
          variantCode: "class Student:\n    def __init__(self, name):\n        self.name = name   # 关键：self.name\n\ns = Student(\"小明\")\nprint(s.name)  # 小明"
        },
        {
          code: "// JavaScript\nclass Student {\n    constructor(name) {\n        this.name = name;\n    }\n}\nconst s = Student(\"小明\");  // 忘了 new\nconsole.log(s.name);",
          message: "崩溃：Cannot read properties of undefined (reading 'name')",
          cause: "JS 的类必须用 new 调用。Student(\"小明\") 当作普通函数调用，在严格模式下 this 是 undefined，构造函数给 undefined.name 赋值直接报错。",
          fix: "使用 new Student(\"小明\")。new 会创建新对象并绑定到 this。",
          variantCode: "const s = new Student(\"小明\");  // 必须 new\nconsole.log(s.name);  // 小明"
        }
      ],

      exercises: [
        {
          id: "model.record-struct-class.ex01",
          level: "A",
          type: "concept",
          question: "类是____，对象是____。",
          options: [
            "成品；模具",
            "模具；成品",
            "变量；函数",
            "数据；方法"
          ],
          answer: 1,
          feedback: "类是模板（模具），定义结构和行为；对象是模板创建的具体实例（成品），有独立的数据。"
        },
        {
          id: "model.record-struct-class.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(self.name + \" says woof\")\n\nd = Dog(\"Rex\")\nd.speak()",
          options: ["Rex says woof", "woof", "speak", "报错"],
          answer: 0,
          feedback: "d.speak() 调用方法，self 绑定到 d，self.name 是 'Rex'，输出 'Rex says woof'。"
        },
        {
          id: "model.record-struct-class.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\nclass Counter:\n    def __init__(self):\n        self.count = 0\n    def increment(self):\n        self.count += 1\n\nc = Counter()\nc.increment()\nc.increment()\nprint(c.count)",
          options: ["0", "1", "2", "报错"],
          answer: 2,
          feedback: "increment 每次把对象的 count 加 1，调用两次后 count 是 2。对象的状态在方法调用之间保持。"
        },
        {
          id: "model.record-struct-class.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，让 s.name 能正确访问：",
          options: [
            "class Student:\n    def __init__(name):\n        name = name\n\ns = Student(\"小明\")\nprint(s.name)",
            "class Student:\n    def __init__(self, name):\n        name = name\n\ns = Student(\"小明\")\nprint(s.name)",
            "class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student(\"小明\")\nprint(self.name)",
            "class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student(\"小明\")\nprint(s.name)"
          ],
          answer: 3,
          feedback: "选项 0 正确：self.name = name 存入对象属性，s.name 访问。选项 1 缺 self 参数；选项 2 没有 self.name；选项 3 用 self.name 访问但外部作用域没有 self。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "定义一个类 BankAccount：1. 构造函数接收 owner 和 balance；2. 方法 deposit(amount) 增加余额；3. 方法 show() 打印余额",
        hints: [
          "构造函数用 __init__(self, owner, balance)",
          "属性存到 self 上",
          "deposit 里 self.balance += amount"
        ],
        solution: "class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n    def show(self):\n        print(f'{self.owner}: {self.balance}')\n\nacc = BankAccount('Alice', 100)\nacc.deposit(50)\nacc.show()",
        solutionOutput: "Alice: 150"
      },

      connections: {
        current: "对象与类",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">函数</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">类 ── 对象 ── 属性/方法</div>
  <div>│</div>
  <div style="color:var(--muted)">值语义 / 泛型</div>
</div>`,
        prerequisites: ["function.lambda", "collection.map"],
        related: ["value.semantics", "generic.functions", "collection.map"],
        next: ["generic.functions", "value.semantics"]
      },

      nextStep: {
        title: "泛型函数",
        description: "类与对象解决了「如何组织数据」的问题。下一步学习泛型：如何写出对任意类型都适用的类和方法——这是大型库（列表、字典）内部的核心机制。",
        targetId: "generic.functions"
      }
    },

    // ================================================================
    // 黄金样板扩展 8：映射/字典（数据模型）
    // ================================================================
    {
      id: "collection.map",
      estimatedTime: 10,
      difficulty: "beginner",

      hook: {
        question: "如何按名字查分数，而不是按位置？",
        code: "scores = {\"小明\": 92, \"小红\": 88}\nprint(scores[\"小红\"])",
        options: [
          "报错（字典不能用字符串做下标）",
          "输出 88（按键取值）",
          "输出 {\"小明\": 92, \"小红\": 88}",
          "输出 小红"
        ],
        answer: 1,
        explanation: "字典（映射/哈希表）用「键」来查找「值」，而不是用位置（索引）。scores[\"小红\"] 直接在字典里找到 小红 对应的 88。这是映射的核心：键 → 值的关联。相比列表按位置访问，映射按名字访问，更像现实中的查表。"
      },

      mentalModel: {
        title: "映射是键值对照表",
        description: "想象一本词典：你要查「小红的分数」，直接翻到「小红」这个词条，看到 88。不用从头翻到尾。映射就是这种「按键查找」的结构：键唯一、无序、查找快速（哈希表 O(1) 平均）。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="font-size:12px;color:var(--muted)">scores（字典）</div>
  <div style="border:2px solid var(--accent);border-radius:12px;overflow:hidden">
    <div style="display:flex;border-bottom:1px solid var(--line)">
      <div style="width:110px;padding:8px;text-align:center;font-weight:700;color:var(--accent)">键 (key)</div>
      <div style="width:110px;padding:8px;text-align:center;font-weight:700;color:var(--muted)">值 (value)</div>
    </div>
    <div style="display:flex;border-bottom:1px solid var(--line)">
      <div style="width:110px;padding:8px;text-align:center">\"小明\"</div>
      <div style="width:110px;padding:8px;text-align:center;color:var(--success);font-weight:700">92</div>
    </div>
    <div style="display:flex">
      <div style="width:110px;padding:8px;text-align:center">\"小红\"</div>
      <div style="width:110px;padding:8px;text-align:center;color:var(--success);font-weight:700">88</div>
    </div>
  </div>
  <div style="font-size:12px;color:var(--muted)">scores[\"小红\"] → 直接按键找到 88，无需遍历</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建字典 scores：建立两个键值关联，\"小明\"→92，\"小红\"→88",
          state: { scores: { "小明": 92, "小红": 88 } }
        },
        {
          line: 2,
          explanation: "执行 scores[\"小红\"]：用键 \"小红\" 在字典中查找，直接命中值 88",
          state: { scores: { "小明": 92, "小红": 88 }, lookup: "\"小红\" → 88" }
        },
        {
          line: 2,
          explanation: "print 输出 88。查找完成，字典没有改变",
          state: { scores: { "小明": 92, "小红": 88 }, output: "88" }
        }
      ],

      walkthrough: [
        { line: 1, text: "创建字典：{“小明”: 92, “小红”: 88}。冒号左边是键，右边是值。" },
        { line: 2, text: "scores[\"小红\"]：用键查找。字典直接跳到“小红”这个词条（哈希定位），取出 88。" },
        { line: 2, text: "输出 88。注意：字典查找按键、不按位置，所以不在乎“小红”在字典里的先后顺序。" }
      ],

      realWorldExample: {
        title: "网站访问统计",
        problem: "统计每个用户访问网站的次数。用户的访问 ID 是字符串，次数是整数——天然适合映射：每次访问 user_counts[user_id] += 1。如果用列表，需要先遍历找这个人，再改次数，慢且啰嗦。",
        code: "visits = {}\nfor user in [\"alice\", \"bob\", \"alice\", \"alice\", \"bob\"]:\n    if user in visits:\n        visits[user] += 1\n    else:\n        visits[user] = 1\n\nprint(visits)\n# {'alice': 3, 'bob': 2}",
        language: "python",
        connections: ["control.conditionals", "collection.iteration"]
      },

      confusions: [
        {
          left: "映射（按键）",
          right: "列表（按位置）",
          explanation: "列表用整数索引，第 0、1、2... 个元素，元素有序。映射用任意键（通常字符串），无序，按键快速查找。需要「按名字/ID 找东西」时用映射，需要「按顺序处理一堆东西」时用列表。",
          leftExample: "scores = {\"小明\": 92}\nprint(scores[\"小明\"])  # 92 按键查",
          rightExample: "scores = [92, 88]\nprint(scores[0])  # 92 按位置查"
        },
        {
          left: "修改已有键",
          right: "新增键",
          explanation: "用已存在的键赋值是更新值；用不存在的键赋值是新增条目。两者语法相同（map[key] = value），但语义不同。检查是否已存在：Python 用 in，JS 用 hasOwnProperty 或 Map.has。",
          leftExample: "scores = {\"小明\": 92}\nscores[\"小明\"] = 95  # 更新：92 → 95",
          rightExample: "scores = {\"小明\": 92}\nscores[\"小红\"] = 88  # 新增条目"
        },
        {
          left: "哈希表",
          right: "有序表（TreeMap）",
          explanation: "大多数语言的 dict/Map 是哈希表：查找 O(1) 平均，但无序（或按插入序，非排序序）。少数（如 C++ std::map）是有序表：按键排序，查找 O(log n)。需要有序遍历时考虑后者。",
          leftExample: "// Python dict 是哈希表\n# 查找 O(1)，按键哈希定位",
          rightExample: "// C++ std::map 是有序树\n// 遍历按键从小到大，查找 O(log n)"
        }
      ],

      errors: [
        {
          code: "# Python\nscores = {\"小明\": 92}\nprint(scores[\"小红\"])",
          message: "崩溃：KeyError: '小红'",
          cause: "用不存在的键访问字典会抛 KeyError。字典不会像列表越界那样返回 undefined——Python 选择直接报错，提醒你键可能拼错了。",
          fix: "用 get() 提供默认值，或用 in 先检查键是否存在。",
          variantCode: "scores = {\"小明\": 92}\nprint(scores.get(\"小红\", 0))  # 0，不崩溃\n\n# 或先检查\nif \"小红\" in scores:\n    print(scores[\"小红\"])\nelse:\n    print(\"没有这个人\")"
        },
        {
          code: "// JavaScript\nconst obj = {};\nobj[1] = \"one\";\nobj[\"1\"] = \"uno\";\nconsole.log(Object.keys(obj).length);",
          message: "输出 1，而不是 2",
          cause: "普通 JS 对象的键会强制转成字符串，obj[1] 和 obj[\"1\"] 是同一个键。如果需要真正的数字键区分类型，要用 Map。",
          fix: "使用 Map：new Map()，键可以是任意类型且不做强制转换。",
          variantCode: "const m = new Map();\nm.set(1, \"one\");\nm.set(\"1\", \"uno\");\nconsole.log(m.size);  // 2，数字键和字符串键不同"
        }
      ],

      exercises: [
        {
          id: "collection.map.ex01",
          level: "A",
          type: "concept",
          question: "字典（映射）用什么来查找值？",
          options: [
            "整数位置",
            "键（key）",
            "值的大小",
            "插入顺序"
          ],
          answer: 1,
          feedback: "映射按「键」查找「值」。键是唯一的标识，值是关联的数据。"
        },
        {
          id: "collection.map.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nages = {\"a\": 20, \"b\": 30}\nages[\"a\"] = 21\nprint(ages[\"a\"])",
          options: ["20", "30", "21", "报错"],
          answer: 2,
          feedback: "ages[\"a\"] = 21 更新已存在的键 a 的值：20 → 21。输出 21。"
        },
        {
          id: "collection.map.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\ncounts = {}\nfor w in [\"a\", \"b\", \"a\"]:\n    counts[w] = counts.get(w, 0) + 1\nprint(counts[\"a\"])",
          options: ["1", "3", "报错", "2"],
          answer: 3,
          feedback: "a 出现两次：第一次 get 返回 0 + 1 = 1，第二次 get 返回 1 + 1 = 2。counts[\"a\"] = 2。"
        },
        {
          id: "collection.map.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，统计列表中每个数字出现的次数：",
          options: [
            "counts = {}\nfor n in nums:\n    counts[n] = counts.get(n, 0) + 1",
            "counts = {}\nfor n in nums:\n    counts[n] = 1",
            "counts = []\nfor n in nums:\n    counts[n] = counts.get(n, 0) + 1",
            "counts = {}\nfor n in nums:\n    counts.get(n, 0) + 1"
          ],
          answer: 0,
          feedback: "选项 0 正确：get(n, 0) 取当前计数（没有则 0），+1 后存回。选项 1 每次覆盖为 1，不累加；选项 2 用列表存数字键会出错；选项 3 没有赋值。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写代码：统计字符串 \"hello\" 中每个字符出现的次数，结果存进字典",
        hints: [
          "遍历字符串的每个字符",
          "用 dict.get(char, 0) + 1 累加",
          "结果应是 {'h':1, 'e':1, 'l':2, 'o':1}"
        ],
        solution: "text = \"hello\"\ncounts = {}\nfor ch in text:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)",
        solutionOutput: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}"
      },

      connections: {
        current: "集合",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">列表（按位置）</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">映射 ── 键值对 ── 哈希表</div>
  <div>│</div>
  <div style="color:var(--muted)">集合 Set / 对象</div>
</div>`,
        prerequisites: ["collection.array-list", "value.binding"],
        related: ["collection.set", "collection.iteration", "model.record-struct-class"],
        next: ["collection.set", "collection.filter-map-reduce"]
      },

      nextStep: {
        title: "集合 Set",
        description: "映射是「键→值」的关联。下一步学习集合 Set——只关心「某个值在不在里面」，不关心值关联什么。Set 和 Map 共享哈希思想，但用途不同：去重、成员判断。",
        targetId: "collection.set"
      }
    },

    // ================================================================
    // 黄金样板扩展 9：闭包（调用模型进阶）
    // ================================================================
    {
      id: "function.closure",
      estimatedTime: 14,
      difficulty: "intermediate",

      hook: {
        question: "函数返回后，它的局部变量还在吗？",
        code: "def make_counter():\n    count = 0\n    def increment():\n        count += 1\n        return count\n    return increment\n\nc = make_counter()\nprint(c())\nprint(c())",
        options: [
          "输出 1 和 1（每次从 0 开始）",
          "输出 1 和 2（count 被记住了）",
          "报错（count 不存在了）",
          "输出 0 和 0"
        ],
        answer: 1,
        explanation: "count 是 make_counter 的局部变量，但 make_counter 返回后 count 并没有消失——内部函数 increment 引用着它，形成了一个「闭包」。闭包把 count 和 increment 捆绑在一起，每次调用 c() 都在同一个 count 上加 1。这就是闭包的本质：函数 + 它捕获的环境。"
      },

      mentalModel: {
        title: "闭包是函数 + 随身携带的背包",
        description: "普通函数是一个「纯机器」：用完就走。闭包是一个「带背包的函数」：它捕获了创建时所在作用域的变量，把变量装进背包随身带走。即使外层函数已经返回，背包里的变量依然活着，而且每次调用共享同一个背包。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="text-align:center;border:2px solid var(--accent);border-radius:12px;padding:10px 20px">
    <div style="font-weight:700;color:var(--accent);font-size:15px">increment()</div>
    <div style="font-size:12px;color:var(--muted);margin-top:4px">return count</div>
  </div>
  <div style="font-size:22px">+</div>
  <div style="text-align:center;border:1px dashed var(--success);border-radius:12px;padding:10px 20px">
    <div style="font-size:12px;color:var(--muted)">随身背包（捕获的环境）</div>
    <div style="font-weight:700;color:var(--success);font-size:15px">count = 2</div>
    <div style="font-size:12px;color:var(--muted)">每次调用共享，持续累加</div>
  </div>
  <div style="font-size:12px;color:var(--muted)">闭包 = 函数 + 捕获的环境（背包）</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "定义外层函数 make_counter。此时只创建函数，未执行",
          state: { functions: { make_counter: "defined" } }
        },
        {
          line: 2,
          explanation: "调用 make_counter()：创建栈帧，局部变量 count 绑定到 0",
          state: { callStack: [{ func: "make_counter", count: 0 }] }
        },
        {
          line: 3,
          explanation: "定义内部函数 increment，它引用 count（捕获环境）。increment 没有被立即调用",
          state: { callStack: [{ func: "make_counter", count: 0 }], increment: "defined(captures count)" }
        },
        {
          line: 7,
          explanation: "make_counter 返回 increment。关键：count 没有随栈帧销毁——increment 的闭包把它留住了",
          state: { c: "increment (closure, count=0)" }
        },
        {
          line: 8,
          explanation: "调用 c()：闭包里的 count 从 0 变 1，返回 1",
          state: { c: "increment (closure, count=1)", output: "1" }
        },
        {
          line: 9,
          explanation: "再次调用 c()：同一个 count 从 1 变 2，返回 2",
          state: { c: "increment (closure, count=2)", output: "1\n2" }
        }
      ],

      walkthrough: [
        { line: 1, text: "定义 make_counter 函数。此时没有执行任何东西。" },
        { line: 2, text: "count = 0：创建局部变量。" },
        { line: 3, text: "定义 increment 函数。它内部引用了 count——这个引用就是「捕获」。" },
        { line: 7, text: "return increment：把内部函数作为返回值。返回时，count 被闭包捕获，不随栈帧销毁。" },
        { line: 8, text: "c() 第一次调用：闭包中的 count 0 → 1，返回 1。" },
        { line: 9, text: "c() 第二次调用：同一个 count 1 → 2，返回 2。这就是闭包「记住状态」的能力。" }
      ],

      realWorldExample: {
        title: "事件处理器携带参数",
        problem: "网页上有 3 个按钮，每个按钮点击时要打印自己的编号。如果用循环绑定，循环变量会被共享导致全部打印 3。闭包可以「为每个按钮捕获独立的编号」——这是闭包最经典的实际用途之一。",
        code: "def make_button_handler(btn_id):\n    def handle_click():\n        print(f'按钮 {btn_id} 被点击')\n    return handle_click\n\n# 模拟 3 个按钮\nhandlers = []\nfor i in range(1, 4):\n    handlers.append(make_button_handler(i))\n\n# 点击三个按钮\nhandlers[0]()  # 按钮 1 被点击\nhandlers[1]()  # 按钮 2 被点击\nhandlers[2]()  # 按钮 3 被点击",
        language: "python",
        connections: ["function.lambda", "function.higher-order"]
      },

      confusions: [
        {
          left: "闭包",
          right: "普通函数",
          explanation: "普通函数只依赖自己的参数和全局变量。闭包额外捕获了创建时所在作用域的局部变量，把这些变量「随身携带」。闭包是普通函数的超集——很多语言里的 lambda 实际都是闭包。",
          leftExample: "def outer(x):\n    def inner():\n        return x * 2  # 捕获 x\n    return inner\n\nf = outer(21)\nf()  # 42（x 被记住）",
          rightExample: "def plain(y):\n    return y * 2  # 只用参数\n\nplain(21)  # 42"
        },
        {
          left: "捕获变量",
          right: "复制变量",
          explanation: "闭包捕获的是变量本身（引用），不是值的副本。所以闭包内修改捕获的变量，会影响外层作用域（如果可修改）；不同闭包捕获同一个变量时会互相影响。循环中常见的「全部打印最后一个值」bug 就源于此。",
          leftExample: "def counter():\n    n = 0\n    def add():\n        nonlocal n  # 引用同一个 n\n        n += 1\n        return n\n    return add\n\nc = counter()\nc()  # 1（n 在变）",
          rightExample: "def counter():\n    n = 0\n    def add(n=n):  # 默认参数复制值\n        n += 1\n        return n\n    return add\n\nc = counter()\nc()  # 1\nc()  # 1（n 每次都从 0 开始）"
        },
        {
          left: "闭包的状态",
          right: "类的状态",
          explanation: "闭包和类都能「记住状态」。闭包用捕获变量 + 函数，轻量、私有（外部无法直接访问 count）。类用属性 + 方法，结构清晰、可扩展。小状态用闭包，复杂对象用类。",
          leftExample: "def counter():\n    n = 0\n    def inc():\n        nonlocal n\n        n += 1\n        return n\n    return inc\n\nc = counter()  # 轻量计数器",
          rightExample: "class Counter:\n    def __init__(self):\n        self.n = 0\n    def inc(self):\n        self.n += 1\n        return self.n\n\nc = Counter()  # 完整计数器对象"
        }
      ],

      errors: [
        {
          code: "// JavaScript 经典 bug\nconst buttons = [];\nfor (var i = 0; i < 3; i++) {\n    buttons.push(function() {\n        console.log(\"按钮 \" + i);\n    });\n}\nbuttons[0]();  // 期望：按钮 0",
          message: "输出 按钮 3（三个按钮都是 3）",
          cause: "var 声明的 i 是函数作用域（整个循环共享一个 i）。循环结束后 i = 3，所有闭包捕获的是同一个 i，点击任意按钮都打印 3。",
          fix: "用 let（块级作用域，每轮循环创建新的 i）或把 i 作为参数传入立即执行的函数。",
          variantCode: "// 方式 1：let 块级作用域\nfor (let i = 0; i < 3; i++) {\n    buttons.push(function() {\n        console.log(\"按钮 \" + i);\n    });\n}\n\n// 方式 2：参数捕获\nfor (var i = 0; i < 3; i++) {\n    (function(n) {\n        buttons.push(function() { console.log(\"按钮 \" + n); });\n    })(i);\n}"
        },
        {
          code: "# Python\ndef make_functions():\n    funcs = []\n    for i in range(3):\n        def f():\n            return i\n        funcs.append(f)\n    return funcs\n\nfs = make_functions()\nprint(fs[0]())",
          message: "输出 2，而不是 0",
          cause: "Python 闭包捕获变量 i 本身。循环结束后 i = 2，所有函数都返回 2。这与 JS var 的经典 bug 同源。",
          fix: "用默认参数在创建时固定值，或用工厂函数封装。",
          variantCode: "def make_functions():\n    funcs = []\n    for i in range(3):\n        def f(i=i):  # 默认参数：创建时复制 i 的值\n            return i\n        funcs.append(f)\n    return funcs\n\nfs = make_functions()\nprint(fs[0]())  # 0"
        }
      ],

      exercises: [
        {
          id: "function.closure.ex01",
          level: "A",
          type: "concept",
          question: "闭包是什么？",
          options: [
            "一个只有参数的函数",
            "函数 + 它捕获的外部变量",
            "一个类",
            "一个全局变量"
          ],
          answer: 1,
          feedback: "闭包 = 函数 + 捕获的环境。内部函数引用了外层函数的变量，这些变量被「随身携带」。"
        },
        {
          id: "function.closure.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ndef make():\n    x = 5\n    def get():\n        return x\n    return get\n\nf = make()\nprint(f())",
          options: ["5", "报错（x 不存在）", "None", "undefined"],
          answer: 0,
          feedback: "闭包捕获了 x=5。即使 make 已返回，get() 仍然能访问 x，输出 5。"
        },
        {
          id: "function.closure.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\ndef make_counter():\n    count = 0\n    def inc():\n        count += 1\n        return count\n    return inc\n\na = make_counter()\nb = make_counter()\na()\na()\nprint(b())",
          options: ["2", "0", "报错", "1"],
          answer: 3,
          feedback: "a 和 b 是两个独立的闭包，各有各的 count。a 调了两次（count=2），b 只调一次（count=1）。输出 1。"
        },
        {
          id: "function.closure.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，创建一个带初始值的计数器（从 10 开始）：",
          options: [
            "def make_counter(start):\n    def inc():\n        n = start\n        n += 1\n        return n\n    return inc",
            "def make_counter(start):\n    return start + 1",
            "def make_counter(start):\n    n = start\n    def inc():\n        n += 1\n        return n\n    return inc",
            "def make_counter():\n    n = 10\n    def inc():\n        n += 1\n        return n\n    return inc"
          ],
          answer: 2,
          feedback: "选项 0 正确：n = start 在闭包外初始化，inc 捕获并累加。选项 1 每次调用都重置 n=start。选项 2 不是闭包。选项 3 硬编码 10，无法自定义初始值。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个 make_multiplier(factor)，返回一个把参数乘以 factor 的函数（例如乘 2 的函数，输入 4 输出 8）",
        hints: [
          "外层函数接收 factor",
          "内层函数接收 x，返回 x * factor",
          "返回内层函数"
        ],
        solution: "def make_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\ndouble = make_multiplier(2)\ntriple = make_multiplier(3)\nprint(double(4))\nprint(triple(4))",
        solutionOutput: "8\n12"
      },

      connections: {
        current: "函数",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">函数定义</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">闭包 ── 捕获 ── 高阶函数</div>
  <div>│</div>
  <div style="color:var(--muted)">回调 / 迭代器</div>
</div>`,
        prerequisites: ["function.lambda", "value.semantics"],
        related: ["function.higher-order", "value.scope-lifetime", "collection.iteration"],
        next: ["function.higher-order", "function.recursion"]
      },

      nextStep: {
        title: "高阶函数与回调",
        description: "闭包让函数可以携带状态。下一步学习高阶函数：把函数当作参数传递、当作返回值返回——闭包 + 高阶函数组合出函数式编程的核心能力（map/filter/reduce 都依赖它们）。",
        targetId: "function.higher-order"
      }
    },

    // ================================================================
    // 黄金样板扩展 10：值语义 vs 引用语义（对象身份）
    // ================================================================
    {
      id: "value.semantics",
      estimatedTime: 12,
      difficulty: "intermediate",

      hook: {
        question: "把一个变量赋给另一个变量，它们是同一个东西吗？",
        code: "# Python\na = [1, 2]\nb = a\nb.append(3)\nprint(a)",
        options: [
          "输出 [1, 2]（b 是 a 的副本）",
          "输出 [1, 2, 3]（a 和 b 指向同一个列表）",
          "报错（列表不能赋值给另一个变量）",
          "输出 [1, 2, 3]（a 被复制并修改了副本）"
        ],
        answer: 1,
        explanation: "b = a 没有复制列表——它让 b 和 a 指向同一个列表对象。b.append(3) 修改的是这个共享的列表，所以 a 也看到了变化。这就是引用语义：变量存的是「对象的地址」（引用），不是对象本身。而数字、字符串等值类型，b = a 会真正复制值，互不影响。理解值/引用语义是无数 bug 的根源。"
      },

      mentalModel: {
        title: "值类型复制内容，引用类型共享对象",
        description: "值语义（数字、布尔、字符串、结构体）：赋值时复制内容，两个变量完全独立。引用语义（列表、字典、对象）：赋值时复制引用（地址），两个变量指向同一个对象——通过任一变量修改，另一方都看得到。判断依据：变量里存的是「值本身」还是「对象的地址」。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:16px;font-family:ui-monospace,Menlo,monospace;font-size:13px">
  <div style="display:flex;gap:32px">
    <div style="text-align:center">
      <div style="font-size:12px;color:var(--muted);margin-bottom:6px">值语义（数字）</div>
      <div style="display:flex;align-items:center;gap:12px">
        <div style="padding:4px 10px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">a</div>
        <div style="font-size:20px">→</div>
        <div style="padding:4px 10px;border:1px solid var(--line);border-radius:8px">5</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px">
        <div style="padding:4px 10px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">b</div>
        <div style="font-size:20px">→</div>
        <div style="padding:4px 10px;border:1px solid var(--line);border-radius:8px;color:var(--success)">5（副本）</div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">改 b 不影响 a</div>
    </div>
    <div style="text-align:center">
      <div style="font-size:12px;color:var(--muted);margin-bottom:6px">引用语义（列表）</div>
      <div style="display:flex;align-items:center;gap:12px">
        <div style="padding:4px 10px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">a</div>
        <div style="font-size:20px">→</div>
        <div style="padding:4px 10px;border:1px solid var(--line);border-radius:8px">[1,2]</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px">
        <div style="padding:4px 10px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">b</div>
        <div style="font-size:20px">→</div>
        <div style="padding:4px 10px;border:1px solid var(--line);border-radius:8px;color:var(--danger)">同一个对象</div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-top:4px">改 b 会影响 a</div>
    </div>
  </div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建列表 [1, 2]，变量 a 保存指向该列表的引用",
          state: { a: "→ [1, 2] (ref#1)" }
        },
        {
          line: 2,
          explanation: "b = a：复制引用。b 和 a 都指向 ref#1 同一个列表",
          state: { a: "→ [1, 2] (ref#1)", b: "→ [1, 2] (ref#1)" }
        },
        {
          line: 3,
          explanation: "b.append(3)：通过 b 修改共享列表内部，ref#1 变成 [1, 2, 3]",
          state: { a: "→ [1, 2, 3] (ref#1)", b: "→ [1, 2, 3] (ref#1)" }
        },
        {
          line: 4,
          explanation: "print(a)：a 指向同一个被修改的列表，输出 [1, 2, 3]",
          state: { a: "→ [1, 2, 3] (ref#1)", b: "→ [1, 2, 3] (ref#1)", output: "[1, 2, 3]" }
        }
      ],

      walkthrough: [
        { line: 1, text: "a = [1, 2]：创建列表对象，a 保存引用（内存地址）。" },
        { line: 2, text: "b = a：复制的是引用，不是列表内容。a 和 b 是同一个列表的两个名字。" },
        { line: 3, text: "b.append(3)：修改共享对象内部。ref#1 从 [1, 2] 变成 [1, 2, 3]。" },
        { line: 4, text: "print(a)：a 指向的还是 ref#1，所以看到 [1, 2, 3]。" }
      ],

      realWorldExample: {
        title: "配置共享与意外污染",
        problem: "多个函数共享同一个配置字典。如果某个函数修改了配置对象内部，其他函数都会受影响——这可能是特性（全局配置）也可能是 bug（意外污染）。理解引用语义后，需要修改时就应该显式复制（如 dict.copy() / 深拷贝）。",
        code: "# 共享配置\nconfig = {\"theme\": \"dark\", \"font_size\": 14}\n\n# 某处代码想自定义一个配置\nmy_config = config          # 复制引用，不是内容\nmy_config[\"font_size\"] = 20 # 修改共享对象！\n\nprint(config[\"font_size\"])   # 20 —— 全局配置被意外改了\n\n# 正确做法：复制内容\nmy_config = dict(config)\nmy_config[\"font_size\"] = 20\nprint(config[\"font_size\"])   # 14 —— 原配置不受影响",
        language: "python",
        connections: ["value.binding", "collection.copy"]
      },

      confusions: [
        {
          left: "值语义",
          right: "引用语义",
          explanation: "值语义：变量直接存值，赋值即复制，修改互不影响（int、float、bool、str、struct）。引用语义：变量存地址，赋值共享对象，修改互相可见（list、dict、object、slice）。",
          leftExample: "a = 5\nb = a\nb = 10\nprint(a)  # 5（互不影响）",
          rightExample: "a = [1, 2]\nb = a\nb.append(3)\nprint(a)  # [1, 2, 3]（共享）"
        },
        {
          left: "浅拷贝",
          right: "深拷贝",
          explanation: "浅拷贝复制对象本身，但内部嵌套的引用仍共享。深拷贝递归复制所有层，完全独立。修改浅拷贝的一层内容不影响原对象，但修改嵌套层（如列表里的列表）仍然共享。",
          leftExample: "a = [[1], [2]]\nb = a.copy()\nb[0].append(9)\nprint(a)  # [[1, 9], [2]] 嵌套共享",
          rightExample: "import copy\na = [[1], [2]]\nb = copy.deepcopy(a)\nb[0].append(9)\nprint(a)  # [[1], [2]] 完全独立"
        },
        {
          left: "== 比较",
          right: "=== / is 比较",
          explanation: "==（Python 的 ==、JS 的 ==/===）比较两个对象的内容是否相等。is / ===（JS 严格）比较是否同一个对象（引用相同）。内容相同但引用不同的两个对象，== 为真，is 为假。",
          leftExample: "a = [1, 2]\nb = [1, 2]\na == b  # True（内容相同）",
          rightExample: "a = [1, 2]\nb = [1, 2]\na is b  # False（不同对象）\na is a  # True（同一个对象）"
        }
      ],

      errors: [
        {
          code: "# Python\ndef add_item(lst):\n    lst.append(99)\n\nitems = [1, 2]\nadd_item(items)\nprint(items)  # 期望不受影响",
          message: "输出 [1, 2, 99]——函数「意外」修改了外部列表",
          cause: "lst 和 items 指向同一个列表（引用传递）。append 修改共享对象。如果函数不打算修改传入的对象，这会导致意外副作用。",
          fix: "函数内先复制：lst = list(lst)，或调用方传副本 add_item(items.copy())。",
          variantCode: "def add_item(lst):\n    lst = list(lst)  # 复制，隔离副作用\n    lst.append(99)\n    return lst\n\nitems = [1, 2]\nresult = add_item(items)\nprint(items)   # [1, 2]\nprint(result)  # [1, 2, 99]"
        },
        {
          code: "// JavaScript\nconst a = { x: 1 };\nconst b = a;\nb.x = 100;\nconsole.log(a.x);  // 期望 1",
          message: "输出 100——对象被「意外」修改",
          cause: "JS 对象也是引用语义，const 只禁止重新绑定 a，不禁止修改 a 指向的对象。b = a 复制引用，b.x = 100 修改共享对象。",
          fix: "复制对象再修改：b = { ...a }（浅拷贝）。注意嵌套对象仍共享。",
          variantCode: "const a = { x: 1 };\nconst b = { ...a };  // 浅拷贝\nb.x = 100;\nconsole.log(a.x);  // 1"
        }
      ],

      exercises: [
        {
          id: "value.semantics.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个类型在赋值时是「复制内容」（值语义）？",
          options: ["列表 list", "字典 dict", "整数 int", "对象 object"],
          answer: 2,
          feedback: "Python 的 int 是不可变值类型，赋值复制值。list/dict/object 都是引用类型。"
        },
        {
          id: "value.semantics.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\na = [1, 2]\nb = a\nb.append(3)\nprint(len(a))",
          options: ["2", "3", "报错", "0"],
          answer: 1,
          feedback: "b = a 复制引用，a 和 b 同一个列表。append 后列表有 3 个元素，len(a) = 3。"
        },
        {
          id: "value.semantics.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\na = 5\nb = a\nb = 10\nprint(a)",
          options: ["10", "报错", "None", "5"],
          answer: 3,
          feedback: "int 是值类型，b = a 复制值 5。b = 10 只改 b，a 仍是 5。"
        },
        {
          id: "value.semantics.ex04",
          level: "C",
          type: "fill",
          question: "修改以下代码，让 b 的修改不影响 a：",
          options: [
            "a = [1, 2]\nb = a[:]\nb.append(3)\nprint(a)",
            "a = [1, 2]\nb = a\nb.append(3)\nprint(a)",
            "a = [1, 2]\nb = a\nb = [1, 2, 3]\nprint(a)",
            "a = [1, 2]\nb = a.copy\nb.append(3)\nprint(a)"
          ],
          answer: 0,
          feedback: "a[:] 创建副本，b 指向新列表，append 不影响 a。选项 2 的 b = [1,2,3] 是重新绑定，确实不影响 a，但没展示副本。选项 3 a.copy 缺少括号调用。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写代码：创建列表 original = [1, 2]，复制一份为 copy_list（内容独立），在 copy_list 里加 3，打印 original 和 copy_list",
        hints: [
          "用切片 original[:] 或 list(original) 复制",
          "复制后 append 不影响原列表",
          "验证 original 仍是 [1, 2]"
        ],
        solution: "original = [1, 2]\ncopy_list = original[:]\ncopy_list.append(3)\nprint(original)   # [1, 2]\nprint(copy_list)  # [1, 2, 3]",
        solutionOutput: "[1, 2]\n[1, 2, 3]"
      },

      connections: {
        current: "值语义",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">变量绑定</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">值类型 ── 引用类型 ── 拷贝</div>
  <div>│</div>
  <div style="color:var(--muted)">可变性 / 参数传递</div>
</div>`,
        prerequisites: ["value.binding", "function.parameter-passing"],
        related: ["value.mutability", "collection.copy", "model.record-struct-class"],
        next: ["value.mutability", "collection.copy"]
      },

      nextStep: {
        title: "可变与不可变",
        description: "值/引用语义和「可变性」紧密相关：不可变类型天然安全（复制即独立），可变类型共享时需要小心。下一步学习可变与不可变的区别，以及不可变设计为何更安全。",
        targetId: "value.mutability"
      }
    },

    // ================================================================
    // 黄金样板扩展 11：递归（调用模型）
    // ================================================================
    {
      id: "function.recursion",
      estimatedTime: 14,
      difficulty: "intermediate",

      hook: {
        question: "一个函数能调用自己吗？",
        code: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))",
        options: [
          "报错（函数不能调用自己）",
          "输出 120（5! = 5×4×3×2×1）",
          "输出 15（5+4+3+2+1）",
          "无限循环直到崩溃"
        ],
        answer: 1,
        explanation: "函数当然可以调用自己——这叫递归。factorial(5) = 5 × factorial(4) = 5 × 4 × factorial(3) ... 直到 factorial(1) 返回 1（基线条件），然后逐层返回：1 → 2 → 6 → 24 → 120。递归的两个关键：基线条件（停止递归）和递推关系（把大问题缩小）。"
      },

      mentalModel: {
        title: "递归是俄罗斯套娃",
        description: "递归把大问题分解成「更小的同一个问题」。factorial(5) 打开一个套娃，里面是 factorial(4)，再里面是 factorial(3)……最小的那个（factorial(1)）直接有答案，然后一层层往回组装。每层调用都在调用栈上有自己的帧，栈帧展开直到基线条件，再逐层返回。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="font-weight:700;color:var(--accent)">factorial(5)</div>
  <div style="color:var(--muted)">= 5 ×</div>
  <div style="font-weight:700;color:var(--accent)">factorial(4)</div>
  <div style="color:var(--muted)">= 4 ×</div>
  <div style="font-weight:700;color:var(--accent)">factorial(3)</div>
  <div style="color:var(--muted)">= 3 ×</div>
  <div style="font-weight:700;color:var(--accent)">factorial(2)</div>
  <div style="color:var(--muted)">= 2 ×</div>
  <div style="font-weight:700;color:var(--success)">factorial(1) = 1 ← 基线</div>
  <div style="width:2px;height:10px;background:var(--line)"></div>
  <div style="font-size:12px;color:var(--muted)">逐层返回：1 → 2 → 6 → 24 → 120</div>
</div>`
      },

      executionSteps: [
        {
          line: 5,
          explanation: "调用 factorial(5)：创建栈帧，n=5。n <= 1 为假，计算 5 * factorial(4)",
          state: { callStack: [{ f: "factorial", n: 5 }] }
        },
        {
          line: 5,
          explanation: "调用 factorial(4)：新栈帧压栈。n=4，继续展开",
          state: { callStack: [{ f: "factorial", n: 5 }, { f: "factorial", n: 4 }] }
        },
        {
          line: 5,
          explanation: "继续展开：factorial(3) → factorial(2)",
          state: { callStack: [{ f: "factorial", n: 5 }, { f: "factorial", n: 4 }, { f: "factorial", n: 3 }, { f: "factorial", n: 2 }] }
        },
        {
          line: 2,
          explanation: "调用 factorial(1)：n <= 1 为真，命中基线条件，返回 1（不再递归）",
          state: { callStack: [{ f: "factorial", n: 5 }, { f: "factorial", n: 4 }, { f: "factorial", n: 3 }, { f: "factorial", n: 2 }, { f: "factorial", n: 1 }], result: 1 }
        },
        {
          line: 5,
          explanation: "栈帧逐层弹出：2×1=2 → 3×2=6 → 4×6=24 → 5×24=120",
          state: { callStack: [], result: 120 }
        },
        {
          line: 6,
          explanation: "print(factorial(5)) 输出 120",
          state: { result: 120, output: "120" }
        }
      ],

      walkthrough: [
        { line: 1, text: "定义 factorial 函数，参数 n。" },
        { line: 2, text: "if n <= 1: return 1 —— 基线条件。n 为 0 或 1 时直接给答案，不再递归。这是递归的终止保证。" },
        { line: 5, text: "return n * factorial(n - 1) —— 递推关系：把 n! 变成 n × (n-1)!。问题规模每次减 1。" },
        { line: 5, text: "调用 factorial(5) 时逐层展开到 factorial(1)，命中基线。" },
        { line: 6, text: "返回值逐层相乘组装：1 → 2 → 6 → 24 → 120，最终输出 120。" }
      ],

      realWorldExample: {
        title: "遍历目录树",
        problem: "文件系统的目录结构是树形：目录里有文件也有子目录。统计一个目录下所有文件的数量，天然适合递归——「统计当前目录」可以分解为「统计每个子目录」。任何树形结构（文件系统、DOM、JSON、组织架构）都适合递归处理。",
        code: "import os\n\ndef count_files(path):\n    total = 0\n    for entry in os.listdir(path):\n        full = os.path.join(path, entry)\n        if os.path.isdir(full):\n            total += count_files(full)  # 递归处理子目录\n        else:\n            total += 1\n    return total\n\nprint(count_files(\"/tmp/my_project\"))",
        language: "python",
        connections: ["function.parameter-passing", "collection.iteration"]
      },

      confusions: [
        {
          left: "递归",
          right: "迭代（循环）",
          explanation: "递归用函数自调用分解问题，代码简洁但每层有函数调用开销。迭代用循环显式管理状态，性能通常更好。任何递归都能改写成迭代（用显式栈），反之亦然。选择标准：树形/嵌套结构用递归，线性遍历用迭代。",
          leftExample: "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)",
          rightExample: "def fact(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result"
        },
        {
          left: "基线条件",
          right: "递推关系",
          explanation: "基线条件（base case）是递归停止的出口，必须直接返回答案。递推关系（recursive case）把问题缩小后再次调用自己。缺了基线 = 无限递归（栈溢出）；递推关系不缩小问题 = 永远达不到基线。两个都必须正确。",
          leftExample: "if n <= 1:\n    return 1  # 基线",
          rightExample: "return n * fact(n - 1)  # 递推：缩小规模"
        },
        {
          left: "栈溢出",
          right: "死循环",
          explanation: "递归没有基线会无限压栈，最终 RecursionError / StackOverflow（内存耗尽）。循环没有终止条件会无限循环（CPU 打满但内存不涨）。两者都是「程序跑不完」，但崩溃方式不同：递归爆栈，循环挂死。",
          leftExample: "def f(n):\n    return f(n + 1)  # 无基线\nf(0)  # RecursionError",
          rightExample: "while True:\n    pass  # 死循环\n# CPU 100%，不崩溃但挂死"
        }
      ],

      errors: [
        {
          code: "# Python\ndef factorial(n):\n    return n * factorial(n - 1)  # 没有基线条件\n\nprint(factorial(5))",
          message: "崩溃：RecursionError: maximum recursion depth exceeded",
          cause: "缺少基线条件。factorial 永远递归调用自己，栈帧无限增长，直到 Python 的递归深度限制（约 1000 层）被触发。",
          fix: "添加基线条件 if n <= 1: return 1，确保递归能终止。",
          variantCode: "def factorial(n):\n    if n <= 1:  # 基线条件\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # 120"
        },
        {
          code: "# Python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(40))",
          message: "运行极慢（可能几十秒），而不是瞬间出结果",
          cause: "朴素的斐波那契递归有大量重复计算：fib(40) 会重复计算 fib(38) 两次、fib(37) 三次……总调用次数约 2^40，指数爆炸。递归正确但不高效。",
          fix: "使用记忆化（缓存已算结果）或改为迭代。记忆化后 O(n)。",
          variantCode: "cache = {}\ndef fibonacci(n):\n    if n in cache:\n        return cache[n]\n    if n <= 1:\n        result = n\n    else:\n        result = fibonacci(n - 1) + fibonacci(n - 2)\n    cache[n] = result\n    return result\n\nprint(fibonacci(40))  # 102334155，瞬间"
        }
      ],

      exercises: [
        {
          id: "function.recursion.ex01",
          level: "A",
          type: "concept",
          question: "递归必须包含哪两个要素？",
          options: [
            "参数和返回值",
            "基线条件和递推关系",
            "循环和条件",
            "全局变量和局部变量"
          ],
          answer: 1,
          feedback: "基线条件停止递归并返回答案，递推关系把问题缩小后再次调用自己。缺一不可。"
        },
        {
          id: "function.recursion.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ndef f(n):\n    if n == 0:\n        return 0\n    return n + f(n - 1)\n\nprint(f(3))",
          options: ["3", "0", "6", "报错"],
          answer: 2,
          feedback: "f(3) = 3 + f(2) = 3 + 2 + f(1) = 3 + 2 + 1 + f(0) = 6。输出 6。"
        },
        {
          id: "function.recursion.ex03",
          level: "B",
          type: "read",
          question: "以下代码会怎样？\n\ndef g(n):\n    return g(n + 1)\n\nprint(g(0))",
          options: [
            "无限运行直到内存耗尽（栈溢出）",
            "正常输出 0",
            "输出 1",
            "立即崩溃但不报错"
          ],
          answer: 0,
          feedback: "没有基线条件，g 无限递归调用自己，栈帧不断增长，最终 RecursionError（栈溢出）。"
        },
        {
          id: "function.recursion.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，递归计算 1 到 n 的和：",
          options: [
            "def sum_to(n):\n    if n == 0:\n        return 0\n    return sum_to(n + 1)",
            "def sum_to(n):\n    return n + sum_to(n - 1)",
            "def sum_to(n):\n    total = 0\n    for i in range(n + 1):\n        total += i\n    return total",
            "def sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)"
          ],
          answer: 3,
          feedback: "选项 0 正确：基线 n==0 返回 0，递推 n + sum_to(n-1)。选项 1 是 n+1 越来越大，永不终止。选项 2 缺基线。选项 3 是迭代（也正确但非递归）。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个递归函数 power(base, exp)，计算 base 的 exp 次方（如 power(2, 3) = 8）",
        hints: [
          "基线：exp == 0 时返回 1",
          "递推：base * power(base, exp - 1)",
          "验证 power(2, 3) = 2×2×2 = 8"
        ],
        solution: "def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(2, 3))\nprint(power(5, 0))",
        solutionOutput: "8\n1"
      },

      connections: {
        current: "递归",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">函数调用</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">递归 ── 基线/递推 ── 调用栈</div>
  <div>│</div>
  <div style="color:var(--muted)">树遍历 / 分治</div>
</div>`,
        prerequisites: ["function.lambda", "control.conditionals"],
        related: ["function.parameter-passing", "function.higher-order", "collection.iteration"],
        next: ["function.higher-order", "collection.sort-search"]
      },

      nextStep: {
        title: "高阶函数与回调",
        description: "递归展示了函数自调用。下一步学习高阶函数——把函数作为参数传递、作为返回值返回。递归 + 高阶函数是函数式编程的两大基石，也是 map/filter/reduce 的基础。",
        targetId: "function.higher-order"
      }
    },

    // ================================================================
    // 黄金样板扩展 12：集合 Set（数据模型）
    // ================================================================
    {
      id: "collection.set",
      estimatedTime: 9,
      difficulty: "beginner",

      hook: {
        question: "如何快速判断「这个用户是否已经登录过」？",
        code: "users = {\"alice\", \"bob\"}\nprint(\"alice\" in users)\nprint(\"carol\" in users)",
        options: [
          "报错（集合不支持 in 判断）",
          "输出 True 和 False（集合按成员查找）",
          "输出 True 和 True",
          "输出 False 和 False"
        ],
        answer: 1,
        explanation: "集合（Set）只关心「成员在不在」，不关心顺序、不存重复值。\"alice\" in users 直接判断 alice 是否是集合成员：是 → True；\"carol\" 不在 → False。查找是哈希定位，平均 O(1)，比在列表里遍历查找（O(n)）快得多。"
      },

      mentalModel: {
        title: "集合是「成员名单」，不是清单",
        description: "集合像一张会员名单：只记录「谁在里面」，没有顺序、没有重复。你想知道的只有一件事：某某在不在名单上？往名单加人（add）和问某某在不在（in）都是瞬间完成。与列表不同，集合不关心第几个，只关心有没有。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="font-size:12px;color:var(--muted)">集合 users（成员名单）</div>
  <div style="display:flex;gap:10px">
    <div style="padding:8px 16px;border:2px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent)">alice</div>
    <div style="padding:8px 16px;border:2px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent)">bob</div>
  </div>
  <div style="font-size:20px;color:var(--muted)">"alice" in users → ✅ True</div>
  <div style="font-size:20px;color:var(--danger)">"carol" in users → ❌ False</div>
  <div style="font-size:12px;color:var(--muted)">无序、无重复、哈希查找 O(1)</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建集合 users：包含 alice 和 bob 两个成员（无序、去重）",
          state: { users: Set["alice", "bob"] }
        },
        {
          line: 2,
          explanation: "执行 \"alice\" in users：哈希定位，alice 在集合中，结果为 True",
          state: { users: Set["alice", "bob"], lookup: "alice → True" }
        },
        {
          line: 2,
          explanation: "输出 True",
          state: { users: Set["alice", "bob"], output: "True" }
        },
        {
          line: 3,
          explanation: "执行 \"carol\" in users：carol 不在集合中，结果为 False",
          state: { users: Set["alice", "bob"], lookup: "carol → False" }
        },
        {
          line: 3,
          explanation: "输出 False",
          state: { users: Set["alice", "bob"], output: "True\nFalse" }
        }
      ],

      walkthrough: [
        { line: 1, text: "创建集合：{“alice”, “bob”}。集合自动去重、不保证顺序。" },
        { line: 2, text: "“alice” in users：哈希定位成员，命中，结果 True，输出 True。" },
        { line: 3, text: "“carol” in users：不在集合中，结果 False，输出 False。" }
      ],

      realWorldExample: {
        title: "网站访客去重",
        problem: "统计今天有多少独立访客。用列表需要每次先遍历检查是否已存在（O(n)），数据量大时很慢；用集合自动去重，add 就是 O(1)，最后 len(visitors) 就是独立访客数。去重是集合最典型的应用。",
        code: "visitors = set()\nlogs = [\"alice\", \"bob\", \"alice\", \"carol\", \"bob\"]\n\nfor user in logs:\n    visitors.add(user)\n\nprint(visitors)\nprint(f\"独立访客: {len(visitors)}\")\n\n# 判断某人是否来过\nprint(\"bob\" in visitors)   # True\nprint(\"dave\" in visitors)  # False",
        language: "python",
        connections: ["collection.iteration", "collection.map"]
      },

      confusions: [
        {
          left: "集合 Set",
          right: "列表 List",
          explanation: "集合无序、无重复、哈希查找 O(1)，适合成员判断和去重。列表有序、允许重复、按索引访问，适合保存顺序和位置。选择依据：只关心「在不在」用集合，关心「第几个/顺序」用列表。",
          leftExample: "s = {1, 2, 3}\n1 in s  # True，O(1)",
          rightExample: "l = [1, 2, 3]\nl[0]  # 1，按位置\n1 in l  # O(n) 遍历"
        },
        {
          left: "集合 Set",
          right: "字典 Dict",
          explanation: "两者都是哈希结构，但集合只存「键」（成员），字典存「键值对」。集合的 add 对应字典的 d[k]=v；集合的 in 对应字典的 in（查键）。需要关联数据用字典，只需存在性用集合。",
          leftExample: "s = {\"a\", \"b\"}\n\"a\" in s  # True",
          rightExample: "d = {\"a\": 1}\n\"a\" in d  # True（查键）\nd[\"a\"]   # 1（取值）"
        },
        {
          left: "add（加成员）",
          right: "update（批量加）",
          explanation: "add 加单个元素；update（或 | 运算符）批量合并多个元素。重复添加相同元素不会报错也不会重复（集合天然去重）。",
          leftExample: "s = {1}\ns.add(2)\nprint(s)  # {1, 2}",
          rightExample: "s = {1}\ns.update([2, 3])\nprint(s)  # {1, 2, 3}"
        }
      ],

      errors: [
        {
          code: "# Python\ns = {1, 2, 3}\nprint(s[0])",
          message: "崩溃：TypeError: 'set' object is not subscriptable",
          cause: "集合没有顺序，不支持下标访问。你不能问「集合的第 0 个元素」——集合不保证任何顺序。",
          fix: "要按位置访问就用列表；只判断成员用 in；需要遍历所有成员用 for x in s。",
          variantCode: "s = {1, 2, 3}\n# 判断成员\nprint(2 in s)        # True\n# 遍历\nfor x in s:\n    print(x)          # 1 2 3（顺序不保证）\n# 要顺序？转列表排序\nprint(sorted(s))      # [1, 2, 3]"
        },
        {
          code: "# Python\ns = {1, 2}\ns.add([3, 4])",
          message: "崩溃：TypeError: unhashable type: 'list'",
          cause: "集合的成员必须是可哈希的（不可变类型）。列表可变，哈希值会变化，不能作为集合成员。",
          fix: "用不可变类型（元组 tuple）代替列表作为集合成员。",
          variantCode: "s = {1, 2}\ns.add((3, 4))  # 元组可哈希\nprint(s)  # {1, 2, (3, 4)}"
        }
      ],

      exercises: [
        {
          id: "collection.set.ex01",
          level: "A",
          type: "concept",
          question: "集合（Set）最适合解决什么问题？",
          options: [
            "按索引访问元素",
            "成员判断和去重",
            "保存有序数据",
            "键值关联"
          ],
          answer: 1,
          feedback: "集合的核心用途：快速判断「某成员在不在」和自动去重。按索引是列表，键值关联是字典。"
        },
        {
          id: "collection.set.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ns = {1, 2, 2, 3, 3, 3}\nprint(len(s))",
          options: ["6", "2", "3", "报错"],
          answer: 2,
          feedback: "集合自动去重，{1, 2, 2, 3, 3, 3} 实际是 {1, 2, 3}，len = 3。"
        },
        {
          id: "collection.set.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\ns = {\"a\", \"b\", \"c\"}\nprint(\"b\" in s)\nprint(\"z\" in s)",
          options: ["True\\nTrue", "False\\nFalse", "报错", "True\\nFalse"],
          answer: 3,
          feedback: "\"b\" 在集合中返回 True，\"z\" 不在返回 False。"
        },
        {
          id: "collection.set.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，删除列表中的重复元素（保持结果无序即可）：",
          options: [
            "unique = list(set(nums))",
            "unique = set(nums)\nunique = sorted(unique)",
            "unique = []\nfor n in nums:\n    if n not in unique:\n        unique.append(n)",
            "unique = nums.copy()"
          ],
          answer: 0,
          feedback: "选项 0 最简单：set(nums) 自动去重，再转回列表。选项 2 也正确（手动去重）但更繁琐。选项 1 排序了（题目不要求）。选项 3 没有去重。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写代码：找出两个列表的公共元素（交集）。例如 [1, 2, 3] 和 [2, 3, 4] 的公共元素是 {2, 3}",
        hints: [
          "把两个列表转成集合",
          "用 & 运算符求交集",
          "结果转回列表打印"
        ],
        solution: "a = [1, 2, 3]\nb = [2, 3, 4]\ncommon = list(set(a) & set(b))\nprint(common)",
        solutionOutput: "[2, 3]"
      },

      connections: {
        current: "集合",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">列表（有序）</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">集合 ── 去重 ── 哈希表</div>
  <div>│</div>
  <div style="color:var(--muted)">映射 / 位运算</div>
</div>`,
        prerequisites: ["collection.array-list", "value.binding"],
        related: ["collection.map", "collection.iteration", "collection.filter-map-reduce"],
        next: ["collection.filter-map-reduce", "collection.sort-search"]
      },

      nextStep: {
        title: "过滤、映射与归约",
        description: "集合解决了「在不在」的问题。下一步学习三个更强大的集合操作：过滤（留下满足条件的）、映射（变换每个元素）、归约（合并成一个值）——它们组合起来能优雅地处理大部分数据任务。",
        targetId: "collection.filter-map-reduce"
      }
    },

    // ================================================================
    // 黄金样板扩展 13：高阶函数（函数式模型）
    // ================================================================
    {
      id: "function.higher-order",
      estimatedTime: 13,
      difficulty: "intermediate",

      hook: {
        question: "函数可以作为参数传给另一个函数吗？",
        code: "# Python\ndef apply_twice(f, x):\n    return f(f(x))\n\ndef double(n):\n    return n * 2\n\nprint(apply_twice(double, 5))",
        options: [
          "报错（函数不能作为参数）",
          "输出 10（double(5)）",
          "输出 20（double(double(5))）",
          "输出 25（5×5）"
        ],
        answer: 2,
        explanation: "函数是「一等公民」：可以像普通值一样作为参数传递。apply_twice(double, 5) 把 double 函数传给 apply_twice，apply_twice 内部调用 f(f(x)) = double(double(5)) = double(10) = 20。接收函数作为参数或返回函数的函数叫高阶函数——map/filter/reduce、回调、装饰器都是它的应用。"
      },

      mentalModel: {
        title: "高阶函数是「函数的函数」",
        description: "普通函数操作数据（数字、字符串）；高阶函数操作函数本身——接收函数、返回函数，或两者兼有。就像一台「处理机器的机器」：你把一台小机器（函数）放进大机器（高阶函数），大机器用小机器加工数据。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;font-family:ui-monospace,Menlo,monospace;font-size:14px">
  <div style="font-size:12px;color:var(--muted)">把函数当参数传入</div>
  <div style="display:flex;align-items:center;gap:12px">
    <div style="padding:6px 14px;border:2px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent)">double</div>
    <div style="font-size:20px">→</div>
    <div style="padding:10px 20px;border:2px solid var(--success);border-radius:12px;text-align:center">
      <div style="font-weight:700;color:var(--success)">apply_twice</div>
      <div style="font-size:12px;color:var(--muted)">f(f(x))</div>
    </div>
    <div style="font-size:20px">→</div>
    <div style="padding:6px 14px;border:1px solid var(--line);border-radius:10px">结果</div>
  </div>
  <div style="font-size:12px;color:var(--muted)">double(5)=10 → double(10)=20</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "定义 apply_twice 函数：参数 f（函数）和 x（值），返回 f(f(x))",
          state: { functions: { apply_twice: "defined(f, x) → f(f(x))", double: "defined(n) → n*2" } }
        },
        {
          line: 7,
          explanation: "调用 apply_twice(double, 5)：把函数 double 和值 5 传给参数 f 和 x",
          state: { callStack: [{ func: "apply_twice", f: "double", x: 5 }] }
        },
        {
          line: 2,
          explanation: "执行 f(f(x))：先算内层 f(x) = double(5) = 10",
          state: { callStack: [{ func: "apply_twice", f: "double", x: 5 }, { func: "double", n: 5 }], inner: 10 }
        },
        {
          line: 2,
          explanation: "再算外层 f(10) = double(10) = 20，返回 20",
          state: { callStack: [{ func: "apply_twice", f: "double", x: 5 }, { func: "double", n: 10 }], result: 20 }
        },
        {
          line: 7,
          explanation: "print 输出 20",
          state: { result: 20, output: "20" }
        }
      ],

      walkthrough: [
        { line: 1, text: "定义 apply_twice(f, x)：第一个参数是函数 f，第二个是值 x。函数体是 f(f(x))。" },
        { line: 4, text: "定义 double(n)：一个普通函数，返回 n*2。" },
        { line: 7, text: "apply_twice(double, 5)：把 double 当作值传入。此时 f=double, x=5。" },
        { line: 2, text: "f(f(x))：先算 f(5)=double(5)=10，再算 f(10)=double(10)=20。返回 20。" },
        { line: 7, text: "输出 20。函数作为参数的机制：高阶函数内部通过参数名调用传入的函数。" }
      ],

      realWorldExample: {
        title: "排序时的自定义比较器",
        problem: "给一组学生按分数排序。排序函数本身不知道「按什么排序」，它接收一个比较函数（或键函数）作为参数——这就是高阶函数。同样的 sort，传入不同的 key 函数就能按分数、姓名或年龄排序，排序逻辑本身不用重写。",
        code: "students = [\n    {\"name\": \"小明\", \"score\": 92},\n    {\"name\": \"小红\", \"score\": 88},\n    {\"name\": \"小刚\", \"score\": 95},\n]\n\n# 把 key 函数传给 sorted（高阶函数）\nby_score = sorted(students, key=lambda s: s[\"score\"])\nby_name = sorted(students, key=lambda s: s[\"name\"])\n\nprint([s[\"name\"] for s in by_score])  # 按分数升序\nprint([s[\"name\"] for s in by_name])   # 按姓名排序",
        language: "python",
        connections: ["function.closure", "collection.sort-search"]
      },

      confusions: [
        {
          left: "高阶函数",
          right: "普通函数",
          explanation: "普通函数操作数据（接收数据、返回数据）。高阶函数操作函数：接收函数作为参数、返回函数，或两者兼有。map/sorted/sorted 的 key、回调函数都是高阶函数的例子。",
          leftExample: "def double(n):\n    return n * 2  # 普通函数",
          rightExample: "def apply_twice(f, x):\n    return f(f(x))  # 高阶：f 是函数\n\nsorted(students, key=lambda s: s[\"score\"])"
        },
        {
          left: "函数作为参数",
          right: "函数调用作为参数",
          explanation: "传「函数本身」不给括号（double），传「调用结果」给括号（double(5)）。前者是值传递（函数对象），后者先执行再传结果。搞混会导致把结果当函数调用或把函数当结果使用。",
          leftExample: "apply_twice(double, 5)  # 传函数 double 本身",
          rightExample: "apply_twice(double(5), x)  # 传结果 10（语义错误）"
        },
        {
          left: "回调",
          right: "同步调用",
          explanation: "回调是把函数传给另一个函数，由对方在适当时候调用（如事件触发时）。同步调用是自己直接调用。回调的核心是「控制反转」：调用时机由接收方决定。",
          leftExample: "button.onclick = handle_click\n# 点击时才调用 handle_click",
          rightExample: "handle_click()  # 立即调用"
        }
      ],

      errors: [
        {
          code: "# Python\nnumbers = [1, 2, 3, 4]\nresult = map(lambda n: n * 2, numbers)\nprint(result)",
          message: "输出 <map object at 0x...>，而不是 [2, 4, 6, 8]",
          cause: "Python 3 的 map 返回惰性迭代器，不会立即计算结果。直接 print 打印的是对象本身，需要转成列表（list(map(...))）或用 for 循环消费。",
          fix: "用 list() 包裹 map/filter 的结果，或直接用列表推导式。",
          variantCode: "numbers = [1, 2, 3, 4]\nresult = list(map(lambda n: n * 2, numbers))\nprint(result)  # [2, 4, 6, 8]\n\n# 或更地道的列表推导式\nresult = [n * 2 for n in numbers]"
        },
        {
          code: "// JavaScript\nfunction process(fn, x) {\n    return fn(x);\n}\nconsole.log(process(double(5), 3));",
          message: "崩溃：fn is not a function",
          cause: "double(5) 是函数调用，传入的是结果 10 而不是函数 double。process 把 10 当作函数调用 fn(x) → 报错。传函数时不能加括号。",
          fix: "process(double, 3)——传函数本身，不带括号。",
          variantCode: "function process(fn, x) {\n    return fn(x);\n}\nconsole.log(process(double, 3));  // 6\n// 若要传 double(5) 的结果，process 应接收值而非函数"
        }
      ],

      exercises: [
        {
          id: "function.higher-order.ex01",
          level: "A",
          type: "concept",
          question: "以下哪个是高阶函数？",
          options: [
            "def double(n): return n * 2",
            "def apply(f, x): return f(x)",
            "def add(a, b): return a + b",
            "x = 5"
          ],
          answer: 1,
          feedback: "apply(f, x) 接收函数 f 作为参数，是高阶函数。double 和 add 只操作普通值。"
        },
        {
          id: "function.higher-order.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ndef apply(f, x):\n    return f(x)\n\ndef square(n):\n    return n * n\n\nprint(apply(square, 4))",
          options: ["4", "8", "16", "报错"],
          answer: 2,
          feedback: "apply(square, 4) 把 square 传给 f，执行 f(4) = square(4) = 16。"
        },
        {
          id: "function.higher-order.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\nnums = [1, 2, 3]\nresult = list(map(lambda n: n + 10, nums))\nprint(result)",
          options: ["[1, 2, 3]", "<map object>", "报错", "[11, 12, 13]"],
          answer: 3,
          feedback: "map 把 lambda 应用到每个元素：1+10=11, 2+10=12, 3+10=13。list() 消耗迭代器得到 [11, 12, 13]。"
        },
        {
          id: "function.higher-order.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，让 repeat(f, n, x) 返回把 f 应用 n 次的结果（如 repeat(double, 2, 5) = 20）：",
          options: [
            "def repeat(f, n, x):\n    result = x\n    for _ in range(n):\n        result = f(result)\n    return result",
            "def repeat(f, n, x):\n    return f(x)",
            "def repeat(f, n, x):\n    for _ in range(n):\n        x = f(x)\n    return f(x)",
            "def repeat(f, n, x):\n    return f(f(f(x)))"
          ],
          answer: 0,
          feedback: "选项 0 正确：循环 n 次，每次把结果再应用 f。选项 1 只应用一次。选项 2 应用了 n 次但最后又多一次 f。选项 3 固定 3 次。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写一个高阶函数 make_adder(n)，返回一个把参数加上 n 的函数（如 add5 = make_adder(5)，add5(3) = 8）",
        hints: [
          "make_adder 返回一个函数",
          "返回的函数接收 x，返回 x + n",
          "这同时用到了闭包"
        ],
        solution: "def make_adder(n):\n    def adder(x):\n        return x + n\n    return adder\n\nadd5 = make_adder(5)\nprint(add5(3))\nprint(add5(10))",
        solutionOutput: "8\n15"
      },

      connections: {
        current: "高阶函数",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">闭包 / 一等函数</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">高阶函数 ── 回调 ── map/filter/reduce</div>
  <div>│</div>
  <div style="color:var(--muted)">装饰器 / 事件驱动</div>
</div>`,
        prerequisites: ["function.lambda", "function.closure"],
        related: ["function.parameter-passing", "collection.filter-map-reduce", "function.recursion"],
        next: ["collection.filter-map-reduce", "function.recursion"]
      },

      nextStep: {
        title: "过滤、映射与归约",
        description: "高阶函数最有名的应用就是集合三件套。下一步学习 filter（按条件筛选）、map（逐元素变换）、reduce（归约合并）——用函数式的方式优雅处理数据，替代手写循环。",
        targetId: "collection.filter-map-reduce"
      }
    },

    // ================================================================
    // 黄金样板扩展 14：过滤/映射/归约（数据流水线）
    // ================================================================
    {
      id: "collection.filter-map-reduce",
      estimatedTime: 12,
      difficulty: "intermediate",

      hook: {
        question: "如何优雅地处理一个数据列表？",
        code: "scores = [82, 47, 91, 55, 68]\npassed = [s for s in scores if s >= 60]\nprint(passed)",
        options: [
          "报错（列表推导式不合法）",
          "输出 [82, 47, 91, 55, 68]（全部保留）",
          "输出 [82, 91, 68]（只留 >= 60 的）",
          "输出 [47, 55]（只留 < 60 的）"
        ],
        answer: 2,
        explanation: "列表推导式/高阶函数让集合处理变成一行：for 遍历每个元素，if 过滤条件，前面的表达式决定保留什么。这本质是 filter（过滤）：[s for s in scores if s >= 60] 留下所有 >= 60 的元素。加上变换（map）和归约（reduce），就能用声明式风格处理数据，比手写循环更清晰、更少出错。"
      },

      mentalModel: {
        title: "数据流水线：过滤 → 变换 → 归约",
        description: "想象一条工厂流水线：原料（原始集合）先过筛子（filter 按条件留下），再进加工机（map 变换每个元素），最后进打包机（reduce 合并成单个结果）。每一步都是独立的、可组合的，数据从一端流入，结果从另一端出来。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;font-family:ui-monospace,Menlo,monospace;font-size:13px">
  <div style="font-size:12px;color:var(--muted)">原始数据</div>
  <div style="display:flex;gap:6px">
    <div style="padding:4px 10px;border:1px solid var(--line);border-radius:6px">82</div>
    <div style="padding:4px 10px;border:1px solid var(--line);border-radius:6px">47</div>
    <div style="padding:4px 10px;border:1px solid var(--line);border-radius:6px">91</div>
    <div style="padding:4px 10px;border:1px solid var(--line);border-radius:6px">55</div>
    <div style="padding:4px 10px;border:1px solid var(--line);border-radius:6px">68</div>
  </div>
  <div style="font-size:18px">↓ filter: s >= 60</div>
  <div style="display:flex;gap:6px">
    <div style="padding:4px 10px;border:1px solid var(--success);border-radius:6px;color:var(--success)">82</div>
    <div style="padding:4px 10px;border:1px solid var(--success);border-radius:6px;color:var(--success)">91</div>
    <div style="padding:4px 10px;border:1px solid var(--success);border-radius:6px;color:var(--success)">68</div>
  </div>
  <div style="font-size:18px">↓ map: s + 5（加分）</div>
  <div style="display:flex;gap:6px">
    <div style="padding:4px 10px;border:1px solid var(--accent);border-radius:6px;color:var(--accent)">87</div>
    <div style="padding:4px 10px;border:1px solid var(--accent);border-radius:6px;color:var(--accent)">96</div>
    <div style="padding:4px 10px;border:1px solid var(--accent);border-radius:6px;color:var(--accent)">73</div>
  </div>
  <div style="font-size:18px">↓ reduce: 求和</div>
  <div style="padding:6px 16px;border:2px solid var(--accent);border-radius:8px;font-weight:700;color:var(--accent)">256</div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "创建列表 scores：五个分数",
          state: { scores: [82, 47, 91, 55, 68] }
        },
        {
          line: 2,
          explanation: "列表推导式开始：遍历 scores。s=82 满足 s>=60，保留",
          state: { scores: [82, 47, 91, 55, 68], passing: [82] }
        },
        {
          line: 2,
          explanation: "s=47 不满足 s>=60，丢弃；s=91 满足，保留；s=55 丢弃；s=68 保留",
          state: { scores: [82, 47, 91, 55, 68], passing: [82, 91, 68] }
        },
        {
          line: 2,
          explanation: "推导式完成，passing 绑定到 [82, 91, 68]",
          state: { scores: [82, 47, 91, 55, 68], passing: [82, 91, 68] }
        },
        {
          line: 3,
          explanation: "print(passed) 输出 [82, 91, 68]",
          state: { passing: [82, 91, 68], output: "[82, 91, 68]" }
        }
      ],

      walkthrough: [
        { line: 1, text: "创建分数列表。" },
        { line: 2, text: "[s for s in scores if s >= 60]：推导式结构 = [表达式 for 变量 in 集合 if 条件]。依次检查每个 s：82、91、68 满足条件保留，47、55 丢弃。" },
        { line: 2, text: "推导式结果绑定到 passed：[82, 91, 68]。" },
        { line: 3, text: "print(passed) 输出结果。" }
      ],

      realWorldExample: {
        title: "订单数据处理流水线",
        problem: "电商后台需要处理订单列表：筛出已支付订单 → 提取金额 → 计算总额和平均额。用 filter + map + reduce 组合成一条清晰的流水线，每一阶段独立可读，比一个巨大的手写循环容易维护得多。",
        code: "orders = [\n    {\"id\": 1, \"paid\": True,  \"amount\": 199},\n    {\"id\": 2, \"paid\": False, \"amount\": 59},\n    {\"id\": 3, \"paid\": True,  \"amount\": 350},\n    {\"id\": 4, \"paid\": True,  \"amount\": 89},\n]\n\npaid_amounts = [o[\"amount\"] for o in orders if o[\"paid\"]]\ntotal = sum(paid_amounts)\naverage = total / len(paid_amounts)\n\nprint(f\"已支付订单 {len(paid_amounts)} 笔，总额 ¥{total}，平均 ¥{average:.1f}\")",
        language: "python",
        connections: ["collection.iteration", "function.higher-order"]
      },

      confusions: [
        {
          left: "filter（过滤）",
          right: "map（映射）",
          explanation: "filter 按条件筛选元素，集合长度可能变短，元素本身不变。map 对每个元素做变换，长度不变，元素内容改变。filter 的返回值和条件相关，map 的返回值和变换函数相关。",
          leftExample: "passed = [s for s in scores if s >= 60]\n# [82, 91, 68]（变短）",
          rightExample: "doubled = [s * 2 for s in scores]\n# [164, 94, ...]（长度不变）"
        },
        {
          left: "reduce（归约）",
          right: "map/filter",
          explanation: "map 和 filter 返回新集合，reduce 把集合合并成单个值（求和、求积、拼接）。reduce 是「集合 → 单值」，map/filter 是「集合 → 集合」。Python 的 sum()、max()、min() 都是内置的归约。",
          leftExample: "total = sum(scores)  # 归约：列表 → 单值",
          rightExample: "passed = filter(...)  # 集合 → 集合\ndoubled = map(...)   # 集合 → 集合"
        },
        {
          left: "列表推导式",
          right: "生成器表达式",
          explanation: "列表推导式 [x for x in ...] 立即生成完整列表（占用内存）。生成器表达式 (x for x in ...) 惰性逐个产出（省内存，适合大数据）。两者语法只差括号，但求值时机不同。",
          leftExample: "[n * 2 for n in range(10)]\n# 立即生成 10 个元素的列表",
          rightExample: "(n * 2 for n in range(10))\n# 惰性：用的时候才逐个算"
        }
      ],

      errors: [
        {
          code: "# Python\nscores = [82, 47, 91]\nresult = [s for s in scores if s >= 60 else s * 10]",
          message: "崩溃：SyntaxError: invalid syntax",
          cause: "列表推导式的 if 是过滤条件，不是三目表达式。想「满足保留、不满足变换」应该把条件放进表达式部分：s if s >= 60 else s * 10（三目）放在 for 之前。",
          fix: "三目表达式放前面：[(s if s >= 60 else s * 10) for s in scores]。",
          variantCode: "scores = [82, 47, 91]\n# 过滤 + 变换混合\nresult = [s if s >= 60 else s * 10 for s in scores]\nprint(result)  # [82, 470, 91]\n\n# 或分开写更清晰\nresult = [s * 10 for s in scores if s < 60] + [s for s in scores if s >= 60]"
        },
        {
          code: "# Python\nwords = [\"apple\", \"banana\", \"cherry\"]\nlengths = [len(w) for w in words]\nprint(sum(lengths))  # 18\n# 但有人写成：\nprint(len([len(w) for w in words]))",
          message: "输出 3（单词个数），而不是 18（字符总数）",
          cause: "len(列表) 计算的是元素个数，不是元素内容之和。lengths 是 [5, 6, 6]，sum 是 18，len 是 3。混淆 sum 和 len 是常见错误——先想清楚要「求和」还是「计数」。",
          fix: "要总字符数用 sum(len(w) for w in words)；要单词数用 len(words)。",
          variantCode: "words = [\"apple\", \"banana\", \"cherry\"]\ntotal_chars = sum(len(w) for w in words)\nword_count = len(words)\nprint(total_chars)  # 18\nprint(word_count)   # 3"
        }
      ],

      exercises: [
        {
          id: "collection.filter-map-reduce.ex01",
          level: "A",
          type: "concept",
          question: "filter（过滤）操作会改变集合的什么？",
          options: [
            "元素内容",
            "集合类型",
            "什么都不改变",
            "元素个数（可能减少）"
          ],
          answer: 3,
          feedback: "filter 按条件筛选，可能减少元素个数，但不会改变保留元素的本身内容。"
        },
        {
          id: "collection.filter-map-reduce.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\nnums = [1, 2, 3, 4, 5]\nresult = [n * n for n in nums if n % 2 == 0]\nprint(result)",
          options: ["[1, 4, 9, 16, 25]", "[2, 4]", "[4, 16]", "[1, 9, 25]"],
          answer: 2,
          feedback: "先过滤偶数（2, 4），再平方：2²=4, 4²=16。结果是 [4, 16]。"
        },
        {
          id: "collection.filter-map-reduce.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\nnums = [3, 1, 4, 1, 5]\nprint(sum(nums))",
          options: ["5", "14", "15", "报错"],
          answer: 1,
          feedback: "sum 是归约操作：3+1+4+1+5 = 14。"
        },
        {
          id: "collection.filter-map-reduce.ex04",
          level: "C",
          type: "fill",
          question: "补全代码：计算列表中所有正数的平方和（如 [1, -2, 3] → 1²+3² = 10）：",
          options: [
            "total = sum(n * n for n in nums if n > 0)",
            "total = sum(n for n in nums if n > 0)",
            "total = [n * n for n in nums if n > 0]",
            "total = sum(n * n for n in nums)"
          ],
          answer: 0,
          feedback: "选项 0 正确：过滤正数 → 平方 → 求和，一条表达式。选项 1 只求和没平方。选项 2 结果是列表不是和。选项 3 没过滤负数。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "用一行代码：从字符串列表 words 中选出长度 >= 4 的单词，转成大写，拼接成逗号分隔字符串（如 [\"hi\", \"hello\"] → \"HELLO\"）",
        hints: [
          "先过滤 len(w) >= 4",
          "再变换 w.upper()",
          "最后用 join 拼接"
        ],
        solution: "words = [\"hi\", \"hello\", \"world\", \"ok\"]\nresult = \", \".join(w.upper() for w in words if len(w) >= 4)\nprint(result)",
        solutionOutput: "HELLO, WORLD"
      },

      connections: {
        current: "集合处理",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">遍历 / 高阶函数</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">filter ── map ── reduce</div>
  <div>│</div>
  <div style="color:var(--muted)">推导式 / 排序查找</div>
</div>`,
        prerequisites: ["collection.iteration", "function.higher-order"],
        related: ["function.higher-order", "collection.sort-search", "collection.map"],
        next: ["collection.sort-search", "collection.copy"]
      },

      nextStep: {
        title: "排序、查找与去重",
        description: "filter/map/reduce 解决「怎么处理」的问题。下一步学习排序（order）、查找（search）与去重（unique）——数据整理三件套，与过滤/映射/归约组合成完整的数据处理工具箱。",
        targetId: "collection.sort-search"
      }
    },

    // ================================================================
    // 黄金样板扩展 15：try/catch/finally（异常处理模型）
    // ================================================================
    {
      id: "error.try-catch",
      estimatedTime: 12,
      difficulty: "intermediate",

      hook: {
        question: "程序可能出错，怎么保证资源一定会被释放？",
        code: "try:\n    file = open(\"data.txt\")\n    data = file.read()\nexcept FileNotFoundError:\n    print(\"文件不存在\")\nfinally:\n    print(\"清理完成\")",
        options: [
          "finally 只会在没出错时执行",
          "无论成功还是出错，finally 都会执行",
          "finally 和 except 不能同时使用",
          "finally 会在 except 之前执行"
        ],
        answer: 1,
        explanation: "try/except/finally 是异常处理的完整结构：try 放可能出错的代码，except 处理特定异常，finally 放「无论发生什么都必须执行」的清理代码。即使 try 中抛异常、except 处理了，finally 依然会执行——这是释放文件、关闭连接等资源清理的标准机制。"
      },

      mentalModel: {
        title: "try 是安全区，finally 是最后防线",
        description: "把 try 块想象成高风险作业区：出错时系统抛出红色信号球（异常）。except 是接球手，按异常类型接住并处理。finally 是「无论如何都会执行」的收尾程序——即使没有异常、即使异常没被接住、即使有 return，finally 都保证执行。它专门用来清理资源。",
        diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;font-family:ui-monospace,Menlo,monospace;font-size:13px">
  <div style="text-align:center">
    <div style="padding:8px 20px;border:2px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent)">try 块</div>
    <div style="font-size:12px;color:var(--muted);margin-top:4px">可能出错的代码</div>
  </div>
  <div style="font-size:18px">出错时 ↓</div>
  <div style="text-align:center">
    <div style="padding:8px 20px;border:2px solid var(--success);border-radius:10px;font-weight:700;color:var(--success)">except 块</div>
    <div style="font-size:12px;color:var(--muted);margin-top:4px">处理特定异常</div>
  </div>
  <div style="font-size:18px">无论是否出错 ↓</div>
  <div style="text-align:center">
    <div style="padding:8px 20px;border:2px solid var(--danger);border-radius:10px;font-weight:700;color:var(--danger)">finally 块</div>
    <div style="font-size:12px;color:var(--muted);margin-top:4px">清理资源，保证执行</div>
  </div>
</div>`
      },

      executionSteps: [
        {
          line: 1,
          explanation: "进入 try 块，尝试打开文件 data.txt",
          state: { file: undefined }
        },
        {
          line: 2,
          explanation: "文件不存在，open() 抛出 FileNotFoundError",
          state: { file: undefined, exception: "FileNotFoundError" }
        },
        {
          line: 3,
          explanation: "except FileNotFoundError 捕获异常，进入处理分支",
          state: { file: undefined, handler: "except FileNotFoundError" }
        },
        {
          line: 4,
          explanation: "print(\"文件不存在\") 执行，异常处理完成",
          state: { output: "文件不存在" }
        },
        {
          line: 6,
          explanation: "finally 块执行：print(\"清理完成\")。无论异常与否，finally 保证执行",
          state: { output: "文件不存在\n清理完成" }
        }
      ],

      walkthrough: [
        { line: 1, text: "try: 开始监控块。open(\"data.txt\") 尝试打开文件。" },
        { line: 2, text: "文件不存在 → open() 抛出 FileNotFoundError。异常对象沿调用链抛出。" },
        { line: 3, text: "except FileNotFoundError: 捕获匹配类型的异常，进入处理块。" },
        { line: 4, text: "输出「文件不存在」。except 块结束，异常处理完成。" },
        { line: 6, text: "finally: 无论 try 成功、except 处理、还是异常未捕获，finally 都执行。输出「清理完成」。" }
      ],

      realWorldExample: {
        title: "数据库连接释放",
        problem: "数据库连接是稀缺资源，用完必须释放，否则连接池耗尽导致系统崩溃。try/finally 保证：即使查询出错，连接也一定归还给连接池。这是所有后端系统的标准资源管理模式。",
        code: "def query_user(db, user_id):\n    conn = db.connect()\n    try:\n        return conn.query(f\"SELECT * FROM users WHERE id = {user_id}\")\n    finally:\n        conn.close()  # 无论查询成败都释放连接\n    # return 之前会先执行 finally\n\n# 更现代的写法：with 语句自动管理\nwith db.connect() as conn:\n    result = conn.query(\"SELECT 1\")\nprint(result)",
        language: "python",
        connections: ["error.exception-vs-result", "function.parameter-passing"]
      },

      confusions: [
        {
          left: "except",
          right: "finally",
          explanation: "except 处理异常（根据类型决定如何响应），finally 无条件执行清理（不处理异常，只保证资源释放）。except 可能被跳过（没异常时），finally 永远执行。",
          leftExample: "try:\n    risky()\nexcept ValueError:\n    print(\"处理异常\")  # 有异常才执行",
          rightExample: "try:\n    risky()\nfinally:\n    cleanup()  # 永远执行"
        },
        {
          left: "捕获所有异常",
          right: "捕获特定异常",
          explanation: "except Exception 捕获所有异常，但会掩盖未知错误（把 bug 当正常情况处理）。except ValueError 只捕获特定类型，让意外错误继续向上传播。生产代码应优先捕获特定异常。",
          leftExample: "try:\n    int(s)\nexcept Exception:\n    print(\"出错\")  # 掩盖所有错误",
          rightExample: "try:\n    int(s)\nexcept ValueError:\n    print(\"不是数字\")  # 只处理转换错误"
        },
        {
          left: "try/finally",
          right: "with（上下文管理器）",
          explanation: "try/finally 手动释放资源；with 语句自动调用资源的 __enter__/__exit__，无论异常与否都自动清理。with 是 try/finally 的语法糖，更简洁更不容易漏。",
          leftExample: "conn = db.connect()\ntry:\n    conn.query(\"...\")\nfinally:\n    conn.close()",
          rightExample: "with db.connect() as conn:\n    conn.query(\"...\")  # 自动 close"
        }
      ],

      errors: [
        {
          code: "# Python\ntry:\n    x = int(\"abc\")\nexcept ValueError:\n    print(\"转换失败\")\nfinally:\n    print(\"清理\")",
          message: "输出「转换失败」和「清理」——顺序对吗？",
          cause: "顺序是：异常抛出 → except 处理 → finally 执行。所以先输出「转换失败」，再输出「清理」。finally 在 except 之后执行，不是之前。",
          fix: "理解执行顺序：try → (异常? except) → finally。若 except 中有 return，finally 仍在 return 之前执行。",
          variantCode: "def f():\n    try:\n        return \"正常\"\n    finally:\n        print(\"清理先执行\")\n\nprint(f())\n# 输出：清理先执行 → 正常"
        },
        {
          code: "# Python\nfile = open(\"data.txt\", \"w\")\ntry:\n    file.write(\"hello\")\nexcept:\n    pass\n# 忘记 close！",
          message: "文件句柄泄漏——程序长时间运行可能耗尽文件描述符",
          cause: "写文件后忘记 close。try/except 处理了异常但没释放资源。文件可能没被保存（缓冲未刷新）或句柄泄漏。",
          fix: "用 finally 保证 close，或用 with 语句自动管理。",
          variantCode: "# 方式 1：try/finally\nfile = open(\"data.txt\", \"w\")\ntry:\n    file.write(\"hello\")\nfinally:\n    file.close()\n\n# 方式 2：with（推荐）\nwith open(\"data.txt\", \"w\") as file:\n    file.write(\"hello\")"
        }
      ],

      exercises: [
        {
          id: "error.try-catch.ex01",
          level: "A",
          type: "concept",
          question: "finally 块中的代码什么时候执行？",
          options: [
            "只在没有异常时",
            "只在有异常时",
            "无论是否发生异常都执行",
            "只在 return 时"
          ],
          answer: 2,
          feedback: "finally 保证执行：无异常、有异常、有 return 三种情况都会先执行 finally。"
        },
        {
          id: "error.try-catch.ex02",
          level: "B",
          type: "output",
          question: "以下代码输出什么？\n\ntry:\n    x = int(\"abc\")\nexcept ValueError:\n    print(\"A\")\nfinally:\n    print(\"B\")\nprint(\"C\")",
          options: ["B\\nA\\nC", "A\\nC\\nB", "A\\nB", "A\\nB\\nC"],
          answer: 3,
          feedback: "异常 → except 输出 A → finally 输出 B → 程序继续输出 C。顺序是 A、B、C。"
        },
        {
          id: "error.try-catch.ex03",
          level: "B",
          type: "read",
          question: "以下代码输出什么？\n\ndef f():\n    try:\n        return \"ok\"\n    finally:\n        print(\"cleanup\")\n\nprint(f())",
          options: ["ok\\ncleanup", "cleanup\\nok", "ok", "cleanup"],
          answer: 1,
          feedback: "return \"ok\" 先被求值，但 return 之前会先执行 finally 输出「cleanup」，然后才返回 ok 输出「ok」。"
        },
        {
          id: "error.try-catch.ex04",
          level: "C",
          type: "fill",
          question: "补全代码，读取文件时保证无论是否出错都关闭文件：",
          options: [
            "file = open(\"data.txt\")\ntry:\n    data = file.read()\nfinally:\n    file.close()",
            "file = open(\"data.txt\")\nfile.read()\nfile.close()",
            "try:\n    file = open(\"data.txt\")\n    data = file.read()\nexcept:\n    file.close()",
            "file = open(\"data.txt\")\ntry:\n    data = file.read()\nexcept:\n    file.close()"
          ],
          answer: 0,
          feedback: "选项 0 正确：try 读文件，finally 无条件关闭。选项 2/3 只在异常时关闭，正常路径泄漏；选项 1 出错时不会执行 close。"
        }
      ],

      challenge: {
        title: "30 秒挑战",
        prompt: "写代码：尝试把 input_str 转成整数，成功输出「转换成功: 值」，失败输出「不是数字」，最后无论成败都输出「完成」",
        hints: [
          "try 里 int(input_str)",
          "except ValueError 输出提示",
          "finally 输出「完成」"
        ],
        solution: "input_str = \"42\"\ntry:\n    n = int(input_str)\n    print(f\"转换成功: {n}\")\nexcept ValueError:\n    print(\"不是数字\")\nfinally:\n    print(\"完成\")",
        solutionOutput: "转换成功: 42\n完成"
      },

      connections: {
        current: "错误处理",
        diagram: `<div style="text-align:center;font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:2.2">
  <div style="color:var(--muted)">异常模型</div>
  <div>│</div>
  <div style="font-weight:700;color:var(--accent);font-size:16px">try ── except ── finally</div>
  <div>│</div>
  <div style="color:var(--muted)">资源释放 / 自定义异常</div>
</div>`,
        prerequisites: ["error.exception-vs-result", "function.lambda"],
        related: ["error.custom-types", "error.propagation", "error.resource-release"],
        next: ["error.custom-types", "error.propagation"]
      },

      nextStep: {
        title: "自定义错误类型",
        description: "try/except 能处理内置异常。下一步学习自定义异常：如何定义自己的异常类型，携带业务上下文信息（如订单号、错误码），让错误处理更精确、错误信息更有价值。",
        targetId: "error.custom-types"
      }
    }
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
