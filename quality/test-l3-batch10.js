#!/usr/bin/env node
/**
 * test-l3-batch10.js — L2→L3 批量升级第十批测试（I17-A 验收）
 *
 * 对照计划书工作流 H（合同批量推广第十批）：
 *   - concurrency.channel（Channel / 消息队列）与 function.higher-order（高阶函数与回调）
 *     从纯文本 L2 升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：channel → "42"；higher-order → "10"
 *   - 答案分布均衡；六语言可运行（verify 204/204）
 *
 * 运行：node quality/test-l3-batch10.js   退出码 0=通过
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
['concept-data.js', 'concepts-supplement.js'].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
});
const D2 = sandbox.window.CODE_ATLAS_2;

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? ' — ' + detail : ''}`); }
}

const ch = D2.concepts.find((c) => c.id === 'concurrency.channel');
const ho = D2.concepts.find((c) => c.id === 'function.higher-order');
check('channel 存在且显式 L3', !!ch && ch.level === 'L3');
check('higher-order 存在且显式 L3', !!ho && ho.level === 'L3');

console.log('—— Channel / 消息队列（同题：发送 42 → 接收输出）——');
const chCodes = Object.fromEntries(Object.entries(ch.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Go 原生 channel（make/<-/go）', /make\(chan int\)/.test(chCodes.go) && /ch <- 42/.test(chCodes.go) && /<-ch/.test(chCodes.go));
check('Rust mpsc（tx/rx）', /mpsc::channel/.test(chCodes.rust) && /tx\.send\(42\)/.test(chCodes.rust) && /rx\.recv\(\)/.test(chCodes.rust));
check('Java BlockingQueue（put/take）', /LinkedBlockingQueue/.test(chCodes.java) && /q\.put\(42\)/.test(chCodes.java) && /q\.take\(\)/.test(chCodes.java));
check('Python queue（put/get）', /queue\.Queue/.test(chCodes.python) && /q\.put\(42\)/.test(chCodes.python) && /q\.get\(\)/.test(chCodes.python));
check('C++ promise/future 消息传递', /std::promise<int>/.test(chCodes.cpp) && /set_value\(42\)/.test(chCodes.cpp) && /f\.get\(\)/.test(chCodes.cpp));
check('JS Promise 异步传递', /Promise\.resolve\(42\)/.test(chCodes.javascript) && /\.then/.test(chCodes.javascript));
check('含关闭后发送反例', ch.errors.some((e) => /close|panic|关闭/.test(e)));
check('含死锁/阻塞反例', ch.errors.some((e) => /阻塞|死锁|无消费者/.test(e)));

console.log('—— 高阶函数与回调（同题：apply(double, 5) → 10）——');
const hoCodes = Object.fromEntries(Object.entries(ho.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 函数作参数', /def apply\(f, x\)/.test(hoCodes.python) && /lambda v: v \* 2/.test(hoCodes.python));
check('JS 箭头函数高阶', /\(f, x\) => f\(x\)/.test(hoCodes.javascript));
check('Java Function 接口', /Function<Integer, Integer>/.test(hoCodes.java) && /\.apply\(5\)/.test(hoCodes.java));
check('C++ 泛型 lambda 高阶', /apply = \[\]\(auto f, auto x\)/.test(hoCodes.cpp));
check('Go 函数类型参数', /func\(int\) int/.test(hoCodes.go) && /apply\(func\(v int\) int/.test(hoCodes.go));
check('Rust Fn 约束泛型', /F: Fn\(i32\) -> i32/.test(hoCodes.rust));
check('含回调地狱反例', ho.errors.some((e) => /回调地狱|嵌套/.test(e)));
check('含类型签名缺失反例', ho.errors.some((e) => /类型签名|TypeError|编译期/.test(e)));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 25（23+2 新增）`, l3 === 25, `实际 ${l3}`);
check(`L4 = 9`, l4 === 9, `实际 ${l4}`);

console.log('—— 答案分布均衡（防猜题规律）——');
const allAns = [...(ch.exercises || []), ...(ch.transferExercises || []), ...(ho.exercises || []), ...(ho.transferExercises || [])].map((q) => q.answer);
const countByPos = [0, 0, 0, 0];
allAns.forEach((a) => { if (a < 4) countByPos[a]++; });
const maxPct = Math.max(...countByPos) / allAns.length;
check(`答案位置分布均衡（最大 ${(maxPct * 100).toFixed(0)}% < 45%）`, maxPct < 0.45, `分布 ${countByPos.join('/')}`);
check('每题选项 ≥ 3', [...(ch.exercises || []), ...(ch.transferExercises || []), ...(ho.exercises || []), ...(ho.transferExercises || [])].every((e) => e.options.length >= 3));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
