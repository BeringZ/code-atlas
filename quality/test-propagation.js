#!/usr/bin/env node
/**
 * test-propagation.js — 错误传播模式 L4 八层样板测试（I10-A 验收）
 *
 * 对照计划书工作流 J（高风险主题：错误传播模式）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js 80/80）
 *   - 同题一致性：除零错误跨层传播 + 上下文包装（输出含 compute failed）
 *   - 六语言惯用法：raise...from / throw cause / RuntimeException cause / runtime_error 链 /
 *     fmt.Errorf %w / ? + map_err
 *
 * 运行：node quality/test-propagation.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'error.propagation');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
const PLACEHOLDER = /\.\.\.|\u2026|省略|TODO/;

console.log('—— 八层结构 ——');
check('level = L4', c && c.level === 'L4', `实际 L${c && c.level}`);
check('module_id = B09（错误处理）', c && c.module_id === 'B09');
check('同题任务存在（输出含 compute failed）', c && c.commonTask && /compute failed/.test(c.commonTask));
check('比较矩阵维度 ≥ 5', (c.comparisonDimensions || []).length >= 5);
check('六语言 variants 齐全', LANG6.every((l) => c.variants && c.variants[l] && c.variants[l].minimal_code));
check('六语言代码无占位符', LANG6.every((l) => !PLACEHOLDER.test(c.variants[l].minimal_code)));
check('反例 ≥ 4 个', (c.errors || []).length >= 4, `实际 ${(c.errors || []).length}`);
check('迁移练习 ≥ 2 个', (c.transferExercises || []).length >= 2);
check('验收断言 ≥ 2 条', (c.acceptanceTests || []).length >= 2);

console.log('—— 答案分布 ——');
const allAns = [...(c.exercises || []), ...(c.transferExercises || [])].map((e) => e.answer);
const countByPos = [0, 0, 0, 0];
allAns.forEach((a) => { if (a < 4) countByPos[a]++; });
const maxPct = Math.max(...countByPos) / allAns.length;
check(`答案位置分布均衡（最大 ${(maxPct * 100).toFixed(0)}% < 45%）`, maxPct < 0.45, `分布 ${countByPos.join('/')}`);
check('每题选项 ≥ 3', [...(c.exercises || []), ...(c.transferExercises || [])].every((e) => e.options.length >= 3));

console.log('—— 同题一致性（跨层传播 + 包装）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 用 raise...from 保留 cause', /raise RuntimeError\("compute failed"\) from e/.test(codes.python));
check('JS 用 Error cause 选项', /\{ cause: e \}/.test(codes.javascript));
check('Java 用 RuntimeException cause 构造', /new RuntimeException\("compute failed", new ArithmeticException/.test(codes.java));
check('Go 用 fmt.Errorf %w 包装', /fmt\.Errorf\("compute failed: %w", err\)/.test(codes.go));
check('Rust 用 ? 或 map_err 传播', /map_err/.test(codes.rust) && /format!/.test(codes.rust));
check('Rust 用 match 处理 Result', /match compute\(1, 0\)/.test(codes.rust));

console.log('—— 高风险覆盖（传播陷阱）——');
check('含吞掉错误反例', c.errors.some((e) => /吞掉|pass/.test(e)));
check('含丢失 cause 反例', c.errors.some((e) => /cause|上下文|溯源/.test(e)));
check('含 panic 误用反例', c.errors.some((e) => /panic/.test(e) && /常规/.test(e)));
check('含 %w 包装迁移题', c.transferExercises.some((t) => /%w/.test(t.options.join(''))));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
