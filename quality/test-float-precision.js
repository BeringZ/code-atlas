#!/usr/bin/env node
/**
 * test-float-precision.js — 浮点精度 L4 八层样板测试（I8-B 验收）
 *
 * 对照计划书工作流 J（高风险主题：浮点精度，新增概念位点）：
 *   - 新概念位点 expr.float-precision 挂载 B03 模块（模块声明与概念数据一致）
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js）
 *   - 同题一致性：0.1 + 0.2 输出 0.30000000000000004（IEEE 754 跨语言统一）
 *   - 答案位置分布均衡（无猜题规律）
 *
 * 运行：node quality/test-float-precision.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'expr.float-precision');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
const PLACEHOLDER = /\.\.\.|\u2026|省略|TODO/;

console.log('—— 概念位点挂载 ——');
check('概念存在', !!c, 'expr.float-precision 未找到');
check('module_id = B03（表达式与运算符）', c && c.module_id === 'B03');
check('B03 模块位点声明包含该概念', D2.modules.some((m) => m.id === 'B03' && m.concepts.includes('expr.float-precision')));
check('无 prerequisites 循环', (c.prerequisites || []).every((p) => D2.concepts.some((x) => x.id === p)));

console.log('—— 八层结构 ——');
check('level = L4', c && c.level === 'L4', `实际 L${c && c.level}`);
check('同题任务存在且说明输出', c && c.commonTask && /0\.30000000000000004/.test(c.commonTask));
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

console.log('—— 同题一致性（0.1+0.2 → 0.30000000000000004）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('五语言直接计算 0.1+0.2', ['python', 'javascript', 'java', 'go', 'rust'].every((l) => /0\.1 \+ 0\.2/.test(codes[l])));
check('C++ 用 setprecision(17) 防截断', /setprecision\(17\)/.test(codes.cpp));
check('C++ 含 <iomanip>', /#include <iomanip>/.test(codes.cpp));
check('Rust 用 f64 默认字面量', /0\.1 \+ 0\.2/.test(codes.rust));

console.log('—— 高风险覆盖（浮点陷阱）——');
check('含相等误判反例', c.errors.some((e) => /==|相等/.test(e) && /0\.1|浮点/.test(e)));
check('含金额误差反例', c.errors.some((e) => /金额|财务|累加/.test(e)));
check('含大数吞小数反例', c.errors.some((e) => /16777216|尾数/.test(e)));
check('含 epsilon 容差迁移题', c.transferExercises.some((t) => /epsilon|1e-9/.test(t.options.join(''))));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
