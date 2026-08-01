window.CODE_ATLAS_DATA = {
  "site": {
    "name": "Code Atlas",
    "tagline": "以功能为主线的多语言编程百科",
    "description": "同一个编程任务，切换语言观察其语法、类型系统、错误处理和工程习惯。"
  },
  "languages": {
    "python": {
      "name": "Python",
      "version": "3.12+",
      "extension": ".py",
      "summary": "语法简洁，适合快速验证、数据处理、自动化与后端开发。"
    },
    "javascript": {
      "name": "JavaScript",
      "version": "ES2024",
      "extension": ".js",
      "summary": "浏览器原生语言，也可通过 Node.js 进行服务端开发。"
    },
    "java": {
      "name": "Java",
      "version": "21+",
      "extension": ".java",
      "summary": "强类型、成熟生态，常用于企业后端、Android 与大型系统。"
    },
    "cpp": {
      "name": "C++",
      "version": "C++20",
      "extension": ".cpp",
      "summary": "强调性能与资源控制，常用于系统、游戏、图形和高性能计算。"
    },
    "go": {
      "name": "Go",
      "version": "1.23+",
      "extension": ".go",
      "summary": "工程化简洁，并发模型清晰，适合网络服务与云原生开发。"
    },
    "rust": {
      "name": "Rust",
      "version": "2024 Edition",
      "extension": ".rs",
      "summary": "以内存安全和零成本抽象见长，适合系统与高可靠软件。"
    }
  },
  "chapters": [
    {
      "id": "hello-io",
      "group": "基础",
      "title": "输出、输入与程序入口",
      "subtitle": "完成第一个可交互程序",
      "goal": "读取用户输入，处理字符串，并输出格式化结果。",
      "concepts": [
        "程序入口",
        "标准输入",
        "标准输出",
        "字符串插值"
      ],
      "steps": [
        "找到程序执行的入口。",
        "从标准输入读取一行文本。",
        "清理换行符或空白字符。",
        "将变量嵌入输出字符串。"
      ],
      "output": "请输入你的名字：Ada\n你好，Ada！欢迎来到 Code Atlas。",
      "snippets": {
        "python": {
          "code": "name = input(\"请输入你的名字：\").strip()\nprint(f\"你好，{name}！欢迎来到 Code Atlas。\")",
          "note": "Python 脚本从文件第一行开始执行，input 会返回字符串。"
        },
        "javascript": {
          "code": "// Node.js\nconst readline = require(\"node:readline\");\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nrl.question(\"请输入你的名字：\", (name) => {\n  console.log(`你好，${name.trim()}！欢迎来到 Code Atlas。`);\n  rl.close();\n});",
          "note": "浏览器中可使用 prompt；此处展示 Node.js 的标准输入。"
        },
        "java": {
          "code": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        try (Scanner scanner = new Scanner(System.in)) {\n            System.out.print(\"请输入你的名字：\");\n            String name = scanner.nextLine().trim();\n            System.out.printf(\"你好，%s！欢迎来到 Code Atlas。%n\", name);\n        }\n    }\n}",
          "note": "Java 程序从 public static void main 开始执行。"
        },
        "cpp": {
          "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::cout << \"请输入你的名字：\";\n    std::string name;\n    std::getline(std::cin, name);\n    std::cout << \"你好，\" << name\n              << \"！欢迎来到 Code Atlas。\\n\";\n    return 0;\n}",
          "note": "std::getline 可读取包含空格的整行输入。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n    \"strings\"\n)\n\nfunc main() {\n    reader := bufio.NewReader(os.Stdin)\n    fmt.Print(\"请输入你的名字：\")\n    name, _ := reader.ReadString('\\n')\n    name = strings.TrimSpace(name)\n    fmt.Printf(\"你好，%s！欢迎来到 Code Atlas。\\n\", name)\n}",
          "note": "Go 可执行程序需要 package main 与 main 函数。"
        },
        "rust": {
          "code": "use std::io::{self, Write};\n\nfn main() {\n    print!(\"请输入你的名字：\");\n    io::stdout().flush().unwrap();\n\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).unwrap();\n\n    println!(\n        \"你好，{}！欢迎来到 Code Atlas。\",\n        name.trim()\n    );\n}",
          "note": "read_line 将内容追加到可变 String，因此变量需要 mut。"
        }
      }
    },
    {
      "id": "variables-types",
      "group": "基础",
      "title": "变量、类型与转换",
      "subtitle": "把原始输入转换为可计算的数据",
      "goal": "将字符串转换为数字，计算圆的面积，并格式化保留两位小数。",
      "concepts": [
        "变量声明",
        "数值类型",
        "类型转换",
        "常量"
      ],
      "steps": [
        "定义圆周率常量。",
        "读取字符串形式的半径。",
        "将字符串转换为浮点数。",
        "执行计算并控制输出精度。"
      ],
      "output": "半径：3\n面积：28.27",
      "snippets": {
        "python": {
          "code": "from math import pi\n\nradius = float(input(\"半径：\"))\narea = pi * radius ** 2\nprint(f\"面积：{area:.2f}\")",
          "note": "Python 变量本身没有固定类型，但对象有明确类型。"
        },
        "javascript": {
          "code": "const PI = Math.PI;\nconst radius = Number(\"3\");\n\nif (Number.isNaN(radius)) {\n  throw new Error(\"半径必须是数字\");\n}\n\nconst area = PI * radius ** 2;\nconsole.log(`面积：${area.toFixed(2)}`);",
          "note": "Number 可显式转换字符串；toFixed 返回格式化字符串。"
        },
        "java": {
          "code": "public class Main {\n    public static void main(String[] args) {\n        final double PI = Math.PI;\n        double radius = Double.parseDouble(\"3\");\n        double area = PI * Math.pow(radius, 2);\n        System.out.printf(\"面积：%.2f%n\", area);\n    }\n}",
          "note": "final 用于声明不可重新赋值的变量。"
        },
        "cpp": {
          "code": "#include <cmath>\n#include <iomanip>\n#include <iostream>\n#include <string>\n\nint main() {\n    constexpr double PI = 3.141592653589793;\n    double radius = std::stod(\"3\");\n    double area = PI * std::pow(radius, 2);\n\n    std::cout << std::fixed << std::setprecision(2)\n              << \"面积：\" << area << '\\n';\n}",
          "note": "constexpr 表示可在编译期确定的常量。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n    \"strconv\"\n)\n\nfunc main() {\n    radius, err := strconv.ParseFloat(\"3\", 64)\n    if err != nil {\n        panic(\"半径必须是数字\")\n    }\n\n    area := math.Pi * math.Pow(radius, 2)\n    fmt.Printf(\"面积：%.2f\\n\", area)\n}",
          "note": ":= 会根据右侧表达式推断局部变量类型。"
        },
        "rust": {
          "code": "fn main() {\n    const PI: f64 = std::f64::consts::PI;\n    let radius: f64 = \"3\"\n        .parse()\n        .expect(\"半径必须是数字\");\n\n    let area = PI * radius.powi(2);\n    println!(\"面积：{area:.2}\");\n}",
          "note": "Rust 默认不可变；类型可由上下文推断，也可显式标注。"
        }
      }
    },
    {
      "id": "conditions",
      "group": "控制流",
      "title": "条件判断与规则分支",
      "subtitle": "把业务规则转换为分支",
      "goal": "根据分数输出等级，并处理非法输入。",
      "concepts": [
        "布尔表达式",
        "if/else",
        "边界条件",
        "守卫式返回"
      ],
      "steps": [
        "先判断输入是否越界。",
        "按从高到低的顺序判断等级。",
        "保证每个输入只进入一个分支。",
        "输出最终等级。"
      ],
      "output": "分数：86\n等级：B",
      "snippets": {
        "python": {
          "code": "score = 86\n\nif not 0 <= score <= 100:\n    grade = \"非法分数\"\nelif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelif score >= 60:\n    grade = \"C\"\nelse:\n    grade = \"D\"\n\nprint(f\"等级：{grade}\")",
          "note": "Python 支持链式比较，例如 0 <= score <= 100。"
        },
        "javascript": {
          "code": "const score = 86;\nlet grade;\n\nif (score < 0 || score > 100) {\n  grade = \"非法分数\";\n} else if (score >= 90) {\n  grade = \"A\";\n} else if (score >= 80) {\n  grade = \"B\";\n} else if (score >= 60) {\n  grade = \"C\";\n} else {\n  grade = \"D\";\n}\n\nconsole.log(`等级：${grade}`);",
          "note": "条件会按顺序判断，因此区间规则通常从高到低排列。"
        },
        "java": {
          "code": "public class Main {\n    static String gradeOf(int score) {\n        if (score < 0 || score > 100) return \"非法分数\";\n        if (score >= 90) return \"A\";\n        if (score >= 80) return \"B\";\n        if (score >= 60) return \"C\";\n        return \"D\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"等级：\" + gradeOf(86));\n    }\n}",
          "note": "守卫式 return 可以减少嵌套层级。"
        },
        "cpp": {
          "code": "#include <iostream>\n#include <string>\n\nstd::string gradeOf(int score) {\n    if (score < 0 || score > 100) return \"非法分数\";\n    if (score >= 90) return \"A\";\n    if (score >= 80) return \"B\";\n    if (score >= 60) return \"C\";\n    return \"D\";\n}\n\nint main() {\n    std::cout << \"等级：\" << gradeOf(86) << '\\n';\n}",
          "note": "返回值类型必须覆盖所有返回路径。"
        },
        "go": {
          "code": "package main\n\nimport \"fmt\"\n\nfunc gradeOf(score int) string {\n    if score < 0 || score > 100 {\n        return \"非法分数\"\n    }\n    if score >= 90 {\n        return \"A\"\n    }\n    if score >= 80 {\n        return \"B\"\n    }\n    if score >= 60 {\n        return \"C\"\n    }\n    return \"D\"\n}\n\nfunc main() {\n    fmt.Println(\"等级：\", gradeOf(86))\n}",
          "note": "Go 的 if 条件不写圆括号，但代码块必须写花括号。"
        },
        "rust": {
          "code": "fn grade_of(score: i32) -> &'static str {\n    match score {\n        s if !(0..=100).contains(&s) => \"非法分数\",\n        90..=100 => \"A\",\n        80..=89 => \"B\",\n        60..=79 => \"C\",\n        _ => \"D\",\n    }\n}\n\nfn main() {\n    println!(\"等级：{}\", grade_of(86));\n}",
          "note": "match 可结合范围模式与守卫条件表达规则。"
        }
      }
    },
    {
      "id": "loops",
      "group": "控制流",
      "title": "循环、遍历与聚合",
      "subtitle": "从一组数据中计算结果",
      "goal": "遍历订单金额，过滤无效值并计算总额。",
      "concepts": [
        "for 循环",
        "过滤",
        "累加器",
        "continue"
      ],
      "steps": [
        "准备订单金额集合。",
        "跳过小于等于零的无效金额。",
        "将有效金额累加到总额。",
        "输出聚合结果。"
      ],
      "output": "有效订单总额：¥368.50",
      "snippets": {
        "python": {
          "code": "orders = [99.0, -1.0, 120.5, 0.0, 149.0]\ntotal = 0.0\n\nfor amount in orders:\n    if amount <= 0:\n        continue\n    total += amount\n\nprint(f\"有效订单总额：¥{total:.2f}\")",
          "note": "也可以使用 sum(amount for amount in orders if amount > 0)。"
        },
        "javascript": {
          "code": "const orders = [99.0, -1.0, 120.5, 0.0, 149.0];\nlet total = 0;\n\nfor (const amount of orders) {\n  if (amount <= 0) continue;\n  total += amount;\n}\n\nconsole.log(`有效订单总额：¥${total.toFixed(2)}`);",
          "note": "for...of 遍历值；for...in 更适合遍历对象键名。"
        },
        "java": {
          "code": "public class Main {\n    public static void main(String[] args) {\n        double[] orders = {99.0, -1.0, 120.5, 0.0, 149.0};\n        double total = 0;\n\n        for (double amount : orders) {\n            if (amount <= 0) continue;\n            total += amount;\n        }\n\n        System.out.printf(\"有效订单总额：¥%.2f%n\", total);\n    }\n}",
          "note": "增强 for 循环适合只读取集合元素的场景。"
        },
        "cpp": {
          "code": "#include <iomanip>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<double> orders{99.0, -1.0, 120.5, 0.0, 149.0};\n    double total = 0;\n\n    for (double amount : orders) {\n        if (amount <= 0) continue;\n        total += amount;\n    }\n\n    std::cout << std::fixed << std::setprecision(2)\n              << \"有效订单总额：¥\" << total << '\\n';\n}",
          "note": "范围 for 循环避免手动管理下标。"
        },
        "go": {
          "code": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    orders := []float64{99.0, -1.0, 120.5, 0.0, 149.0}\n    total := 0.0\n\n    for _, amount := range orders {\n        if amount <= 0 {\n            continue\n        }\n        total += amount\n    }\n\n    fmt.Printf(\"有效订单总额：¥%.2f\\n\", total)\n}",
          "note": "range 同时返回索引和值；用 _ 忽略不需要的索引。"
        },
        "rust": {
          "code": "fn main() {\n    let orders = [99.0, -1.0, 120.5, 0.0, 149.0];\n\n    let total: f64 = orders\n        .iter()\n        .filter(|&&amount| amount > 0.0)\n        .sum();\n\n    println!(\"有效订单总额：¥{total:.2}\");\n}",
          "note": "迭代器链将遍历、过滤和聚合组合为声明式流程。"
        }
      }
    },
    {
      "id": "functions",
      "group": "抽象",
      "title": "函数、参数与返回值",
      "subtitle": "把可复用规则封装起来",
      "goal": "实现一个可配置税率的价格计算函数。",
      "concepts": [
        "函数签名",
        "参数",
        "默认值",
        "返回值"
      ],
      "steps": [
        "定义原价与税率参数。",
        "验证价格和税率。",
        "返回含税价格。",
        "使用不同参数重复调用。"
      ],
      "output": "标准税率：¥108.00\n优惠税率：¥103.00",
      "snippets": {
        "python": {
          "code": "def price_with_tax(price: float, rate: float = 0.08) -> float:\n    if price < 0 or rate < 0:\n        raise ValueError(\"价格和税率不能为负\")\n    return price * (1 + rate)\n\nprint(f\"标准税率：¥{price_with_tax(100):.2f}\")\nprint(f\"优惠税率：¥{price_with_tax(100, 0.03):.2f}\")",
          "note": "类型标注用于文档和静态检查，不会自动限制运行时类型。"
        },
        "javascript": {
          "code": "function priceWithTax(price, rate = 0.08) {\n  if (price < 0 || rate < 0) {\n    throw new RangeError(\"价格和税率不能为负\");\n  }\n  return price * (1 + rate);\n}\n\nconsole.log(`标准税率：¥${priceWithTax(100).toFixed(2)}`);\nconsole.log(`优惠税率：¥${priceWithTax(100, 0.03).toFixed(2)}`);",
          "note": "JavaScript 支持默认参数，但不会静态检查参数类型。"
        },
        "java": {
          "code": "public class Main {\n    static double priceWithTax(double price, double rate) {\n        if (price < 0 || rate < 0) {\n            throw new IllegalArgumentException(\"价格和税率不能为负\");\n        }\n        return price * (1 + rate);\n    }\n\n    static double priceWithTax(double price) {\n        return priceWithTax(price, 0.08);\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"标准税率：¥%.2f%n\", priceWithTax(100));\n        System.out.printf(\"优惠税率：¥%.2f%n\", priceWithTax(100, 0.03));\n    }\n}",
          "note": "Java 通过方法重载模拟不同参数数量。"
        },
        "cpp": {
          "code": "#include <iomanip>\n#include <iostream>\n#include <stdexcept>\n\ndouble priceWithTax(double price, double rate = 0.08) {\n    if (price < 0 || rate < 0) {\n        throw std::invalid_argument(\"价格和税率不能为负\");\n    }\n    return price * (1 + rate);\n}\n\nint main() {\n    std::cout << std::fixed << std::setprecision(2);\n    std::cout << \"标准税率：¥\" << priceWithTax(100) << '\\n';\n    std::cout << \"优惠税率：¥\" << priceWithTax(100, 0.03) << '\\n';\n}",
          "note": "C++ 默认参数通常写在函数声明中。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nfunc priceWithTax(price, rate float64) (float64, error) {\n    if price < 0 || rate < 0 {\n        return 0, errors.New(\"价格和税率不能为负\")\n    }\n    return price * (1 + rate), nil\n}\n\nfunc main() {\n    standard, _ := priceWithTax(100, 0.08)\n    discount, _ := priceWithTax(100, 0.03)\n    fmt.Printf(\"标准税率：¥%.2f\\n\", standard)\n    fmt.Printf(\"优惠税率：¥%.2f\\n\", discount)\n}",
          "note": "Go 没有默认参数，常通过显式参数或配置结构体表达。"
        },
        "rust": {
          "code": "fn price_with_tax(price: f64, rate: f64) -> Result<f64, &'static str> {\n    if price < 0.0 || rate < 0.0 {\n        return Err(\"价格和税率不能为负\");\n    }\n    Ok(price * (1.0 + rate))\n}\n\nfn main() -> Result<(), &'static str> {\n    let standard = price_with_tax(100.0, 0.08)?;\n    let discount = price_with_tax(100.0, 0.03)?;\n    println!(\"标准税率：¥{standard:.2}\");\n    println!(\"优惠税率：¥{discount:.2}\");\n    Ok(())\n}",
          "note": "Result 将成功值和错误显式编码在返回类型中。"
        }
      }
    },
    {
      "id": "collections",
      "group": "数据组织",
      "title": "集合、映射与统计",
      "subtitle": "用键值结构完成频次统计",
      "goal": "统计一段文本中每个单词出现的次数。",
      "concepts": [
        "数组/列表",
        "哈希映射",
        "键值对",
        "排序"
      ],
      "steps": [
        "将文本拆分为单词序列。",
        "用映射保存单词与次数。",
        "遇到单词时将计数加一。",
        "按键排序后输出。"
      ],
      "output": "code: 3\nlearn: 2\nwrite: 1",
      "snippets": {
        "python": {
          "code": "from collections import Counter\n\nwords = \"code learn code write learn code\".split()\ncounts = Counter(words)\n\nfor word in sorted(counts):\n    print(f\"{word}: {counts[word]}\")",
          "note": "Counter 是专门用于计数的字典子类。"
        },
        "javascript": {
          "code": "const words = \"code learn code write learn code\".split(\" \");\nconst counts = new Map();\n\nfor (const word of words) {\n  counts.set(word, (counts.get(word) ?? 0) + 1);\n}\n\nfor (const word of [...counts.keys()].sort()) {\n  console.log(`${word}: ${counts.get(word)}`);\n}",
          "note": "Map 允许任意类型作为键，并保持插入顺序。"
        },
        "java": {
          "code": "import java.util.Map;\nimport java.util.TreeMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] words = \"code learn code write learn code\".split(\" \");\n        Map<String, Integer> counts = new TreeMap<>();\n\n        for (String word : words) {\n            counts.merge(word, 1, Integer::sum);\n        }\n\n        counts.forEach((word, count) ->\n            System.out.println(word + \": \" + count)\n        );\n    }\n}",
          "note": "TreeMap 会按键排序；merge 适合累加计数。"
        },
        "cpp": {
          "code": "#include <iostream>\n#include <map>\n#include <sstream>\n#include <string>\n\nint main() {\n    std::istringstream input(\"code learn code write learn code\");\n    std::map<std::string, int> counts;\n    std::string word;\n\n    while (input >> word) {\n        ++counts[word];\n    }\n\n    for (const auto& [key, count] : counts) {\n        std::cout << key << \": \" << count << '\\n';\n    }\n}",
          "note": "std::map 按键排序；std::unordered_map 更偏向哈希查找性能。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"fmt\"\n    \"sort\"\n    \"strings\"\n)\n\nfunc main() {\n    words := strings.Fields(\"code learn code write learn code\")\n    counts := map[string]int{}\n\n    for _, word := range words {\n        counts[word]++\n    }\n\n    keys := make([]string, 0, len(counts))\n    for key := range counts {\n        keys = append(keys, key)\n    }\n    sort.Strings(keys)\n\n    for _, key := range keys {\n        fmt.Printf(\"%s: %d\\n\", key, counts[key])\n    }\n}",
          "note": "Go 遍历 map 的顺序不保证稳定，因此输出前需要单独排序键。"
        },
        "rust": {
          "code": "use std::collections::BTreeMap;\n\nfn main() {\n    let mut counts = BTreeMap::new();\n\n    for word in \"code learn code write learn code\".split_whitespace() {\n        *counts.entry(word).or_insert(0) += 1;\n    }\n\n    for (word, count) in counts {\n        println!(\"{word}: {count}\");\n    }\n}",
          "note": "BTreeMap 按键排序；HashMap 更适合无需顺序的快速查找。"
        }
      }
    },
    {
      "id": "oop",
      "group": "抽象",
      "title": "对象、状态与行为",
      "subtitle": "封装一个可复用的银行账户模型",
      "goal": "定义账户，封装余额，并实现存款与取款操作。",
      "concepts": [
        "类/结构体",
        "构造",
        "封装",
        "方法"
      ],
      "steps": [
        "定义账户持有者和余额。",
        "通过构造函数创建有效对象。",
        "用方法修改内部状态。",
        "拒绝超过余额的取款。"
      ],
      "output": "Ada 的余额：¥850.00",
      "snippets": {
        "python": {
          "code": "class BankAccount:\n    def __init__(self, owner: str, balance: float = 0):\n        self.owner = owner\n        self._balance = balance\n\n    def deposit(self, amount: float) -> None:\n        if amount <= 0:\n            raise ValueError(\"存款必须大于零\")\n        self._balance += amount\n\n    def withdraw(self, amount: float) -> bool:\n        if amount <= 0 or amount > self._balance:\n            return False\n        self._balance -= amount\n        return True\n\n    @property\n    def balance(self) -> float:\n        return self._balance\n\naccount = BankAccount(\"Ada\", 1000)\naccount.withdraw(150)\nprint(f\"{account.owner} 的余额：¥{account.balance:.2f}\")",
          "note": "下划线表示约定上的内部属性；property 提供受控读取。"
        },
        "javascript": {
          "code": "class BankAccount {\n  #balance;\n\n  constructor(owner, balance = 0) {\n    this.owner = owner;\n    this.#balance = balance;\n  }\n\n  deposit(amount) {\n    if (amount <= 0) throw new RangeError(\"存款必须大于零\");\n    this.#balance += amount;\n  }\n\n  withdraw(amount) {\n    if (amount <= 0 || amount > this.#balance) return false;\n    this.#balance -= amount;\n    return true;\n  }\n\n  get balance() {\n    return this.#balance;\n  }\n}\n\nconst account = new BankAccount(\"Ada\", 1000);\naccount.withdraw(150);\nconsole.log(`${account.owner} 的余额：¥${account.balance.toFixed(2)}`);",
          "note": "#balance 是 JavaScript 的私有字段语法。"
        },
        "java": {
          "code": "public class Main {\n    static class BankAccount {\n        private final String owner;\n        private double balance;\n\n        BankAccount(String owner, double balance) {\n            this.owner = owner;\n            this.balance = balance;\n        }\n\n        boolean withdraw(double amount) {\n            if (amount <= 0 || amount > balance) return false;\n            balance -= amount;\n            return true;\n        }\n\n        double getBalance() {\n            return balance;\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount account = new BankAccount(\"Ada\", 1000);\n        account.withdraw(150);\n        System.out.printf(\"Ada 的余额：¥%.2f%n\", account.getBalance());\n    }\n}",
          "note": "private 字段通过公共方法暴露受控操作。"
        },
        "cpp": {
          "code": "#include <iomanip>\n#include <iostream>\n#include <string>\n\nclass BankAccount {\nprivate:\n    std::string owner_;\n    double balance_;\n\npublic:\n    BankAccount(std::string owner, double balance = 0)\n        : owner_(std::move(owner)), balance_(balance) {}\n\n    bool withdraw(double amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n\n    const std::string& owner() const { return owner_; }\n    double balance() const { return balance_; }\n};\n\nint main() {\n    BankAccount account(\"Ada\", 1000);\n    account.withdraw(150);\n    std::cout << std::fixed << std::setprecision(2)\n              << account.owner() << \" 的余额：¥\"\n              << account.balance() << '\\n';\n}",
          "note": "初始化列表用于构造成员；const 方法承诺不修改对象。"
        },
        "go": {
          "code": "package main\n\nimport \"fmt\"\n\ntype BankAccount struct {\n    Owner   string\n    balance float64\n}\n\nfunc NewBankAccount(owner string, balance float64) *BankAccount {\n    return &BankAccount{Owner: owner, balance: balance}\n}\n\nfunc (a *BankAccount) Withdraw(amount float64) bool {\n    if amount <= 0 || amount > a.balance {\n        return false\n    }\n    a.balance -= amount\n    return true\n}\n\nfunc (a BankAccount) Balance() float64 {\n    return a.balance\n}\n\nfunc main() {\n    account := NewBankAccount(\"Ada\", 1000)\n    account.Withdraw(150)\n    fmt.Printf(\"%s 的余额：¥%.2f\\n\", account.Owner, account.Balance())\n}",
          "note": "Go 没有 class；通过 struct、方法和包级可见性组合对象模型。"
        },
        "rust": {
          "code": "struct BankAccount {\n    owner: String,\n    balance: f64,\n}\n\nimpl BankAccount {\n    fn new(owner: impl Into<String>, balance: f64) -> Self {\n        Self { owner: owner.into(), balance }\n    }\n\n    fn withdraw(&mut self, amount: f64) -> bool {\n        if amount <= 0.0 || amount > self.balance {\n            return false;\n        }\n        self.balance -= amount;\n        true\n    }\n}\n\nfn main() {\n    let mut account = BankAccount::new(\"Ada\", 1000.0);\n    account.withdraw(150.0);\n    println!(\"{} 的余额：¥{:.2}\", account.owner, account.balance);\n}",
          "note": "impl 为结构体定义关联函数和方法；修改自身需要 &mut self。"
        }
      }
    },
    {
      "id": "errors",
      "group": "可靠性",
      "title": "错误处理与输入校验",
      "subtitle": "让失败路径成为程序设计的一部分",
      "goal": "安全地解析配置端口，并在失败时给出可读错误。",
      "concepts": [
        "异常/错误值",
        "输入校验",
        "失败传播",
        "默认值"
      ],
      "steps": [
        "读取字符串形式的配置。",
        "尝试转换为整数。",
        "验证端口范围。",
        "失败时输出明确原因。"
      ],
      "output": "配置错误：端口必须位于 1 到 65535 之间",
      "snippets": {
        "python": {
          "code": "def parse_port(raw: str) -> int:\n    try:\n        port = int(raw)\n    except ValueError as exc:\n        raise ValueError(\"端口必须是整数\") from exc\n\n    if not 1 <= port <= 65535:\n        raise ValueError(\"端口必须位于 1 到 65535 之间\")\n    return port\n\ntry:\n    print(parse_port(\"70000\"))\nexcept ValueError as error:\n    print(f\"配置错误：{error}\")",
          "note": "raise ... from ... 保留原始异常链。"
        },
        "javascript": {
          "code": "function parsePort(raw) {\n  const port = Number(raw);\n\n  if (!Number.isInteger(port)) {\n    throw new TypeError(\"端口必须是整数\");\n  }\n  if (port < 1 || port > 65535) {\n    throw new RangeError(\"端口必须位于 1 到 65535 之间\");\n  }\n  return port;\n}\n\ntry {\n  console.log(parsePort(\"70000\"));\n} catch (error) {\n  console.log(`配置错误：${error.message}`);\n}",
          "note": "可使用不同错误类型表达失败原因。"
        },
        "java": {
          "code": "public class Main {\n    static int parsePort(String raw) {\n        final int port;\n        try {\n            port = Integer.parseInt(raw);\n        } catch (NumberFormatException error) {\n            throw new IllegalArgumentException(\"端口必须是整数\", error);\n        }\n\n        if (port < 1 || port > 65535) {\n            throw new IllegalArgumentException(\n                \"端口必须位于 1 到 65535 之间\"\n            );\n        }\n        return port;\n    }\n\n    public static void main(String[] args) {\n        try {\n            System.out.println(parsePort(\"70000\"));\n        } catch (IllegalArgumentException error) {\n            System.out.println(\"配置错误：\" + error.getMessage());\n        }\n    }\n}",
          "note": "运行时异常适合调用方输入不合法的情况。"
        },
        "cpp": {
          "code": "#include <iostream>\n#include <stdexcept>\n#include <string>\n\nint parsePort(const std::string& raw) {\n    int port;\n    try {\n        port = std::stoi(raw);\n    } catch (const std::exception&) {\n        throw std::invalid_argument(\"端口必须是整数\");\n    }\n\n    if (port < 1 || port > 65535) {\n        throw std::out_of_range(\"端口必须位于 1 到 65535 之间\");\n    }\n    return port;\n}\n\nint main() {\n    try {\n        std::cout << parsePort(\"70000\") << '\\n';\n    } catch (const std::exception& error) {\n        std::cout << \"配置错误：\" << error.what() << '\\n';\n    }\n}",
          "note": "按 const 引用捕获异常可避免复制并保留多态。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc parsePort(raw string) (int, error) {\n    port, err := strconv.Atoi(raw)\n    if err != nil {\n        return 0, fmt.Errorf(\"端口必须是整数: %w\", err)\n    }\n    if port < 1 || port > 65535 {\n        return 0, fmt.Errorf(\"端口必须位于 1 到 65535 之间\")\n    }\n    return port, nil\n}\n\nfunc main() {\n    port, err := parsePort(\"70000\")\n    if err != nil {\n        fmt.Println(\"配置错误：\", err)\n        return\n    }\n    fmt.Println(port)\n}",
          "note": "Go 将错误作为普通返回值，并通过 %w 包装错误链。"
        },
        "rust": {
          "code": "fn parse_port(raw: &str) -> Result<u16, String> {\n    let port: u32 = raw\n        .parse()\n        .map_err(|_| \"端口必须是整数\".to_string())?;\n\n    if !(1..=65535).contains(&port) {\n        return Err(\"端口必须位于 1 到 65535 之间\".to_string());\n    }\n\n    Ok(port as u16)\n}\n\nfn main() {\n    match parse_port(\"70000\") {\n        Ok(port) => println!(\"{port}\"),\n        Err(error) => println!(\"配置错误：{error}\"),\n    }\n}",
          "note": "? 运算符用于提前传播错误；Result 强制调用方处理失败。"
        }
      }
    },
    {
      "id": "file-io",
      "group": "系统能力",
      "title": "文件读写与资源管理",
      "subtitle": "把程序数据持久化到磁盘",
      "goal": "写入学习记录，再读取并输出文件内容。",
      "concepts": [
        "文件路径",
        "文本编码",
        "资源关闭",
        "上下文管理"
      ],
      "steps": [
        "准备要保存的文本。",
        "以 UTF-8 编码写入文件。",
        "确保文件资源正确关闭。",
        "重新读取并验证内容。"
      ],
      "output": "已读取：今天学习了函数与错误处理。",
      "snippets": {
        "python": {
          "code": "from pathlib import Path\n\npath = Path(\"study-log.txt\")\npath.write_text(\"今天学习了函数与错误处理。\", encoding=\"utf-8\")\n\ncontent = path.read_text(encoding=\"utf-8\")\nprint(f\"已读取：{content}\")",
          "note": "pathlib 提供面向对象的路径与常用文件操作。"
        },
        "javascript": {
          "code": "// Node.js\nconst fs = require(\"node:fs/promises\");\n\nasync function main() {\n  const path = \"study-log.txt\";\n  await fs.writeFile(path, \"今天学习了函数与错误处理。\", \"utf8\");\n  const content = await fs.readFile(path, \"utf8\");\n  console.log(`已读取：${content}`);\n}\n\nmain().catch(console.error);",
          "note": "Promise 版本的文件 API 适合与 async/await 配合。"
        },
        "java": {
          "code": "import java.io.IOException;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        Path path = Path.of(\"study-log.txt\");\n        Files.writeString(\n            path,\n            \"今天学习了函数与错误处理。\",\n            StandardCharsets.UTF_8\n        );\n\n        String content = Files.readString(path, StandardCharsets.UTF_8);\n        System.out.println(\"已读取：\" + content);\n    }\n}",
          "note": "现代 Java 推荐使用 java.nio.file.Path 与 Files。"
        },
        "cpp": {
          "code": "#include <fstream>\n#include <iostream>\n#include <sstream>\n#include <stdexcept>\n\nint main() {\n    {\n        std::ofstream output(\"study-log.txt\");\n        if (!output) throw std::runtime_error(\"无法写入文件\");\n        output << \"今天学习了函数与错误处理。\";\n    }\n\n    std::ifstream input(\"study-log.txt\");\n    if (!input) throw std::runtime_error(\"无法读取文件\");\n\n    std::ostringstream buffer;\n    buffer << input.rdbuf();\n    std::cout << \"已读取：\" << buffer.str() << '\\n';\n}",
          "note": "文件流对象离开作用域时会通过 RAII 自动关闭资源。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"fmt\"\n    \"os\"\n)\n\nfunc main() {\n    path := \"study-log.txt\"\n    data := []byte(\"今天学习了函数与错误处理。\")\n\n    if err := os.WriteFile(path, data, 0644); err != nil {\n        panic(err)\n    }\n\n    content, err := os.ReadFile(path)\n    if err != nil {\n        panic(err)\n    }\n\n    fmt.Printf(\"已读取：%s\\n\", content)\n}",
          "note": "os.ReadFile 与 os.WriteFile 适合体积较小的完整文件。"
        },
        "rust": {
          "code": "use std::fs;\nuse std::io;\n\nfn main() -> io::Result<()> {\n    let path = \"study-log.txt\";\n    fs::write(path, \"今天学习了函数与错误处理。\")?;\n\n    let content = fs::read_to_string(path)?;\n    println!(\"已读取：{content}\");\n    Ok(())\n}",
          "note": "标准库 fs 模块提供便捷的完整文件读写函数。"
        }
      }
    },
    {
      "id": "json",
      "group": "数据组织",
      "title": "JSON 序列化与反序列化",
      "subtitle": "在程序对象和通用文本格式之间转换",
      "goal": "将用户对象转换为 JSON，再恢复为程序数据。",
      "concepts": [
        "序列化",
        "反序列化",
        "结构映射",
        "数据交换"
      ],
      "steps": [
        "定义用户数据结构。",
        "将对象序列化为 JSON 文本。",
        "输出或传输 JSON。",
        "将 JSON 反序列化并读取字段。"
      ],
      "output": "{\"name\":\"Ada\",\"level\":3}\n恢复用户：Ada，等级 3",
      "snippets": {
        "python": {
          "code": "import json\n\nuser = {\"name\": \"Ada\", \"level\": 3}\ntext = json.dumps(user, ensure_ascii=False, separators=(\",\", \":\"))\nprint(text)\n\nrestored = json.loads(text)\nprint(f\"恢复用户：{restored['name']}，等级 {restored['level']}\")",
          "note": "ensure_ascii=False 便于直接保留非 ASCII 字符。"
        },
        "javascript": {
          "code": "const user = { name: \"Ada\", level: 3 };\nconst text = JSON.stringify(user);\nconsole.log(text);\n\nconst restored = JSON.parse(text);\nconsole.log(`恢复用户：${restored.name}，等级 ${restored.level}`);",
          "note": "JSON 是 JavaScript 标准内建对象，无需额外依赖。"
        },
        "java": {
          "code": "// 需要 Jackson: com.fasterxml.jackson.core:jackson-databind\nimport com.fasterxml.jackson.databind.ObjectMapper;\n\nrecord User(String name, int level) {}\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        ObjectMapper mapper = new ObjectMapper();\n        User user = new User(\"Ada\", 3);\n\n        String text = mapper.writeValueAsString(user);\n        System.out.println(text);\n\n        User restored = mapper.readValue(text, User.class);\n        System.out.printf(\n            \"恢复用户：%s，等级 %d%n\",\n            restored.name(),\n            restored.level()\n        );\n    }\n}",
          "note": "Java 标准库未内置通用 JSON 映射，工程中常用 Jackson。"
        },
        "cpp": {
          "code": "// 需要 nlohmann/json\n#include <iostream>\n#include <nlohmann/json.hpp>\n\nint main() {\n    nlohmann::json user = {\n        {\"name\", \"Ada\"},\n        {\"level\", 3}\n    };\n\n    std::string text = user.dump();\n    std::cout << text << '\\n';\n\n    auto restored = nlohmann::json::parse(text);\n    std::cout << \"恢复用户：\"\n              << restored[\"name\"].get<std::string>()\n              << \"，等级 \"\n              << restored[\"level\"].get<int>()\n              << '\\n';\n}",
          "note": "nlohmann/json 是常用的单头文件 JSON 库。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype User struct {\n    Name  string `json:\"name\"`\n    Level int    `json:\"level\"`\n}\n\nfunc main() {\n    user := User{Name: \"Ada\", Level: 3}\n\n    data, _ := json.Marshal(user)\n    fmt.Println(string(data))\n\n    var restored User\n    _ = json.Unmarshal(data, &restored)\n    fmt.Printf(\"恢复用户：%s，等级 %d\\n\", restored.Name, restored.Level)\n}",
          "note": "结构体标签控制 JSON 字段名。"
        },
        "rust": {
          "code": "// Cargo.toml: serde + serde_json\nuse serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize)]\nstruct User {\n    name: String,\n    level: u32,\n}\n\nfn main() -> Result<(), serde_json::Error> {\n    let user = User {\n        name: \"Ada\".into(),\n        level: 3,\n    };\n\n    let text = serde_json::to_string(&user)?;\n    println!(\"{text}\");\n\n    let restored: User = serde_json::from_str(&text)?;\n    println!(\"恢复用户：{}，等级 {}\", restored.name, restored.level);\n    Ok(())\n}",
          "note": "Rust 生态通常使用 serde 统一处理多种数据格式。"
        }
      }
    },
    {
      "id": "concurrency",
      "group": "系统能力",
      "title": "并发任务与结果汇总",
      "subtitle": "同时执行多个独立任务",
      "goal": "并发获取三个模拟任务的结果，并按顺序汇总。",
      "concepts": [
        "线程/任务",
        "异步",
        "等待",
        "共享与隔离"
      ],
      "steps": [
        "把独立工作拆为多个任务。",
        "并发启动任务。",
        "等待全部任务完成。",
        "汇总结果并保持可预测顺序。"
      ],
      "output": "任务结果：[A 完成, B 完成, C 完成]",
      "snippets": {
        "python": {
          "code": "from concurrent.futures import ThreadPoolExecutor\nfrom time import sleep\n\ndef work(name: str) -> str:\n    sleep(0.1)\n    return f\"{name} 完成\"\n\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    results = list(pool.map(work, [\"A\", \"B\", \"C\"]))\n\nprint(f\"任务结果：{results}\")",
          "note": "线程池适合 I/O 密集任务；CPU 密集任务可考虑进程池。"
        },
        "javascript": {
          "code": "const work = (name) =>\n  new Promise((resolve) => {\n    setTimeout(() => resolve(`${name} 完成`), 100);\n  });\n\nasync function main() {\n  const results = await Promise.all([\n    work(\"A\"),\n    work(\"B\"),\n    work(\"C\"),\n  ]);\n  console.log(\"任务结果：\", results);\n}\n\nmain();",
          "note": "Promise.all 并发等待多个 Promise，并保持输入顺序。"
        },
        "java": {
          "code": "import java.util.List;\nimport java.util.concurrent.CompletableFuture;\n\npublic class Main {\n    static CompletableFuture<String> work(String name) {\n        return CompletableFuture.supplyAsync(() -> name + \" 完成\");\n    }\n\n    public static void main(String[] args) {\n        List<CompletableFuture<String>> tasks =\n            List.of(work(\"A\"), work(\"B\"), work(\"C\"));\n\n        List<String> results = tasks.stream()\n            .map(CompletableFuture::join)\n            .toList();\n\n        System.out.println(\"任务结果：\" + results);\n    }\n}",
          "note": "CompletableFuture 适合组织异步流水线与组合任务。"
        },
        "cpp": {
          "code": "#include <future>\n#include <iostream>\n#include <string>\n#include <vector>\n\nstd::string work(std::string name) {\n    return name + \" 完成\";\n}\n\nint main() {\n    std::vector<std::future<std::string>> tasks;\n    for (const std::string name : {\"A\", \"B\", \"C\"}) {\n        tasks.push_back(std::async(std::launch::async, work, name));\n    }\n\n    std::cout << \"任务结果：[\";\n    for (std::size_t i = 0; i < tasks.size(); ++i) {\n        if (i) std::cout << \", \";\n        std::cout << tasks[i].get();\n    }\n    std::cout << \"]\\n\";\n}",
          "note": "std::future 表示未来结果，get 会等待并取得结果。"
        },
        "go": {
          "code": "package main\n\nimport \"fmt\"\n\ntype result struct {\n    index int\n    text  string\n}\n\nfunc work(index int, name string, out chan<- result) {\n    out <- result{index: index, text: name + \" 完成\"}\n}\n\nfunc main() {\n    names := []string{\"A\", \"B\", \"C\"}\n    channel := make(chan result, len(names))\n    results := make([]string, len(names))\n\n    for index, name := range names {\n        go work(index, name, channel)\n    }\n\n    for range names {\n        item := <-channel\n        results[item.index] = item.text\n    }\n\n    fmt.Println(\"任务结果：\", results)\n}",
          "note": "goroutine 轻量；channel 用于在并发任务之间传递数据。"
        },
        "rust": {
          "code": "use std::thread;\n\nfn work(name: &'static str) -> String {\n    format!(\"{name} 完成\")\n}\n\nfn main() {\n    let handles: Vec<_> = [\"A\", \"B\", \"C\"]\n        .into_iter()\n        .map(|name| thread::spawn(move || work(name)))\n        .collect();\n\n    let results: Vec<_> = handles\n        .into_iter()\n        .map(|handle| handle.join().unwrap())\n        .collect();\n\n    println!(\"任务结果：{:?}\", results);\n}",
          "note": "thread::spawn 要求闭包拥有其捕获的数据，move 常用于转移所有权。"
        }
      }
    },
    {
      "id": "stack",
      "group": "数据结构",
      "title": "栈与括号匹配",
      "subtitle": "用后进先出结构解决语法检查",
      "goal": "判断一个包含三种括号的字符串是否配对正确。",
      "concepts": [
        "栈",
        "后进先出",
        "映射",
        "线性扫描"
      ],
      "steps": [
        "遇到左括号时压栈。",
        "遇到右括号时读取栈顶。",
        "检查括号类型是否匹配。",
        "扫描结束后确认栈为空。"
      ],
      "output": "{[()]} -> true\n{[(])} -> false",
      "snippets": {
        "python": {
          "code": "def is_valid(text: str) -> bool:\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    stack: list[str] = []\n\n    for char in text:\n        if char in pairs.values():\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n\n    return not stack\n\nprint(\"{[()]} ->\", is_valid(\"{[()]}\"))\nprint(\"{[(])} ->\", is_valid(\"{[(])}\"))",
          "note": "list 的 append 和 pop 可直接作为栈操作。"
        },
        "javascript": {
          "code": "function isValid(text) {\n  const pairs = new Map([\n    [\")\", \"(\"],\n    [\"]\", \"[\"],\n    [\"}\", \"{\"],\n  ]);\n  const stack = [];\n\n  for (const char of text) {\n    if ([...pairs.values()].includes(char)) {\n      stack.push(char);\n    } else if (pairs.has(char)) {\n      if (stack.pop() !== pairs.get(char)) return false;\n    }\n  }\n\n  return stack.length === 0;\n}\n\nconsole.log(\"{[()]} ->\", isValid(\"{[()]}\"));\nconsole.log(\"{[(])} ->\", isValid(\"{[(])}\"));",
          "note": "Array 的 push/pop 实现后进先出。"
        },
        "java": {
          "code": "import java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.Map;\n\npublic class Main {\n    static boolean isValid(String text) {\n        Map<Character, Character> pairs = Map.of(\n            ')', '(', ']', '[', '}', '{'\n        );\n        Deque<Character> stack = new ArrayDeque<>();\n\n        for (char ch : text.toCharArray()) {\n            if (pairs.containsValue(ch)) {\n                stack.push(ch);\n            } else if (pairs.containsKey(ch)) {\n                if (stack.isEmpty() || stack.pop() != pairs.get(ch)) {\n                    return false;\n                }\n            }\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"{[()]} -> \" + isValid(\"{[()]}\"));\n        System.out.println(\"{[(])} -> \" + isValid(\"{[(])}\"));\n    }\n}",
          "note": "ArrayDeque 通常比旧式 Stack 类更适合作为栈。"
        },
        "cpp": {
          "code": "#include <iostream>\n#include <stack>\n#include <string>\n#include <unordered_map>\n\nbool isValid(const std::string& text) {\n    const std::unordered_map<char, char> pairs{\n        {')', '('}, {']', '['}, {'}', '{'}\n    };\n    std::stack<char> stack;\n\n    for (char ch : text) {\n        if (ch == '(' || ch == '[' || ch == '{') {\n            stack.push(ch);\n        } else if (pairs.contains(ch)) {\n            if (stack.empty() || stack.top() != pairs.at(ch)) {\n                return false;\n            }\n            stack.pop();\n        }\n    }\n    return stack.empty();\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << \"{[()]} -> \" << isValid(\"{[()]}\") << '\\n';\n    std::cout << \"{[(])} -> \" << isValid(\"{[(])}\") << '\\n';\n}",
          "note": "std::stack 是容器适配器，只暴露栈所需操作。"
        },
        "go": {
          "code": "package main\n\nimport \"fmt\"\n\nfunc isValid(text string) bool {\n    pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}\n    stack := []rune{}\n\n    for _, char := range text {\n        switch char {\n        case '(', '[', '{':\n            stack = append(stack, char)\n        case ')', ']', '}':\n            if len(stack) == 0 || stack[len(stack)-1] != pairs[char] {\n                return false\n            }\n            stack = stack[:len(stack)-1]\n        }\n    }\n\n    return len(stack) == 0\n}\n\nfunc main() {\n    fmt.Println(\"{[()]} ->\", isValid(\"{[()]}\"))\n    fmt.Println(\"{[(])} ->\", isValid(\"{[(])}\"))\n}",
          "note": "切片追加和缩短可实现栈，不需要专门的标准库类型。"
        },
        "rust": {
          "code": "use std::collections::HashMap;\n\nfn is_valid(text: &str) -> bool {\n    let pairs = HashMap::from([\n        (')', '('),\n        (']', '['),\n        ('}', '{'),\n    ]);\n    let mut stack = Vec::new();\n\n    for ch in text.chars() {\n        match ch {\n            '(' | '[' | '{' => stack.push(ch),\n            ')' | ']' | '}' => {\n                if stack.pop() != pairs.get(&ch).copied() {\n                    return false;\n                }\n            }\n            _ => {}\n        }\n    }\n\n    stack.is_empty()\n}\n\nfn main() {\n    println!(\"{{[()]}} -> {}\", is_valid(\"{[()]}\"));\n    println!(\"{{[(])}} -> {}\", is_valid(\"{[(])}\"));\n}",
          "note": "Vec 的 push/pop 是 Rust 中最直接的栈实现。"
        }
      }
    },
    {
      "id": "http",
      "group": "网络",
      "title": "HTTP 请求与 API 数据",
      "subtitle": "从网络服务获取 JSON",
      "goal": "发送 GET 请求，检查状态码并读取 JSON 字段。",
      "concepts": [
        "HTTP 客户端",
        "异步 I/O",
        "状态码",
        "JSON"
      ],
      "steps": [
        "创建 HTTP 请求。",
        "发送请求并等待响应。",
        "检查请求是否成功。",
        "解析 JSON 并读取字段。"
      ],
      "output": "任务标题：delectus aut autem",
      "snippets": {
        "python": {
          "code": "from urllib.request import urlopen\nimport json\n\nurl = \"https://jsonplaceholder.typicode.com/todos/1\"\n\nwith urlopen(url, timeout=5) as response:\n    if response.status != 200:\n        raise RuntimeError(f\"HTTP {response.status}\")\n    data = json.load(response)\n\nprint(f\"任务标题：{data['title']}\")",
          "note": "urllib 属于标准库；大型项目也常使用 requests 或 httpx。"
        },
        "javascript": {
          "code": "const url = \"https://jsonplaceholder.typicode.com/todos/1\";\n\nasync function main() {\n  const response = await fetch(url);\n\n  if (!response.ok) {\n    throw new Error(`HTTP ${response.status}`);\n  }\n\n  const data = await response.json();\n  console.log(`任务标题：${data.title}`);\n}\n\nmain().catch(console.error);",
          "note": "现代浏览器与较新的 Node.js 都内置 fetch。"
        },
        "java": {
          "code": "// 需要 Jackson: com.fasterxml.jackson.core:jackson-databind\nimport java.net.URI;\nimport java.net.http.HttpClient;\nimport java.net.http.HttpRequest;\nimport java.net.http.HttpResponse;\nimport com.fasterxml.jackson.databind.ObjectMapper;\nimport com.fasterxml.jackson.databind.JsonNode;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        HttpClient client = HttpClient.newHttpClient();\n        HttpRequest request = HttpRequest.newBuilder()\n            .uri(URI.create(\n                \"https://jsonplaceholder.typicode.com/todos/1\"\n            ))\n            .GET()\n            .build();\n\n        HttpResponse<String> response = client.send(\n            request,\n            HttpResponse.BodyHandlers.ofString()\n        );\n\n        if (response.statusCode() != 200) {\n            throw new RuntimeException(\"HTTP \" + response.statusCode());\n        }\n\n        ObjectMapper mapper = new ObjectMapper();\n        JsonNode data = mapper.readTree(response.body());\n        System.out.println(\"任务标题：\" + data.get(\"title\").asText());\n    }\n}",
          "note": "Java 11 起标准库提供 java.net.http；JSON 解析可配合 Jackson。"
        },
        "cpp": {
          "code": "// 需要 libcurl\n#include <curl/curl.h>\n#include <iostream>\n#include <stdexcept>\n#include <string>\n\nsize_t writeCallback(\n    char* data,\n    size_t size,\n    size_t count,\n    void* output\n) {\n    auto* text = static_cast<std::string*>(output);\n    text->append(data, size * count);\n    return size * count;\n}\n\nint main() {\n    CURL* curl = curl_easy_init();\n    if (!curl) throw std::runtime_error(\"无法初始化 curl\");\n\n    std::string body;\n    curl_easy_setopt(\n        curl,\n        CURLOPT_URL,\n        \"https://jsonplaceholder.typicode.com/todos/1\"\n    );\n    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);\n    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &body);\n\n    CURLcode result = curl_easy_perform(curl);\n    curl_easy_cleanup(curl);\n\n    if (result != CURLE_OK) {\n        throw std::runtime_error(curl_easy_strerror(result));\n    }\n\n    std::cout << body << '\\n';\n}",
          "note": "C++ 标准库不内置 HTTP 客户端，常使用 libcurl 等库。"
        },
        "go": {
          "code": "package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n    \"net/http\"\n)\n\ntype Todo struct {\n    Title string `json:\"title\"`\n}\n\nfunc main() {\n    response, err := http.Get(\n        \"https://jsonplaceholder.typicode.com/todos/1\",\n    )\n    if err != nil {\n        panic(err)\n    }\n    defer response.Body.Close()\n\n    if response.StatusCode != http.StatusOK {\n        panic(response.Status)\n    }\n\n    var todo Todo\n    if err := json.NewDecoder(response.Body).Decode(&todo); err != nil {\n        panic(err)\n    }\n\n    fmt.Println(\"任务标题：\", todo.Title)\n}",
          "note": "Go 标准库同时提供 HTTP 与 JSON，适合直接编写网络服务。"
        },
        "rust": {
          "code": "// Cargo.toml: reqwest + tokio + serde\nuse serde::Deserialize;\n\n#[derive(Deserialize)]\nstruct Todo {\n    title: String,\n}\n\n#[tokio::main]\nasync fn main() -> Result<(), reqwest::Error> {\n    let todo = reqwest::get(\n        \"https://jsonplaceholder.typicode.com/todos/1\"\n    )\n    .await?\n    .error_for_status()?\n    .json::<Todo>()\n    .await?;\n\n    println!(\"任务标题：{}\", todo.title);\n    Ok(())\n}",
          "note": "Rust 常用 tokio 提供异步运行时，reqwest 提供高级 HTTP 客户端。"
        }
      }
    }
  ]
};
