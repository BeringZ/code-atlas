# Code Atlas

一个以“功能实现”为主线的多语言编程百科原型。每个章节讲解同一个任务，并允许切换 Python、JavaScript、Java、C++、Go 和 Rust 观察不同语言的实现方式。

## 目录结构

```text
code-atlas/
├── index.html          # 主站（功能章节 + 完整目录导航）
├── styles.css          # 主站视觉与响应式布局
├── data.js             # 章节、语言与代码示例数据
├── app.js              # 主站交互逻辑
├── setup.html          # 栏目 00：下载与运行
├── setup.css / setup.js / setup-data.js
├── projects.html       # 栏目：项目实践
├── projects.css / projects.js / projects-data.js
├── learning.html       # 栏目：进阶学习（含学习辅导）
├── learning.css / learning.js / learning-data.js
└── README.md
```

站点导航目录（主站侧边栏）：

```text
起步
├── 00 下载与运行        → setup.html
功能章节（13 章，8 个分组）
实践与进阶
├── 项目实践            → projects.html
└── 进阶学习            → learning.html
```

## 栏目一：00 下载与运行（setup.html）

为 6 种语言提供环境搭建的逐步说明：

- **多平台安装**：Windows / macOS / Linux 各给出官方安装包与包管理器（winget / Homebrew / apt / rustup 等）两条路径
- **环境变量与路径**：PATH / JAVA_HOME / GOROOT 等配置说明与验证命令
- **版本管理**：pyenv、nvm、SDKMAN、rustup 等多版本/工具链切换
- **依赖与运行示例**：每种语言一个可运行的示例项目，走通「建项目 → 装依赖 → 跑起来」全流程

## 栏目二：项目实践（projects.html）

为 6 种语言各设计一个综合实战项目（难度循序渐进）：

| 语言 | 项目 | 覆盖层面 |
|---|---|---|
| Python | 命令行待办管理工具 | CLI 参数、JSON 持久化、OOP、pytest |
| JavaScript | 浏览器记事本 SPA | DOM、事件委托、localStorage、ES Modules |
| Java | 图书管理系统 | 类设计、集合、文件 IO、异常、JUnit |
| C++ | 学生成绩统计系统 | STL、排序、CSV 持久化、CMake |
| Go | 并发任务调度器 | goroutine、channel、context、竞态检测 |
| Rust | 迷你文本索引器 | 所有权、迭代器、错误处理、CLI |

每个项目包含：项目背景与目标、技术要点清单、分阶段实现步骤（4 阶段）、验收标准/自测清单、参考实现与思路提示（不提供完整答案）。

## 栏目三：进阶学习（learning.html）

在高质量教程索引（6 语言 × 4 分类 × 10 条，来源权威、链接已验证）基础上，新增**学习辅导**功能：

- **进阶知识点精讲**：每语言 3 个核心进阶知识点（共 18 个）
- **代码示例逐行解读**：关键代码行号级注释
- **常见误区提示**：每知识点 2 条高频踩坑点
- **互动练习与即时反馈**：18 道选择题，点击选项即时判断对错并给出解析
- **学习路径个性化建议**：按 入门/中级/高级 三档水平推荐学习顺序，选择持久化（localStorage），并参考主站学习进度

## 主站已实现功能

- 13 个功能章节（8 个分组）
- 6 种编程语言切换
- 双语言对比模式
- 章节与概念搜索
- 示例输出预览
- 一键复制代码
- 学习进度记录（localStorage）
- 深色 / 浅色主题（四个页面共享同步）
- 响应式布局
- 键盘快捷键

## 运行

无需安装依赖，直接双击 `index.html` 即可。

也可以在目录中启动本地静态服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 快捷键（主站）

- `/`：聚焦章节搜索
- `Ctrl/Cmd + K`：切换语言对比模式
- `Alt + ← / →`：切换上一章 / 下一章

## 如何扩展

- **功能章节**：在 `data.js` 的 `chapters` 数组增加对象（id/group/title/subtitle/goal/concepts/steps/output/snippets）
- **下载与运行**：在 `setup-data.js` 的 `entries` 数组增加对象
- **项目实践**：在 `projects-data.js` 的 `projects` 数组增加对象
- **学习资料**：在 `learning-data.js` 的 `tutorials` 数组增加对象
- **学习辅导**：在 `learning-data.js` 的 `coaching`（知识点/练习）与 `learningPaths`（路径建议）中增加对象

## 后续产品化建议

1. 将数据文件拆成 Markdown/MDX 内容库，由构建脚本自动生成页面。
2. 接入 Monaco Editor，实现代码编辑、语法检查和格式化。
3. 使用 WebAssembly、Pyodide、Judge0 或自建沙箱实现真实运行。
4. 增加“语言专题页”，整理类型系统、内存模型、包管理和生态工具。
5. 增加登录、云端进度、练习题、测试用例和错题本。
6. 将章节拆为基础语法、数据结构、网络、并发、工程化和框架应用等学习路径。
