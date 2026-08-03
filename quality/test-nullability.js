#!/usr/bin/env node
/**
 * test-nullability.js — 空值/可选类型 L4 八层样板测试（I5-A 验收）
 *
 * 对照计划书工作流 J（高风险主题精讲）：
 *   - 八层内容结构完整（同题任务/六语言 variants+语义块/比较矩阵/反例/迁移练习/验收）
 *   - 六语言 minimal_code 齐全且已真实运行验证（verify-concepts.js）
 *   - 练习答案位置分布均衡（无猜题规律）
 *
 * 运行：node quality/test-nullability.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'value.nullability');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

console.log('—— 八层结构 ——');
check('level = L4（高风险精讲）', c.level === 'L4', `实际 L${c.level}`);
check('同题任务（commonTask）存在且可断言', c.commonTask && c.commonTask.expectedOutput && c.commonTask.expectedOutput.result === 'missing');
check('结构化比较矩阵维度齐全（≥5 维）', (c.comparisonDimensions || []).length >= 5, `实际 ${(c.comparisonDimensions || []).length}`);
check('六语言 variants 齐全', ['python', 'javascript', 'java', 'cpp', 'go', 'rust'].every((l) => c.variants && c.variants[l] && c.variants[l].minimal_code));
check('每语言含语义块与差异说明', Object.values(c.variants || {}).every((v) => v.semantic_blocks && v.semantic_notes && v.semantic_notes.length));
check('反例（errors）≥ 4 个', (c.errors || []).length >= 4, `实际 ${(c.errors || []).length}`);
check('迁移练习 ≥ 2 个', (c.transferExercises || []).length >= 2, `实际 ${(c.transferExercises || []).length}`);
check('验收断言 ≥ 2 条', (c.acceptanceTests || []).length >= 2);

console.log('—— 练习答案分布（无猜题规律）——');
const allAns = [...(c.exercises || []), ...(c.transferExercises || [])].map((e) => e.answer);
const n = allAns.length;
const countByPos = [0, 0, 0, 0];
allAns.forEach((a) => { if (a < 4) countByPos[a]++; });
const maxPct = Math.max(...countByPos) / n;
check(`答案位置分布均衡（最大占比 ${(maxPct * 100).toFixed(0)}% < 45%）`, maxPct < 0.45, `分布 ${countByPos.join('/')}`);
check('每题选项 ≥ 3', [...(c.exercises || []), ...(c.transferExercises || [])].every((e) => e.options.length >= 3));

console.log('—— 六语言同题一致性（minimal_code 均含 missing 语义）——');
check('Python 用 get 默认值', /get\(/.test(c.variants.python.minimal_code));
check('JS 用 ?? 空值合并', /\?\?/.test(c.variants.javascript.minimal_code));
check('Java 用 getOrDefault', /getOrDefault/.test(c.variants.java.minimal_code));
check('C++ 用 find 判 end', /find\(/.test(c.variants.cpp.minimal_code));
check('Go 用 comma-ok', /, ok :=/.test(c.variants.go.minimal_code));
check('Rust 用 unwrap_or', /unwrap_or/.test(c.variants.rust.minimal_code));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
