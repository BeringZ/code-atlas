// Code Atlas 2.0 — 语言百科数据（P8）
// 语言定位、版本、范式、工具链、生态、适用场景（工具链部分迁移自 setup-data.js）
window.CODE_ATLAS_ENCYCLOPEDIA = {
  "languages": [
    {
      "id": "python",
      "name": "Python",
      "tag": "PY",
      "color": "#3776ab",
      "version": "3.13",
      "positioning": "以简洁与生态见长的通用语言，在数据科学、AI、自动化与 Web 后端占据主导。",
      "paradigms": ["多范式：过程式 / 面向对象 / 函数式", "动态强类型", "鸭子类型"],
      "toolchain": {
        "install": "官网安装包 / winget / Homebrew / apt",
        "versionManager": "pyenv（pyenv-win 支持 Windows）",
        "packageManager": "pip + venv；项目级推荐 Poetry / uv",
        "build": "解释执行；打包用 PyInstaller / Nuitka",
        "ide": "VS Code + Pylance / PyCharm",
        "formatter": "Black · Ruff · mypy/pyright（类型检查）"
      },
      "ecosystem": ["Web：FastAPI / Django / Flask", "数据：NumPy / Pandas / Polars", "AI：PyTorch / scikit-learn", "自动化：requests / Selenium / Click"],
      "scenarios": "数据分析、机器学习、脚本自动化、Web 后端、教学入门",
      "install_steps": ["访问 python.org/downloads 下载稳定版", "Windows 安装时勾选 Add python.exe to PATH", "macOS/Linux 可用 Homebrew / apt 安装", "验证：python --version && pip --version"],
      "quickstart": "python -m venv .venv && source .venv/bin/activate\npip install requests\npython hello.py"
    },
    {
      "id": "javascript",
      "name": "JavaScript",
      "tag": "JS",
      "color": "#f7df1e",
      "version": "ES2024",
      "positioning": "浏览器原生语言，也是 Node.js 驱动的服务端与工具链语言，Web 全栈的默认选择。",
      "paradigms": ["多范式：事件驱动 / 面向对象（原型）/ 函数式", "动态弱类型", "单线程事件循环"],
      "toolchain": {
        "install": "Node.js 官网 LTS / winget / Homebrew / NodeSource",
        "versionManager": "nvm / volta / fnm",
        "packageManager": "npm / pnpm / yarn",
        "build": "Vite / webpack / esbuild 打包；tsc 转译 TS",
        "ide": "VS Code + ESLint / TS 服务",
        "formatter": "Prettier · ESLint · TypeScript（可选）"
      },
      "ecosystem": ["前端：React / Vue / Svelte", "后端：Express / Fastify / NestJS", "测试：Vitest / Jest / Playwright", "桌面/移动：Electron / React Native"],
      "scenarios": "Web 前端交互、Node 后端、全栈应用、跨平台桌面",
      "install_steps": ["下载 Node.js LTS 安装包（nodejs.org）", "安装后自动配置 PATH", "验证：node --version && npm --version"],
      "quickstart": "npm init -y\nnpm install express\nnode app.js"
    },
    {
      "id": "java",
      "name": "Java",
      "tag": "JAVA",
      "color": "#e76f00",
      "version": "21+ (LTS)",
      "positioning": "强类型、企业级生态的常青语言，JVM 平台承载 Spring 等重型框架与大规模系统。",
      "paradigms": ["面向对象为主", "静态强类型", "编译 + JVM 字节码"],
      "toolchain": {
        "install": "Adoptium Temurin / Oracle JDK / winget / apt",
        "versionManager": "SDKMAN（macOS/Linux/WSL）",
        "packageManager": "Maven / Gradle",
        "build": "javac 编译；Maven/Gradle 构建打包 JAR",
        "ide": "IntelliJ IDEA / Eclipse / VS Code",
        "formatter": "Checkstyle · Spotless · 编译器类型检查"
      },
      "ecosystem": ["Web：Spring Boot / Quarkus", "大数据：Hadoop / Spark / Flink", "Android：原生开发", "中间件：Kafka / Elasticsearch / 大量 Java 生态"],
      "scenarios": "企业后端、微服务、大数据、Android、金融系统",
      "install_steps": ["下载 Temurin 21 MSI/pkg（adoptium.net）", "Windows 勾选 Set JAVA_HOME 与 Add to PATH", "验证：java -version && javac -version"],
      "quickstart": "mvn archetype:generate -DgroupId=com.example -DartifactId=hello -DarchetypeArtifactId=maven-archetype-quickstart\nmvn compile && mvn exec:java -Dexec.mainClass=com.example.App"
    },
    {
      "id": "cpp",
      "name": "C++",
      "tag": "C++",
      "color": "#659ad2",
      "version": "C++20",
      "positioning": "追求性能与资源控制的系统级语言，游戏、图形、嵌入式与高性能计算的支柱。",
      "paradigms": ["多范式：过程式 / 面向对象 / 泛型", "静态强类型", "手动资源管理（RAII 辅助）"],
      "toolchain": {
        "install": "MSVC Build Tools / MinGW / Xcode CLT / apt build-essential",
        "versionManager": "多编译器共存 + CMake 指定标准",
        "packageManager": "vcpkg / Conan / FetchContent",
        "build": "CMake + 编译器（g++/clang++/MSVC）",
        "ide": "Visual Studio / CLion / VS Code + clangd",
        "formatter": "clang-format · clang-tidy · sanitizers"
      },
      "ecosystem": ["游戏：Unreal Engine", "图形：OpenGL / Vulkan", "高性能：数值计算 / 数据库引擎", "嵌入式：RTOS 生态"],
      "scenarios": "游戏引擎、系统软件、图形渲染、嵌入式、高频交易",
      "install_steps": ["Windows：VS Build Tools 勾选 C++ 桌面开发", "macOS：xcode-select --install", "Linux：sudo apt install build-essential cmake", "验证：g++ --version && cmake --version"],
      "quickstart": "cmake -B build && cmake --build build\n./build/hello"
    },
    {
      "id": "go",
      "name": "Go",
      "tag": "GO",
      "color": "#00add8",
      "version": "1.23+",
      "positioning": "以极简语法与一等并发著称的云原生语言，Kubernetes、Docker 等基础设施的母语。",
      "paradigms": ["过程式为主，组合优于继承", "静态强类型 + 类型推断", "goroutine 并发模型"],
      "toolchain": {
        "install": "官网 MSI/tarball / winget / Homebrew",
        "versionManager": "官方 go1.x 下载器（golang.org/dl）",
        "packageManager": "go mod（官方内置）",
        "build": "go build 静态编译（跨平台交叉编译）",
        "ide": "VS Code + gopls / GoLand",
        "formatter": "gofmt（官方强制）· go vet · staticcheck"
      },
      "ecosystem": ["云原生：Kubernetes / Docker / Prometheus", "Web：Gin / Echo / net/http", "微服务：gRPC / protobuf", "CLI：Cobra / Viper"],
      "scenarios": "云原生基础设施、微服务、网络服务、CLI 工具、DevOps",
      "install_steps": ["下载官方安装包（go.dev/dl）", "macOS 用 brew install go", "Linux 解压 tarball 并配置 PATH", "验证：go version && go env GOROOT"],
      "quickstart": "go mod init example.com/hello\ngo run ."
    },
    {
      "id": "rust",
      "name": "Rust",
      "tag": "RUST",
      "color": "#dea584",
      "version": "2024 Edition",
      "positioning": "以内存安全与零成本抽象见长的系统语言，所有权系统让并发安全在编译期可证。",
      "paradigms": ["面向表达式 / 函数式风格", "静态强类型 + 所有权系统", "无 GC 但内存安全"],
      "toolchain": {
        "install": "rustup（官方安装器）/ winget / Homebrew",
        "versionManager": "rustup（stable/nightly 内置切换）",
        "packageManager": "cargo（官方内置）",
        "build": "cargo build（release 优化）",
        "ide": "VS Code + rust-analyzer / CLion",
        "formatter": "rustfmt · clippy（官方）"
      },
      "ecosystem": ["基础设施：Firecracker / 系统工具", "Web：Axum / Actix / Rocket", "CLI：clap / 大量高质量工具", "WebAssembly：wasm-bindgen"],
      "scenarios": "系统软件、CLI 工具、WebAssembly、高性能后端、嵌入式",
      "install_steps": ["执行 rustup 安装脚本（rustup.rs）", "Windows 需先装 MSVC Build Tools", "验证：rustc --version && cargo --version"],
      "quickstart": "cargo new hello && cd hello\ncargo run"
    }
  ]
};
