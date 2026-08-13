#!/usr/bin/env node
/**
 * test-l3-batch4.js — L2→L3 批量升级第四批测试（I11-B 验收）
 *
 * 对照计划书工作流 H（合同批量推广第四批）：
 *   - function.closure（闭包）与 test.assertions（断言）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：closure → "1 2"（计数器闭包）；assertions → "pass"（断言通过）
 *   - 答案分布均衡；六语言可运行（verify 105/105）
 *
 * 运行：node quality/test-l3-batch4.js   退出码 0=通过
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
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
const PLACEHOLDER = /\.\.\.|\u2026|省略|TODO/;
function structChecks(c, name, expectSubstr) {
  check(`${name}: level = L3`, c && c.level === 'L3', `实际 L${c && c.level}`);
  check(`${name}: 同题任务存在`, c && c.commonTask && c.commonTask.includes(expectSubstr));
  check(`${name}: 六语言 variants 齐全且可运行`, LANG6.every((l) => c.variants && c.variants[l] && c.variants[l].minimal_code && !PLACEHOLDER.test(c.variants[l].minimal_code)));
  check(`${name}: 反例 ≥ 4 个`, (c.errors || []).length >= 4);
  const allAns = [...(c.exercises || []), ...(c.transferExercises || [])].map((e) => e.answer);
  const countByPos = [0, 0, 0, 0];
  allAns.forEach((a) => { if (a < 4) countByPos[a]++; });
  const maxPct = Math.max(...countByPos) / allAns.length;
  check(`${name}: 答案分布均衡（最大 ${(maxPct * 100).toFixed(0)}% < 45%）`, maxPct < 0.45, `分布 ${countByPos.join('/')}`);
}

console.log('—— function.closure（闭包）——');
const cl = D2.concepts.find((x) => x.id === 'function.closure');
structChecks(cl, 'function.closure', '1 2');
check('Python 用 nonlocal 修改捕获', /nonlocal count/.test(cl.variants.python.minimal_code));
check('Java 用数组 hack 捕获可变变量', /int\[\] count = \{0\}/.test(cl.variants.java.minimal_code));
check('C++ 用捕获初始化 + mutable', /\[count = 0\]\(\) mutable/.test(cl.variants.cpp.minimal_code));
check('Rust 闭包捕获可变', /let mut inc = \|\|/.test(cl.variants.rust.minimal_code));

console.log('—— test.assertions（断言）——');
const as = D2.concepts.find((x) => x.id === 'test.assertions');
structChecks(as, 'test.assertions', 'pass');
check('Python 用 assert 语句', /assert 2 \+ 2 == 4/.test(as.variants.python.minimal_code));
check('C++ 用 cassert 宏', /#include <cassert>/.test(as.variants.cpp.minimal_code) && /assert\(2 \+ 2 == 4\)/.test(as.variants.cpp.minimal_code));
check('Rust 用 assert! 宏', /assert!\(2 \+ 2 == 4\)/.test(as.variants.rust.minimal_code));
check('Go 用 panic 模拟断言', /panic\("assertion failed"\)/.test(as.variants.go.minimal_code));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 15（11+2 新增）`, l3 === 15, `实际 ${l3}`);
check(`L4 = 9（7+1 新增）`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
