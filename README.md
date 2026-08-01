# Code Atlas

一个以“功能实现”为主线的多语言编程百科原型。每个章节讲解同一个任务，并允许切换 Python、JavaScript、Java、C++、Go 和 Rust 观察不同语言的实现方式。

## 已实现功能

- 13 个功能章节
- 6 种编程语言切换
- 双语言对比模式
- 章节与概念搜索
- 示例输出预览
- 一键复制代码
- 学习进度记录（localStorage）
- 深色 / 浅色主题（主站与进阶学习页同步）
- 响应式布局
- 键盘快捷键

## 进阶学习分区

除功能章节外，项目还提供独立的 [进阶学习页](learning.html)，按编程语言分类整理高质量进阶教程：

- 6 种语言（Python / JavaScript / Java / C++ / Go / Rust），每种 10 条
- 4 个分类：官方文档与指南、权威在线课程、经典书籍、社区与实践
- 每条教程标注来源、难度等级（入门 / 中级 / 高级）与内容简介
- 教程链接均来自官方文档、知名大学与权威平台，已于 2026-08 逐一验证有效

从主站侧边栏底部的“进阶学习”入口进入。

## 运行

无需安装依赖，直接双击 `index.html` 即可。

也可以在目录中启动本地静态服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 快捷键

- `/`：聚焦章节搜索
- `Ctrl/Cmd + K`：切换语言对比模式
- `Alt + ← / →`：切换上一章 / 下一章

## 项目结构

```text
code-atlas/
├── index.html          # 主站页面结构
├── styles.css          # 主站视觉与响应式布局
├── data.js             # 章节、语言与代码示例数据
├── app.js              # 主站交互逻辑
├── learning.html       # 进阶学习页
├── learning.css        # 进阶学习页样式
├── learning-data.js    # 进阶学习教程数据（含来源/难度/简介）
├── learning.js         # 进阶学习页交互逻辑
└── README.md
```

## 如何扩展章节

在 `data.js` 的 `chapters` 数组中增加对象。每章需要包含：

- `id`：唯一标识
- `group`：章节分组
- `title` / `subtitle` / `goal`
- `concepts`：概念标签
- `steps`：实现步骤
- `output`：示例输出
- `snippets`：每种语言的 `code` 和 `note`

## 如何扩展进阶学习教程

在 `learning-data.js` 的 `tutorials` 数组中增加对象，需要包含：

- `lang`：所属语言 id（python / javascript / java / cpp / go / rust）
- `category`：分类 id（docs / courses / books / community）
- `title`：教程标题
- `source`：来源机构 / 平台
- `level`：难度（入门 / 中级 / 高级）
- `description`：内容简介
- `url`：教程链接（请确保链接有效）

## 后续产品化建议

1. 将 `data.js` 拆成 Markdown/MDX 内容库，由构建脚本自动生成页面。
2. 接入 Monaco Editor，实现代码编辑、语法检查和格式化。
3. 使用 WebAssembly、Pyodide、Judge0 或自建沙箱实现真实运行。
4. 增加“语言专题页”，整理类型系统、内存模型、包管理和生态工具。
5. 增加登录、云端进度、练习题、测试用例和错题本。
6. 将章节拆为基础语法、数据结构、网络、并发、工程化和框架应用等学习路径。
