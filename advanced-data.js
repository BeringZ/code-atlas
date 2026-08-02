// Code Atlas 2.0 — 语言进阶数据（6 语言 × 10 专题，独立进阶目录）
// 依据《Code Atlas 2.0 产品策划与内容架构执行文档》P4/P5：语言机制与工程能力
window.CODE_ATLAS_ADVANCED = {
  "topics": [
  {
    "lang": "python",
    "no": "P01",
    "id": "python.p01",
    "title": "Python 数据模型",
    "core": "对象、类型、身份；特殊方法；协议驱动；属性查找；可调用对象",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P02",
    "id": "python.p02",
    "title": "容器与迭代协议",
    "core": "迭代器、生成器、yield、生成器表达式、itertools、惰性求值",
    "status": "detailed",
    "detail": {
      "explanation": "生成器函数（含 yield 的函数）不会一次性构建整个序列，而是按需产出元素，因此内存开销恒定。它与列表推导式不同：列表推导立即求值，生成器是惰性的，只能迭代一次。",
      "code": {
        "text": "def squares(n):\n    for i in range(n):\n        yield i * i\n\ns = squares(4)\nprint(next(s))   # 0\nprint(sum(s))    # 14（1+4+9）",
        "notes": [
          {
            "line": 1,
            "note": "含 yield 的函数变成生成器函数，调用不执行函数体，只返回生成器对象"
          },
          {
            "line": 2,
            "note": "每次 for 迭代到这里暂停，产出当前 i 的平方，下次从这继续"
          },
          {
            "line": 7,
            "note": "生成器是惰性的：这里才真正开始逐项产出"
          },
          {
            "line": 8,
            "note": "sum 会耗尽生成器；s 已被消费过 1 个元素，从 i=1 继续"
          }
        ]
      },
      "pitfalls": [
        "误以为生成器可以反复迭代——它是一次性的，遍历完再遍历得到空结果",
        "把 生成器表达式 (x for x in ...) 与 列表推导 [x for x in ...] 混用，前者是惰性对象、后者是列表"
      ],
      "exercise": {
        "question": "def gen():\\n    yield 1\\n    yield 2\\n\\nprint(sum(gen()))\\nprint(sum(gen())) 的结果是？",
        "options": [
          "3 与 0",
          "3 与 3",
          "1 与 2",
          "报错"
        ],
        "answer": 1,
        "feedback": "每次调用 gen() 都创建全新的生成器对象，两次 sum 都是 1+2=3。若复用一个生成器对象，第二次才是 0。"
      }
    }
  },
  {
    "lang": "python",
    "no": "P03",
    "id": "python.p03",
    "title": "函数式与装饰器",
    "core": "闭包、nonlocal、装饰器、参数化装饰器、functools、缓存",
    "status": "detailed",
    "detail": {
      "explanation": "装饰器本质是「接收函数、返回函数」的高阶函数。@decorator 只是语法糖，等价于 f = decorator(f)。理解闭包（内层函数捕获外层变量）是看懂装饰器的关键。",
      "code": {
        "text": "def timing(fn):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f\"{fn.__name__}: {time.perf_counter()-start:.4f}s\")\n        return result\n    return wrapper\n\n@timing\ndef work():\n    return 42",
        "notes": [
          {
            "line": 1,
            "note": "timing 接收原函数 fn"
          },
          {
            "line": 2,
            "note": "wrapper 是闭包：捕获外层 fn；*args/**kwargs 透传任意参数"
          },
          {
            "line": 4,
            "note": "先计时、再调用原函数、后输出耗时"
          },
          {
            "line": 8,
            "note": "返回 wrapper（未调用），真正的调用发生在 work() 时"
          },
          {
            "line": 11,
            "note": "@timing 等价于 work = timing(work)"
          }
        ]
      },
      "pitfalls": [
        "装饰后函数名与文档被替换——用 functools.wraps(fn) 保留元信息",
        "在装饰器里直接写死参数个数，导致无法装饰不同签名的函数——必须用 *args, **kwargs"
      ],
      "exercise": {
        "question": "装饰器 @timing 应用到 work 后，work.__name__ 的值是？",
        "options": [
          "\"work\"",
          "\"wrapper\"",
          "\"timing\"",
          "报错"
        ],
        "answer": 1,
        "feedback": "未用 @functools.wraps 时，work 已被替换为 wrapper 函数，__name__ 变成 \"wrapper\"。这是装饰器最常见的坑。"
      }
    }
  },
  {
    "lang": "python",
    "no": "P04",
    "id": "python.p04",
    "title": "上下文与资源",
    "core": "with、context manager、contextlib、异常边界、ExitStack",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P05",
    "id": "python.p05",
    "title": "描述符与元编程",
    "core": "property、descriptor、__getattribute__、metaclass、class decorator",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P06",
    "id": "python.p06",
    "title": "类型标注体系",
    "core": "typing、Protocol、Generic、TypeVar、Callable、mypy/pyright、渐进式类型",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P07",
    "id": "python.p07",
    "title": "并发模型",
    "core": "GIL、threading、multiprocessing、concurrent.futures、asyncio、TaskGroup",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P08",
    "id": "python.p08",
    "title": "包管理与发布",
    "core": "venv、pip、pyproject.toml、wheel、Poetry/uv、私有源、发布包",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P09",
    "id": "python.p09",
    "title": "性能与 CPython",
    "core": "引用计数、GC、字节码、性能剖析、C 扩展、NumPy 向量化",
    "status": "published"
  },
  {
    "lang": "python",
    "no": "P10",
    "id": "python.p10",
    "title": "生态路径",
    "core": "Web（FastAPI/Django）、数据（NumPy/Pandas）、自动化、AI 工程、CLI",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J01",
    "id": "javascript.j01",
    "title": "语言执行模型",
    "core": "执行上下文、词法环境、作用域链、提升、暂时性死区",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J02",
    "id": "javascript.j02",
    "title": "闭包与 this",
    "core": "闭包、this 绑定规则、箭头函数、call/apply/bind",
    "status": "detailed",
    "detail": {
      "explanation": "闭包是「函数 + 其词法环境」的组合：内层函数可以访问外层函数作用域中的变量，即使外层函数已经返回。这使函数可以「记住」创建时的状态，是模块模式与柯里化的基础。",
      "code": {
        "text": "function counter() {\n  let count = 0;\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst c = counter();\nconsole.log(c()); // 1\nconsole.log(c()); // 2",
        "notes": [
          {
            "line": 2,
            "note": "count 是 counter 的局部变量，但被返回的函数捕获"
          },
          {
            "line": 3,
            "note": "每次调用返回的新函数都引用同一个 count"
          },
          {
            "line": 9,
            "note": "counter 已返回，但 count 仍存活——这就是闭包"
          },
          {
            "line": 10,
            "note": "再次调用继续累加，证明状态被保留"
          }
        ]
      },
      "pitfalls": [
        "for 循环中用 var 声明变量再闭包捕获，全部指向同一个最终值——用 let 或立即执行函数解决",
        "认为闭包会「拷贝」变量值——实际是引用，变量变化闭包内可见"
      ],
      "exercise": {
        "question": "for (var i = 0; i < 3; i++) { arr.push(function(){ return i; }); } 之后 arr[0]() 的值是？",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "answer": 3,
        "feedback": "var 使 i 是函数级变量，三个闭包共享同一个 i，循环结束后 i=3，所以都返回 3。用 let 声明才能得到 0、1、2。"
      }
    }
  },
  {
    "lang": "javascript",
    "no": "J03",
    "id": "javascript.j03",
    "title": "原型与对象模型",
    "core": "prototype chain、class 语法糖、属性描述符、继承与组合",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J04",
    "id": "javascript.j04",
    "title": "异步与事件循环",
    "core": "调用栈、任务/微任务、Promise、async/await、并发控制",
    "status": "detailed",
    "detail": {
      "explanation": "JavaScript 是单线程的，通过事件循环调度异步任务。任务分两种：宏任务（setTimeout、I/O）与微任务（Promise.then、queueMicrotask）。每轮事件循环先清空微任务队列，再取一个宏任务执行。",
      "code": {
        "text": "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");\n// 输出顺序: A D C B",
        "notes": [
          {
            "line": 1,
            "note": "同步代码最先执行"
          },
          {
            "line": 2,
            "note": "setTimeout 回调是宏任务，即使 0ms 也要等本轮结束"
          },
          {
            "line": 3,
            "note": "Promise.then 是微任务，在同步代码后、宏任务前执行"
          },
          {
            "line": 5,
            "note": "顺序：A、D（同步）→ C（微任务）→ B（宏任务）"
          }
        ]
      },
      "pitfalls": [
        "误以为 setTimeout(..., 0) 立即执行——它至少等到宏任务队列轮到自己",
        "在微任务中不断产生新微任务会饿死宏任务（无限递归 Promise.then）"
      ],
      "exercise": {
        "question": "Promise.resolve().then(() => console.log(1)); setTimeout(() => console.log(2), 0); console.log(3); 的输出顺序？",
        "options": [
          "3 1 2",
          "1 3 2",
          "3 2 1",
          "2 3 1"
        ],
        "answer": 0,
        "feedback": "同步 3 先执行 → 微任务 then 输出 1 → 宏任务 setTimeout 输出 2。"
      }
    }
  },
  {
    "lang": "javascript",
    "no": "J05",
    "id": "javascript.j05",
    "title": "模块与工程构建",
    "core": "ESM、CommonJS、package.json、npm/pnpm、bundler、tree shaking",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J06",
    "id": "javascript.j06",
    "title": "浏览器平台",
    "core": "DOM、事件传播、Fetch、Storage、Web Components、Web Worker",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J07",
    "id": "javascript.j07",
    "title": "Node.js 平台",
    "core": "事件驱动、Buffer、Stream、EventEmitter、文件/网络服务、进程",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J08",
    "id": "javascript.j08",
    "title": "类型与可靠性",
    "core": "JSDoc、TypeScript 迁移、Schema 校验、ESLint、测试工具",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J09",
    "id": "javascript.j09",
    "title": "性能与内存",
    "core": "V8、隐藏类、GC、内存泄漏、渲染性能、性能面板",
    "status": "published"
  },
  {
    "lang": "javascript",
    "no": "J10",
    "id": "javascript.j10",
    "title": "元编程与安全",
    "core": "Proxy、Reflect、Symbol、迭代协议、原型污染、XSS/CSRF 基础",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A01",
    "id": "java.a01",
    "title": "JVM 与字节码",
    "core": "编译流程、类加载、字节码、JIT、运行时数据区",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A02",
    "id": "java.a02",
    "title": "面向对象深水区",
    "core": "继承、接口默认方法、内部类、record、sealed class、设计原则",
    "status": "detailed",
    "detail": {
      "explanation": "HashMap/HashSet 依赖 hashCode 定位桶、equals 判断相等。契约：equals 相等的对象 hashCode 必须相同；重写 equals 必须重写 hashCode，否则对象在集合中出现「找不到」的诡异行为。",
      "code": {
        "text": "@Override\npublic boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof Point p)) return false;\n    return x == p.x && y == p.y;\n}\n\n@Override\npublic int hashCode() {\n    return Objects.hash(x, y);\n}",
        "notes": [
          {
            "line": 3,
            "note": "同一引用直接相等，快速路径"
          },
          {
            "line": 4,
            "note": "instanceof 模式匹配：类型不符直接 false"
          },
          {
            "line": 5,
            "note": "比较业务字段"
          },
          {
            "line": 9,
            "note": "用相同字段生成 hashCode，保证与 equals 一致"
          }
        ]
      },
      "pitfalls": [
        "只重写 equals 不重写 hashCode——HashSet/HashMap 里 equals 永不被调用（桶都找不到）",
        "用可变字段参与 hashCode——对象放入集合后再修改字段，hashCode 变化导致无法删除"
      ],
      "exercise": {
        "question": "两个对象 equals 为 true 但 hashCode 不同，放入 HashSet 会发生什么？",
        "options": [
          "正常去重",
          "两个都保留（视为不同）",
          "抛出异常",
          "编译错误"
        ],
        "answer": 1,
        "feedback": "HashSet 先用 hashCode 定位桶，哈希不同就视为不同元素，两个「相等」对象都会保留，破坏去重语义。"
      }
    }
  },
  {
    "lang": "java",
    "no": "A03",
    "id": "java.a03",
    "title": "泛型系统",
    "core": "类型擦除、边界、通配符、PECS、泛型方法、桥接方法",
    "status": "detailed",
    "detail": {
      "explanation": "Java 泛型是编译期机制：编译器检查类型安全后，运行时擦除类型参数（List<String> 变为 List）。这带来兼容性，也带来无法 new T()、无法 instanceof T 等限制。",
      "code": {
        "text": "public class Box<T> {\n    private T value;\n    public Box(T value) { this.value = value; }\n    public T get() { return value; }\n}\n\nBox<String> box = new Box<>(\"hi\");\nString s = box.get(); // 编译期插入强转",
        "notes": [
          {
            "line": 1,
            "note": "T 是类型参数，运行时不存在"
          },
          {
            "line": 4,
            "note": "返回值 T 在运行时被替换为 Object 或上界，get() 处自动插入强转"
          },
          {
            "line": 7,
            "note": "菱形语法推断类型参数"
          },
          {
            "line": 8,
            "note": "赋值是编译期检查 + 字节码强转的结果"
          }
        ]
      },
      "pitfalls": [
        "试图 new T() / new T[] —— 类型参数在运行时已擦除，必须用 Class<T> 反射或工厂",
        "泛型静态字段（static T field）非法——静态成员不参与实例化，类型无法确定"
      ],
      "exercise": {
        "question": "List<String> list = new ArrayList<>(); list.add(\"a\"); 在运行时，list 中元素的类型是？",
        "options": [
          "String",
          "Object",
          "泛型被保留为 String",
          "无法添加"
        ],
        "answer": 1,
        "feedback": "运行时类型擦除后 List 只存 Object，String 的检查与强转都发生在编译期/字节码层。"
      }
    }
  },
  {
    "lang": "java",
    "no": "A04",
    "id": "java.a04",
    "title": "集合与 Stream",
    "core": "集合实现、迭代器、比较器、Stream、Collector、并行流",
    "status": "detailed",
    "detail": {
      "explanation": "Stream 提供声明式的集合处理管线：中间操作（map/filter/sorted）是惰性的，终端操作（collect/forEach/count）才触发执行。它让「过滤→转换→归约」的代码比 for 循环更聚焦于意图。",
      "code": {
        "text": "List<Book> cheap = books.stream()\n    .filter(b -> b.getPrice() < 50)\n    .sorted(Comparator.comparing(Book::getPrice))\n    .limit(5)\n    .toList();",
        "notes": [
          {
            "line": 1,
            "note": "stream() 创建流，不修改原集合"
          },
          {
            "line": 2,
            "note": "filter：保留价格低于 50 的书"
          },
          {
            "line": 3,
            "note": "sorted：按价格升序（方法引用 Comparator.comparing）"
          },
          {
            "line": 5,
            "note": "toList() 是终端操作，此时才真正执行整条管线"
          }
        ]
      },
      "pitfalls": [
        "忘记 Stream 只能用一次——终端操作后流已关闭，再操作抛 IllegalStateException",
        "在 filter 里做有副作用操作（打印、修改外部状态）——Stream 期望无副作用纯函数"
      ],
      "exercise": {
        "question": "List.of(3,1,2).stream().filter(n -> n > 1).map(n -> n * 10).toList() 的结果？",
        "options": [
          "[30, 20]",
          "[3, 1, 2]",
          "[30, 10, 20]",
          "[20, 30]"
        ],
        "answer": 2,
        "feedback": "filter 保留 3 和 2（大于 1），map 乘 10 得 30 和 20，保持原顺序 → [30, 20]。"
      }
    }
  },
  {
    "lang": "java",
    "no": "A05",
    "id": "java.a05",
    "title": "异常与资源",
    "core": "受检异常、非受检异常、异常设计、try-with-resources",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A06",
    "id": "java.a06",
    "title": "反射与注解",
    "core": "Class、反射调用、注解、处理器、动态代理、SPI",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A07",
    "id": "java.a07",
    "title": "并发编程",
    "core": "JMM、线程池、锁、volatile、原子类、CompletableFuture、虚拟线程",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A08",
    "id": "java.a08",
    "title": "构建与模块化",
    "core": "Maven/Gradle、依赖范围、JPMS、JAR、版本与发布",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A09",
    "id": "java.a09",
    "title": "GC 与性能",
    "core": "对象分配、GC 算法、JFR/JMC、线程转储、内存分析",
    "status": "published"
  },
  {
    "lang": "java",
    "no": "A10",
    "id": "java.a10",
    "title": "企业生态",
    "core": "JDBC、Spring Boot、依赖注入、Web、数据访问、测试与部署",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C01",
    "id": "cpp.c01",
    "title": "编译、链接与构建",
    "core": "预处理、编译单元、头文件、链接、ODR、CMake、ABI",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C02",
    "id": "cpp.c02",
    "title": "对象生命周期",
    "core": "存储期、构造/析构、复制、移动、临时对象、值类别",
    "status": "detailed",
    "detail": {
      "explanation": "右值引用 T&& 配合 std::move 让对象「窃取」资源而非深拷贝。移动构造/移动赋值在资源密集型类中可显著提升性能。注意：std::move 本身不移动任何东西，只是把对象标记为可移动，实际移动发生在移动构造函数中。",
      "code": {
        "text": "class Buffer {\npublic:\n    Buffer(Buffer&& other) noexcept\n        : data_(other.data_), size_(other.size_) {\n        other.data_ = nullptr;\n        other.size_ = 0;\n    }\n    // ...\nprivate:\n    char* data_;\n    size_t size_;\n};\n\nstd::vector<Buffer> v;\nv.push_back(Buffer(1024)); // 触发移动而非拷贝",
        "notes": [
          {
            "line": 3,
            "note": "移动构造函数：参数是右值引用"
          },
          {
            "line": 4,
            "note": "直接接管对方的指针，不做深拷贝"
          },
          {
            "line": 6,
            "note": "关键：把源对象置空，避免双重释放（析构时不删有效数据）"
          },
          {
            "line": 13,
            "note": "临时对象是右值，push_back 优先走移动构造"
          }
        ]
      },
      "pitfalls": [
        "忘记把源对象置空——移动后源析构时会双重释放或悬垂",
        "对常量对象调用 std::move 无效（const T&& 无法移动，退化为拷贝）"
      ],
      "exercise": {
        "question": "std::move(obj) 真正做了什么？",
        "options": [
          "立即移动对象内容",
          "把 obj 转换为右值引用，等待移动构造/赋值使用",
          "复制 obj",
          "释放 obj 资源"
        ],
        "answer": 1,
        "feedback": "std::move 只是 static_cast<T&&> 类型转换，不执行任何移动；真正的移动发生在移动构造函数或移动赋值运算符里。"
      }
    }
  },
  {
    "lang": "cpp",
    "no": "C03",
    "id": "cpp.c03",
    "title": "资源管理",
    "core": "RAII、智能指针、所有权、异常安全、Rule of 0/3/5",
    "status": "detailed",
    "detail": {
      "explanation": "RAII（资源获取即初始化）：把资源（内存、文件、锁）绑定到对象生命周期，析构时自动释放。std::unique_ptr 独占所有权、std::shared_ptr 共享所有权（引用计数），优先使用它们替代裸 new/delete。",
      "code": {
        "text": "void process() {\n    std::unique_ptr<Widget> w =\n        std::make_unique<Widget>();\n    w->start();\n    // 离开作用域，自动 delete\n}",
        "notes": [
          {
            "line": 2,
            "note": "unique_ptr：独占所有权，不可拷贝"
          },
          {
            "line": 3,
            "note": "make_unique 更安全：异常时不会泄漏（对比 new Widget）"
          },
          {
            "line": 5,
            "note": "函数返回时 w 析构，内部 Widget 自动释放——无需手动 delete"
          }
        ]
      },
      "pitfalls": [
        "在构造函数里 new、析构函数里 delete 的手写管理——漏掉异常路径就泄漏，用智能指针成员替代",
        "shared_ptr 循环引用（A 持 B、B 持 A）导致引用计数永不归零——用 weak_ptr 打破"
      ],
      "exercise": {
        "question": "unique_ptr 的哪条特性是它优于 shared_ptr 的核心？",
        "options": [
          "更快的引用计数",
          "独占所有权，无额外计数开销且语义清晰",
          "支持拷贝",
          "支持多线程共享"
        ],
        "answer": 1,
        "feedback": "unique_ptr 独占所有权：零引用计数开销、移动语义明确，是默认首选；需要共享时才用 shared_ptr。"
      }
    }
  },
  {
    "lang": "cpp",
    "no": "C04",
    "id": "cpp.c04",
    "title": "类型系统",
    "core": "const、引用、指针、类型推导、auto、decltype、转换",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C05",
    "id": "cpp.c05",
    "title": "模板与泛型",
    "core": "函数/类模板、特化、可变参数、concept、SFINAE、编译期计算",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C06",
    "id": "cpp.c06",
    "title": "STL 与算法",
    "core": "容器选择、迭代器类别、算法、Ranges、allocator、复杂度保证",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C07",
    "id": "cpp.c07",
    "title": "多态与抽象",
    "core": "虚函数、对象布局、接口、CRTP、variant、type erasure",
    "status": "detailed",
    "detail": {
      "explanation": "virtual 让派生类重写基类行为，通过基类指针/引用调用时动态分派到实际类型。虚函数表（vtable）在运行时决定调用目标，这也是多态的实现基础。基类析构函数应为 virtual，否则派生类析构不被调用。",
      "code": {
        "text": "class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Circle : public Shape {\n    double r_;\npublic:\n    double area() const override { return 3.14 * r_ * r_; }\n};\n\nvoid print(Shape& s) { std::cout << s.area(); }",
        "notes": [
          {
            "line": 3,
            "note": "纯虚函数 = 抽象接口，Shape 不能实例化"
          },
          {
            "line": 4,
            "note": "虚析构：通过基类指针删除派生对象时正确调用派生析构"
          },
          {
            "line": 8,
            "note": "override 关键字：编译器检查确实重写了基类虚函数"
          },
          {
            "line": 11,
            "note": "传入 Circle 时调用 Circle::area——运行时多态"
          }
        ]
      },
      "pitfalls": [
        "基类析构函数不是 virtual——delete 基类指针时只调用基类析构，派生类资源泄漏",
        "构造函数里调用虚函数——构造阶段虚表尚未完成，不会分派到派生类"
      ],
      "exercise": {
        "question": "基类析构函数未声明 virtual，用基类指针 delete 派生对象会怎样？",
        "options": [
          "编译错误",
          "派生类析构不被调用（未定义行为/资源泄漏）",
          "正常调用全部析构",
          "只调用派生类析构"
        ],
        "answer": 1,
        "feedback": "这是经典 UB：仅基类析构被调用，派生类成员（含动态资源）不会释放。多态基类必须声明 virtual 析构。"
      }
    }
  },
  {
    "lang": "cpp",
    "no": "C08",
    "id": "cpp.c08",
    "title": "并发与内存模型",
    "core": "thread、mutex、condition_variable、atomic、memory order、future",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C09",
    "id": "cpp.c09",
    "title": "底层与安全边界",
    "core": "未定义行为、对齐、字节序、内存布局、sanitizer、FFI",
    "status": "published"
  },
  {
    "lang": "cpp",
    "no": "C10",
    "id": "cpp.c10",
    "title": "性能工程",
    "core": "缓存友好、零成本抽象、benchmark、profiling、SIMD、编译器优化",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G01",
    "id": "go.g01",
    "title": "Go 类型与零值",
    "core": "命名类型、底层类型、零值、可比较性、转换、方法集",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G02",
    "id": "go.g02",
    "title": "Slice、Map 与内存",
    "core": "数组、slice header、append、容量、共享底层数组、map 行为",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G03",
    "id": "go.g03",
    "title": "接口模型",
    "core": "隐式实现、接口值、nil 陷阱、类型断言、类型 switch、组合",
    "status": "detailed",
    "detail": {
      "explanation": "Go 接口是隐式实现的：类型只要拥有接口要求的全部方法即自动满足接口，无需显式 implements。接口变量可持有任意满足类型，运行时用类型断言（x.(T)）或类型开关（switch v := x.(type)）取回具体类型。",
      "code": {
        "text": "type Writer interface { Write([]byte) (int, error) }\n\nfunc log(w Writer) {\n    if f, ok := w.(*os.File); ok {\n        fmt.Println(\"writing to file:\", f.Name())\n    }\n}",
        "notes": [
          {
            "line": 1,
            "note": "接口只声明方法集合"
          },
          {
            "line": 3,
            "note": "任何实现 Write 的类型都能传入"
          },
          {
            "line": 4,
            "note": "类型断言：ok 模式避免 panic"
          },
          {
            "line": 5,
            "note": "断言成功后才访问具体类型字段"
          }
        ]
      },
      "pitfalls": [
        "类型断言不加 ok 直接 x.(T)——失败时 panic；务必用逗号 ok 形式",
        "把 interface{}（空接口）当万能类型滥用——丢失类型信息，破坏可读性与性能"
      ],
      "exercise": {
        "question": "var v any = \"hi\"; n := v.(int) 会发生什么？",
        "options": [
          "n = 0",
          "panic（类型断言失败）",
          "n 为 nil",
          "编译错误"
        ],
        "answer": 1,
        "feedback": "any 底层是字符串而非 int，未用 ok 形式的断言直接 panic。安全写法：n, ok := v.(int)。"
      }
    }
  },
  {
    "lang": "go",
    "no": "G04",
    "id": "go.g04",
    "title": "错误设计",
    "core": "error、包装、errors.Is/As、哨兵错误、自定义错误、panic/recover",
    "status": "detailed",
    "detail": {
      "explanation": "defer 把调用推迟到函数返回时执行，多个 defer 按 LIFO（后进先出）顺序执行。参数在 defer 语句处立即求值（值拷贝），而函数体内变量的「最终值」要到执行时才可见。",
      "code": {
        "text": "func main() {\n    defer fmt.Println(\"1\")\n    defer fmt.Println(\"2\")\n    // 输出: 2 1\n\n    x := 1\n    defer fmt.Println(x)   // 打印 1（参数立即求值）\n    x = 2                  // 不影响上面 defer 的实参\n}",
        "notes": [
          {
            "line": 2,
            "note": "第一个 defer 注册"
          },
          {
            "line": 3,
            "note": "第二个 defer 注册，LIFO 所以它先执行"
          },
          {
            "line": 4,
            "note": "输出顺序：2 然后 1"
          },
          {
            "line": 7,
            "note": "实参 x 在 defer 语句时求值为 1，之后 x=2 不影响"
          }
        ]
      },
      "pitfalls": [
        "期望 defer 捕获变量最终值——若要延迟求值，用闭包 defer func(){ fmt.Println(x) }()",
        "在循环里 defer 大量资源关闭——全部推迟到函数结束，可能堆积；考虑用子函数封装"
      ],
      "exercise": {
        "question": "x := 10; defer func() { fmt.Println(x) }(); x = 20; 输出？",
        "options": [
          "10",
          "20",
          "编译错误",
          "不确定"
        ],
        "answer": 1,
        "feedback": "闭包延迟求值：defer 执行时读取 x 的当前值，此时 x 已是 20。若直接 defer fmt.Println(x) 则输出 10。"
      }
    }
  },
  {
    "lang": "go",
    "no": "G05",
    "id": "go.g05",
    "title": "Goroutine 与 Channel",
    "core": "调度、channel、select、关闭、fan-in/out、pipeline",
    "status": "detailed",
    "detail": {
      "explanation": "channel 是 goroutine 间的通信管道：发送与接收默认阻塞。无缓冲 channel 要求收发同时就绪（同步交接）；有缓冲 channel 在缓冲未满/非空时非阻塞。方向（<-chan / chan<-）在函数参数中可约束。",
      "code": {
        "text": "ch := make(chan int, 2)\nch <- 1\nch <- 2\n// ch <- 3  // 阻塞：缓冲已满\n\nv := <-ch // 取 1，缓冲腾出\nclose(ch)  // 关闭后只能收不能发",
        "notes": [
          {
            "line": 1,
            "note": "缓冲为 2 的 channel"
          },
          {
            "line": 2,
            "note": "发送 1：缓冲空，直接放入"
          },
          {
            "line": 5,
            "note": "缓冲满时发送会阻塞，直到有接收方取走"
          },
          {
            "line": 6,
            "note": "从缓冲取走一个，v = 1"
          },
          {
            "line": 7,
            "note": "close 后向它发送会 panic，接收可继续读完剩余缓冲"
          }
        ]
      },
      "pitfalls": [
        "向已关闭的 channel 发送 → panic；只有发送方应该 close",
        "忘记关闭 channel，接收方 range 死等 → 需要发送方确定所有发送完成后 close"
      ],
      "exercise": {
        "question": "ch := make(chan int, 1); ch <- 1; 再执行 ch <- 2 会发生什么？",
        "options": [
          "正常发送",
          "阻塞直到有接收方",
          "panic",
          "覆盖值 1"
        ],
        "answer": 1,
        "feedback": "缓冲已满（1/1），第二次发送阻塞，直到其他 goroutine 从 ch 接收腾出空间。"
      }
    }
  },
  {
    "lang": "go",
    "no": "G06",
    "id": "go.g06",
    "title": "Context 与并发治理",
    "core": "取消、超时、deadline、请求链路、泄漏防范、限流",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G07",
    "id": "go.g07",
    "title": "包与模块",
    "core": "package 设计、internal、Go Modules、workspace、版本与发布",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G08",
    "id": "go.g08",
    "title": "测试与工具链",
    "core": "table-driven test、benchmark、fuzz、race detector、vet、pprof",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G09",
    "id": "go.g09",
    "title": "运行时与性能",
    "core": "GC、逃逸分析、栈增长、调度器、内存分配、性能诊断",
    "status": "published"
  },
  {
    "lang": "go",
    "no": "G10",
    "id": "go.g10",
    "title": "服务端工程",
    "core": "net/http、中间件、JSON、数据库、gRPC、配置、可观测性、部署",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R01",
    "id": "rust.r01",
    "title": "所有权与借用",
    "core": "move、copy、borrow、可变借用、作用域、借用检查器",
    "status": "detailed",
    "detail": {
      "explanation": "每个值有唯一所有者；赋值/传参时所有权转移（move），原变量失效。这从编译期杜绝了悬垂指针与双重释放。需要共享时用引用 & 或克隆 clone（显式成本）。",
      "code": {
        "text": "let s1 = String::from(\"hello\");\nlet s2 = s1;          // s1 被移动，之后不可再用\n// println!(\"{}\", s1); // 编译错误：值已移动\n\nlet s3 = &s2;         // 借用：只读访问，s2 仍有效\nprintln!(\"{}\", s3);  // 借用结束",
        "notes": [
          {
            "line": 1,
            "note": "s1 拥有 String 的所有权"
          },
          {
            "line": 2,
            "note": "赋值移动所有权：s1 失效，s2 成为新所有者"
          },
          {
            "line": 3,
            "note": "编译器拒绝使用已移动的值——这是 Rust 的安全保证"
          },
          {
            "line": 5,
            "note": "& 借用：不转移所有权，s2 继续有效"
          }
        ]
      },
      "pitfalls": [
        "把 String 传给函数后还想继续用——传 &s 借用，或函数返回所有权",
        "对 Copy 类型（i32、bool）与 Move 类型（String、Vec）的行为差异不清楚：Copy 是隐式复制"
      ],
      "exercise": {
        "question": "let a = String::from(\"x\"); let b = a; println!(\"{}\", a); 会发生什么？",
        "options": [
          "打印 x",
          "编译错误（a 已移动）",
          "打印空串",
          "运行时 panic"
        ],
        "answer": 1,
        "feedback": "String 是 Move 类型：b = a 移动了所有权，a 不可再用，编译器直接报错——这正是 Rust 防止使用已释放内存的方式。"
      }
    }
  },
  {
    "lang": "rust",
    "no": "R02",
    "id": "rust.r02",
    "title": "生命周期",
    "core": "生命周期标注、省略规则、结构体生命周期、静态生命周期",
    "status": "detailed",
    "detail": {
      "explanation": "借用规则：同一时刻要么有任意多个不可变借用（&），要么只有一个可变借用（&mut）。生命周期标注（<'a>）描述引用之间存活时间的关系，帮助编译器确保引用不会悬垂。",
      "code": {
        "text": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nlet s1 = String::from(\"abc\");\nlet result;\n{\n    let s2 = String::from(\"xy\");\n    result = longest(&s1, &s2);\n} // s2 在这里被释放\n// println!(\"{}\", result); // 编译错误：result 可能悬垂",
        "notes": [
          {
            "line": 1,
            "note": "'a 统一两个参数与返回值的生命周期"
          },
          {
            "line": 8,
            "note": "result 可能指向 s2"
          },
          {
            "line": 9,
            "note": "s2 作用域结束被释放"
          },
          {
            "line": 10,
            "note": "编译器发现 result 的生命周期可能超过 s2——拒绝编译"
          }
        ]
      },
      "pitfalls": [
        "同时持有一个可变借用和多个不可变借用——违背借用规则，编译错误",
        "错误地把生命周期标注当成「选择」——它只是约束，真实存活范围由作用域决定"
      ],
      "exercise": {
        "question": "let mut v = vec![1, 2, 3]; let r = &v[0]; v.push(4); println!(\"{}\", r); 会发生什么？",
        "options": [
          "打印 1",
          "编译错误（不可变借用与可变借用共存）",
          "打印 4",
          "panic"
        ],
        "answer": 1,
        "feedback": "r 是不可变借用期间又执行 v.push（可变借用），违反借用规则，编译期直接报错。"
      }
    }
  },
  {
    "lang": "rust",
    "no": "R03",
    "id": "rust.r03",
    "title": "枚举与模式匹配",
    "core": "enum、Option、Result、match、if let、解构、穷尽性",
    "status": "detailed",
    "detail": {
      "explanation": "Rust 没有异常，错误用 Result<T, E> 显式返回：Ok(T) 表示成功、Err(E) 表示失败。? 运算符把错误向上传播（在返回 Result 的函数中），配合自定义错误类型可实现清晰的分层错误处理。",
      "code": {
        "text": "fn read_num(path: &str) -> Result<i32, String> {\n    let text = std::fs::read_to_string(path)\n        .map_err(|e| format!(\"读取失败: {e}\"))?;\n    let n: i32 = text.trim().parse()\n        .map_err(|_| \"内容不是数字\".to_string())?;\n    Ok(n)\n}",
        "notes": [
          {
            "line": 1,
            "note": "显式返回 Result，错误类型为 String（简单场景）"
          },
          {
            "line": 2,
            "note": "read_to_string 返回 Result，? 在 Err 时提前返回"
          },
          {
            "line": 3,
            "note": "map_err 把底层错误转换成业务错误信息"
          },
          {
            "line": 6,
            "note": "Ok(n) 包装成功值"
          }
        ]
      },
      "pitfalls": [
        "用 unwrap/expect 到处解包——生产代码遇到错误直接 panic；应在边界处处理或传播",
        "丢失底层错误上下文——map_err 时保留原始错误（如 source），便于排查"
      ],
      "exercise": {
        "question": "在返回 Result 的函数中使用 ? 对 Err 值会做什么？",
        "options": [
          "panic",
          "把 Err 返回给调用方（提前返回）",
          "忽略错误继续执行",
          "转为 None"
        ],
        "answer": 1,
        "feedback": "? 在 Err 时立即 return Err(...)，把错误传播给调用者；在 Ok 时解包出 T 继续执行。"
      }
    }
  },
  {
    "lang": "rust",
    "no": "R04",
    "id": "rust.r04",
    "title": "Trait 与泛型",
    "core": "trait、bound、关联类型、默认实现、trait object、单态化",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R05",
    "id": "rust.r05",
    "title": "迭代器与闭包",
    "core": "Iterator、适配器、惰性、闭包捕获、Fn/FnMut/FnOnce",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R06",
    "id": "rust.r06",
    "title": "智能指针与内部可变性",
    "core": "Box、Rc、Arc、Cell、RefCell、Weak、Deref/Drop",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R07",
    "id": "rust.r07",
    "title": "并发安全",
    "core": "Send/Sync、线程、Mutex/RwLock、channel、共享状态、无数据竞争",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R08",
    "id": "rust.r08",
    "title": "异步 Rust",
    "core": "Future、async/await、Pin、运行时、Tokio、并发与取消",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R09",
    "id": "rust.r09",
    "title": "宏与 Unsafe",
    "core": "声明宏、过程宏、unsafe 能力、裸指针、FFI、安全抽象",
    "status": "published"
  },
  {
    "lang": "rust",
    "no": "R10",
    "id": "rust.r10",
    "title": "Cargo 与工程化",
    "core": "crate、module、workspace、feature、测试、文档、发布、clippy",
    "status": "published"
  }
]
};
