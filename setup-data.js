// Code Atlas — "00 下载与运行"栏目数据
// 每种语言：多平台安装方式、环境变量与路径、版本管理、依赖下载与示例运行
window.CODE_ATLAS_SETUP = {
  "site": {
    "name": "Code Atlas · 下载与运行",
    "tagline": "从零搭建 6 种语言的开发环境"
  },
  "languages": [
    { "id": "python", "name": "Python", "tag": "PY", "color": "#3776ab" },
    { "id": "javascript", "name": "JavaScript", "tag": "JS", "color": "#f7df1e" },
    { "id": "java", "name": "Java", "tag": "JAVA", "color": "#e76f00" },
    { "id": "cpp", "name": "C++", "tag": "C++", "color": "#659ad2" },
    { "id": "go", "name": "Go", "tag": "GO", "color": "#00add8" },
    { "id": "rust", "name": "Rust", "tag": "RUST", "color": "#dea584" }
  ],
  "entries": [
    // ================= Python =================
    {
      "lang": "python",
      "overview": "Python 是解释型语言，安装后通过 python 命令即可运行。官方推荐使用 pyenv 管理多版本，用 venv 隔离项目依赖。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "官网安装包（推荐）", "steps": ["访问 python.org/downloads 下载最新稳定版", "运行安装包，务必勾选 \"Add python.exe to PATH\"", "选择 Install Now，等待完成"] },
          { "name": "winget（命令行）", "steps": ["打开 PowerShell，执行 winget install Python.Python.3.12", "安装后重启终端使 PATH 生效"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "Homebrew（推荐）", "steps": ["安装 Homebrew（brew.sh 官网一条命令）", "执行 brew install python", "Homebrew 会自动加入 PATH"] },
          { "name": "官网安装包", "steps": ["访问 python.org/downloads 下载 macOS 安装包", "双击安装，使用默认配置"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "apt / dnf（发行版仓库）", "steps": ["Debian/Ubuntu：sudo apt update && sudo apt install python3 python3-pip", "Fedora/RHEL：sudo dnf install python3 python3-pip", "注意系统自带 python3，勿随意覆盖系统版本"] },
          { "name": "源码编译（可选）", "steps": ["下载源码包 ./configure && make && sudo make install", "适合需要自定义编译选项的场景"] }
        ] }
      ],
      "envVars": [
        { "var": "PATH", "detail": "Windows 安装器勾选后自动配置；macOS Homebrew 将 /opt/homebrew/bin 写入 PATH。手动验证：终端执行 python --version 与 pip --version 均能输出版本号即配置正确。", "check": "python --version && pip --version" }
      ],
      "versionManager": {
        "tool": "pyenv（macOS/Linux）· pyenv-win（Windows）",
        "why": "同一台机器可能需要 Python 3.9/3.11/3.12 等多版本用于不同项目。",
        "commands": [
          { "cmd": "pyenv install 3.12.5", "note": "安装指定版本" },
          { "cmd": "pyenv global 3.12.5", "note": "设置全局默认版本" },
          { "cmd": "pyenv local 3.11.9", "note": "在项目目录内锁定版本（生成 .python-version）" },
          { "cmd": "pyenv versions", "note": "列出已安装版本" }
        ]
      },
      "dependencies": {
        "tool": "pip + venv 虚拟环境",
        "steps": [
          "创建虚拟环境：python -m venv .venv",
          "激活：Windows 执行 .venv\\Scripts\\activate；macOS/Linux 执行 source .venv/bin/activate",
          "安装依赖：pip install requests（或 pip install -r requirements.txt）",
          "退出虚拟环境：deactivate"
        ]
      },
      "runExample": {
        "title": "运行示例：HTTP 请求脚本",
        "files": ["# hello_http.py\nimport requests\n\nresp = requests.get(\"https://httpbin.org/get\")\nprint(\"状态码:\", resp.status_code)"],
        "steps": [
          "创建虚拟环境并安装依赖：python -m venv .venv && source .venv/bin/activate",
          "安装第三方库：pip install requests",
          "运行脚本：python hello_http.py",
          "预期输出：状态码: 200"
        ]
      }
    },

    // ================= JavaScript =================
    {
      "lang": "javascript",
      "overview": "JavaScript 在浏览器中内嵌运行；服务端开发需安装 Node.js（含 npm 包管理器）。核心是 Node 的版本管理（nvm/volta）与 npm 依赖体系。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "官网 LTS 安装包（推荐）", "steps": ["访问 nodejs.org 下载 LTS 版安装包", "运行安装，保持默认（会自动配置 PATH）", "验证：node --version 与 npm --version"] },
          { "name": "winget", "steps": ["执行 winget install OpenJS.NodeJS.LTS"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "Homebrew（推荐）", "steps": ["brew install node", "自动包含 npm，写入 PATH"] },
          { "name": "官网安装包", "steps": ["下载 macOS 安装包（.pkg），双击默认安装"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "NodeSource 源（推荐）", "steps": ["curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -", "sudo apt install -y nodejs", "Debian/Ubuntu 适用；Fedora 用 dnf install nodejs"] },
          { "name": "发行版仓库", "steps": ["sudo apt install nodejs npm（版本可能较旧，建议用 NodeSource）"] }
        ] }
      ],
      "envVars": [
        { "var": "PATH", "detail": "Node 安装器将安装目录（Windows: C:\\Program Files\\nodejs；macOS: /opt/homebrew/bin）加入 PATH。验证：node -v 与 npm -v 输出版本号。", "check": "node --version && npm --version" }
      ],
      "versionManager": {
        "tool": "nvm（macOS/Linux）· nvm-windows（Windows）· volta（跨平台）",
        "why": "不同项目需要不同 Node 版本（如项目 A 用 18、项目 B 用 20）。",
        "commands": [
          { "cmd": "nvm install 20", "note": "安装 Node 20 大版本" },
          { "cmd": "nvm use 20", "note": "切换当前终端版本" },
          { "cmd": "nvm alias default 20", "note": "设置默认版本" },
          { "cmd": "nvm ls", "note": "列出已安装版本" }
        ]
      },
      "dependencies": {
        "tool": "npm（Node 自带）",
        "steps": [
          "初始化项目：npm init -y（生成 package.json）",
          "安装依赖：npm install lodash（写入 dependencies）",
          "安装开发依赖：npm install -D vitest",
          "运行脚本：在 package.json 的 scripts 中定义后执行 npm run dev"
        ]
      },
      "runExample": {
        "title": "运行示例：Node 脚本",
        "files": ["// hello.js\nconst _ = require(\"lodash\");\n\nconst nums = [3, 1, 4, 1, 5];\nconsole.log(\"排序:\", _.sortBy(nums));\nconsole.log(\"去重:\", _.uniq(nums));"],
        "steps": [
          "初始化：npm init -y",
          "安装依赖：npm install lodash",
          "运行：node hello.js",
          "预期输出：排序: [ 1, 1, 3, 4, 5 ] 与 去重: [ 3, 1, 4, 5 ]"
        ]
      }
    },

    // ================= Java =================
    {
      "lang": "java",
      "overview": "Java 是编译型语言：javac 编译、java 运行。关键是安装 JDK（含编译器与运行时）、配置 JAVA_HOME、用 Maven/Gradle 管理依赖，并可用 SDKMAN 管理多 JDK 版本。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "Adoptium Temurin（推荐）", "steps": ["访问 adoptium.net 下载 Windows x64 MSI", "双击安装，勾选 \"Set JAVA_HOME\" 与 \"Add to PATH\""] },
          { "name": "winget", "steps": ["winget install EclipseAdoptium.Temurin.21.JDK"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "Homebrew（推荐）", "steps": ["brew install --cask temurin（最新 LTS）", "或指定版本：brew install --cask temurin@17", "Homebrew 自动配置 JAVA_HOME 提示"] },
          { "name": "官网安装包", "steps": ["下载 macOS .pkg 安装包，双击安装"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "发行版仓库（推荐）", "steps": ["Debian/Ubuntu：sudo apt install openjdk-21-jdk", "Fedora：sudo dnf install java-21-openjdk-devel"] },
          { "name": "SDKMAN", "steps": ["curl -s https://get.sdkman.io | bash", "sdk install java 21-tem"] }
        ] }
      ],
      "envVars": [
        { "var": "JAVA_HOME", "detail": "Windows: 系统变量添加 JAVA_HOME=JDK 安装根目录（如 C:\\Program Files\\Eclipse Adoptium\\jdk-21），并在 PATH 中加入 %JAVA_HOME%\\bin。macOS/Linux: 常见路径 /Library/Java/JavaVirtualMachines/.../Contents/Home 或 /usr/lib/jvm/...。验证：java -version 与 javac -version。", "check": "java -version && javac -version" }
      ],
      "versionManager": {
        "tool": "SDKMAN（macOS/Linux/WSL）· 手动切换（Windows）",
        "why": "不同框架要求不同 JDK（Spring Boot 3 需 17+，旧项目需 8/11）。",
        "commands": [
          { "cmd": "sdk list java", "note": "列出可用 JDK 发行版" },
          { "cmd": "sdk install java 21-tem", "note": "安装 Temurin 21" },
          { "cmd": "sdk use java 17-tem", "note": "当前会话临时切换" },
          { "cmd": "sdk default java 21-tem", "note": "设置全局默认" }
        ]
      },
      "dependencies": {
        "tool": "Maven（或 Gradle）",
        "steps": [
          "生成骨架：mvn archetype:generate -DgroupId=com.example -DartifactId=hello -DarchetypeArtifactId=maven-archetype-quickstart",
          "在 pom.xml 的 <dependencies> 中添加依赖（如 junit、gson）",
          "下载依赖：mvn dependency:resolve",
          "编译：mvn compile；打包：mvn package"
        ]
      },
      "runExample": {
        "title": "运行示例：Maven 项目",
        "files": ["// src/main/java/com/example/App.java\npackage com.example;\n\npublic class App {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java \" + System.getProperty(\"java.version\"));\n    }\n}"],
        "steps": [
          "用 Maven 骨架创建项目（见上）",
          "编译：mvn compile",
          "运行：mvn exec:java -Dexec.mainClass=com.example.App（或 mvn package 后 java -jar target/hello-1.0-SNAPSHOT.jar）",
          "预期输出：Hello, Java 21.0.x"
        ]
      }
    },

    // ================= C++ =================
    {
      "lang": "cpp",
      "overview": "C++ 无官方统一发行渠道，核心是编译器 + 构建工具链：Windows 用 MSVC 或 MinGW，macOS 用 Clang（Xcode CLT），Linux 用 GCC。项目构建推荐 CMake。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "MSVC（Visual Studio Build Tools，推荐）", "steps": ["下载 Visual Studio Build Tools（visualstudio.microsoft.com）", "勾选 \"使用 C++ 的桌面开发\" 工作负载", "安装后可用 Developer PowerShell 中的 cl / MSBuild"] },
          { "name": "MinGW-w64（轻量替代）", "steps": ["winget install mingw", "将安装目录 bin 加入 PATH，验证 g++ --version"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "Xcode Command Line Tools（推荐）", "steps": ["终端执行 xcode-select --install", "会安装 clang 编译器与 make；验证 clang --version"] },
          { "name": "Homebrew GCC", "steps": ["brew install gcc（安装较新的 gcc-14）", "用 g++-14 调用以区分系统 clang"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "发行版仓库（推荐）", "steps": ["Debian/Ubuntu：sudo apt install build-essential cmake gdb", "Fedora：sudo dnf groupinstall \"Development Tools\"", "验证 g++ --version 与 cmake --version"] }
        ] }
      ],
      "envVars": [
        { "var": "PATH（编译器）", "detail": "MSVC 需通过 vcvars64.bat（或 Developer PowerShell）加载编译环境；MinGW 需手动将 bin 目录加入 PATH。macOS/Linux 编译器位于 /usr/bin，一般无需配置。验证：g++ --version 或 clang --version。", "check": "g++ --version && cmake --version" }
      ],
      "versionManager": {
        "tool": "多版本共存（gcc-12/gcc-13）· Homebrew 公式切换（macOS）",
        "why": "不同项目可能要求不同 C++ 标准与编译器版本；通常无需全局切换，用构建工具指定。",
        "commands": [
          { "cmd": "g++ -std=c++20 main.cpp -o main", "note": "按项目指定 C++ 标准（C++11/17/20/23）" },
          { "cmd": "brew install gcc@13 && g++-13 --version", "note": "macOS 安装特定 GCC 版本" },
          { "cmd": "sudo update-alternatives --config gcc", "note": "Linux 在多个 gcc 版本间切换" }
        ]
      },
      "dependencies": {
        "tool": "CMake + FetchContent / vcpkg / Conan",
        "steps": [
          "在 CMakeLists.txt 中声明项目与依赖（find_package 或 FetchContent）",
          "配置：cmake -B build",
          "构建：cmake --build build",
          "运行生成的可执行文件（build/ 目录下）"
        ]
      },
      "runExample": {
        "title": "运行示例：CMake 项目",
        "files": ["// main.cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++\" << \" (C++\" << __cplusplus << \")\\n\";\n    return 0;\n}", "// CMakeLists.txt\ncmake_minimum_required(VERSION 3.20)\nproject(hello CXX)\nset(CMAKE_CXX_STANDARD 20)\nadd_executable(hello main.cpp)"],
        "steps": [
          "创建 main.cpp 与 CMakeLists.txt",
          "配置与构建：cmake -B build && cmake --build build",
          "运行：./build/hello（Windows 为 build\\hello.exe）",
          "预期输出：Hello, C++ (C++202002)"
        ]
      }
    },

    // ================= Go =================
    {
      "lang": "go",
      "overview": "Go 是编译型语言，官方工具链一条命令搞定：go run 运行、go build 编译、go mod 管理依赖。安装包自带跨平台交叉编译能力，版本管理可用官方 go install 机制。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "官网 MSI（推荐）", "steps": ["访问 go.dev/dl 下载 windows-amd64 MSI", "默认安装到 C:\\Program Files\\Go，自动配置 PATH 与 GOROOT", "验证：go version"] },
          { "name": "winget", "steps": ["winget install GoLang.Go"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "Homebrew（推荐）", "steps": ["brew install go"] },
          { "name": "官网安装包", "steps": ["下载 .pkg 安装包，默认安装到 /usr/local/go"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "官网 tarball（推荐）", "steps": ["下载 go1.22.x.linux-amd64.tar.gz", "sudo tar -C /usr/local -xzf go*.tar.gz", "将 export PATH=$PATH:/usr/local/go/bin 加入 ~/.profile"] },
          { "name": "发行版仓库", "steps": ["sudo apt install golang-go（版本通常较旧，不建议）"] }
        ] }
      ],
      "envVars": [
        { "var": "GOROOT / GOPATH / PATH", "detail": "GOROOT 指向 Go 安装目录（通常自动检测，无需手动设置）；GOPATH 默认 ~/go，为工作目录（模块模式下已非必需）；PATH 需包含 Go 的 bin 目录。现代 Go 使用 Go Modules，不再强依赖 GOPATH 目录结构。验证：go version 与 go env GOPATH。", "check": "go version && go env GOROOT GOPATH" }
      ],
      "versionManager": {
        "tool": "官方多版本机制（go install golang.org/dl/xxx）",
        "why": "需要测试不同 Go 版本兼容性时使用。",
        "commands": [
          { "cmd": "go install golang.org/dl/go1.22.5@latest", "note": "安装版本下载器" },
          { "cmd": "go1.22.5 download", "note": "下载对应版本工具链" },
          { "cmd": "go1.22.5 version", "note": "使用该版本（命令前缀 go1.22.5）" }
        ]
      },
      "dependencies": {
        "tool": "go mod（官方内置）",
        "steps": [
          "初始化模块：go mod init example.com/hello",
          "添加依赖：go get github.com/gin-gonic/gin（写入 go.mod）",
          "整理依赖：go mod tidy",
          "运行：go run .；构建：go build -o hello ."
        ]
      },
      "runExample": {
        "title": "运行示例：Go 模块项目",
        "files": ["// main.go\npackage main\n\nimport (\n    \"fmt\"\n    \"net/http\"\n)\n\nfunc main() {\n    http.HandleFunc(\"/\", func(w http.ResponseWriter, r *http.Request) {\n        fmt.Fprintf(w, \"Hello, Go %s\", r.URL.Path)\n    })\n    fmt.Println(\"Server on :8080\")\n    http.ListenAndServe(\":8080\", nil)\n}"],
        "steps": [
          "初始化模块：go mod init example.com/hello",
          "运行：go run .",
          "浏览器访问 http://localhost:8080/hello",
          "预期：页面显示 Hello, Go /hello"
        ]
      }
    },

    // ================= Rust =================
    {
      "lang": "rust",
      "overview": "Rust 的官方安装方式是 rustup：一个命令同时安装 rustc 编译器与 cargo 包管理器/构建工具，并内置多工具链版本管理。",
      "install": [
        { "os": "Windows", "title": "Windows 安装", "methods": [
          { "name": "rustup-init（推荐）", "steps": ["访问 rustup.rs 下载 rustup-init.exe", "运行，选择默认配置（需要 MSVC 链接器：先安装 Visual Studio Build Tools 的 \"使用 C++ 的桌面开发\"）", "验证：rustc --version 与 cargo --version"] },
          { "name": "winget", "steps": ["winget install Rustlang.Rustup"] }
        ] },
        { "os": "macOS", "title": "macOS 安装", "methods": [
          { "name": "rustup（推荐）", "steps": ["终端执行 curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh", "选择默认 (1) 安装 stable 工具链", "重启终端或 source ~/.cargo/env"] },
          { "name": "Homebrew", "steps": ["brew install rust（安装 rustc + cargo，但不含 rustup 管理）"] }
        ] },
        { "os": "Linux", "title": "Linux 安装", "methods": [
          { "name": "rustup（推荐）", "steps": ["curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh", "安装后 .cargo/bin 已加入 PATH，重新登录生效"] },
          { "name": "发行版仓库", "steps": ["sudo apt install rustc cargo（版本可能较旧，建议 rustup）"] }
        ] }
      ],
      "envVars": [
        { "var": "PATH（~/.cargo/bin）", "detail": "rustup 安装后 cargo/rustc 位于 ~/.cargo/bin，rustup 会自动写入 shell 配置（~/.zshrc 或 ~/.bashrc）。Windows 安装器会自动加入 PATH。验证：rustc --version、cargo --version、rustup show。", "check": "rustc --version && cargo --version && rustup show" }
      ],
      "versionManager": {
        "tool": "rustup（内置）",
        "why": "切换 stable/beta/nightly 工具链，或为特定项目锁定版本。",
        "commands": [
          { "cmd": "rustup install nightly", "note": "安装 nightly 工具链" },
          { "cmd": "rustup default stable", "note": "设置全局默认工具链" },
          { "cmd": "rustup override set nightly", "note": "在项目目录内锁定工具链（生成 rust-toolchain.toml）" },
          { "cmd": "rustup update", "note": "更新所有工具链" }
        ]
      },
      "dependencies": {
        "tool": "cargo（官方内置）",
        "steps": [
          "创建项目：cargo new hello --vcs git（二进制项目）",
          "在 Cargo.toml 的 [dependencies] 中添加依赖（如 serde、reqwest）",
          "构建：cargo build（首次会下载依赖并编译）",
          "运行：cargo run；检查：cargo check（快速语法检查）"
        ]
      },
      "runExample": {
        "title": "运行示例：cargo 项目",
        "files": ["// src/main.rs\nfn main() {\n    let nums = vec![3, 1, 4, 1, 5];\n    let sum: i32 = nums.iter().sum();\n    println!(\"Hello, Rust! sum = {}\", sum);\n}"],
        "steps": [
          "创建项目：cargo new hello && cd hello",
          "运行：cargo run",
          "预期输出：Hello, Rust! sum = 14",
          "发布构建：cargo build --release（产物在 target/release/）"
        ]
      }
    }
  ]
};
