#!/usr/bin/env node
/**
 * test-contract.js — L3/L4 结构合同 + L2 升级示范测试（I6-B 验收）
 *
 * 对照计划书工作流 H：
 *   - L4 硬性要求：六语言 variants + semantic_blocks + comparisonDimensions + errors + acceptanceTests + commonTask + transferExercises
 *   - L3 硬性要求：≥3 语言 variants + errors + comparisonDimensions
 *   - 示范升级（error.try-catch）：六语言同题「抛异常并捕获」输出 caught
 *
 * 运行：node quality/test-contract.js   退出码 0=通过
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
const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

console.log('—— L4 合同全员满足 ——');
const l4s = D2.concepts.filter((c) => c.level === 'L4');
check(`L4 概念 ≥ 3 个`, l4s.length >= 3, `实际 ${l4s.length}`);
const l4Ok = l4s.every((c) => {
  const v = c.variants || {};
  return LANG6.every((l) => v[l] && v[l].minimal_code && v[l].semantic_blocks && v[l].semantic_blocks.length)
    && (c.comparisonDimensions || []).length >= 4
    && (c.errors || []).length
    && (c.acceptanceTests || []).length
    && c.commonTask
    && (c.transferExercises || []).length;
});
check('全部 L4 满足八层合同', l4Ok, l4s.filter((c) => !(c.variants && LANG6.every((l) => c.variants[l]))).map((c) => c.id).join(','));

console.log('—— L3 合同与升级示范（error.try-catch）——');
const tc = D2.concepts.find((c) => c.id === 'error.try-catch');
check('error.try-catch 显式 level = L3', tc.level === 'L3', `实际 L${tc.level}`);
check('六语言 variants 齐全（含 semantic_blocks）', LANG6.every((l) => tc.variants && tc.variants[l] && tc.variants[l].minimal_code && tc.variants[l].semantic_blocks));
check('comparisonDimensions ≥ 3 维', (tc.comparisonDimensions || []).length >= 3);
check('反例 errors ≥ 3 个', (tc.errors || []).length >= 3, `实际 ${(tc.errors || []).length}`);
const code = Object.fromEntries(Object.entries(tc.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('同题语义：Python raise/except', /raise|except/.test(code.python));
check('同题语义：JS throw/catch', /throw|catch/.test(code.javascript));
check('同题语义：Go panic/recover', /panic|recover/.test(code.go));
check('同题语义：Rust catch_unwind', /catch_unwind/.test(code.rust));
const ansDist = [0, 0, 0, 0];
(tc.exercises || []).forEach((e) => { ansDist[e.answer]++; });
const maxPct = Math.max(...ansDist) / (tc.exercises || []).length;
check(`练习答案分布均衡（最大 ${(maxPct * 100).toFixed(0)}% ≤ 45%）`, maxPct <= 0.45, ansDist.join('/'));

console.log('—— 启发式 L3 概念补齐 comparisonDimensions ——');
const legacy = ['value.binding', 'control.conditionals', 'function.parameter-passing', 'collection.iteration', 'error.exception-vs-result', 'concurrency.spawn-await'];
const legacyOk = legacy.every((id) => {
  const c = D2.concepts.find((x) => x.id === id);
  return c && (c.comparisonDimensions || []).length >= 3;
});
check(`6 个既有 L3 概念均补齐比较矩阵维度`, legacyOk);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
