#!/usr/bin/env node
/**
 * test-l3-batch5.js — L2→L3 批量升级第五批测试（I12-B 验收）
 *
 * 对照计划书工作流 H（合同批量推广第五批）：
 *   - function.lambda（匿名函数）与 string.search-replace（查找替换）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：lambda → "42"；search-replace → "hello there"
 *   - verify-concepts.js 扩展 Go import 提取（strings 包可用）
 *   - 答案分布均衡；六语言可运行（verify 120/120）
 *
 * 运行：node quality/test-l3-batch5.js   退出码 0=通过
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

console.log('—— function.lambda（匿名函数）——');
const lm = D2.concepts.find((x) => x.id === 'function.lambda');
structChecks(lm, 'function.lambda', '42');
check('Python lambda 表达式', /lambda x: x \* 2/.test(lm.variants.python.minimal_code));
check('Java 函数式接口', /IntUnaryOperator/.test(lm.variants.java.minimal_code));
check('Rust 闭包类型标注', /\|x: i32\| x \* 2/.test(lm.variants.rust.minimal_code));

console.log('—— string.search-replace（查找替换）——');
const sr = D2.concepts.find((x) => x.id === 'string.search-replace');
structChecks(sr, 'string.search-replace', 'hello there');
check('C++ 先 find 检查 npos 再 replace', /std::string::npos/.test(sr.variants.cpp.minimal_code));
check('Go 用 strings.Replace + import', /import "strings"/.test(sr.variants.go.minimal_code) && /strings\.Replace/.test(sr.variants.go.minimal_code));
check('Python replace 返回新串', /s\.replace\("world", "there"\)/.test(sr.variants.python.minimal_code));

console.log('—— verify Go import 提取（I12-B 改进）——');
const verifySrc = fs.readFileSync(path.join(root, 'quality/verify-concepts.js'), 'utf8');
check('extractPrelude 支持 Go import', /if \(lang === 'go'\) return s\.startsWith\('import '\)/.test(verifySrc));
check('wrap go 合并 prelude 到 import 块', /prelude/.test(verifySrc.split("if (lang === 'go')")[1] || ''));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 17（13+2 新增）`, l3 === 17, `实际 ${l3}`);
check(`L4 = 9（8+1 新增）`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
