#!/usr/bin/env node
/**
 * test-numeric-edge.js — 边界/溢出 L4 八层样板测试（I11-A 验收）
 *
 * 对照计划书工作流 J（高风险主题：边界溢出与特殊数值）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js 95/95）
 *   - 同题一致性：2147483647+1 的溢出检测（输出 overflow detected）
 *   - 六语言惯用法：手动边界(JS/Python) / Math.addExact(Java) / limits 预判(C++) /
 *     手动预判(Go) / checked_add(Rust)
 *
 * 运行：node quality/test-numeric-edge.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'value.numeric-edge');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
const PLACEHOLDER = /\.\.\.|\u2026|省略|TODO/;

console.log('—— 八层结构 ——');
check('level = L4', c && c.level === 'L4', `实际 L${c && c.level}`);
check('module_id = B02（值与类型）', c && c.module_id === 'B02');
check('同题任务存在（输出 overflow detected）', c && c.commonTask && /overflow detected/.test(c.commonTask));
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

console.log('—— 同题一致性（int32 溢出检测）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Java 用 Math.addExact', /Math\.addExact\(2147483647, 1\)/.test(codes.java));
check('Rust 用 checked_add + match', /checked_add/.test(codes.rust) && /match/.test(codes.rust));
check('C++ 用 numeric_limits 预判', /numeric_limits<int>::max/.test(codes.cpp));
check('Python 手动模拟 int32 边界', /2147483647 or r < -2147483648/.test(codes.python));
check('JS 手动模拟 int32 边界', /2147483647 \|\| r < -2147483648/.test(codes.javascript));
check('六语言均输出 overflow detected', LANG6.every((l) => /overflow detected/.test(codes[l])));

console.log('—— 高风险覆盖（溢出陷阱）——');
check('含定宽回绕反例', c.errors.some((e) => /回绕|-2147483648/.test(e)));
check('含 C++ UB 反例', c.errors.some((e) => /UB|未定义行为/.test(e)));
check('含 NaN 反例', c.errors.some((e) => /NaN/.test(e)));
check('含 BigInt 迁移题', c.transferExercises.some((t) => /BigInt/.test(t.options.join(''))));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
