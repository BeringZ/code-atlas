// Code Atlas — 进阶学习分区数据
// 教程来源均为官方文档、知名技术社区与权威课程平台，链接已于 2026-08 逐一验证有效。
window.CODE_ATLAS_LEARNING = {
  "site": {
    "name": "Code Atlas · 进阶学习",
    "tagline": "按编程语言分类的进阶学习路径"
  },
  "languages": [
    { "id": "python", "name": "Python", "tag": "PY", "color": "#3776ab" },
    { "id": "javascript", "name": "JavaScript", "tag": "JS", "color": "#f7df1e" },
    { "id": "java", "name": "Java", "tag": "JAVA", "color": "#e76f00" },
    { "id": "cpp", "name": "C++", "tag": "C++", "color": "#659ad2" },
    { "id": "go", "name": "Go", "tag": "GO", "color": "#00add8" },
    { "id": "rust", "name": "Rust", "tag": "RUST", "color": "#dea584" }
  ],
  "categories": [
    { "id": "docs", "name": "官方文档与指南", "desc": "语言官方维护的教程、规范与参考手册，最权威的一手资料。" },
    { "id": "courses", "name": "权威在线课程", "desc": "知名大学、企业或课程平台的系统化进阶课程，多数可免费旁听。" },
    { "id": "books", "name": "经典书籍", "desc": "社区公认的进阶经典著作，附官方或可稳定访问的链接。" },
    { "id": "community", "name": "社区与实践", "desc": "高质量教程站点、练习平台与生态资源聚合。" }
  ],
  "tutorials": [
    // ================= Python =================
    { "lang": "python", "category": "docs", "title": "Python 官方教程", "source": "docs.python.org", "level": "入门", "description": "Python 官方教程，从基础到进阶语法，官方权威参考。", "url": "https://docs.python.org/3/tutorial/" },
    { "lang": "python", "category": "docs", "title": "Python 标准库参考", "source": "docs.python.org", "level": "高级", "description": "标准库完整参考手册，进阶开发的必备工具书。", "url": "https://docs.python.org/3/library/" },
    { "lang": "python", "category": "docs", "title": "Python HOWTOs 专题指南", "source": "docs.python.org", "level": "中级", "description": "官方精选专题指南：正则表达式、日志、性能优化等。", "url": "https://docs.python.org/3/howto/" },
    { "lang": "python", "category": "courses", "title": "Python for Everybody 专项课程", "source": "Coursera · 密歇根大学", "level": "入门", "description": "全球最流行的 Python 入门到进阶专项课程，可免费旁听，附证书。", "url": "https://www.coursera.org/specializations/python" },
    { "lang": "python", "category": "courses", "title": "MIT 6.0001 计算思维与 Python 编程", "source": "MIT OpenCourseWare", "level": "中级", "description": "MIT 计算机科学经典入门课，强调计算思维与编程抽象。", "url": "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" },
    { "lang": "python", "category": "books", "title": "《流畅的 Python》第 2 版", "source": "fluentpython.com", "level": "高级", "description": "深入 Python 数据模型、惯用法与性能优化的进阶圣经（作者官网）。", "url": "https://fluentpython.com/" },
    { "lang": "python", "category": "books", "title": "《Python Tricks: A Buffet of Awesome Python Features》", "source": "Real Python", "level": "中级", "description": "精选 Python 实用技巧与进阶模式，官方配套资源页。", "url": "https://realpython.com/products/python-tricks-book/" },
    { "lang": "python", "category": "community", "title": "Real Python 教程库", "source": "Real Python", "level": "中级", "description": "高质量 Python 实战教程：异步、测试、性能调优等。", "url": "https://realpython.com/tutorials/" },
    { "lang": "python", "category": "community", "title": "Exercism Python Track", "source": "Exercism", "level": "中级", "description": "通过大量练习与导师反馈精进 Python 的免费平台。", "url": "https://exercism.org/tracks/python" },
    { "lang": "python", "category": "community", "title": "Awesome Python 资源清单", "source": "GitHub", "level": "中级", "description": "社区维护的 Python 生态优质资源聚合。", "url": "https://github.com/vinta/awesome-python" },

    // ================= JavaScript =================
    { "lang": "javascript", "category": "docs", "title": "MDN Web Docs — JavaScript", "source": "MDN · Mozilla", "level": "中级", "description": "JavaScript 权威参考，覆盖语言核心到全部 Web API。", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { "lang": "javascript", "category": "docs", "title": "MDN JavaScript 指南", "source": "MDN · Mozilla", "level": "入门", "description": "MDN 官方的系统性 JavaScript 学习指南。", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    { "lang": "javascript", "category": "docs", "title": "Node.js 官方文档", "source": "nodejs.org", "level": "中级", "description": "服务端 JavaScript 的权威文档、指南与 API 参考。", "url": "https://nodejs.org/en/docs/" },
    { "lang": "javascript", "category": "courses", "title": "freeCodeCamp — JavaScript 算法与数据结构", "source": "freeCodeCamp", "level": "入门", "description": "免费、系统的 JavaScript 与算法训练营，适合打牢基础。", "url": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
    { "lang": "javascript", "category": "courses", "title": "JavaScript: The Hard Parts", "source": "Frontend Masters", "level": "高级", "description": "深入闭包、异步、事件循环等语言底层机制。", "url": "https://frontendmasters.com/courses/javascript-hard-parts/" },
    { "lang": "javascript", "category": "courses", "title": "CS50's Web Programming with Python and JavaScript", "source": "Harvard · edX", "level": "中级", "description": "哈佛大学 Web 全栈进阶课程，含 JavaScript 与前端框架。", "url": "https://cs50.harvard.edu/web/" },
    { "lang": "javascript", "category": "books", "title": "《Eloquent JavaScript》第 4 版", "source": "eloquentjavascript.net", "level": "中级", "description": "Marijn Haverbeke 的经典之作，官方免费在线阅读。", "url": "https://eloquentjavascript.net/" },
    { "lang": "javascript", "category": "books", "title": "《You Don't Know JS Yet》系列", "source": "GitHub · getify", "level": "高级", "description": "讲透作用域、闭包、this 与异步的开源系列（免费）。", "url": "https://github.com/getify/You-Dont-Know-JS" },
    { "lang": "javascript", "category": "community", "title": "JavaScript.info — 现代 JavaScript 教程", "source": "javascript.info", "level": "中级", "description": "免费现代 JavaScript 系统教程，图文并茂、结构清晰。", "url": "https://javascript.info/" },
    { "lang": "javascript", "category": "community", "title": "Exercism JavaScript Track", "source": "Exercism", "level": "中级", "description": "大量练习驱动的 JavaScript 精进平台。", "url": "https://exercism.org/tracks/javascript" },

    // ================= Java =================
    { "lang": "java", "category": "docs", "title": "Oracle Java 官方教程", "source": "docs.oracle.com", "level": "中级", "description": "Oracle 官方 Java 语言与平台教程，覆盖核心到企业特性。", "url": "https://docs.oracle.com/javase/tutorial/" },
    { "lang": "java", "category": "docs", "title": "Java 语言规范 (JLS)", "source": "docs.oracle.com", "level": "高级", "description": "Java 语言权威规范，适合深入研究语言细节。", "url": "https://docs.oracle.com/javase/specs/" },
    { "lang": "java", "category": "docs", "title": "Dev.java — Oracle 官方开发者站点", "source": "dev.java", "level": "中级", "description": "Oracle 官方现代 Java 开发指南与 API 文档入口。", "url": "https://dev.java/" },
    { "lang": "java", "category": "courses", "title": "Java Programming 专项课程", "source": "Coursera · 杜克大学", "level": "入门", "description": "杜克大学的系统性 Java 编程专项课程，可免费旁听。", "url": "https://www.coursera.org/specializations/java-programming" },
    { "lang": "java", "category": "courses", "title": "Java Programming Masterclass", "source": "Udemy", "level": "中级", "description": "覆盖 Java 全栈开发的热门实战课程。", "url": "https://www.udemy.com/course/java-the-complete-java-developer-course/" },
    { "lang": "java", "category": "courses", "title": "Java Programming MOOC", "source": "赫尔辛基大学", "level": "入门", "description": "赫尔辛基大学免费的 Java 编程课程，含大量在线练习。", "url": "https://java-programming.mooc.fi/" },
    { "lang": "java", "category": "books", "title": "《Effective Java》第 3 版", "source": "Amazon · Joshua Bloch", "level": "高级", "description": "Java 最佳实践圣经，90 条深入浅出的编程准则。", "url": "https://www.amazon.com/dp/0134685997" },
    { "lang": "java", "category": "books", "title": "《Java Concurrency in Practice》", "source": "jcip.net", "level": "高级", "description": "Java 并发与线程安全的权威著作（官方书站）。", "url": "https://jcip.net/" },
    { "lang": "java", "category": "community", "title": "Baeldung Java 教程", "source": "Baeldung", "level": "中级", "description": "高质量的 Java 与 Spring 实战教程库。", "url": "https://www.baeldung.com/" },
    { "lang": "java", "category": "community", "title": "Awesome Java 资源清单", "source": "GitHub", "level": "中级", "description": "社区维护的 Java 生态优质资源聚合。", "url": "https://github.com/akullpp/awesome-java" },

    // ================= C++ =================
    { "lang": "cpp", "category": "docs", "title": "cppreference.com", "source": "cppreference", "level": "高级", "description": "C++ 标准库与语言特性的权威在线参考。", "url": "https://en.cppreference.com/w/" },
    { "lang": "cpp", "category": "docs", "title": "Learn C++ 系统教程", "source": "learncpp.com", "level": "入门", "description": "社区公认最好的免费 C++ 系统教程，从入门到进阶。", "url": "https://www.learncpp.com/" },
    { "lang": "cpp", "category": "docs", "title": "C++ Core Guidelines", "source": "isocpp.org", "level": "高级", "description": "C++ 之父与核心团队制定的现代 C++ 最佳实践。", "url": "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines" },
    { "lang": "cpp", "category": "courses", "title": "C++ For C Programmers", "source": "Coursera · 加州大学圣克鲁斯", "level": "中级", "description": "面向有 C 基础的开发者转型 C++ 的经典课程。", "url": "https://www.coursera.org/learn/c-plus-plus-a" },
    { "lang": "cpp", "category": "courses", "title": "C++ Education（Google 开发者）", "source": "Google for Developers", "level": "入门", "description": "Google 出品的免费 C++ 入门课程。", "url": "https://developers.google.com/edu/c++/" },
    { "lang": "cpp", "category": "books", "title": "《C++ Primer》第 5 版", "source": "Amazon · Addison-Wesley", "level": "中级", "description": "系统性最强的 C++ 权威教材，覆盖泛型与并发。", "url": "https://www.amazon.com/dp/0321714113" },
    { "lang": "cpp", "category": "books", "title": "《Effective Modern C++》", "source": "Amazon · Scott Meyers", "level": "高级", "description": "42 条现代 C++（C++11/14）最佳实践准则。", "url": "https://www.amazon.com/dp/1491903996" },
    { "lang": "cpp", "category": "books", "title": "《C++ Concurrency in Action》第 2 版", "source": "Manning", "level": "高级", "description": "C++ 多线程与并发编程的权威专著。", "url": "https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition" },
    { "lang": "cpp", "category": "community", "title": "LeetCode", "source": "LeetCode", "level": "中级", "description": "通过算法题精进 C++ 与数据结构。", "url": "https://leetcode.com/" },
    { "lang": "cpp", "category": "community", "title": "Awesome C++ 资源清单", "source": "GitHub", "level": "中级", "description": "社区维护的 C++ 生态优质资源聚合。", "url": "https://github.com/fffaraz/awesome-cpp" },

    // ================= Go =================
    { "lang": "go", "category": "docs", "title": "Go 官方文档", "source": "go.dev", "level": "入门", "description": "Go 官方教程、FAQ 与全部权威文档入口。", "url": "https://go.dev/doc/" },
    { "lang": "go", "category": "docs", "title": "A Tour of Go（Go 语言之旅）", "source": "go.dev", "level": "入门", "description": "Go 官方交互式入门教程，边学边练。", "url": "https://go.dev/tour/" },
    { "lang": "go", "category": "docs", "title": "Effective Go 高效 Go 编程", "source": "go.dev", "level": "中级", "description": "Go 官方编写惯用代码的权威指南。", "url": "https://go.dev/doc/effective_go" },
    { "lang": "go", "category": "courses", "title": "Programming with Google Go 专项课程", "source": "Coursera · Google", "level": "入门", "description": "Google 官方出品的 Go 专项课程（3 门系列）。", "url": "https://www.coursera.org/specializations/google-golang" },
    { "lang": "go", "category": "courses", "title": "Go: The Complete Developer's Guide", "source": "Udemy", "level": "中级", "description": "从基础到并发、HTTP 服务的全面实战课程。", "url": "https://www.udemy.com/course/go-the-complete-developers-guide/" },
    { "lang": "go", "category": "books", "title": "《The Go Programming Language》", "source": "gopl.io", "level": "中级", "description": "Go 语言作者的权威著作（官方推荐）。", "url": "https://www.gopl.io/" },
    { "lang": "go", "category": "books", "title": "《100 Go Mistakes and How to Avoid Them》", "source": "Manning", "level": "高级", "description": "100 个常见 Go 陷阱与最佳实践。", "url": "https://www.manning.com/books/100-go-mistakes-and-how-to-avoid-them" },
    { "lang": "go", "category": "community", "title": "Go by Example", "source": "gobyexample.com", "level": "中级", "description": "通过实例学习 Go 的经典网站，代码即教程。", "url": "https://gobyexample.com/" },
    { "lang": "go", "category": "community", "title": "Go Wiki: Learn Concurrency", "source": "go.dev Wiki", "level": "中级", "description": "Go 官方 Wiki 整理的并发学习资源清单。", "url": "https://go.dev/wiki/LearnConcurrency" },
    { "lang": "go", "category": "community", "title": "Awesome Go 资源清单", "source": "GitHub", "level": "中级", "description": "社区维护的 Go 生态优质资源聚合。", "url": "https://github.com/avelino/awesome-go" },

    // ================= Rust =================
    { "lang": "rust", "category": "docs", "title": "The Rust Book（Rust 程序设计语言）", "source": "doc.rust-lang.org", "level": "入门", "description": "Rust 官方权威教程，从入门到进阶，免费在线。", "url": "https://doc.rust-lang.org/book/" },
    { "lang": "rust", "category": "docs", "title": "Rust By Example（Rust 实例）", "source": "doc.rust-lang.org", "level": "中级", "description": "Rust 官方实例教程，通过可运行代码学习。", "url": "https://doc.rust-lang.org/rust-by-example/" },
    { "lang": "rust", "category": "docs", "title": "The Rust Reference 参考手册", "source": "doc.rust-lang.org", "level": "高级", "description": "Rust 语言的权威参考手册。", "url": "https://doc.rust-lang.org/reference/" },
    { "lang": "rust", "category": "docs", "title": "The Rustonomicon", "source": "doc.rust-lang.org", "level": "高级", "description": "深入 unsafe Rust 与底层原理的进阶文档。", "url": "https://doc.rust-lang.org/nomicon/" },
    { "lang": "rust", "category": "courses", "title": "Rust Programming 专项课程", "source": "Coursera · 杜克大学", "level": "入门", "description": "杜克大学 Rust 编程专项课程（3 门系列）。", "url": "https://www.coursera.org/specializations/rust-programming" },
    { "lang": "rust", "category": "courses", "title": "Comprehensive Rust（全面 Rust 课程）", "source": "Google", "level": "中级", "description": "Google 开源的 4 天 Rust 课程，覆盖核心到异步。", "url": "https://google.github.io/comprehensive-rust/" },
    { "lang": "rust", "category": "books", "title": "《Programming Rust》第 2 版", "source": "Amazon · O'Reilly", "level": "中级", "description": "深入讲解所有权、类型与异步的权威著作。", "url": "https://www.amazon.com/dp/1492052590" },
    { "lang": "rust", "category": "books", "title": "《Rust 程序设计语言》中文版", "source": "kaisery.github.io", "level": "入门", "description": "Rust Book 官方社区中文翻译版。", "url": "https://kaisery.github.io/trpl-zh-cn/" },
    { "lang": "rust", "category": "community", "title": "Exercism Rust Track", "source": "Exercism", "level": "中级", "description": "通过大量练习掌握 Rust 所有权与借用。", "url": "https://exercism.org/tracks/rust" },
    { "lang": "rust", "category": "community", "title": "Awesome Rust 资源清单", "source": "GitHub", "level": "中级", "description": "社区维护的 Rust 生态优质资源聚合。", "url": "https://github.com/rust-unofficial/awesome-rust" }
  ],
  "coaching": {
    "python": [
      {
        "topic": "生成器与惰性求值",
        "level": "中级",
        "explanation": "生成器函数（含 yield 的函数）不会一次性构建整个序列，而是按需产出元素，因此内存开销恒定。它与列表推导式不同：列表推导立即求值，生成器是惰性的，只能迭代一次。",
        "code": {
          "text": "def squares(n):\n    for i in range(n):\n        yield i * i\n\ns = squares(4)\nprint(next(s))   # 0\nprint(sum(s))    # 14（1+4+9）",
          "notes": [
            { "line": 1, "note": "含 yield 的函数变成生成器函数，调用不执行函数体，只返回生成器对象" },
            { "line": 2, "note": "每次 for 迭代到这里暂停，产出当前 i 的平方，下次从这继续" },
            { "line": 7, "note": "生成器是惰性的：这里才真正开始逐项产出" },
            { "line": 8, "note": "sum 会耗尽生成器；s 已被消费过 1 个元素，从 i=1 继续" }
          ]
        },
        "pitfalls": [
          "误以为生成器可以反复迭代——它是一次性的，遍历完再遍历得到空结果",
          "把 生成器表达式 (x for x in ...) 与 列表推导 [x for x in ...] 混用，前者是惰性对象、后者是列表"
        ],
        "exercise": {
          "question": "def gen():\\n    yield 1\\n    yield 2\\n\\nprint(sum(gen()))\\nprint(sum(gen())) 的结果是？",
          "options": ["3 与 0", "3 与 3", "1 与 2", "报错"],
          "answer": 1,
          "feedback": "每次调用 gen() 都创建全新的生成器对象，两次 sum 都是 1+2=3。若复用一个生成器对象，第二次才是 0。"
        }
      },
      {
        "topic": "装饰器与闭包",
        "level": "中级",
        "explanation": "装饰器本质是「接收函数、返回函数」的高阶函数。@decorator 只是语法糖，等价于 f = decorator(f)。理解闭包（内层函数捕获外层变量）是看懂装饰器的关键。",
        "code": {
          "text": "def timing(fn):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f\"{fn.__name__}: {time.perf_counter()-start:.4f}s\")\n        return result\n    return wrapper\n\n@timing\ndef work():\n    return 42",
          "notes": [
            { "line": 1, "note": "timing 接收原函数 fn" },
            { "line": 2, "note": "wrapper 是闭包：捕获外层 fn；*args/**kwargs 透传任意参数" },
            { "line": 4, "note": "先计时、再调用原函数、后输出耗时" },
            { "line": 8, "note": "返回 wrapper（未调用），真正的调用发生在 work() 时" },
            { "line": 11, "note": "@timing 等价于 work = timing(work)" }
          ]
        },
        "pitfalls": [
          "装饰后函数名与文档被替换——用 functools.wraps(fn) 保留元信息",
          "在装饰器里直接写死参数个数，导致无法装饰不同签名的函数——必须用 *args, **kwargs"
        ],
        "exercise": {
          "question": "装饰器 @timing 应用到 work 后，work.__name__ 的值是？",
          "options": ["\"work\"", "\"wrapper\"", "\"timing\"", "报错"],
          "answer": 1,
          "feedback": "未用 @functools.wraps 时，work 已被替换为 wrapper 函数，__name__ 变成 \"wrapper\"。这是装饰器最常见的坑。"
        }
      },
      {
        "topic": "列表推导与生成器表达式",
        "level": "入门",
        "explanation": "列表推导式 [expr for x in iterable if cond] 以声明式风格生成新列表，比等价 for 循环更简洁且通常更快。加上条件与嵌套时，读法顺序是「外层到内层、for 到 if」。",
        "code": {
          "text": "nums = [1, 2, 3, 4, 5, 6]\nsquares = [x * x for x in nums if x % 2 == 0]\n# [4, 16, 36]\n\nmatrix = [[1, 2], [3, 4]]\nflat = [y for row in matrix for y in row]\n# [1, 2, 3, 4]",
          "notes": [
            { "line": 2, "note": "对 nums 中每个 x，若为偶数则产出 x²" },
            { "line": 3, "note": "条件在 for 之后、表达式在 for 之前" },
            { "line": 6, "note": "嵌套顺序 = 普通循环的书写顺序：先 for row，再 for y" }
          ]
        },
        "pitfalls": [
          "把 if 条件写在表达式前（语法错误），正确位置在 for 之后",
          "嵌套推导式可读性差时硬凑一行——超过两层建议拆成普通循环"
        ],
        "exercise": {
          "question": "[x for x in range(10) if x % 3 == 0] 的结果是？",
          "options": ["[3, 6, 9]", "[0, 3, 6, 9]", "[0, 1, 2]", "[3, 6]"],
          "answer": 1,
          "feedback": "range(10) 含 0 到 9，其中被 3 整除的是 0、3、6、9，共 4 个。"
        }
      }
    ],
    "javascript": [
      {
        "topic": "闭包与作用域",
        "level": "中级",
        "explanation": "闭包是「函数 + 其词法环境」的组合：内层函数可以访问外层函数作用域中的变量，即使外层函数已经返回。这使函数可以「记住」创建时的状态，是模块模式与柯里化的基础。",
        "code": {
          "text": "function counter() {\n  let count = 0;\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst c = counter();\nconsole.log(c()); // 1\nconsole.log(c()); // 2",
          "notes": [
            { "line": 2, "note": "count 是 counter 的局部变量，但被返回的函数捕获" },
            { "line": 3, "note": "每次调用返回的新函数都引用同一个 count" },
            { "line": 9, "note": "counter 已返回，但 count 仍存活——这就是闭包" },
            { "line": 10, "note": "再次调用继续累加，证明状态被保留" }
          ]
        },
        "pitfalls": [
          "for 循环中用 var 声明变量再闭包捕获，全部指向同一个最终值——用 let 或立即执行函数解决",
          "认为闭包会「拷贝」变量值——实际是引用，变量变化闭包内可见"
        ],
        "exercise": {
          "question": "for (var i = 0; i < 3; i++) { arr.push(function(){ return i; }); } 之后 arr[0]() 的值是？",
          "options": ["0", "1", "2", "3"],
          "answer": 3,
          "feedback": "var 使 i 是函数级变量，三个闭包共享同一个 i，循环结束后 i=3，所以都返回 3。用 let 声明才能得到 0、1、2。"
        }
      },
      {
        "topic": "事件循环与宏任务/微任务",
        "level": "高级",
        "explanation": "JavaScript 是单线程的，通过事件循环调度异步任务。任务分两种：宏任务（setTimeout、I/O）与微任务（Promise.then、queueMicrotask）。每轮事件循环先清空微任务队列，再取一个宏任务执行。",
        "code": {
          "text": "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n// 输出顺序: A D C B",
          "notes": [
            { "line": 1, "note": "同步代码最先执行" },
            { "line": 2, "note": "setTimeout 回调是宏任务，即使 0ms 也要等本轮结束" },
            { "line": 3, "note": "Promise.then 是微任务，在同步代码后、宏任务前执行" },
            { "line": 5, "note": "顺序：A、D（同步）→ C（微任务）→ B（宏任务）" }
          ]
        },
        "pitfalls": [
          "误以为 setTimeout(..., 0) 立即执行——它至少等到宏任务队列轮到自己",
          "在微任务中不断产生新微任务会饿死宏任务（无限递归 Promise.then）"
        ],
        "exercise": {
          "question": "Promise.resolve().then(() => console.log(1)); setTimeout(() => console.log(2), 0); console.log(3); 的输出顺序？",
          "options": ["3 1 2", "1 3 2", "3 2 1", "2 3 1"],
          "answer": 0,
          "feedback": "同步 3 先执行 → 微任务 then 输出 1 → 宏任务 setTimeout 输出 2。"
        }
      },
      {
        "topic": "this 绑定与箭头函数",
        "level": "中级",
        "explanation": "普通函数的 this 由调用方式决定（调用点绑定）；箭头函数没有自己的 this，捕获定义时的外层 this。因此回调里要保留外层 this，用箭头函数最简洁，或用 bind/箭头函数替代传统 var self = this。",
        "code": {
          "text": "const obj = {\n  value: 10,\n  normal: function () { return this.value; },\n  arrow: () => this.value,\n};\n\nobj.normal(); // 10（obj 调用，this = obj）\nobj.arrow();  // undefined（this 来自外层，此处是全局）",
          "notes": [
            { "line": 3, "note": "普通方法：this 由调用点 obj 决定" },
            { "line": 4, "note": "箭头函数：this 在定义时被绑定到外层（此处为全局/模块）" },
            { "line": 7, "note": "obj.normal() 中 this 指向 obj" },
            { "line": 8, "note": "obj.arrow() 也不会改变 this——箭头函数 this 与调用点无关" }
          ]
        },
        "pitfalls": [
          "在对象方法中定义箭头函数却期待 this 指向对象——箭头函数会捕获外层 this",
          "在 DOM 事件监听里用普通函数时 this 指向元素，想要外层对象需 bind 或箭头函数"
        ],
        "exercise": {
          "question": "const obj = { x: 1, get: () => this.x }; obj.get() 的结果？",
          "options": ["1", "undefined", "报错", "null"],
          "answer": 1,
          "feedback": "箭头函数的 this 在定义时确定（此处为外层全局/模块），与 obj 无关，因此拿不到 obj.x，结果为 undefined。"
        }
      }
    ],
    "java": [
      {
        "topic": "泛型与类型擦除",
        "level": "高级",
        "explanation": "Java 泛型是编译期机制：编译器检查类型安全后，运行时擦除类型参数（List<String> 变为 List）。这带来兼容性，也带来无法 new T()、无法 instanceof T 等限制。",
        "code": {
          "text": "public class Box<T> {\n    private T value;\n    public Box(T value) { this.value = value; }\n    public T get() { return value; }\n}\n\nBox<String> box = new Box<>(\"hi\");\nString s = box.get(); // 编译期插入强转",
          "notes": [
            { "line": 1, "note": "T 是类型参数，运行时不存在" },
            { "line": 4, "note": "返回值 T 在运行时被替换为 Object 或上界，get() 处自动插入强转" },
            { "line": 7, "note": "菱形语法推断类型参数" },
            { "line": 8, "note": "赋值是编译期检查 + 字节码强转的结果" }
          ]
        },
        "pitfalls": [
          "试图 new T() / new T[] —— 类型参数在运行时已擦除，必须用 Class<T> 反射或工厂",
          "泛型静态字段（static T field）非法——静态成员不参与实例化，类型无法确定"
        ],
        "exercise": {
          "question": "List<String> list = new ArrayList<>(); list.add(\"a\"); 在运行时，list 中元素的类型是？",
          "options": ["String", "Object", "泛型被保留为 String", "无法添加"],
          "answer": 1,
          "feedback": "运行时类型擦除后 List 只存 Object，String 的检查与强转都发生在编译期/字节码层。"
        }
      },
      {
        "topic": "equals 与 hashCode 契约",
        "level": "中级",
        "explanation": "HashMap/HashSet 依赖 hashCode 定位桶、equals 判断相等。契约：equals 相等的对象 hashCode 必须相同；重写 equals 必须重写 hashCode，否则对象在集合中出现「找不到」的诡异行为。",
        "code": {
          "text": "@Override\npublic boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof Point p)) return false;\n    return x == p.x && y == p.y;\n}\n\n@Override\npublic int hashCode() {\n    return Objects.hash(x, y);\n}",
          "notes": [
            { "line": 3, "note": "同一引用直接相等，快速路径" },
            { "line": 4, "note": "instanceof 模式匹配：类型不符直接 false" },
            { "line": 5, "note": "比较业务字段" },
            { "line": 9, "note": "用相同字段生成 hashCode，保证与 equals 一致" }
          ]
        },
        "pitfalls": [
          "只重写 equals 不重写 hashCode——HashSet/HashMap 里 equals 永不被调用（桶都找不到）",
          "用可变字段参与 hashCode——对象放入集合后再修改字段，hashCode 变化导致无法删除"
        ],
        "exercise": {
          "question": "两个对象 equals 为 true 但 hashCode 不同，放入 HashSet 会发生什么？",
          "options": ["正常去重", "两个都保留（视为不同）", "抛出异常", "编译错误"],
          "answer": 1,
          "feedback": "HashSet 先用 hashCode 定位桶，哈希不同就视为不同元素，两个「相等」对象都会保留，破坏去重语义。"
        }
      },
      {
        "topic": "Stream 流式编程",
        "level": "中级",
        "explanation": "Stream 提供声明式的集合处理管线：中间操作（map/filter/sorted）是惰性的，终端操作（collect/forEach/count）才触发执行。它让「过滤→转换→归约」的代码比 for 循环更聚焦于意图。",
        "code": {
          "text": "List<Book> cheap = books.stream()\n    .filter(b -> b.getPrice() < 50)\n    .sorted(Comparator.comparing(Book::getPrice))\n    .limit(5)\n    .toList();",
          "notes": [
            { "line": 1, "note": "stream() 创建流，不修改原集合" },
            { "line": 2, "note": "filter：保留价格低于 50 的书" },
            { "line": 3, "note": "sorted：按价格升序（方法引用 Comparator.comparing）" },
            { "line": 5, "note": "toList() 是终端操作，此时才真正执行整条管线" }
          ]
        },
        "pitfalls": [
          "忘记 Stream 只能用一次——终端操作后流已关闭，再操作抛 IllegalStateException",
          "在 filter 里做有副作用操作（打印、修改外部状态）——Stream 期望无副作用纯函数"
        ],
        "exercise": {
          "question": "List.of(3,1,2).stream().filter(n -> n > 1).map(n -> n * 10).toList() 的结果？",
          "options": ["[30, 20]", "[3, 1, 2]", "[30, 10, 20]", "[20, 30]"],
          "answer": 2,
          "feedback": "filter 保留 3 和 2（大于 1），map 乘 10 得 30 和 20，保持原顺序 → [30, 20]。"
        }
      }
    ],
    "cpp": [
      {
        "topic": "移动语义与右值引用",
        "level": "高级",
        "explanation": "右值引用 T&& 配合 std::move 让对象「窃取」资源而非深拷贝。移动构造/移动赋值在资源密集型类中可显著提升性能。注意：std::move 本身不移动任何东西，只是把对象标记为可移动，实际移动发生在移动构造函数中。",
        "code": {
          "text": "class Buffer {\npublic:\n    Buffer(Buffer&& other) noexcept\n        : data_(other.data_), size_(other.size_) {\n        other.data_ = nullptr;\n        other.size_ = 0;\n    }\n    // ...\nprivate:\n    char* data_;\n    size_t size_;\n};\n\nstd::vector<Buffer> v;\nv.push_back(Buffer(1024)); // 触发移动而非拷贝",
          "notes": [
            { "line": 3, "note": "移动构造函数：参数是右值引用" },
            { "line": 4, "note": "直接接管对方的指针，不做深拷贝" },
            { "line": 6, "note": "关键：把源对象置空，避免双重释放（析构时不删有效数据）" },
            { "line": 13, "note": "临时对象是右值，push_back 优先走移动构造" }
          ]
        },
        "pitfalls": [
          "忘记把源对象置空——移动后源析构时会双重释放或悬垂",
          "对常量对象调用 std::move 无效（const T&& 无法移动，退化为拷贝）"
        ],
        "exercise": {
          "question": "std::move(obj) 真正做了什么？",
          "options": ["立即移动对象内容", "把 obj 转换为右值引用，等待移动构造/赋值使用", "复制 obj", "释放 obj 资源"],
          "answer": 1,
          "feedback": "std::move 只是 static_cast<T&&> 类型转换，不执行任何移动；真正的移动发生在移动构造函数或移动赋值运算符里。"
        }
      },
      {
        "topic": "RAII 与智能指针",
        "level": "中级",
        "explanation": "RAII（资源获取即初始化）：把资源（内存、文件、锁）绑定到对象生命周期，析构时自动释放。std::unique_ptr 独占所有权、std::shared_ptr 共享所有权（引用计数），优先使用它们替代裸 new/delete。",
        "code": {
          "text": "void process() {\n    std::unique_ptr<Widget> w =\n        std::make_unique<Widget>();\n    w->start();\n    // 离开作用域，自动 delete\n}",
          "notes": [
            { "line": 2, "note": "unique_ptr：独占所有权，不可拷贝" },
            { "line": 3, "note": "make_unique 更安全：异常时不会泄漏（对比 new Widget）" },
            { "line": 5, "note": "函数返回时 w 析构，内部 Widget 自动释放——无需手动 delete" }
          ]
        },
        "pitfalls": [
          "在构造函数里 new、析构函数里 delete 的手写管理——漏掉异常路径就泄漏，用智能指针成员替代",
          "shared_ptr 循环引用（A 持 B、B 持 A）导致引用计数永不归零——用 weak_ptr 打破"
        ],
        "exercise": {
          "question": "unique_ptr 的哪条特性是它优于 shared_ptr 的核心？",
          "options": ["更快的引用计数", "独占所有权，无额外计数开销且语义清晰", "支持拷贝", "支持多线程共享"],
          "answer": 1,
          "feedback": "unique_ptr 独占所有权：零引用计数开销、移动语义明确，是默认首选；需要共享时才用 shared_ptr。"
        }
      },
      {
        "topic": "虚函数与多态",
        "level": "中级",
        "explanation": "virtual 让派生类重写基类行为，通过基类指针/引用调用时动态分派到实际类型。虚函数表（vtable）在运行时决定调用目标，这也是多态的实现基础。基类析构函数应为 virtual，否则派生类析构不被调用。",
        "code": {
          "text": "class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\n    double r_;\npublic:\n    double area() const override { return 3.14 * r_ * r_; }\n};\n\nvoid print(Shape& s) { std::cout << s.area(); }",
          "notes": [
            { "line": 3, "note": "纯虚函数 = 抽象接口，Shape 不能实例化" },
            { "line": 4, "note": "虚析构：通过基类指针删除派生对象时正确调用派生析构" },
            { "line": 8, "note": "override 关键字：编译器检查确实重写了基类虚函数" },
            { "line": 11, "note": "传入 Circle 时调用 Circle::area——运行时多态" }
          ]
        },
        "pitfalls": [
          "基类析构函数不是 virtual——delete 基类指针时只调用基类析构，派生类资源泄漏",
          "构造函数里调用虚函数——构造阶段虚表尚未完成，不会分派到派生类"
        ],
        "exercise": {
          "question": "基类析构函数未声明 virtual，用基类指针 delete 派生对象会怎样？",
          "options": ["编译错误", "派生类析构不被调用（未定义行为/资源泄漏）", "正常调用全部析构", "只调用派生类析构"],
          "answer": 1,
          "feedback": "这是经典 UB：仅基类析构被调用，派生类成员（含动态资源）不会释放。多态基类必须声明 virtual 析构。"
        }
      }
    ],
    "go": [
      {
        "topic": "Channel 的阻塞语义",
        "level": "中级",
        "explanation": "channel 是 goroutine 间的通信管道：发送与接收默认阻塞。无缓冲 channel 要求收发同时就绪（同步交接）；有缓冲 channel 在缓冲未满/非空时非阻塞。方向（<-chan / chan<-）在函数参数中可约束。",
        "code": {
          "text": "ch := make(chan int, 2)\nch <- 1\nch <- 2\n// ch <- 3  // 阻塞：缓冲已满\n\nv := <-ch // 取 1，缓冲腾出\nclose(ch)  // 关闭后只能收不能发",
          "notes": [
            { "line": 1, "note": "缓冲为 2 的 channel" },
            { "line": 2, "note": "发送 1：缓冲空，直接放入" },
            { "line": 5, "note": "缓冲满时发送会阻塞，直到有接收方取走" },
            { "line": 6, "note": "从缓冲取走一个，v = 1" },
            { "line": 7, "note": "close 后向它发送会 panic，接收可继续读完剩余缓冲" }
          ]
        },
        "pitfalls": [
          "向已关闭的 channel 发送 → panic；只有发送方应该 close",
          "忘记关闭 channel，接收方 range 死等 → 需要发送方确定所有发送完成后 close"
        ],
        "exercise": {
          "question": "ch := make(chan int, 1); ch <- 1; 再执行 ch <- 2 会发生什么？",
          "options": ["正常发送", "阻塞直到有接收方", "panic", "覆盖值 1"],
          "answer": 1,
          "feedback": "缓冲已满（1/1），第二次发送阻塞，直到其他 goroutine 从 ch 接收腾出空间。"
        }
      },
      {
        "topic": "defer 的执行顺序与参数求值",
        "level": "中级",
        "explanation": "defer 把调用推迟到函数返回时执行，多个 defer 按 LIFO（后进先出）顺序执行。参数在 defer 语句处立即求值（值拷贝），而函数体内变量的「最终值」要到执行时才可见。",
        "code": {
          "text": "func main() {\n    defer fmt.Println(\"1\")\n    defer fmt.Println(\"2\")\n    // 输出: 2 1\n\n    x := 1\n    defer fmt.Println(x)   // 打印 1（参数立即求值）\n    x = 2                  // 不影响上面 defer 的实参\n}",
          "notes": [
            { "line": 2, "note": "第一个 defer 注册" },
            { "line": 3, "note": "第二个 defer 注册，LIFO 所以它先执行" },
            { "line": 4, "note": "输出顺序：2 然后 1" },
            { "line": 7, "note": "实参 x 在 defer 语句时求值为 1，之后 x=2 不影响" }
          ]
        },
        "pitfalls": [
          "期望 defer 捕获变量最终值——若要延迟求值，用闭包 defer func(){ fmt.Println(x) }()",
          "在循环里 defer 大量资源关闭——全部推迟到函数结束，可能堆积；考虑用子函数封装"
        ],
        "exercise": {
          "question": "x := 10; defer func() { fmt.Println(x) }(); x = 20; 输出？",
          "options": ["10", "20", "编译错误", "不确定"],
          "answer": 1,
          "feedback": "闭包延迟求值：defer 执行时读取 x 的当前值，此时 x 已是 20。若直接 defer fmt.Println(x) 则输出 10。"
        }
      },
      {
        "topic": "接口与类型断言",
        "level": "中级",
        "explanation": "Go 接口是隐式实现的：类型只要拥有接口要求的全部方法即自动满足接口，无需显式 implements。接口变量可持有任意满足类型，运行时用类型断言（x.(T)）或类型开关（switch v := x.(type)）取回具体类型。",
        "code": {
          "text": "type Writer interface { Write([]byte) (int, error) }\n\nfunc log(w Writer) {\n    if f, ok := w.(*os.File); ok {\n        fmt.Println(\"writing to file:\", f.Name())\n    }\n}",
          "notes": [
            { "line": 1, "note": "接口只声明方法集合" },
            { "line": 3, "note": "任何实现 Write 的类型都能传入" },
            { "line": 4, "note": "类型断言：ok 模式避免 panic" },
            { "line": 5, "note": "断言成功后才访问具体类型字段" }
          ]
        },
        "pitfalls": [
          "类型断言不加 ok 直接 x.(T)——失败时 panic；务必用逗号 ok 形式",
          "把 interface{}（空接口）当万能类型滥用——丢失类型信息，破坏可读性与性能"
        ],
        "exercise": {
          "question": "var v any = \"hi\"; n := v.(int) 会发生什么？",
          "options": ["n = 0", "panic（类型断言失败）", "n 为 nil", "编译错误"],
          "answer": 1,
          "feedback": "any 底层是字符串而非 int，未用 ok 形式的断言直接 panic。安全写法：n, ok := v.(int)。"
        }
      }
    ],
    "rust": [
      {
        "topic": "所有权与移动语义",
        "level": "入门",
        "explanation": "每个值有唯一所有者；赋值/传参时所有权转移（move），原变量失效。这从编译期杜绝了悬垂指针与双重释放。需要共享时用引用 & 或克隆 clone（显式成本）。",
        "code": {
          "text": "let s1 = String::from(\"hello\");\nlet s2 = s1;          // s1 被移动，之后不可再用\n// println!(\"{}\", s1); // 编译错误：值已移动\n\nlet s3 = &s2;         // 借用：只读访问，s2 仍有效\nprintln!(\"{}\", s3);  // 借用结束",
          "notes": [
            { "line": 1, "note": "s1 拥有 String 的所有权" },
            { "line": 2, "note": "赋值移动所有权：s1 失效，s2 成为新所有者" },
            { "line": 3, "note": "编译器拒绝使用已移动的值——这是 Rust 的安全保证" },
            { "line": 5, "note": "& 借用：不转移所有权，s2 继续有效" }
          ]
        },
        "pitfalls": [
          "把 String 传给函数后还想继续用——传 &s 借用，或函数返回所有权",
          "对 Copy 类型（i32、bool）与 Move 类型（String、Vec）的行为差异不清楚：Copy 是隐式复制"
        ],
        "exercise": {
          "question": "let a = String::from(\"x\"); let b = a; println!(\"{}\", a); 会发生什么？",
          "options": ["打印 x", "编译错误（a 已移动）", "打印空串", "运行时 panic"],
          "answer": 1,
          "feedback": "String 是 Move 类型：b = a 移动了所有权，a 不可再用，编译器直接报错——这正是 Rust 防止使用已释放内存的方式。"
        }
      },
      {
        "topic": "借用规则与生命周期",
        "level": "中级",
        "explanation": "借用规则：同一时刻要么有任意多个不可变借用（&），要么只有一个可变借用（&mut）。生命周期标注（<'a>）描述引用之间存活时间的关系，帮助编译器确保引用不会悬垂。",
        "code": {
          "text": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nlet s1 = String::from(\"abc\");\nlet result;\n{\n    let s2 = String::from(\"xy\");\n    result = longest(&s1, &s2);\n} // s2 在这里被释放\n// println!(\"{}\", result); // 编译错误：result 可能悬垂",
          "notes": [
            { "line": 1, "note": "'a 统一两个参数与返回值的生命周期" },
            { "line": 8, "note": "result 可能指向 s2" },
            { "line": 9, "note": "s2 作用域结束被释放" },
            { "line": 10, "note": "编译器发现 result 的生命周期可能超过 s2——拒绝编译" }
          ]
        },
        "pitfalls": [
          "同时持有一个可变借用和多个不可变借用——违背借用规则，编译错误",
          "错误地把生命周期标注当成「选择」——它只是约束，真实存活范围由作用域决定"
        ],
        "exercise": {
          "question": "let mut v = vec![1, 2, 3]; let r = &v[0]; v.push(4); println!(\"{}\", r); 会发生什么？",
          "options": ["打印 1", "编译错误（不可变借用与可变借用共存）", "打印 4", "panic"],
          "answer": 1,
          "feedback": "r 是不可变借用期间又执行 v.push（可变借用），违反借用规则，编译期直接报错。"
        }
      },
      {
        "topic": "Result 与错误处理",
        "level": "中级",
        "explanation": "Rust 没有异常，错误用 Result<T, E> 显式返回：Ok(T) 表示成功、Err(E) 表示失败。? 运算符把错误向上传播（在返回 Result 的函数中），配合自定义错误类型可实现清晰的分层错误处理。",
        "code": {
          "text": "fn read_num(path: &str) -> Result<i32, String> {\n    let text = std::fs::read_to_string(path)\n        .map_err(|e| format!(\"读取失败: {e}\"))?;\n    let n: i32 = text.trim().parse()\n        .map_err(|_| \"内容不是数字\".to_string())?;\n    Ok(n)\n}",
          "notes": [
            { "line": 1, "note": "显式返回 Result，错误类型为 String（简单场景）" },
            { "line": 2, "note": "read_to_string 返回 Result，? 在 Err 时提前返回" },
            { "line": 3, "note": "map_err 把底层错误转换成业务错误信息" },
            { "line": 6, "note": "Ok(n) 包装成功值" }
          ]
        },
        "pitfalls": [
          "用 unwrap/expect 到处解包——生产代码遇到错误直接 panic；应在边界处处理或传播",
          "丢失底层错误上下文——map_err 时保留原始错误（如 source），便于排查"
        ],
        "exercise": {
          "question": "在返回 Result 的函数中使用 ? 对 Err 值会做什么？",
          "options": ["panic", "把 Err 返回给调用方（提前返回）", "忽略错误继续执行", "转为 None"],
          "answer": 1,
          "feedback": "? 在 Err 时立即 return Err(...)，把错误传播给调用者；在 Ok 时解包出 T 继续执行。"
        }
      }
    ]
  },
  "learningPaths": {
    "python": [
      { "level": "入门", "note": "基础语法已掌握，先通读官方 Tutorial 巩固，再做 1-2 个小练习热身。", "steps": ["Python 官方教程", "Python for Everybody（Coursera）", "Exercism Python Track（前 20 题）"] },
      { "level": "中级", "note": "重点攻克列表推导/生成器/装饰器三个知识点，然后动手完成 CLI 待办项目。", "steps": ["Python HOWTOs 专题指南", "Real Python 教程库", "《Python Tricks》", "项目实践：CLI 待办工具"] },
      { "level": "高级", "note": "深入数据模型与性能：学习《流畅的 Python》，掌握迭代协议、上下文管理器与异步。", "steps": ["《流畅的 Python》第 2 版", "Python 标准库参考", "MIT 6.0001（强化计算思维）"] }
    ],
    "javascript": [
      { "level": "入门", "note": "先系统过一遍语法与 DOM 基础，用 freeCodeCamp 打牢算法与数据结构底子。", "steps": ["MDN JavaScript 指南", "freeCodeCamp JS 课程", "Exercism JavaScript Track"] },
      { "level": "中级", "note": "重点理解闭包与 this，用 JavaScript.info 的系统教程补全盲区，然后完成记事本 SPA。", "steps": ["JavaScript.info 教程", "Eloquent JavaScript", "项目实践：记事本 SPA"] },
      { "level": "高级", "note": "攻克事件循环与异步细节，研读 YDKJS 系列，加深对语言机制的理解。", "steps": ["You Don't Know JS 系列", "JavaScript: The Hard Parts", "CS50 Web 编程"] }
    ],
    "java": [
      { "level": "入门", "note": "先掌握类、集合与 Maven 基本流程，用赫尔辛基大学 MOOC 系统练习。", "steps": ["Java 编程 MOOC（赫尔辛基）", "Java Programming（Coursera）", "Oracle Java 官方教程"] },
      { "level": "中级", "note": "重点理解 equals/hashCode、Stream 与异常处理，动手完成图书管理系统。", "steps": ["Dev.java 官方站点", "Baeldung Java 教程", "项目实践：图书管理系统"] },
      { "level": "高级", "note": "研读《Effective Java》与并发专著，掌握泛型擦除、并发模型与性能调优。", "steps": ["《Effective Java》第 3 版", "《Java Concurrency in Practice》", "Java 语言规范（JLS）"] }
    ],
    "cpp": [
      { "level": "入门", "note": "先用 Learn C++ 系统教程建立语法与内存模型认知，配合 Google C++ 课程。", "steps": ["Learn C++ 系统教程", "C++ Education（Google）", "C++ For C Programmers"] },
      { "level": "中级", "note": "重点理解 RAII、智能指针与 STL，完成学生成绩统计系统项目。", "steps": ["《C++ Primer》第 5 版", "LeetCode 刷题巩固", "项目实践：成绩统计系统"] },
      { "level": "高级", "note": "研究移动语义、虚函数表与并发，对照 Core Guidelines 与现代 C++ 专著精进。", "steps": ["《Effective Modern C++》", "《C++ Concurrency in Action》", "C++ Core Guidelines"] }
    ],
    "go": [
      { "level": "入门", "note": "用 Go 官方 Tour 与 Effective Go 建立语言直觉，了解 goroutine 概念。", "steps": ["A Tour of Go", "Effective Go", "Programming with Google Go"] },
      { "level": "中级", "note": "重点攻克 channel 与 defer，通过 Go by Example 强化，再完成并发调度器项目。", "steps": ["Go by Example", "《The Go Programming Language》", "项目实践：并发任务调度器"] },
      { "level": "高级", "note": "深入并发模式与工程实践，研读 100 Go Mistakes 与官方并发 Wiki。", "steps": ["《100 Go Mistakes》", "Go Wiki: Learn Concurrency", "Go 官方文档"] }
    ],
    "rust": [
      { "level": "入门", "note": "通读 Rust Book 前 10 章建立所有权心智模型，配合 By Example 练习。", "steps": ["The Rust Book", "Rust By Example", "Rust Book 中文版"] },
      { "level": "中级", "note": "重点攻克借用规则与错误处理，通过 Exercism 练习，再完成 Mini Grep 项目。", "steps": ["Comprehensive Rust（Google）", "Exercism Rust Track", "项目实践：Mini Grep"] },
      { "level": "高级", "note": "深入 unsafe 与系统编程，研读 The Rustonomicon 与《Programming Rust》。", "steps": ["《Programming Rust》第 2 版", "The Rust Reference", "The Rustonomicon"] }
    ]
  }
};
