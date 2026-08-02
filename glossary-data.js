// Code Atlas 2.0 — 术语百科（P9：统一术语表）
// 每个术语：中英文名、一句话定义、关联知识点（点击跳转）
window.CODE_ATLAS_GLOSSARY = {
  "terms": [
    { "term": "闭包", "en": "Closure", "def": "函数与其词法环境的组合，内层函数可访问外层变量。", "concept": "function.closure" },
    { "term": "所有权", "en": "Ownership", "def": "Rust 中每个值有唯一所有者，转移后原变量失效。", "concept": "value.binding" },
    { "term": "借用", "en": "Borrowing", "def": "用引用访问值而不转移所有权（&T / &mut T）。", "concept": "value.semantics" },
    { "term": "迭代器", "en": "Iterator", "def": "按协议逐个产生元素的抽象，for 循环的底层机制。", "concept": "collection.iteration" },
    { "term": "生成器", "en": "Generator", "def": "用 yield 惰性产出值的函数，内存恒定。", "concept": "control.comprehension" },
    { "term": "装饰器", "en": "Decorator", "def": "接收函数返回函数的高阶函数，@语法糖包装行为。", "concept": "function.higher-order" },
    { "term": "协程", "en": "Coroutine", "def": "用户态轻量并发单元，单线程可调度成千上万个。", "concept": "concurrency.models" },
    { "term": "通道", "en": "Channel", "def": "并发任务间传递消息的管道，避免共享可变状态。", "concept": "concurrency.channel" },
    { "term": "Promise", "en": "Promise", "def": "JS 中表示异步操作最终结果的对象。", "concept": "concurrency.future-promise" },
    { "term": "Future", "en": "Future", "def": "将来可得的异步结果占位符，支持组合与等待。", "concept": "concurrency.future-promise" },
    { "term": "Trait", "en": "Trait", "def": "Rust 定义共享行为的契约，替代继承的组合式抽象。", "concept": "model.interface-trait" },
    { "term": "接口", "en": "Interface", "def": "定义「能做什么」的契约，实现方提供「怎么做」。", "concept": "model.interface-trait" },
    { "term": "泛型", "en": "Generics", "def": "用类型参数编写适配多种类型的通用代码。", "concept": "generic.functions" },
    { "term": "类型擦除", "en": "Type Erasure", "def": "泛型类型仅编译期存在，运行时被替换（Java/JS）。", "concept": "generic.erasure" },
    { "term": "单态化", "en": "Monomorphization", "def": "为每个具体类型生成专门泛型代码，零运行时开销。", "concept": "generic.monomorphization" },
    { "term": "模式匹配", "en": "Pattern Matching", "def": "按结构匹配并解构值，Rust/Python 支持穷尽检查。", "concept": "control.match" },
    { "term": "异常", "en": "Exception", "def": "沿调用栈传播的错误对象，遇 try/catch 捕获。", "concept": "error.exception-vs-result" },
    { "term": "错误值", "en": "Error Value", "def": "把错误作为返回值显式处理（Go error / Rust Result）。", "concept": "error.exception-vs-result" },
    { "term": "RAII", "en": "RAII", "def": "资源获取即初始化，析构时自动释放资源。", "concept": "error.raii-defer" },
    { "term": "defer", "en": "Defer", "def": "Go 中注册函数返回时执行的清理调用，LIFO。", "concept": "error.raii-defer" },
    { "term": "垃圾回收", "en": "GC", "def": "自动回收无引用对象的内存管理机制。", "concept": "value.scope-lifetime" },
    { "term": "引用计数", "en": "Reference Counting", "def": "记录对象被引用次数，归零即回收（CPython/Swift）。", "concept": "value.scope-lifetime" },
    { "term": "GIL", "en": "GIL", "def": "全局解释器锁，限制 CPython 线程并行执行字节码。", "concept": "concurrency.models" },
    { "term": "事件循环", "en": "Event Loop", "def": "单线程调度异步任务的循环，JS/Python asyncio 核心。", "concept": "concurrency.sync-async" },
    { "term": "原型链", "en": "Prototype Chain", "def": "JS 对象通过 __proto__ 链接实现属性继承查找。", "concept": "model.inheritance" },
    { "term": "序列化", "en": "Serialization", "def": "把内存对象转为字节/文本以便存储或传输。", "concept": "io.serialization" },
    { "term": "依赖注入", "en": "DI", "def": "从外部传入依赖而非内部创建，便于替换与测试。", "concept": "test.mocks" },
    { "term": "幂等", "en": "Idempotent", "def": "重复执行结果相同的操作，可安全重试。", "concept": "net.http-methods" },
    { "term": "零值", "en": "Zero Value", "def": "Go 中变量声明即获得的默认值（0/\"\"/nil）。", "concept": "value.primitive-types" },
    { "term": "守卫式返回", "en": "Guard Clause", "def": "先处理边界提前返回，让主逻辑保持左对齐。", "concept": "control.early-return" }
  ]
};
