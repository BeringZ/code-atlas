// Code Atlas 2.0 — 基础知识点补充数据（补齐全部模块，消除"建设中"占位）
// 与 concept-data.js 合并（atlas.js 运行时合并），最终覆盖全部 181 个知识点位点
window.CODE_ATLAS_2_SUPPLEMENT = {
  "concepts": [
    // ================= B00 编程与运行模型 =================
    { "id": "runtime.program-entry", "module_id": "B00", "title": "程序入口与执行顺序", "status": "published",
      "objectives": ["理解六语言的入口约定", "知道程序从哪一行开始执行"],
      "prerequisites": [],
      "core": "脚本语言从文件顶部逐行执行；编译/托管语言有显式入口函数。入口决定了「哪段代码先跑」，也影响「被导入时是否执行」。约定：脚本可用 if __name__ == '__main__' 区分导入与直接运行。",
      "lang_diff": "Python：顶层执行，if __name__=='__main__' 作入口守卫；JS（Node）：文件顶层执行；Java：public static void main(String[] args)；C++：int main()；Go：package main 的 func main()；Rust：fn main()。",
      "exercises": [
        { "type": "concept", "question": "Java 程序入口的签名是？", "options": ["顶层代码", "func main()", "fn main()", "public static void main(String[] args)"], "answer": 3, "feedback": "Java 需要 public static void main(String[] args)。" },
        { "type": "read", "question": "Python if __name__=='__main__' 的作用是？", "options": ["仅直接运行时执行，被导入时不执行", "声明主类", "定义入口函数", "必须存在"], "answer": 0, "feedback": "该守卫让文件既能被导入也能作为脚本运行。" }
      ]
    },
    { "id": "runtime.compile-interpret", "module_id": "B00", "title": "编译、解释与 JIT", "status": "published",
      "objectives": ["对比编译、解释与 JIT 的执行模型", "理解各语言到「机器行为」的路径"],
      "prerequisites": ["runtime.program-entry"],
      "core": "代码变成机器行为有三条路：编译（源码→机器码/字节码，如 C++/Rust 直接编译、Java 编译成字节码）、解释（逐行执行，如传统 Python）、JIT（运行时编译热点代码，如 Java JVM、JS V8）。模型影响启动速度、峰值性能与调试体验。",
      "lang_diff": "Python：CPython 先编译为字节码再解释执行；JS：V8 解释 + JIT 编译热点；Java：javac 编译为字节码，JVM 解释 + JIT；C++/Rust：直接编译为机器码；Go：直接编译为机器码。",
      "exercises": [
        { "type": "concept", "question": "Java 字节码由谁执行并优化？", "options": ["链接器", "直接 CPU", "JVM 解释 + JIT 编译热点", "编译器一次性"], "answer": 2, "feedback": "JVM 解释执行并对热点方法 JIT 编译，兼顾启动与峰值。" },
        { "type": "concept", "question": "哪个语言直接编译为机器码运行？", "options": ["C++", "JavaScript", "Python", "Java"], "answer": 0, "feedback": "C++/Rust/Go 直接编译为机器码；Python/JS/Java 依赖解释或 JIT。" }
      ]
    },
    { "id": "runtime.errors-kinds", "module_id": "B00", "title": "编译错误、运行错误与逻辑错误", "status": "published",
      "objectives": ["区分三类错误的暴露时机", "按错误类型选择排查策略"],
      "prerequisites": ["runtime.program-entry"],
      "core": "错误按暴露时机分三类：编译错误（语法/类型问题，编译期暴露，如缺分号、类型不匹配）、运行错误（运行时异常/崩溃，如除零、空指针、文件不存在）、逻辑错误（程序能跑但结果错，最难排查，如边界 off-by-one）。强类型编译语言把更多错误提前到编译期。",
      "lang_diff": "编译期兜底：Rust/C++/Go 最强；Java 次之（受检异常强制处理）；运行期暴露：Python/JS 最多（动态类型）；逻辑错误与语言无关，靠测试与调试定位。",
      "exercises": [
        { "type": "concept", "question": "「数组越界」在多数语言中属于哪类错误？", "options": ["编译错误", "逻辑错误", "运行错误", "网络错误"], "answer": 2, "feedback": "越界在运行时抛异常/未定义行为；Rust 中部分可被编译器静态阻止。" },
        { "type": "concept", "question": "哪个语言把「空指针」类错误在编译期大量消除？", "options": ["JavaScript", "Java", "Rust", "Python"], "answer": 2, "feedback": "Rust 的 Option + 所有权在编译期消除空指针与悬垂引用。" }
      ]
    },
    { "id": "runtime.tooling-roles", "module_id": "B00", "title": "终端、REPL 与 IDE 的角色", "status": "published",
      "objectives": ["理解三种开发环境的分工", "选择适合当前任务的交互方式"],
      "prerequisites": [],
      "core": "终端：运行命令行程序与脚本；REPL（Read-Eval-Print Loop）：交互式逐行求值，适合试验 API 与小段逻辑；IDE：整合编辑、调试、补全与项目管理，适合工程开发。三者互补：用 REPL 探索、用 IDE 编码、用终端运行与部署。",
      "lang_diff": "REPL：Python 内置 python、JS 有 node、Rust 有 cargo script 或 evcxr；Go 无官方 REPL（go run 代替）；Java 有 jshell；C++ 无标准 REPL。IDE：VS Code/IDEA/CLion 覆盖全部语言。",
      "exercises": [
        { "type": "concept", "question": "REPL 最适合什么任务？", "options": ["部署服务", "构建打包", "版本管理", "交互式试验 API 与小段逻辑"], "answer": 3, "feedback": "REPL 逐行求值、即时反馈，最适合探索性试验。" },
        { "type": "concept", "question": "哪个语言有官方交互式 REPL jshell？", "options": ["Go", "C++", "Java", "Rust"], "answer": 2, "feedback": "Java 9+ 提供 jshell 交互式执行环境。" }
      ]
    },

    // ================= B01 开发环境与工具链 =================
    { "id": "env.install", "module_id": "B01", "title": "运行时 / 编译器安装", "status": "published",
      "objectives": ["掌握各语言官方安装路径", "验证安装是否成功"],
      "prerequisites": [],
      "core": "语言环境安装首选官方渠道：官网安装包或系统包管理器。安装后必做验证——在终端执行版本命令确认 PATH 配置生效，避免「装了但命令找不到」。",
      "lang_diff": "Python：python.org/winget/brew/apt，验证 python --version；JS：nodejs.org，验证 node -v；Java：Temurin/OpenJDK，验证 java -version && javac -version；C++：MSVC/MinGW/Xcode CLT/build-essential，验证 g++ --version；Go：go.dev，验证 go version；Rust：rustup，验证 rustc --version && cargo --version。",
      "exercises": [
        { "type": "concept", "question": "Rust 的官方安装工具是？", "options": ["sdkman", "rustup", "nvm", "brew"], "answer": 1, "feedback": "rustup 同时安装 rustc 与 cargo 并管理工具链。" },
        { "type": "read", "question": "Java 安装后验证编译器是否可用的命令是？", "options": ["go version", "javac -version", "node -v", "java -version"], "answer": 1, "feedback": "javac -version 验证编译器，java -version 验证运行时。" }
      ]
    },
    { "id": "env.editor-lsp", "module_id": "B01", "title": "编辑器插件与语言服务器", "status": "published",
      "objectives": ["理解 LSP 如何让编辑器变智能", "为每种语言配置官方语言服务器"],
      "prerequisites": ["env.install"],
      "core": "语言服务器协议（LSP）把「补全、跳转、诊断、重构」从 IDE 内部能力抽象为独立进程：编辑器（VS Code/Vim/Neovim）通过 LSP 与语言服务器通信，一次实现多编辑器复用。配置好语言服务器，任何编辑器都能获得类 IDE 体验。",
      "lang_diff": "Python：Pylance；JS/TS：内置 TypeScript Server + ESLint；Java：Eclipse JDT Language Server；C++：clangd；Go：gopls；Rust：rust-analyzer。VS Code 均已有一键安装的官方扩展。",
      "exercises": [
        { "type": "concept", "question": "Rust 的官方语言服务器是？", "options": ["rust-analyzer", "Pylance", "gopls", "clangd"], "answer": 0, "feedback": "rust-analyzer 提供补全、诊断与内联提示。" },
        { "type": "concept", "question": "LSP 的核心价值是？", "options": ["自动部署", "加快编译", "编辑器与语言能力解耦，一次实现多编辑器复用", "格式化代码"], "answer": 2, "feedback": "LSP 让语言能力独立于具体编辑器，一次实现随处可用。" }
      ]
    },
    { "id": "env.cli-run", "module_id": "B01", "title": "命令行编译与运行", "status": "published",
      "objectives": ["用命令行完成编译与运行", "理解单文件与工程项目的运行差异"],
      "prerequisites": ["env.install"],
      "core": "单文件可直接编译/解释运行：python main.py、node app.js、go run main.go、rustc main.rs；编译语言需先编译再执行：javac + java、g++ -o main && ./main。工程项目用构建工具统一入口（cargo run、mvn exec、go run .、npm start）。",
      "lang_diff": "直接运行：python main.py、node app.js；编译运行：javac Main.java && java Main、g++ main.cpp -o main && ./main；工程运行：cargo run、go run .、mvn exec:java、npm run dev。",
      "exercises": [
        { "type": "concept", "question": "Rust 工程的标准运行命令是？", "options": ["npm start", "go run .", "cargo run", "rustc main.rs"], "answer": 2, "feedback": "cargo run 编译并执行当前 crate 的主程序。" },
        { "type": "read", "question": "C++ 单文件编译并运行的完整命令是？", "options": ["g++ main.cpp -o main && ./main", "python main.cpp", "javac main.cpp", "cargo run"], "answer": 0, "feedback": "先 g++ 编译为可执行文件，再执行。" }
      ]
    },
    { "id": "env.debugger", "module_id": "B01", "title": "断点、单步与变量观察", "status": "published",
      "objectives": ["用调试器而非 print 定位问题", "掌握断点与单步执行"],
      "prerequisites": ["env.editor-lsp"],
      "core": "调试器让程序在任意位置暂停并检查状态：设置断点 → 触发 → 单步（step over/into/out）→ 观察变量与调用栈。相比 print 调试，断点调试能精确定位复杂逻辑错误，且可在不修改代码的情况下观察中间状态。",
      "lang_diff": "Python：pdb / VS Code 调试器；JS：浏览器 DevTools / Node --inspect；Java：IDEA 调试器；C++：gdb / lldb；Go：delve（dlv）；Rust：rust-gdb / CodeLLDB。",
      "exercises": [
        { "type": "concept", "question": "「单步进入函数内部」对应的调试操作是？", "options": ["step over", "step into", "step out", "continue"], "answer": 1, "feedback": "step into 进入被调用函数；step over 跳过函数体。" },
        { "type": "concept", "question": "Go 的官方调试器是？", "options": ["gdb", "lldb", "jshell", "delve"], "answer": 3, "feedback": "delve（dlv）是 Go 的标准调试器。" }
      ]
    },
    { "id": "env.formatter-linter", "module_id": "B01", "title": "格式化器与 Linter", "status": "published",
      "objectives": ["用工具自动统一代码风格", "用静态检查捕获常见错误"],
      "prerequisites": ["env.cli-run"],
      "core": "格式化器（formatter）自动排版消除风格争议；Linter 静态分析代码发现潜在错误与坏味道（未使用变量、危险模式）。将两者接入提交钩子与 CI，让风格一致与质量底线自动化。",
      "lang_diff": "Python：Black/Ruff；JS：Prettier/ESLint；Java：Checkstyle/Spotless；C++：clang-format/clang-tidy；Go：gofmt（官方强制）/go vet/staticcheck；Rust：rustfmt/clippy（官方）。",
      "exercises": [
        { "type": "concept", "question": "Go 的官方强制格式化工具是？", "options": ["gofmt", "black", "rustfmt", "prettier"], "answer": 0, "feedback": "gofmt 是 Go 官方强制统一的格式化工具。" },
        { "type": "concept", "question": "Rust 的静态检查工具是？", "options": ["checkstyle", "clippy", "ruff", "eslint"], "answer": 1, "feedback": "clippy 提供 Rust 的 lint 规则集。" }
      ]
    },
    { "id": "env.package-manager", "module_id": "B01", "title": "包管理器与依赖安装", "status": "published",
      "objectives": ["声明并安装第三方依赖", "理解锁文件的作用"],
      "prerequisites": ["env.cli-run"],
      "core": "包管理器解决「我需要用别人写好的库」：声明依赖（requirements/package.json/pom.xml/go.mod/Cargo.toml）→ 解析下载 → 生成锁文件（锁定精确版本保证可复现）。锁文件必须入库，保证团队与 CI 拿到完全一致的依赖。",
      "lang_diff": "Python：pip + requirements.txt；JS：npm + package.json + package-lock；Java：Maven pom.xml；C++：vcpkg/Conan + 锁；Go：go.mod + go.sum；Rust：Cargo.toml + Cargo.lock。",
      "exercises": [
        { "type": "concept", "question": "锁文件（lockfile）的核心作用是？", "options": ["加快下载", "删除依赖", "加密代码", "锁定依赖精确版本保证可复现构建"], "answer": 3, "feedback": "锁文件记录解析后的精确版本，确保各环境一致。" },
        { "type": "concept", "question": "Go 的依赖清单与锁文件分别是？", "options": ["pom.xml / lock", "go.mod / go.sum", "package.json / yarn.lock", "Cargo.toml / Cargo.lock"], "answer": 1, "feedback": "go.mod 声明模块与依赖，go.sum 记录校验和。" }
      ]
    },
    { "id": "env.project-template", "module_id": "B01", "title": "项目模板与目录约定", "status": "published",
      "objectives": ["按生态约定组织项目目录", "用脚手架快速创建规范项目"],
      "prerequisites": ["env.package-manager"],
      "core": "每个生态都有事实标准的目录结构：源码与测试分离、配置集中在根、依赖声明清晰。遵循约定让新人快速上手、让工具自动发现源码与测试。脚手架（cargo new、create-vite、mvn archetype）一键生成规范骨架。",
      "lang_diff": "Python：src/ + tests/ + pyproject.toml；JS：src/ + package.json；Java：src/main/java + src/test/java（Maven 标准）；C++：include/ + src/ + CMakeLists.txt；Go：cmd/ + internal/ + pkg/ + go.mod；Rust：src/ + tests/ + Cargo.toml。",
      "exercises": [
        { "type": "concept", "question": "Java Maven 项目的标准源码目录是？", "options": ["src/main/java", "src/", "main/", "code/"], "answer": 0, "feedback": "Maven 约定 src/main/java 放源码，src/test/java 放测试。" },
        { "type": "concept", "question": "Rust 一键创建工程骨架的命令是？", "options": ["cargo new", "npm init", "mvn archetype", "go mod init"], "answer": 0, "feedback": "cargo new 生成 src/ 与 Cargo.toml 的规范项目。" }
      ]
    },
    { "id": "env.environment-vars", "module_id": "B01", "title": "环境变量与本地配置", "status": "published",
      "objectives": ["用环境变量管理配置与敏感信息", "区分开发/生产环境配置"],
      "prerequisites": ["env.install"],
      "core": "环境变量把「配置」与「代码」分离：数据库连接、API 密钥等不应硬编码入库，而放在环境变量或 .env 文件（gitignore）。按环境（开发/测试/生产）切换配置，保证敏感信息不外泄、同一代码多环境运行。",
      "lang_diff": "Python：os.environ / python-dotenv；JS：process.env / dotenv；Java：System.getenv / 配置中心；C++：std::getenv；Go：os.Getenv / viper；Rust：std::env::var。.env 均不入库，用 .env.example 占位。",
      "exercises": [
        { "type": "concept", "question": "API 密钥等敏感配置应该放在哪里？", "options": ["README", "注释里", "环境变量或 .env（不入库）", "硬编码进源码"], "answer": 2, "feedback": "敏感信息必须放在环境变量或 gitignore 的 .env，避免泄露入库。" },
        { "type": "concept", "question": "Go 读取环境变量的标准函数是？", "options": ["env.get", "process.env", "os.Getenv", "std::env"], "answer": 2, "feedback": "os.Getenv(\"KEY\") 读取环境变量。" }
      ]
    },

    // ================= B02 值、变量与类型 =================
    { "id": "value.constants", "module_id": "B02", "title": "常量与不可变绑定", "status": "published",
      "objectives": ["用常量表达「不应改变」的值", "理解绑定不可变与值不可变的区别"],
      "prerequisites": ["value.binding"],
      "core": "常量用于固定值：魔法数字提取为命名常量提升可读性与可维护性。注意「绑定不可变」（不能重新指向）与「值不可变」（对象内部不能改）的区别——const 对象属性仍可能可变。",
      "lang_diff": "Python：约定大写命名（非强制）；JS：const 绑定不可变（对象属性可变）；Java：final 绑定不可变（对象内部可变）；C++：const/constexpr 编译期常量；Go：const 编译期常量；Rust：let 默认不可变，const 为编译期常量。",
      "exercises": [
        { "type": "concept", "question": "JS 中 const obj = {}; obj.x = 1 是否合法？", "options": ["编译错误", "合法（const 只约束绑定）", "运行时错误", "obj 变为 null"], "answer": 1, "feedback": "const 禁止重新指向，不禁止修改对象属性。" },
        { "type": "read", "question": "C++ 中编译期常量用哪个关键字？", "options": ["final", "static", "const 或 constexpr", "let"], "answer": 2, "feedback": "constexpr 声明编译期可求值的常量。" }
      ]
    },
    { "id": "value.primitive-types", "module_id": "B02", "title": "整数、浮点数、布尔与字符", "status": "published",
      "objectives": ["掌握基础数值类型", "理解类型大小与精度限制"],
      "prerequisites": ["value.binding"],
      "core": "基础类型是数据的起点：整数（int）、浮点数（float/double）、布尔（bool）、字符（char）。要点：类型大小决定取值范围与精度；浮点数不精确（0.1+0.2≠0.3）；字符与编码相关。",
      "lang_diff": "Python：int 任意精度、float 双精度；JS：Number 双精度（BigInt 大整数）；Java：byte/short/int/long/float/double/char/boolean 定宽；C++：int/long long/double/char 定宽；Go：int/int64/float64/rune；Rust：i32/i64/f64/char（Unicode 标量）。",
      "exercises": [
        { "type": "concept", "question": "JS 中处理大整数应使用？", "options": ["string", "BigInt", "float", "char"], "answer": 1, "feedback": "BigInt 支持任意精度整数，避免 Number 精度丢失。" },
        { "type": "read", "question": "0.1 + 0.2 === 0.3 在 JS 中的结果与原因？", "options": ["undefined", "false（浮点二进制不精确）", "true", "报错"], "answer": 1, "feedback": "浮点数以二进制存储，0.1/0.2 无法精确表示，比较需用容差。" }
      ]
    },
    { "id": "value.string-bytes", "module_id": "B02", "title": "字符串与字节序列", "status": "published",
      "objectives": ["区分字符序列与字节序列", "处理文本与二进制数据"],
      "prerequisites": ["value.primitive-types"],
      "core": "字符串是「字符的逻辑序列」，字节是「内存中的原始数据」。文本编码（UTF-8）把字符变成字节；处理文件/网络 IO 时操作的是字节，需显式编码/解码。混淆两者是中文乱码与截断错误的根源。",
      "lang_diff": "Python：str（Unicode 字符）/ bytes（字节），encode/decode 转换；JS：String（UTF-16 码元）/ Uint8Array（字节）；Java：String / byte[]；C++：std::string（字节串）/ std::u8string；Go：string（UTF-8 字节）/ []byte；Rust：String/&str（UTF-8）/ Vec<u8>/&[u8]。",
      "exercises": [
        { "type": "concept", "question": "Python 中把字符串转为 UTF-8 字节的方法是？", "options": ["to_string()", "bytes()", "decode()", "encode()"], "answer": 3, "feedback": "str.encode('utf-8') 得 bytes；bytes.decode() 得 str。" },
        { "type": "read", "question": "Go 中 string 的 range 遍历单位是？", "options": ["rune（UTF-8 码点）", "字节", "码元", "字符数组"], "answer": 0, "feedback": "range 对 string 按 rune 迭代，索引访问是字节。" }
      ]
    },
    { "id": "value.static-dynamic", "module_id": "B02", "title": "静态类型与动态类型", "status": "published",
      "objectives": ["对比静态与动态类型系统", "理解各语言类型检查的时点"],
      "prerequisites": ["value.primitive-types"],
      "core": "静态类型：变量类型编译期确定（Java/C++/Go/Rust），编译器提前发现类型错误；动态类型：变量类型运行时确定（Python/JS），灵活但错误延迟到运行期。强弱类型是另一维度：强类型禁止隐式危险转换。",
      "lang_diff": "静态强类型：Java/C++/Go/Rust（Rust 还有类型推断）；动态强类型：Python（运行期类型但严格）；动态弱类型：JS（隐式转换多，如 '5'+1='51'）。静态语言也可有类型推断（auto/:=/var）。",
      "exercises": [
        { "type": "concept", "question": "「'5' + 1 得 '51'」体现了哪种类型特性？", "options": ["动态强类型", "静态强类型", "静态弱类型", "动态弱类型（隐式转换）"], "answer": 3, "feedback": "JS 的隐式字符串拼接是动态弱类型的典型表现。" },
        { "type": "concept", "question": "Rust 属于哪种类型系统？", "options": ["动态强类型", "动态弱类型", "静态强类型 + 类型推断", "无类型"], "answer": 2, "feedback": "Rust 是静态强类型，编译期检查且支持推断。" }
      ]
    },
    { "id": "value.type-inference", "module_id": "B02", "title": "显式类型与类型推断", "status": "published",
      "objectives": ["用类型推断减少样板", "知道何时应显式标注类型"],
      "prerequisites": ["value.static-dynamic"],
      "core": "类型推断让编译器根据右侧表达式自动确定变量类型，省去冗余标注（let x = 5 推断为整数）。推断适合局部变量且初始化即明了的场景；公共 API、复杂表达式、类型不直观时应显式标注以提升可读性。",
      "lang_diff": "Python：类型注解（hint）不强制（def f(x: int) -> str）；JS：TypeScript 推断 + 注解；Java：var（Java 10+ 局部推断）；C++：auto；Go：:=；Rust：let 默认推断，可加 :T 显式。",
      "exercises": [
        { "type": "concept", "question": "C++ 中根据初始化表达式推断类型的关键字是？", "options": ["var", "type", "let", "auto"], "answer": 3, "feedback": "auto 让编译器推断类型，避免冗长模板类型书写。" },
        { "type": "read", "question": "Go 中 count := 0 的类型推断结果是？", "options": ["需显式标注", "string", "float64", "int"], "answer": 3, "feedback": ":= 根据右侧 0 推断为 int。" }
      ]
    },
                {
      "id": "value.mutability",
      "module_id": "B02",
      "title": "可变与不可变",
      "status": "published",
      "objectives": [
        "选择默认不可变提升安全性",
        "理解不可变数据结构的并发友好性"
      ],
      "prerequisites": [
        "value.binding",
        "value.semantics"
      ],
      "core": "不可变数据创建后不可修改，修改即生成新值。好处：可安全共享（并发无需加锁）、可缓存、行为可预测；代价：频繁修改产生分配开销。最佳实践：默认不可变，需要局部可变时再显式声明。",
      "lang_diff": "Python：tuple/frozenset 不可变、list/dict 可变；JS：Object.freeze 浅冻结；Java：record/Collections.unmodifiable 包装；C++：const 修饰；Go：string 不可变、slice/map 可变；Rust：默认不可变，mut 显式可变。",
      "exercises": [
        {
          "id": "m-q1",
          "type": "quiz",
          "question": "Python 中 s=\"abc\"; s2=s+\"x\" 执行后，s 的值是？",
          "options": [
            "\"abc\"",
            "报错",
            "空字符串",
            "\"abcx\""
          ],
          "answer": 0,
          "feedback": "字符串不可变，s+\"x\" 生成新字符串赋给 s2，s 保持 \"abc\" 不变。"
        },
        {
          "id": "m-q2",
          "type": "quiz",
          "question": "JS 中 const o={a:1}; o.b=2 是否合法？",
          "options": [
            "合法，但 o 会变成字符串",
            "合法，const 只约束绑定不约束内容",
            "不合法，语法错误",
            "不合法，const 对象不可修改"
          ],
          "answer": 1,
          "feedback": "const 防的是重新赋值，对象内容仍可变——这是最常见的可变性误解。"
        },
        {
          "id": "m-q3",
          "type": "quiz",
          "question": "哪个语言默认绑定不可变（需显式声明才可变）？",
          "options": [
            "JavaScript",
            "Python",
            "Rust",
            "C++"
          ],
          "answer": 2,
          "feedback": "Rust 的 let 默认不可变，let mut 才可变；C++/JS/Python 默认都可变。"
        },
        {
          "id": "m-q4",
          "type": "quiz",
          "question": "不可变数据的最大并发优势是？",
          "options": [
            "无需垃圾回收",
            "序列化更快",
            "占用内存更小",
            "无需加锁即可安全共享"
          ],
          "answer": 3,
          "feedback": "不可变数据不存在写竞争，天然线程安全，可被多个线程自由共享。"
        }
      ],
      "level": "L4",
      "commonTask": "同一任务：声明一个不可变字符串 s=\"abc\"，通过拼接生成新值 s2=s+\"x\"，随后同时输出 s 与 s2。展示「修改不可变数据 = 产生新值，原值不变」的跨语言统一语义，以及各语言对不可变的表达（const / final / let 默认 / String 不可变类 / 值拷贝）。六语言输出统一为：abc abcx",
      "comparisonDimensions": [
        "rebind-allowed",
        "in-place-mutation",
        "default-immutability",
        "sharing-safety",
        "performance-tradeoff"
      ],
      "variants": {
        "python": {
          "minimal_code": "s = \"abc\"\ns2 = s + \"x\"\nprint(s, s2)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "transform",
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
          "minimal_code": "const s = \"abc\";\nconst s2 = s + \"x\";\nconsole.log(s, s2);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "transform",
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
          "minimal_code": "String s = \"abc\";\nString s2 = s + \"x\";\nSystem.out.println(s + \" \" + s2);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "transform",
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
          "minimal_code": "#include <string>\nstd::string s = \"abc\";\nstd::string s2 = s + \"x\";\nstd::cout << s << \" \" << s2;",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "transform",
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
          "minimal_code": "s := \"abc\"\ns2 := s + \"x\"\nfmt.Println(s, s2)",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "transform",
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
          "minimal_code": "let s = String::from(\"abc\");\nlet s2 = s.clone() + \"x\";\nprintln!(\"{} {}\", s, s2);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "transform",
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
        "可变陷阱（Python）：lst=[1,2]; other=lst; other[0]=99 —— 列表原地修改，两个引用同时变化，共享方被意外影响",
        "const 只防重绑定（JS）：const o={}; o.x=1 合法 —— const 约束的是绑定而非对象内容，常被误解为深冻结",
        "final 引用陷阱（Java）：final List l=...; l.add(x) 合法 —— final 防止重新赋值，但可变对象内容仍可改",
        "别名修改（C++）：int &r=x; r=99 —— 引用是别名，对 r 的赋值直接改写 x，无拷贝保护",
        "未声明 mut（Rust）：let v=vec![1,2]; v.push(3) 编译失败 —— 编译器在编译期拒绝可变操作（静态保护）"
      ],
      "acceptanceTests": [
        {
          "name": "输出含新值与原值",
          "assert": "output contains \"abc abcx\"",
          "expect": "abc abcx"
        },
        {
          "name": "原值未被修改",
          "assert": "output starts with original value",
          "expect": "abc"
        },
        {
          "name": "六语言同题输出一致",
          "assert": "all six languages emit identical output",
          "expect": "abc abcx"
        },
        {
          "name": "无编译/运行错误",
          "assert": "program compiles and runs",
          "expect": "0"
        }
      ],
      "transferExercises": [
        {
          "id": "m-tr1",
          "type": "transfer",
          "question": "Python 里 a=[1,2]; b=a; b.append(3) 后，a 是什么？为什么？",
          "options": [
            "a=[1,2,3]，列表是可变对象，b 是 a 的引用",
            "a=[1,2]，b 的修改不影响 a",
            "a 变成空列表",
            "报错"
          ],
          "answer": 0,
          "feedback": "列表可变且 b 只是引用，原地修改影响所有引用。这是可变数据共享的核心陷阱。"
        },
        {
          "id": "m-tr2",
          "type": "transfer",
          "question": "并发场景下为什么「默认不可变」更安全？",
          "options": [
            "不可变数据运行更快",
            "不可变数据无需加锁即可安全共享",
            "不可变数据无法传递",
            "不可变数据占用更少内存"
          ],
          "answer": 1,
          "feedback": "不可变数据读多写少时天然无数据竞争，无需互斥锁——代价是频繁修改时的分配开销。"
        },
        {
          "id": "m-tr3",
          "type": "transfer",
          "question": "Rust 中 let s = String::from(\"abc\") 后想修改 s，正确做法是？",
          "options": [
            "重新绑定 s = String::from(\"abcx\") 即可原地改",
            "直接 s.push('x')",
            "声明 let mut s = ...",
            "无法修改 String"
          ],
          "answer": 2,
          "feedback": "Rust 默认不可变，声明 let mut 才允许原地修改——编译器强制显式表达可变意图。"
        }
      ]
    },
                {
      "id": "value.conversion",
      "module_id": "B02",
      "title": "类型转换、解析与格式化",
      "status": "published",
      "level": "L4",
      "objectives": [
        "区分解析（字符串→数值）与格式化（数值→字符串）两种方向",
        "掌握六语言安全解析的惯用法与错误处理",
        "识别隐式转换陷阱（弱类型语言）与显式转换要求（强类型语言）"
      ],
      "prerequisites": [
        "value.primitive-types"
      ],
      "core": "类型转换分两个方向：解析（字符串→数值，可能失败）与格式化（数值→字符串，几乎总能成功）。核心认知分层：① 解析失败是常态——非法输入（\"abc\"、空串、溢出）必须显式处理；② 错误处理模型差异——Python/Java/C++ 抛异常，JS 返回 NaN，Go 返回双值 err，Rust 返回 Result；③ 隐式转换——弱类型语言（JS、Python 的字符串拼接）自动转换，强类型语言（Java、Rust）拒绝隐式，C++ 的隐式转换常出圈套（整数除法、截断）。格式化注意精度：浮点转字符串有舍入差异，需控制位数（toFixed/format/round）。",
      "summary": "解析会失败必须容错（异常/NaN/err/Result 四种模型）；格式化要控精度；弱类型语言的隐式转换是最大陷阱。",
      "commonTask": {
        "input": "把字符串 \"42\" 与 \"abc\" 安全解析为整数：合法输出数值，非法输出 invalid",
        "expectedOutput": {
          "valid": "42",
          "invalid": "invalid"
        }
      },
      "comparisonDimensions": [
        "parse-api",
        "failure-model",
        "type-checking",
        "idiomatic-style",
        "runtime-cost"
      ],
      "lang_diff": "Python：int() 抛 ValueError（可带 base 参数），float() 同；JS：Number() 返回 NaN（isNaN 检查），parseInt 宽松解析（\"42px\"→42）；Java：Integer.parseInt 抛 NumberFormatException；C++：std::stoi 抛 invalid_argument/out_of_range；Go：strconv.Atoi 返回双值 (v, err)；Rust：str::parse::<i32>() 返回 Result，unwrap_or 或 ? 处理。格式化：Python f-string / JS toFixed / Java String.format / C++ ostringstream / Go fmt.Sprintf / Rust format!。",
      "variants": {
        "python": {
          "version": "3.13",
          "minimal_code": "def parse(s):\n    try:\n        return int(s)\n    except ValueError:\n        return \"invalid\"\nprint(parse(\"42\"))\nprint(parse(\"abc\"))",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 6
            }
          ],
          "syntax_notes": [
            "int(str, base=10) 可指定进制",
            "ValueError 是解析失败的标准异常"
          ],
          "semantic_notes": [
            "int(\"abc\") 抛 ValueError，需 try/except 捕获",
            "int 不自动去除前导/后缀字符（\"42px\" 会失败）"
          ],
          "idioms": [
            "用 try/except ValueError 包裹解析",
            "格式化用 f-string 控制精度"
          ],
          "pitfalls": [
            "int(\"3.14\") 抛 ValueError（不是 float）",
            "浮点格式化用 repr 产生长尾"
          ]
        },
        "javascript": {
          "version": "ES2024",
          "minimal_code": "function parse(s) {\n  const n = Number(s);\n  return Number.isNaN(n) ? \"invalid\" : n;\n}\nconsole.log(parse(\"42\"));\nconsole.log(parse(\"abc\"));",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 6
            }
          ],
          "syntax_notes": [
            "Number(str) 全量解析，parseInt 前缀解析",
            "NaN 是唯一不等于自身的值（用 Number.isNaN）"
          ],
          "semantic_notes": [
            "Number(\"42px\") 是 NaN，parseInt(\"42px\") 是 42（宽松）",
            "Number(\"\") 返回 0（空串陷阱）"
          ],
          "idioms": [
            "严格解析用 Number + isNaN 检查",
            "格式化用 toFixed(2) 控制小数位"
          ],
          "pitfalls": [
            "Number(\"\") === 0",
            "parseInt 不检查完整字符串",
            "== 隐式转换：\"42\" == 42 为 true"
          ]
        },
        "java": {
          "version": "21+",
          "minimal_code": "String s1 = \"42\";\ntry { System.out.println(Integer.parseInt(s1)); } catch (NumberFormatException e) { System.out.println(\"invalid\"); }\nString s2 = \"abc\";\ntry { System.out.println(Integer.parseInt(s2)); } catch (NumberFormatException e) { System.out.println(\"invalid\"); }",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            },
            {
              "role": "declare",
              "start": 3,
              "end": 3
            },
            {
              "role": "call",
              "start": 4,
              "end": 4
            }
          ],
          "syntax_notes": [
            "Integer.parseInt 抛 NumberFormatException（检查型）",
            "Integer.valueOf 返回包装对象"
          ],
          "semantic_notes": [
            "parseInt(\" 42 \") 允许前导空白，parseInt(\"42x\") 抛异常",
            "强类型：String 与 int 无隐式转换"
          ],
          "idioms": [
            "try/catch NumberFormatException 或正则预检",
            "格式化用 String.format(\"%.2f\", x)"
          ],
          "pitfalls": [
            "Integer.parseInt(\"42x\") 抛异常而非忽略",
            "char 与 int 的隐式转换（'a'+1=98）"
          ]
        },
        "cpp": {
          "version": "C++20",
          "minimal_code": "try { std::cout << std::stoi(\"42\"); } catch (const std::exception&) { std::cout << \"invalid\"; }\nstd::cout << \"\\n\";\ntry { std::cout << std::stoi(\"abc\"); } catch (const std::exception&) { std::cout << \"invalid\"; }",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 2
            }
          ],
          "syntax_notes": [
            "std::stoi 抛 invalid_argument（格式错）或 out_of_range（溢出）",
            "C++ 隐式转换多且隐蔽"
          ],
          "semantic_notes": [
            "整数除法 7/2=3（截断）；static_cast 显式转换",
            "atoi 不抛异常返回 0（C 风格，难辨非法）"
          ],
          "idioms": [
            "优先 std::stoi + try/catch 而非 atoi",
            "格式化用 ostringstream 或 format"
          ],
          "pitfalls": [
            "7/2 == 3 截断陷阱",
            "atoi(\"abc\") 返回 0 无错误信号",
            "隐式 char→int 参与运算"
          ]
        },
        "go": {
          "version": "1.23+",
          "minimal_code": "var n int\n_, err := fmt.Sscanf(\"42\", \"%d\", &n)\nif err != nil { fmt.Println(\"invalid\") } else { fmt.Println(n) }\nvar n2 int\n_, err2 := fmt.Sscanf(\"abc\", \"%d\", &n2)\nif err2 != nil { fmt.Println(\"invalid\") } else { fmt.Println(n2) }",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 3
            },
            {
              "role": "call",
              "start": 4,
              "end": 6
            }
          ],
          "syntax_notes": [
            "strconv.Atoi / fmt.Sscanf 返回双值 (v, err)",
            "强类型：无隐式数值转换"
          ],
          "semantic_notes": [
            "err 是值不是异常——显式检查 if err != nil",
            "Sscanf 部分匹配也返回错误"
          ],
          "idioms": [
            "惯用 v, err := strconv.Atoi(s); if err != nil { ... }",
            "格式化用 fmt.Sprintf"
          ],
          "pitfalls": [
            "忽略 err 导致零值误用",
            "int64 溢出需 strconv.ParseInt 指定位数"
          ]
        },
        "rust": {
          "version": "2024 Edition",
          "minimal_code": "use std::str::FromStr;\nlet r = i32::from_str(\"42\");\nmatch r { Ok(n) => println!(\"{}\", n), Err(_) => println!(\"invalid\") }\nlet r2 = i32::from_str(\"abc\");\nmatch r2 { Ok(n) => println!(\"{}\", n), Err(_) => println!(\"invalid\") }",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 4
            }
          ],
          "syntax_notes": [
            "str::parse::<i32>() 返回 Result<T, ParseIntError>",
            "? 操作符在 Err 时提前返回（需返回 Result 函数）"
          ],
          "semantic_notes": [
            "parse 需要类型标注（::<i32>）",
            "无隐式转换：as 是显式截断转换"
          ],
          "idioms": [
            "unwrap_or(0) 提供默认值",
            "match 穷尽 Ok/Err 分支"
          ],
          "pitfalls": [
            "unwrap() 在 Err 时 panic",
            "as 截断：300u16 as u8 == 44"
          ]
        }
      },
      "errors": [
        {
          "code": "// JavaScript\nconst n = Number(\"\");  // 0",
          "message": "空字符串被 Number 转成 0，而不是 NaN 或报错",
          "cause": "Number('') 的特殊行为——空串与纯空白返回 0",
          "fix": "先判断 s.trim() === '' 再解析，或用严格校验"
        },
        {
          "code": "// Python\nint(\"3.14\")",
          "message": "ValueError: invalid literal for int()",
          "cause": "int 只解析整数语法，不接受浮点字面量",
          "fix": "用 float(s) 解析小数，或 int(float(s)) 先转浮点"
        },
        {
          "code": "// Go\nn, _ := strconv.Atoi(s)",
          "message": "忽略 err 后 n 为 0，非法输入被误当成合法 0",
          "cause": "丢弃错误值（_）导致解析失败静默",
          "fix": "必须检查 err：if err != nil { 处理 }"
        },
        {
          "code": "// Rust\n\"abc\".parse::<i32>().unwrap()",
          "message": "panic: called `Result::unwrap()` on an `Err` value",
          "cause": "解析失败返回 Err，unwrap 直接崩溃",
          "fix": "用 unwrap_or(0) / match / ? 处理 Err 分支"
        },
        {
          "code": "// C++\nint x = 7 / 2;  // 3",
          "message": "整数除法截断为 3，不是 3.5",
          "cause": "两个 int 相除结果是 int（截断）",
          "fix": "7.0 / 2 或 static_cast<double>(7) / 2"
        }
      ],
      "transferExercises": [
        {
          "type": "migrate",
          "question": "Python 的 int(s)（抛 ValueError）语义迁移到 Rust，最贴近的等价写法是？",
          "options": [
            "s.parse::<i32>() 返回 Result（用 match / unwrap_or 处理）",
            "s.parse::<i32>().unwrap() 直接取值",
            "s.to_int()",
            "i32::from(s)"
          ],
          "answer": 0,
          "feedback": "Rust 的 parse 返回 Result<T, ParseIntError>，与 Python 抛异常等价但用返回值表达——必须显式处理 Err。"
        },
        {
          "type": "migrate",
          "question": "JavaScript 的 Number(\"42px\") 返回 NaN，要得到与 parseInt 相同的宽松前缀解析语义，Rust 有对应吗？",
          "options": [
            "s.as_str().trim()",
            "i32::from_str_radix(s, 10)",
            "s.parse::<i32>() 同样宽松",
            "Rust 无宽松解析——parse 要求完整字符串（这是特性不是缺陷）"
          ],
          "answer": 3,
          "feedback": "Rust 的 parse 严格拒绝 \"42px\"，没有 parseInt 的宽松行为——强类型语言显式要求完整匹配，避免静默截断。"
        },
        {
          "type": "migrate",
          "question": "Go 的 n, err := strconv.Atoi(s) 双值错误模型，在 Python 中表达「解析失败不抛异常」的惯用法是？",
          "options": [
            "try/except 捕获 ValueError",
            "用 assert 断言",
            "None 返回值：用函数封装 try/except 返回 (值, None)",
            "int(s) 不抛异常"
          ],
          "answer": 2,
          "feedback": "Python 的异常模型可用「返回元组」模拟 Go 风格：(v, None) 成功 / (None, 错误信息) 失败，但更 Pythonic 的是 try/except。"
        }
      ],
      "acceptanceTests": [
        {
          "input": "parse(\"42\")",
          "assert": "result == 42",
          "expect": "42"
        },
        {
          "input": "parse(\"abc\")",
          "assert": "result == invalid",
          "expect": "invalid"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "六语言解析失败的「错误模型」中，哪一组对应关系正确？",
          "options": [
            "Python 异常 / JS NaN / Go err / Rust Result",
            "全部用异常",
            "Python err / JS 异常 / Go Result / Rust NaN",
            "全部返回 NaN"
          ],
          "answer": 0,
          "feedback": "Python/Java/C++ 抛异常，JS 返回 NaN，Go 返回双值 err，Rust 返回 Result——四种模型是核心差异。"
        },
        {
          "type": "read",
          "question": "JavaScript 中 Number(\"\") 与 parseInt(\"42px\") 的结果分别是？",
          "options": [
            "NaN 与 42",
            "0 与 42",
            "NaN 与 NaN",
            "0 与 NaN"
          ],
          "answer": 1,
          "feedback": "Number('') 返回 0（空串陷阱）；parseInt 宽松前缀解析 '42px'→42（不检查完整字符串）。"
        },
        {
          "type": "debug",
          "question": "以下哪段代码在解析失败时会产生静默错误结果？",
          "options": [
            "Rust: s.parse::<i32>().unwrap_or(0)",
            "Go: n, _ := strconv.Atoi(s)  // 忽略错误",
            "Go: n, err := strconv.Atoi(s); if err != nil { 处理 }",
            "Python: try: v = int(s) except ValueError: v = 0"
          ],
          "answer": 1,
          "feedback": "忽略 err 后 n 保持零值 0，非法输入被误当成合法 0——静默错误最危险。"
        },
        {
          "type": "migrate",
          "question": "C++ 的 7/2 结果是 3（截断），要在 Java 中得到 3.5 应写？",
          "options": [
            "7 / 2",
            "7 % 2",
            "(double) 7 / 2",
            "Integer.divide(7, 2)"
          ],
          "answer": 2,
          "feedback": "把一个操作数转为浮点（(double)7 / 2）即可得到 3.5；整数除法截断是跨语言共性陷阱。"
        }
      ],
      "deep_dive": "解析失败模型的本质是「错误通道」的设计差异：异常（Python/Java/C++）把错误沿调用栈传播，调用方可能忘记捕获（Java 检查型异常强制，Python 可选）；返回值模型（Go 的 err、Rust 的 Result）把错误变成显式数据流——Rust 的 ? 操作符让错误传播不打断可读性。JS 的 NaN 是「哨兵值」模型：Number('abc') 返回 NaN，调用方须主动 isNaN 检查，遗漏则 NaN 沿计算链扩散（NaN 参与任何运算结果都是 NaN）。工程建议：解析发生在边界（输入、配置、网络），边界处统一转成内部类型，内部不再解析。「显式优于隐式」是六语言共识，但隐式转换的坑（JS ==、C++ 整数除法、Python 字符串拼接数字）正是面试与生产 bug 的高发区。",
      "next": [
        "value.nullability",
        "error.try-catch"
      ]
    },
                {
      "id": "value.nullability",
      "module_id": "B02",
      "title": "空值、缺失值与可选类型",
      "status": "published",
      "level": "L4",
      "objectives": [
        "区分 null / undefined / None / nil / nullptr / Option 的语义差异",
        "安全处理「值可能不存在」的六种语言惯用法",
        "理解可选类型如何在类型层面消灭空指针解引用"
      ],
      "prerequisites": [
        "value.primitive-types"
      ],
      "core": "「值不存在」是最常见的运行期失败源。六语言表示缺失的方式不同：Python 的 None、JS 的 null 与 undefined、Java 的 null、C++ 的 nullptr、Go 的 nil、Rust 的 Option<T>。关键认知分层：① 哨兵值（null/None/nil）——隐式缺失，访问即崩溃或未定义行为；② 可选类型（Option/Optional/可选链）——把「可能缺失」编码进类型或语法，强制/引导调用方处理缺失分支；③ 惯用法——dict.get / ?. ?? / getOrDefault / find / ok 双值 / unwrap_or。语言差距最大处：Rust 用类型系统消灭空指针（Option 不能直接当值用），而 C 系语言把 null 当普通值传递，危险由运行时承担。",
      "summary": "六语言缺失值语义分两类：哨兵值（None/null/nil/nullptr）与可选类型（Option/Optional/?.）；Rust 从类型层面消灭空指针。",
      "commonTask": {
        "input": "从映射 data = {name: \"Ada\"} 读取缺失键 age：存在则输出值，缺失则输出 missing",
        "expectedOutput": {
          "result": "missing"
        }
      },
      "comparisonDimensions": [
        "null-representation",
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost"
      ],
      "lang_diff": "Python：None 单例，惯用 if x is None / dict.get(key, default)；JS：null 与 undefined 双值，?. 可选链 + ?? 空值合并；Java：null 可赋给任何引用，Optional<T> 显式包装（getOrDefault / orElse）；C++：nullptr，std::optional<T> 携带 has_value/value_or；Go：nil 接口与切片，map 读取返回双值 v, ok；Rust：Option<T> 枚举（Some/None），unwrap_or / ? 操作符，禁止直接当值使用。",
      "variants": {
        "python": {
          "version": "3.13",
          "minimal_code": "data = {\"name\": \"Ada\"}\nprint(data.get(\"age\", \"missing\"))  # missing（get 带默认值）",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ],
          "syntax_notes": [
            "None 是单例，判空用 is None 而非 == None",
            "dict.get(key, default) 返回默认值避免 KeyError"
          ],
          "semantic_notes": [
            "缺失由 KeyError 显式抛出，或 get 静默返回默认",
            "变量可为 None 但无类型标记（TypedDict/Optional 仅注解）"
          ],
          "idioms": [
            "访问可能缺失的键用 d.get(k, 默认)",
            "链式访问用 try/except 或 walrus 判断"
          ],
          "pitfalls": [
            "用 == None 判断（应与 is None）",
            "get 默认值被误当真实数据"
          ]
        },
        "javascript": {
          "version": "ES2024",
          "minimal_code": "const data = { name: \"Ada\" };\nconsole.log(data.age ?? \"missing\"); // missing（?? 空值合并）",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ],
          "syntax_notes": [
            "null 与 undefined 都是缺失哨兵（双值）",
            "?. 可选链短路，?? 只在 null/undefined 时取右"
          ],
          "semantic_notes": [
            "?? 与 || 不同：|| 对 0/'' 也取右",
            "对象访问缺失返回 undefined（非异常）"
          ],
          "idioms": [
            "可选链 data?.user?.name",
            "空值合并 data.age ?? 'missing'"
          ],
          "pitfalls": [
            "用 || 代替 ?? 吞掉 0/'' 等合法值",
            "解构嵌套对象忽略 undefined"
          ]
        },
        "java": {
          "version": "21+",
          "minimal_code": "import java.util.Map;\nMap<String, String> data = Map.of(\"name\", \"Ada\");\nSystem.out.println(data.getOrDefault(\"age\", \"missing\")); // missing",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 2,
              "end": 2
            },
            {
              "role": "call",
              "start": 3,
              "end": 3
            }
          ],
          "syntax_notes": [
            "null 可赋给任意引用类型",
            "Optional<T> 是容器，鼓励显式处理缺失"
          ],
          "semantic_notes": [
            "null 解引用抛 NullPointerException（运行期）",
            "Map.get 缺失返回 null；getOrDefault 免判空"
          ],
          "idioms": [
            "orElse/orElseGet 提供默认值",
            "Objects.requireNonNull 防御式检查"
          ],
          "pitfalls": [
            "未判空直接 .method() 抛 NPE",
            "Optional 本身可为 null（应为 Optional.empty()）"
          ]
        },
        "cpp": {
          "version": "C++20",
          "minimal_code": "#include <map>\nstd::map<std::string,std::string> data = {{\"name\",\"Ada\"}};\nauto it = data.find(\"age\");\nstd::cout << (it != data.end() ? it->second : \"missing\");",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "iterate",
              "start": 2,
              "end": 3
            }
          ],
          "syntax_notes": [
            "nullptr 是空指针字面量",
            "std::optional<T> 携带 has_value()/value_or()"
          ],
          "semantic_notes": [
            "解引用 nullptr 是未定义行为（可能崩溃可能静默）",
            "map::find 返回迭代器，end() 表示缺失"
          ],
          "idioms": [
            "用 iterator != end() 判存在",
            "optional 用 value_or(default) 免分支"
          ],
          "pitfalls": [
            "解引用前忘判空（UB）",
            "operator[] 会插入默认值（改动了容器）"
          ]
        },
        "go": {
          "version": "1.23+",
          "minimal_code": "package main\nimport \"fmt\"\nfunc main() {\n  data := map[string]string{\"name\": \"Ada\"}\n  v, ok := data[\"age\"]\n  if !ok { v = \"missing\" }\n  fmt.Println(v)\n}",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 4,
              "end": 4
            },
            {
              "role": "call",
              "start": 5,
              "end": 7
            }
          ],
          "syntax_notes": [
            "nil 可用于接口/切片/map/指针",
            "map 读取返回双值 v, ok（comma ok 惯用法）"
          ],
          "semantic_notes": [
            "nil map 读取安全但写入 panic",
            "接口 nil 与类型化 nil 陷阱（nil 接口含类型指针 ≠ nil）"
          ],
          "idioms": [
            "v, ok := m[k]; if !ok { ... }",
            "error 值用 if err != nil"
          ],
          "pitfalls": [
            "对 nil 接口断言方法 panic",
            "map 未初始化时写入崩溃"
          ]
        },
        "rust": {
          "version": "2024 Edition",
          "minimal_code": "use std::collections::HashMap;\nlet mut data = HashMap::new();\ndata.insert(\"name\", \"Ada\");\nlet v = data.get(\"age\").unwrap_or(&\"missing\");\nprintln!(\"{}\", v);",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 3,
              "end": 3
            },
            {
              "role": "call",
              "start": 5,
              "end": 5
            }
          ],
          "syntax_notes": [
            "Option<T> 是枚举（Some/None），不是哨兵值",
            "? 操作符在 None 时提前返回"
          ],
          "semantic_notes": [
            "Option 不能当 T 用——类型层面消灭空指针",
            "unwrap() 遇 None 会 panic（显式崩溃）"
          ],
          "idioms": [
            "unwrap_or/unwrap_or_else 提供默认",
            "链式 Option 用 map/and_then 组合"
          ],
          "pitfalls": [
            "滥用 unwrap() 在 None 时 panic",
            "unwrap_or 与 unwrap_or_else 的求值时机差异"
          ]
        }
      },
      "errors": [
        {
          "code": "// Java\nString name = data.get(\"name\").toUpperCase();",
          "message": "NullPointerException：data.get(\"name\") 返回 null 时调用 toUpperCase()",
          "cause": "Map.get 缺失返回 null，未判空直接解引用",
          "fix": "用 getOrDefault 或 Optional.ofNullable(...).orElse(...) 显式处理缺失"
        },
        {
          "code": "# JavaScript\nconst name = data.name || \"default\";",
          "message": "data.name 为 0 或空字符串时被 || 吞掉，返回 default",
          "cause": "|| 对 falsy 值（0/''/false）也取右，而缺失语义应只在 null/undefined 时取右",
          "fix": "用 ?? 空值合并：data.name ?? \"default\""
        },
        {
          "code": "// Go\nvar m map[string]int\nm[\"x\"] = 1",
          "message": "panic: assignment to entry in nil map",
          "cause": "nil map 未初始化就写入",
          "fix": "先 m = make(map[string]int) 再写入"
        },
        {
          "code": "// Rust\nlet v = data.get(\"age\").unwrap();",
          "message": "panic: called `Option::unwrap()` on a `None` value",
          "cause": "键缺失时 get 返回 None，unwrap 直接崩溃",
          "fix": "用 unwrap_or / unwrap_or_else / match 处理 None 分支"
        },
        {
          "code": "# Python\nif value == None:",
          "message": "== None 应改为 is None（None 是单例，身份比较更语义化）",
          "cause": "自定义 __eq__ 可能使 == None 产生意外结果",
          "fix": "if value is None"
        }
      ],
      "transferExercises": [
        {
          "type": "migrate",
          "question": "Python 的 data.get(\"age\", \"missing\") 语义迁移到 Go，最贴近的写法是？",
          "options": [
            "v := data[\"age\"]",
            "data[\"age\"] || \"missing\"",
            "if data[\"age\"] == nil",
            "v, ok := data[\"age\"]; if !ok { v = \"missing\" }"
          ],
          "answer": 3,
          "feedback": "Go 的 comma-ok 惯用法（v, ok := m[k]）与 dict.get 等价；直接下标读取缺失返回零值而非缺失信号。"
        },
        {
          "type": "migrate",
          "question": "JavaScript 的 data?.user?.name 可选链语义迁移到 Rust，最贴近的是？",
          "options": [
            "data.get(\"user\").map(|u| u.name)",
            "match data.user { _ => data.user.name }",
            "data.user.name?",
            "data.user.name"
          ],
          "answer": 0,
          "feedback": "Option::map 组合缺失链：任一环节缺失整个表达式为 None，与可选链短路语义一致。"
        },
        {
          "type": "migrate",
          "question": "Java 中 Optional.ofNullable(x).orElse(d) 的语义是什么？",
          "options": [
            "x 为 null 时返回 null",
            "x 为 null 时抛异常",
            "x 为 null 时返回 d，否则返回 x",
            "总是返回 d"
          ],
          "answer": 2,
          "feedback": "ofNullable 允许 x 为 null，orElse 在缺失时返回默认值 d——这是 Java 版的「空值合并」。"
        }
      ],
      "acceptanceTests": [
        {
          "input": "读取缺失键 age（data={name:Ada}）",
          "assert": "result == \"missing\"",
          "expect": "missing"
        },
        {
          "input": "读取存在键 name",
          "assert": "result == \"Ada\"",
          "expect": "Ada"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "六语言缺失值哨兵中，哪一个在类型层面「消灭」了空指针解引用？",
          "options": [
            "Rust Option<T>",
            "C++ nullptr",
            "Java null",
            "Go nil"
          ],
          "answer": 0,
          "feedback": "Rust 的 Option<T> 是枚举类型，None 不能当 T 直接使用——编译器强制处理缺失分支。"
        },
        {
          "type": "read",
          "question": "JavaScript 中 data.name ?? \"default\" 与 data.name || \"default\" 对 data.name = 0 的结果分别是什么？",
          "options": [
            "都是 \"default\"",
            "?? 返回 \"default\"，|| 返回 0",
            "?? 返回 0，|| 返回 \"default\"",
            "都是 0"
          ],
          "answer": 2,
          "feedback": "?? 只在 null/undefined 时取右，0 是合法值原样返回；|| 对 0 视为 falsy 取右。"
        },
        {
          "type": "debug",
          "question": "以下哪段代码在键缺失时会崩溃或产生错误结果？",
          "options": [
            "Go: v, ok := m[\"k\"]; if !ok { v = \"缺\" }",
            "Java: m.getOrDefault(\"k\", \"缺\")",
            "Python: d.get(\"k\", \"缺\")",
            "C++: auto it = m.find(\"k\"); it->second  // 未判 it != end()"
          ],
          "answer": 3,
          "feedback": "C++ find 返回 end() 迭代器时解引用是未定义行为，必须先判 it != m.end()。"
        },
        {
          "type": "migrate",
          "question": "Rust 的 data.get(\"age\").unwrap_or(&\"missing\") 迁移到 Java，最贴近的等价写法是？",
          "options": [
            "data.compute(\"age\", ...)",
            "data.getOrDefault(\"age\", \"missing\")",
            "data.get(\"age\")",
            "Optional.ofNullable(data.get(\"age\")).orElse(\"missing\")"
          ],
          "answer": 1,
          "feedback": "Map.getOrDefault 是 Java 里与 unwrap_or 语义最贴近的一行式（键缺失返回默认值）。"
        }
      ],
      "deep_dive": "可选类型与哨兵值的本质区别在于「缺失是否可被编译器检查」。Rust 的 Option<T> 是代数数据类型：None 与 Some(T) 是构造子，模式匹配强制穷尽两种可能；C 系（Java/Go/C++）的 null/nil 是「可空引用」——类型系统不区分「有值」与「可能为空」，危险性由运行时承担（NPE/UB）。JS 的双值（null/undefined）源于历史：undefined 是「未初始化」，null 是「显式空」。Go 的 nil 可出现在接口/切片/map/指针，语义各不相同（nil 切片可安全 range，nil map 写入 panic）。工程建议：公共 API 边界用可选类型（Option/Optional），内部热点路径可用判空哨兵但必须统一约定。「空对象模式」（Null Object）把缺失建模为无操作对象，是哨兵值之外的第三种思路。",
      "next": [
        "error.try-catch",
        "collection.map"
      ]
    },
    { "id": "value.scope-lifetime", "module_id": "B02", "title": "作用域、生命周期与遮蔽", "status": "published",
      "objectives": ["理解变量可见范围与存活时间", "识别遮蔽（shadowing）行为"],
      "prerequisites": ["value.binding"],
      "core": "作用域决定变量在哪可见（块级/函数级/模块级）；生命周期决定变量存活多久（栈/堆/GC/所有权）。遮蔽：内层作用域声明同名变量会「盖住」外层，离开内层后外层恢复——它改变的是绑定而非原变量。",
      "lang_diff": "Python：LEGB 作用域，无块级（函数级）；JS：let/const 块级、var 函数级（TDZ）；Java/C++：块级作用域，{} 内可见；Go：块级，:= 可遮蔽；Rust：块级 + 所有权生命周期，let 可遮蔽。",
      "exercises": [
        { "type": "concept", "question": "JS 中 let/const 的作用域是？", "options": ["全局", "块级", "函数级", "模块级"], "answer": 1, "feedback": "let/const 是块级作用域，var 是函数级。" },
        { "type": "read", "question": "Rust 中内层 let x = x + 1 与外层 x 的关系是？", "options": ["外层删除", "修改外层", "编译错误", "创建新绑定遮蔽外层（不修改外层）"], "answer": 3, "feedback": "shadow 创建新绑定遮蔽同名变量，外层不变。" }
      ]
    },
    { "id": "value.numeric-edge", "module_id": "B02", "title": "溢出、精度与特殊数值", "status": "published",
      "objectives": ["认识数值计算的边界情况", "处理溢出与非精确值"],
      "prerequisites": ["value.primitive-types"],
      "core": "数值计算有边界：整数溢出（定宽类型超出范围回绕或报错）、浮点不精确（二进制无法精确表示 0.1）、特殊值（NaN、Infinity、-0.0）。定宽整数运算要考虑溢出策略（回绕/检查/饱和），浮点比较需用容差而非 ==。",
      "lang_diff": "Python：int 无溢出（任意精度）、float 有精度限制；JS：Number 安全整数 2^53、NaN/Infinity；Java：int 溢出回绕、double 有 NaN；C++：溢出是 UB（signed）；Go：int 溢出回绕；Rust：debug 溢出 panic、release 回绕（wrapping_* 显式）。",
      "exercises": [
        { "type": "concept", "question": "JS 中能安全表示的最大整数是？", "options": ["2^64", "2^32", "2^53（Number.MAX_SAFE_INTEGER）", "无限制"], "answer": 2, "feedback": "超过 2^53 精度丢失，应用 BigInt。" },
        { "type": "concept", "question": "浮点数相等比较应该用？", "options": ["容差比较 |a-b| < ε", "==", "字符串比较", "类型转换后比较"], "answer": 0, "feedback": "浮点不精确，相等比较需用容差。" }
      ]
    },

    // ================= B03 表达式与运算符 =================
    { "id": "expr.arithmetic", "module_id": "B03", "title": "算术运算", "status": "published",
      "objectives": ["掌握加减乘除与取模", "理解整数除法与取幂的差异"],
      "prerequisites": ["value.primitive-types"],
      "core": "基础算术 + - * / %，但「除法」与「取模」在各语言有微妙差异：整数除法是向下取整还是截断？负数取模符号跟谁？幂运算用 ** 还是 pow？位运算 << >> & | 处理二进制。",
      "lang_diff": "Python：/ 真除法得 float、// 整除（向下取整）、** 幂；JS：/ 总是浮点、** 幂；Java：/ 整数除法（截断）、Math.pow；C++：/ 整数除法、std::pow；Go：/ 整数除法、math.Pow；Rust：/ 整数除法、powi/powf。负数取模：Python 结果符号随除数，C/Java 随被除数。",
      "exercises": [
        { "type": "concept", "question": "Python 中 7 // 2 的结果是？", "options": ["4", "3.0", "3", "3.5"], "answer": 2, "feedback": "// 是整除（向下取整），得 3。" },
        { "type": "read", "question": "JS 中 2 ** 10 的结果是？", "options": ["102", "20", "报错", "1024"], "answer": 3, "feedback": "** 是幂运算，2^10 = 1024。" }
      ]
    },
    { "id": "expr.comparison", "module_id": "B03", "title": "比较与相等性", "status": "published",
      "objectives": ["掌握大小比较与相等判断", "区分值相等与身份相等"],
      "prerequisites": ["value.semantics", "expr.arithmetic"],
      "core": "比较运算符 < > <= >= 判断大小，==/=== 判断相等。关键：== 比较的是「值」还是「身份」？多数语言的 == 对对象是身份比较（引用相等），值相等需用 equals/deepEqual。JS 的 == 会做隐式类型转换（坑），应始终用 ===。",
      "lang_diff": "Python：== 调 __eq__、is 身份；JS：=== 严格（推荐）、== 隐式转换；Java：== 基本类型按值/对象按引用、equals 内容；C++：== 可重载（默认逐成员）；Go：== 可比较类型按值；Rust：== 需 PartialEq、derive 可得。",
      "exercises": [
        { "type": "concept", "question": "JS 中比较两个值应优先使用？", "options": ["===", "is", "==", "equals"], "answer": 0, "feedback": "=== 不做隐式类型转换，避免 '5'==5 为 true 的坑。" },
        { "type": "concept", "question": "Java 中判断两个 String 内容相等应使用？", "options": ["is", "==", "equals()", "==="], "answer": 2, "feedback": "== 比较引用，equals() 比较内容。" }
      ]
    },
    { "id": "expr.assignment", "module_id": "B03", "title": "赋值与复合赋值", "status": "published",
      "objectives": ["掌握赋值与复合赋值", "理解赋值是语句还是表达式"],
      "prerequisites": ["value.binding"],
      "core": "赋值把名字绑定到值。复合赋值 += -= *= 是「原地运算 + 重新绑定」的简写，对可变对象可能是原地修改（Python list += 等价 extend）。注意语言差异：JS/C 的赋值是表达式（可嵌套），Python 的赋值是语句（需用 := 海象运算符作表达式）。",
      "lang_diff": "Python：= 语句、:= 海象表达式（3.8+）；JS：= 表达式（可链式 a = b = 1）；Java：= 表达式；C++：= 表达式返回引用；Go：= 语句、:= 声明；Rust：= 语句（let 绑定）。复合赋值对 Python list 是原地操作。",
      "exercises": [
        { "type": "concept", "question": "Python 中 lst += [1] 对可变列表的行为是？", "options": ["替换引用", "原地 extend（等价 lst.extend）", "报错", "创建新列表"], "answer": 1, "feedback": "对可变对象 += 是原地修改；对不可变对象（int/str）是重新绑定。" },
        { "type": "read", "question": "JS 中 a = b = 5 的执行顺序是？", "options": ["同时", "左到右", "报错", "右到左（先 b=5 再 a=结果）"], "answer": 3, "feedback": "赋值右结合：b=5 返回 5，再赋给 a。" }
      ]
    },
    { "id": "expr.index-slice", "module_id": "B03", "title": "成员访问、索引与切片", "status": "published",
      "objectives": ["访问对象成员与序列元素", "用切片提取子序列"],
      "prerequisites": ["collection.array-list"],
      "core": "成员访问（obj.attr / obj->attr / map[key]）、索引（arr[i]）、切片（arr[start:end]）是数据访问三件套。切片语法差异大：Python 的 [start:end:step] 最强大，其他语言多需循环或库方法。负索引（从尾部数）是 Python 特色。",
      "lang_diff": "Python：obj.attr、seq[i]、seq[1:5:2]、负索引 seq[-1]；JS：obj.prop / obj['key']、arr[i]、arr.slice(1,5)；Java：obj.field、list.get(i)、无原生切片（subList）；C++：obj.field / ptr->field、vec[i]、无原生切片；Go：obj.Field、slice[i]、slice[1:5]；Rust：obj.field、vec[i]、&vec[1..5]。",
      "exercises": [
        { "type": "concept", "question": "Python 中获取序列最后一个元素的惯用法是？", "options": ["seq[len(seq)-1]", "seq.last", "seq[-1]", "seq.tail"], "answer": 2, "feedback": "负索引 -1 表示倒数第一个元素。" },
        { "type": "read", "question": "Rust 中 &vec[1..5] 的结果是？", "options": ["报错", "新 Vec", "数组", "切片引用 &[T]"], "answer": 3, "feedback": ".. 范围切片返回借用，不复制数据。" }
      ]
    },
    { "id": "expr.conditional-expr", "module_id": "B03", "title": "条件表达式（三目）", "status": "published",
      "objectives": ["用条件表达式简化二选一赋值", "知道各语言的等价写法"],
      "prerequisites": ["expr.comparison", "control.conditionals"],
      "core": "条件表达式把「if 二选一」压缩为一行：value_if_true if cond else value_if_false。适合简单赋值，复杂逻辑仍应用 if 语句保持可读。Go/Rust 把 if 当表达式天然支持，无需专门三目运算符。",
      "lang_diff": "Python：x if cond else y；JS：cond ? x : y；Java：cond ? x : y；C++：cond ? x : y；Go：无三目，用 if（或立即函数）；Rust：let v = if cond { x } else { y }（if 是表达式）。",
      "exercises": [
        { "type": "concept", "question": "JS 中 cond ? a : b 的正确读法是？", "options": ["逻辑与或", "条件为真取 a 否则取 b", "位运算", "比较"], "answer": 1, "feedback": "三目运算符：条件真取 : 前，假取 : 后。" },
        { "type": "concept", "question": "Go 中如何实现三目表达式效果？", "options": ["cond ? a : b", "??", "?:", "if 语句（Go 无三目运算符）"], "answer": 3, "feedback": "Go 没有三目运算符，用 if 语句表达。" }
      ]
    },
    { "id": "expr.precedence", "module_id": "B03", "title": "运算符优先级与结合性", "status": "published",
      "objectives": ["按优先级正确理解复杂表达式", "用括号消除歧义"],
      "prerequisites": ["expr.arithmetic", "expr.comparison"],
      "core": "运算符有优先级（* 先于 +）与结合性（赋值右结合）。记忆全部优先级不现实，最佳实践：复杂表达式一律加括号明确意图，既避免错误也提升可读性。常见的坑：== 与位运算、&& 与 || 混用、移位与加减。",
      "lang_diff": "优先级表各语言略有差异但大体一致（算术 > 比较 > 逻辑）。特例：JS 的 == 与位运算优先级、Go 无三目、Rust 无隐式 bool 转换（if 条件必须 bool）。所有语言：加括号总是安全的。",
      "exercises": [
        { "type": "concept", "question": "表达式 a + b * c 按优先级等价于？", "options": ["a*b+c", "(a+b)*c", "语法错误", "a+(b*c)"], "answer": 3, "feedback": "* 优先级高于 +，等价 a+(b*c)。" },
        { "type": "concept", "question": "处理复杂运算符表达式最稳妥的做法是？", "options": ["加括号明确意图", "用注释", "拆开写", "背优先级表"], "answer": 0, "feedback": "加括号既防错又提升可读性，是工程惯例。" }
      ]
    },
    { "id": "expr.coercion", "module_id": "B03", "title": "类型提升与隐式转换风险", "status": "published",
      "objectives": ["认识隐式类型转换的规则", "避免隐式转换导致的错误"],
      "prerequisites": ["value.static-dynamic", "value.conversion"],
      "core": "混合类型运算时语言会自动「提升」或「转换」类型：小类型→大类型（int→float 通常安全）、字符串与数字拼接（危险）。隐式转换的规则因语言而异，弱类型语言（JS）转换最激进，是大量诡异 bug 的来源。防御：显式转换、开启严格检查。",
      "lang_diff": "Python：强类型，隐式转换少（int+float→float）；JS：弱类型，'5'+1='51'、'5'-1=4（减号转数字）；Java：int+long→long、String+任意→String；C++：隐式转换多但可有警告；Go：基本无隐式转换（需显式）；Rust：无隐式转换（需 as 或 From）。",
      "exercises": [
        { "type": "concept", "question": "JS 中 '5' - 1 的结果是？", "options": ["'51'", "undefined", "报错", "4"], "answer": 3, "feedback": "减号触发数字转换，'5'→5，5-1=4；但 '5'+1='51'。" },
        { "type": "concept", "question": "哪个语言基本不做隐式类型转换，需显式 as/From？", "options": ["Rust", "Java", "JavaScript", "C++"], "answer": 0, "feedback": "Rust 强制显式转换，避免隐式转换的坑。" }
      ]
    },

    // ================= B04 控制流 =================
    { "id": "control.match", "module_id": "B04", "title": "switch / match / 模式匹配", "status": "published",
      "objectives": ["用匹配结构处理多分支", "理解模式匹配比 switch 更强的表达力"],
      "prerequisites": ["control.conditionals"],
      "core": "当判断「同一值的多种取值」时，switch/match 比 if 链更聚焦。模式匹配进一步：匹配字面量、范围、解构结构体/枚举，且编译器（Rust）能检查穷尽性。选择：简单值分发用 switch，需要解构或穷尽保证用 match。",
      "lang_diff": "Python：3.10+ match（支持解构与守卫）；JS：switch（无模式匹配）；Java：switch 表达式（->）与 record 模式（21+）；C++：switch 仅整型/枚举；Go：switch（自动跳出，无 fallthrough）；Rust：match（穷尽性检查，可解构）。",
      "exercises": [
        { "type": "concept", "question": "Rust 的 match 漏掉一个分支会怎样？", "options": ["运行时异常", "匹配 default", "忽略", "编译错误（穷尽性检查）"], "answer": 3, "feedback": "Rust match 必须穷尽所有分支，否则编译失败。" },
        { "type": "read", "question": "Go 的 switch 是否需要 break 防穿透？", "options": ["不需要（自动跳出）", "需要", "仅 default 需要", "取决于编译器"], "answer": 0, "feedback": "Go 的 switch 分支自动跳出，无需 break。" }
      ]
    },
    { "id": "control.iteration-protocol", "module_id": "B04", "title": "范围与迭代协议", "status": "published",
      "objectives": ["理解迭代协议如何让自定义类型可遍历", "用范围表达数值区间"],
      "prerequisites": ["control.loops", "collection.iteration"],
      "core": "「for x in 容器」背后是迭代协议：容器提供「产生下一个元素」的机制，语言用统一接口遍历。实现该协议，自定义类型也能参与 for 循环。范围（range/区间）是迭代协议的特例，表达数值序列。",
      "lang_diff": "Python：__iter__/__next__ 协议、range(n)；JS：Symbol.iterator、自定义 [Symbol.iterator]()；Java：Iterable/Iterator 接口；C++：begin()/end() 迭代器对；Go：range（内建，无通用协议）；Rust：IntoIterator/Iterator trait、0..n。",
      "exercises": [
        { "type": "concept", "question": "Python 自定义类要能 for 遍历需实现？", "options": ["toString", "hash", "__iter__ 与 __next__", "equals"], "answer": 2, "feedback": "__iter__ 返回迭代器，__next__ 产生下一元素。" },
        { "type": "read", "question": "JS 中使对象可被 for...of 遍历的方法是？", "options": ["加 length 属性", "实现 toString", "实现 [Symbol.iterator]()", "继承 Array"], "answer": 2, "feedback": "for...of 依赖 Symbol.iterator 协议。" }
      ]
    },
    { "id": "control.break-continue", "module_id": "B04", "title": "break / continue / return", "status": "published",
      "objectives": ["用控制转移语句跳出循环", "区分 break 与 return 的作用域"],
      "prerequisites": ["control.loops"],
      "core": "break 跳出当前循环、continue 跳过本次迭代、return 退出整个函数。多层嵌套时 break 只跳出最内层（部分语言支持带标签的 break 跳出指定层）。提前 return 是「守卫式」编程的核心，减少嵌套层级。",
      "lang_diff": "全部语言支持 break/continue/return。标签化 break：Java（outer: 标签）、Rust（'outer: 标签）；Python 无标签，用 else 子句或重构；JS 有标签 break label。for-else 是 Python 特色（循环正常结束执行 else）。",
      "exercises": [
        { "type": "concept", "question": "嵌套循环中 break 默认跳出哪一层？", "options": ["函数", "最外层", "最内层", "所有层"], "answer": 2, "feedback": "break 默认只跳出最内层循环；跳出多层需标签（Java/Rust）。" },
        { "type": "read", "question": "Rust 中带标签跳出外层循环的语法是？", "options": ["break 'outer", "return outer", "goto outer", "break 2"], "answer": 0, "feedback": "Rust 用 'outer: 标签，break 'outer 跳出指定层。" }
      ]
    },
    { "id": "control.early-return", "module_id": "B04", "title": "嵌套控制流与提前返回", "status": "published",
      "objectives": ["用守卫式返回降低嵌套深度", "把「快乐路径」左对齐"],
      "prerequisites": ["control.conditionals", "control.break-continue"],
      "core": "深嵌套的 if-for-if 让主流程淹没在缩进里。守卫式返回（guard clause）：先处理异常/边界情况并提前返回，让主逻辑保持在最左侧。原则：每个条件只增加一层缩进；超过三层考虑拆函数。",
      "lang_diff": "各语言通用，但语法便利度不同：Python 无显式区块符号更依赖缩进可读性；Rust 的 ? 运算符把错误提前返回语法化；Go 的多返回值 + if err != nil { return } 是强制守卫；JS/Java 用 if (!valid) return 守卫。",
      "exercises": [
        { "type": "concept", "question": "守卫式返回（guard clause）的主要作用是？", "options": ["隐藏错误", "提前处理边界，让主逻辑左对齐减少嵌套", "增加安全性", "加快执行"], "answer": 1, "feedback": "先处理异常提前返回，主流程保持低缩进，可读性更好。" },
        { "type": "read", "question": "Go 中 if err != nil { return err } 属于哪种模式？", "options": ["装饰器", "递归", "回调", "守卫式返回"], "answer": 3, "feedback": "错误即返回的守卫式处理，是 Go 的标准错误处理模式。" }
      ]
    },
    { "id": "control.recursion", "module_id": "B04", "title": "递归与迭代的转换", "status": "published",
      "objectives": ["用递归表达自相似问题", "识别递归与迭代的等价性"],
      "prerequisites": ["control.loops", "function.declare-call"],
      "core": "递归：函数调用自身处理规模更小的同类问题，必须有基例（终止条件）否则栈溢出。迭代：用循环+状态变量达成同样效果。递归表达更贴近问题本质（树遍历、分治），迭代更高效（无调用开销）。尾递归可被优化为迭代（部分语言）。",
      "lang_diff": "全部语言支持递归。栈深度：Python 默认 1000（sys.setrecursionlimit）、JS 引擎相关（约 1 万）、Java/C++ 深（数万但有限）、Go 栈可增长（递归较深安全）、Rust 无尾调用优化保证。尾递归优化：Scheme/部分语言支持，主流语言多不保证。",
      "exercises": [
        { "type": "concept", "question": "递归函数缺少基例（终止条件）会导致？", "options": ["编译错误", "栈溢出（无限递归）", "死锁", "返回 null"], "answer": 1, "feedback": "无终止条件的递归会无限调用直至栈溢出。" },
        { "type": "concept", "question": "哪个语言的栈可动态增长，较深递归相对安全？", "options": ["Python", "Go", "Java", "C++"], "answer": 1, "feedback": "Go 的 goroutine 栈可增长，深递归比固定栈语言更安全。" }
      ]
    },
    { "id": "control.comprehension", "module_id": "B04", "title": "推导式与流式操作", "status": "published",
      "objectives": ["用声明式方式转换集合", "对比推导式与显式循环"],
      "prerequisites": ["collection.iteration", "control.loops"],
      "core": "推导式/流式操作用「做什么」替代「怎么做」：map/filter/reduce 或列表推导把循环+条件+转换压缩为声明式表达式。读法：先描述转换规则，再指定数据来源与条件。超过两层的嵌套推导应拆回普通循环保可读性。",
      "lang_diff": "Python：列表推导 [x*2 for x in a if x>0]、生成器表达式；JS：数组 map/filter/reduce；Java：Stream map/filter/collect；C++：ranges（C++20）或算法+lambda；Go：无推导式，用 for 循环；Rust：迭代器链 iter().map().filter().collect()。",
      "exercises": [
        { "type": "concept", "question": "Python 中 [x*x for x in nums if x>0] 属于？", "options": ["列表推导式", "循环", "生成器函数", "函数"], "answer": 0, "feedback": "列表推导式：声明式生成新列表。" },
        { "type": "read", "question": "Rust 中 iter().map(f).collect() 的特点是？", "options": ["修改原集合", "多线程", "立即执行", "惰性（不 collect 不执行）"], "answer": 3, "feedback": "Rust 迭代器惰性，collect 等终端操作才触发执行。" }
      ]
    },
    { "id": "control.state-machine", "module_id": "B04", "title": "状态机的基础表达", "status": "published",
      "objectives": ["用状态机建模多状态流程", "避免布尔标志的混乱组合"],
      "prerequisites": ["control.match", "model.record-struct-class"],
      "core": "当对象有多种互斥状态且状态间有明确转换规则时，用状态机：状态（State）× 事件（Event）→ 新状态。用枚举表示状态、match/switch 表达转换，比一堆布尔标志清晰且能防止非法状态组合。",
      "lang_diff": "Rust：enum + match 是状态机的理想载体（穷尽性保证）；Python：Enum + if/match；JS：对象查找表或 switch；Java：enum + switch；C++：enum class + switch；Go：自定义 int 类型 + switch。",
      "exercises": [
        { "type": "concept", "question": "表达「订单：待支付→已支付→已发货→已完成」最适合的结构是？", "options": ["字符串拼接", "数组索引", "多个布尔字段", "枚举 + 状态机"], "answer": 3, "feedback": "枚举表达互斥状态，状态机管理转换，避免布尔组合的非法状态。" },
        { "type": "concept", "question": "哪个语言的 enum + match 对状态机支持最强？", "options": ["Python", "Rust", "JavaScript", "Go"], "answer": 1, "feedback": "Rust 的 enum 可携带数据 + match 穷尽检查，是状态机最佳载体。" }
      ]
    },

    // ================= B05 函数与过程抽象 =================
    { "id": "function.declare-call", "module_id": "B05", "title": "函数声明与调用", "status": "published",
      "objectives": ["声明并调用函数", "理解函数签名（名称/参数/返回值）"],
      "prerequisites": ["control.conditionals"],
      "core": "函数是「命名的可复用代码块」：声明定义签名（名字、参数、返回类型），调用传入实参执行。签名是契约——调用方只需知道「给什么、得什么」，无需关心内部实现。",
      "lang_diff": "Python：def name(args): return；JS：function name() {} 或箭头函数；Java：返回类型 name(参数类型 参数名)；C++：返回类型 name(参数)；Go：func name(参数) 返回类型；Rust：fn name(参数: 类型) -> 返回类型。",
      "exercises": [
        { "type": "concept", "question": "Rust 函数签名的正确形式是？", "options": ["function f(x) {}", "fn f(x: i32) -> i32", "def f(x): return x", "func f(x) int"], "answer": 1, "feedback": "Rust 用 fn，参数与返回值都需类型标注。" },
        { "type": "read", "question": "Go 声明返回 int 的函数语法是？", "options": ["def f() int", "function f(): int", "fn f() -> int", "func f() int"], "answer": 3, "feedback": "Go 用 func f() int，返回类型在参数后。" }
      ]
    },
    { "id": "function.parameters-return", "module_id": "B05", "title": "参数、返回值与多返回值", "status": "published",
      "objectives": ["设计函数的输入输出", "处理多返回值"],
      "prerequisites": ["function.declare-call"],
      "core": "参数是输入、返回值是输出。多数语言单返回值，多返回值需打包（元组/对象/结构体）。Go 原生多返回值（常用 value, err），Python 元组解包。返回值应表达「结果 + 错误/状态」，而非用输出参数或全局变量。",
      "lang_diff": "Python：return a, b（元组解包 x, y = f()）；JS：返回对象/数组 {x, y} 或 [x, y]；Java：单返回值，多值需封装对象；C++：std::pair/tuple 或引用参数；Go：func f() (int, error) 原生多返回；Rust：元组 (i32, String) 或结构体。",
      "exercises": [
        { "type": "concept", "question": "Go 函数返回多个值的标准写法是？", "options": ["func f() (int,  error)", "全局变量", "返回数组", "输出参数"], "answer": 0, "feedback": "Go 原生支持多返回值，错误处理用 (value, err)。" },
        { "type": "read", "question": "Python 中 x, y = get_point() 利用了？", "options": ["多返回值", "列表", "元组解包", "字典"], "answer": 2, "feedback": "函数返回元组，调用处解包赋值。" }
      ]
    },
    { "id": "function.named-default", "module_id": "B05", "title": "位置参数、命名参数与默认参数", "status": "published",
      "objectives": ["用默认参数简化调用", "用命名参数提升可读性"],
      "prerequisites": ["function.parameters-return"],
      "core": "位置参数按顺序传值；默认参数为参数提供缺省值（调用时可省略）；命名参数按名字传值（顺序无关、可读性好）。注意：默认参数在 Python 中只求值一次（可变默认参数陷阱）。",
      "lang_diff": "Python：def f(a, b=10) 支持命名调用 f(b=1)；JS：默认参数 function f(a=1)，无命名参数（用对象解构）；Java：无默认/命名参数（用重载/Builder）；C++：默认参数（仅尾部）无命名参数；Go：无默认/命名参数（用选项模式）；Rust：无默认/命名参数（用 Builder/Option）。",
      "exercises": [
        { "type": "concept", "question": "Python 中 def f(x=[]) 的陷阱是？", "options": ["每次调用新建列表", "默认参数只求值一次，列表跨调用共享", "语法错误", "性能问题"], "answer": 1, "feedback": "可变默认参数在函数定义时只求值一次，后续调用共享同一列表，应改为 x=None。" },
        { "type": "concept", "question": "Java 中没有默认参数时的惯用替代是？", "options": ["异常", "全局变量", "递归", "方法重载或 Builder 模式"], "answer": 3, "feedback": "Java 用重载提供不同参数组合，复杂场景用 Builder。" }
      ]
    },
    { "id": "function.variadic", "module_id": "B05", "title": "可变参数", "status": "published",
      "objectives": ["接收任意数量的参数", "在函数内把可变参数当作集合处理"],
      "prerequisites": ["function.parameters-return"],
      "core": "可变参数（variadic）让函数接受任意个实参：*args（Python）、...rest（JS）、T... args（Java）、...args（Go）、模板参数包（C++）。函数内把它们当列表/切片/数组处理。调用处也可用展开语法把集合拆成独立参数。",
      "lang_diff": "Python：*args（元组）、**kwargs（关键字字典）；JS：...rest（数组）、展开 [...arr]；Java：String... args（数组）；C++：模板参数包 typename... Args；Go：...T（切片）；Rust：宏可变参数（函数本身不支持，用切片 &[T]）。",
      "exercises": [
        { "type": "concept", "question": "Python 中接收任意个数位置参数的语法是？", "options": ["**args", "...args", "args[]", "*args"], "answer": 3, "feedback": "*args 收集为元组；**kwargs 收集关键字参数为字典。" },
        { "type": "read", "question": "Go 中 func sum(nums ...int) 的 nums 类型是？", "options": ["数组", "指针", "切片 []int", "元组"], "answer": 2, "feedback": "...int 在函数内是 []int 切片。" }
      ]
    },
    { "id": "function.overload", "module_id": "B05", "title": "重载、可选参数与替代方案", "status": "published",
      "objectives": ["理解函数重载的机制", "在不支持重载的语言中用替代方案"],
      "prerequisites": ["function.named-default"],
      "core": "重载：同名函数不同参数（类型或个数）共存，编译器按调用点选择。Python/JS 无真正重载（后定义覆盖前者）；Java/C++ 支持；Go/Rust 不支持（用不同函数名或泛型）。替代方案：默认参数、可选参数、泛型、Builder。",
      "lang_diff": "Python：无重载，用默认参数/单分派 functools.singledispatch；JS：无重载，检查参数类型/个数；Java：支持（按签名区分）；C++：支持（含模板）；Go：不支持（函数名区分）；Rust：不支持（泛型或 trait）。",
      "exercises": [
        { "type": "concept", "question": "Java 中两个同名方法可以共存的条件是？", "options": ["不同参数签名（类型或个数）", "不同返回类型", "不同访问修饰符", "不能共存"], "answer": 0, "feedback": "重载按参数签名区分，仅返回类型不同不构成重载。" },
        { "type": "concept", "question": "Go 中实现类似重载效果的惯用方式是？", "options": ["默认参数", "同名函数", "不同函数名或泛型", "宏"], "answer": 2, "feedback": "Go 不支持重载，用不同函数名或泛型（1.18+）。" }
      ]
    },
    { "id": "function.first-class", "module_id": "B05", "title": "一等函数与函数值", "status": "published",
      "objectives": ["把函数当作值传递与返回", "理解函数作为一等公民"],
      "prerequisites": ["function.declare-call"],
      "core": "一等函数：函数可赋值给变量、作为参数传递、作为返回值返回。这是函数式编程的基础，让「行为」可以像数据一样组合与传递。回调、策略模式、装饰器都建立在此之上。",
      "lang_diff": "Python：函数是对象（可赋值/传递）；JS：函数是一等值（const f = () => {}）；Java：lambda/方法引用（Comparator.comparing）；C++：函数指针/std::function；Go：函数类型 func(int) int 可作类型；Rust：fn 指针与闭包 trait（Fn/FnMut/FnOnce）。",
      "exercises": [
        { "type": "concept", "question": "「函数是一等公民」意味着函数可以？", "options": ["只能调用", "只在类中定义", "赋值给变量、作为参数传递、作为返回值", "必须命名"], "answer": 2, "feedback": "一等函数可像普通值一样被传递、赋值和返回。" },
        { "type": "read", "question": "Java 中把方法作为值传递的写法是？", "options": ["宏", "方法引用 Class::method 或 lambda", "注解", "函数指针"], "answer": 1, "feedback": "方法引用与 lambda 让 Java 函数可作为值传递。" }
      ]
    },
    { "id": "function.lambda", "module_id": "B05", "title": "匿名函数 / Lambda", "status": "published",
      "objectives": ["用匿名函数表达简短逻辑", "理解 lambda 的捕获与语法"],
      "prerequisites": ["function.first-class"],
      "core": "匿名函数（lambda）是「没有名字的短函数」，适合一次性使用的逻辑（排序比较器、事件回调、集合转换）。语法越简短越好；逻辑复杂时应命名以提升可读性与可测试性。",
      "lang_diff": "Python：lambda x: x*2（仅单表达式）；JS：(x) => x*2 或 function；Java：(x, y) -> x+y；C++：[捕获](参数) -> 类型 { }；Go：func(x int) int { } 匿名函数；Rust：|x| x*2 闭包。",
      "exercises": [
        { "type": "concept", "question": "Python lambda 的限制是？", "options": ["不能用变量", "不能返回值", "不能传参", "只能包含单个表达式"], "answer": 3, "feedback": "lambda 仅限单表达式，多语句需用 def。" },
        { "type": "read", "question": "Rust 闭包 |x| x * 2 的类型推断依据是？", "options": ["宏", "由调用上下文推断参数与返回类型", "必须标注", "总是 i32"], "answer": 1, "feedback": "Rust 闭包参数与返回类型由使用处推断，可省略标注。" }
      ]
    },
    { "id": "function.recursion", "module_id": "B05", "title": "递归函数", "status": "published",
      "objectives": ["用递归分解自相似问题", "设计基例与递归步骤"],
      "prerequisites": ["control.recursion", "function.declare-call"],
      "core": "递归函数 = 基例（直接可解的最小规模）+ 递归步骤（把问题缩小后调用自身）。设计要点：每次递归必须向基例逼近；状态通过参数传递而非全局。阶乘、斐波那契、树遍历是经典练习。",
      "lang_diff": "各语言递归写法一致：基例判断 + 自身调用。栈深度限制不同（Python 默认 1000、Go 栈可增长）。树/图递归遍历比迭代更自然；线性递归可轻易改迭代。",
      "exercises": [
        { "type": "concept", "question": "递归函数必须包含的要素是？", "options": ["循环", "基例（终止条件）与递归步骤", "异常处理", "全局变量"], "answer": 1, "feedback": "无基例会无限递归导致栈溢出。" },
        { "type": "read", "question": "def fib(n): return n if n<2 else fib(n-1)+fib(n-2) 的问题是？", "options": ["栈溢出", "返回类型错误", "语法错误", "指数级重复计算（无记忆化）"], "answer": 3, "feedback": "朴素递归斐波那契是 O(2^n)，应加记忆化或改迭代。" }
      ]
    },
    { "id": "function.pure-side-effect", "module_id": "B05", "title": "纯函数、副作用与可测试性", "status": "published",
      "objectives": ["区分纯函数与副作用", "写出易测试的纯逻辑"],
      "prerequisites": ["function.first-class"],
      "core": "纯函数：相同输入总是相同输出、无副作用（不修改外部状态、不做 IO）。副作用：读写外部变量、打印、网络、修改入参。纯函数天然易测试、可缓存、可并行；工程原则：把业务逻辑做成纯函数，副作用集中在系统边界（IO 层）。",
      "lang_diff": "概念与语言无关，但强制力不同：Rust 的借用检查让副作用更显式；Haskell 完全强制纯；Python/JS 靠纪律。测试纯函数只需断言输入输出，无需 mock。",
      "exercises": [
        { "type": "concept", "question": "下列哪项属于副作用？", "options": ["修改全局变量或打印日志", "类型转换", "返回新数组", "计算两数之和"], "answer": 0, "feedback": "修改外部状态或 IO（打印/网络/写文件）都是副作用。" },
        { "type": "concept", "question": "纯函数的最大测试优势是？", "options": ["更快", "相同输入恒同输出，断言简单无需 mock", "省内存", "可并行"], "answer": 1, "feedback": "纯函数确定性输出，测试只需给定输入断言输出。" }
      ]
    },
    { "id": "function.higher-order", "module_id": "B05", "title": "高阶函数与回调", "status": "published",
      "objectives": ["用高阶函数组合行为", "理解回调在异步与事件中的角色"],
      "prerequisites": ["function.first-class", "function.lambda"],
      "core": "高阶函数：接收函数作为参数或返回函数的函数。map/filter/reduce 是典型高阶函数——把「遍历」抽象化，把「做什么」作为函数参数传入。回调是被传递并在特定时机调用的函数，广泛用于事件处理与异步编程。",
      "lang_diff": "Python：map/filter/sorted(key=f)、装饰器；JS：数组 map/filter/reduce、addEventListener 回调；Java：Stream map/filter、Comparator；C++：std::transform/sort 传 lambda；Go：把函数当参数（sort.Slice(slice, less)）；Rust：迭代器适配器 map/filter、Fn trait。",
      "exercises": [
        { "type": "concept", "question": "sorted(items, key=len) 中 key=len 体现了？", "options": ["装饰器", "高阶函数（函数作为参数）", "递归", "继承"], "answer": 1, "feedback": "sorted 接收 key 函数决定排序依据，是高阶函数应用。" },
        { "type": "read", "question": "JS 中 arr.map(x => x*2) 的 map 属于？", "options": ["循环", "类", "高阶函数", "异常"], "answer": 2, "feedback": "map 接收转换函数并应用到每个元素，是高阶函数。" }
      ]
    },

    // ================= B06 字符串、文本与正则 =================
            {
      "id": "string.unicode",
      "module_id": "B06",
      "title": "字符、字节与 Unicode",
      "status": "published",
      "level": "L4",
      "objectives": [
        "区分四层刻度：字节 / 码元 / 码点 / 字素簇",
        "识别六语言默认 length 各自返回哪一层（最大陷阱）",
        "能在六种语言中正确计算用户可见字符数与码点数"
      ],
      "prerequisites": [
        "value.string-bytes"
      ],
      "core": "Unicode 字符串有四层刻度，自底向上：① 字节（UTF-8 编码的存储单位）；② 码元（UTF-16 的 16 位单元，Java/JS 的 char）；③ 码点（Unicode 字符编号，如 '中'=U+4E2D、'🙂'=U+1F642）；④ 字素簇（用户可见字符，可含多个码点，如 e+组合重音 é、家庭 emoji 的 ZWJ 序列）。关键认知：不同语言的默认 length API 返回的层不同——Python len() 是码点、JS/Java 的 length 是码元、C++ std::string::size() 与 Go len() 与 Rust len() 是字节。要数「用户可见字符」必须显式做字素簇切分（JS Intl.Segmenter / Java BreakIterator / 其余语言需第三方库）。",
      "summary": "四层刻度模型：字节 → 码元 → 码点 → 字素簇；六语言默认 length 各不相同，数「字符」前先问清是哪一层。",
      "commonTask": {
        "input": "\"A中e\\u0301🙂\"（A + 中文 + e + 组合重音 + emoji）",
        "expectedOutput": {
          "utf8Bytes": 11,
          "utf16Units": 6,
          "codePoints": 5,
          "graphemes": 4
        }
      },
      "comparisonDimensions": [
        "unicode-representation",
        "type-checking",
        "failure-mode",
        "idiomatic-style",
        "runtime-cost"
      ],
      "lang_diff": "Python：str 是码点序列，len()=码点数，但需第三方库做字素簇切分；JS：UTF-16 码元序列，.length=码元数，[...s] 展开可得码点数，Intl.Segmenter 原生切字素簇；Java：char 是 UTF-16 码元，length()=码元数，codePointCount() 得码点数，BreakIterator 原生切字素簇；C++：std::string 是字节串（UTF-8），size()=字节数，无标准库码点/字素簇 API；Go：len()=字节数，utf8.RuneCountInString 得码点数，字素簇需 rivo/uniseg；Rust：str 保证 UTF-8 合法，len()=字节数，chars().count() 得码点数，字素簇需 unicode-segmentation crate。",
      "variants": {
        "python": {
          "version": "3.13",
          "minimal_code": "s = \"A中e\\u0301🙂\"   # 码点序列\nprint(len(s))              # 5：码点数（默认即码点）",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 2
            }
          ],
          "syntax_notes": [
            "str 直接支持任意 Unicode 码点",
            "len(s) 统计码点，中文/emoji 各算 1"
          ],
          "semantic_notes": [
            "Python 的 len 天然是码点数（四层中偏上）",
            "字素簇需第三方 regex 库或 unicodedata 手工处理",
            "bytes 类型才是字节层：len('中'.encode()) == 3"
          ],
          "idioms": [
            "判断空串用 if not s，不要比较长度",
            "处理字素簇用 regex.findall(r'\\X', s)"
          ],
          "pitfalls": [
            "len('e\\u0301') == 2，组合字符被拆成两个码点",
            "把 len() 当「用户可见字符数」会数错"
          ],
          "comparison": {
            "unicode-representation": "str 是码点序列，len() 天然返回码点数",
            "type-checking": "动态类型；运行期才暴露字符语义问题",
            "failure-mode": "不越界；但 len 对组合字符/ZWJ 数成多个码点（逻辑错）",
            "idiomatic-style": "len() 即码点；字素簇需第三方 regex 的 \\X 或 unicodedata 手写",
            "runtime-cost": "len() O(1)；字素簇 O(n) 需解析"
          }
        },
        "javascript": {
          "version": "ES2024",
          "minimal_code": "const s = \"A中e\\u0301🙂\";       // UTF-16 码元序列\nconsole.log([...s].length);     // 5：码点数（展开迭代）\nconsole.log(s.length);          // 6：UTF-16 码元数（默认陷阱）\nconsole.log([...new Intl.Segmenter().segment(s)].length); // 4：字素簇",
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
              "role": "index",
              "start": 3,
              "end": 3
            },
            {
              "role": "stream",
              "start": 4,
              "end": 4
            }
          ],
          "syntax_notes": [
            "字符串是 UTF-16 码元序列，emoji 占 2 个码元",
            "s.length 返回码元数；[...s] 按码点迭代"
          ],
          "semantic_notes": [
            "Intl.Segmenter 是标准库字素簇切分（grapheme 粒度）",
            "s[i] 按码元索引，可能切到代理对中间",
            "textContent/innerHTML 处理的是码点语义，长度另算"
          ],
          "idioms": [
            "数码点用 [...s].length 或 Array.from(s)",
            "数字素簇用 Intl.Segmenter",
            "按码元遍历性能高，按码点遍历需展开"
          ],
          "pitfalls": [
            "s.length 对 emoji 偏大（'🙂'.length == 2）",
            "slice 可能切开代理对产生乱码"
          ],
          "comparison": {
            "unicode-representation": "UTF-16 码元序列；.length 是码元数，[...s] 得码点数",
            "type-checking": "动态类型；s[i] 可能取到代理对一半（undefined 语义）",
            "failure-mode": "slice/charAt 切开代理对产生乱码（silent）",
            "idiomatic-style": "码点用 [...s].length；字素簇用 Intl.Segmenter（原生）",
            "runtime-cost": ".length O(1)；Segmenter O(n)；展开迭代 O(n) 分配"
          }
        },
        "java": {
          "version": "21+",
          "minimal_code": "String s = \"A中e\\u0301🙂\";\nSystem.out.println(s.codePointCount(0, s.length())); // 5：码点数\nSystem.out.println(s.length());                      // 6：UTF-16 码元数",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 3
            }
          ],
          "syntax_notes": [
            "char 是 UTF-16 码元，emoji 占两个 char（代理对）",
            "length() 返回码元数"
          ],
          "semantic_notes": [
            "codePointCount(0, s.length()) 得码点数",
            "BreakIterator.getCharacterInstance() 可切字素簇",
            "s.charAt(i) 可能只取到代理对的一半"
          ],
          "idioms": [
            "遍历码点用 s.codePoints() 流",
            "字素簇用 BreakIterator 或 ICU4J"
          ],
          "pitfalls": [
            "'🙂'.length() == 2 而不是 1",
            "charAt 切代理对产生无效字符"
          ],
          "comparison": {
            "unicode-representation": "char 是 UTF-16 码元；length() 码元数，codePointCount() 码点数",
            "type-checking": "静态类型；String 不可变，编译期不查码点语义",
            "failure-mode": "charAt 代理对一半；substring 可切坏组合序列",
            "idiomatic-style": "codePoints() 流遍历；字素簇用 BreakIterator（原生）",
            "runtime-cost": "length() O(1)；codePointCount O(n)"
          }
        },
        "cpp": {
          "version": "C++20",
          "minimal_code": "std::string s = u8\"A中e\\u0301🙂\"; // UTF-8 字节串\nint n = 0;\nfor (size_t i = 0; i < s.size();) {\n  unsigned char c = s[i];\n  i += (c < 0x80) ? 1 : (c < 0xE0) ? 2 : (c < 0xF0) ? 3 : 4;\n  n++;\n}\nstd::cout << n; // 5：码点数（手写 UTF-8 解码）",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "declare-param",
              "start": 2,
              "end": 2
            },
            {
              "role": "iterate",
              "start": 3,
              "end": 6
            },
            {
              "role": "call",
              "start": 7,
              "end": 7
            }
          ],
          "syntax_notes": [
            "std::string 是字节串，无 Unicode 语义",
            "s.size() 返回 UTF-8 字节数"
          ],
          "semantic_notes": [
            "u8 前缀保证 UTF-8 编码",
            "码点/字素簇均无标准库 API，需 ICU 或手写",
            "std::u16string 才是码元层（wchar_t 平台相关慎用）"
          ],
          "idioms": [
            "现代 C++ 用 std::u8string + UTF-8 作为事实标准",
            "项目需要字符处理时引入 ICU"
          ],
          "pitfalls": [
            "std::string(\"中\").size() == 3（字节）",
            "下标访问可能落到多字节序列中间"
          ],
          "comparison": {
            "unicode-representation": "std::string 是 UTF-8 字节串；size() 是字节数",
            "type-checking": "静态类型；无字符编码检查，u8 仅保证字面量编码",
            "failure-mode": "下标访问多字节中间 → 未定义行为；size() 误导字符数",
            "idiomatic-style": "现代 C++ 用 u8string + UTF-8；字符语义需 ICU",
            "runtime-cost": "size() O(1)；手写解码 O(n)；ICU 开销较大"
          }
        },
        "go": {
          "version": "1.23+",
          "minimal_code": "s := \"A中e\\u0301🙂\"\nfmt.Println(utf8.RuneCountInString(s)) // 5：码点数\nfmt.Println(len(s))                 // 11：UTF-8 字节数",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 3
            }
          ],
          "syntax_notes": [
            "string 是只读字节切片，无编码语义",
            "len(s) 是字节数"
          ],
          "semantic_notes": [
            "utf8.RuneCountInString 统计码点（rune）",
            "range s 按 rune 迭代（自动解码）",
            "字素簇需 rivo/uniseg 第三方包"
          ],
          "idioms": [
            "遍历字符用 for range（隐式按 rune）",
            "子串 s[i:j] 是字节切片，可能切开多字节字符"
          ],
          "pitfalls": [
            "len(\"中\") == 3",
            "s[0] 是首字节而非首字符"
          ],
          "comparison": {
            "unicode-representation": "string 是只读字节切片；len() 字节数，utf8.RuneCountInString 码点数",
            "type-checking": "静态类型；[]byte(s) 显式转换",
            "failure-mode": "s[i] 是字节，多字节字符被拆；子串切片可切坏",
            "idiomatic-style": "range s 按 rune 迭代；字素簇需 rivo/uniseg",
            "runtime-cost": "len() O(1)；RuneCountInString O(n)；range 每次解码 O(n)"
          }
        },
        "rust": {
          "version": "2024 Edition",
          "minimal_code": "let s = \"A中e\\u{301}\\u{1F642}\";\nprintln!(\"{}\", s.chars().count()); // 5：码点数\nprintln!(\"{}\", s.len());          // 11：UTF-8 字节数",
          "semantic_blocks": [
            {
              "role": "declare",
              "start": 1,
              "end": 1
            },
            {
              "role": "call",
              "start": 2,
              "end": 3
            }
          ],
          "syntax_notes": [
            "&str 保证合法 UTF-8（编译期/运行期校验）",
            "s.len() 是字节数"
          ],
          "semantic_notes": [
            "chars() 迭代码点（Unicode Scalar Value）",
            "s[i] 直接索引被禁止（可能多字节），须用 bytes 或 chars",
            "字素簇需 unicode-segmentation crate"
          ],
          "idioms": [
            "按码点遍历用 s.chars()",
            "码元用 s.encode_utf16().count()",
            "切字节需先验证边界避免 panic"
          ],
          "pitfalls": [
            "s[0] 无法直接取（编译错误，强制思考编码）",
            "len(\"中\") == 3"
          ],
          "comparison": {
            "unicode-representation": "&str 保证合法 UTF-8；len() 字节数，chars().count() 码点数",
            "type-checking": "最强静态检查：s[i] 直接索引被编译期拒绝",
            "failure-mode": "无 panic 风险（索引被禁止）；但语义选择错误会算错",
            "idiomatic-style": "chars() 遍历；encode_utf16() 码元；字素簇需 unicode-segmentation crate",
            "runtime-cost": "len() O(1)；chars().count() O(n)；UTF-8 解码有校验开销"
          }
        }
      },
      "errors": [
        {
          "code": "# Python\nlen(\"e\\u0301\")  # 2",
          "message": "组合字符（e + 组合重音）被拆成 2 个码点",
          "cause": "len() 数的是码点，不是用户可见字符",
          "fix": "需要字素簇时用 regex.findall(r'\\X', s) 或第三方 uniseg"
        },
        {
          "code": "// Java\n\"🙂\".length()  // 2",
          "message": "emoji 在 UTF-16 中占两个码元（代理对）",
          "cause": "Java char 是 UTF-16 码元，length() 数码元",
          "fix": "用 codePointCount(0, s.length()) 数码点；字素簇用 BreakIterator"
        },
        {
          "code": "// C++\nstd::string(\"中\").size()  // 3",
          "message": "一个中文字符在 UTF-8 中占 3 个字节",
          "cause": "std::string 是字节串，size() 是字节数",
          "fix": "用 u8 字符串 + 手写解码，或引入 ICU 处理字符语义"
        },
        {
          "code": "// Go\nlen(\"中\")  // 3",
          "message": "len() 返回 UTF-8 字节数而非字符数",
          "cause": "Go string 是字节切片",
          "fix": "用 utf8.RuneCountInString(s) 数码点数；range s 按 rune 迭代"
        },
        {
          "code": "// JavaScript\n\"🙂\".length  // 2",
          "message": "emoji 在 UTF-16 中占 2 个码元",
          "cause": "JS 字符串是 UTF-16 码元序列，length 数码元",
          "fix": "用 [...s].length 数码点；Intl.Segmenter 数字素簇"
        }
      ],
      "transferExercises": [
        {
          "type": "migrate",
          "question": "Python 的 len(\"A中\") 返回 2（码点）。在 Java 中如何得到相同的码点数？",
          "options": [
            "\"A中\".length()",
            "\"A中\".codePointCount(0, \"A中\".length())",
            "\"A中\".size()",
            "Arrays.stream(\"A中\").count()"
          ],
          "answer": 1,
          "feedback": "Java length() 是码元数；中文 BMP 内正好 1 码元 1 码点，但 emoji 会暴露差异，必须用 codePointCount。"
        },
        {
          "type": "migrate",
          "question": "JavaScript 的 s.length 返回 UTF-16 码元数。要在 Rust 得到同样的语义，用哪个 API？",
          "options": [
            "s.len()",
            "s.chars().count()",
            "s.encode_utf16().count()",
            "s.bytes().count()"
          ],
          "answer": 2,
          "feedback": "encode_utf16() 迭代 UTF-16 码元，与 JS 的 length 语义一致；s.len() 是 UTF-8 字节数，chars().count() 是码点数。"
        },
        {
          "type": "migrate",
          "question": "Go 中 len(s) 是字节数。什么时候必须用 utf8.RuneCountInString(s)？",
          "options": [
            "永远不需要，len 就够",
            "字符串只含 ASCII 时",
            "需要统计用户可见字符数时",
            "需要统计码点数（含中文/emoji）时"
          ],
          "answer": 3,
          "feedback": "len(s) 数字节；含多字节字符（中文 3 字节、emoji 4 字节）时必须按码点统计用 RuneCountInString。字素簇还需 uniseg。"
        }
      ],
      "acceptanceTests": [
        {
          "input": "\"A中e\\u0301🙂\"",
          "assert": "codePoints == 5",
          "expect": 5
        },
        {
          "input": "\"A中e\\u0301🙂\"",
          "assert": "graphemes == 4",
          "expect": 4
        },
        {
          "input": "\"A中e\\u0301🙂\"",
          "assert": "utf16Units == 6",
          "expect": 6
        },
        {
          "input": "\"A中e\\u0301🙂\"",
          "assert": "utf8Bytes == 11",
          "expect": 11
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "「字节 → 码元 → 码点 → 字素簇」四层刻度中，哪一层是「用户可见字符」？",
          "options": [
            "字节",
            "码元",
            "码点",
            "字素簇"
          ],
          "answer": 3,
          "feedback": "字素簇是用户视觉上的一个字符，可包含多个码点（组合重音、ZWJ 序列）。"
        },
        {
          "type": "read",
          "question": "JavaScript 中 \"🙂\".length 的值是？",
          "options": [
            "1",
            "2",
            "3",
            "4"
          ],
          "answer": 1,
          "feedback": "JS 字符串是 UTF-16 码元序列，emoji 占 2 个码元，所以 length 为 2。"
        },
        {
          "type": "debug",
          "question": "以下哪段代码在统计「用户可见字符数」时会产生错误结果？",
          "options": [
            "Rust: s.chars().count()  // 输入含家庭 emoji（ZWJ 序列）",
            "Java: s.codePointCount(0, s.length())  // 输入含组合重音",
            "Go: utf8.RuneCountInString(s)  // 输入含中文",
            "JS: [...new Intl.Segmenter().segment(s)].length  // 输入任意"
          ],
          "answer": 1,
          "feedback": "家庭 emoji 是 ZWJ 连接的多个码点，chars().count() 会数成多个；字素簇切分才是用户可见字符。组合重音同理（e+\\u0301 是两个码点一个字素簇）。"
        },
        {
          "type": "migrate",
          "question": "把 Python 的 len(s)（码点）语义迁移到 C++，最贴近的等价写法是？",
          "options": [
            "s.size()",
            "手写 UTF-8 解码计数（或 ICU u_countChar32）",
            "s.length()",
            "sizeof(s)"
          ],
          "answer": 1,
          "feedback": "C++ std::string 是字节串，size() 是字节数；码点需手写解码或 ICU。这是「同语义跨语言」的典型迁移陷阱。"
        }
      ],
      "deep_dive": "字素簇（grapheme cluster）由 UAX #29 定义：组合标记（\\u0301）与基字符合并、ZWJ 序列（👨👩👧）整体、Emoji 修饰符跟随主 emoji，都算一个字素簇。因此「用户可见字符数」无法用码点简单推导——必须做字素簇切分。文本规范化（NFC/NFD）也会改变码点组成但不改变字素簇：é 在 NFC 是一个码点 U+00E9，在 NFD 是 e+U+0301 两个码点，两者字素簇都是 1。处理用户输入（表单长度限制、数据库字段长度）时应以字素簇为基准，避免截断产生半个字符。",
      "next": [
        "string.index-slice",
        "string.search-replace"
      ]
    },
    { "id": "string.immutability", "module_id": "B06", "title": "字符串不可变性", "status": "published",
      "objectives": ["理解字符串不可变的影响", "选择正确的字符串构建方式"],
      "prerequisites": ["value.mutability", "string.unicode"],
      "core": "多数语言的字符串不可变：任何「修改」操作（拼接、替换、转大写）都生成新字符串。好处：可安全共享、可缓存（字符串池/驻留）；代价：循环内反复拼接产生大量临时对象（O(n²)），应改用 join/Builder。",
      "lang_diff": "Python：str 不可变，join 高效拼接；JS：String 不可变，模板字符串拼接；Java：String 不可变，StringBuilder 高效；C++：std::string 可变（例外）；Go：string 不可变，strings.Builder；Rust：String 可变（拥有所有权可 push_str）、&str 不可变。",
      "exercises": [
        { "type": "concept", "question": "Python 中循环内 s += part 的问题与替代？", "options": ["无问题", "O(n²) 效率差，应用 ''.join()", "语法错误", "内存泄漏"], "answer": 1, "feedback": "不可变字符串每次拼接新建对象，应收集到列表后 join。" },
        { "type": "read", "question": "Java 中高效拼接大量字符串应使用？", "options": ["+", "format", "concat", "StringBuilder"], "answer": 3, "feedback": "StringBuilder 避免反复创建新 String 对象。" }
      ]
    },
    { "id": "string.concat-format", "module_id": "B06", "title": "拼接、插值与格式化", "status": "published",
      "objectives": ["用插值/格式化组合文本", "选择比 + 拼接更安全的构建方式"],
      "prerequisites": ["string.immutability", "value.conversion"],
      "core": "把变量嵌入字符串有三代方式：拼接（+）、格式化（% / format / printf）、插值（f-string / 模板字符串 / format!）。插值最直观安全，且支持格式说明（小数位、对齐、千分位）。避免用 + 拼接数字与字符串（隐式转换坑）。",
      "lang_diff": "Python：f'你好 {name}，{pi:.2f}'；JS：`你好 ${name}`；Java：String.format(\"你好 %s\", name)、\"%d\".formatted(21)；C++：std::format（C++20）或 sprintf；Go：fmt.Sprintf(\"你好 %s\", name)；Rust：format!(\"你好 {}\", name)、{name} 捕获。",
      "exercises": [
        { "type": "concept", "question": "Python 中嵌入变量并保留两位小数的写法是？", "options": ["'%.2f' % x", "format(x, 2)", "str(x)+'2'", "f'{x:.2f}'"], "answer": 3, "feedback": "f-string 的 :.2f 格式说明最直观。" },
        { "type": "read", "question": "JS 中把变量嵌入字符串的现代写法是？", "options": ["sprintf", "name.concat()", "\"+name+\"", "`${name}`"], "answer": 3, "feedback": "模板字符串用反引号与 ${} 插值。" }
      ]
    },
    { "id": "string.index-slice", "module_id": "B06", "title": "长度、索引与切片", "status": "published",
      "objectives": ["按字符访问字符串", "用切片提取子串"],
      "prerequisites": ["expr.index-slice", "string.unicode"],
      "core": "长度统计、按下标访问、切片提取子串是文本处理基础。关键陷阱：索引单位是字符还是字节？切片区间是闭区间还是半开？负索引从尾部计数是部分语言特性。越界行为各语言不同（报错 vs undefined vs panic）。",
      "lang_diff": "Python：len、seq[i]（越界 IndexError）、seq[1:5] 半开、负索引；JS：length、charAt/at、slice(1,5) 半开、负索引 at(-1)；Java：length、charAt、substring(1,5)；C++：size、operator[]、substr(1,4) 长度制；Go：len（字节）、s[i]（字节）、s[1:5]；Rust：len（字节）、chars().nth()、&s[1..5]（字节索引）。",
      "exercises": [
        { "type": "concept", "question": "Python 中 'hello'[1:4] 的结果是？", "options": ["'hel'", "'ello'", "'llo'", "'ell'"], "answer": 3, "feedback": "切片半开 [1,4)，取索引 1,2,3 → 'ell'。" },
        { "type": "read", "question": "Rust 中直接 s[0] 对 String 的行为是？", "options": ["panic", "返回首字节", "返回首字符", "编译错误（需 chars() 或字节索引）"], "answer": 3, "feedback": "Rust 的 String 不支持按字符索引，避免 UTF-8 边界歧义。" }
      ]
    },
    { "id": "string.search-replace", "module_id": "B06", "title": "查找、替换、拆分与连接", "status": "published",
      "objectives": ["在文本中查找与替换", "拆分与连接字符串"],
      "prerequisites": ["string.index-slice"],
      "core": "文本操作四件套：查找（find/indexOf/contains）、替换（replace）、拆分（split）、连接（join）。要点：替换生成新串；split 与 join 互逆；find 找不到时的返回值各语言不同（-1 / undefined / None）。",
      "lang_diff": "Python：find（找不到-1）、replace、split、sep.join(list)；JS：indexOf（-1）、replace/replaceAll、split、join；Java：indexOf、replace、split、String.join；C++：find（npos）、replace、无内置 split；Go：strings.Index/Replace/Split/Join；Rust：find（Option）、replace、split、collect/join。",
      "exercises": [
        { "type": "concept", "question": "Python 中 'a,b,c'.split(',') 的结果是？", "options": ["['a', 'b', 'c']", "'a, b, c'", "'abc'", "('a', 'b', 'c')"], "answer": 0, "feedback": "split 按分隔符拆分为列表。" },
        { "type": "read", "question": "JS 中 ['a','b'].join('-') 的结果是？", "options": ["'a, b'", "'ab'", "'a-b'", "['a-b']"], "answer": 2, "feedback": "join 用指定分隔符连接数组元素。" }
      ]
    },
    { "id": "string.case-whitespace", "module_id": "B06", "title": "大小写与空白处理", "status": "published",
      "objectives": ["统一大小写与去除空白", "规范化用户输入"],
      "prerequisites": ["string.search-replace"],
      "core": "输入规范化先处理大小写与空白：去首尾空白（trim/strip）、统一大小写（lower/upper）、压缩连续空白。这是比较、校验、去重前的标准步骤，避免 'Ada ' 与 'ada' 被判为不同。",
      "lang_diff": "Python：strip/lower/upper/title；JS：trim/toLowerCase/toUpperCase；Java：trim/strip（11+）/toLowerCase；C++：无内置（手写或 boost）；Go：strings.TrimSpace/ToLower/ToUpper；Rust：trim/to_lowercase/to_uppercase。",
      "exercises": [
        { "type": "concept", "question": "Python 中去除字符串首尾空白的方法是？", "options": ["clean()", "trim()", "strip()", "remove()"], "answer": 2, "feedback": "strip() 去首尾空白；lstrip/rstrip 单侧。" },
        { "type": "read", "question": "比较用户输入忽略大小写与空白应先？", "options": ["转数字", "规范化（strip + lower）后比较", "替换空格", "直接 =="], "answer": 1, "feedback": "规范化后再比较，避免格式差异导致误判。" }
      ]
    },
    { "id": "string.builder", "module_id": "B06", "title": "字符串构建器与缓冲区", "status": "published",
      "objectives": ["高效构建大量文本", "避免不可变字符串的拼接开销"],
      "prerequisites": ["string.immutability"],
      "core": "循环内拼接不可变字符串是 O(n²)——每次创建新对象并复制。构建器/缓冲区在内存中累积、最后一次性生成：StringBuilder（Java）、strings.Builder（Go）、join（Python/JS）。处理大文本或高频拼接时必备。",
      "lang_diff": "Python：列表收集 + ''.join() 或 io.StringIO；JS：数组 push + join('')；Java：StringBuilder（非线程安全）/StringBuffer；C++：std::string +=（可变，可优化）/ostringstream；Go：strings.Builder；Rust：String::with_capacity + push_str。",
      "exercises": [
        { "type": "concept", "question": "构建大量字符串时，相比 s += 更高效的方式是？", "options": ["更多 +=", "用构建器/join 一次性生成", "转列表", "转字节"], "answer": 1, "feedback": "构建器/join 避免反复复制，O(n) 完成。" },
        { "type": "read", "question": "Go 中高效构建字符串的类型是？", "options": ["string", "rune", "strings.Builder", "bytes.Buffer（通用）"], "answer": 2, "feedback": "strings.Builder 专为字符串构建优化。" }
      ]
    },
    { "id": "string.regex", "module_id": "B06", "title": "正则表达式基础", "status": "published",
      "objectives": ["用正则匹配文本模式", "掌握常用元字符与分组"],
      "prerequisites": ["string.search-replace"],
      "core": "正则表达式用紧凑语法描述文本模式：\\d 数字、\\w 单词字符、+ 一次以上、* 零次以上、? 可选、() 分组、| 或、[] 字符集。用途：校验（邮箱/手机号）、提取（捕获组）、替换。原则：简单匹配用字符串方法，复杂模式再用正则；正则不可读时加注释。",
      "lang_diff": "Python：re 模块（re.match/search/findall）；JS：RegExp（/\\d+/.test、str.match）；Java：Pattern/Matcher；C++：std::regex；Go：regexp 包；Rust：regex crate（标准库无）。",
      "exercises": [
        { "type": "concept", "question": "正则 \\d+ 匹配什么？", "options": ["小数点", "一个或多个数字", "单个字母", "空白"], "answer": 1, "feedback": "\\d 是数字，+ 表示一次或多次。" },
        { "type": "read", "question": "Python 中提取所有数字用 re 的哪个函数？", "options": ["re.sub", "re.findall(r'\\d+',  s)", "re.split", "re.compile"], "answer": 1, "feedback": "findall 返回所有匹配结果的列表。" }
      ]
    },
    { "id": "string.parsing-validation", "module_id": "B06", "title": "文本解析与输入校验", "status": "published",
      "objectives": ["解析结构化文本", "校验用户输入的合法性"],
      "prerequisites": ["string.regex", "value.conversion"],
      "core": "解析：把文本（命令、配置、日期）拆解为结构化数据；校验：判断输入是否符合规则（邮箱、数字范围）。原则：先校验再使用；用正则或专门解析器，不要假设输入合法；给非法输入明确的错误提示。",
      "lang_diff": "Python：split/int() + try/正则；JS：Number/parseInt + 正则；Java：Integer.parseInt + 正则，受检异常强制处理；C++：std::stoi + 异常；Go：strconv + error 检查；Rust：parse::<T>() 返回 Result 强制处理。",
      "exercises": [
        { "type": "concept", "question": "处理用户输入数字最安全的做法是？", "options": ["直接 int(input)", "先校验格式再解析并处理失败", "忽略错误", "用正则提取全部数字"], "answer": 1, "feedback": "先校验格式、再解析、并给非法输入明确提示。" },
        { "type": "concept", "question": "Rust 中解析失败的处理方式是？", "options": ["返回 -1", "parse 返回 Result，用 ? 或 match 处理", "返回 0", "panic"], "answer": 1, "feedback": "parse::<T>() 返回 Result，强制处理解析失败。" }
      ]
    },

    // ================= B07 集合与迭代 =================
    { "id": "collection.array-list", "module_id": "B07", "title": "数组、动态数组与列表", "status": "published",
      "objectives": ["选择定长数组与动态列表", "理解追加与扩容的开销"],
      "prerequisites": ["value.primitive-types"],
      "core": "数组：定长连续存储，随机访问 O(1)；动态数组/列表：自动扩容，尾部追加摊还 O(1)，中间插入 O(n)。选择：已知长度用定长，需要增删用动态列表；头部频繁插入考虑链表或双端队列。",
      "lang_diff": "Python：list 动态列表；JS：Array 动态（可稀疏）；Java：数组定长、ArrayList 动态；C++：数组定长、std::vector 动态；Go：数组定长 [n]T、slice 动态；Rust：数组 [T; N] 定长、Vec 动态。",
      "exercises": [
        { "type": "concept", "question": "动态列表尾部追加的时间复杂度是？", "options": ["O(n)", "O(1) 摊还", "O(n²)", "O(log n)"], "answer": 1, "feedback": "尾部追加摊还 O(1)（扩容时复制，但均摊后 O(1)）。" },
        { "type": "read", "question": "Go 中定长数组与动态切片的类型写法分别是？", "options": ["array 与 slice", "[]int 与 [5]int", "list 与 array", "[5]int 与 []int"], "answer": 3, "feedback": "[5]int 是定长数组，[]int 是动态切片。" }
      ]
    },
    { "id": "collection.tuple", "module_id": "B07", "title": "元组与固定结构", "status": "published",
      "objectives": ["用元组组合异构数据", "理解元组与列表的区别"],
      "prerequisites": ["collection.array-list"],
      "core": "元组（tuple）是固定长度、通常异构的有序组合，适合表达「一组相关的不同类型值」（坐标、键值、多返回值）。与列表的区别：元组强调结构固定、不可变，列表强调同构可变序列。解构让元组使用更便捷。",
      "lang_diff": "Python：tuple 不可变、解包 x, y = t；JS：无原生元组（数组或对象代替）；Java：无原生元组（record/Pair）；C++：std::tuple/pair、结构化绑定 auto [a,b]；Go：无元组（多返回值代替）；Rust：tuple (i32, &str)、解包 let (a, b) = t。",
      "exercises": [
        { "type": "concept", "question": "Python 元组与列表的核心区别是？", "options": ["元组不可变、适合固定结构", "元组更快", "无区别", "元组更大"], "answer": 0, "feedback": "元组不可变、表达固定结构；列表可变、表达动态序列。" },
        { "type": "read", "question": "C++ 中解包 std::pair 的现代语法是？", "options": ["tuple_get", "auto [a,  b] = pair（结构化绑定）", "unpack", "pair.first/second"], "answer": 1, "feedback": "C++17 结构化绑定可直接解包 tuple/pair。" }
      ]
    },
    { "id": "collection.set", "module_id": "B07", "title": "集合 Set", "status": "published",
      "objectives": ["用集合去重与成员判断", "掌握集合运算"],
      "prerequisites": ["collection.array-list", "value.semantics"],
      "core": "集合（Set）存储不重复元素：自动去重、成员判断 O(1)、支持交并差集运算。元素需可哈希（不可变）。适用：去重、快速成员判断、求两个集合的关系。不保证顺序（部分实现有序）。",
      "lang_diff": "Python：set（{1,2,3}）、frozenset 不可变、& | - 运算；JS：Set（new Set()）、has/add；Java：HashSet（无序）、TreeSet（有序）、LinkedHashSet；C++：std::unordered_set/std::set；Go：无原生 Set（map[T]bool 模拟）；Rust：HashSet/BTreeSet。",
      "exercises": [
        { "type": "concept", "question": "用集合快速判断元素是否存在的时间复杂度是？", "options": ["O(n²)", "O(log n)", "O(n)", "O(1)（哈希）"], "answer": 3, "feedback": "哈希集合成员判断平均 O(1)。" },
        { "type": "read", "question": "Go 中实现集合的惯用方式是？", "options": ["map[T]bool 或 map[T]struct{}", "array", "slice", "set 类型"], "answer": 0, "feedback": "Go 无原生 Set，用 map 的键作为集合元素。" }
      ]
    },
    { "id": "collection.stack-queue", "module_id": "B07", "title": "栈、队列与双端队列", "status": "published",
      "objectives": ["用栈表达后进先出", "用队列表达先进先出"],
      "prerequisites": ["collection.array-list"],
      "core": "栈（LIFO）：push 入栈、pop 出栈，用于括号匹配、函数调用、撤销操作；队列（FIFO）：enqueue 入队、dequeue 出队，用于任务调度、BFS。双端队列（deque）两端都可进出，更灵活。列表尾部操作 O(1)，头部操作 O(n)，需注意。",
      "lang_diff": "Python：list（栈 append/pop）、collections.deque（队列）；JS：数组 push/pop（栈）、push/shift（队列，shift 慢）；Java：ArrayDeque（栈与队列）、Stack（过时）；C++：std::stack/queue/deque；Go：slice 模拟栈、channel 或容器模拟队列；Rust：Vec 作栈、VecDeque 作队列。",
      "exercises": [
        { "type": "concept", "question": "栈（LIFO）的典型应用是？", "options": ["排序", "任务调度", "BFS", "括号匹配与撤销操作"], "answer": 3, "feedback": "栈后进先出，适合括号匹配、函数调用栈、撤销。" },
        { "type": "read", "question": "JS 数组作队列时出队操作为何低效？", "options": ["语法复杂", "内存不足", "无问题", "shift 头部删除需移动所有元素 O(n)"], "answer": 3, "feedback": "shift 是 O(n)；高频队列应用专用结构或链表。" }
      ]
    },
    { "id": "collection.crud", "module_id": "B07", "title": "增删改查", "status": "published",
      "objectives": ["掌握集合的基本操作", "理解各操作的效率差异"],
      "prerequisites": ["collection.array-list", "collection.map"],
      "core": "增（append/push/add/insert）、删（remove/pop/delete）、改（索引赋值）、查（索引/查找/in）。效率：尾部增删 O(1)、中间增删 O(n)、按下标查 O(1)、按值查 O(n)。映射的按键操作均 O(1)。",
      "lang_diff": "Python：append/insert/remove/pop/del；JS：push/splice/pop/shift/unshift/delete；Java：add/remove/set/get；C++：push_back/insert/erase/operator[]；Go：append/slice 删除（无内置 remove）；Rust：push/insert/remove/truncate。",
      "exercises": [
        { "type": "concept", "question": "在动态列表中间插入元素的时间复杂度是？", "options": ["O(n)", "O(log n)", "O(n log n)", "O(1)"], "answer": 0, "feedback": "中间插入需移动后续元素，O(n)；尾部 O(1) 摊还。" },
        { "type": "read", "question": "Go 中删除切片第 i 个元素的惯用法是？", "options": ["append(s[:i],  s[i+1:]...)", "s.remove(i)", "pop(s,  i)", "delete(s,  i)"], "answer": 0, "feedback": "Go 无内置删除，用切片拼接跳过目标元素。" }
      ]
    },
    { "id": "collection.copy", "module_id": "B07", "title": "复制、引用与深浅拷贝", "status": "published",
      "objectives": ["区分赋值、浅拷贝与深拷贝", "避免共享引用导致的意外修改"],
      "prerequisites": ["value.semantics", "collection.array-list"],
      "core": "赋值对象/集合通常是「复制引用」——两个名字指向同一对象，改一个影响另一个。浅拷贝：复制容器本身，内部嵌套对象仍共享；深拷贝：递归复制全部嵌套。需要独立副本时务必显式拷贝，嵌套结构需深拷贝。",
      "lang_diff": "Python：= 引用、list.copy()/[:] 浅拷贝、copy.deepcopy 深拷贝；JS：= 引用、[...arr]/Object.assign 浅拷贝、structuredClone 深拷贝；Java：= 引用、clone 浅拷贝、序列化深拷贝；C++：= 值拷贝（默认深拷贝值语义）；Go：= 值拷贝（slice 共享底层数组）、copy()；Rust：= 移动、clone() 显式深拷贝。",
      "exercises": [
        { "type": "concept", "question": "Python 中 b = a（a 是列表）后修改 b，a 会？", "options": ["报错", "一起变（共享引用）", "变为副本", "不变"], "answer": 1, "feedback": "赋值是引用拷贝，共享同一对象；独立副本用 a.copy() 或 a[:]。" },
        { "type": "read", "question": "JS 中深拷贝嵌套对象的现代方法是？", "options": ["JSON.parse(JSON.stringify(obj))", "[...obj]", "structuredClone(obj)", "Object.assign({},  obj)"], "answer": 2, "feedback": "structuredClone 递归深拷贝；浅拷贝方法对嵌套对象仍共享。" }
      ]
    },
    { "id": "collection.sort-search", "module_id": "B07", "title": "排序、查找与去重", "status": "published",
      "objectives": ["对集合排序与查找", "用合适方法去重"],
      "prerequisites": ["collection.crud", "collection.set"],
      "core": "排序：稳定 vs 不稳定、自定义比较器（key/comparator）。查找：线性 O(n) vs 有序二分 O(log n)。去重：保序用「见过的加入集合判断」、不保序直接转集合。排序是许多算法的前置（二分查找、合并区间）。",
      "lang_diff": "Python：sorted(list, key=f) 返回新列表、list.sort() 原地、bisect 二分；JS：arr.sort(compareFn) 原地（默认字典序！）、find/findIndex、Set 去重；Java：Collections.sort/Arrays.sort + Comparator、binarySearch；C++：std::sort/binary_search；Go：sort.Slice/sort.Ints；Rust：vec.sort()/sort_by/binary_search。",
      "exercises": [
        { "type": "concept", "question": "JS 中 [10, 9, 1].sort() 的默认结果是？", "options": ["[1, 9, 10]", "报错", "[1, 10, 9]（按字典序）", "[10, 9, 1]"], "answer": 2, "feedback": "sort() 默认按字符串字典序，数字排序需 arr.sort((a,b)=>a-b)。" },
        { "type": "read", "question": "Python 中保序去重的惯用法是？", "options": ["set(lst)", "lst.unique()", "list(dict.fromkeys(lst))", "sorted(set(lst))"], "answer": 2, "feedback": "dict.fromkeys 保序去重；set 不保序。" }
      ]
    },
    { "id": "collection.filter-map-reduce", "module_id": "B07", "title": "过滤、映射与归约", "status": "published",
      "objectives": ["用声明式转换集合", "组合 filter/map/reduce 表达数据管线"],
      "prerequisites": ["collection.iteration", "function.higher-order"],
      "core": "声明式集合处理三件套：filter 保留满足条件的元素、map 逐个转换、reduce 归约为单一值。链式组合形成数据管线（filter→map→reduce），比显式循环更聚焦意图。惰性实现（流/迭代器）可处理大集合。",
      "lang_diff": "Python：filter/map（惰性）或推导式、functools.reduce；JS：arr.filter/map/reduce；Java：Stream filter/map/reduce/collect；C++：ranges::views::filter/transform（C++20）；Go：无内置，for 循环；Rust：iter().filter().map().fold()/collect()。",
      "exercises": [
        { "type": "concept", "question": "把集合中所有元素求和应该用？", "options": ["reduce/fold", "sort", "map", "filter"], "answer": 0, "feedback": "reduce/fold 把集合归约为单一值。" },
        { "type": "read", "question": "JS 中 arr.filter(x => x > 0).map(x => x * 2) 的结果是？", "options": ["原数组", "先过滤正数再翻倍的新数组", "排序", "报错"], "answer": 1, "feedback": "链式：filter 先筛选，map 再转换，返回新数组。" }
      ]
    },
    { "id": "collection.equality-hash", "module_id": "B07", "title": "集合相等性与哈希", "status": "published",
      "objectives": ["理解集合作为键的条件", "实现正确的相等与哈希"],
      "prerequisites": ["value.semantics", "collection.set"],
      "core": "把对象放入哈希集合/作为映射键，要求对象可哈希且相等判断正确：equals 相等必须 hashCode 相同（Java 契约）。可变对象作键是陷阱——放入后修改字段导致 hashCode 变化、对象「找不到」。自定义类型需重写 equals/hashCode 或 derive。",
      "lang_diff": "Python：__eq__/__hash__（dataclass 自动生成，mutable 需 frozen=True）；JS：对象作键按引用身份；Java：equals/hashCode 契约；C++：operator== 与 hash 特化；Go：可比较类型（struct 逐字段）可作键；Rust：Eq/Hash derive。",
      "exercises": [
        { "type": "concept", "question": "Java 中重写 equals 但不重写 hashCode 的后果是？", "options": ["编译错误", "HashSet/HashMap 中对象无法正确查找", "无影响", "更快"], "answer": 1, "feedback": "equals 相等必须 hashCode 相同，否则哈希容器行为错误。" },
        { "type": "concept", "question": "Python 可变 dataclass 要可作集合元素需？", "options": ["无需处理", "转字符串", "加 __iter__", "frozen=True（不可变才可哈希）"], "answer": 3, "feedback": "可变对象默认不可哈希；frozen=True 使其可哈希。" }
      ]
    },
    { "id": "collection.complexity", "module_id": "B07", "title": "常见操作的时间复杂度", "status": "published",
      "objectives": ["按操作复杂度选择容器", "识别隐藏的 O(n) 操作"],
      "prerequisites": ["collection.crud", "ds.complexity"],
      "core": "容器选型看操作复杂度：数组/动态列表——按下标 O(1)、中间插删 O(n)、按值查 O(n)；链表——头尾 O(1)、随机访问 O(n)；哈希表——按键 O(1)、无序；有序树——O(log n)、有序。识别隐式 O(n)：in 判断、shift、中间 insert。",
      "lang_diff": "各语言同名容器复杂度一致（list/vector/ArrayList 均为动态数组）。特例：Python dict 与 JS Map 均哈希 O(1)；Java LinkedList 与 ArrayList 差异大；Go slice 头部操作需重新分配。",
      "exercises": [
        { "type": "concept", "question": "按下标访问动态列表元素的时间复杂度是？", "options": ["O(n)", "O(1)", "O(n log n)", "O(log n)"], "answer": 1, "feedback": "连续内存 + 下标计算，O(1) 随机访问。" },
        { "type": "concept", "question": "频繁在序列头部插入元素应选择？", "options": ["动态数组", "栈", "哈希表", "链表或双端队列"], "answer": 3, "feedback": "链表/双端队列头部插入 O(1)；动态数组头部插入 O(n)。" }
      ]
    },

    // ================= B08 数据建模与面向对象 =================
    { "id": "model.construct", "module_id": "B08", "title": "实例化与构造", "status": "published",
      "objectives": ["用构造器初始化对象", "理解构造期的约束与默认值"],
      "prerequisites": ["model.record-struct-class"],
      "core": "构造器在创建对象时初始化字段，保证对象一创建就处于合法状态（不变量成立）。要点：必填字段通过构造参数传入，可选字段给默认值；构造期不应做耗时/可失败操作（放工厂方法）。Rust/Go 无构造器，用字面量或工厂函数。",
      "lang_diff": "Python：__init__(self) 初始化；JS：constructor()；Java：构造方法与类同名、new 调用；C++：构造函数 + 初始化列表（成员初始化优先用初始化列表）；Go：无构造器，NewT() 工厂函数惯用；Rust：无构造器，T::new() 关联函数惯用。",
      "exercises": [
        { "type": "concept", "question": "Go 中初始化结构体的惯用方式是？", "options": ["NewT() 工厂函数或字面量", "new T()", "__init__", "constructor"], "answer": 0, "feedback": "Go 无构造器，用工厂函数或结构体字面量初始化。" },
        { "type": "read", "question": "C++ 成员初始化的推荐方式是？", "options": ["构造体内赋值", "宏", "静态方法", "初始化列表"], "answer": 3, "feedback": "初始化列表直接构造成员，避免先默认构造再赋值。" }
      ]
    },
    { "id": "model.field-property-method", "module_id": "B08", "title": "字段、属性与方法", "status": "published",
      "objectives": ["区分数据（字段）与行为（方法）", "用属性控制访问"],
      "prerequisites": ["model.construct"],
      "core": "字段存数据、方法定义行为、属性是对字段访问的受控封装（getter/setter）。方法通过 self/this 访问所属对象的数据。属性让「像访问字段一样」调用方法，便于在不改接口的前提下加校验/计算逻辑。",
      "lang_diff": "Python：实例属性 self.x、方法 def m(self)、@property 受控属性；JS：this.x、方法、get/set 访问器；Java：字段、方法、getter/setter 惯例（无内置属性）；C++：成员变量、成员函数、无属性语法；Go：结构体字段、func (r T) M() 接收者方法；Rust：结构体字段、impl 中 fn m(&self)。",
      "exercises": [
        { "type": "concept", "question": "Python 中把方法伪装成属性访问的装饰器是？", "options": ["@staticmethod", "@classmethod", "@dataclass", "@property"], "answer": 3, "feedback": "@property 让 obj.x 调用方法而无需括号。" },
        { "type": "read", "question": "Rust 中读取自身数据的方法签名是？", "options": ["fn m(self)", "fn m()", "fn m(&mut self)", "fn m(&self)"], "answer": 3, "feedback": "&self 只读借用；&mut self 可变借用；self 移动所有权。" }
      ]
    },
    { "id": "model.encapsulation", "module_id": "B08", "title": "访问控制与封装", "status": "published",
      "objectives": ["用封装隐藏内部实现", "暴露最小必要接口"],
      "prerequisites": ["model.field-property-method"],
      "core": "封装：把内部状态设为私有，只通过公开方法访问。好处：不变量可控（字段不会被随意改坏）、实现可换（接口不变）。原则：默认私有，按需开放；不要为每个字段都生成 getter/setter（那是把私有改名的伪封装）。",
      "lang_diff": "Python：约定 _private（非强制）/ __name（名称改写）；JS：#private 字段（ES2022）；Java：private/protected/public 强制；C++：private/public 访问修饰符；Go：小写包内私有、大写导出；Rust：默认私有、pub 公开。",
      "exercises": [
        { "type": "concept", "question": "Go 中包内私有标识符的规则是？", "options": ["private 关键字", "首字母小写", "internal 包", "_ 前缀"], "answer": 1, "feedback": "Go 用首字母大小写控制可见性：小写包内私有，大写导出。" },
        { "type": "concept", "question": "JS 中真正的私有字段语法是？", "options": ["#x", "private x", "x$", "_x（约定）"], "answer": 0, "feedback": "#x 是 ES2022 真正的私有字段，外部无法访问。" }
      ]
    },
    { "id": "model.static-instance", "module_id": "B08", "title": "实例成员与静态成员", "status": "published",
      "objectives": ["区分实例成员与静态成员", "用静态成员表达类级共享"],
      "prerequisites": ["model.field-property-method"],
      "core": "实例成员属于每个对象（各自独立）；静态/类成员属于类型本身（所有实例共享一份，如计数器、常量、工厂方法）。访问：实例成员通过对象、静态成员通过类型。静态方法不依赖实例状态。",
      "lang_diff": "Python：实例属性 self.x、类属性（类体定义）、@staticmethod/@classmethod；JS：static 关键字；Java：static 字段/方法（类名访问）；C++：static 成员（类外初始化）；Go：无静态（包级变量代替）；Rust：无 static 方法成员（关联函数 Self::new 代替）、const/static 项。",
      "exercises": [
        { "type": "concept", "question": "Java 中静态成员的访问方式是？", "options": ["对象.静态成员", "只能实例访问", "this.静态成员", "类名.静态成员（也可对象但不推荐）"], "answer": 3, "feedback": "静态成员属于类，应通过类名访问。" },
        { "type": "concept", "question": "Python 中所有实例共享一份的属性定义在？", "options": ["全局", "类体中直接定义（类属性）", "__init__ 中 self.x", "@property"], "answer": 1, "feedback": "类体直接定义的是类属性，所有实例共享；__init__ 中 self.x 是实例属性。" }
      ]
    },
    { "id": "model.inheritance", "module_id": "B08", "title": "继承与方法重写", "status": "published",
      "objectives": ["用继承复用与扩展行为", "正确重写父类方法"],
      "prerequisites": ["model.record-struct-class"],
      "core": "继承：子类获得父类的字段与方法，并可重写（override）特定行为。调用时按实际类型分派（多态）。要点：is-a 关系才用继承；重写保持签名一致并可用 super 调用父类实现；构造时先初始化父类。",
      "lang_diff": "Python：class B(A)、super().method()；JS：class B extends A、super.method()；Java：extends（单继承）、@Override、super；C++：class B : public A、virtual 虚函数；Go：无继承（组合嵌入代替）；Rust：无继承（trait 默认实现 + 组合）。",
      "exercises": [
        { "type": "concept", "question": "Java 中重写父类方法应加的注解是？", "options": ["@Virtual", "@Super", "@Override", "@Inherited"], "answer": 2, "feedback": "@Override 让编译器检查确实重写了父类方法，防止签名写错。" },
        { "type": "concept", "question": "Go 中实现代码复用的方式是？", "options": ["模板", "继承", "结构体嵌入（组合）", "虚函数"], "answer": 2, "feedback": "Go 无继承，用嵌入（组合）获得字段与方法。" }
      ]
    },
    { "id": "model.composition", "module_id": "B08", "title": "组合优于继承", "status": "published",
      "objectives": ["用组合替代深层继承", "理解组合带来的灵活性"],
      "prerequisites": ["model.inheritance"],
      "core": "继承强耦合（子类依赖父类实现）、层级深难维护、多重继承复杂。组合：把能力拆成小对象，用「持有」代替「是」——has-a 替代 is-a。好处：运行时灵活替换、依赖明确、可测试。经验法则：优先组合，继承只用于真正的 is-a 且层级浅。",
      "lang_diff": "Go/Rust 从设计上只支持组合（无继承），验证了其可行性；Python/JS/Java/C++ 都可用组合替代继承。设计模式（策略/装饰器/适配器）本质是组合。",
      "exercises": [
        { "type": "concept", "question": "「组合优于继承」的核心优势是？", "options": ["更快", "省内存", "松耦合、可运行时替换、易测试", "语法简单"], "answer": 2, "feedback": "组合依赖明确、可替换，避免继承的强耦合。" },
        { "type": "concept", "question": "表达「车有引擎」应该用？", "options": ["车持有引擎（组合）", "接口", "引擎继承车", "车继承引擎"], "answer": 0, "feedback": "has-a 关系用组合；is-a 才考虑继承。" }
      ]
    },
    { "id": "model.interface-trait", "module_id": "B08", "title": "接口、协议与 Trait", "status": "published",
      "objectives": ["用接口抽象行为契约", "理解隐式与显式接口实现"],
      "prerequisites": ["model.inheritance", "model.composition"],
      "core": "接口/trait/协议定义「能做什么」的契约而不关心「怎么做」：任何类型实现了要求的方法即满足接口。这让代码面向抽象而非具体类型编程（依赖倒置）。关键差异：显式实现（Java/C++ 需声明 implements）vs 隐式实现（Go/Python 鸭子类型，有方法即满足）。",
      "lang_diff": "Python：鸭子类型 + Protocol（类型标注）；JS：鸭子类型（结构匹配）；Java：interface + implements 显式；C++：抽象基类（纯虚函数）/ concept（C++20）；Go：interface 隐式实现（有方法即满足）；Rust：trait + impl 显式实现（但无需在类型处声明）。",
      "exercises": [
        { "type": "concept", "question": "Go 接口的实现方式是？", "options": ["显式 implements", "注解", "隐式：类型拥有接口要求的方法即自动满足", "继承"], "answer": 2, "feedback": "Go 接口隐式实现，无需声明，促进解耦。" },
        { "type": "concept", "question": "Rust 中定义行为契约的机制是？", "options": ["abstract class", "interface", "protocol", "trait"], "answer": 3, "feedback": "Rust 用 trait 定义共享行为，impl 实现。" }
      ]
    },

    // ================= B09 错误处理与资源管理 =================
    { "id": "error.kinds", "module_id": "B09", "title": "语法错误、类型错误与运行时错误", "status": "published",
      "objectives": ["区分三类错误的暴露时机", "按类型选择修复策略"],
      "prerequisites": ["runtime.errors-kinds"],
      "core": "语法错误：代码不符合语法规则，编译/解析期暴露，最易修复；类型错误：类型不匹配（如字符串加数字），强类型语言编译期发现；运行时错误：程序运行中失败（除零、越界、文件不存在、空指针），需错误处理机制应对。前两类靠编译器，运行时错误靠防御与处理。",
      "lang_diff": "语法/类型错误：Rust/C++/Go/Java 编译期暴露最多；Python/JS 运行期暴露。运行时错误处理：异常（Python/JS/Java/C++）vs 错误值（Go/Rust）。",
      "exercises": [
        { "type": "concept", "question": "类型不匹配（如 '1' + 1）在 Rust 中何时暴露？", "options": ["不报错", "编译期（类型检查）", "运行时", "部署后"], "answer": 1, "feedback": "Rust 静态类型在编译期拒绝类型不匹配。" },
        { "type": "concept", "question": "文件不存在导致的打开失败属于？", "options": ["语法错误", "类型错误", "运行时错误", "逻辑错误"], "answer": 2, "feedback": "文件 IO 失败是运行时错误，需 try/Result 处理。" }
      ]
    },
                {
      "id": "error.try-catch",
      "module_id": "B09",
      "title": "try / catch / finally",
      "status": "published",
      "level": "L3",
      "objectives": [
        "掌握六语言异常捕获语法（try/catch/finally 的等价形式）",
        "理解资源释放（finally / defer / RAII）在不同语言中的表达",
        "识别捕获遗漏与过度捕获的常见错误"
      ],
      "prerequisites": [
        "error.kinds"
      ],
      "core": "异常捕获的核心语法在六语言中语义等价但形态各异：Java/C++/Python 的 try/catch（Python 用 except）、JS 的 try/catch（catch 参数可省略）、Go 无异常——用 panic/recover 模拟但工程上倾向错误值、Rust 用 Result + ? 而非异常。finally 的职责（无论成功失败都执行）在 Go 用 defer、Rust 用 Drop/RAII 表达。关键认知：捕获不是吞掉——记录、包装、或传播（rethrow）需明确选择。",
      "summary": "try/catch（Python except / Go panic-recover / Rust Result?）语义等价；finally 的职责 Go 用 defer、Rust 用 Drop 表达。",
      "comparisonDimensions": [
        "syntax-shape",
        "failure-model",
        "resource-release",
        "idiomatic-style",
        "runtime-cost"
      ],
      "variants": {
        "python": {
          "version": "3.13",
          "minimal_code": "try:\n    raise ValueError(\"x\")\nexcept ValueError as e:\n    print(\"caught\")\nfinally:\n    pass",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            },
            {
              "role": "cleanup",
              "start": 4,
              "end": 4
            }
          ],
          "syntax_notes": [
            "except 按异常类型匹配，可多分支",
            "else 子句（无异常时执行）"
          ],
          "semantic_notes": [
            "异常沿调用栈传播直到被捕获",
            "finally 保证执行（含 return 前）"
          ],
          "idioms": [
            "with 语句替代 finally 做资源释放",
            "raise ... from 链式异常"
          ],
          "pitfalls": [
            "裸 except: 吞掉所有异常（含 KeyboardInterrupt）"
          ]
        },
        "javascript": {
          "version": "ES2024",
          "minimal_code": "try {\n  throw new Error(\"x\");\n} catch (e) {\n  console.log(\"caught\");\n}",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            }
          ],
          "syntax_notes": [
            "catch 参数可省略（ES2019+）：catch { }",
            "throw 任意值（推荐 Error）"
          ],
          "semantic_notes": [
            "异步错误用 Promise.reject + .catch，try/catch 不捕获 async 外抛错（需 await 内）"
          ],
          "idioms": [
            "finally 做清理",
            "Promise.catch 处理异步异常"
          ],
          "pitfalls": [
            "try/catch 不捕获 setTimeout 回调内异常"
          ]
        },
        "java": {
          "version": "21+",
          "minimal_code": "try {\n  throw new Exception(\"x\");\n} catch (Exception e) {\n  System.out.println(\"caught\");\n} finally {\n  // 资源释放\n}",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            }
          ],
          "syntax_notes": [
            "检查型异常编译期强制捕获或声明 throws",
            "多 catch 分支按类型匹配"
          ],
          "semantic_notes": [
            "try-with-resources 自动关闭资源（AutoCloseable）",
            "finally 在 return 前执行"
          ],
          "idioms": [
            "try-with-resources 替代 finally 关流",
            "catch 后 rethrow 保持调用栈"
          ],
          "pitfalls": [
            "吞异常不记录（空 catch）",
            "finally 里 return 覆盖 try 返回值"
          ]
        },
        "cpp": {
          "version": "C++20",
          "minimal_code": "try {\n  throw std::runtime_error(\"x\");\n} catch (const std::exception& e) {\n  std::cout << \"caught\";\n}",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            }
          ],
          "syntax_notes": [
            "按引用捕获（const std::exception&）避免切片",
            "catch(...) 捕获全部"
          ],
          "semantic_notes": [
            "RAII 析构自动释放（finally 的替代）",
            "noexcept 函数抛异常会 terminate"
          ],
          "idioms": [
            "RAII（智能指针/锁守卫）管理资源",
            "异常规范 noexcept"
          ],
          "pitfalls": [
            "按值捕获导致切片",
            "析构函数抛异常引发 terminate"
          ]
        },
        "go": {
          "version": "1.23+",
          "minimal_code": "func() {\n  defer func() { if r := recover(); r != nil { fmt.Println(\"caught\") } }()\n  panic(\"x\")\n}()",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            }
          ],
          "syntax_notes": [
            "panic 中断执行，defer 逆序执行，recover 恢复",
            "recover 只在 defer 函数内有效"
          ],
          "semantic_notes": [
            "Go 工程惯例：错误值（error）而非 panic（panic 仅用于不可恢复）",
            "defer 是 finally 的等价物"
          ],
          "idioms": [
            "defer file.Close() 保证释放",
            "错误值 if err != nil 逐层传播"
          ],
          "pitfalls": [
            "recover 不在 defer 中调用则无效",
            "defer 参数在 defer 时求值"
          ]
        },
        "rust": {
          "version": "2024 Edition",
          "minimal_code": "match std::panic::catch_unwind(|| panic!(\"x\")) {\n  Ok(_) => println!(\"no\"),\n  Err(_) => println!(\"caught\"),\n}",
          "semantic_blocks": [
            {
              "role": "call",
              "start": 1,
              "end": 3
            }
          ],
          "syntax_notes": [
            "panic! 与 catch_unwind（仅捕获 unwind）",
            "工程错误用 Result<T, E> + ? 而非 panic"
          ],
          "semantic_notes": [
            "? 操作符在 Err 时提前返回（错误传播）",
            "Drop trait 在作用域结束时释放（finally 等价）"
          ],
          "idioms": [
            "Result + ? 组合传播错误",
            "自定义错误枚举 + From 转换"
          ],
          "pitfalls": [
            "catch_unwind 不捕获 abort（release 默认）",
            "滥用 unwrap/expect 在 Err 时 panic"
          ]
        }
      },
      "errors": [
        {
          "code": "// Python\ntry:\n    risky()\nexcept:\n    pass",
          "message": "裸 except 捕获所有异常（含 KeyboardInterrupt/SystemExit），错误被静默吞掉",
          "cause": "无类型限定的 except 吞掉一切",
          "fix": "except SpecificError: 精确捕获，至少记录日志"
        },
        {
          "code": "// Go\nfunc f() { defer func() { recover() }(); panic(\"x\") }",
          "message": "recover 不在 defer 中直接调用（此处其实在 defer 内——错误示例为调用时机）",
          "cause": "recover 只在 defer 函数内有效；直接调用 panic 后的代码不会执行",
          "fix": "defer func() { if r := recover(); r != nil { /* 处理 */ } }()"
        },
        {
          "code": "// Java\nint x = 0;\ntry { x = risky(); } catch (Exception e) { } finally { return x; }",
          "message": "finally 中的 return 覆盖 try/catch 的返回值",
          "cause": "finally 在 return 前执行，其 return 优先",
          "fix": "不要在 finally 中 return；记录结果到外部变量"
        },
        {
          "code": "// Rust\nstd::panic::catch_unwind(|| panic!(\"x\"))",
          "message": "release 模式下 panic 默认 abort，catch_unwind 无法捕获",
          "cause": "catch_unwind 只捕获 unwind 型 panic",
          "fix": "工程错误用 Result 而非 panic；需捕获时配置 panic=unwind"
        }
      ],
      "exercises": [
        {
          "type": "concept",
          "question": "六语言中 finally 的职责分别由什么表达？",
          "options": [
            "Go 的 defer / Rust 的 Drop",
            "Java 的 throws / C++ 的 noexcept",
            "Python 的 raise / JS 的 throw",
            "Go 的 panic / Rust 的 unwrap"
          ],
          "answer": 0,
          "feedback": "Go 用 defer（逆序执行），Rust 用 Drop trait（作用域结束自动释放）——都是 finally 的语义等价物。"
        },
        {
          "type": "debug",
          "question": "以下哪段代码会把错误静默吞掉？",
          "options": [
            "Rust: match r { Err(e) => return Err(e), Ok(v) => v }",
            "Python: except: pass",
            "Java: catch (IOException e) { throw new RuntimeException(e) }",
            "Python: except ValueError as e: log(e)"
          ],
          "answer": 1,
          "feedback": "裸 except: pass 吞掉所有异常且无记录——最典型的错误静默。"
        },
        {
          "type": "read",
          "question": "Go 中 recover() 在什么位置才有效？",
          "options": [
            "主函数入口",
            "任何位置",
            "defer 函数内",
            "panic 之前"
          ],
          "answer": 2,
          "feedback": "recover 只在 defer 函数内调用才有效——这是 Go 恢复机制的核心约束。"
        }
      ],
      "next": [
        "error.propagation",
        "error.custom-types"
      ]
    },
    { "id": "error.propagation", "module_id": "B09", "title": "错误传播与包装", "status": "published",
      "objectives": ["让错误沿调用链向上传递", "保留错误的上下文链"],
      "prerequisites": ["error.try-catch"],
      "core": "底层出错时，若不就地处理应向上传播给能处理的层。传播时「包装」错误——附加本层上下文（哪个文件、哪个操作），形成错误链便于定位。Go 的 fmt.Errorf %w、Rust 的 ? 自动传播、Java 的异常 cause 链都是为此设计。",
      "lang_diff": "Python：raise ... from e 显式链；JS：throw new Error(msg, { cause: e })；Java：new Exception(msg, cause)；C++：重新抛出或嵌套异常；Go：fmt.Errorf(\"...: %w\", err) 包装；Rust：? 传播 + thiserror 的 #[from] 自动转换。",
      "exercises": [
        { "type": "concept", "question": "Go 中包装错误并保留原错误的写法是？", "options": ["return err", "errors.New", "fmt.Errorf(\"...: %w\",  err)", "panic"], "answer": 2, "feedback": "%w 动词包装错误，可用 errors.Is/As 检查链。" },
        { "type": "concept", "question": "Rust 中 ? 运算符对 Err 的作用是？", "options": ["忽略", "提前返回 Err 传播给调用方", "panic", "转为 None"], "answer": 1, "feedback": "? 在 Err 时 return Err(...)，自动传播错误。" }
      ]
    },
    { "id": "error.custom-types", "module_id": "B09", "title": "自定义错误类型", "status": "published",
      "objectives": ["设计领域错误类型", "让错误携带结构化信息"],
      "prerequisites": ["error.propagation", "model.record-struct-class"],
      "core": "自定义错误类型让错误可分类、可携带上下文（错误码、字段、原因），便于程序化判断与定位。原则：按错误来源/处理策略分类；实现标准错误接口（Error trait/Exception 基类）；保留底层原因。",
      "lang_diff": "Python：继承 Exception；JS：继承 Error 并设置 name/code；Java：继承 Exception/RuntimeException；C++：继承 std::exception；Go：实现 error 接口（Error() string）+ 哨兵错误/自定义结构；Rust：实现 Display + Error（thiserror 简化）或 anyhow。",
      "exercises": [
        { "type": "concept", "question": "Go 中自定义错误类型需实现的方法是？", "options": ["Error() string", "toString()", "panic()", "message()"], "answer": 0, "feedback": "实现 Error() string 即满足 error 接口。" },
        { "type": "concept", "question": "Rust 中简化自定义错误类型的常用库是？", "options": ["regex", "serde", "tokio", "thiserror / anyhow"], "answer": 3, "feedback": "thiserror 用 derive 快速定义错误，anyhow 简化应用层错误。" }
      ]
    },
    { "id": "error.assertions", "module_id": "B09", "title": "断言与防御式检查", "status": "published",
      "objectives": ["用断言捕获不可能状态", "在边界做防御式校验"],
      "prerequisites": ["error.kinds"],
      "core": "断言（assert）：验证「这里必须为真」的内部不变量，失败立即暴露 bug（开发期）。防御式检查：在公共边界校验输入合法性并给出明确错误。区别：断言针对「绝不应发生」的编程错误（可在生产关闭），防御针对「可能发生」的外部输入（必须保留）。",
      "lang_diff": "Python：assert（-O 可关闭）；JS：无内置（console.assert 或手写）；Java：assert（-ea 开启）；C++：assert/assert 宏、static_assert 编译期；Go：无 assert（显式 if + panic）；Rust：assert!/debug_assert!（debug 版）。",
      "exercises": [
        { "type": "concept", "question": "断言最适合检查什么？", "options": ["用户输入", "程序内部不可能出现的状态（不变量）", "文件格式", "网络错误"], "answer": 1, "feedback": "断言验证内部不变量；外部输入用防御式校验。" },
        { "type": "concept", "question": "Rust 中仅在 debug 构建执行的断言是？", "options": ["debug_assert!", "expect", "assert!", "panic!"], "answer": 0, "feedback": "debug_assert! 在 release 中被剥离，assert! 始终执行。" }
      ]
    },
    { "id": "error.resource-release", "module_id": "B09", "title": "资源释放与作用域", "status": "published",
      "objectives": ["保证资源在作用域结束时释放", "避免资源泄漏"],
      "prerequisites": ["error.try-catch", "error.raii-defer"],
      "core": "资源（文件、锁、连接、内存）必须确定释放。异常/提前返回最易导致泄漏。确定性释放三机制：RAII（析构自动释放）、defer（函数结束执行）、with/try-with-resources（块结束自动关闭）。手动 close 易被跳过，应避免。",
      "lang_diff": "Python：with 上下文管理器；JS：try/finally 手动；Java：try-with-resources（AutoCloseable）；C++：RAII（析构）；Go：defer；Rust：Drop trait（RAII）。",
      "exercises": [
        { "type": "concept", "question": "Python 中保证文件自动关闭的写法是？", "options": ["try/finally", "with open(...) as f:", "del f", "f = open(); f.close()"], "answer": 1, "feedback": "with 语句退出时自动调用 __exit__ 关闭文件。" },
        { "type": "concept", "question": "Go 中在函数结束时关闭资源的机制是？", "options": ["with", "defer", "析构函数", "finally"], "answer": 1, "feedback": "defer 注册函数结束时执行的清理调用。" }
      ]
    },
    { "id": "error.retry-timeout", "module_id": "B09", "title": "重试、降级与超时", "status": "published",
      "objectives": ["用重试应对瞬时故障", "用超时防止无限等待"],
      "prerequisites": ["error.propagation"],
      "core": "网络/IO 的瞬时故障可通过重试恢复：指数退避（间隔倍增）+ 抖动 + 最大次数，避免惊群。超时给每个操作设上限防止无限挂起。降级：主路径失败时提供备用结果（缓存/默认值），保证系统可用。",
      "lang_diff": "Python：tenacity/手动循环 + asyncio.wait_for；JS：AbortController 超时、Promise.race；Java：Future.get(timeout)、Resilience4j；C++：std::future::wait_for；Go：context.WithTimeout 取消与超时；Rust：tokio::time::timeout。",
      "exercises": [
        { "type": "concept", "question": "重试策略中「指数退避 + 抖动」的作用是？", "options": ["记录日志", "避免大量客户端同时重试（惊群）", "减少次数", "加快重试"], "answer": 1, "feedback": "退避倍增间隔、抖动打散时间，防止重试风暴压垮服务。" },
        { "type": "concept", "question": "Go 中给操作设置超时上限的标准方式是？", "options": ["sleep", "panic", "select default", "context.WithTimeout"], "answer": 3, "feedback": "context.WithTimeout 超时自动取消，贯穿调用链。" }
      ]
    },

    // ================= B10 模块、包与依赖 =================
    { "id": "module.namespace", "module_id": "B10", "title": "包与命名空间", "status": "published",
      "objectives": ["用命名空间组织代码避免冲突", "理解包的层级结构"],
      "prerequisites": ["module.define-import"],
      "core": "命名空间/包把相关代码组织为有名字的边界，避免全局命名冲突。包名通常反映目录结构或域名倒置（Java）。包内代码可互相访问，跨包需导入。好的包划分：高内聚低耦合、职责单一。",
      "lang_diff": "Python：包 = 目录 + __init__.py；JS：模块 = 文件（无显式包，路径即命名空间）；Java：package com.example.xxx（目录对应）；C++：namespace xxx { }；Go：package xxx（目录即包，导入路径含域名）；Rust：mod xxx（文件/目录即模块）。",
      "exercises": [
        { "type": "concept", "question": "Java 包的命名惯例是？", "options": ["域名倒置 com.example.app", "大写下划线", "驼峰", "任意"], "answer": 0, "feedback": "Java 用域名倒置保证包名全局唯一。" },
        { "type": "concept", "question": "Go 中一个目录对应？", "options": ["多个包", "一个模块", "一个类", "一个包（目录即包）"], "answer": 3, "feedback": "Go 一个目录是一个包，包名通常与目录名一致。" }
      ]
    },
    { "id": "module.public-private", "module_id": "B10", "title": "公开与私有 API", "status": "published",
      "objectives": ["控制模块的可见性边界", "设计稳定的公开接口"],
      "prerequisites": ["module.namespace", "model.encapsulation"],
      "core": "模块应只暴露最小必要接口（公开 API），隐藏内部实现（私有）。公开 API 是契约，改动需谨慎（向后兼容）；私有部分可自由重构。可见性控制让大型项目可维护——使用者只依赖稳定的公开面。",
      "lang_diff": "Python：_private 约定 + __all__ 控制导出；JS：模块内不导出即私有、export 公开；Java：public/private/package-private；C++：头文件公开声明、实现细节在 .cpp/匿名命名空间；Go：大写导出、小写包内私有、internal/ 目录限制导入；Rust：默认私有、pub 公开、pub(crate) 限定。",
      "exercises": [
        { "type": "concept", "question": "Go 中限制包只能被内部代码导入的机制是？", "options": ["build tag", "_ 前缀", "internal/ 目录", "private 目录"], "answer": 2, "feedback": "internal/ 目录下的包只能被其父目录内的代码导入。" },
        { "type": "concept", "question": "Rust 中默认的可见性是？", "options": ["公开", "私有（需 pub 才公开）", "模块级", "包级"], "answer": 1, "feedback": "Rust 项默认私有，pub 显式公开。" }
      ]
    },
    { "id": "module.relative-absolute", "module_id": "B10", "title": "相对导入与绝对导入", "status": "published",
      "objectives": ["区分相对与绝对导入路径", "避免导入路径陷阱"],
      "prerequisites": ["module.define-import", "module.namespace"],
      "core": "绝对导入：从项目根/包名开始的完整路径（import a.b.c），位置无关、可读性好；相对导入：从当前文件位置出发（./、../），适合包内引用但移动文件易断。工程惯例：优先绝对导入，包内紧密关联的模块才用相对导入。",
      "lang_diff": "Python：绝对 import pkg.mod、相对 from . import mod；JS：相对 ./mod、../mod 或绝对（配置 alias）；Java：绝对全限定名 import com.x.Y；C++：#include 相对或库路径；Go：绝对导入路径（模块路径/包）；Rust：crate:: 绝对、self::/super:: 相对。",
      "exercises": [
        { "type": "concept", "question": "Python 中 from . import utils 属于？", "options": ["动态导入", "绝对导入", "相对导入（当前包内）", "库导入"], "answer": 2, "feedback": "点号开头是相对导入，. 当前包、.. 父包。" },
        { "type": "concept", "question": "Rust 中引用当前 crate 根的绝对路径前缀是？", "options": ["./", "super::", "self::", "crate::"], "answer": 3, "feedback": "crate:: 从 crate 根开始；self:: 当前模块、super:: 父模块。" }
      ]
    },
    { "id": "module.dependency-lockfile", "module_id": "B10", "title": "依赖声明与锁文件", "status": "published",
      "objectives": ["声明第三方依赖", "用锁文件保证可复现构建"],
      "prerequisites": ["env.package-manager"],
      "core": "依赖声明文件记录项目需要哪些库及版本范围（requirements/package.json/pom.xml/go.mod/Cargo.toml）；锁文件记录解析后的精确版本与校验（lock 文件）。声明文件给人看（版本范围），锁文件给机器用（精确一致）。锁文件必须入库。",
      "lang_diff": "Python：requirements.txt/pyproject.toml + pip-tools/uv lock；JS：package.json + package-lock.json；Java：pom.xml（Maven 解析，无强制锁）；C++：vcpkg.json/Conan + 锁；Go：go.mod + go.sum；Rust：Cargo.toml + Cargo.lock。",
      "exercises": [
        { "type": "concept", "question": "锁文件是否应该提交到版本库？", "options": ["仅开发", "不应该", "应该（保证各环境依赖一致）", "仅生产"], "answer": 2, "feedback": "锁文件入库确保团队与 CI 拿到完全相同的依赖版本。" },
        { "type": "concept", "question": "Go 的依赖校验文件是？", "options": ["go.mod", "go.lock", "go.sum", "vendor/"], "answer": 2, "feedback": "go.sum 记录依赖的加密校验和，go.mod 声明依赖。" }
      ]
    },
    { "id": "module.semver", "module_id": "B10", "title": "语义化版本", "status": "published",
      "objectives": ["理解主.次.修订版本号的含义", "安全地声明版本范围"],
      "prerequisites": ["module.dependency-lockfile"],
      "core": "语义化版本 SemVer：主版本.次版本.修订号（MAJOR.MINOR.PATCH）。修订号：向后兼容的 bug 修复；次版本：向后兼容的新功能；主版本：不兼容的破坏性变更。版本范围符号：~（允许修订升级）、^（允许次版本升级）、=（精确）。",
      "lang_diff": "SemVer 是跨语言通用约定。范围语法：npm 的 ^1.2.3（<2.0.0）、~1.2.3（<1.3.0）；Go 的模块版本 v1.2.3；Rust 的 1.2（默认 ^1.2）；Maven 的版本范围 [1.0,2.0)。",
      "exercises": [
        { "type": "concept", "question": "版本号 2.0.0 → 2.1.0 表示？", "options": ["bug 修复", "向后兼容的新功能", "破坏性变更", "预发布"], "answer": 1, "feedback": "次版本号升级 = 向后兼容的新功能。" },
        { "type": "concept", "question": "npm 中 ^1.2.3 允许升级到？", "options": ["仅 1.2.3", "1.2.4 止", "1.x 最新（<2.0.0）", "2.0.0"], "answer": 2, "feedback": "^ 允许次版本与修订升级，但不跨主版本。" }
      ]
    },
    { "id": "module.registry", "module_id": "B10", "title": "本地包与远程仓库", "status": "published",
      "objectives": ["从远程仓库安装包", "发布自己的包"],
      "prerequisites": ["module.dependency-lockfile"],
      "core": "远程包仓库（registry）集中托管可复用的库：PyPI（Python）、npm（JS）、Maven Central（Java）、crates.io（Rust）、Go 模块代理。安装从仓库拉取，发布把自己打包上传。也可用私有源或本地路径引用未发布的包。",
      "lang_diff": "Python：PyPI（pip install / twine upload）；JS：npm registry；Java：Maven Central（mvn deploy）；C++：vcpkg/ConanCenter；Go：proxy.golang.org + 模块路径即仓库地址；Rust：crates.io（cargo publish）。",
      "exercises": [
        { "type": "concept", "question": "Rust 的官方包仓库是？", "options": ["Maven Central", "crates.io", "PyPI", "npm"], "answer": 1, "feedback": "crates.io 托管 Rust 的库，cargo 直接集成。" },
        { "type": "concept", "question": "Python 的第三方包安装来源默认是？", "options": ["PyPI", "apt", "GitHub", "npm"], "answer": 0, "feedback": "pip 默认从 PyPI 安装包。" }
      ]
    },
    { "id": "module.cycle", "module_id": "B10", "title": "循环依赖", "status": "published",
      "objectives": ["识别并消除循环依赖", "通过分层设计预防"],
      "prerequisites": ["module.define-import", "module.namespace"],
      "core": "循环依赖：A 依赖 B、B 又依赖 A，导致编译/加载失败或脆弱耦合。解法：提取公共部分为第三模块 C（A、B 都依赖 C）；依赖注入（运行时传入而非编译期引用）；接口隔离（A 依赖 B 的接口而非实现）。预防：按层组织（上层可依赖下层，反之不可）。",
      "lang_diff": "Go/Rust 编译器直接拒绝包循环依赖（强制解决）；Java 允许类间循环但应避免；Python/JS 运行时才暴露（部分初始化对象）；C++ 头文件循环包含需前向声明。",
      "exercises": [
        { "type": "concept", "question": "Go 遇到包循环依赖时会？", "options": ["自动解决", "忽略", "运行时警告", "编译器直接拒绝"], "answer": 3, "feedback": "Go 编译器禁止包循环依赖，强制开发者解耦。" },
        { "type": "concept", "question": "消除 A↔B 循环依赖的常用方法是？", "options": ["合并 A 和 B", "提取公共部分为模块 C，A、B 都依赖 C", "增加依赖", "用全局变量"], "answer": 1, "feedback": "提取共享部分为第三方模块是最干净的解法。" }
      ]
    },
    { "id": "module.artifact-publish", "module_id": "B10", "title": "构建产物与发布", "status": "published",
      "objectives": ["把项目打包为可分发的产物", "理解发布的版本管理"],
      "prerequisites": ["module.semver", "module.registry"],
      "core": "构建产物是交付给用户的最终形式：可执行文件（go build）、库包（wheel/jar/crate）、容器镜像。发布流程：打版本号 → 构建产物 → 生成变更记录 → 上传到仓库/制品库 → 打标签。产物应可复现（同一代码同一产物）。",
      "lang_diff": "Python：wheel/sdist（python -m build）；JS：npm pack / 打包产物 dist/；Java：mvn package 生成 JAR；C++：编译产物 + CMake install；Go：go build 静态单文件（交叉编译 GOOS/GOARCH）；Rust：cargo build --release 或 cargo package。",
      "exercises": [
        { "type": "concept", "question": "Go 交叉编译 Windows 可执行文件的环境变量是？", "options": ["TARGET", "OS=win", "GOOS=windows GOARCH=amd64", "ARCH"], "answer": 2, "feedback": "设置 GOOS/GOARCH 即可交叉编译目标平台单文件。" },
        { "type": "concept", "question": "Java 项目的标准可分发产物是？", "options": ["JAR（Java ARchive）", ".dll", ".whl", ".exe"], "answer": 0, "feedback": "Maven/Gradle 打包生成 JAR 文件分发。" }
      ]
    },

    // ================= B11 文件、数据格式与输入输出 =================
    { "id": "io.std-streams", "module_id": "B11", "title": "标准输入、输出与错误", "status": "published",
      "objectives": ["用标准流读写数据", "理解重定向与管道"],
      "prerequisites": ["runtime.program-entry"],
      "core": "程序默认有三个标准流：stdin（输入）、stdout（正常输出）、stderr（错误输出）。分离 stdout 与 stderr 让正常输出可被管道处理而错误不被吞掉。命令行组合：管道 | 把前一命令输出作后一命令输入，重定向 > >> < 读写文件。",
      "lang_diff": "Python：input()/print()（file=sys.stderr）；JS：process.stdin/console.log/console.error；Java：Scanner/System.out/System.err；C++：std::cin/cout/cerr；Go：os.Stdin/fmt.Println/fmt.Fprintln(os.Stderr)；Rust：io::stdin()/println!/eprintln!。",
      "exercises": [
        { "type": "concept", "question": "错误信息应该输出到哪个流？", "options": ["stderr", "stdout", "文件", "stdin"], "answer": 0, "feedback": "错误输出到 stderr，不污染 stdout 的管道数据。" },
        { "type": "concept", "question": "Go 中向标准错误输出的写法是？", "options": ["fmt.Println", "print(stderr)", "fmt.Fprintln(os.Stderr,  ...)", "console.error"], "answer": 2, "feedback": "fmt.Fprintln 指定目标流，os.Stderr 是标准错误。" }
      ]
    },
    { "id": "io.paths", "module_id": "B11", "title": "路径与目录操作", "status": "published",
      "objectives": ["用路径库而非字符串拼接处理路径", "遍历与操作目录"],
      "prerequisites": ["io.std-streams"],
      "core": "路径分隔符因系统而异（Windows \\ 、Unix /），手动拼接字符串易错且不可移植。应使用专门的路径库：拼接（join）、取目录/文件名、绝对化、规范化、遍历目录。永远不要用 + 拼接路径。",
      "lang_diff": "Python：pathlib.Path（/ 运算符拼接）；JS：path.join/path.resolve；Java：java.nio.file.Path/Paths/Files；C++：std::filesystem::path；Go：path/filepath（Join/Walk）；Rust：std::path::Path/PathBuf。",
      "exercises": [
        { "type": "concept", "question": "拼接路径的正确做法是？", "options": ["dir + '/' + name", "字符串 format", "硬编码 /", "用路径库的 join/Path"], "answer": 3, "feedback": "路径库自动处理分隔符与跨平台差异，字符串拼接不可移植。" },
        { "type": "concept", "question": "Go 中跨平台路径拼接的包是？", "options": ["path/filepath", "fmt", "os", "strings"], "answer": 0, "feedback": "path/filepath 提供 Join/Walk 等跨平台路径操作。" }
      ]
    },
    { "id": "io.text-binary", "module_id": "B11", "title": "文本文件与二进制文件", "status": "published",
      "objectives": ["区分文本与二进制读写", "选择正确的打开模式"],
      "prerequisites": ["io.paths", "value.string-bytes"],
      "core": "文本模式读写「字符」（自动处理编码与换行转换），二进制模式读写「原始字节」（图片、序列化数据）。用错模式会导致乱码（二进制当文本）或数据损坏（文本模式改二进制字节）。读写时明确指定编码（UTF-8）。",
      "lang_diff": "Python：open(path, 'r'/'rb')、encoding='utf-8'；JS：fs.readFileSync(path, 'utf8') 文本 / Buffer 二进制；Java：Files.readString 文本 / readAllBytes 二进制；C++：ifstream 文本 / ios::binary 二进制；Go：os.ReadFile 返回 []byte（自行解码）；Rust：fs::read_to_string 文本 / fs::read 二进制。",
      "exercises": [
        { "type": "concept", "question": "Python 中读取图片文件应使用的模式是？", "options": ["'rt'", "'r'", "'w'", "'rb'"], "answer": 3, "feedback": "图片是二进制数据，必须用 'rb' 模式避免字节被当作字符解码。" },
        { "type": "concept", "question": "Rust 中读取文本文件为 String 的函数是？", "options": ["fs::read_bytes", "fs::read_to_string", "io::read", "fs::read"], "answer": 1, "feedback": "fs::read_to_string 读文本（UTF-8），fs::read 读字节。" }
      ]
    },
    { "id": "io.streams-buffering", "module_id": "B11", "title": "流、缓冲与大文件", "status": "published",
      "objectives": ["用流式处理大文件避免内存溢出", "理解缓冲的作用"],
      "prerequisites": ["io.text-binary"],
      "core": "一次性读入整个文件对大文件会撑爆内存。流式处理：分块读取、逐行处理、处理完即丢弃——内存占用恒定。缓冲（buffering）减少系统调用次数提升吞吐；写操作需 flush 确保落盘。大文件与网络数据都应流式处理。",
      "lang_diff": "Python：for line in open(path) 逐行；JS：fs.createReadStream 流式；Java：BufferedReader.lines()；C++：std::getline 逐行；Go：bufio.Scanner 逐行；Rust：BufReader::lines()。",
      "exercises": [
        { "type": "concept", "question": "处理 10GB 日志文件的正确方式是？", "options": ["逐行流式处理", "存入数组", "read() 全量读入", "先压缩"], "answer": 0, "feedback": "逐行流式处理内存恒定，全量读入会撑爆内存。" },
        { "type": "concept", "question": "Go 中逐行读取大文件的工具是？", "options": ["io.ReadAll", "fmt.Scan", "bufio.Scanner", "os.ReadFile"], "answer": 2, "feedback": "bufio.Scanner 逐行扫描大文件，内存占用小。" }
      ]
    },
    { "id": "io.serialization", "module_id": "B11", "title": "序列化与反序列化", "status": "published",
      "objectives": ["把对象转为可存储/传输的字节", "安全地还原对象"],
      "prerequisites": ["io.formats", "model.record-struct-class"],
      "core": "序列化把内存对象转为字节流/文本以便存储或网络传输；反序列化还原。格式：JSON（可读、通用）、二进制（高效）。注意：反序列化不可信数据有安全风险（代码执行）；版本演进时保持字段兼容。语言原生序列化（pickle/Java Serializable）有安全隐患，跨语言用 JSON/Protobuf。",
      "lang_diff": "Python：json/pickle（pickle 不可信数据危险）；JS：JSON.stringify/parse；Java：Serializable（危险）/Jackson JSON；C++：第三方（nlohmann/json、Protobuf）；Go：encoding/json + struct tag；Rust：serde + derive Serialize/Deserialize。",
      "exercises": [
        { "type": "concept", "question": "Python 的 pickle 反序列化不可信数据的风险是？", "options": ["速度慢", "可执行任意代码（安全漏洞）", "格式错误", "无风险"], "answer": 1, "feedback": "pickle 反序列化可执行任意代码，绝不可用于不可信数据，应用 JSON。" },
        { "type": "concept", "question": "Rust 中序列化结构体的标准方式是？", "options": ["二进制 dump", "手写 toString", "serde + #[derive(Serialize)]", "JSON 硬编码"], "answer": 2, "feedback": "serde 生态 + derive 宏自动实现序列化。" }
      ]
    },
    { "id": "io.cli-args", "module_id": "B11", "title": "命令行参数", "status": "published",
      "objectives": ["解析命令行参数与选项", "设计友好的 CLI 接口"],
      "prerequisites": ["io.std-streams"],
      "core": "命令行参数让程序无需改代码即可配置行为：位置参数（文件路径）、选项（--verbose、-o file）、子命令（git add）。原则：参数校验+帮助信息+合理默认值。手写解析 sys.argv 仅适合最简单场景，复杂 CLI 用参数解析库。",
      "lang_diff": "Python：sys.argv（手动）/ argparse / click / typer；JS：process.argv / commander / yargs；Java：main(String[] args) / picocli；C++：main(int argc, char* argv[]) / CLI11；Go：os.Args / flag 包 / cobra；Rust：std::env::args / clap。",
      "exercises": [
        { "type": "concept", "question": "Python 中解析命令行参数的标准库是？", "options": ["argparse", "os", "sys", "getopt"], "answer": 0, "feedback": "argparse 提供声明式参数定义、类型转换与自动生成帮助。" },
        { "type": "concept", "question": "Go 解析命令行选项的内置包是？", "options": ["flag", "args", "cli", "os"], "answer": 0, "feedback": "flag 包解析 -name value 形式的命令行选项。" }
      ]
    },
    { "id": "io.config-env", "module_id": "B11", "title": "环境变量与配置文件", "status": "published",
      "objectives": ["分离配置与代码", "按环境管理配置"],
      "prerequisites": ["env.environment-vars", "io.cli-args"],
      "core": "配置不应硬编码：环境变量（容器/CI 友好）、配置文件（.env/.yaml/.toml）、命令行参数三级优先级。敏感信息（密钥）只放环境变量或密钥管理，绝不入库。按环境（dev/staging/prod）用不同配置，同一代码多环境运行。",
      "lang_diff": "Python：os.environ + python-dotenv / dynaconf；JS：process.env + dotenv / config；Java：application.properties / Spring 环境隔离；C++：std::getenv + 配置库；Go：os.Getenv + viper；Rust：std::env::var + config crate。",
      "exercises": [
        { "type": "concept", "question": "数据库密码等敏感配置应放在？", "options": ["环境变量或密钥管理（不入库）", "配置文件入库", "源码常量", "注释"], "answer": 0, "feedback": "敏感信息绝不入库，用环境变量或专用密钥管理。" },
        { "type": "concept", "question": "配置优先级一般规则是？", "options": ["硬编码最高", "随机", "命令行参数 > 环境变量 > 配置文件 > 默认值", "配置文件最高"], "answer": 2, "feedback": "越接近运行时指定优先级越高：参数 > 环境变量 > 文件 > 默认。" }
      ]
    },
    { "id": "io.temp-permissions", "module_id": "B11", "title": "临时文件与文件权限", "status": "published",
      "objectives": ["安全创建临时文件", "设置正确的文件权限"],
      "prerequisites": ["io.paths", "io.text-binary"],
      "core": "临时文件应用系统提供的安全创建（唯一名、自动清理、安全权限），避免手写路径造成冲突与符号链接攻击。文件权限（Unix rwx）控制读写执行：私密文件 0600、可执行 0755。跨平台注意权限模型差异。",
      "lang_diff": "Python：tempfile（NamedTemporaryFile/TemporaryDirectory）；JS：os.tmpdir + fs；Java：Files.createTempFile；C++：无标准（系统 API）；Go：os.CreateTemp/MkdirTemp；Rust：tempfile crate。权限：os.chmod / Files.setPosixFilePermissions。",
      "exercises": [
        { "type": "concept", "question": "创建临时文件为何要用 tempfile 库而非手写路径？", "options": ["避免命名冲突与符号链接攻击", "语法简单", "省内存", "更快"], "answer": 0, "feedback": "专用库保证唯一名、安全权限与自动清理，手写路径有安全与冲突风险。" },
        { "type": "concept", "question": "Unix 中私密配置文件（仅本人可读写）的权限应为？", "options": ["0600", "0644", "0777", "0755"], "answer": 0, "feedback": "0600 表示仅所有者可读写，适合私密配置。" }
      ]
    },
    { "id": "io.encoding-crossplatform", "module_id": "B11", "title": "编码、换行与跨平台问题", "status": "published",
      "objectives": ["处理文本编码与换行差异", "写出跨平台兼容的 IO 代码"],
      "prerequisites": ["string.encoding", "io.text-binary"],
      "core": "跨平台三大坑：编码（统一用 UTF-8，显式指定）、换行（Unix \\n vs Windows \\r\\n，文本模式自动转换、二进制不转换）、路径分隔符（用路径库）。读写文件显式声明编码，避免依赖系统默认（Windows 默认可能非 UTF-8）。",
      "lang_diff": "Python：open(..., encoding='utf-8', newline='')；JS：默认 UTF-8；Java：Files.readString(path, UTF_8)；C++：文本/二进制模式影响换行转换；Go：string 即 UTF-8、bufio 处理换行；Rust：String UTF-8、手动处理 \\r\\n。",
      "exercises": [
        { "type": "concept", "question": "Windows 与 Unix 文本文件换行符分别是？", "options": ["都 \\r", "\\n 与 \\r\\n", "都 \\n", "\\r\\n 与 \\n"], "answer": 3, "feedback": "Windows 用 \\r\\n（CRLF），Unix 用 \\n（LF）。" },
        { "type": "concept", "question": "读写文本文件时避免乱码的关键是？", "options": ["转大写", "显式指定 UTF-8 编码", "用二进制模式", "用默认编码"], "answer": 1, "feedback": "显式声明 UTF-8，避免依赖系统默认编码（Windows 常为 GBK 等）。" }
      ]
    },

    // ================= B12 泛型与类型抽象 =================
    { "id": "generic.type-params", "module_id": "B12", "title": "类型参数与约束", "status": "published",
      "objectives": ["用类型参数编写通用代码", "用约束限制类型的能力"],
      "prerequisites": ["generic.functions"],
      "core": "类型参数（T、E、K、V）让函数/类型适配多种具体类型。约束（bound/where）限定 T 必须具备的能力（可比较、可克隆、实现某接口），否则泛型体内无法调用相应操作。约束是「能力契约」，比裸泛型更安全。",
      "lang_diff": "Python：TypeVar + bound（仅类型检查）；JS：TypeScript 泛型 <T extends X>；Java：<T extends Comparable<T>>；C++：template + concept（C++20）或 SFINAE；Go：[T comparable] 或接口约束；Rust：T: Ord + Clone（trait bound）。",
      "exercises": [
        { "type": "concept", "question": "Rust 中要求泛型 T 可比较的约束写法是？", "options": ["T: Ord", "T comparable", "T extends Ord", "where T is Ord"], "answer": 0, "feedback": "T: Ord 是 trait bound，限定 T 必须实现 Ord。" },
        { "type": "concept", "question": "Java 泛型约束的正确形式是？", "options": ["T comparable", "<T: Comparable>", "<T extends Comparable<T>>", "<T implements>"], "answer": 2, "feedback": "Java 用 extends 关键字表达类型上界约束。" }
      ]
    },
    { "id": "generic.bounds", "module_id": "B12", "title": "接口 / Trait Bound", "status": "published",
      "objectives": ["用接口作为泛型约束", "组合多个约束"],
      "prerequisites": ["generic.type-params", "model.interface-trait"],
      "core": "用接口/trait 作约束，泛型代码只依赖「类型能做什么」而非「类型是什么」。可组合多个约束（T 既可比较又可克隆）。这让泛型既通用又安全——调用方传入任何满足接口的类型即可。",
      "lang_diff": "Python：Protocol 作 bound；JS：T extends Interface（TS）；Java：T extends InterfaceA & InterfaceB；C++：concept 组合（requires）；Go：接口约束 interface{ String() string }；Rust：T: TraitA + TraitB。",
      "exercises": [
        { "type": "concept", "question": "Rust 中组合多个 trait 约束的语法是？", "options": ["T: A + B", "T: A,  B", "T: (A B)", "T: A & B"], "answer": 0, "feedback": "用 + 组合多个 trait bound。" },
        { "type": "concept", "question": "Go 中要求泛型类型有 String() 方法的约束是？", "options": ["interface{ String() string }", "T.String", "comparable", "T string"], "answer": 0, "feedback": "用包含方法的接口作为类型约束。" }
      ]
    },
    { "id": "generic.inference", "module_id": "B12", "title": "泛型类型推断", "status": "published",
      "objectives": ["利用类型推断省略显式类型参数", "知道何时需显式指定"],
      "prerequisites": ["generic.type-params", "value.type-inference"],
      "core": "调用泛型函数时，编译器常能从实参推断类型参数，省去显式标注（max(1, 2) 推断 T=int）。推断失败或歧义时需显式指定（parse::<i32>()、Collections.<String>emptyList()）。推断让泛型用起来像普通函数。",
      "lang_diff": "Python：无运行时推断（仅标注）；JS：TS 自动推断；Java：菱形 <> 推断（new ArrayList<>()）；C++：模板实参推断；Go：调用时推断（部分场景需显式）；Rust：通常推断，歧义时用 turbofish ::<T>。",
      "exercises": [
        { "type": "concept", "question": "Rust 中显式指定泛型类型的语法是？", "options": ["f(int)", "f<i32>", "f::<i32>()（turbofish）", "f[i32]"], "answer": 2, "feedback": "turbofish ::<T> 在推断不足时显式指定类型参数。" },
        { "type": "concept", "question": "Java 中 new ArrayList<>() 的 <> 作用是？", "options": ["指定为 Object", "泛型通配", "菱形推断：从上下文推断类型参数", "语法错误"], "answer": 2, "feedback": "菱形语法让编译器从赋值目标推断类型参数。" }
      ]
    },
    { "id": "generic.union-optional", "module_id": "B12", "title": "联合类型、枚举与可选值", "status": "published",
      "objectives": ["用联合类型表达「多种可能之一」", "用可选类型处理缺失"],
      "prerequisites": ["generic.type-params", "value.nullability"],
      "core": "联合类型：值是几种类型之一（int | string）；带标签的枚举（sum type）：每个变体可携带数据（Rust enum、Result）。可选类型（Option/Optional）是特殊的联合：Some(值) 或 None。模式匹配让处理联合类型安全且穷尽。",
      "lang_diff": "Python：Union/Optional（int | None，3.10+）与 match；JS：TypeScript 联合类型 string | number；Java：Optional<T>、sealed + record（受限联合）；C++：std::variant/optional；Go：无联合类型（接口或显式 struct + tag）；Rust：enum（最强：变体带数据 + match 穷尽）。",
      "exercises": [
        { "type": "concept", "question": "Rust 中表达「值是 i32 或 String」的类型是？", "options": ["interface", "any", "enum 联合类型", "interface{}"], "answer": 2, "feedback": "Rust 的 enum 变体可携带不同类型数据。" },
        { "type": "concept", "question": "Java 中表示「值可能不存在」的类型是？", "options": ["Option", "Maybe", "null", "Optional<T>"], "answer": 3, "feedback": "Optional<T> 显式表达可能缺失，鼓励处理空情况。" }
      ]
    },
    { "id": "generic.variance", "module_id": "B12", "title": "协变、逆变与不变入门", "status": "published",
      "objectives": ["理解泛型子类型关系", "知道何时用 extends/super 通配"],
      "prerequisites": ["generic.type-params", "model.inheritance"],
      "core": "Cat 是 Animal 子类，那 List<Cat> 是 List<Animal> 子类吗？协变（是，只读安全）、逆变（反向，只写安全）、不变（默认，两者都不）。Java 用 ? extends（协变/读）与 ? super（逆变/写）；PECS 原则：生产者 extends、消费者 super。",
      "lang_diff": "Python：类型标注层面的 variance（mypy）；JS：TS 结构化类型自然协变；Java：? extends T（协变）、? super T（逆变）；C++：模板默认不变；Go：无泛型型变；Rust：生命周期与类型的 variance（编译器推导）。",
      "exercises": [
        { "type": "concept", "question": "Java 中 List<? extends Animal> 允许的操作是？", "options": ["修改元素", "添加 Animal", "添加 Cat", "读取为 Animal（协变，只读安全）"], "answer": 3, "feedback": "extends 协变：可读取为父类型，但不能添加（类型不确定）。" },
        { "type": "concept", "question": "PECS 原则中「消费者」应用哪种通配？", "options": ["super", "无通配", "extends", "两者都"], "answer": 0, "feedback": "Producer Extends, Consumer Super：消费数据用 super。" }
      ]
    },
    { "id": "generic.erasure", "module_id": "B12", "title": "运行时泛型与擦除", "status": "published",
      "objectives": ["理解类型擦除的含义与限制", "区分编译期与运行时泛型"],
      "prerequisites": ["generic.type-params"],
      "core": "类型擦除：泛型类型参数只存在于编译期，运行时被替换为上界或 Object（Java/JS）。后果：运行时无法 instanceof T、无法 new T()、泛型数组受限、重载不能仅靠泛型区分。编译期泛型（C++/Rust/Go）在运行时保留真实类型，无此限制。",
      "lang_diff": "Python：类型标注运行时可访问（__annotations__）但不强制；JS：TS 类型完全擦除；Java：擦除（运行时是原生类型）；C++：模板实例化保留类型；Go：泛型编译期实例化；Rust：单态化（保留类型）。",
      "exercises": [
        { "type": "concept", "question": "Java 中 new T() 不允许的原因是？", "options": ["类型擦除后运行时不知 T 的具体类型", "语法错误", "性能", "安全"], "answer": 0, "feedback": "擦除使 T 在运行时不存在，需传 Class<T> 反射创建。" },
        { "type": "concept", "question": "哪种泛型实现在运行时保留真实类型？", "options": ["TypeScript", "Java", "C++ 模板 / Rust 单态化", "Python"], "answer": 2, "feedback": "C++/Rust/Go 编译期实例化，运行时类型真实存在。" }
      ]
    },
    { "id": "generic.monomorphization", "module_id": "B12", "title": "编译期单态化", "status": "published",
      "objectives": ["理解单态化如何工作", "认识其性能优势与代码膨胀代价"],
      "prerequisites": ["generic.erasure"],
      "core": "单态化：编译器为每个用到的具体类型生成一份专门的泛型代码副本（max<i32>、max<f64> 各一份）。优势：零运行时开销、完全内联优化；代价：代码体积膨胀、编译变慢。这是 Rust/C++/Go 泛型高性能的原因。",
      "lang_diff": "C++：模板实例化（单态化）；Rust：单态化（默认，dyn Trait 则动态分派）；Go：泛型部分单态化（gcshape stenciling）；Java/Python/JS 无单态化（擦除/动态）。",
      "exercises": [
        { "type": "concept", "question": "单态化的主要性能优势是？", "options": ["省内存", "代码小", "编译快", "零运行时开销 + 可内联优化"], "answer": 3, "feedback": "为每种类型生成专门代码，无运行时类型检查开销。" },
        { "type": "concept", "question": "Rust 中放弃单态化改用动态分派的关键字是？", "options": ["virtual", "static", "dyn（trait object）", "impl"], "answer": 2, "feedback": "dyn Trait 用 trait object 做动态分派，牺牲性能换取灵活性。" }
      ]
    },
    { "id": "generic.alias-newtype", "module_id": "B12", "title": "类型别名与新类型", "status": "published",
      "objectives": ["用别名简化复杂类型", "用新类型增强类型安全"],
      "prerequisites": ["generic.type-params"],
      "core": "类型别名：给复杂类型起短名（type UserId = int），仅别名不创造新类型（可互换）。新类型（newtype）：包装现有类型形成全新类型，编译器视为不同（UserId 不能当 int 用），用零成本换取类型安全（防止把用户 ID 当订单 ID 传参）。",
      "lang_diff": "Python：TypeAlias（UserId = int，仅别名）；JS：TS type UserId = number（别名）；Java：无别名（需包装类）；C++：using/typedef 别名；Go：type UserId int（新类型，不隐式转换）；Rust：type 别名 + struct UserId(i32) 新类型（newtype 模式）。",
      "exercises": [
        { "type": "concept", "question": "Go 中 type UserId int 的效果是？", "options": ["创建接口", "仅别名可互换", "创建新类型，与 int 不隐式转换", "语法错误"], "answer": 2, "feedback": "Go 的命名类型是新类型，需显式转换，增强类型安全。" },
        { "type": "concept", "question": "Rust 的 newtype 模式（struct UserId(i32)）主要价值是？", "options": ["更快", "省内存", "零成本类型安全（防止混用语义不同的同类型值）", "序列化"], "answer": 2, "feedback": "newtype 包装让编译器区分语义不同的同类型值，零运行时开销。" }
      ]
    },
    { "id": "generic.when-not", "module_id": "B12", "title": "何时不应使用泛型", "status": "published",
      "objectives": ["识别过度抽象的信号", "在简单与通用间做权衡"],
      "prerequisites": ["generic.functions"],
      "core": "泛型不是免费的：增加理解成本、编译时间、错误信息复杂度。不该用泛型的信号：只有一两种类型用到、具体实现更直观、为「将来可能」提前抽象、约束复杂到读不懂。原则：先写具体实现，出现真实重复再抽象；简单优先。",
      "lang_diff": "通用原则。Rust 中过度泛型可用具体类型或 dyn Trait 简化；Go 社区强调「先具体后泛型」（1.18 才有泛型）；C++ 模板过度导致错误信息爆炸；Python 动态类型本就「泛型」，标注只为文档。",
      "exercises": [
        { "type": "concept", "question": "何时应该引入泛型？", "options": ["为了显得高级", "出现真实的跨类型重复后", "性能需要", "一开始就泛型"], "answer": 1, "feedback": "先写具体实现，真实重复出现再抽象，避免过度设计。" },
        { "type": "concept", "question": "泛型的主要代价不包括？", "options": ["错误信息复杂", "运行时必然更快", "理解成本", "编译时间"], "answer": 1, "feedback": "泛型不保证更快；代价是复杂度、编译时间与可读性。" }
      ]
    },

    // ================= B13 并发、异步与协作任务 =================
    { "id": "concurrency.models", "module_id": "B13", "title": "进程、线程与协程/任务", "status": "published",
      "objectives": ["区分三种并发单元", "按场景选择并发模型"],
      "prerequisites": ["runtime.compile-interpret"],
      "core": "进程：独立内存空间，隔离安全但开销大、通信靠 IPC；线程：共享内存，开销较小、通信方便但有数据竞争风险；协程/任务：用户态轻量调度，一个线程跑成千上万个，适合 IO 密集。选择：CPU 密集用进程/线程，IO 密集用协程/异步。",
      "lang_diff": "Python：multiprocessing（绕 GIL）、threading、asyncio；JS：单线程事件循环 + Web Worker/Worker Threads；Java：Thread + 虚拟线程（21+）；C++：std::thread/process；Go：goroutine（轻量，栈可增长）；Rust：std::thread + tokio 任务。",
      "exercises": [
        { "type": "concept", "question": "IO 密集型任务最适合的并发模型是？", "options": ["单线程", "加锁线程", "协程/异步任务", "多进程"], "answer": 2, "feedback": "IO 等待时协程让出执行，单线程即可高效并发。" },
        { "type": "concept", "question": "Python 中绕过 GIL 利用多核的方式是？", "options": ["asyncio", "multiprocessing", "单线程", "threading"], "answer": 1, "feedback": "GIL 限制线程并行，multiprocessing 用多进程利用多核。" }
      ]
    },
    { "id": "concurrency.sync-async", "module_id": "B13", "title": "同步与异步", "status": "published",
      "objectives": ["区分同步与异步执行模型", "理解事件循环的作用"],
      "prerequisites": ["concurrency.models"],
      "core": "同步：调用发起后阻塞等待结果，简单但 IO 时线程空转；异步：发起后立即返回「未来的结果」（Promise/Future），IO 完成时通过事件循环回调，单线程可并发数千 IO。异步不加速单个操作，但大幅提升 IO 并发吞吐。",
      "lang_diff": "Python：async/await + asyncio 事件循环；JS：Promise + 事件循环（天然异步）；Java：CompletableFuture / 虚拟线程；C++：std::async/future；Go：goroutine（同步写法、异步调度）；Rust：async/await + tokio 运行时。",
      "exercises": [
        { "type": "concept", "question": "异步编程的主要优势是？", "options": ["单个操作更快", "无回调", "代码简单", "IO 等待时不阻塞，单线程高并发"], "answer": 3, "feedback": "异步让线程在 IO 等待时处理其他任务，提升并发吞吐。" },
        { "type": "concept", "question": "JS 中表示「未来的结果」的对象是？", "options": ["Promise", "Callback", "Thread", "Event"], "answer": 0, "feedback": "Promise 代表异步操作的最终结果，配合 async/await 使用。" }
      ]
    },
    { "id": "concurrency.shared-message", "module_id": "B13", "title": "共享状态与消息传递", "status": "published",
      "objectives": ["对比共享内存与消息传递", "用消息传递避免数据竞争"],
      "prerequisites": ["concurrency.spawn-await"],
      "core": "并发通信两路线：共享状态（多任务读写同一内存，需锁保护，易出竞争）与消息传递（通过 channel/队列发送数据，无共享即可变状态，天然安全）。Go 哲学「不要通过共享内存通信，要通过通信共享内存」倡导后者。",
      "lang_diff": "Python：queue.Queue（消息）/ 共享变量 + Lock；JS：单线程无共享问题、Worker 用 postMessage；Java：BlockingQueue / 共享 + synchronized；C++：mutex 保护共享 / 无内置 channel；Go：channel（消息传递首选）；Rust：mpsc channel / Arc<Mutex> 共享。",
      "exercises": [
        { "type": "concept", "question": "Go 倡导的并发通信方式是？", "options": ["文件", "共享内存 + 锁", "channel 消息传递", "全局变量"], "answer": 2, "feedback": "「通过通信共享内存」：用 channel 传递数据避免共享可变状态。" },
        { "type": "concept", "question": "Rust 中多线程安全共享可变状态的标准类型是？", "options": ["Arc<Mutex<T>>", "Rc<RefCell>", "&mut T", "Box<T>"], "answer": 0, "feedback": "Arc 原子引用计数共享所有权，Mutex 提供互斥访问。" }
      ]
    },
    { "id": "concurrency.locks", "module_id": "B13", "title": "锁、原子操作与条件变量", "status": "published",
      "objectives": ["用互斥锁保护临界区", "理解原子操作与条件变量"],
      "prerequisites": ["concurrency.shared-message"],
      "core": "互斥锁（mutex）：同一时刻只允许一个任务进入临界区，保护共享数据。原子操作：无锁的不可分割操作（计数器增减），比锁轻量。条件变量：等待某条件成立的协调机制。原则：锁粒度尽量小、持锁时间尽量短、避免嵌套锁（死锁）。",
      "lang_diff": "Python：threading.Lock/RLock；JS：单线程无需锁（Worker 间 Atomics）；Java：synchronized/ReentrantLock/AtomicInteger；C++：std::mutex/atomic/condition_variable + lock_guard；Go：sync.Mutex/atomic；Rust：Mutex/AtomicI32（配合 RAII 自动解锁）。",
      "exercises": [
        { "type": "concept", "question": "保护共享计数器最简单且无锁的方式是？", "options": ["原子操作（atomic increment）", "加互斥锁", "channel", "条件变量"], "answer": 0, "feedback": "原子操作对简单计数比互斥锁更轻量高效。" },
        { "type": "concept", "question": "C++ 中确保锁自动释放的惯用类型是？", "options": ["std::lock_guard（RAII）", "原子变量", "递归锁", "手动 unlock"], "answer": 0, "feedback": "lock_guard 构造加锁、析构解锁，异常安全。" }
      ]
    },
    { "id": "concurrency.future-promise", "module_id": "B13", "title": "Future / Promise", "status": "published",
      "objectives": ["用 Future 表示异步结果", "组合多个异步操作"],
      "prerequisites": ["concurrency.sync-async"],
      "core": "Future/Promise 是「将来可得的结果」的占位符：创建时未完成，完成后可读值或错误。支持组合：并行（all/join）、串行（then/and_then）、竞速（race/select）。它把回调地狱变成可链式组合的异步管线。",
      "lang_diff": "Python：asyncio.Task/Future + gather；JS：Promise + all/then/allSettled；Java：CompletableFuture + allOf/thenApply；C++：std::future + std::async；Go：无原生（channel + WaitGroup 实现）；Rust：Future trait + join!/select!。",
      "exercises": [
        { "type": "concept", "question": "JS 中并行等待多个 Promise 的方法是？", "options": ["await 逐个", "Promise.all", "Promise.race", "Promise.then"], "answer": 1, "feedback": "Promise.all 并行执行并等待全部完成；race 取最快。" },
        { "type": "concept", "question": "Rust 中并发等待多个 future 的宏是？", "options": ["select!（取首个）", "join!", "await", "spawn"], "answer": 1, "feedback": "join! 并发执行并等待全部；select! 取最先完成者。" }
      ]
    },
    { "id": "concurrency.cancel-timeout", "module_id": "B13", "title": "取消、超时与上下文", "status": "published",
      "objectives": ["给异步操作设置超时", "传播取消信号"],
      "prerequisites": ["concurrency.future-promise", "error.retry-timeout"],
      "core": "异步操作必须可取消、可超时，否则泄漏资源（goroutine 悬挂、连接占用）。上下文（context）携带截止时间/取消信号沿调用链传播，一层取消、全链停止。超时是防御性编程的基本功。",
      "lang_diff": "Python：asyncio.wait_for / 任务 cancel()；JS：AbortController + signal；Java：Future.get(timeout)/cancel；C++：std::future::wait_for；Go：context.WithTimeout/WithCancel（标准）；Rust：tokio::time::timeout、CancellationToken。",
      "exercises": [
        { "type": "concept", "question": "Go 中传递取消与截止时间的标准类型是？", "options": ["sync.Mutex", "channel", "context.Context", "time.Timer"], "answer": 2, "feedback": "context 沿调用链传播取消信号与截止时间。" },
        { "type": "concept", "question": "JS 中取消 fetch 请求的机制是？", "options": ["Promise.cancel", "return", "clearTimeout", "AbortController"], "answer": 3, "feedback": "AbortController 的 signal 传入 fetch，abort() 触发取消。" }
      ]
    },
    { "id": "concurrency.races-deadlock", "module_id": "B13", "title": "数据竞争、死锁与活锁", "status": "published",
      "objectives": ["识别数据竞争", "预防死锁与活锁"],
      "prerequisites": ["concurrency.locks", "concurrency.shared-message"],
      "core": "数据竞争：多任务并发访问同一数据且至少一个写、无同步，结果不确定（UB）。死锁：多任务互相持有对方需要的锁，全部卡住。活锁：不断重试但无法推进。预防：固定加锁顺序、锁粒度最小、优先消息传递/不可变数据。",
      "lang_diff": "检测：Go -race 竞态检测器、Rust 编译期 Send/Sync 静态阻止、TSan（C++）。Python 因 GIL 竞争较少但仍有；Java 有 synchronized 与 jstack 诊断死锁。",
      "exercises": [
        { "type": "concept", "question": "预防死锁的经典方法是？", "options": ["固定全局加锁顺序", "忽略", "无限重试", "加更多锁"], "answer": 0, "feedback": "所有线程按相同顺序获取锁，消除循环等待。" },
        { "type": "concept", "question": "哪个语言在编译期静态防止数据竞争？", "options": ["Rust", "C++", "Java", "Python"], "answer": 0, "feedback": "Rust 的 Send/Sync 与借用检查在编译期阻止数据竞争。" }
      ]
    },
    { "id": "concurrency.immutability", "module_id": "B13", "title": "线程安全与不可变数据", "status": "published",
      "objectives": ["用不可变数据实现线程安全", "理解为何不可变天然并发友好"],
      "prerequisites": ["value.mutability", "concurrency.races-deadlock"],
      "core": "不可变数据创建后不改，多任务读取无需任何同步——天然线程安全。需要「修改」时创建新值（持久化数据结构）或用写时复制。这是函数式并发与 Rust 安全并发的思想基础：优先不可变，共享可变状态才需同步。",
      "lang_diff": "Python：tuple/frozenset 不可变可安全共享；JS：原始值不可变、Object.freeze；Java：record/不可变集合；C++：const 数据可安全共享；Go：值语义复制传递；Rust：&T 共享只读、&mut T 独占（编译期强制）。",
      "exercises": [
        { "type": "concept", "question": "不可变数据在并发中的核心价值是？", "options": ["易序列化", "省内存", "更快", "读取无需加锁，天然线程安全"], "answer": 3, "feedback": "不可变数据无写竞争，任意多任务可安全并发读取。" },
        { "type": "concept", "question": "Rust 中允许多个只读引用但排斥可变引用的规则是？", "options": ["无限制", "多个 &T 或唯一 &mut T（不可共存）", "只能一个引用", "任意共享"], "answer": 1, "feedback": "借用规则：共享只读或独占可变，编译期防止数据竞争。" }
      ]
    },

    // ================= B14 网络与 API 基础 =================
    { "id": "net.tcp-ip", "module_id": "B14", "title": "IP、端口与客户端/服务端", "status": "published",
      "objectives": ["理解客户端/服务端模型", "认识 IP、端口与套接字"],
      "prerequisites": ["concurrency.models"],
      "core": "网络通信基于客户端/服务端模型：服务端监听端口等待连接，客户端主动发起。IP 定位主机、端口定位进程（0-65535，知名服务 <1024）。TCP 提供可靠的面向连接字节流，HTTP 等协议建立在 TCP 之上。localhost（127.0.0.1）指本机。",
      "lang_diff": "Python：socket / requests（客户端）、Flask/FastAPI（服务端）；JS：fetch / Node http 或 Express；Java：HttpClient / Spring；C++：socket / Boost.Asio；Go：net / net/http（标准库完整）；Rust：reqwest / tokio + axum。",
      "exercises": [
        { "type": "concept", "question": "127.0.0.1 表示？", "options": ["公网", "广播", "本机回环地址（localhost）", "网关"], "answer": 2, "feedback": "127.0.0.1 是本机回环地址，用于本机测试服务。" },
        { "type": "concept", "question": "HTTP 服务默认端口是？", "options": ["21", "80", "443", "8080"], "answer": 1, "feedback": "HTTP 默认 80，HTTPS 默认 443。" }
      ]
    },
    { "id": "net.http-methods", "module_id": "B14", "title": "GET / POST / PUT / DELETE", "status": "published",
      "objectives": ["按语义选择 HTTP 方法", "理解幂等性"],
      "prerequisites": ["net.tcp-ip", "net.http"],
      "core": "HTTP 方法表达操作语义：GET 读取（安全、幂等）、POST 创建/提交（非幂等）、PUT 整体替换（幂等）、PATCH 部分修改、DELETE 删除（幂等）。幂等：重复执行结果相同。选对方法让 API 语义清晰、可被缓存与安全重试。",
      "lang_diff": "方法语义与语言无关。客户端调用：requests.get/post、fetch(url, {method})、http.Get/Post、reqwest::get/post。服务端按方法路由。",
      "exercises": [
        { "type": "concept", "question": "创建资源应该用哪个 HTTP 方法？", "options": ["PUT", "GET", "DELETE", "POST"], "answer": 3, "feedback": "POST 用于创建/提交；GET 只读、PUT 替换、DELETE 删除。" },
        { "type": "concept", "question": "「幂等」的含义是？", "options": ["重复执行结果相同", "安全加密", "更快", "无状态"], "answer": 0, "feedback": "幂等操作重复执行副作用相同，可安全重试。" }
      ]
    },
    { "id": "net.status-codes", "module_id": "B14", "title": "状态码与错误处理", "status": "published",
      "objectives": ["按状态码判断请求结果", "正确处理 4xx 与 5xx"],
      "prerequisites": ["net.http-methods"],
      "core": "HTTP 状态码分五类：2xx 成功（200 OK、201 Created、204 No Content）、3xx 重定向（301/302/304）、4xx 客户端错误（400 参数错、401 未认证、403 无权限、404 不存在、429 限流）、5xx 服务端错误（500/502/503）。客户端应检查状态码而非假设成功。",
      "lang_diff": "Python：resp.status_code 判断（requests 不自动抛错，用 raise_for_status()）；JS：fetch 不抛 4xx/5xx，需检查 resp.ok；Java：HttpResponse.statusCode()；Go：resp.StatusCode；Rust：resp.status()。共同点：4xx/5xx 不自动抛异常，需显式检查。",
      "exercises": [
        { "type": "concept", "question": "HTTP 404 表示？", "options": ["资源不存在", "未认证", "限流", "服务器错误"], "answer": 0, "feedback": "404 Not Found：请求的资源不存在。" },
        { "type": "concept", "question": "JS fetch 对 404 响应会？", "options": ["抛异常", "自动 reject", "正常 resolve（需检查 resp.ok）", "重试"], "answer": 2, "feedback": "fetch 只在网络错误时 reject，HTTP 错误码需手动检查 resp.ok。" }
      ]
    },
    { "id": "net.headers-body", "module_id": "B14", "title": "请求头、查询参数与请求体", "status": "published",
      "objectives": ["组织 HTTP 请求的各部分", "用头传递元信息"],
      "prerequisites": ["net.http-methods"],
      "core": "请求组成：请求行（方法+路径）、头（元信息：Content-Type 数据格式、Authorization 认证、Accept 期望格式）、查询参数（?key=value 过滤/分页）、请求体（POST/PUT 的数据）。GET 无请求体，数据放查询参数；POST/PUT 数据放请求体。",
      "lang_diff": "Python：requests.get(url, params={}, headers={}, json=data)；JS：fetch(url, {headers, body, method})；Java：HttpRequest.header/uri；Go：req.Header.Set/url.Values；Rust：reqwest Client .header().query().json()。",
      "exercises": [
        { "type": "concept", "question": "传递认证令牌通常放在哪个请求头？", "options": ["Accept", "Cookie", "Authorization", "Content-Type"], "answer": 2, "feedback": "Authorization: Bearer <token> 传递认证凭证。" },
        { "type": "concept", "question": "POST 提交 JSON 数据应设置的请求头是？", "options": ["Accept: json", "X-Data: json", "Content-Type: application/json", "Cookie"], "answer": 2, "feedback": "Content-Type 声明请求体的数据格式。" }
      ]
    },
    { "id": "net.json-api", "module_id": "B14", "title": "JSON API", "status": "published",
      "objectives": ["用 JSON 交换结构化数据", "解析与构造 API 请求响应"],
      "prerequisites": ["net.headers-body", "io.formats"],
      "core": "JSON 是 Web API 的事实标准数据格式：请求体发 JSON、响应体收 JSON。客户端：序列化对象发送、解析响应 JSON 为对象。要点：设置 Content-Type: application/json、处理嵌套结构、容错非法 JSON。",
      "lang_diff": "Python：requests 的 json= 参数与 resp.json()；JS：fetch + JSON.stringify / resp.json()；Java：HttpClient + Jackson/Gson；Go：json.Marshal/NewDecoder(resp.Body).Decode；Rust：reqwest 的 .json() 与 serde。",
      "exercises": [
        { "type": "concept", "question": "Python requests 发送 JSON 数据的便捷参数是？", "options": ["data=", "body=", "json=", "params="], "answer": 2, "feedback": "json= 自动序列化并设置 Content-Type。" },
        { "type": "concept", "question": "Go 中解析响应 JSON 到结构体的方式是？", "options": ["unmarshal", "json.Parse", "resp.json()", "json.NewDecoder(body).Decode(&v)"], "answer": 3, "feedback": "json.NewDecoder 流式解码响应体到结构体。" }
      ]
    },
    { "id": "net.http-client", "module_id": "B14", "title": "同步与异步 HTTP 客户端", "status": "published",
      "objectives": ["发起 HTTP 请求", "在并发场景选择异步客户端"],
      "prerequisites": ["net.json-api", "concurrency.sync-async"],
      "core": "HTTP 客户端发起请求并处理响应。同步客户端：简单直接，IO 时阻塞当前线程；异步客户端：IO 等待时让出，单线程可并发数百请求。高频并发抓取/微服务调用应用异步客户端 + 连接复用（连接池）。",
      "lang_diff": "Python：requests（同步）/ httpx、aiohttp（异步）；JS：fetch（天然异步）/ axios；Java：HttpClient（同步 + async 版）；C++：libcurl / cpp-httplib；Go：net/http（并发靠 goroutine）；Rust：reqwest（异步 + blocking 版）。",
      "exercises": [
        { "type": "concept", "question": "需要同时发起数百个 HTTP 请求时应选择？", "options": ["异步客户端 + 连接池", "同步客户端循环", "多进程", "串行逐个"], "answer": 0, "feedback": "异步客户端 IO 等待时让出，单线程即可高并发。" },
        { "type": "concept", "question": "Python 中支持异步的 HTTP 客户端是？", "options": ["socket", "urllib", "requests", "httpx / aiohttp"], "answer": 3, "feedback": "httpx 与 aiohttp 支持 async/await 异步请求。" }
      ]
    },
    { "id": "net.rest", "module_id": "B14", "title": "REST 的基本约束", "status": "published",
      "objectives": ["按 REST 风格设计 API", "用资源与标准方法建模"],
      "prerequisites": ["net.http-methods", "net.status-codes"],
      "core": "REST 用「资源」建模：URL 表示资源（/users/42 而非 /getUser?id=42），HTTP 方法表达操作（GET 读、POST 建、PUT 改、DELETE 删），状态码表达结果。无状态：每个请求自包含。好处：语义统一、可缓存、易理解。",
      "lang_diff": "REST 是架构风格与语言无关。实现框架：FastAPI/Flask（Python）、Express/NestJS（JS）、Spring Boot（Java）、Gin/net-http（Go）、Axum/Actix（Rust）。",
      "exercises": [
        { "type": "concept", "question": "RESTful 风格的「获取用户 42」URL 是？", "options": ["/api?id=42", "/getUser?id=42", "/user/get/42", "/users/42"], "answer": 3, "feedback": "资源用名词复数路径表示，ID 作为路径段，方法表达操作。" },
        { "type": "concept", "question": "REST 中「无状态」指？", "options": ["无响应", "无认证", "不存数据", "每个请求自包含，服务端不保存会话上下文"], "answer": 3, "feedback": "无状态：请求包含全部所需信息，不依赖服务端会话。" }
      ]
    },
    { "id": "net.websocket", "module_id": "B14", "title": "WebSocket 概念", "status": "published",
      "objectives": ["理解 WebSocket 与 HTTP 的区别", "知道实时双向通信的场景"],
      "prerequisites": ["net.tcp-ip", "concurrency.sync-async"],
      "core": "WebSocket 在单个 TCP 连接上提供全双工（双向）持久通信：连接建立后客户端与服务端可随时互发消息，无需反复建连。适合实时场景：聊天、协同编辑、实时推送、游戏。与 HTTP 的请求-响应模式互补。",
      "lang_diff": "Python：websockets 库；JS：浏览器 WebSocket API / ws（Node）；Java：JSR-356 / Spring WebSocket；C++：Boost.Beast；Go：gorilla/websocket；Rust：tokio-tungstenite。",
      "exercises": [
        { "type": "concept", "question": "WebSocket 相比 HTTP 轮询的核心优势是？", "options": ["无需连接", "服务端可主动推送，全双工低延迟", "更简单", "更安全"], "answer": 1, "feedback": "WebSocket 持久连接双向通信，服务端可主动推送，避免轮询开销。" },
        { "type": "concept", "question": "实时聊天应用最适合用？", "options": ["SMTP", "WebSocket", "FTP", "HTTP GET 轮询"], "answer": 1, "feedback": "WebSocket 全双工低延迟，适合实时消息。" }
      ]
    },
    { "id": "net.auth", "module_id": "B14", "title": "认证令牌与敏感信息", "status": "published",
      "objectives": ["用令牌认证 API 请求", "安全处理凭证"],
      "prerequisites": ["net.headers-body", "env.environment-vars"],
      "core": "API 认证常用令牌（token）：客户端在请求头携带 Authorization: Bearer <token>。要点：令牌放环境变量而非硬编码；用 HTTPS 防止窃听；令牌有有效期需刷新；最小权限原则（只授予需要的权限）。",
      "lang_diff": "Python：os.environ 读令牌 + headers 传递；JS：process.env + fetch headers；Java：环境变量 + HttpRequest header；Go：os.Getenv + Header.Set；Rust：env::var + .bearer_auth()。HTTPS 是所有语言的必备前提。",
      "exercises": [
        { "type": "concept", "question": "API 令牌应该存放在？", "options": ["注释", "环境变量或密钥管理", "README", "源码硬编码"], "answer": 1, "feedback": "凭证绝不入库，用环境变量或密钥管理服务。" },
        { "type": "concept", "question": "传递 Bearer 令牌的请求头是？", "options": ["Authorization", "Accept", "Content-Type", "X-Token"], "answer": 0, "feedback": "Authorization: Bearer <token> 是标准认证头。" }
      ]
    },
    { "id": "net.timeout-retry", "module_id": "B14", "title": "超时、重试与幂等", "status": "published",
      "objectives": ["给网络请求设置超时", "安全地重试幂等请求"],
      "prerequisites": ["error.retry-timeout", "net.http-methods"],
      "core": "网络请求必须设超时（连接/读取），否则故障时无限挂起。重试只适用于幂等请求（GET/PUT/DELETE 安全重试，POST 可能重复创建需幂等键）。策略：指数退避 + 抖动 + 最大次数 + 熔断。",
      "lang_diff": "Python：requests timeout= 参数、tenacity 重试；JS：AbortController 超时、fetch-retry；Java：HttpClient connectTimeout；Go：http.Client{Timeout}、context 超时；Rust：reqwest timeout()、tower retry。",
      "exercises": [
        { "type": "concept", "question": "为什么 POST 请求重试需要谨慎？", "options": ["POST 非幂等，重试可能重复创建资源", "会崩溃", "太慢", "不允许"], "answer": 0, "feedback": "POST 非幂等，重复提交可能产生重复数据，需幂等键或服务端去重。" },
        { "type": "concept", "question": "网络请求不设超时的后果是？", "options": ["无影响", "故障时无限挂起耗尽资源", "更安全", "更快"], "answer": 1, "feedback": "无超时在网络故障时会永久阻塞，耗尽连接与线程。" }
      ]
    },

    // ================= B15 测试、调试与可观测性 =================
    { "id": "test.assertions", "module_id": "B15", "title": "断言与测试用例设计", "status": "published",
      "objectives": ["写出有效的断言", "设计覆盖关键路径的用例"],
      "prerequisites": ["test.structure"],
      "core": "断言验证「实际输出 == 预期输出」。好用例：一个测试只验一件事、覆盖正常/边界/异常三类路径、用具体值而非模糊断言（assert result 不如 assert result == 42）。断言失败信息应能定位问题。",
      "lang_diff": "Python：assert expr（pytest 自动展开）；JS：expect(x).toBe(y)/toEqual；Java：assertEquals/assertTrue；C++：EXPECT_EQ/ASSERT_TRUE；Go：if got != want { t.Errorf }；Rust：assert_eq!/assert!。",
      "exercises": [
        { "type": "concept", "question": "Rust 中比较两个值相等的断言宏是？", "options": ["assert!", "expect!", "assert_eq!", "check!"], "answer": 2, "feedback": "assert_eq!(a, b) 比较相等并输出差异。" },
        { "type": "concept", "question": "好的测试断言应该？", "options": ["只测正常路径", "用具体预期值验证（== 42）", "assert result 非空", "一个测试验多件事"], "answer": 1, "feedback": "具体断言能精确定位问题，模糊断言掩盖错误。" }
      ]
    },
    { "id": "test.boundary", "module_id": "B15", "title": "边界值与异常路径", "status": "published",
      "objectives": ["针对边界值设计用例", "覆盖异常路径"],
      "prerequisites": ["test.assertions"],
      "core": "bug 最爱藏在边界：空输入、0、1、最大值、负值、空集合、单元素。异常路径：非法输入、资源缺失、超时、并发竞争。设计用例时问自己：边界值测了吗？失败路径测了吗？只测「快乐路径」的测试等于没测。",
      "lang_diff": "边界与异常用例设计是通用方法。异常断言：pytest.raises、JS expect().toThrow、Java assertThrows、Go 检查 err != nil、Rust #[should_panic]。",
      "exercises": [
        { "type": "concept", "question": "测试 divide 函数最应覆盖的边界是？", "options": ["除数为 0", "10/2", "100/10", "1/1"], "answer": 0, "feedback": "除零是关键边界，必须验证异常路径。" },
        { "type": "concept", "question": "Python 中验证函数抛出异常的写法是？", "options": ["with pytest.raises(ValueError):", "expect throw", "try/except", "assert raises"], "answer": 0, "feedback": "pytest.raises 上下文验证抛出指定异常。" }
      ]
    },
    { "id": "test.parametrized", "module_id": "B15", "title": "参数化测试", "status": "published",
      "objectives": ["用参数化消除重复测试", "用数据驱动覆盖多用例"],
      "prerequisites": ["test.assertions", "test.boundary"],
      "core": "参数化测试：把「测试逻辑」与「测试数据」分离——同一逻辑跑多组输入/预期，避免复制粘贴。新增用例只需加一行数据。表驱动测试（Go）是其极致体现：用例定义为数据表，循环执行。",
      "lang_diff": "Python：@pytest.mark.parametrize；JS：test.each / describe.each；Java：@ParameterizedTest + @ValueSource/@CsvSource；C++：GoogleTest 值参数化；Go：表驱动测试（[]struct 切片 + t.Run）；Rust：循环 + 用例向量（无内置参数化宏）。",
      "exercises": [
        { "type": "concept", "question": "Go 中实现参数化测试的惯用方式是？", "options": ["表驱动测试（用例切片 + t.Run）", "宏", "反射", "@parametrize"], "answer": 0, "feedback": "Go 用结构体切片定义用例，t.Run 逐个执行子测试。" },
        { "type": "concept", "question": "Python 中跑多组输入的 pytest 装饰器是？", "options": ["@data", "@test", "@pytest.mark.parametrize", "@fixture"], "answer": 2, "feedback": "@pytest.mark.parametrize 用一组参数多次运行同一测试。" }
      ]
    },
    { "id": "test.fixtures", "module_id": "B15", "title": "测试夹具 Fixture", "status": "published",
      "objectives": ["用夹具准备测试环境", "保证测试隔离与可重复"],
      "prerequisites": ["test.structure", "test.parametrized"],
      "core": "夹具（fixture）为测试准备前置状态（临时文件、数据库、对象）并在测试后清理（teardown）。要点：每个测试用独立夹具（不共享可变状态）、资源用后必清理、用临时目录/内存数据库避免污染。setup/teardown 或依赖注入式夹具。",
      "lang_diff": "Python：pytest fixture（@pytest.fixture + tmp_path）；JS：beforeEach/afterEach；Java：@BeforeEach/@AfterEach/@TempDir；C++：TEST_F 夹具类 SetUp/TearDown；Go：测试内手动准备/cleanup；Rust：测试函数内构造 + Drop 清理。",
      "exercises": [
        { "type": "concept", "question": "Python pytest 中提供临时目录的内置夹具是？", "options": ["tempdir", "temp_dir", "tmp_file", "tmp_path"], "answer": 3, "feedback": "tmp_path 为每个测试提供独立临时目录，自动清理。" },
        { "type": "concept", "question": "测试夹具的核心原则是？", "options": ["共享状态提速", "只读不写", "每测试独立环境、用完清理，保证隔离可重复", "越少越好"], "answer": 2, "feedback": "隔离的夹具避免测试间相互污染，保证可重复。" }
      ]
    },
    { "id": "test.mocks", "module_id": "B15", "title": "Mock / Stub / Fake", "status": "published",
      "objectives": ["用测试替身隔离外部依赖", "区分三种替身的用途"],
      "prerequisites": ["test.fixtures"],
      "core": "测试替身替代真实外部依赖（网络、数据库、时钟）：Stub 返回固定答案；Mock 验证「是否被以某方式调用」；Fake 提供可用的简化实现（内存数据库）。要点：只 mock 自己拥有的边界；优先用依赖注入便于替换；避免过度 mock 导致测的是 mock 而非逻辑。",
      "lang_diff": "Python：unittest.mock（Mock/patch）；JS：vi.fn()/jest.mock；Java：Mockito；C++：GoogleMock；Go：接口注入 + 手写 fake；Rust：trait 注入 + mockall。",
      "exercises": [
        { "type": "concept", "question": "验证「保存方法被调用了 1 次」应该用哪种替身？", "options": ["Mock", "Stub", "Fake", "真实对象"], "answer": 0, "feedback": "Mock 验证交互（调用次数/参数）；Stub 只提供固定返回。" },
        { "type": "concept", "question": "Go 中便于测试替换外部依赖的设计是？", "options": ["全局变量", "接口依赖注入", "硬编码", "反射"], "answer": 1, "feedback": "依赖接口而非具体实现，测试时注入 fake 实现。" }
      ]
    },
    { "id": "test.integration", "module_id": "B15", "title": "集成测试与端到端测试", "status": "published",
      "objectives": ["区分单元/集成/端到端测试", "设计合理的测试金字塔"],
      "prerequisites": ["test.mocks", "test.fixtures"],
      "core": "测试金字塔：大量单元测试（快、隔离）+ 适量集成测试（验证模块间协作，如真实数据库）+ 少量端到端测试（完整流程，如浏览器自动化）。集成测试验证「零件装在一起能工作」，端到端验证「用户视角的功能」。越往上越慢越脆，数量应递减。",
      "lang_diff": "Python：pytest（单元）+ requests/Playwright（E2E）；JS：vitest + supertest（API）+ Playwright；Java：JUnit + Spring Test + REST Assured；C++：GoogleTest 各层；Go：testing + httptest；Rust：单元（#[test]）+ tests/ 目录集成测试。",
      "exercises": [
        { "type": "concept", "question": "Rust 中集成测试文件应放在哪个目录？", "options": ["test/", "integration/", "src/", "tests/"], "answer": 3, "feedback": "tests/ 目录下的文件被 cargo test 作为集成测试编译运行。" },
        { "type": "concept", "question": "测试金字塔中数量最多的应该是？", "options": ["集成测试", "手动测试", "单元测试", "端到端测试"], "answer": 2, "feedback": "单元测试快且隔离，应占主体；E2E 慢而脆，应最少。" }
      ]
    },
    { "id": "test.logging", "module_id": "B15", "title": "日志级别与结构化日志", "status": "published",
      "objectives": ["按级别输出日志", "用结构化日志便于检索"],
      "prerequisites": ["io.std-streams"],
      "core": "日志级别：DEBUG（调试细节）、INFO（关键流程）、WARN（可恢复异常）、ERROR（错误需处理）。生产环境用 INFO+，排查时临时开 DEBUG。结构化日志（JSON 键值对）比纯文本更易检索与聚合。日志要有上下文（请求 ID、用户、操作），但不记敏感信息。",
      "lang_diff": "Python：logging 模块（getLogger）；JS：console / winston / pino；Java：SLF4J + Logback；C++：spdlog；Go：log/slog（结构化）；Rust：tracing / log。级别与级别过滤是通用概念。",
      "exercises": [
        { "type": "concept", "question": "生产环境默认日志级别通常是？", "options": ["ERROR", "DEBUG", "TRACE", "INFO"], "answer": 3, "feedback": "INFO 记录关键流程；DEBUG 仅排查时临时开启。" },
        { "type": "concept", "question": "Go 的官方结构化日志包是？", "options": ["log/slog", "log", "zap（第三方）", "fmt"], "answer": 0, "feedback": "log/slog 是 Go 1.21+ 官方结构化日志包。" }
      ]
    },
    { "id": "test.debugger", "module_id": "B15", "title": "断点调试与调用栈", "status": "published",
      "objectives": ["用断点与调用栈定位问题", "读堆栈追踪找根因"],
      "prerequisites": ["env.debugger", "test.logging"],
      "core": "定位 bug 两大利器：断点调试（暂停检查状态）与调用栈分析（从异常堆栈找根因）。读堆栈：从最底部（入口）到最顶部（出错点），找到「自己的代码」首次出现的位置——那通常是根因。异常信息 + 堆栈 + 断点三者结合最高效。",
      "lang_diff": "Python：pdb/traceback；JS：浏览器 DevTools / Node --inspect、Error.stack；Java：IDEA 调试器、printStackTrace；C++：gdb backtrace；Go：dlv、runtime.Stack；Rust：RUST_BACKTRACE=1、rust-gdb。",
      "exercises": [
        { "type": "concept", "question": "读异常堆栈找根因的惯用方法是？", "options": ["只看第一行", "只看最后一行", "忽略堆栈", "找自己代码首次出现的位置"], "answer": 3, "feedback": "堆栈中「自己的代码」首次出现处通常是根因，而非库代码深处。" },
        { "type": "concept", "question": "Rust 中查看 panic 完整调用栈的环境变量是？", "options": ["RUST_BACKTRACE=1", "TRACE", "DEBUG=1", "STACK=full"], "answer": 0, "feedback": "RUST_BACKTRACE=1 让 panic 打印完整调用栈。" }
      ]
    },
    { "id": "test.profiling", "module_id": "B15", "title": "性能剖析与基准测试", "status": "published",
      "objectives": ["用数据而非猜测定位性能瓶颈", "写出可靠的基准测试"],
      "prerequisites": ["test.debugger"],
      "core": "「过早优化是万恶之源」——先用剖析器（profiler）测量找热点，再优化。基准测试（benchmark）：测量代码耗时，需预热、多次取均值、隔离干扰。优化后必须复测对比，否则可能越改越慢。",
      "lang_diff": "Python：cProfile/timeit/py-spy；JS：console.time/Node --prof/DevTools；Java：JFR/JMC、JMH 基准；C++：perf/valgrind、Google Benchmark；Go：pprof + testing.B 基准（go test -bench）；Rust：criterion.rs/cargo bench。",
      "exercises": [
        { "type": "concept", "question": "Go 中运行基准测试的命令是？", "options": ["go test -bench=.", "go run -bench", "go test", "go build"], "answer": 0, "feedback": "go test -bench=. 运行 Benchmark 开头的基准函数。" },
        { "type": "concept", "question": "优化性能的第一步应该是？", "options": ["用剖析器测量找热点", "加缓存", "换语言", "重写为汇编"], "answer": 0, "feedback": "先测量定位瓶颈再优化，避免凭猜测做无效优化。" }
      ]
    },
    { "id": "test.coverage", "module_id": "B15", "title": "代码覆盖率的正确使用", "status": "published",
      "objectives": ["用覆盖率发现未测代码", "避免盲目追求数字"],
      "prerequisites": ["test.structure"],
      "core": "覆盖率统计「哪些代码被测试执行到」：行覆盖、分支覆盖。价值在于发现「完全没测的区域」；但 100% 覆盖不代表无 bug（可能只执行没断言、断言不充分）。正确用法：用覆盖率找漏测，而非作为质量目标；关注关键路径的分支覆盖。",
      "lang_diff": "Python：coverage.py / pytest-cov；JS：vitest --coverage / c8；Java：JaCoCo；C++：gcov/lcov；Go：go test -cover（内置）；Rust：cargo-tarpaulin/grcov。",
      "exercises": [
        { "type": "concept", "question": "100% 代码覆盖率意味着？", "options": ["没有 bug", "测试完美", "代码都被执行过（不代表断言充分/无 bug）", "可以上线"], "answer": 2, "feedback": "覆盖率只证明执行过，断言质量与用例设计才决定测试有效性。" },
        { "type": "concept", "question": "Go 查看测试覆盖率的命令是？", "options": ["go cover", "go build -cover", "go test -cover", "go test -v"], "answer": 2, "feedback": "go test -cover 显示覆盖率，-coverprofile 生成报告。" }
      ]
    },

    // ================= B16 数据结构与算法 =================
    { "id": "ds.array-linked", "module_id": "B16", "title": "数组与链表", "status": "published",
      "objectives": ["对比数组与链表的特性", "按访问模式选择结构"],
      "prerequisites": ["ds.complexity", "collection.array-list"],
      "core": "数组：连续内存，随机访问 O(1)、中间插删 O(n)、缓存友好；链表：节点 + 指针，头尾插删 O(1)、随机访问 O(n)、需遍历。选择：按下标访问多用数组，频繁头尾增删用链表/双端队列。动态数组（vector/list）是数组的自动扩容版。",
      "lang_diff": "各语言标准库：Python list（动态数组）、collections.deque（双端）；JS Array；Java ArrayList/LinkedList；C++ vector/list/deque；Go slice（数组视图）；Rust Vec/VecDeque/LinkedList。",
      "exercises": [
        { "type": "concept", "question": "按下标访问元素最快的结构是？", "options": ["哈希表", "数组", "树", "链表"], "answer": 1, "feedback": "数组连续内存 + 下标计算，O(1) 随机访问。" },
        { "type": "concept", "question": "频繁在头部插入元素应选择？", "options": ["动态数组", "栈", "链表或双端队列", "数组"], "answer": 2, "feedback": "链表/双端队列头部插入 O(1)；数组头部插入 O(n)。" }
      ]
    },
    { "id": "ds.stack-queue", "module_id": "B16", "title": "栈与队列", "status": "published",
      "objectives": ["用栈与队列建模问题", "识别典型应用场景"],
      "prerequisites": ["ds.array-linked", "collection.stack-queue"],
      "core": "栈（LIFO）：括号匹配、函数调用栈、表达式求值、DFS、撤销；队列（FIFO）：任务调度、BFS、缓冲、消息队列。双端队列更灵活（滑动窗口）。识别：需要「后进的先处理」用栈，「先进的先处理」用队列。",
      "lang_diff": "Python：list 栈、collections.deque 队列；JS：数组模拟；Java：ArrayDeque（两用）；C++：std::stack/queue/deque；Go：slice 模拟；Rust：Vec 栈、VecDeque 队列。",
      "exercises": [
        { "type": "concept", "question": "括号匹配应该用哪种结构？", "options": ["堆", "队列", "哈希表", "栈"], "answer": 3, "feedback": "栈后进先出，遇右括号弹左括号匹配。" },
        { "type": "concept", "question": "BFS 遍历通常依赖哪种结构？", "options": ["哈希表", "栈", "树", "队列"], "answer": 3, "feedback": "BFS 按层推进，用队列 FIFO。" }
      ]
    },
    { "id": "ds.hash-table", "module_id": "B16", "title": "哈希表", "status": "published",
      "objectives": ["理解哈希表的工作原理", "用哈希表优化查找"],
      "prerequisites": ["collection.map", "ds.complexity"],
      "core": "哈希表用哈希函数把键映射到桶：平均 O(1) 查找/插入/删除。冲突处理：链地址（桶内链表）或开放寻址。负载因子过高需扩容重哈希。应用：去重、计数、缓存、索引、两数之和类问题。代价：无序、哈希函数质量影响性能。",
      "lang_diff": "Python dict/set；JS Map/Set/Object；Java HashMap/HashSet；C++ unordered_map/set；Go map；Rust HashMap/HashSet。均为哈希实现，O(1) 平均。",
      "exercises": [
        { "type": "concept", "question": "哈希表查找的平均时间复杂度是？", "options": ["O(log n)", "O(n)", "O(1)", "O(n log n)"], "answer": 2, "feedback": "哈希映射直接定位，平均 O(1)。" },
        { "type": "concept", "question": "「两数之和」最优解依赖的结构是？", "options": ["链表", "数组", "栈", "哈希表（边遍历边查补数）"], "answer": 3, "feedback": "用哈希表 O(1) 查 target-x 是否已见，O(n) 一次遍历。" }
      ]
    },
    { "id": "ds.tree-heap", "module_id": "B16", "title": "树、二叉搜索树与堆", "status": "published",
      "objectives": ["理解树形结构", "用 BST 与堆解决有序与优先级问题"],
      "prerequisites": ["ds.array-linked", "ds.stack-queue"],
      "core": "树：层级结构，遍历有前/中/后序与层序。二叉搜索树（BST）：左 < 根 < 右，中序遍历有序，查找/插入 O(log n)（平衡时）。堆（优先队列）：父 ≥ 子（大顶堆），取最值 O(1)、插入/删除 O(log n)，适合 Top-K 与调度。",
      "lang_diff": "Python：heapq（堆）、无内置 BST（bisect 或第三方）；JS：无内置（手写/库）；Java：TreeMap/TreeSet（红黑树）、PriorityQueue（堆）；C++：std::map/set（红黑树）、priority_queue；Go：container/heap；Rust：BTreeMap/BTreeSet、BinaryHeap。",
      "exercises": [
        { "type": "concept", "question": "快速获取最大 K 个元素应该用？", "options": ["排序取前 K", "队列", "链表", "堆（优先队列）"], "answer": 3, "feedback": "堆维护 K 个最大/最小，O(n log k)，优于全排序。" },
        { "type": "concept", "question": "BST 中序遍历的结果是？", "options": ["降序", "升序", "层级", "随机"], "answer": 1, "feedback": "BST 左<根<右，中序遍历得到升序序列。" }
      ]
    },
    { "id": "ds.graph", "module_id": "B16", "title": "图及其表示", "status": "published",
      "objectives": ["用邻接表/矩阵表示图", "区分有向与无向、带权与无权"],
      "prerequisites": ["ds.tree-heap", "collection.map"],
      "core": "图 = 顶点 + 边，建模关系网络（社交、路网、依赖）。表示：邻接表（每个顶点存邻居列表，省空间，常用）、邻接矩阵（二维数组，查边快但占空间）。有向图边有方向，带权图边有权值。树是特殊的图（无环连通）。",
      "lang_diff": "邻接表通用表示：Python dict[node, list]；JS Map/Object；Java Map<T, List<T>>；C++ unordered_map/vector<vector>；Go map[T][]T；Rust HashMap<T, Vec<T>>。",
      "exercises": [
        { "type": "concept", "question": "表示稀疏图（边远少于顶点²）更省空间的方式是？", "options": ["邻接表", "链表", "邻接矩阵", "二维数组"], "answer": 0, "feedback": "邻接表只存实际存在的边，稀疏图省空间。" },
        { "type": "concept", "question": "树与图的关系是？", "options": ["树有环", "树是无环连通图", "图是树", "完全不同"], "answer": 1, "feedback": "树是特殊的图：无环、连通、n 顶点 n-1 边。" }
      ]
    },
    { "id": "ds.search", "module_id": "B16", "title": "线性查找与二分查找", "status": "published",
      "objectives": ["掌握两种基础查找", "在有序数据上用二分 O(log n)"],
      "prerequisites": ["ds.complexity", "collection.sort-search"],
      "core": "线性查找：逐个比较 O(n)，适用于无序/小数据；二分查找：有序数据每次减半 O(log n)，前提是已排序。二分实现注意边界（左右指针、中点防溢出、循环不变量）。变体：找第一个/最后一个满足条件的位置。",
      "lang_diff": "Python：bisect 模块（bisect_left/right）；JS：手写二分或 find；Java：Arrays.binarySearch/Collections.binarySearch；C++：std::binary_search/lower_bound；Go：sort.Search；Rust：slice::binary_search/partition_point。",
      "exercises": [
        { "type": "concept", "question": "二分查找的前提是？", "options": ["无重复", "数据量大", "数据为数字", "数据已排序"], "answer": 3, "feedback": "二分依赖有序性每次排除一半，无序必须先排序。" },
        { "type": "concept", "question": "二分查找的时间复杂度是？", "options": ["O(1)", "O(n log n)", "O(log n)", "O(n)"], "answer": 2, "feedback": "每次减半，O(log n)。" }
      ]
    },
    { "id": "ds.sort", "module_id": "B16", "title": "基本排序算法", "status": "published",
      "objectives": ["理解常见排序的原理与复杂度", "知道标准库排序的选择"],
      "prerequisites": ["ds.complexity", "ds.search"],
      "core": "排序算法：快排/归并/堆排 O(n log n)（通用高效）、插入/选择/冒泡 O(n²)（小规模可用）、计数/基数 O(n)（特定数据）。现代标准库排序是混合算法（Timsort、内省排序），稳定且自适应。理解原理即可，实际用库函数 + 自定义比较器。",
      "lang_diff": "Python：sorted/list.sort（Timsort，稳定）；JS：arr.sort（引擎混合，现稳定）；Java：Arrays.sort（双轴快排/Timsort）；C++：std::sort（内省排序）、stable_sort；Go：sort.Slice；Rust：sort（稳定）/sort_unstable。",
      "exercises": [
        { "type": "concept", "question": "通用高效排序算法的时间复杂度是？", "options": ["O(n log n)", "O(log n)", "O(n²)", "O(n)"], "answer": 0, "feedback": "快排/归并/堆排都是 O(n log n)，是比较排序的理论下界。" },
        { "type": "concept", "question": "Python 的 sorted() 使用的算法是？", "options": ["快排", "冒泡", "Timsort（归并+插入混合，稳定）", "堆排"], "answer": 2, "feedback": "Timsort 自适应利用已有序性，稳定高效。" }
      ]
    },
    { "id": "ds.recursion-divide", "module_id": "B16", "title": "递归与分治", "status": "published",
      "objectives": ["用分治分解问题", "识别分治的递推结构"],
      "prerequisites": ["control.recursion", "ds.sort"],
      "core": "分治：把问题拆成同类子问题、递归求解、合并结果。三步：分解（divide）→ 解决（conquer）→ 合并（combine）。归并排序、快排、二分、大数乘法都是分治。分析复杂度用递归树/主定理：T(n) = aT(n/b) + f(n)。",
      "lang_diff": "分治是算法思想，实现与语言无关（递归函数）。归并排序/快排在各语言标准库底层广泛应用。",
      "exercises": [
        { "type": "concept", "question": "归并排序的核心思想是？", "options": ["逐个插入", "建堆", "分成两半递归排序再合并", "选基准分区"], "answer": 2, "feedback": "分治：拆半 → 递归排 → 合并两个有序序列。" },
        { "type": "concept", "question": "T(n) = 2T(n/2) + O(n) 的复杂度是？", "options": ["O(log n)", "O(n²)", "O(n log n)", "O(n)"], "answer": 2, "feedback": "每层 O(n)、共 log n 层，归并排序的复杂度。" }
      ]
    },
    { "id": "ds.backtracking", "module_id": "B16", "title": "回溯", "status": "published",
      "objectives": ["用回溯搜索所有解", "掌握「选择-递归-撤销」模板"],
      "prerequisites": ["ds.recursion-divide", "control.recursion"],
      "core": "回溯：系统地探索所有候选解，走不通就撤销（回退）换路。模板：做出选择 → 递归深入 → 撤销选择（恢复状态）。适用：全排列、子集、组合、N 皇后、数独、路径搜索。配合剪枝（提前排除不可能的分支）减少搜索量。",
      "lang_diff": "回溯是通用算法模板（递归 + 状态撤销），各语言实现一致。关键：用参数传递路径状态，递归返回前撤销修改（或传副本避免撤销）。",
      "exercises": [
        { "type": "concept", "question": "回溯算法的核心三步是？", "options": ["入栈-出栈-判断", "排序-查找-合并", "分治-合并-剪枝", "选择-递归-撤销"], "answer": 3, "feedback": "做选择 → 递归 → 撤销选择，系统探索所有可能。" },
        { "type": "concept", "question": "求解「数组的全排列」最适合用？", "options": ["回溯", "贪心", "二分", "动态规划"], "answer": 0, "feedback": "全排列需枚举所有排列，回溯逐个位置尝试并撤销。" }
      ]
    },
    { "id": "ds.greedy", "module_id": "B16", "title": "贪心", "status": "published",
      "objectives": ["用贪心策略求局部最优", "识别贪心的适用条件"],
      "prerequisites": ["ds.sort", "ds.complexity"],
      "core": "贪心：每步选当前最优，期望达到全局最优。适用条件：问题有「贪心选择性质」（局部最优能导向全局最优）+ 最优子结构。典型：区间调度（按结束时间排序选）、找零（大面额优先）、Huffman 编码。贪心不总是正确，需验证局部最优确实推出全局最优。",
      "lang_diff": "贪心是策略思想，实现通常 = 排序 + 一次遍历选择。各语言通用，关键是证明贪心选择的正确性。",
      "exercises": [
        { "type": "concept", "question": "「区间调度选最多不重叠会议」的贪心策略是？", "options": ["按结束时间最早优先选", "随机选", "选最长的", "按开始时间选"], "answer": 0, "feedback": "按结束时间排序，选结束最早的，给后面留最多空间。" },
        { "type": "concept", "question": "贪心算法成立的关键前提是？", "options": ["数据有序", "使用递归", "时间复杂度高", "局部最优选择能导向全局最优"], "answer": 3, "feedback": "贪心选择性质 + 最优子结构是贪心正确的前提，需验证。" }
      ]
    },
    { "id": "ds.dp", "module_id": "B16", "title": "动态规划", "status": "published",
      "objectives": ["用动态规划求解最优子结构问题", "设计状态与转移方程"],
      "prerequisites": ["ds.recursion-divide", "control.recursion"],
      "core": "动态规划：把问题分解为重叠子问题，存子问题答案避免重复计算。要素：最优子结构 + 重叠子问题。两种实现：自顶向下（递归 + 记忆化）、自底向上（填表迭代）。步骤：定义状态 → 写转移方程 → 定初始值 → 定计算顺序。经典：爬楼梯、背包、最长公共子序列。",
      "lang_diff": "DP 是算法思想，实现为数组/哈希表存子问题解。Python 可用 @cache 记忆化；其他语言手写数组迭代。空间可优化（滚动数组）。",
      "exercises": [
        { "type": "concept", "question": "动态规划适用的两个关键特征是？", "options": ["最优子结构 + 重叠子问题", "有序 + 快速", "贪心 + 剪枝", "递归 + 循环"], "answer": 0, "feedback": "有最优子结构且子问题重叠，DP 存子问题解避免重复算。" },
        { "type": "concept", "question": "「爬楼梯每次 1 或 2 阶，到第 n 阶有几种走法」的状态转移是？", "options": ["f(n) = f(n/2)", "f(n) = f(n-1) + f(n-2)", "f(n) = 2*f(n-1)", "f(n) = n"], "answer": 1, "feedback": "到 n 阶可从 n-1 走一步或 n-2 走两步，f(n)=f(n-1)+f(n-2)（斐波那契）。" }
      ]
    },
    { "id": "ds.bfs-dfs", "module_id": "B16", "title": "BFS 与 DFS", "status": "published",
      "objectives": ["用 BFS/DFS 遍历图与树", "按问题选择遍历方式"],
      "prerequisites": ["ds.graph", "ds.stack-queue"],
      "core": "DFS（深度优先）：一条路走到底再回退，用栈/递归，适合路径存在性、连通性、拓扑排序；BFS（广度优先）：逐层扩展，用队列，适合无权最短路、层序遍历。时间都是 O(V+E)。遍历需标记已访问避免死循环。",
      "lang_diff": "DFS 用递归或显式栈；BFS 用队列（deque/Queue/VecDeque）。图的邻接表遍历各语言一致。",
      "exercises": [
        { "type": "concept", "question": "无权图的单源最短路径应该用？", "options": ["DFS", "Dijkstra", "贪心", "BFS"], "answer": 3, "feedback": "BFS 逐层扩展，首次到达即最短路径（无权图）。" },
        { "type": "concept", "question": "DFS 遍历图时必须做什么避免死循环？", "options": ["标记已访问顶点", "排序", "限制深度", "加锁"], "answer": 0, "feedback": "标记 visited 防止重复访问导致无限循环。" }
      ]
    },
    { "id": "ds.union-shortest", "module_id": "B16", "title": "并查集与最短路入门", "status": "published",
      "objectives": ["用并查集管理连通分量", "理解最短路的基本思路"],
      "prerequisites": ["ds.bfs-dfs", "ds.graph"],
      "core": "并查集（Union-Find）：高效管理「元素属于哪一组」，支持合并（union）与查询（find 是否同组），路径压缩 + 按秩合并近 O(1)。应用：连通分量、Kruskal 最小生成树。最短路：无权图用 BFS，非负权图用 Dijkstra（贪心 + 优先队列）。",
      "lang_diff": "并查集无标准库，需手写（数组存父指针）。Dijkstra 用优先队列（heapq/PriorityQueue/priority_queue/BinaryHeap）。",
      "exercises": [
        { "type": "concept", "question": "并查集主要解决什么问题？", "options": ["动态管理元素的分组与连通性", "排序", "哈希", "查找最值"], "answer": 0, "feedback": "并查集高效合并组与查询是否同组，用于连通性。" },
        { "type": "concept", "question": "非负权图的单源最短路经典算法是？", "options": ["并查集", "BFS", "Dijkstra", "DFS"], "answer": 2, "feedback": "Dijkstra 用贪心 + 优先队列求非负权最短路。" }
      ]
    },

    // ================= B17 工程化与代码质量 =================
    { "id": "eng.style", "module_id": "B17", "title": "命名、排版与风格指南", "status": "published",
      "objectives": ["用清晰的命名表达意图", "遵循语言的风格约定"],
      "prerequisites": ["env.formatter-linter"],
      "core": "好命名：见名知意（userCount 而非 n）、变量用名词、函数用动词、布尔用 is/has。排版：一致的缩进与行长。每个语言有官方风格指南，用格式化器强制执行，把风格争议交给工具。命名与风格的一致性比个人偏好更重要。",
      "lang_diff": "Python：PEP 8（snake_case）；JS：camelCase + Standard/Airbnb 风格；Java：camelCase 类用 PascalCase（Google Java Style）；C++：Google Style / snake_case 或 camelCase；Go：gofmt + 短变量名习惯；Rust：rustfmt + snake_case。",
      "exercises": [
        { "type": "concept", "question": "Python 变量命名的官方风格是？", "options": ["camelCase", "kebab-case", "snake_case", "PascalCase"], "answer": 2, "feedback": "PEP 8 规定变量与函数用 snake_case。" },
        { "type": "concept", "question": "布尔变量推荐的命名前缀是？", "options": ["data/list", "temp/tmp", "get/set", "is/has/can"], "answer": 3, "feedback": "is/has/can 前缀让布尔语义一目了然。" }
      ]
    },
    { "id": "eng.responsibility", "module_id": "B17", "title": "函数和模块的职责边界", "status": "published",
      "objectives": ["让函数/模块只做一件事", "识别职责过大的信号"],
      "prerequisites": ["function.pure-side-effect", "module.namespace"],
      "core": "单一职责：一个函数/模块只负责一件事、只有一个修改理由。信号：函数超过几十行、参数过多、需要「并且/然后」描述、模块既要管数据又要管展示。拆分原则：按变化方向分离（数据/逻辑/展示/IO），高层调用低层。",
      "lang_diff": "SRP 是通用设计原则。Rust/Go 的小包哲学天然促进职责分离；Python/JS 灵活更需自律；Java 类职责分离（Controller/Service/Repository 分层）。",
      "exercises": [
        { "type": "concept", "question": "「这个函数既读文件又解析又发网络请求」的问题是？", "options": ["内存泄漏", "语法错误", "职责过多，应拆分", "太慢"], "answer": 2, "feedback": "单一职责：拆为读文件、解析、请求三个函数，各测各的。" },
        { "type": "concept", "question": "函数职责过大的常见信号不包括？", "options": ["命名清晰", "几十行以内", "需要「并且」描述功能、参数过多、上百行", "单一返回值"], "answer": 2, "feedback": "「并且/然后」描述、过长、参数多都是职责过大的信号。" }
      ]
    },
    { "id": "eng.refactor", "module_id": "B17", "title": "重复代码与重构", "status": "published",
      "objectives": ["识别并消除重复", "安全地重构"],
      "prerequisites": ["eng.responsibility", "test.structure"],
      "core": "重复是万恶之源：同一段逻辑多处出现，改一处漏一处即 bug。重构：在不改变外部行为的前提下改善内部结构。安全重构的前提是有测试兜底——先写测试、小步修改、每步验证。手法：提取函数、提取变量、内联、搬移、改名。",
      "lang_diff": "IDE 重构工具：Java IDEA 最强（安全重命名/提取）、VS Code 各语言插件支持基本重构。Go/Rust 的简单语法让重构更直接。测试覆盖是重构安全网，与语言无关。",
      "exercises": [
        { "type": "concept", "question": "安全重构的首要前提是？", "options": ["代码少", "有测试兜底", "用 IDE", "速度快"], "answer": 1, "feedback": "测试是重构的安全网，保证行为不变。" },
        { "type": "concept", "question": "消除重复代码的常用手法是？", "options": ["复制粘贴", "增加参数", "加注释", "提取公共函数/模块"], "answer": 3, "feedback": "提取公共函数/模块让逻辑只有一份，改一处全生效。" }
      ]
    },
    { "id": "eng.docs", "module_id": "B17", "title": "文档注释与 API 文档", "status": "published",
      "objectives": ["写出有用的文档注释", "自动生成 API 文档"],
      "prerequisites": ["module.public-private", "eng.style"],
      "core": "好注释解释「为什么」而非「做什么」（代码已说明做什么）。公开 API 必须有文档注释：用途、参数、返回值、异常、示例。各语言有文档标准（docstring/Javadoc/rustdoc），可自动生成 API 文档网站。注释与代码同步更新，过时的注释比没有更糟。",
      "lang_diff": "Python：docstring + Sphinx/pydoc；JS：JSDoc + TypeDoc；Java：Javadoc；C++：Doxygen；Go：包注释 + godoc（注释即文档）；Rust：/// 文档注释 + cargo doc（可含可运行示例测试）。",
      "exercises": [
        { "type": "concept", "question": "好注释应该解释什么？", "options": ["代码做什么", "变量类型", "逐行翻译", "为什么这样做（意图与权衡）"], "answer": 3, "feedback": "代码表达做什么，注释解释为什么与设计权衡。" },
        { "type": "concept", "question": "Rust 中生成 API 文档的命令是？", "options": ["rustdoc only", "cargo doc", "cargo doc --open", "cargo build"], "answer": 2, "feedback": "cargo doc 生成文档，--open 直接打开。" }
      ]
    },
    { "id": "eng.project-layout", "module_id": "B17", "title": "项目目录结构", "status": "published",
      "objectives": ["按生态约定组织项目结构", "让结构传达架构意图"],
      "prerequisites": ["env.project-template", "module.namespace"],
      "core": "目录结构是项目的地图：源码与测试分离、按功能/层组织模块、配置与脚本归位。好的结构让新人秒懂「代码在哪」「怎么跑」。遵循生态标准布局（src/、tests/、cmd/、internal/），不要自创怪结构。",
      "lang_diff": "Python：src/pkg/ + tests/ + pyproject.toml；JS：src/ + package.json；Java：src/main/java + src/test/java（Maven）；C++：include/ + src/ + CMakeLists.txt；Go：cmd/ + internal/ + pkg/（标准布局）；Rust：src/ + tests/ + Cargo.toml。",
      "exercises": [
        { "type": "concept", "question": "Go 项目的标准源码组织目录是？", "options": ["cmd/ + internal/ + pkg/", "code/", "main/", "src/"], "answer": 0, "feedback": "Go 标准布局：cmd 入口、internal 私有包、pkg 公共库。" },
        { "type": "concept", "question": "Java Maven 项目的测试代码目录是？", "options": ["src/test", "tests/", "test/", "src/test/java"], "answer": 3, "feedback": "Maven 约定 src/test/java 放测试，src/main/java 放源码。" }
      ]
    },
    { "id": "eng.config", "module_id": "B17", "title": "配置分层", "status": "published",
      "objectives": ["按层组织配置", "让配置可覆盖、可验证"],
      "prerequisites": ["io.config-env", "eng.project-layout"],
      "core": "配置分层：默认值 < 配置文件 < 环境变量 < 命令行参数（后者覆盖前者）。好处：本地开发用文件、生产用环境变量、临时调试用参数。配置应有 schema 校验（启动即报错而非运行中崩溃），并有清晰的优先级文档。",
      "lang_diff": "Python：dynaconf/pydantic-settings；JS：config 包/环境隔离；Java：Spring profiles + 外部化配置；Go：viper；Rust：config crate + clap。分层覆盖是通用模式。",
      "exercises": [
        { "type": "concept", "question": "配置优先级的通用顺序是？", "options": ["随机", "文件最高", "默认值最高", "命令行参数 > 环境变量 > 配置文件 > 默认值"], "answer": 3, "feedback": "越接近运行时指定优先级越高，便于临时覆盖。" },
        { "type": "concept", "question": "配置校验的最佳实践是？", "options": ["启动时用 schema 校验，尽早暴露错误", "不校验", "注释说明", "运行时用到才检查"], "answer": 0, "feedback": "启动即校验配置，fail fast，避免运行中才崩溃。" }
      ]
    },
    { "id": "eng.build-test-release", "module_id": "B17", "title": "构建、测试与发布脚本", "status": "published",
      "objectives": ["用脚本自动化构建/测试/发布", "让流程一键可复现"],
      "prerequisites": ["module.artifact-publish", "test.structure"],
      "core": "把构建、测试、发布固化为脚本/命令（npm scripts、Makefile、cargo、CI 配置）：一键执行、团队统一、可复现。避免「在我机器上能跑」——流程自动化后人人一致。脚本应幂等（重复执行结果相同）且有明确失败反馈。",
      "lang_diff": "Python：Makefile/tox/nox、uv；JS：package.json scripts；Java：mvn/gradle 生命周期；C++：CMake + CTest；Go：go build/test（内置）+ Makefile；Rust：cargo build/test（内置）。",
      "exercises": [
        { "type": "concept", "question": "JS 项目定义构建/测试脚本的标准位置是？", "options": [".env", "package.json 的 scripts", "Makefile", "README"], "answer": 1, "feedback": "package.json scripts 定义 npm run build/test 等命令。" },
        { "type": "concept", "question": "构建脚本「幂等」意味着？", "options": ["更快", "重复执行结果相同", "无输出", "无依赖"], "answer": 1, "feedback": "幂等脚本重复跑不产生副作用差异，安全可重入。" }
      ]
    },
    { "id": "eng.ci", "module_id": "B17", "title": "CI 基础（持续集成）", "status": "published",
      "objectives": ["用 CI 自动验证每次提交", "设计基本的 CI 流水线"],
      "prerequisites": ["eng.build-test-release", "eng.git"],
      "core": "持续集成：每次提交/PR 自动运行构建、lint、测试，及时发现问题。基本流水线：检出代码 → 安装依赖 → lint/格式检查 → 构建 → 测试 → （可选）构建产物。好处：问题早发现、保证主分支始终可用、评审有质量底线。",
      "lang_diff": "CI 平台：GitHub Actions / GitLab CI / Jenkins。各语言在 CI 中跑各自工具链：pytest、npm test、mvn test、cargo test、go test。缓存依赖加速。",
      "exercises": [
        { "type": "concept", "question": "CI 流水线的典型步骤顺序是？", "options": ["构建-检出", "检出-依赖-lint-构建-测试", "发布-测试-构建", "测试-检出"], "answer": 1, "feedback": "先检出与装依赖，再质量检查、构建、测试。" },
        { "type": "concept", "question": "CI 的核心价值是？", "options": ["每次提交自动验证，早发现并防止主分支劣化", "省服务器", "加快开发", "替代测试"], "answer": 0, "feedback": "CI 让每次变更自动验证，保证主分支始终健康。" }
      ]
    },
    { "id": "eng.supply-chain", "module_id": "B17", "title": "依赖与供应链安全", "status": "published",
      "objectives": ["管理第三方依赖的安全风险", "用锁文件与审计防护"],
      "prerequisites": ["module.dependency-lockfile", "eng.ci"],
      "core": "第三方依赖是便利也是风险：恶意包、已知漏洞（CVE）、依赖混淆。防护：锁文件固定版本、定期跑安全审计（pip-audit/npm audit/cargo audit）、只装必要依赖、审查新增依赖、用私有源防依赖混淆。供应链攻击（如 event-stream 事件）警示依赖需可信。",
      "lang_diff": "Python：pip-audit/Safety；JS：npm audit/Snyk；Java：OWASP Dependency-Check；Go：govulncheck；Rust：cargo audit。GitHub Dependabot 自动提更新 PR。",
      "exercises": [
        { "type": "concept", "question": "防护依赖安全的基本措施是？", "options": ["不用依赖", "锁文件 + 定期安全审计 + 最小化依赖", "装最新版即可", "禁用网络"], "answer": 1, "feedback": "锁版本、审计漏洞、只装必要依赖，三层防护。" },
        { "type": "concept", "question": "Rust 检查依赖已知漏洞的工具是？", "options": ["cargo audit", "cargo build", "cargo test", "clippy"], "answer": 0, "feedback": "cargo audit 检查依赖是否有已知安全漏洞。" }
      ]
    },
    { "id": "eng.performance-measure", "module_id": "B17", "title": "性能优化的测量原则", "status": "published",
      "objectives": ["先测量再优化", "验证优化的真实效果"],
      "prerequisites": ["test.profiling"],
      "core": "性能优化铁律：先测量定位瓶颈，再优化，最后复测验证。凭直觉优化常越改越慢。基准要可复现（固定环境、多次取均值、隔离干扰）。关注真正影响用户的指标（延迟 P99、吞吐），而非微优化。优化后必须有数据证明改进。",
      "lang_diff": "剖析工具：Python py-spy/cProfile；JS DevTools/--prof；Java JFR/JMC；C++ perf/VTune；Go pprof；Rust perf/criterion。基准库见 test.profiling。",
      "exercises": [
        { "type": "concept", "question": "性能优化的正确顺序是？", "options": ["测量瓶颈 → 优化 → 复测验证", "优化-测量", "先加缓存", "重写"], "answer": 0, "feedback": "先测量找热点，优化后必须复测，否则可能越改越慢。" },
        { "type": "concept", "question": "评估服务性能更应关注的指标是？", "options": ["CPU 型号", "P99 延迟与吞吐（尾部延迟）", "平均延迟", "代码行数"], "answer": 1, "feedback": "P99 反映最坏体验，平均延迟会掩盖尾部问题。" }
      ]
    },
    { "id": "eng.cross-platform", "module_id": "B17", "title": "跨平台兼容性", "status": "published",
      "objectives": ["写出跨 Windows/macOS/Linux 兼容的代码", "规避平台相关陷阱"],
      "prerequisites": ["io.encoding-crossplatform", "io.paths"],
      "core": "跨平台三大坑：路径分隔符（用路径库）、换行符（文本模式统一）、行尾与编码（UTF-8）。此外还有：文件系统大小写敏感（Linux 敏感、macOS/Windows 不敏感）、环境差异（shell、权限）。用 CI 在多平台跑测试，避免「在 Mac 能跑 Windows 挂」。",
      "lang_diff": "Python/JS/Java 跨平台天然好（抽象层）；Go/Rust 交叉编译方便但需注意系统调用；C++ 平台差异最大（编译器/ABI/系统 API）。路径与换行用库抽象，避免手写平台判断。",
      "exercises": [
        { "type": "concept", "question": "跨平台路径拼接的正确做法是？", "options": ["硬编码 '/'", "用语言的路径库（pathlib/path/filepath）", "用 '\\\\'", "判断 OS 拼字符串"], "answer": 1, "feedback": "路径库自动处理分隔符差异，硬编码不可移植。" },
        { "type": "concept", "question": "验证跨平台兼容性的可靠方式是？", "options": ["问同事", "只在自己机器测", "CI 在 Windows/macOS/Linux 多平台跑测试", "读文档"], "answer": 2, "feedback": "多平台 CI 真实暴露平台差异问题，单平台测试不够。" }
      ]
    }
  ]
};

// ===== 合并补充知识点到主数据（在 concept-data.js 之后加载时自动合并） =====
(function mergeSupplement() {
  if (window.CODE_ATLAS_2 && window.CODE_ATLAS_2_SUPPLEMENT) {
    const main = window.CODE_ATLAS_2;
    const extra = window.CODE_ATLAS_2_SUPPLEMENT.concepts || [];
    const existing = new Set((main.concepts || []).map((c) => c.id));
    extra.forEach((c) => {
      if (!existing.has(c.id)) main.concepts.push(c);
    });
  }
})();

