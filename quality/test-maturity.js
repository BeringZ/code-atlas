#!/usr/bin/env node
/**
 * test-maturity.js — L3/L4 数据事实化 + 合同批量升级示范测试（I7-B 验收）
 *
 * 对照计划书工作流 H（合同推广机制）：
 *   - level 必须是数据事实：显式 L3/L4 概念全部可运行（无伪代码）
 *   - 启发式降级为候选提示（check-data notes 列出待升级概念）
 *   - 示范升级 concurrency.spawn-await → L3（六语言可运行同题）
 *
 * 运行：node quality/test-maturity.js   退出码 0=通过
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

console.log('—— 显式 level 数据事实化 ——');
const explicit = D2.concepts.filter((c) => c.level === 'L3' || c.level === 'L4');
check('显式 L3/L4 共 12 个（7 L3 + 5 L4）', explicit.length === 12, `实际 ${explicit.length}`);
check('L3 含 try-catch（此前显式）', D2.concepts.some((c) => c.id === 'error.try-catch' && c.level === 'L3'));
check('L3 含 spawn-await（I7 示范升级）', D2.concepts.some((c) => c.id === 'concurrency.spawn-await' && c.level === 'L3'));
check('L4 含 mutability/conversion/nullability/unicode', ['value.mutability', 'value.conversion', 'value.nullability', 'string.unicode'].every((id) => D2.concepts.some((c) => c.id === id && c.level === 'L4')));

console.log('—— I8-A：5 个候选概念可运行化升 L3（虚标修复后真升级）——');
const pseudoIds = ['value.binding', 'control.conditionals', 'function.parameter-passing', 'collection.iteration', 'error.exception-vs-result'];
const pseudo = D2.concepts.filter((c) => pseudoIds.includes(c.id));
check('5 个候选概念全部显式升 L3', pseudo.every((c) => c.level === 'L3'), `实际 ${pseudo.filter((c) => c.level !== 'L3').map((c) => c.id).join(',') || '无'}`);
check('六语言 minimal_code 齐全且无占位符', pseudo.every((c) => LANG6.every((l) => c.variants && c.variants[l] && c.variants[l].minimal_code && !PLACEHOLDER.test(c.variants[l].minimal_code))));
check('语义块齐全', pseudo.every((c) => LANG6.every((l) => c.variants[l].semantic_blocks && c.variants[l].semantic_blocks.length > 0)));
check('conditionals 同题输出 B（if/elif 分支）', /score = 75/.test(pseudo.find((c) => c.id === 'control.conditionals').variants.python.minimal_code));
check('exception-vs-result 含异常/错误处理', /ZeroDivisionError|throw|Error|error/.test(pseudo.find((c) => c.id === 'error.exception-vs-result').variants.python.minimal_code));

console.log('—— spawn-await 示范升级（六语言可运行）——');
const sa = D2.concepts.find((c) => c.id === 'concurrency.spawn-await');
check('六语言 minimal_code 齐全', LANG6.every((l) => sa.variants && sa.variants[l] && sa.variants[l].minimal_code));
check('六语言代码均无占位符', LANG6.every((l) => !PLACEHOLDER.test(sa.variants[l].minimal_code)));
check('Go 用 channel 同步（无需 import sync）', /chan/.test(sa.variants.go.minimal_code));
check('Rust 用 thread::spawn + join', /thread::spawn/.test(sa.variants.rust.minimal_code) && /join/.test(sa.variants.rust.minimal_code));
check('Java 用 Thread + join', /new Thread/.test(sa.variants.java.minimal_code) && /join/.test(sa.variants.java.minimal_code));
check('语义块存在', LANG6.every((l) => sa.variants[l].semantic_blocks && sa.variants[l].semantic_blocks.length > 0));

console.log('—— check-data 候选提示机制 ——');
const checkSrc = fs.readFileSync(path.join(root, 'quality/check-data.js'), 'utf8');
check('check-data 含候选提示逻辑', /l3Candidates/.test(checkSrc) && /需 verify 可运行验证后显式升级/.test(checkSrc));
const atlasSrc = fs.readFileSync(path.join(root, 'atlas.js'), 'utf8');
check('atlas.js 与 check-data 启发式一致（只提示不标注）', /l3Candidates/.test(atlasSrc) && !/c\.level = hasVariants/.test(atlasSrc));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
