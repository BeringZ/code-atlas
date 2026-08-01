// Code Atlas — "项目实践"栏目数据
// 每种语言一个综合实战项目：背景目标 / 技术要点 / 分阶段步骤 / 验收标准 / 思路提示（不给完整答案）
window.CODE_ATLAS_PROJECTS = {
  "site": {
    "name": "Code Atlas · 项目实践",
    "tagline": "用真实项目检验你对每种语言的掌控力"
  },
  "languages": [
    { "id": "python", "name": "Python", "tag": "PY", "color": "#3776ab" },
    { "id": "javascript", "name": "JavaScript", "tag": "JS", "color": "#f7df1e" },
    { "id": "java", "name": "Java", "tag": "JAVA", "color": "#e76f00" },
    { "id": "cpp", "name": "C++", "tag": "C++", "color": "#659ad2" },
    { "id": "go", "name": "Go", "tag": "GO", "color": "#00add8" },
    { "id": "rust", "name": "Rust", "tag": "RUST", "color": "#dea584" }
  ],
  "projects": [
    // ================= Python：命令行待办管理工具 =================
    {
      "lang": "python",
      "title": "命令行待办管理工具（CLI Todo）",
      "difficulty": "中级 · 渐进",
      "duration": "建议 3-5 天",
      "background": "几乎所有开发者都会写一个 CLI 工具。本项目让你完整走一遍「数据模型 → 文件持久化 → 命令行交互 → 测试」的工程链路，最终交付一个可日常使用的待办管理命令。",
      "goals": [
        "掌握 Python 命令行程序的标准结构（入口、参数解析、退出码）",
        "学会用 JSON 文件做轻量持久化，理解数据读写与容错",
        "用类组织业务逻辑，用 pytest 写出关键路径测试"
      ],
      "techPoints": ["argparse / click 参数解析", "JSON 序列化与反序列化", "面向对象设计（Task / TodoList）", "异常处理与用户输入校验", "pytest 单元测试", "项目结构：src/ 与 tests/ 分离"],
      "phases": [
        { "title": "阶段 1：核心数据模型（内存版）", "tasks": ["定义 Task 类：id、内容、是否完成、优先级、创建时间", "实现 TodoList 类：add / list / done / delete 四个方法", "先用 Python 交互式 REPL 手动调用验证逻辑"], "checkpoints": ["能创建任务并打印带编号的任务列表", "done/delete 对不存在的 id 有明确处理"] },
        { "title": "阶段 2：文件持久化", "tasks": ["选择存储位置（如 ~/.todo.json，可用 pathlib 处理路径）", "实现 save() 与 load()：把任务列表序列化为 JSON", "程序启动时自动加载、退出时自动保存"], "checkpoints": ["多次运行程序数据不丢失", "JSON 文件损坏时程序不崩溃，给出友好提示"] },
        { "title": "阶段 3：命令行交互", "tasks": ["用 argparse 定义子命令：todo add/list/done/delete", "支持 --all 显示已完成任务、--priority 过滤", "美化输出（编号、状态标记、颜色可选）"], "checkpoints": ["todo add 买菜 能正确创建", "todo list 输出稳定可读", "非法参数时 exit code 非 0"] },
        { "title": "阶段 4：测试与打磨", "tasks": ["为 TodoList 核心逻辑编写 pytest 测试（临时目录 fixture）", "补充边界：空列表、重复内容、超长内容", "编写 README 说明用法"], "checkpoints": ["pytest 全部通过", "命令行 --help 信息完整"] }
      ],
      "acceptance": [
        "命令行可完成增删查改，数据跨重启保留",
        "参数错误与文件损坏有优雅提示，不抛裸异常",
        "核心逻辑有单元测试覆盖并通过",
        "代码按 src/ 与 tests/ 组织，可运行 pytest"
      ],
      "hints": [
        "「思路提示」：把「存储」与「交互」解耦——先在 REPL 里把业务逻辑跑通，再接入 argparse，最后再补持久化，能显著降低调试成本。",
        "设计 id 时避免自增撞车：可用时间戳或 uuid 代替。",
        "测试持久化时用 pytest 的 tmp_path fixture，不要污染真实用户目录。",
        "提示：列表过滤可用一个统一的 filter 函数，配合 lambda 选择不同条件。"
      ],
      "referenceNote": "参考实现提示：核心接口 add/list/done/delete + JSON 存取 + argparse 子命令，约 150-250 行。若卡在 argparse 子命令语法，可先查阅官方文档示例再动手。"
    },

    // ================= JavaScript：浏览器记事本 SPA =================
    {
      "lang": "javascript",
      "title": "浏览器记事本（Notes SPA）",
      "difficulty": "中级 · 渐进",
      "duration": "建议 3-5 天",
      "background": "不依赖任何框架，用原生 JavaScript 构建一个单页记事本应用。它涵盖 DOM 操作、事件委托、本地存储与模块化，是检验「浏览器端 JS 基本功」的经典题目。",
      "goals": [
        "熟练 DOM 增删改查与事件委托",
        "掌握 localStorage 持久化与数据格式设计",
        "理解 ES Modules 拆分代码与模块边界",
        "学会用防抖优化高频输入"
      ],
      "techPoints": ["DOM 操作与模板字符串渲染", "事件委托（事件冒泡）", "localStorage 持久化", "ES Modules 模块化", "防抖 / 节流", "input/textarea 事件与表单校验"],
      "phases": [
        { "title": "阶段 1：静态渲染与新增", "tasks": ["搭建 index.html 结构：输入区 + 列表区", "用模板字符串渲染笔记卡片（标题、内容、时间）", "实现「新增笔记」并立即渲染到列表"], "checkpoints": ["输入内容后点保存，卡片出现在列表顶部", "空内容提交被拦截"] },
        { "title": "阶段 2：持久化与编辑删除", "tasks": ["设计存储格式：notes 数组，含 id/title/body/updatedAt", "读取时解析、写入时序列化，处理异常 JSON", "实现删除（事件委托）与编辑（点击卡片进入编辑态）"], "checkpoints": ["刷新页面数据保留", "删除单条笔记生效", "编辑保存后时间戳更新"] },
        { "title": "阶段 3：搜索与交互优化", "tasks": ["顶部加搜索框，按标题/内容过滤（用防抖避免每键重排）", "按更新时间倒序排列", "加入清空全部（二次确认）"], "checkpoints": ["输入关键词列表实时过滤", "防抖后输入高频字符不卡顿"] },
        { "title": "阶段 4：模块化重构", "tasks": ["拆分为 store.js（数据层）/ render.js（视图层）/ app.js（入口）", "用 ES Module import/export 连接各模块", "处理 localStorage 存储满或损坏的边界"], "checkpoints": ["type=module 下功能不回归", "数据层与视图层可独立修改"] }
      ],
      "acceptance": [
        "笔记增删改查完整，刷新不丢失",
        "搜索过滤实时且输入流畅",
        "代码按模块拆分，无全局变量污染",
        "浏览器控制台无报错"
      ],
      "hints": [
        "「思路提示」：先不碰 localStorage——把「数组 + 重渲染」这一循环跑顺，再插入存储层，出问题时更容易定位。",
        "重渲染整列表在小数据量下完全够用；性能优化（如只更新变化节点）留到阶段 4 再考虑。",
        "事件委托：把 click 监听挂在列表容器上，用 data-id 识别目标，避免为每条笔记单独绑定。",
        "注意：localStorage 只能存字符串，对象必须 JSON.stringify。"
      ],
      "referenceNote": "参考实现提示：store 层导出 load/save/upsert/remove 四个函数，render 层只读 store 返回的数组渲染，约 200-300 行。"
    },

    // ================= Java：图书管理系统 =================
    {
      "lang": "java",
      "title": "图书管理系统（Console + 文件）",
      "difficulty": "中级 · 渐进",
      "duration": "建议 4-6 天",
      "background": "图书管理是 OOP 教学的经典场景。本项目要求你从「类设计」出发，逐步加入集合管理、文件持久化、借还业务与单元测试，体验 Java 工程的标准节奏。",
      "goals": [
        "掌握类设计原则（职责单一、封装）与对象关系",
        "熟练使用集合框架（ArrayList / HashMap）",
        "学会文件读写与对象数据持久化（CSV / 序列化）",
        "用 JUnit 编写可重复的单元测试"
      ],
      "techPoints": ["类与封装（Book / Library / BorrowRecord）", "集合框架 ArrayList / HashMap", "文件 IO（BufferedReader/Writer）与 CSV", "异常处理（自定义异常）", "JUnit 5 单元测试", "Maven 项目结构"],
      "phases": [
        { "title": "阶段 1：类设计与内存 CRUD", "tasks": ["定义 Book（id、书名、作者、ISBN、是否在馆）", "定义 Library 类：addBook / findBook / removeBook", "控制台菜单：1 添加 2 查询 3 删除 4 退出"], "checkpoints": ["通过菜单完成增删查", "findBook 支持按书名模糊搜索"] },
        { "title": "阶段 2：文件持久化", "tasks": ["设计 CSV 存储格式（每行一本书，含各字段）", "启动加载 books.csv 到内存，退出写回", "处理文件不存在与格式错误"], "checkpoints": ["重启程序数据保留", "CSV 字段含逗号时能正确转义"] },
        { "title": "阶段 3：借还业务", "tasks": ["新增 BorrowRecord 记录借出人、日期", "借书：书在馆才能借；还书：校验记录存在", "统计在馆/借出数量，列出逾期书目（假设 30 天）"], "checkpoints": ["重复借同一本书被拒绝", "还书后库存恢复且记录更新"] },
        { "title": "阶段 4：异常处理与测试", "tasks": ["定义 BookNotFoundException、BookUnavailableException", "用 JUnit 为 Library 核心逻辑写测试（含临时文件）", "完善菜单输入校验（数字越界、空输入）"], "checkpoints": ["mvn test 全部通过", "异常场景输出友好中文提示"] }
      ],
      "acceptance": [
        "图书增删查、借还全流程可用且数据持久",
        "核心业务有 JUnit 测试覆盖并通过",
        "异常有统一处理，不打印堆栈给用户",
        "Maven 项目结构标准（src/main、src/test）"
      ],
      "hints": [
        "「思路提示」：先把 Library 当成纯内存类写测试，确认逻辑后再接文件 IO——测试与持久化解耦是最省时的路线。",
        "CSV 转义：字段含逗号时可用引号包裹，解析时处理引号；或用 Java 序列化（ObjectOutputStream）作为简化替代。",
        "借还记录用 Map<bookId, BorrowRecord> 比 List 查询更快也更直观。",
        "提示：JUnit 测试里用 @TempDir 生成临时文件，避免污染项目目录。"
      ],
      "referenceNote": "参考实现提示：Book/Library/BorrowRecord 三个核心类 + LibraryApp 菜单入口 + LibraryTest，约 350-500 行。"
    },

    // ================= C++：学生成绩统计系统 =================
    {
      "lang": "cpp",
      "title": "学生成绩统计系统",
      "difficulty": "进阶 · 渐进",
      "duration": "建议 4-6 天",
      "background": "本项目的核心是用 C++ 的 STL 容器与算法完成「录入 → 统计 → 排序 → 持久化」的数据处理管线，同时引入 CMake 工程化与 RAII/智能指针实践，是掌握现代 C++ 的良好试炼场。",
      "goals": [
        "熟练 vector / map / sort / lambda 组合使用",
        "掌握文件流读写与错误处理（fstream + exceptions）",
        "理解 RAII 与智能指针的基本运用",
        "会用 CMake 组织多文件项目"
      ],
      "techPoints": ["struct + vector 数据组织", "std::sort 与 lambda 比较器", "std::map 分组统计", "fstream 读写 CSV", "智能指针 std::unique_ptr", "CMake 多文件构建", "gdb / 断点调试"],
      "phases": [
        { "title": "阶段 1：录入与基础统计", "tasks": ["定义 Student 结构（姓名、学号、三门课成绩）", "循环录入到 vector，支持中途退出", "实现平均分、最高/最低分统计"], "checkpoints": ["录入 3 人以上统计正确", "平均分输出保留两位小数"] },
        { "title": "阶段 2：排序与排名", "tasks": ["按总分从高到低排序（std::sort + lambda）", "输出排名表：名次 姓名 总分 平均分", "支持按单科成绩切换排序依据"], "checkpoints": ["相同分数名次并列处理合理", "排序不改变原始录入顺序（拷贝而非原地破坏）"] },
        { "title": "阶段 3：文件持久化", "tasks": ["导出到 grades.csv（含表头）", "启动时从 CSV 导入，处理缺失文件", "用 std::getline 按行解析，注意字段校验"], "checkpoints": ["导出后能重新导入且数据一致", "CSV 缺字段的行被跳过并计数提示"] },
        { "title": "阶段 4：工程化与调试", "tasks": ["拆分为 student.h/cpp、stats.h/cpp、main.cpp", "用 CMake 构建（add_executable 多源文件）", "为统计函数加断言或简单测试；用调试器定位一处边界 bug"], "checkpoints": ["cmake -B build && cmake --build build 成功", "空数据与满数据边界不崩溃"] }
      ],
      "acceptance": [
        "录入 → 统计 → 排序 → 导入导出全流程可用",
        "内存管理正确（无泄漏、无悬垂，优先用值语义与智能指针）",
        "CMake 一键构建，多文件结构清晰",
        "对空文件/缺失文件/坏数据有容错"
      ],
      "hints": [
        "「思路提示」：先让 main.cpp 单文件跑通全部功能，再拆文件——拆文件主要改「声明/定义分离」，逻辑不变。",
        "std::sort 传 lambda 时注意捕获（[&] 捕获需要的变量）。",
        "读 CSV 用 while (std::getline(file, line)) 逐行处理，比一次性读入更稳。",
        "提示：想验证内存安全，可用 -fsanitize=address 编译跑一遍。"
      ],
      "referenceNote": "参考实现提示：Student/load/save/topK 四个模块，总计约 300-450 行。统计函数建议写成纯函数（输入 vector 输出结果），便于调试。"
    },

    // ================= Go：并发任务调度器 =================
    {
      "lang": "go",
      "title": "并发任务调度器（Worker Pool）",
      "difficulty": "进阶 · 渐进",
      "duration": "建议 4-6 天",
      "background": "Go 的并发是它的招牌能力。本项目让你亲手实现一个带并发执行、结果收集、超时控制与优雅退出的任务调度器，把 goroutine 与 channel 用得明明白白。",
      "goals": [
        "理解 goroutine 生命周期与 channel 同步",
        "实现经典的 worker pool 模式（生产者-消费者）",
        "掌握 context 超时取消与信号处理",
        "用 go test 验证并发正确性（含竞态检测）"
      ],
      "techPoints": ["goroutine 与 sync.WaitGroup", "channel（buffered / unbuffered）", "context.WithTimeout 超时控制", "os/signal 优雅退出", "并发安全（互斥或 channel 串行化）", "go test -race 竞态检测"],
      "phases": [
        { "title": "阶段 1：任务模型与串行执行", "tasks": ["定义 Task 结构（id、执行耗时、结果字段）", "实现串行执行器：依次执行任务并打印结果", "模拟任务用 time.Sleep 表示耗时"], "checkpoints": ["任务按顺序完成，结果正确"] },
        { "title": "阶段 2：Worker Pool 并发", "tasks": ["实现固定数量 worker，从 jobs channel 取任务", "结果通过 results channel 回传", "用 WaitGroup 等待全部 worker 结束"], "checkpoints": ["并发执行总耗时明显小于串行", "n 个任务全部有结果，无丢失无重复"] },
        { "title": "阶段 3：超时与取消", "tasks": ["用 context.WithTimeout 控制整体执行时限", "超时后停止派发新任务，已在执行的等待完成", "处理 Ctrl+C（os/signal）优雅退出并打印统计"], "checkpoints": ["超时后程序不悬挂、能正常退出", "统计信息（成功/失败/跳过）正确"] },
        { "title": "阶段 4：测试与竞态检查", "tasks": ["为调度器写并发测试（大量任务 + 短超时）", "运行 go test -race 确保无数据竞争", "补充文档注释并整理包结构"], "checkpoints": ["go test -race 全部通过", "任务结果有序性（如需保序）有说明"] }
      ],
      "acceptance": [
        "并发执行正确且可配置 worker 数量",
        "超时/中断场景能优雅退出且不泄漏 goroutine",
        "通过 go test -race 无数据竞争",
        "代码有清晰注释，无全局可变状态"
      ],
      "hints": [
        "「思路提示」：先画清楚四个要素——任务源、jobs 管道、worker 函数、结果收集——再动手写代码。",
        "关闭 channel 的时机是关键：通常由「唯一的发送方」负责 close。",
        "注意：range over channel 会在 channel 关闭后退出循环，这是收集结果的标准姿势。",
        "提示：遇到死锁先缩小并发数，再用 go test -v 打印执行轨迹。"
      ],
      "referenceNote": "参考实现提示：scheduler.go 提供 New(poolSize) / Submit(task) / Run(ctx) 接口，scheduler_test.go 覆盖并发与超时，约 250-350 行。"
    },

    // ================= Rust：迷你文本索引器 =================
    {
      "lang": "rust",
      "title": "迷你文本索引器（Mini Grep）",
      "difficulty": "进阶 · 渐进",
      "duration": "建议 5-7 天",
      "background": "用 Rust 重写一个类 grep 的命令行工具：递归遍历目录、匹配文本、格式化输出。它是练习所有权、迭代器、错误处理与测试的绝佳载体，也是 Rust Book 经典课后项目的深化版。",
      "goals": [
        "熟练所有权、借用与生命周期（String / &str 边界）",
        "掌握 Result/Option 的链式错误处理与自定义错误",
        "用迭代器链式处理集合（filter/map/flatten）",
        "写出带集成测试的完整 CLI 工具"
      ],
      "techPoints": ["所有权与借用（&str vs String）", "Result / Option / ? 运算符", "自定义错误类型（thiserror 或手写 Display）", "迭代器链式编程", "std::fs 目录递归（WalkDir 或手写栈）", "命令行参数解析（clap 或手写）", "cargo test 集成测试"],
      "phases": [
        { "title": "阶段 1：单文件搜索", "tasks": ["读取单个文件（std::fs::read_to_string）", "按行迭代，输出包含关键词的行号与内容", "处理文件不存在与编码异常"], "checkpoints": ["cargo run -- pattern file.txt 正确输出匹配行", "错误场景返回非零退出码"] },
        { "title": "阶段 2：递归目录遍历", "tasks": ["实现目录递归（手写 Vec<PathBuf> 栈，或引入 walkdir 依赖）", "跳过隐藏文件与二进制文件", "输出格式：文件名:行号:内容"], "checkpoints": ["嵌套目录全部覆盖", "无匹配时输出提示且退出码为 1（类 grep 约定）"] },
        { "title": "阶段 3：选项与结果整理", "tasks": ["支持 -i 忽略大小写、-n 仅行号、--count 统计", "结果按文件名与行号排序", "用迭代器链重构匹配逻辑"], "checkpoints": ["各选项组合行为正确", "核心逻辑无多余克隆（借用优先）"] },
        { "title": "阶段 4：错误处理与测试", "tasks": ["定义 SearchError 统一包装 IO/解析错误", "为匹配函数写单元测试（含空文件、大小写）", "为 CLI 行为写集成测试（tests/ 目录）"], "checkpoints": ["cargo test 与 cargo clippy 通过", "错误信息包含文件路径上下文"] }
      ],
      "acceptance": [
        "支持递归搜索、多选项组合、规范退出码",
        "匹配核心逻辑与 IO 分离，可独立测试",
        "所有权边界清晰：无多余 clone、无不必要生命周期标注",
        "cargo test / clippy / fmt 全部通过"
      ],
      "hints": [
        "「思路提示」：先把「读文件 → 逐行过滤 → 收集结果」的纯函数写出来并测试，再接入 CLI 与目录遍历——核心逻辑可测是最重要的。",
        "匹配函数签名可设计为 fn search_line<'a>(pattern: &str, line: &'a str) -> Option<&'a str>，练习生命周期标注。",
        "递归目录用手写栈（VecDeque push/pop）比递归函数更安全，避免深目录栈溢出。",
        "提示：clippy 的 many_single_char_names 等 lint 能帮你发现可读性问题。"
      ],
      "referenceNote": "参考实现提示：lib.rs 提供 search 纯函数，main.rs 负责参数解析与 IO，tests/cli.rs 验证退出码，约 300-420 行。"
    }
  ]
};
