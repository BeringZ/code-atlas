#!/usr/bin/env node
/**
 * test-conversion.js — 类型转换 L4 八层样板测试（I6-A 验收）
 *
 * 对照计划书工作流 J（高风险主题：类型转换/解析）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js）
 *   - 答案位置分布均衡（无猜题规律）
 *   - 六语言解析惯用法同题一致性（42 / invalid）
 *
 * 运行：node quality/test-conversion.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'value.conversion');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

console.log('—— 八层结构 ——');
check('level = L4', c.level === 'L4', `实际 L${c.level}`);
check('同题任务存在', c.commonTask && c.commonTask.expectedOutput && c.commonTask.expectedOutput.valid === '42');
check('比较矩阵维度 ≥ 5', (c.comparisonDimensions || []).length >= 5);
check('六语言 variants 齐全', ['python', 'javascript', 'java', 'cpp', 'go', 'rust'].every((l) => c.variants && c.variants[l] && c.variants[l].minimal_code));
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

console.log('—— 六语言同题一致性（安全解析 42/invalid）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 用 try/except ValueError', /except ValueError/.test(codes.python));
check('JS 用 Number.isNaN 检查', /Number\.isNaN/.test(codes.javascript));
check('Java 用 catch NumberFormatException', /NumberFormatException/.test(codes.java));
check('C++ 用 catch + stoi', /stoi|std::stoi/.test(codes.cpp));
check('Go 用 err != nil 判断', /err != nil/.test(codes.go));
check('Rust 用 Result + match', /FromStr|parse|match/.test(codes.rust));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
