#!/usr/bin/env node
/**
 * test-mutability.js — 可变与不可变 L4 八层样板测试（I7-A 验收）
 *
 * 对照计划书工作流 J（高风险主题：可变性）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js）
 *   - 答案位置分布均衡（无猜题规律）
 *   - 六语言同题一致性：不可变字符串拼接产生新值，原值不变（abc abcx）
 *
 * 运行：node quality/test-mutability.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'value.mutability');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

console.log('—— 八层结构 ——');
check('level = L4', c.level === 'L4', `实际 L${c.level}`);
check('同题任务存在且说明输出', c.commonTask && /abc abcx/.test(c.commonTask));
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

console.log('—— 六语言同题一致性（不可变拼接 abc abcx）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 用不可变 str 拼接', /s = "abc"/.test(codes.python) && /s2 = s \+ "x"/.test(codes.python));
check('JS 用 const 声明不可变绑定', /const s = "abc"/.test(codes.javascript));
check('Java 用不可变 String 类', /String s = "abc"/.test(codes.java));
check('C++ 值语义拷贝', /std::string s = "abc"/.test(codes.cpp) && /s \+ "x"/.test(codes.cpp));
check('Go 用不可变 string', /s := "abc"/.test(codes.go));
check('Rust 默认不可变 let', /let s = String::from/.test(codes.rust) && /clone/.test(codes.rust));

console.log('—— 高风险覆盖（可变性陷阱）——');
check('含 const 只防重绑定反例', c.errors.some((e) => /const|final/.test(e) && /绑定|重赋值/.test(e)));
check('含 Rust 未声明 mut 编译拒绝反例', c.errors.some((e) => /mut/.test(e) && /Rust/.test(e)));
check('含共享可变数据并发风险反例', c.errors.some((e) => /共享|引用|别名/.test(e)));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
