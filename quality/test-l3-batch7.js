#!/usr/bin/env node
/**
 * test-l3-batch7.js — L2→L3 批量升级第七批测试（I14-A 验收）
 *
 * 对照计划书工作流 H（合同批量推广第七批）：
 *   - collection.filter-map-reduce（过滤/映射/归约）与 collection.copy（深浅拷贝）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：filter-map-reduce → "20"；copy → "1"
 *   - 答案分布均衡；六语言可运行（verify 140/140）
 *
 * 运行：node quality/test-l3-batch7.js   退出码 0=通过
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

console.log('—— collection.filter-map-reduce（过滤/映射/归约）——');
const fm = D2.concepts.find((x) => x.id === 'collection.filter-map-reduce');
structChecks(fm, 'filter-map-reduce', '20');
check('JS 链式 filter/map/reduce', /\.filter\(/.test(fm.variants.javascript.minimal_code) && /\.reduce\(/.test(fm.variants.javascript.minimal_code));
check('Java 用 IntStream', /IntStream\.of/.test(fm.variants.java.minimal_code));
check('Rust 用迭代器链 + sum', /\.iter\(\)\.filter/.test(fm.variants.rust.minimal_code) && /\.sum\(\)/.test(fm.variants.rust.minimal_code));
check('Go 手写循环', /for _, x := range nums/.test(fm.variants.go.minimal_code));

console.log('—— collection.copy（深浅拷贝）——');
const cp = D2.concepts.find((x) => x.id === 'collection.copy');
structChecks(cp, 'collection.copy', '1');
check('Python 用 copy()', /a\.copy\(\)/.test(cp.variants.python.minimal_code));
check('JS 用 slice() 浅拷贝', /a\.slice\(\)/.test(cp.variants.javascript.minimal_code));
check('Java 用 clone()', /a\.clone\(\)/.test(cp.variants.java.minimal_code));
check('Go 用 copy() 函数', /copy\(b, a\)/.test(cp.variants.go.minimal_code));
check('Rust 用 clone()', /a\.clone\(\)/.test(cp.variants.rust.minimal_code));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 25（17+2 新增）`, l3 === 25, `实际 ${l3}`);
check(`L4 = 9`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
