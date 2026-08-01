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
  ]
};
