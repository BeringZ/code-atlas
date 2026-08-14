// Code Atlas 2.0 — 基础知识点主干数据（知识点主干 + 多语言表示）
// 依据《Code Atlas 2.0 产品策划与内容架构执行文档》：18 个语言无关基础模块（B00-B17）
window.CODE_ATLAS_2 = {
  "site": {
    "name": "Code Atlas 2.0",
    "tagline": "以知识点为主干的多语言编程知识体系",
    "version": "2.0（执行基线 V1.0）"
  },
  "languages": [
    { "id": "python", "name": "Python", "version": "3.13", "tag": "PY", "color": "#3776ab" },
    { "id": "javascript", "name": "JavaScript", "version": "ES2024", "tag": "JS", "color": "#f7df1e" },
    { "id": "java", "name": "Java", "version": "21+", "tag": "JAVA", "color": "#e76f00" },
    { "id": "cpp", "name": "C++", "version": "C++20", "tag": "C++", "color": "#659ad2" },
    { "id": "go", "name": "Go", "version": "1.23+", "tag": "GO", "color": "#00add8" },
    { "id": "rust", "name": "Rust", "version": "2024 Edition", "tag": "RUST", "color": "#dea584" }
  ],
  "modules": [
    { "id": "B00", "title": "编程与运行模型", "objective": "先建立「代码如何变成行为」的认知，而不是直接背语法。", "icon": "⚙️", "prereq": [], "concepts": ["runtime.program-entry", "runtime.compile-interpret", "runtime.errors-kinds", "runtime.tooling-roles", "runtime.minimal-program"] },
    { "id": "B01", "title": "开发环境与工具链", "objective": "让学习者能够独立创建、运行、调试和管理项目。", "icon": "🛠️", "prereq": ["B00"], "concepts": ["env.install", "env.version-manager", "env.editor-lsp", "env.cli-run", "env.debugger", "env.formatter-linter", "env.package-manager", "env.project-template", "env.environment-vars"] },
    { "id": "B02", "title": "值、变量与类型", "objective": "理解数据在程序中的表示、约束、可变性和生命周期。", "icon": "🔢", "prereq": ["B00"], "concepts": ["value.binding", "value.constants", "value.primitive-types", "value.string-bytes", "value.static-dynamic", "value.type-inference", "value.mutability", "value.conversion", "value.nullability", "value.semantics", "value.scope-lifetime", "value.numeric-edge"] },
    { "id": "B03", "title": "表达式与运算符", "objective": "将计算规则写成可预测、可读的表达式。", "icon": "➕", "prereq": ["B02"], "concepts": ["expr.arithmetic", "expr.comparison", "expr.logic-shortcircuit", "expr.assignment", "expr.index-slice", "expr.conditional-expr", "expr.precedence", "expr.coercion", "expr.float-precision"] },
    { "id": "B04", "title": "控制流", "objective": "把业务规则转换为分支、重复和状态变化。", "icon": "🔀", "prereq": ["B02", "B03"], "concepts": ["control.conditionals", "control.match", "control.loops", "control.iteration-protocol", "control.break-continue", "control.early-return", "control.recursion", "control.comprehension", "control.state-machine"] },
    { "id": "B05", "title": "函数与过程抽象", "objective": "通过函数边界组织行为、数据流和副作用。", "icon": "ƒ", "prereq": ["B02", "B04"], "concepts": ["function.declare-call", "function.parameters-return", "function.named-default", "function.variadic", "function.parameter-passing", "function.overload", "function.first-class", "function.lambda", "function.closure", "function.recursion", "function.pure-side-effect", "function.higher-order"] },
    { "id": "B06", "title": "字符串、文本与正则", "objective": "正确处理 Unicode、文本构造、搜索与解析。", "icon": "🔤", "prereq": ["B02"], "concepts": ["string.unicode", "string.encoding", "string.immutability", "string.concat-format", "string.index-slice", "string.search-replace", "string.case-whitespace", "string.builder", "string.regex", "string.parsing-validation"] },
    { "id": "B07", "title": "集合与迭代", "objective": "掌握序列、集合、映射及其常见操作和复杂度。", "icon": "🗂️", "prereq": ["B02", "B04"], "concepts": ["collection.array-list", "collection.tuple", "collection.set", "collection.map", "collection.stack-queue", "collection.iteration", "collection.crud", "collection.copy", "collection.sort-search", "collection.filter-map-reduce", "collection.equality-hash", "collection.complexity"] },
    { "id": "B08", "title": "数据建模与面向对象", "objective": "用数据结构、方法和抽象边界表达领域对象。", "icon": "🧱", "prereq": ["B02", "B05", "B07"], "concepts": ["model.record-struct-class", "model.construct", "model.field-property-method", "model.encapsulation", "model.static-instance", "model.inheritance", "model.composition", "model.interface-trait"] },
    { "id": "B09", "title": "错误处理与资源管理", "objective": "把失败路径、清理动作和恢复策略纳入主流程。", "icon": "🛡️", "prereq": ["B02", "B05"], "concepts": ["error.kinds", "error.exception-vs-result", "error.try-catch", "error.propagation", "error.custom-types", "error.assertions", "error.resource-release", "error.raii-defer", "error.retry-timeout"] },
    { "id": "B10", "title": "模块、包与依赖", "objective": "理解代码边界、命名空间、可见性和第三方依赖。", "icon": "📦", "prereq": ["B00", "B05"], "concepts": ["module.define-import", "module.namespace", "module.public-private", "module.relative-absolute", "module.dependency-lockfile", "module.semver", "module.registry", "module.cycle", "module.artifact-publish"] },
    { "id": "B11", "title": "文件、数据格式与输入输出", "objective": "让程序和磁盘、终端及外部数据进行可靠交互。", "icon": "💾", "prereq": ["B02", "B05", "B09"], "concepts": ["io.std-streams", "io.paths", "io.text-binary", "io.streams-buffering", "io.formats", "io.serialization", "io.cli-args", "io.config-env", "io.temp-permissions", "io.encoding-crossplatform"] },
    { "id": "B12", "title": "泛型与类型抽象", "objective": "在保持类型安全的同时复用算法和数据结构。", "icon": "🔧", "prereq": ["B02", "B05", "B07", "B08"], "concepts": ["generic.functions", "generic.type-params", "generic.bounds", "generic.inference", "generic.union-optional", "generic.variance", "generic.erasure", "generic.monomorphization", "generic.alias-newtype", "generic.when-not"] },
    { "id": "B13", "title": "并发、异步与协作任务", "objective": "理解多个任务如何执行、通信、取消和避免竞争。", "icon": "⚡", "prereq": ["B02", "B05", "B11"], "concepts": ["concurrency.models", "concurrency.sync-async", "concurrency.spawn-await", "concurrency.shared-message", "concurrency.locks", "concurrency.channel", "concurrency.future-promise", "concurrency.cancel-timeout", "concurrency.races-deadlock", "concurrency.immutability"] },
    { "id": "B14", "title": "网络与 API 基础", "objective": "建立客户端/服务端、协议和数据交换的共同模型。", "icon": "🌐", "prereq": ["B11", "B12", "B13"], "concepts": ["net.tcp-ip", "net.http", "net.http-methods", "net.status-codes", "net.headers-body", "net.json-api", "net.http-client", "net.rest", "net.websocket", "net.auth", "net.timeout-retry"] },
    { "id": "B15", "title": "测试、调试与可观测性", "objective": "通过反馈系统验证正确性并定位问题。", "icon": "🧪", "prereq": ["B05", "B09"], "concepts": ["test.structure", "test.assertions", "test.boundary", "test.parametrized", "test.fixtures", "test.mocks", "test.integration", "test.logging", "test.debugger", "test.profiling", "test.coverage"] },
    { "id": "B16", "title": "数据结构与算法", "objective": "使用语言可切换的实现学习抽象结构与复杂度。", "icon": "📐", "prereq": ["B02", "B04", "B07"], "concepts": ["ds.complexity", "ds.array-linked", "ds.stack-queue", "ds.hash-table", "ds.tree-heap", "ds.graph", "ds.search", "ds.sort", "ds.recursion-divide", "ds.backtracking", "ds.greedy", "ds.dp", "ds.bfs-dfs", "ds.union-shortest"] },
    { "id": "B17", "title": "工程化与代码质量", "objective": "从「能运行」提升到可维护、可协作、可发布。", "icon": "🏗️", "prereq": ["B10", "B15"], "concepts": ["eng.style", "eng.responsibility", "eng.refactor", "eng.docs", "eng.project-layout", "eng.config", "eng.build-test-release", "eng.git", "eng.ci", "eng.supply-chain", "eng.performance-measure", "eng.cross-platform"] }
  ],
  "concepts": [
    // ============ 深做样板 1：变量绑定与可变性 ============
        {
      "id": "value.binding",
      "status": "published",
      "module_id": "B02",
      "title": "变量绑定与可变性",
      "objectives": [
        "区分「声明变量」与「给变量重新赋值」",
        "理解可变与不可变绑定的差异及各自适用场景",
        "能在六种语言中写出等价的绑定与赋值"
      ],
      "prerequisites": [
        "runtime.minimal-program"
      ],
      "core": "变量是「名字到值」的绑定。关键认知：不同语言对「绑定是否可被重新指向新值」有不同默认。Python/JavaScript/Java/C++/Go 的变量默认可变，可直接重新赋值；Rust 默认不可变（let 绑定的变量不能重新赋值，需 let mut）。此外还有一层：变量指向的「值/对象本身」是否可变（如 const 对象、final 字段、C++ const 引用），与「绑定是否可变」是两个正交概念。初学阶段先把两件事分开：① 名字能否指向新值（重新绑定）；② 名字指向的值能否被修改（突变）。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "count = 0\ncount = count + 1\nprint(count)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        },
        "javascript": {
          "minimal_code": "let count = 0;\ncount = count + 1;\nconsole.log(count);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        },
        "java": {
          "minimal_code": "int count = 0;\ncount = count + 1;\nSystem.out.println(count);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        },
        "cpp": {
          "minimal_code": "int count = 0;\ncount = count + 1;\nstd::cout << count;",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        },
        "go": {
          "minimal_code": "count := 0\ncount = count + 1\nfmt.Println(count)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        },
        "rust": {
          "minimal_code": "let mut count = 0;\ncount += 1;\nprintln!(\"{}\", count);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "rebind",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Rust\nlet x = 1;\nx = 2;",
          "message": "error[E0384]: cannot assign twice to immutable variable `x`",
          "cause": "Rust 默认绑定不可变，直接赋值被编译器拒绝。",
          "fix": "改为 let mut x = 1; 或使用遮蔽 let x = 2;"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "「绑定可变」与「值/对象可变」是同一个概念吗？",
          "options": [
            "只与语言相关",
            "绑定总是可变的",
            "是",
            "否，两者正交：绑定指名字能否重指，值可变指对象内部能否修改"
          ],
          "answer": 3,
          "feedback": "两者正交：const 对象属性可变、let mut 引用不可变对象，都是反例。"
        },
        {
          "type": "read",
          "question": "Java 中 final List<String> list = new ArrayList<>(); 后执行 list.add(\"x\") 会怎样？",
          "options": [
            "list 变为 null",
            "运行时异常",
            "正常执行（final 只约束绑定）",
            "编译错误"
          ],
          "answer": 2,
          "feedback": "final 只禁止重新指向，对象内部仍可修改。"
        },
        {
          "type": "pair",
          "question": "下面哪种写法在 Rust 中允许重新赋值？",
          "options": [
            "fn f() { let x = 1; }",
            "let mut x = 1; x = 2;",
            "let x = 1; x = 2;",
            "const x = 1;"
          ],
          "answer": 1,
          "feedback": "只有 mut 绑定允许重新赋值。"
        }
      ],
      "deep_dive": "在 Rust 中，可变性影响借用规则：&mut 需要唯一可变借用，而不可变绑定可被任意共享。在 Java/C++ 中，final/const 主要是编译期意图约束；Rust 的 mut 与所有权系统深度耦合，能阻止数据竞争。",
      "summary": "一句话模型：变量是「名字→值」的绑定；绑定可变性与值可变性正交，Rust 默认前者不可变，其余五语言默认可变。",
      "next": [
        "value.constants",
        "value.semantics"
      ],
      "related_advanced": [
        "rust.ownership-borrowing",
        "cpp.value-categories"
      ],
      "level": "L3"
    },
    // ============ 深做样板 2：条件分支 ============
        {
      "id": "control.conditionals",
      "status": "published",
      "module_id": "B04",
      "title": "条件分支：if 与模式匹配",
      "objectives": [
        "用条件分支把业务规则写成可读的执行路径",
        "对比 if/else 与 switch/match 的适用场景",
        "理解模式匹配比 if 链更强的表达能力"
      ],
      "prerequisites": [
        "expr.comparison",
        "expr.logic-shortcircuit"
      ],
      "core": "条件分支让程序根据布尔条件选择执行路径。if/else 是通用形式；当判断「同一值的多种取值」时，switch（Java/Go/C++/JS）与 match（Rust/Python 3.10+）更聚焦。模式匹配的进阶价值在于：不仅匹配值，还能解构结构（如 Option/Result/元组），且编译器（Rust）能检查穷尽性。选择依据：条件复杂用 if；单一值多分支用 switch/match；需要解构或穷尽性保证用 match。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "score = 75\nif score >= 90:\n    grade = \"A\"\nelif score >= 60:\n    grade = \"B\"\nelse:\n    grade = \"C\"\nprint(grade)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "branch",
              "start": 2,
              "end": 6
            },
            {
              "role": "print",
              "start": 7,
              "end": 7
            }
          ]
        },
        "javascript": {
          "minimal_code": "const score = 75;\nlet grade;\nif (score >= 90) grade = \"A\";\nelse if (score >= 60) grade = \"B\";\nelse grade = \"C\";\nconsole.log(grade);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "branch",
              "start": 2,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "java": {
          "minimal_code": "int score = 75;\nString grade;\nif (score >= 90) grade = \"A\";\nelse if (score >= 60) grade = \"B\";\nelse grade = \"C\";\nSystem.out.println(grade);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "branch",
              "start": 2,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "cpp": {
          "minimal_code": "int score = 75;\nstd::string grade;\nif (score >= 90) grade = \"A\";\nelse if (score >= 60) grade = \"B\";\nelse grade = \"C\";\nstd::cout << grade;",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "branch",
              "start": 2,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "go": {
          "minimal_code": "score := 75\nvar grade string\nif score >= 90 { grade = \"A\" } else if score >= 60 { grade = \"B\" } else { grade = \"C\" }\nfmt.Println(grade)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "branch",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "rust": {
          "minimal_code": "let score = 75;\nlet grade = if score >= 90 { \"A\" } else if score >= 60 { \"B\" } else { \"C\" };\nprintln!(\"{}\", grade);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "branch",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Rust\nlet x = Some(3);\nmatch x {\n    Some(n) => println!(\"{n}\"),\n}",
          "message": "error[E0004]: non-exhaustive patterns: `None` not covered",
          "cause": "match 未穷尽 Option 的所有分支。",
          "fix": "补上 None => ... 分支，或用 if let Some(n) = x。"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "哪种语言用 match 时，漏掉一个枚举分支会直接编译失败？",
          "options": [
            "JavaScript",
            "Python",
            "Go",
            "Rust"
          ],
          "answer": 3,
          "feedback": "Rust 的 match 要求穷尽性，漏分支编译报错；Go 的 switch 不要求。"
        },
        {
          "type": "read",
          "question": "Go 的 switch 分支是否需要显式 break？",
          "options": [
            "只有 default 需要",
            "需要",
            "取决于编译器",
            "不需要，自动跳出"
          ],
          "answer": 3,
          "feedback": "Go 的 switch 每个分支自动跳出，无需 break，这是与 Java/C++/JS 的重要差异。"
        },
        {
          "type": "diagnose",
          "question": "JS switch 中忘记 break 会发生什么？",
          "options": [
            "运行时异常",
            "case 穿透：后续分支继续执行",
            "switch 被忽略",
            "编译错误"
          ],
          "answer": 1,
          "feedback": "JS 的 switch 有 fall-through 行为，忘记 break 会继续执行后续 case。"
        }
      ],
      "deep_dive": "模式匹配（Rust match / Python match）的能力远超 switch：可匹配字面量、范围、结构体/元组解构、绑定变量、守卫条件（if 附加）。编译器穷尽性检查把「漏掉分支」从运行时错误提前到编译期。",
      "summary": "一句话模型：if 处理复杂条件，switch/match 处理单一值的多分支；Rust/Python 的 match 还能解构并强制穷尽。",
      "next": [
        "control.loops",
        "control.match"
      ],
      "related_advanced": [
        "rust.enum-pattern",
        "python.container-iteration"
      ],
      "level": "L3"
    },
    // ============ 深做样板 3：参数传递模型（文档指定样板） ============
        {
      "id": "function.parameter-passing",
      "status": "published",
      "module_id": "B05",
      "title": "参数传递模型",
      "objectives": [
        "预测函数内重新绑定和修改对象对调用方的影响",
        "避免「按值/按引用」的口号化误判",
        "能对比六种语言的实际传递语义"
      ],
      "prerequisites": [
        "value.binding",
        "function.declare-call",
        "value.semantics"
      ],
      "core": "调用函数时，参数如何进入函数体？核心问题是：函数内「重新绑定参数名」和「修改参数指向的对象」分别对调用方有什么影响。所有语言在底层都做「值传递」，但「值」是什么取决于变量语义：基本类型传值副本；对象/引用类型传的是「引用值」的副本——两者共享同一对象，因此修改对象对调用方可见，而重新绑定参数名只影响函数内。Rust 特殊：默认移动所有权（move），或借用（& 不可变 / &mut 可变），编译器限制别名与并发修改。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "def change(lst):\n    lst.append(1)\n\nnums = [1, 2]\nchange(nums)\nprint(len(nums))",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 2
            },
            {
              "role": "declare",
              "start": 4,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "javascript": {
          "minimal_code": "function change(lst) { lst.push(1); }\nconst nums = [1, 2];\nchange(nums);\nconsole.log(nums.length);",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "java": {
          "minimal_code": "import java.util.*;\nimport java.util.function.Consumer;\nList<Integer> nums = new ArrayList<>(List.of(1, 2));\nConsumer<List<Integer>> change = (lst) -> lst.add(1);\nchange.accept(nums);\nSystem.out.println(nums.size());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 3,
              "end": 3
            },
            {
              "role": "define",
              "start": 4,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <vector>\nstd::vector<int> nums = {1, 2};\nauto change = [](std::vector<int>& lst) { lst.push_back(1); };\nchange(nums);\nstd::cout << nums.size();",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "define",
              "start": 3,
              "end": 3
            },
            {
              "role": "call",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "go": {
          "minimal_code": "nums := []int{1, 2}\nchange := func(lst []int) { lst = append(lst, 1) }\nchange(nums)\nfmt.Println(len(nums))",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "rust": {
          "minimal_code": "let mut nums = vec![1, 2];\nlet change = |lst: &mut Vec<i32>| lst.push(1);\nchange(&mut nums);\nprintln!(\"{}\", nums.len());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Rust\nfn main() {\n    let s = String::from(\"hi\");\n    take_ownership(s);\n    println!(\"{}\", s); // 使用已移动的变量\n}",
          "message": "error[E0382]: borrow of moved value: `s`",
          "cause": "String 的所有权在传参时被移动，s 已失效。",
          "fix": "传引用 take_ownership(&s)，或克隆 take_ownership(s.clone())。"
        },
        {
          "code": "// Java\npublic static void main(String[] args) {\n    int x = 1;\n    change(x);\n    System.out.println(x); // 仍是 1\n}",
          "message": "输出 1 而非 2（无异常）",
          "cause": "Java 基本类型按值传递，函数内修改不影响外部。",
          "fix": "需要外部可见的修改：返回新值或使用引用类型/容器。"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "Java 中「对象按引用传递」的说法正确吗？",
          "options": [
            "不正确，应为「引用按值传递」",
            "正确",
            "仅对 String 正确",
            "仅对数组正确"
          ],
          "answer": 0,
          "feedback": "Java 所有参数按值传递；对象参数复制的是引用值，所以共享对象可被修改，但重新绑定不影响外部。"
        },
        {
          "type": "read",
          "question": "Python 中 def f(lst): lst.append(1); lst = [9]；调用 a=[]; f(a) 后 a 的值？",
          "options": [
            "[]",
            "报错",
            "[1]",
            "[9]"
          ],
          "answer": 2,
          "feedback": "append 修改共享对象（外部可见），重新绑定 lst 只影响函数内，故 a 为 [1]。"
        },
        {
          "type": "pair",
          "question": "哪种语言的默认行为是「参数移动所有权」？",
          "options": [
            "Java",
            "Go",
            "Python",
            "Rust"
          ],
          "answer": 3,
          "feedback": "Rust 默认移动所有权，调用后原变量失效；其余语言默认共享/拷贝。"
        },
        {
          "type": "diagnose",
          "question": "C++ 中需要函数内修改调用方变量且避免拷贝，应该？",
          "options": [
            "传 const T&",
            "用全局变量",
            "传 T&（引用）",
            "按值传递"
          ],
          "answer": 2,
          "feedback": "T& 引用可修改外部变量；const T& 只读防拷贝；按值传副本。"
        }
      ],
      "deep_dive": "六语言的本质统一：底层都是值传递，差异在「值的语义」——Python/JS/Java/Go 传引用值（共享对象）、C++ 显式选择值/引用/指针、Rust 用所有权系统把「共享可变」变成编译期错误。理解这一点就能解释绝大多数跨语言 bug。",
      "summary": "一句话模型：参数都是按值传的，区别在于值是否共享对象——Rust 更进一步，用所有权让共享和修改在编译期可见。",
      "next": [
        "function.closure",
        "value.semantics"
      ],
      "related_advanced": [
        "python.object-model",
        "cpp.value-categories",
        "rust.ownership-borrowing",
        "go.slice-map-memory"
      ],
      "level": "L3"
    },
    // ============ 深做样板 4：集合遍历与迭代 ============
        {
      "id": "collection.iteration",
      "status": "published",
      "module_id": "B07",
      "title": "集合遍历与迭代",
      "objectives": [
        "区分索引遍历、迭代器遍历与流式遍历",
        "理解迭代协议在六语言中的对应物",
        "能按场景选择遍历方式并注意修改集合的风险"
      ],
      "prerequisites": [
        "collection.array-list",
        "collection.map"
      ],
      "core": "遍历集合是最高频操作。三种范式：① 索引遍历（for i in range(len(a))），适合需要下标；② 迭代器/foreach（for x in a），最常用，语言内部封装迭代协议（Python __iter__、JS Symbol.iterator、Java Iterable、Rust IntoIterator、Go range）；③ 流式/声明式遍历（map/filter/forEach），聚焦「做什么」而非「怎么做」。注意：遍历时修改集合（增删）在各语言行为不同——Java 抛 ConcurrentModificationException，Python 也报错或跳项，Go 对 map 遍历中删除安全但规则特殊，Rust 的借用规则直接禁止。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "nums = [1, 2, 3, 4]\ntotal = 0\nfor x in nums:\n    total += x\nprint(total)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "iterate",
              "start": 3,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "javascript": {
          "minimal_code": "const nums = [1, 2, 3, 4];\nlet total = 0;\nfor (const x of nums) total += x;\nconsole.log(total);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "iterate",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "java": {
          "minimal_code": "int[] nums = {1, 2, 3, 4};\nint total = 0;\nfor (int x : nums) total += x;\nSystem.out.println(total);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "iterate",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <vector>\nstd::vector<int> nums = {1, 2, 3, 4};\nint total = 0;\nfor (int x : nums) total += x;\nstd::cout << total;",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 3
            },
            {
              "role": "iterate",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "go": {
          "minimal_code": "nums := []int{1, 2, 3, 4}\ntotal := 0\nfor _, x := range nums { total += x }\nfmt.Println(total)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "iterate",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "rust": {
          "minimal_code": "let nums = vec![1, 2, 3, 4];\nlet total: i32 = nums.iter().sum();\nprintln!(\"{}\", total);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "iterate",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Python\nnums = [1, 2, 3]\nfor x in nums:\n    nums.remove(x)",
          "message": "结果 [2]（跳项）或 RuntimeError: list changed size during iteration",
          "cause": "遍历中修改列表长度，迭代器位置错乱。",
          "fix": "遍历副本 for x in nums[:]，或使用推导式过滤重建列表。"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "Java for-each 中调用 list.remove() 会怎样？",
          "options": [
            "正常删除",
            "死循环",
            "删除失败",
            "抛 ConcurrentModificationException"
          ],
          "answer": 3,
          "feedback": "迭代器检测到结构性修改抛异常；应使用 removeIf 或迭代器自身 remove。"
        },
        {
          "type": "read",
          "question": "Rust 中 for x in vec（不加 &）后还能继续使用 vec 吗？",
          "options": [
            "能",
            "总能（值类型）",
            "不能，所有权被移动",
            "取决于大小"
          ],
          "answer": 2,
          "feedback": "for x in vec 会移动集合所有权，之后 vec 失效；用 &vec 借用可继续使用。"
        },
        {
          "type": "pair",
          "question": "哪个语言用 range 遍历 map 时顺序是随机的？",
          "options": [
            "Rust",
            "Go",
            "Python",
            "Java"
          ],
          "answer": 1,
          "feedback": "Go 的 map range 遍历顺序刻意随机化，不保证有序。"
        }
      ],
      "deep_dive": "迭代协议统一了「遍历」抽象：Python __iter__/__next__、JS Symbol.iterator、Java Iterable/Iterator、C++ 迭代器对、Rust IntoIterator/Iterator、Go range。理解协议后，自定义容器在任何语言都能无缝参与 for 循环。",
      "summary": "一句话模型：遍历三范式（索引/迭代器/流式），迭代协议是语言的核心抽象，遍历中修改集合是各语言共同的坑。",
      "next": [
        "collection.crud",
        "collection.filter-map-reduce"
      ],
      "related_advanced": [
        "python.container-iteration",
        "cpp.stl-algorithms",
        "rust.iterators-closures"
      ],
      "level": "L3"
    },
    // ============ 深做样板 5：异常与错误值 ============
            {
      "id": "error.exception-vs-result",
      "status": "published",
      "module_id": "B09",
      "title": "异常与错误值",
      "objectives": [
        "对比异常（throw/try-catch）与错误值（Result/error）两种错误模型",
        "理解各语言默认的错误处理惯用法",
        "能设计错误传播与用户友好提示"
      ],
      "prerequisites": [
        "function.declare-call",
        "error.kinds"
      ],
      "core": "程序失败有两种主流表达：① 异常：抛出对象沿调用栈传播，遇 try/catch 捕获（Python/JS/Java/C++）；② 错误值：函数返回 Result<T,E>（Rust）或 (T, error)（Go），调用方显式检查。异常适合「失败是罕见异常」的业务代码；错误值适合「失败是常态」的 IO/系统代码，强制调用方处理。Java 区分受检/非受检异常；C++ 异常通常只用于真正异常场景；Rust 用 ? 运算符优雅传播错误。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "try:\n    x = 1 // 0\nexcept ZeroDivisionError:\n    print(\"error\")",
          "semantic_blocks": [
            {
              "role": "try",
              "start": 1,
              "end": 2
            },
            {
              "role": "catch",
              "start": 3,
              "end": 4
            }
          ]
        },
        "javascript": {
          "minimal_code": "function divide(a, b) { if (b === 0) throw new Error(\"div0\"); return a / b; }\ntry { divide(1, 0); } catch (e) { console.log(\"error\"); }",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "try",
              "start": 2,
              "end": 2
            },
            {
              "role": "catch",
              "start": 2,
              "end": 2
            }
          ]
        },
        "java": {
          "minimal_code": "try {\n    int x = 1 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"error\");\n}",
          "semantic_blocks": [
            {
              "role": "try",
              "start": 1,
              "end": 2
            },
            {
              "role": "catch",
              "start": 3,
              "end": 4
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <stdexcept>\nauto divide = [](int a, int b) { if (b == 0) throw std::invalid_argument(\"div0\"); return a / b; };\ntry { divide(1, 0); } catch (const std::exception&) { std::cout << \"error\"; }",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "try",
              "start": 3,
              "end": 3
            },
            {
              "role": "catch",
              "start": 3,
              "end": 3
            }
          ]
        },
        "go": {
          "minimal_code": "divide := func(a, b int) (int, error) { if b == 0 { return 0, fmt.Errorf(\"div0\") } return a / b, nil }\n_, err := divide(1, 0)\nif err != nil { fmt.Println(\"error\") }",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            },
            {
              "role": "branch",
              "start": 3,
              "end": 3
            }
          ]
        },
        "rust": {
          "minimal_code": "let divide = |a: i32, b: i32| -> Result<i32, String> { if b == 0 { Err(\"div0\".to_string()) } else { Ok(a / b) } };\nmatch divide(1, 0) {\n    Ok(_) => println!(\"ok\"),\n    Err(_) => println!(\"error\"),\n}",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "match",
              "start": 2,
              "end": 4
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Rust\nlet s = std::fs::read_to_string(\"x.txt\").unwrap();",
          "message": "thread 'main' panicked: called `Result::unwrap()` on an `Err` value: Os { code: 2, ... }",
          "cause": "文件不存在时 unwrap 直接 panic 终止程序。",
          "fix": "用 ? 传播、match 处理，或在确认不可恢复时才 unwrap。"
        },
        {
          "code": "// Java\ncatch (Exception e) { /* 空 */ }",
          "message": "异常被吞掉，问题静默",
          "cause": "空 catch 隐藏失败，难以排查。",
          "fix": "记录日志、包装后重抛，或捕获更具体的异常类型。"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "Go 语言处理错误的默认机制是？",
          "options": [
            "异常 try/catch",
            "panic 机制",
            "多返回值 + error 值显式检查",
            "Result 枚举 + ? 运算符"
          ],
          "answer": 2,
          "feedback": "Go 用 (T, error) 多返回值，调用方显式检查 err != nil。"
        },
        {
          "type": "read",
          "question": "Rust 中 ? 运算符在 Err 时的行为？",
          "options": [
            "忽略错误",
            "panic",
            "把 Err 转换为 String",
            "提前返回 Err（传播给调用方）"
          ],
          "answer": 3,
          "feedback": "? 在 Err 时立即 return Err(...) 传播错误；在 Ok 时解包出值。"
        },
        {
          "type": "diagnose",
          "question": "Java 中读取文件需声明 throws IOException 或捕获，属于哪种异常？",
          "options": [
            "受检异常",
            "逻辑错误",
            "非受检异常",
            "运行时错误"
          ],
          "answer": 0,
          "feedback": "IOException 是受检异常，编译器强制处理；RuntimeException 及其子类为非受检。"
        }
      ],
      "deep_dive": "错误模型的选择影响 API 设计：异常模型用控制流传递错误（隐式），错误值模型让错误成为数据流的一部分（显式）。Rust 的 Result + ? 兼顾了两者——显式类型化错误，但传播语法接近异常。",
      "summary": "一句话模型：异常是隐式传播的失控流，错误值是显式返回的数据；Go/Rust 倾向后者，Python/JS/Java/C++ 倾向前者。",
      "next": [
        "error.propagation",
        "error.custom-types",
        "error.raii-defer"
      ],
      "related_advanced": [
        "go.error-design",
        "rust.enum-pattern"
      ],
      "level": "L3"
    },
    // ============ 深做样板 6：创建并等待任务 ============
        {
      "id": "concurrency.spawn-await",
      "status": "published",
      "module_id": "B13",
      "title": "创建并等待任务",
      "objectives": [
        "理解线程/协程/任务三种并发单元",
        "能创建并等待多个任务完成",
        "认识结果收集与错误处理的方式"
      ],
      "prerequisites": [
        "concurrency.models",
        "concurrency.sync-async"
      ],
      "core": "「并发执行 + 汇合结果」是并发编程的入门必修。核心组件：① 并发单元（线程：Java/C++/Go goroutine；协程/任务：Python asyncio、JS Promise、Rust async）；② 等待机制（join、await、WaitGroup）；③ 结果收集（返回值、channel、Future）。要点：创建任务只是起点，必须显式等待（join/await）否则任务可能未完成即退出；共享结果要小心竞争。",
      "comparisonDimensions": [
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost",
        "mutability"
      ],
      "variants": {
        "python": {
          "minimal_code": "import threading\n\ndef task():\n    print(\"task done\")\n\nt = threading.Thread(target=task)\nt.start()\nt.join()\nprint(\"main done\")",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "define",
              "start": 3,
              "end": 4
            },
            {
              "role": "spawn",
              "start": 6,
              "end": 6
            },
            {
              "role": "join",
              "start": 7,
              "end": 7
            },
            {
              "role": "print",
              "start": 8,
              "end": 8
            }
          ]
        },
        "javascript": {
          "minimal_code": "const p = Promise.resolve().then(() => console.log(\"task done\"));\np.then(() => console.log(\"main done\"));",
          "semantic_blocks": [
            {
              "role": "spawn",
              "start": 1,
              "end": 1
            },
            {
              "role": "await-all",
              "start": 2,
              "end": 2
            }
          ]
        },
        "java": {
          "minimal_code": "Thread t = new Thread(() -> System.out.println(\"task done\"));\nt.start();\ntry { t.join(); } catch (InterruptedException e) {}\nSystem.out.println(\"main done\");",
          "semantic_blocks": [
            {
              "role": "spawn",
              "start": 1,
              "end": 1
            },
            {
              "role": "join",
              "start": 2,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <thread>\nstd::thread t([] { std::cout << \"task done\"; });\nt.join();\nstd::cout << \" main done\";",
          "semantic_blocks": [
            {
              "role": "spawn",
              "start": 2,
              "end": 2
            },
            {
              "role": "join",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "go": {
          "minimal_code": "done := make(chan bool)\ngo func() { fmt.Println(\"task done\"); done <- true }()\n<-done\nfmt.Println(\"main done\")",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "spawn",
              "start": 2,
              "end": 2
            },
            {
              "role": "await-all",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "rust": {
          "minimal_code": "let handle = std::thread::spawn(|| println!(\"task done\"));\nhandle.join().unwrap();\nprintln!(\"main done\");",
          "semantic_blocks": [
            {
              "role": "spawn",
              "start": 1,
              "end": 1
            },
            {
              "role": "join",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        {
          "code": "// Go\nfor i := 0; i < 3; i++ {\n    go func() { fmt.Println(i) }()  // 捕获循环变量\n}",
          "message": "可能全部打印 3（旧版本闭包共享变量）",
          "cause": "闭包捕获循环变量 i 的最终值。",
          "fix": "显式传参 go func(i int) {...}(i)（Go 1.22+ 已默认修复）。"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "创建线程/任务后不等待（不 join/await）会怎样？",
          "options": [
            "程序可能先退出导致任务未完成",
            "任务自动等待",
            "任务一定完成",
            "编译错误"
          ],
          "answer": 0,
          "feedback": "主流程退出时未等待的并发任务可能被终止，必须显式 join/await 汇合。"
        },
        {
          "type": "read",
          "question": "Go 中等待多个 goroutine 完成的标准工具是？",
          "options": [
            "Future",
            "join()",
            "sync.WaitGroup",
            "asyncio.gather"
          ],
          "answer": 2,
          "feedback": "Go 用 sync.WaitGroup（Add/Wait/Done）汇合 goroutine。"
        },
        {
          "type": "pair",
          "question": "哪个语言通过所有权系统在编译期防止线程间数据竞争？",
          "options": [
            "C++",
            "Rust",
            "Java",
            "Go"
          ],
          "answer": 1,
          "feedback": "Rust 的 Send/Sync 与所有权让数据竞争在编译期暴露。"
        }
      ],
      "deep_dive": "并发单元差异：OS 线程（Java/C++）重量级；goroutine（Go）由运行时调度、栈可增长；协程/任务（Python/JS/Rust async）在单线程事件循环上协作调度。IO 密集用协程/异步，CPU 密集用线程/多进程。",
      "summary": "一句话模型：创建并发任务必须显式等待汇合（join/await/WaitGroup），结果收集与错误处理是设计重点。",
      "next": [
        "concurrency.shared-message",
        "concurrency.cancel-timeout"
      ],
      "related_advanced": [
        "python.concurrency",
        "go.goroutine-channel",
        "rust.concurrency-safety"
      ],
      "level": "L3"
    },
    // ============ 中等深度：每模块 1 个核心知识点 ============
    {
      "id": "runtime.minimal-program", "module_id": "B00", "title": "最小可运行程序", "status": "published",
      "objectives": ["认识六语言程序入口的形态", "能写出并运行最小程序"],
      "prerequisites": [],
      "core": "每个语言都有一个「入口约定」：脚本语言（Python/JS）从文件顶部顺序执行；编译/托管语言需要显式入口（Java public static void main、C++/Go/Rust 的 main 函数）。理解入口是运行任何程序的第一步。",
      "lang_diff": "Python：无 main 约定，模块顶层即入口（惯用 if __name__ == \"__main__\"）；JavaScript（Node）：文件顶层执行；Java：public static void main(String[] args)；C++：int main()；Go：package main + func main()；Rust：fn main()。",
      "exercises": [
        { "type": "concept", "question": "Go 程序入口的签名是？", "options": ["func main()", "顶层代码", "fn main()", "public static void main"], "answer": 0, "feedback": "Go 需要 package main 与 func main()。" },
        { "type": "read", "question": "Python 中 if __name__ == '__main__' 的作用？", "options": ["定义入口函数", "定义主类", "必须存在的语法", "仅直接运行时执行，被导入时不执行"], "answer": 3, "feedback": "该判断让文件既可被导入也可作为脚本运行。" }
      ]
    },
    {
      "id": "env.version-manager", "module_id": "B01", "title": "版本管理与多版本切换", "status": "published",
      "objectives": ["在同一机器管理多语言/多版本", "切换全局与项目级版本"],
      "prerequisites": ["env.install"],
      "core": "不同项目常需不同运行时版本。版本管理器：Python 用 pyenv、Node 用 nvm/volta、Java 用 SDKMAN、Rust 用 rustup（内置）、Go 用官方 go1.x 下载器。原则：全局默认版本 + 项目目录内锁定版本。",
      "lang_diff": "Python：pyenv global/local；JS：nvm use/alias；Java：sdk use/default；C++：多编译器共存（gcc-13）+ CMake 指定标准；Go：go install golang.org/dl/go1.x@latest + go1.x download；Rust：rustup override set nightly。",
      "exercises": [
        { "type": "concept", "question": "Rust 管理工具链版本的内置工具是？", "options": ["nvm", "pyenv", "sdkman", "rustup"], "answer": 3, "feedback": "rustup 同时管理 rustc/cargo 与 stable/nightly 工具链。" },
        { "type": "concept", "question": "pyenv local 的作用是？", "options": ["在项目目录锁定版本", "更新 pip", "删除版本", "安装 Python"], "answer": 0, "feedback": "pyenv local 生成 .python-version 锁定该项目使用的版本。" }
      ]
    },
            {
      "id": "value.semantics",
      "module_id": "B02",
      "title": "值语义、引用语义与对象身份",
      "status": "published",
      "objectives": [
        "区分值语义与引用语义",
        "理解对象身份（identity）与相等性"
      ],
      "prerequisites": [
        "value.binding"
      ],
      "core": "值语义：变量存值本身，复制产生独立副本（int、struct）。引用语义：变量存对象的地址，复制共享同一对象。判断「== 比较的是值还是身份」是各语言常见困惑：Python/JS/Java 的对象 == 默认比较身份（需 equals/===），C++ 的 == 由类型定义，Rust 需 derive(PartialEq)。",
      "lang_diff": "Python：== 调用 __eq__，is 比较身份；JS：=== 原始值按值、对象按引用（对象比较需手动）；Java：== 基本类型按值、对象按引用，equals 需重写；C++：== 默认逐成员（可重载），复制是深拷贝；Go：== 对可比较类型按值，slice/map 不可比较；Rust：== 需实现 PartialEq（derive 可得），String 按内容。",
      "exercises": [
        {
          "id": "vs-q1",
          "type": "quiz",
          "question": "Python 中 a=[1]; b=a; b.append(2) 后 a 是？",
          "options": [
            "[1,2]（b 是 a 的引用）",
            "[1]（拷贝）",
            "报错",
            "空列表"
          ],
          "answer": 0,
          "feedback": "列表是引用语义，b=a 复制引用，append 影响同一对象。"
        },
        {
          "id": "vs-q2",
          "type": "quiz",
          "question": "Java 中两个内容相同的新 String 用 == 比较结果是？",
          "options": [
            "true（比较内容）",
            "false（比较身份，需 equals）",
            "编译错误",
            "取决于长度"
          ],
          "answer": 1,
          "feedback": "Java 对象 == 比较引用身份；内容比较必须用 equals。"
        },
        {
          "id": "vs-q3",
          "type": "quiz",
          "question": "Rust 中 String 传给函数后原变量？",
          "options": [
            "仍可用（自动拷贝）",
            "变为 null",
            "不可再用（所有权移动）",
            "报错但可恢复"
          ],
          "answer": 2,
          "feedback": "String 非 Copy，传参发生所有权移动，原变量失效；需借用或 clone。"
        },
        {
          "id": "vs-q4",
          "type": "quiz",
          "question": "C++ 大对象按值传参的性能问题是？",
          "options": [
            "引用计数开销",
            "自动加锁",
            "无问题",
            "整份拷贝的开销"
          ],
          "answer": 3,
          "feedback": "按值传递触发拷贝构造，大对象开销大；应传 const 引用。"
        }
      ],
      "level": "L3",
      "commonTask": "同一任务：函数/代码块内对整型参数赋值 99 不影响外部变量（值语义），对列表追加元素影响外部（引用语义）；输出外部整型值与列表长度，统一为：1 2。",
      "comparisonDimensions": [
        "copy-behavior",
        "mutation-visibility",
        "equality-meaning",
        "sharing-cost",
        "immutability-default"
      ],
      "variants": {
        "python": {
          "minimal_code": "def f(x, lst):\n    x = 99\n    lst.append(2)\n\na = 1\nlst = [1]\nf(a, lst)\nprint(a, len(lst))",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 3
            },
            {
              "role": "declare",
              "start": 5,
              "end": 6
            },
            {
              "role": "call",
              "start": 7,
              "end": 7
            },
            {
              "role": "print",
              "start": 8,
              "end": 8
            }
          ]
        },
        "javascript": {
          "minimal_code": "function f(x, arr) { x = 99; arr.push(2); }\nlet a = 1;\nconst arr = [1];\nf(a, arr);\nconsole.log(a, arr.length);",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "declare",
              "start": 2,
              "end": 3
            },
            {
              "role": "call",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "java": {
          "minimal_code": "java.util.List<Integer> lst = new java.util.ArrayList<>(java.util.List.of(1));\nint a = 1;\nint x = a; x = 99;\nlst.add(2);\nSystem.out.println(a + \" \" + lst.size());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "copy",
              "start": 3,
              "end": 3
            },
            {
              "role": "mutate",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <vector>\nstd::vector<int> lst = {1};\nint a = 1;\nint x = a; x = 99;\nlst.push_back(2);\nstd::cout << a << \" \" << lst.size();",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 3
            },
            {
              "role": "copy",
              "start": 4,
              "end": 4
            },
            {
              "role": "mutate",
              "start": 5,
              "end": 5
            },
            {
              "role": "print",
              "start": 6,
              "end": 6
            }
          ]
        },
        "go": {
          "minimal_code": "lst := []int{1}\na := 1\nx := a; x = 99\nlst = append(lst, 2)\nfmt.Println(a, len(lst))",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "copy",
              "start": 3,
              "end": 3
            },
            {
              "role": "mutate",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "rust": {
          "minimal_code": "let a = 1;\nlet mut lst = vec![1];\nlet x = a;\nlst.push(2);\nprintln!(\"{} {}\", a, lst.len());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "copy",
              "start": 3,
              "end": 3
            },
            {
              "role": "mutate",
              "start": 4,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        }
      },
      "errors": [
        "引用共享陷阱（Python/JS）：b = a 后修改 b 的元素，a 同步变化——复制引用而非数据",
        "Java == 比较身份：两个内容相同的 String 用 == 可能 false（常量池 vs new），应 equals",
        "C++ 值传递拷贝开销：大对象按值传递产生整份拷贝，应 const 引用",
        "Go slice 传递：append 可能触发扩容导致外部 slice 不变——值语义与引用语义混合",
        "Rust 所有权移动：String 传参后原变量不可用（move），需 clone 或借用"
      ]
    },
    {
      "id": "expr.logic-shortcircuit", "module_id": "B03", "title": "逻辑运算与短路求值", "status": "published",
      "objectives": ["理解 && || 的短路行为", "能利用短路写防御式条件"],
      "prerequisites": ["expr.comparison"],
      "core": "逻辑与 &&、逻辑或 || 具有短路求值：左侧即可决定结果时，右侧不执行。这既是性能优化也是安全写法（如判空后再访问成员）。注意语言差异：短路结果返回的是「操作数的值」还是「布尔值」。",
      "lang_diff": "Python：and/or 返回操作数本身（非纯布尔），常用 a or default 惯用法；JS：&&/|| 返回操作数（用 ?? 处理 null/undefined）；Java/C++/Go/Rust：返回布尔（Go/Rust 还有按位与 & 短路差异——Rust 的 && 才短路，& 不短路）。",
      "exercises": [
        { "type": "concept", "question": "哪个语言 and/or 返回操作数值而非纯布尔？", "options": ["Rust", "C++", "Java", "Python"], "answer": 3, "feedback": "Python 的 and/or 返回最后求值的操作数。" },
        { "type": "read", "question": "if (arr != null && arr.length > 0) 依赖什么特性？", "options": ["类型推断", "垃圾回收", "短路求值", "函数重载"], "answer": 2, "feedback": "左侧 arr != null 为假时右侧不执行，避免空指针。" }
      ]
    },
    {
      "id": "control.loops", "module_id": "B04", "title": "循环：for / while / 无限循环", "status": "published",
      "objectives": ["选择正确的循环结构", "理解 break/continue/return 的控制转移"],
      "prerequisites": ["control.conditionals"],
      "core": "循环三兄弟：for（固定次数/遍历）、while（条件前置）、do-while（条件后置，至少一次）。现代语言普遍提供「范围遍历」而非仅索引循环；无限循环（while true / loop）配合 break 是事件循环等场景的惯用法。",
      "lang_diff": "Python：for x in range(n) 与 for x in 容器；JS：for...of；Java：增强 for；C++：范围 for 或传统 for；Go：for 同时充当 while（无 while 关键字，用 for cond）；Rust：loop 提供无限循环并支持 break value。",
      "exercises": [
        { "type": "concept", "question": "Go 语言中 while 循环如何书写？", "options": ["loop", "repeat-until", "while (cond)", "for cond"], "answer": 3, "feedback": "Go 没有 while 关键字，用 for cond 表达。" },
        { "type": "read", "question": "Rust 中 loop { ... break 42 } 的 break 作用是？", "options": ["继续循环", "仅退出", "报错", "退出并返回 42 作为循环表达式值"], "answer": 3, "feedback": "Rust 的 loop 是表达式，break value 可携带返回值。" }
      ]
    },
            {
      "id": "function.closure",
      "module_id": "B05",
      "title": "闭包与捕获",
      "status": "published",
      "objectives": [
        "理解闭包捕获外部变量",
        "识别闭包在回调与工厂中的用途"
      ],
      "prerequisites": [
        "function.lambda",
        "value.semantics"
      ],
      "core": "闭包 = 函数 + 捕获的词法环境。内层函数能访问并（按语言规则）修改外层变量，即使外层已返回。捕获方式影响行为：按值快照还是按引用共享；是否允许修改捕获变量。",
      "lang_diff": "Python：默认引用捕获，读外层自由变量，写需 nonlocal；JS：闭包按引用共享（循环变量陷阱曾用 var/let 区分）；Java：lambda 只能捕获 effectively final 变量；C++：[=] 按值 / [&] 按引用显式声明捕获；Go：闭包共享变量（Go 1.22 后循环变量语义修正）；Rust：Fn/FnMut/FnOnce 按捕获方式自动选择。",
      "exercises": [
        {
          "id": "cl-q1",
          "type": "quiz",
          "question": "JS 中 var 循环变量被闭包共享的修复是？",
          "options": [
            "用 let（块级作用域每个迭代独立绑定）",
            "用 var 就够",
            "用 const 也不行",
            "无解"
          ],
          "answer": 0,
          "feedback": "let 每次迭代创建独立绑定；var 只有函数级作用域，闭包共享最终值。"
        },
        {
          "id": "cl-q2",
          "type": "quiz",
          "question": "Java lambda 捕获并修改局部变量的限制是？",
          "options": [
            "完全禁止 lambda",
            "局部变量必须 effectively final，不可直接修改",
            "只能捕获参数",
            "无限制"
          ],
          "answer": 1,
          "feedback": "Java lambda 捕获的局部变量必须 effectively final；修改需用数组或 AtomicInteger 容器。"
        },
        {
          "id": "cl-q3",
          "type": "quiz",
          "question": "C++ [count = 0] mutable 的含义是？",
          "options": [
            "按引用捕获外部 count",
            "不可变捕获",
            "捕获初始化 + 允许闭包内修改副本",
            "拷贝外部变量"
          ],
          "answer": 2,
          "feedback": "捕获初始化在闭包内建 count=0 副本，mutable 允许修改该副本，不影响外部。"
        },
        {
          "id": "cl-q4",
          "type": "quiz",
          "question": "Rust 中 move 闭包的特征是？",
          "options": [
            "共享借用",
            "只读捕获",
            "自动拷贝",
            "捕获的变量所有权移入闭包，原变量失效"
          ],
          "answer": 3,
          "feedback": "move 强制按值捕获并转移所有权，闭包可跨线程传递（需 Send）。"
        }
      ],
      "level": "L3",
      "commonTask": "同一任务：创建计数器闭包——外层函数返回捕获 count 变量的内层函数，两次调用分别输出 1、2，统一为：1 2。",
      "comparisonDimensions": [
        "capture-by-value",
        "capture-by-reference",
        "mutation-allowed",
        "lifetime",
        "allocation"
      ],
      "variants": {
        "python": {
          "minimal_code": "def make_counter():\n    count = 0\n    def inc():\n        nonlocal count\n        count += 1\n        return count\n    return inc\n\nc = make_counter()\nprint(c(), c())",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 7
            },
            {
              "role": "call",
              "start": 9,
              "end": 10
            }
          ]
        },
        "javascript": {
          "minimal_code": "function makeCounter() {\n    let count = 0;\n    return () => ++count;\n}\nconst c = makeCounter();\nconsole.log(c(), c());",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 6
            }
          ]
        },
        "java": {
          "minimal_code": "int[] count = {0};\njava.util.function.IntSupplier inc = () -> ++count[0];\nSystem.out.println(inc.getAsInt() + \" \" + inc.getAsInt());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            }
          ]
        },
        "cpp": {
          "minimal_code": "auto inc = [count = 0]() mutable { return ++count; };\nstd::cout << inc() << \" \" << inc();",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ]
        },
        "go": {
          "minimal_code": "inc := func() func() int {\n    count := 0\n    return func() int { count++; return count }\n}()\nfmt.Println(inc(), inc())",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 5
            }
          ]
        },
        "rust": {
          "minimal_code": "let mut count = 0;\nlet mut inc = || { count += 1; count };\nprintln!(\"{} {}\", inc(), inc());",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        "循环变量捕获（JS 经典陷阱）：var i 在循环里创建的闭包全部共享最终 i，需 let 或 IIFE",
        "捕获按值快照：C++ [x] 捕获在创建时拷贝，之后外层修改不影响闭包内副本",
        "Java lambda 不能捕获可变局部变量：直接捕获 count 编译失败，需数组/AtomicInteger hack",
        "Rust 闭包移动捕获：move || 拿走所有权，之后原变量不可用",
        "闭包内存泄漏：长期存活闭包持有大对象引用，GC 无法回收"
      ],
      "transferExercises": [
        {
          "id": "cl-tr1",
          "type": "transfer",
          "question": "Go 闭包捕获循环变量 i 的经典陷阱及修复是？",
          "options": [
            "Go 无闭包",
            "闭包共享 i，用 i := i 或传参创建副本",
            "用 var 声明",
            "无法修复"
          ],
          "answer": 1,
          "feedback": "Go 1.22 前循环变量共享，闭包全部读到最终值；旧版用 i := i 或参数传递副本。"
        },
        {
          "id": "cl-tr2",
          "type": "transfer",
          "question": "闭包相比对象的主要优势是？",
          "options": [
            "轻量捕获状态、适合回调/惰性计算",
            "一定更快",
            "占用更少内存",
            "天然线程安全"
          ],
          "answer": 0,
          "feedback": "闭包用捕获环境携带状态，免去对象样板，回调与惰性求值场景自然。"
        }
      ]
    },
    {
      "id": "string.encoding", "module_id": "B06", "title": "Unicode 与字符编码", "status": "published",
      "objectives": ["理解 Unicode 码点与 UTF-8 编码", "避免中文/emoji 处理中的坑"],
      "prerequisites": ["string.immutability"],
      "core": "字符在计算机中是「码点（code point）→ 字节序列」的映射。UTF-8 是事实标准：ASCII 兼容、可变长。常见坑：按字节 vs 按字符索引、字符串长度统计、文件名/网络传输的编码转换。",
      "lang_diff": "Python：str 是 Unicode 序列，len 按码点；bytes 用于字节；JS：String 按 UTF-16 码元（emoji 是两个码元，需 [...s] 迭代）；Java：String 也是 UTF-16；C++：std::string 是字节串，UTF-8 处理需注意；Go：string 是只读字节，range 按码点迭代；Rust：String 是 UTF-8，索引需用 chars()。",
      "exercises": [
        { "type": "concept", "question": "JavaScript 中 [...\"😀\"].length 的值？", "options": ["0", "1", "2", "4"], "answer": 2, "feedback": "emoji 是代理对，UTF-16 码元数为 2；展开运算符按码点迭代得 1。" },
        { "type": "concept", "question": "Go 中 range 遍历 string 的迭代单位是？", "options": ["字节", "字符数组", "码元", "UTF-8 码点（rune）"], "answer": 3, "feedback": "range 对 string 按 rune（码点）迭代。" }
      ]
    },
            {
      "id": "collection.map",
      "module_id": "B07",
      "title": "映射 / 字典 / 哈希表",
      "status": "published",
      "objectives": [
        "理解键值对集合的语义",
        "掌握常见操作与遍历"
      ],
      "prerequisites": [
        "collection.array-list"
      ],
      "core": "映射（map/dict）以键查找值，平均 O(1)。要点：键需可哈希（不可变）；键不存在时的行为（报错 vs 默认值）；遍历顺序。不同语言在「取不存在的键」上差异明显。",
      "lang_diff": "Python：dict[key] 不存在抛 KeyError，get() 返回默认；JS：Map 是专用类型（对象属性作 map 有原型污染风险），get 不存在返回 undefined；Java：HashMap.get 不存在返回 null（containsKey 判断）；C++：std::map 的 operator[] 不存在时插入默认值；Go：m[k] 不存在返回零值，用 v, ok := m[k] 判断；Rust：HashMap.get 返回 Option<&V>。",
      "exercises": [
        {
          "id": "cm-q1",
          "type": "quiz",
          "question": "Python d[\"x\"] 键不存在时？",
          "options": [
            "返回 None",
            "返回空串",
            "静默创建",
            "抛 KeyError"
          ],
          "answer": 3,
          "feedback": "dict 下标访问缺失键抛 KeyError；需 get(key, default)。"
        },
        {
          "id": "cm-q2",
          "type": "quiz",
          "question": "JS 中对象属性作映射的隐患是？",
          "options": [
            "性能好无需 Map",
            "不支持字符串键",
            "原型链污染（__proto__ 等）",
            "无法遍历"
          ],
          "answer": 2,
          "feedback": "普通对象继承 Object.prototype，特殊键名有污染风险；专用 Map 更安全。"
        },
        {
          "id": "cm-q3",
          "type": "quiz",
          "question": "Go 中并发读写 map 会？",
          "options": [
            "自动加锁",
            "运行时 panic（fatal error）",
            "数据竞争但无害",
            "编译错误"
          ],
          "answer": 1,
          "feedback": "Go map 非并发安全，并发写触发 fatal error；需 sync.RWMutex 保护。"
        },
        {
          "id": "cm-q4",
          "type": "quiz",
          "question": "Rust 中 m[\"x\"] 键不存在时？",
          "options": [
            "panic（索引越界）",
            "返回 None",
            "返回默认值",
            "编译错误"
          ],
          "answer": 0,
          "feedback": "Index 访问缺失键 panic；需 get() 返回 Option。"
        }
      ],
      "level": "L3",
      "commonTask": "同一任务：创建键值映射 {a:1, b:2}，更新 a 为 3，然后按键读取输出，统一为：3 2（与遍历顺序无关）。",
      "comparisonDimensions": [
        "missing-key-behavior",
        "ordering",
        "hashability",
        "lookup-cost",
        "mutation-api"
      ],
      "variants": {
        "python": {
          "minimal_code": "d = {\"a\": 1, \"b\": 2}\nd[\"a\"] = 3\nprint(d[\"a\"], d[\"b\"])",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "update",
              "start": 2,
              "end": 2
            },
            {
              "role": "lookup",
              "start": 3,
              "end": 3
            }
          ]
        },
        "javascript": {
          "minimal_code": "const m = new Map([[\"a\", 1], [\"b\", 2]]);\nm.set(\"a\", 3);\nconsole.log(m.get(\"a\"), m.get(\"b\"));",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "update",
              "start": 2,
              "end": 2
            },
            {
              "role": "lookup",
              "start": 3,
              "end": 3
            }
          ]
        },
        "java": {
          "minimal_code": "import java.util.*;\nMap<String, Integer> m = new HashMap<>();\nm.put(\"a\", 1);\nm.put(\"b\", 2);\nm.put(\"a\", 3);\nSystem.out.println(m.get(\"a\") + \" \" + m.get(\"b\"));",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "update",
              "start": 3,
              "end": 5
            },
            {
              "role": "lookup",
              "start": 6,
              "end": 6
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <map>\n#include <string>\nstd::map<std::string, int> m;\nm[\"a\"] = 1;\nm[\"b\"] = 2;\nm[\"a\"] = 3;\nstd::cout << m[\"a\"] << \" \" << m[\"b\"];",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 3,
              "end": 3
            },
            {
              "role": "update",
              "start": 4,
              "end": 6
            },
            {
              "role": "lookup",
              "start": 7,
              "end": 7
            }
          ]
        },
        "go": {
          "minimal_code": "m := map[string]int{\"a\": 1, \"b\": 2}\nm[\"a\"] = 3\nfmt.Println(m[\"a\"], m[\"b\"])",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "update",
              "start": 2,
              "end": 2
            },
            {
              "role": "lookup",
              "start": 3,
              "end": 3
            }
          ]
        },
        "rust": {
          "minimal_code": "use std::collections::HashMap;\nlet mut m = HashMap::new();\nm.insert(\"a\", 1);\nm.insert(\"b\", 2);\nm.insert(\"a\", 3);\nprintln!(\"{} {}\", m[\"a\"], m[\"b\"]);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "update",
              "start": 3,
              "end": 5
            },
            {
              "role": "lookup",
              "start": 6,
              "end": 6
            }
          ]
        }
      },
      "errors": [
        "缺失键崩溃：d[\"x\"] 在 Python 抛 KeyError、Rust 索引越界 panic——应先检查或 get 默认值",
        "JS 对象作 map：属性名与原型冲突（__proto__/constructor），对象遍历含继承属性——应用 Map",
        "可变键哈希：Python/JS 用 list 作键报错（unhashable）——键必须不可变",
        "Go map 并发写 panic：并发读写需 sync.RWMutex，否则 fatal error",
        "Java HashMap 遍历无序：依赖顺序的代码在 HashMap 上不可移植——需 LinkedHashMap"
      ]
    },
                {
      "id": "model.record-struct-class",
      "module_id": "B08",
      "title": "记录 / 结构体 / 类",
      "status": "published",
      "objectives": [
        "用聚合结构表达领域数据",
        "理解数据载体在各语言的形态差异"
      ],
      "prerequisites": [
        "collection.map",
        "value.semantics"
      ],
      "core": "把相关字段聚合为一个类型是建模基础。三种形态：纯数据记录（struct/record/dataclass）、带方法的类（class/struct）、带行为抽象的接口（trait/protocol）。选择原则：先用最轻的数据载体，需要行为再升级。",
      "lang_diff": "Python：dataclass 提供轻量数据类，class 完整 OOP；JS：对象字面量/class（无显式 record）；Java：record（不可变）vs class；C++：struct（默认公有）vs class（默认私有）；Go：struct 仅数据 + 方法（方法在外部定义）；Rust：struct 数据 + impl 方法块。",
      "exercises": [
        {
          "id": "rs-q1",
          "type": "quiz",
          "question": "Go 中未初始化的 struct 字段值是？",
          "options": [
            "零值（0/\"\"/nil）",
            "undefined",
            "null",
            "编译错误"
          ],
          "answer": 0,
          "feedback": "Go 结构体零值初始化：数值 0、字符串空、指针 nil——安全可读。"
        },
        {
          "id": "rs-q2",
          "type": "quiz",
          "question": "Rust 修改 struct 字段（如 p.age=37）需要？",
          "options": [
            "直接改即可",
            "let mut p（字段默认不可变）",
            "unsafe 块",
            "RefCell"
          ],
          "answer": 1,
          "feedback": "Rust 绑定默认不可变，字段随之不可变；声明 let mut 才能修改。"
        },
        {
          "id": "rs-q3",
          "type": "quiz",
          "question": "C++ struct 与 class 的核心区别是？",
          "options": [
            "性能不同",
            "struct 不能有方法",
            "默认访问级别（struct public / class private）",
            "class 不能聚合"
          ],
          "answer": 2,
          "feedback": "C++ 中 struct/class 仅默认访问控制不同（public/private），其余完全一致。"
        },
        {
          "id": "rs-q4",
          "type": "quiz",
          "question": "Python 定义轻量数据类的现代方式是？",
          "options": [
            "手写 __init__",
            "字典代替",
            "namedtuple 已废弃",
            "@dataclass 装饰器"
          ],
          "answer": 3,
          "feedback": "@dataclass 自动生成 __init__/__repr__/__eq__，简洁定义数据类。"
        }
      ],
      "level": "L3",
      "commonTask": "同一任务：定义 Person（name/age）记录类型，创建实例 Ada(36) 并读取字段，输出统一为：Ada 36。",
      "comparisonDimensions": [
        "data-aggregation",
        "type-annotation",
        "construction",
        "field-access",
        "value-vs-reference"
      ],
      "variants": {
        "python": {
          "minimal_code": "class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\np = Person(\"Ada\", 36)\nprint(p.name, p.age)",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 4
            },
            {
              "role": "construct",
              "start": 6,
              "end": 6
            },
            {
              "role": "print",
              "start": 7,
              "end": 7
            }
          ]
        },
        "javascript": {
          "minimal_code": "const p = { name: \"Ada\", age: 36 };\nconsole.log(p.name, p.age);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "print",
              "start": 2,
              "end": 2
            }
          ]
        },
        "java": {
          "minimal_code": "class Person {\n    String name;\n    int age;\n    Person(String n, int a) { name = n; age = a; }\n}\nPerson p = new Person(\"Ada\", 36);\nSystem.out.println(p.name + \" \" + p.age);",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 5
            },
            {
              "role": "construct",
              "start": 6,
              "end": 6
            },
            {
              "role": "print",
              "start": 7,
              "end": 7
            }
          ]
        },
        "cpp": {
          "minimal_code": "#include <string>\nstruct Person { std::string name; int age; };\nPerson p = {\"Ada\", 36};\nstd::cout << p.name << \" \" << p.age;",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 2,
              "end": 2
            },
            {
              "role": "construct",
              "start": 3,
              "end": 3
            },
            {
              "role": "print",
              "start": 4,
              "end": 4
            }
          ]
        },
        "go": {
          "minimal_code": "p := struct {\n    Name string\n    Age  int\n}{Name: \"Ada\", Age: 36}\nfmt.Println(p.Name, p.Age)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 4
            },
            {
              "role": "print",
              "start": 5,
              "end": 5
            }
          ]
        },
        "rust": {
          "minimal_code": "struct Person { name: String, age: i32 }\nlet p = Person { name: String::from(\"Ada\"), age: 36 };\nprintln!(\"{} {}\", p.name, p.age);",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "construct",
              "start": 2,
              "end": 2
            },
            {
              "role": "print",
              "start": 3,
              "end": 3
            }
          ]
        }
      },
      "errors": [
        "字段默认值差异：Go 零值、Java null/0、Rust 无默认——未初始化字段读取行为不同",
        "可变性：Rust struct 字段默认不可变（需 mut），JS 对象可任意增删字段",
        "构造方式：Java/C++ 需显式构造，Go 字面量、Python 类、JS 对象字面量——语法各异",
        "值 vs 引用：Python/JS/Java 对象是引用，C++/Rust struct 是值语义（拷贝）",
        "类型标注：动态语言（Python/JS）字段无类型约束，静态语言编译期检查"
      ],
      "transferExercises": [
        {
          "id": "rs-tr1",
          "type": "transfer",
          "question": "不可变数据对象的跨语言实现要点？",
          "options": [
            "全用全局变量",
            "字段只读（final/readonly/不可变绑定）+ 构造后不可改",
            "深拷贝每次访问",
            "禁用类"
          ],
          "answer": 1,
          "feedback": "不可变对象：Java final 字段、Rust 无 mut、C++ const——构造后不可变保证共享安全。"
        },
        {
          "id": "rs-tr2",
          "type": "transfer",
          "question": "值语义（C++/Rust struct）拷贝的注意点是？",
          "options": [
            "拷贝是整份复制，大对象有开销（移动/借用优化）",
            "零开销",
            "自动引用",
            "拷贝必报错"
          ],
          "answer": 0,
          "feedback": "值语义拷贝复制整块数据，大结构体用引用/移动避免复制开销。"
        }
      ]
    },
    {
      "id": "error.raii-defer", "module_id": "B09", "title": "资源释放：RAII / defer / with", "status": "published",
      "objectives": ["理解资源（文件/锁/连接）的确定性释放", "对比三种资源管理机制"],
      "prerequisites": ["error.try-catch", "model.record-struct-class"],
      "core": "资源必须释放，否则泄漏。三机制：RAII（C++/Rust）：对象析构自动释放，作用域结束即释放；defer（Go）：函数结束时执行注册的清理；with/try-with-resources（Python/Java）：上下文管理器/自动关闭。异常发生时它们仍能保证释放——这是它们优于手动 finally 的关键。",
      "lang_diff": "Python：with open(...) as f 上下文管理器（__enter__/__exit__）；JS：try/finally 手动；Java：try-with-resources（AutoCloseable）；C++：RAII（析构函数）+ std::lock_guard；Go：defer 后进先出；Rust：Drop trait 提供 RAII。",
      "exercises": [
        { "type": "concept", "question": "Go 中函数结束时执行清理的机制是？", "options": ["finally", "with", "defer", "析构函数"], "answer": 2, "feedback": "Go 用 defer 注册延迟执行的清理函数。" },
        { "type": "read", "question": "C++ 中 mutex 锁的自动释放通常依赖？", "options": ["RAII（lock_guard）", "垃圾回收", "with 语句", "defer"], "answer": 0, "feedback": "lock_guard 构造加锁、析构解锁，作用域结束自动释放。" }
      ]
    },
    {
      "id": "module.define-import", "module_id": "B10", "title": "模块定义与导入", "status": "published",
      "objectives": ["把代码组织成可复用模块", "理解导入路径与可见性"],
      "prerequisites": ["runtime.minimal-program"],
      "core": "模块化是工程化的地基：一个文件/单元导出能力，其他文件导入使用。关键点：导入路径（相对/绝对/包名）、可见性（public/private）、初始化时机（副作用）。",
      "lang_diff": "Python：import 语句 + __init__.py 包；JS：ESM import/export（推荐）vs CommonJS require；Java：package + import，可见性 public/private；C++：#include 头文件（声明）与实现分离；Go：import \"模块路径/包名\"，大写开头导出；Rust：mod 声明 + use 引入。",
      "exercises": [
        { "type": "concept", "question": "Go 中包内导出标识符的规则是？", "options": ["一律导出", "大写字母开头导出", "加 export 关键字", "放 exports 目录"], "answer": 1, "feedback": "Go 以首字母大写表示公开（导出），小写为包内私有。" },
        { "type": "read", "question": "C++ 头文件与实现的分离解决什么问题？", "options": ["网络", "运行速度", "编译依赖与声明可见性", "内存"], "answer": 2, "feedback": "头文件放声明让编译单元共享接口，.cpp 放实现。" }
      ]
    },
    {
      "id": "io.formats", "module_id": "B11", "title": "数据格式：CSV 与 JSON", "status": "published",
      "objectives": ["序列化与反序列化数据", "处理常见格式的坑"],
      "prerequisites": ["io.text-binary", "collection.map"],
      "core": "程序间交换数据依赖格式：JSON（嵌套、通用）与 CSV（表格、简单）。要点：对象↔文本的双向转换（序列化/反序列化）、类型映射（数字/字符串/嵌套对象）、特殊字符转义。",
      "lang_diff": "Python：json 标准库 + csv 模块；JS：JSON.parse/stringify 原生；Java：Jackson/Gson（标准库无 JSON）；C++：nlohmann/json 等第三方；Go：encoding/json（结构体 tag）；Rust：serde_json（derive Serialize/Deserialize）。",
      "exercises": [
        { "type": "concept", "question": "Go 中控制 JSON 字段名映射的机制？", "options": ["结构体 tag（json:\"name\"）", "命名约定", "注解", "配置文件"], "answer": 0, "feedback": "Go 用结构体字段 tag 控制序列化名称与规则。" },
        { "type": "read", "question": "JS 中 JSON.stringify 的作用？", "options": ["把值序列化为 JSON 字符串", "压缩对象", "解析 JSON 字符串", "校验格式"], "answer": 0, "feedback": "stringify 序列化，parse 反序列化。" }
      ]
    },
            {
      "id": "generic.functions",
      "module_id": "B12",
      "title": "泛型函数",
      "status": "published",
      "objectives": [
        "用类型参数消除重复代码",
        "理解泛型的约束与实例化"
      ],
      "prerequisites": [
        "function.declare-call",
        "value.semantics"
      ],
      "core": "泛型让同一段逻辑适用于多种类型：max、反转、查找等。类型参数（T）由调用点推断或显式指定；约束（bound）限制 T 必须具备的能力（可比较、可克隆）。",
      "lang_diff": "Python：typing.TypeVar + Generic（运行时无强制）；JS：JSDoc/TypeScript 泛型（语言本身无）；Java：<T> 泛型方法 + 类型擦除；C++：template 模板（编译期实例化，无运行时开销）；Go：1.18+ [T any] 类型参数；Rust：fn max<T: Ord> 泛型 + 单态化。",
      "exercises": [
        {
          "id": "gf-q1",
          "type": "quiz",
          "question": "Rust 泛型函数比较大小需要什么约束？",
          "options": [
            "T: Clone",
            "T: Sized",
            "T: PartialOrd",
            "无需约束"
          ],
          "answer": 2,
          "feedback": "PartialOrd 提供比较运算符；无约束的 T 无法使用 >。"
        },
        {
          "id": "gf-q2",
          "type": "quiz",
          "question": "Java 泛型的类型擦除（Erasure）意味着？",
          "options": [
            "运行时保留类型",
            "编译期删除代码",
            "无擦除",
            "运行时泛型参数类型不可知（转 Object）"
          ],
          "answer": 3,
          "feedback": "Java 泛型编译后擦除为 Object/边界，运行时无法获取具体泛型类型。"
        },
        {
          "id": "gf-q3",
          "type": "quiz",
          "question": "C++ 模板的编译方式（monomorphization）是？",
          "options": [
            "每实例化类型生成独立代码（体积膨胀）",
            "共享一份代码",
            "运行时解释",
            "只生成一次"
          ],
          "answer": 0,
          "feedback": "模板按实例化类型分别编译生成（如 int/string 各一份），代码体积随类型数增长。"
        },
        {
          "id": "gf-q4",
          "type": "quiz",
          "question": "Go 泛型（1.18+）的约束关键字是？",
          "options": [
            "template",
            "interface{ ~T } 或 comparable 等",
            "typename",
            "<T>"
          ],
          "answer": 1,
          "feedback": "Go 用类型集约束（interface 内嵌 ~T/comparable），限制泛型参数的可用操作。"
        }
      ],
      "level": "L3",
      "commonTask": "同一任务：编写取两个值中较大者的泛型/多态函数并调用（3,5），输出统一为：5。",
      "comparisonDimensions": [
        "type-parameter",
        "compile-time-check",
        "monomorphization",
        "constraints",
        "reuse"
      ],
      "variants": {
        "python": {
          "minimal_code": "def bigger(a, b):\n    return a if a > b else b\n\nprint(bigger(3, 5))",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 2
            },
            {
              "role": "call",
              "start": 4,
              "end": 4
            }
          ]
        },
        "javascript": {
          "minimal_code": "function bigger(a, b) { return a > b ? a : b; }\nconsole.log(bigger(3, 5));",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ]
        },
        "java": {
          "minimal_code": "System.out.println(Integer.max(3, 5));",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 1
            }
          ]
        },
        "cpp": {
          "minimal_code": "auto bigger = [](auto a, auto b) { return a > b ? a : b; };\nstd::cout << bigger(3, 5);",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ]
        },
        "go": {
          "minimal_code": "fmt.Println(max(3, 5))",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 1
            }
          ]
        },
        "rust": {
          "minimal_code": "fn bigger<T: PartialOrd>(a: T, b: T) -> T { if a > b { a } else { b } }\nprintln!(\"{}\", bigger(3, 5));",
          "semantic_blocks": [
            {
              "role": "define",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ]
        }
      },
      "errors": [
        "缺少约束：Rust 泛型比较需 T: PartialOrd，漏掉约束编译失败",
        "类型擦除：Java 泛型运行时擦除（Erasure），无法在运行时判断泛型参数类型",
        "C++ 模板编译膨胀：每实例化一种类型生成一份代码（monomorphization 体积）",
        "动态语言无编译期检查：Python/JS 传错类型运行时才暴露（鸭子类型风险）",
        "Go 泛型约束：T comparable 才能比较，写 T any 无法用 > 运算符"
      ],
      "transferExercises": [
        {
          "id": "gf-tr1",
          "type": "transfer",
          "question": "泛型与多态的取舍：何时值得用泛型？",
          "options": [
            "多种类型同一逻辑且需编译期类型安全",
            "只有一种类型",
            "性能无所谓时",
            "永远不用"
          ],
          "answer": 0,
          "feedback": "多种类型共享逻辑 + 需要类型安全时用泛型；单一类型或纯动态场景可不用。"
        },
        {
          "id": "gf-tr2",
          "type": "transfer",
          "question": "Python/JS 动态类型天然\"泛型\"的代价是？",
          "options": [
            "性能更好",
            "类型更安全",
            "错误延迟到运行时（缺编译期检查）",
            "无需测试"
          ],
          "answer": 2,
          "feedback": "动态类型免写泛型标注，但类型错误运行时才暴露，大项目需类型标注/测试兜底。"
        }
      ]
    },
    {
      "id": "concurrency.channel", "module_id": "B13", "title": "Channel / 消息队列", "status": "published",
      "objectives": ["用消息传递而非共享内存通信", "理解阻塞与缓冲语义"],
      "prerequisites": ["concurrency.spawn-await"],
      "core": "「不要通过共享内存通信，要通过通信共享内存」：任务之间用 channel 传递消息，避免直接共享可变状态。channel 提供同步（无缓冲）或缓冲两种模式；关闭语义与方向（发送/接收）是各语言实现差异点。",
      "lang_diff": "Python：queue.Queue（线程）与 asyncio.Queue（协程）；JS：无内置 channel，用 Promise 或 Worker postMessage；Java：BlockingQueue（ArrayBlockingQueue 等）；C++：无标准 channel（用 mutex+condvar 或第三方）；Go：chan 内建类型（<- 发送/接收，close 关闭）；Rust：std::sync::mpsc（多生产者单消费者）。",
      "exercises": [
        { "type": "concept", "question": "Go 内建的并发通信原语是？", "options": ["BlockingQueue", "chan", "postMessage", "Queue"], "answer": 1, "feedback": "chan 是 Go 的一等公民，支持缓冲、方向与 select。" },
        { "type": "read", "question": "无缓冲 channel 的收发特点是？", "options": ["必须关闭", "自动缓冲", "同步交接（发送阻塞至接收就绪）", "异步"], "answer": 2, "feedback": "无缓冲 channel 要求收发同时就绪，是同步交接。" }
      ]
    },
    {
      "id": "net.http", "module_id": "B14", "title": "URL 与 HTTP 请求结构", "status": "published",
      "objectives": ["理解 URL 组成与 HTTP 报文结构", "能发起并解析 HTTP 请求"],
      "prerequisites": ["io.formats", "concurrency.sync-async"],
      "core": "HTTP 是 Web 的通用语言：请求由方法、URL、头、体组成；响应由状态码、头、体组成。URL = 协议 + 主机 + 路径 + 查询参数。掌握 HTTP 结构后，任何语言的网络客户端都能快速上手。",
      "lang_diff": "Python：requests / urllib；JS：fetch（浏览器与 Node）；Java：java.net.http.HttpClient；C++：libcurl / cpp-httplib；Go：net/http 标准库；Rust：reqwest。",
      "exercises": [
        { "type": "concept", "question": "HTTP 请求中查询参数位于 URL 的哪部分？", "options": ["响应体", "请求体", "协议", "路径后的 ? 之后"], "answer": 3, "feedback": "?key=value 形式位于路径之后，属于 URL 的 query 部分。" },
        { "type": "read", "question": "Go 发起 HTTP GET 的标准库函数是？", "options": ["requests.get", "http.Get()", "fetch()", "HttpClient.new"], "answer": 1, "feedback": "net/http 提供 http.Get(url) 便捷函数。" }
      ]
    },
    {
      "id": "test.structure", "module_id": "B15", "title": "单元测试结构", "status": "published",
      "objectives": ["写出 Arrange-Act-Assert 三段式测试", "理解断言与测试隔离"],
      "prerequisites": ["function.pure-side-effect"],
      "core": "单元测试验证单个函数/模块的行为。经典结构 AAA：准备（Arrange）→ 执行（Act）→ 断言（Assert）。好测试：独立（不依赖执行顺序）、可重复、只测一件事。测试框架统一提供断言、运行器与报告。",
      "lang_diff": "Python：pytest / unittest（assert 表达式）；JS：vitest / jest（expect().toBe()）；Java：JUnit 5（@Test + assertEquals）；C++：GoogleTest（EXPECT_EQ）；Go：testing 标准库（t.Run + table-driven）；Rust：#[test] 属性 + assert_eq!。",
      "exercises": [
        { "type": "concept", "question": "Go 测试文件的命名约定？", "options": ["xxx_test.go", "test_xxx.py", "xxx.test.rs", "TestXxx.java"], "answer": 0, "feedback": "Go 测试文件以 _test.go 结尾，函数名 Test 开头。" },
        { "type": "read", "question": "Rust 单元测试标注用什么属性？", "options": ["@Test", "#[test]", "func Test", "@test"], "answer": 1, "feedback": "Rust 用 #[test] 属性标记测试函数。" }
      ]
    },
    {
      "id": "ds.complexity", "module_id": "B16", "title": "时间与空间复杂度", "status": "published",
      "objectives": ["用大 O 表示法比较算法", "选择合适的数据结构"],
      "prerequisites": ["function.recursion"],
      "core": "大 O 描述输入规模增长时操作数的增长阶：O(1)、O(log n)、O(n)、O(n log n)、O(n²)。它忽略常数，关注规模趋势。选型依据：查找多选哈希表 O(1)、有序需求选树 O(log n)、顺序处理用数组/链表。",
      "lang_diff": "复杂度与语言无关，但实现差异影响常数：哈希表在 Rust/Go/Java 均 O(1) 摊还；字符串拼接在不可变语言（Python/JS）中循环 + 是 O(n²)，应改用 join/Builder。",
      "exercises": [
        { "type": "concept", "question": "二分查找的时间复杂度是？", "options": ["O(n log n)", "O(n)", "O(1)", "O(log n)"], "answer": 3, "feedback": "每步减半，O(log n)。" },
        { "type": "read", "question": "Python 中循环内 s += c 拼接字符串的复杂度风险？", "options": ["O(1)", "O(log n)", "O(n)", "O(n²)（字符串不可变，每次生成新串）"], "answer": 3, "feedback": "不可变字符串每次拼接创建新对象，应改用 ''.join()。" }
      ]
    },
    {
      "id": "eng.git", "module_id": "B17", "title": "Git 基础工作流", "status": "published",
      "objectives": ["掌握 add/commit/push 三连", "理解分支与合并"],
      "prerequisites": ["eng.project-layout"],
      "core": "Git 是版本控制的行业标准：工作区 → 暂存区（add）→ 本地库（commit）→ 远程库（push）。分支让功能并行开发，合并（merge/PR）汇合变更。好提交：小、单一目的、清晰信息。",
      "lang_diff": "Git 是语言无关工具，但各生态有配套约定：Python（pre-commit、uv）、JS（husky + commitlint）、Java（Maven release）、Go（gofmt 前钩子）、Rust（cargo fmt/clippy 钩子）。",
      "exercises": [
        { "type": "concept", "question": "把文件从工作区加入暂存区的命令？", "options": ["git commit", "git merge", "git push", "git add"], "answer": 3, "feedback": "git add 将改动加入暂存区，commit 才创建提交。" },
        { "type": "read", "question": "查看当前分支状态与未提交改动的命令？", "options": ["git log", "git diff HEAD", "git status", "git remote"], "answer": 2, "feedback": "git status 显示工作区与暂存区状态。" }
      ]
    }
  ]
};
