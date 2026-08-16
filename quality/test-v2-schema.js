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

// ===== 通用结构验证（所有 v2 概念） =====

// 1. v2 概念存在
assert(v2Concepts.length >= 3, "至少 3 个 v2 概念（含 hook 字段）");
console.log(`v2 概念数量：${v2Concepts.length}`);
console.log(`v2 概念 IDs：${v2Concepts.map(c => c.id).join(', ')}`);

// 2. 黄金样板 ID 存在
const GOLDEN_IDS = ["value.binding", "control.conditionals", "function.lambda"];
GOLDEN_IDS.forEach((id) => {
  const c = concepts.find((c) => c.id === id);
  assert(!!c && !!c.hook, `${id} 有 hook 字段（v2 黄金样板）`);
});

// 3. 每个 v2 概念有完整字段集
const requiredFields = ["hook", "mentalModel", "executionSteps", "walkthrough", "realWorldExample", "confusions", "challenge", "connections", "nextStep"];
v2Concepts.forEach((c) => {
  requiredFields.forEach((f) => {
    assert(c[f] !== undefined && c[f] !== null, `${c.id} 有字段 ${f}`);
  });
});

// 4. hook 结构验证（所有 v2）
v2Concepts.forEach((c) => {
  const h = c.hook;
  assert(typeof h.question === "string" && h.question.length > 0, `${c.id} hook.question 非空`);
  assert(Array.isArray(h.options) && h.options.length >= 2, `${c.id} hook.options ≥2`);
  assert(Number.isInteger(h.answer) && h.answer >= 0 && h.answer < h.options.length, `${c.id} hook.answer 有效`);
  assert(typeof h.explanation === "string" && h.explanation.length > 0, `${c.id} hook.explanation 非空`);
  assert(typeof h.code === "string" && h.code.length > 0, `${c.id} hook.code 非空`);
});

// 5. mentalModel 有 diagram（所有 v2）
v2Concepts.forEach((c) => {
  assert(typeof c.mentalModel.diagram === "string" && c.mentalModel.diagram.includes("<"), `${c.id} mentalModel.diagram 是 HTML`);
  assert(typeof c.mentalModel.title === "string" && c.mentalModel.title.length > 0, `${c.id} mentalModel.title 非空`);
});

// 6. executionSteps 有 state（所有 v2）
v2Concepts.forEach((c) => {
  assert(c.executionSteps.length >= 2, `${c.id} executionSteps ≥2 步`);
  c.executionSteps.forEach((s, i) => {
    assert(Number.isInteger(s.line) && s.line >= 1, `${c.id} executionSteps[${i}].line 有效`);
    assert(typeof s.explanation === "string", `${c.id} executionSteps[${i}].explanation 存在`);
    assert(s.state !== undefined, `${c.id} executionSteps[${i}].state 存在`);
  });
});

// 7. exercises 有 level(A/B/C) 和唯一 id（所有 v2）
v2Concepts.forEach((c) => {
  const levels = new Set(c.exercises.map((e) => e.level));
  assert(levels.has("A"), `${c.id} exercises 有 Level A`);
  assert(levels.has("B"), `${c.id} exercises 有 Level B`);
  assert(levels.has("C"), `${c.id} exercises 有 Level C`);

  const ids = c.exercises.map((e) => e.id).filter(Boolean);
  assert(ids.length === c.exercises.length, `${c.id} 所有 exercises 有 id`);
  assert(new Set(ids).size === ids.length, `${c.id} exercise ids 唯一`);
  assert(ids[0] === `${c.id}.ex01`, `${c.id} 第一个 exercise id = ${c.id}.ex01（实际：${ids[0]}）`);
});

// 8. errors 有 variantCode（所有 v2）
v2Concepts.forEach((c) => {
  assert(c.errors.length >= 1, `${c.id} errors ≥1`);
  c.errors.forEach((e, i) => {
    assert(typeof e.code === "string", `${c.id} errors[${i}].code 存在`);
    assert(typeof e.cause === "string", `${c.id} errors[${i}].cause 存在`);
    assert(typeof e.fix === "string", `${c.id} errors[${i}].fix 存在`);
    assert(typeof e.variantCode === "string", `${c.id} errors[${i}].variantCode 存在（Debug Lab 变体问题）`);
  });
});

// 9. connections 引用有效（所有 v2）
v2Concepts.forEach((c) => {
  (c.connections.prerequisites || []).forEach((p) => {
    assert(allIds.has(p), `${c.id} connections.prerequisites "${p}" 有效`);
  });
  (c.connections.related || []).forEach((p) => {
    assert(allIds.has(p), `${c.id} connections.related "${p}" 有效`);
  });
  (c.connections.next || []).forEach((p) => {
    assert(allIds.has(p), `${c.id} connections.next "${p}" 有效`);
  });
  assert(typeof c.connections.diagram === "string" && c.connections.diagram.includes("<"), `${c.id} connections.diagram 是 HTML`);
});

// 10. nextStep.targetId 有效（所有 v2）
v2Concepts.forEach((c) => {
  assert(allIds.has(c.nextStep.targetId), `${c.id} nextStep.targetId "${c.nextStep.targetId}" 有效`);
});

// 11. estimatedTime 和 difficulty（所有 v2）
v2Concepts.forEach((c) => {
  assert(typeof c.estimatedTime === "number" && c.estimatedTime >= 1, `${c.id} estimatedTime 是正整数`);
  assert(["beginner", "intermediate", "advanced"].includes(c.difficulty), `${c.id} difficulty 合法`);
});

// 12. challenge 有 hints 和 solutionOutput（所有 v2）
v2Concepts.forEach((c) => {
  assert(Array.isArray(c.challenge.hints) && c.challenge.hints.length >= 1, `${c.id} challenge.hints ≥1`);
  assert(typeof c.challenge.solution === "string" && c.challenge.solution.length > 0, `${c.id} challenge.solution 非空`);
  assert(typeof c.challenge.solutionOutput === "string", `${c.id} challenge.solutionOutput 存在`);
});

// 13. realWorldExample 有 connections（所有 v2）
v2Concepts.forEach((c) => {
  assert(typeof c.realWorldExample.title === "string", `${c.id} realWorldExample.title 存在`);
  assert(typeof c.realWorldExample.code === "string", `${c.id} realWorldExample.code 存在`);
  if (c.realWorldExample.connections) {
    c.realWorldExample.connections.forEach((p) => {
      assert(allIds.has(p), `${c.id} realWorldExample.connections "${p}" 有效`);
    });
  }
});

// 14. confusions 有 left/right/explanation（所有 v2）
v2Concepts.forEach((c) => {
  assert(c.confusions.length >= 1, `${c.id} confusions ≥1`);
  c.confusions.forEach((cf, i) => {
    assert(typeof cf.left === "string", `${c.id} confusions[${i}].left 存在`);
    assert(typeof cf.right === "string", `${c.id} confusions[${i}].right 存在`);
    assert(typeof cf.explanation === "string", `${c.id} confusions[${i}].explanation 存在`);
  });
});

// ===== 答案分布检查（≤45%） =====
v2Concepts.forEach((c) => {
  const answers = c.exercises.map((e) => e.answer);
  const counts = {};
  answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
  const maxRatio = Math.max(...Object.values(counts)) / answers.length;
  assert(maxRatio <= 0.45, `${c.id} 答案分布 ≤45%（当前最大 ${(maxRatio * 100).toFixed(0)}%）`);
});

// ===== concept 特有验证 =====

// value.binding: hook answer = 1
const vb = concepts.find((c) => c.id === "value.binding");
if (vb && vb.hook) {
  assert(vb.hook.answer === 1, "value.binding hook.answer = 1（让 score 指向新的值）");
}

// control.conditionals: hook answer = 1
const cc = concepts.find((c) => c.id === "control.conditionals");
if (cc && cc.hook) {
  assert(cc.hook.answer === 1, "control.conditionals hook.answer = 1（0 是假值）");
  assert(cc.confusions.length >= 2, "control.conditionals confusions ≥2");
}

// function.lambda: hook answer = 1
const fl = concepts.find((c) => c.id === "function.lambda");
if (fl && fl.hook) {
  assert(fl.hook.answer === 1, "function.lambda hook.answer = 1（数字相加）");
  assert(fl.executionSteps.length >= 4, "function.lambda executionSteps ≥4（含调用栈变化）");
  // 检查调用栈状态
  const hasCallStack = fl.executionSteps.some((s) => s.state && s.state.callStack);
  assert(hasCallStack, "function.lambda executionSteps 包含 callStack 状态");
}

// —— 汇总 ——
console.log(`\nv2 Schema 测试：${pass} pass / ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
