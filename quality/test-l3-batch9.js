#!/usr/bin/env node
/**
 * test-l3-batch9.js — L2→L3 批量升级第九批测试（I16-A 验收）
 *
 * 对照计划书工作流 H（合同批量推广第九批）：
 *   - function.recursion（递归函数）与 collection.sort-search（排序、查找与去重）
 *     从纯文本 L2 升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：recursion → "120"（阶乘 fact(5)）；sort-search → "1 2 3 1"
 *   - 答案分布均衡；六语言可运行（verify 192/192）
 *
 * 运行：node quality/test-l3-batch9.js   退出码 0=通过
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

const rc = D2.concepts.find((c) => c.id === 'function.recursion');
const ss = D2.concepts.find((c) => c.id === 'collection.sort-search');
check('recursion 存在且显式 L3', !!rc && rc.level === 'L3');
check('sort-search 存在且显式 L3', !!ss && ss.level === 'L3');

console.log('—— 递归函数（同题：阶乘 fact(5) → 120）——');
const rcCodes = Object.fromEntries(Object.entries(rc.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 递归基例 + 递归步', /return 1 if n <= 1 else n \* fact\(n - 1\)/.test(rcCodes.python));
check('JS 递归表达式', /n <= 1 \? 1 : n \* fact\(n - 1\)/.test(rcCodes.javascript));
check('Java 用局部类实现自引用递归（lambda 无法自引用）', /class F/.test(rcCodes.java) && /new F\(\)\.fact\(5\)/.test(rcCodes.java));
check('C++ 用 std::function 递归 lambda', /std::function<int\(int\)>/.test(rcCodes.cpp) && /\[&\]/.test(rcCodes.cpp));
check('Go 先声明 var 再赋值（闭包自引用）', /var fact func\(int\) int/.test(rcCodes.go));
check('Rust main 内定义 fn 递归', /fn fact\(n: i32\) -> i32/.test(rcCodes.rust));
check('含缺基例反例', rc.errors.some((e) => /基例|栈溢出|RecursionError/.test(e)));
check('含深递归栈溢出反例', rc.errors.some((e) => /栈溢出|递归深度|爆栈/.test(e)));

console.log('—— 排序查找去重（同题：[3,1,2] → 1 2 3 1）——');
const ssCodes = Object.fromEntries(Object.entries(ss.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 原地 sort + in 查找', /nums\.sort\(\)/.test(ssCodes.python) && /2 in nums/.test(ssCodes.python));
check('JS 数值比较器（默认字典序陷阱）', /sort\(\(a, b\) => a - b\)/.test(ssCodes.javascript));
check('Java Arrays.sort + binarySearch', /Arrays\.sort/.test(ssCodes.java) && /binarySearch/.test(ssCodes.java));
check('C++ std::sort + binary_search', /std::sort/.test(ssCodes.cpp) && /binary_search/.test(ssCodes.cpp));
check('Go sort.Ints + SearchInts', /sort\.Ints/.test(ssCodes.go) && /SearchInts/.test(ssCodes.go));
check('Rust vec sort + contains', /nums\.sort\(\)/.test(ssCodes.rust) && /contains\(&2\)/.test(ssCodes.rust));
check('含 JS 字典序排序反例', ss.errors.some((e) => /字典序|10 排到 2/.test(e)));
check('含二分查找前置条件反例', ss.errors.some((e) => /已排序|未排序/.test(e)));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 23（21+2 新增）`, l3 === 23, `实际 ${l3}`);
check(`L4 = 9`, l4 === 9, `实际 ${l4}`);

console.log('—— 答案分布均衡（防猜题规律）——');
const allAns = [...(rc.exercises || []), ...(rc.transferExercises || []), ...(ss.exercises || []), ...(ss.transferExercises || [])].map((q) => q.answer);
const countByPos = [0, 0, 0, 0];
allAns.forEach((a) => { if (a < 4) countByPos[a]++; });
const maxPct = Math.max(...countByPos) / allAns.length;
check(`答案位置分布均衡（最大 ${(maxPct * 100).toFixed(0)}% < 45%）`, maxPct < 0.45, `分布 ${countByPos.join('/')}`);
check('每题选项 ≥ 3', [...(rc.exercises || []), ...(rc.transferExercises || []), ...(ss.exercises || []), ...(ss.transferExercises || [])].every((e) => e.options.length >= 3));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
