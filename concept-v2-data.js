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
