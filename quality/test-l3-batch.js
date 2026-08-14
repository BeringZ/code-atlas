#!/usr/bin/env node
/**
 * test-l3-batch.js — L2→L3 批量升级第二批测试（I9-B 验收）
 *
 * 对照计划书工作流 H（合同批量推广）：
 *   - value.semantics（值/引用语义）与 collection.map（映射表）从纯文本 L2
 *     升级为可运行六语言 variants + 显式 L3
 *   - 同题输出：value.semantics → "1 2"（值/引用对比）；collection.map → "3 2"（插入+更新+按键读取）
 *   - 答案分布均衡；六语言可运行（verify 75/75）
 *
 * 运行：node quality/test-l3-batch.js   退出码 0=通过
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

const vs = D2.concepts.find((x) => x.id === 'value.semantics');
const cm = D2.concepts.find((x) => x.id === 'collection.map');

console.log('—— value.semantics（值/引用语义）——');
check('level = L3', vs && vs.level === 'L3', `实际 L${vs && vs.level}`);
check('同题任务存在（输出 1 2）', vs && vs.commonTask && /1 2/.test(vs.commonTask));
check('六语言 variants 齐全且可运行', LANG6.every((l) => vs.variants && vs.variants[l] && vs.variants[l].minimal_code && !PLACEHOLDER.test(vs.variants[l].minimal_code)));
check('反例 ≥ 4 个', (vs.errors || []).length >= 4);
check('Python 演示引用共享', /lst\.append/.test(vs.variants.python.minimal_code));
check('Rust 演示 Copy/move 语义', /let x = a;/.test(vs.variants.rust.minimal_code) && /vec!\[1\]/.test(vs.variants.rust.minimal_code));
const vsAns = (vs.exercises || []).map((e) => e.answer);
check('答案分布均衡（0/1/2/3 各一）', JSON.stringify(vsAns) === '[0,1,2,3]', JSON.stringify(vsAns));

console.log('—— collection.map（映射表）——');
check('level = L3', cm && cm.level === 'L3', `实际 L${cm && cm.level}`);
check('同题任务存在（输出 3 2）', cm && cm.commonTask && /3 2/.test(cm.commonTask));
check('六语言 variants 齐全且可运行', LANG6.every((l) => cm.variants && cm.variants[l] && cm.variants[l].minimal_code && !PLACEHOLDER.test(cm.variants[l].minimal_code)));
check('反例 ≥ 4 个', (cm.errors || []).length >= 4);
check('Python 用 dict 下标', /d\["a"\] = 3/.test(cm.variants.python.minimal_code));
check('JS 用专用 Map', /new Map/.test(cm.variants.javascript.minimal_code));
check('Go 用 map 字面量', /map\[string\]int/.test(cm.variants.go.minimal_code));
const cmAns = (cm.exercises || []).map((e) => e.answer);
check('答案分布均衡（3/2/1/0）', JSON.stringify(cmAns) === '[3,2,1,0]', JSON.stringify(cmAns));

console.log('—— 成熟度统计 ——');
const l3 = D2.concepts.filter((c) => c.level === 'L3').length;
const l4 = D2.concepts.filter((c) => c.level === 'L4').length;
check(`L3 = 25（7+2+2+2 新增）`, l3 === 25, `实际 ${l3}`);
check(`L4 = 9（6+1+1 新增）`, l4 === 9, `实际 ${l4}`);

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
