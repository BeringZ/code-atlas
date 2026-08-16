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
