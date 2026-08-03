#!/usr/bin/env node
/**
 * test-races-deadlock.js — 数据竞争与死锁 L4 八层样板测试（I9-A 验收）
 *
 * 对照计划书工作流 J（高风险主题：并发/数据竞争/死锁，8 类高风险收官）：
 *   - 八层结构完整 + 六语言 minimal_code 已真实运行验证（verify-concepts.js）
 *   - 同题一致性：两线程受保护计数器各增 100 次 → 输出 200
 *   - JS 单线程对比（事件循环无数据竞争）；答案分布均衡
 *
 * 运行：node quality/test-races-deadlock.js   退出码 0=通过
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
const c = D2.concepts.find((x) => x.id === 'concurrency.races-deadlock');

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  → ' + detail : ''}`); }
}

const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
const PLACEHOLDER = /\.\.\.|\u2026|省略|TODO/;

console.log('—— 八层结构 ——');
check('level = L4', c && c.level === 'L4', `实际 L${c && c.level}`);
check('module_id = B13（并发）', c && c.module_id === 'B13');
check('同题任务存在（受保护计数器 → 200）', c && c.commonTask && /200/.test(c.commonTask));
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

console.log('—— 同题一致性（受保护计数器 → 200）——');
const codes = Object.fromEntries(Object.entries(c.variants || {}).map(([l, v]) => [l, v.minimal_code || '']));
check('Python 用 Lock + with', /Lock/.test(codes.python) && /with lock/.test(codes.python));
check('Java 用 AtomicInteger', /AtomicInteger/.test(codes.java));
check('C++ 用 atomic', /std::atomic/.test(codes.cpp));
check('Go 用 channel 互斥（无 import sync）', /chan/.test(codes.go) && !/sync/.test(codes.go));
check('Rust 用 Arc<Mutex>', /Arc::new\(Mutex/.test(codes.rust));
check('JS 单线程无锁（对比）', /for \(let i = 0; i < 200/.test(codes.javascript));

console.log('—— 高风险覆盖（竞争/死锁陷阱）——');
check('含无锁竞争反例', c.errors.some((e) => /竞争|非原子/.test(e) && /counter|更新/.test(e)));
check('含死锁反例', c.errors.some((e) => /死锁|锁顺序/.test(e)));
check('含 TOCTOU 反例', c.errors.some((e) => /TOCTOU|检查-然后/.test(e)));
check('含检测工具迁移题', c.transferExercises.some((t) => /race|TSan|Send\/Sync/.test(t.options.join(''))));

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
