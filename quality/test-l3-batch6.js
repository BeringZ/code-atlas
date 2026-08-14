#!/usr/bin/env node
/**
 * test-l3-batch6.js — L2→L3 批量升级第六批测试（I13-A 验收）
 *
 * 对照计划书工作流 H（合同批量推广第六批）：
 *   - string.index-slice（长度/索引/切片）与 string.builder（字符串构建器）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：index-slice → "5 ell"；builder → "abc"
 *   - 答案分布均衡；六语言可运行（verify 130/130）
 *
 * 运行：node quality/test-l3-batch6.js   退出码 0=通过
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

console.log('—— string.index-slice（长度/索引/切片）——');
const is = D2.concepts.find((x) => x.id === 'string.index-slice');
structChecks(is, 'string.index-slice', '5 ell');
check('C++ 用 substr(pos, count)', /substr\(1, 3\)/.test(is.variants.cpp.minimal_code));
check('Rust 用字节切片 &s[1..4]', /&s\[1\.\.4\]/.test(is.variants.rust.minimal_code));
check('Go 字符串切片', /s\[1:4\]/.test(is.variants.go.minimal_code));
check('含 Rust 中文切片 panic 反例', is.errors.some((e) => /Rust|panic/.test(e) && /字节|UTF-8/.test(e)));

console.log('—— string.builder（字符串构建器）——');
const sb = D2.concepts.find((x) => x.id === 'string.builder');
structChecks(sb, 'string.builder', 'abc');
check('Java 用 StringBuilder', /StringBuilder/.test(sb.variants.java.minimal_code) && /\.append/.test(sb.variants.java.minimal_code));
check('Go 用 strings.Builder', /strings\.Builder/.test(sb.variants.go.minimal_code) && /WriteString/.test(sb.variants.go.minimal_code));
check('Python 用 join', /"".join\(parts\)/.test(sb.variants.python.minimal_code));
check('含 O(n²) 循环拼接反例', sb.errors.some((e) => /O\(n²\)|临时对象/.test(e)));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 25（15+2 新增）`, l3 === 25, `实际 ${l3}`);
check(`L4 = 9`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
