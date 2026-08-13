#!/usr/bin/env node
/**
 * test-resource-release.js — 资源释放 L4 八层样板测试（I12-A 验收 · 8 类高风险收官）
 *
 * 对照计划书工作流 J（高风险主题：资源管理/释放）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js 110/110）
 *   - 同题一致性：资源自动释放输出 released
 *   - 六语言机制：with / try-finally / try-with-resources / RAII / defer / Drop
 *
 * 运行：node quality/test-resource-release.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'error.resource-release');

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
check('同题任务存在（输出 released）', c && c.commonTask && /released/.test(c.commonTask));
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

console.log('—— 同题一致性（六语言释放机制）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 用 with + __exit__', /__exit__/.test(codes.python) && /with Resource/.test(codes.python));
check('JS 用 try/finally', /finally/.test(codes.javascript) && /console\.log\("released"\)/.test(codes.javascript));
check('Java 用 try-with-resources + AutoCloseable', /implements AutoCloseable/.test(codes.java) && /try \(Resource r/.test(codes.java));
check('C++ 用 RAII 析构', /~Resource\(\)/.test(codes.cpp));
check('Go 用 defer', /defer fmt\.Println\("released"\)/.test(codes.go));
check('Rust 用 Drop trait', /impl Drop for Resource/.test(codes.rust));
check('六语言均输出 released', LANG6.every((l) => /released/.test(codes[l])));

console.log('—— 高风险覆盖（资源泄漏陷阱）——');
check('含句柄耗尽反例', c.errors.some((e) => /EMFILE|描述符|句柄/.test(e)));
check('含双重释放反例', c.errors.some((e) => /双重释放|置空/.test(e)));
check('含 defer 顺序反例', c.errors.some((e) => /defer|LIFO/.test(e)));
check('含 RAII 异常安全迁移题', c.transferExercises.some((t) => /RAII|栈展开/.test(t.options.join(''))));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
