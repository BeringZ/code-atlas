#!/usr/bin/env node
/**
 * test-v2-schema.js — Concept Schema v2 微型课程合同测试
 *
 * 验证含 hook 字段的 v2 概念是否满足完整微型课程结构：
 *   - hook / mentalModel / executionSteps / walkthrough
 *   - realWorldExample / confusions / challenge
 *   - connections / nextStep
 *   - exercises 带 level(A/B/C) 和唯一 id
 *   - errors 带 variantCode
 *
 * 运行：node quality/test-v2-schema.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
['concept-data.js', 'concepts-supplement.js', 'concept-v2-data.js', 'advanced-data.js'].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
});
const D2 = sandbox.window.CODE_ATLAS_2;

let pass = 0, fail = 0;
function assert(cond, msg) {
  if (cond) { pass++; }
  else { fail++; console.log(`  FAIL: ${msg}`); }
}

const concepts = D2.concepts || [];
const v2Concepts = concepts.filter((c) => c.hook);
const allIds = new Set(concepts.map((c) => c.id));

// 1. v2 概念存在
assert(v2Concepts.length >= 1, "至少 1 个 v2 概念（含 hook 字段）");
console.log(`v2 概念数量：${v2Concepts.length}`);

// 2. value.binding 是 v2 概念
const vb = concepts.find((c) => c.id === "value.binding");
assert(!!vb && !!vb.hook, "value.binding 有 hook 字段（v2 黄金样板）");

// 3. 每个 v2 概念有完整字段集
const requiredFields = ["hook", "mentalModel", "executionSteps", "walkthrough", "realWorldExample", "confusions", "challenge", "connections", "nextStep"];
v2Concepts.forEach((c) => {
  requiredFields.forEach((f) => {
    assert(c[f] !== undefined && c[f] !== null, `${c.id} 有字段 ${f}`);
  });
});

// 4. hook 结构验证
if (vb && vb.hook) {
  const h = vb.hook;
  assert(typeof h.question === "string" && h.question.length > 0, "value.binding hook.question 非空");
  assert(Array.isArray(h.options) && h.options.length >= 2, "value.binding hook.options ≥2");
  assert(Number.isInteger(h.answer) && h.answer >= 0 && h.answer < h.options.length, "value.binding hook.answer 有效");
  assert(typeof h.explanation === "string" && h.explanation.length > 0, "value.binding hook.explanation 非空");
  assert(typeof h.code === "string" && h.code.length > 0, "value.binding hook.code 非空");
}

// 5. mentalModel 有 diagram
if (vb && vb.mentalModel) {
  assert(typeof vb.mentalModel.diagram === "string" && vb.mentalModel.diagram.includes("<"), "value.binding mentalModel.diagram 是 HTML");
}

// 6. executionSteps 有 state
if (vb && vb.executionSteps) {
  assert(vb.executionSteps.length >= 2, "value.binding executionSteps ≥2 步");
  vb.executionSteps.forEach((s, i) => {
    assert(Number.isInteger(s.line) && s.line >= 1, `value.binding executionSteps[${i}].line 有效`);
    assert(typeof s.explanation === "string", `value.binding executionSteps[${i}].explanation 存在`);
    assert(s.state !== undefined, `value.binding executionSteps[${i}].state 存在`);
  });
}

// 7. exercises 有 level 和 id
if (vb && vb.exercises) {
  const levels = new Set(vb.exercises.map((e) => e.level));
  assert(levels.has("A"), "value.binding exercises 有 Level A");
  assert(levels.has("B"), "value.binding exercises 有 Level B");
  assert(levels.has("C"), "value.binding exercises 有 Level C");

  const ids = vb.exercises.map((e) => e.id).filter(Boolean);
  assert(ids.length === vb.exercises.length, "value.binding 所有 exercises 有 id");
  assert(new Set(ids).size === ids.length, "value.binding exercise ids 唯一");
  assert(ids[0] === "value.binding.ex01", `value.binding 第一个 exercise id = value.binding.ex01（实际：${ids[0]}）`);
}

// 8. errors 有 variantCode
if (vb && vb.errors && vb.errors[0]) {
  assert(typeof vb.errors[0].variantCode === "string", "value.binding errors[0] 有 variantCode（Debug Lab 变体问题）");
}

// 9. connections 引用有效
if (vb && vb.connections) {
  (vb.connections.prerequisites || []).forEach((p) => {
    assert(allIds.has(p), `value.binding connections.prerequisites "${p}" 有效`);
  });
  (vb.connections.related || []).forEach((p) => {
    assert(allIds.has(p), `value.binding connections.related "${p}" 有效`);
  });
  (vb.connections.next || []).forEach((p) => {
    assert(allIds.has(p), `value.binding connections.next "${p}" 有效`);
  });
}

// 10. nextStep.targetId 有效
if (vb && vb.nextStep) {
  assert(allIds.has(vb.nextStep.targetId), `value.binding nextStep.targetId "${vb.nextStep.targetId}" 有效`);
}

// 11. estimatedTime 和 difficulty
if (vb) {
  assert(typeof vb.estimatedTime === "number" && vb.estimatedTime >= 1, "value.binding estimatedTime 是正整数");
  assert(["beginner", "intermediate", "advanced"].includes(vb.difficulty), "value.binding difficulty 合法");
}

// 12. challenge 有 hints 和 solutionOutput
if (vb && vb.challenge) {
  assert(Array.isArray(vb.challenge.hints) && vb.challenge.hints.length >= 1, "value.binding challenge.hints ≥1");
  assert(typeof vb.challenge.solution === "string" && vb.challenge.solution.length > 0, "value.binding challenge.solution 非空");
  assert(typeof vb.challenge.solutionOutput === "string", "value.binding challenge.solutionOutput 存在");
}

// 13. realWorldExample.connections 有效
if (vb && vb.realWorldExample && vb.realWorldExample.connections) {
  vb.realWorldExample.connections.forEach((p) => {
    assert(allIds.has(p), `value.binding realWorldExample.connections "${p}" 有效`);
  });
}

// 14. confusions 有 left/right/explanation
if (vb && vb.confusions) {
  assert(vb.confusions.length >= 1, "value.binding confusions ≥1");
  vb.confusions.forEach((cf, i) => {
    assert(typeof cf.left === "string", `value.binding confusions[${i}].left 存在`);
    assert(typeof cf.right === "string", `value.binding confusions[${i}].right 存在`);
    assert(typeof cf.explanation === "string", `value.binding confusions[${i}].explanation 存在`);
  });
}

// —— 汇总 ——
console.log(`\nv2 Schema 测试：${pass} pass / ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
