#!/usr/bin/env node
/**
 * test-l3-batch3.js — L2→L3 批量升级第三批测试（I10-B 验收）
 *
 * 对照计划书工作流 H（合同批量推广第三批）：
 *   - collection.set（集合）与 error.custom-types（自定义错误类型）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：collection.set → "3 true"；error.custom-types → "code: 100"
 *   - 答案分布均衡；六语言可运行（verify 90/90）
 *
 * 运行：node quality/test-l3-batch3.js   退出码 0=通过
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

console.log('—— collection.set（集合）——');
const cs = D2.concepts.find((x) => x.id === 'collection.set');
structChecks(cs, 'collection.set', '3 true');
check('Python 集合去重', /s = \{1, 2, 2, 3\}/.test(cs.variants.python.minimal_code) && /len\(s\)/.test(cs.variants.python.minimal_code));
check('JS 用 Set', /new Set\(\[1, 2, 2, 3\]\)/.test(cs.variants.javascript.minimal_code));
check('Go 用 map 模拟（无内置 set）', /map\[int\]bool/.test(cs.variants.go.minimal_code));
check('Rust 用 HashSet::from', /HashSet::from\(\[1, 2, 2, 3\]\)/.test(cs.variants.rust.minimal_code));

console.log('—— error.custom-types（自定义错误类型）——');
const ct = D2.concepts.find((x) => x.id === 'error.custom-types');
structChecks(ct, 'error.custom-types', 'code: 100');
check('Python 继承 ValueError + 错误码', /class DivByZeroError\(ValueError\)/.test(ct.variants.python.minimal_code) && /self\.code = 100/.test(ct.variants.python.minimal_code));
check('JS 继承 Error + code 字段', /extends Error/.test(ct.variants.javascript.minimal_code) && /this\.code = 100/.test(ct.variants.javascript.minimal_code));
check('Java 用方法内局部类', /class DivByZeroError extends RuntimeException/.test(ct.variants.java.minimal_code));
check('Go 错误携带错误码', /code=100/.test(ct.variants.go.minimal_code));
check('Rust 用 i32 错误码 Err 类型', /Result<i32, i32>/.test(ct.variants.rust.minimal_code));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 17（9+2+2 新增）`, l3 === 17, `实际 ${l3}`);
check(`L4 = 9（7+1 新增）`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
