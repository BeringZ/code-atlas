#!/usr/bin/env node
/**
 * check-data.js — Code Atlas 数据质检（CI 门禁：数据格式 + 引用依赖校验）
 *
 * 检查项（对照《内容质量升级落地计划书》共用自动化质检系统）：
 *   1. 知识点总数与模块位点声明一致（181 位点完整性）
 *   2. status / level / module_id 字段合法性
 *   3. prerequisites 引用有效性 + 循环依赖检测
 *   4. 六语言 variants 完整性（缺失语言清单）
 *   5. semantic_blocks 行号越界检查
 *   6. 练习答案合法性 + 答案位置分布（文档：单一位置不高于 35%）
 *   7. 冗余数据检测（concepts-supplement.js 与主数据重复度）
 *   8. 反例/错误案例覆盖统计（L2+ 建议至少一个 errors 项）
 *
 * 运行：node quality/check-data.js   退出码 0=通过 1=存在 error
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const LANGUAGES = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];

// 先单独加载主数据（合并前），记录概念 id，用于 supplement 覆盖冲突检测
const sandboxMain = { window: {} };
vm.createContext(sandboxMain);
vm.runInContext(fs.readFileSync(path.join(root, 'concept-data.js'), 'utf8'), sandboxMain, { filename: 'concept-data.js' });
const mainIdsBeforeMerge = new Set((sandboxMain.window.CODE_ATLAS_2.concepts || []).map((c) => c.id));

const sandbox = { window: {} };
vm.createContext(sandbox);
['concept-data.js', 'concepts-supplement.js', 'concept-v2-data.js', 'advanced-data.js'].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
});
const D2 = sandbox.window.CODE_ATLAS_2;
const SUP = sandbox.window.CODE_ATLAS_2_SUPPLEMENT;

const errors = [];
const warnings = [];
const notes = [];

if (!D2) { console.error('CODE_ATLAS_2 未找到'); process.exit(1); }
const concepts = D2.concepts || [];
const modules = D2.modules || [];

// 1) 位点完整性
const slots = modules.reduce((n, m) => n + (m.concepts ? m.concepts.length : 0), 0);
const ids = new Set(concepts.map((c) => c.id));
if (concepts.length !== slots) {
  errors.push(`概念总数 ${concepts.length} 与模块位点声明 ${slots} 不一致`);
} else {
  notes.push(`概念位点完整：${concepts.length} 个（模块声明一致）`);
}
if (concepts.length !== ids.size) errors.push(`概念 id 存在重复（总数 ${concepts.length} / 唯一 ${ids.size}）`);

// 2) 字段合法性
const LEVELS = new Set(['L1', 'L2', 'L3', 'L4']);
const moduleIds = new Set(modules.map((m) => m.id));
// 启发式候选提示（I7-B：level 改为数据事实，启发式只提示不标注——伪代码虚标由 verify 运行验证兜底）
const l3Candidates = [];
concepts.forEach((c) => {
  if (c.level !== undefined) return;
  const v = c.variants || {};
  const hasVariants = Object.keys(v).length > 0;
  const hasSemanticBlocks = Object.values(v).some((x) => x && x.semantic_blocks && x.semantic_blocks.length);
  const hasDeep = !!(c.deep_dive || (c.errors && c.errors.length));
  if (hasVariants && (hasSemanticBlocks || hasDeep)) l3Candidates.push(c.id);
});
const levelCount = { L1: 0, L2: 0, L3: 0, L4: 0 };
concepts.forEach((c) => {
  if (!['published', 'draft'].includes(c.status)) errors.push(`概念 ${c.id} status="${c.status}" 非法`);
  if (c.level != null && !LEVELS.has(c.level)) errors.push(`概念 ${c.id} level="${c.level}" 非法`);
  if (!moduleIds.has(c.module_id)) errors.push(`概念 ${c.id} module_id="${c.module_id}" 不在模块表中`);
  levelCount[c.level || 'L2']++;
});
if (l3Candidates.length) notes.push(`结构达标但未显式标 L3 的候选（${l3Candidates.length} 个，需 verify 可运行验证后显式升级）：${l3Candidates.join(', ')}`);

// 3) prerequisites 引用 + 循环依赖
const byId = {};
concepts.forEach((c) => { byId[c.id] = c; });
const depG = new Map();
concepts.forEach((c) => { depG.set(c.id, (c.prerequisites || []).filter((p) => ids.has(p))); });
concepts.forEach((c) => {
  (c.prerequisites || []).forEach((p) => {
    if (!ids.has(p)) errors.push(`概念 ${c.id} 前置引用 "${p}" 无效`);
  });
  (c.next || []).forEach((n) => {
    if (!ids.has(n)) errors.push(`概念 ${c.id} next 引用 "${n}" 无效`);
  });
});
// 环检测（DFS 三色）
const color = new Map();
const cyclePath = [];
function hasCycle(id, stack) {
  color.set(id, 1); // 灰
  stack.push(id);
  for (const nx of depG.get(id) || []) {
    if (color.get(nx) === 1) { cyclePath.push(...stack.slice(stack.indexOf(nx)), nx); return true; }
    if (!color.get(nx) && hasCycle(nx, stack)) return true;
  }
  stack.pop();
  color.set(id, 2); // 黑
  return false;
}
for (const c of concepts) {
  if (!color.get(c.id) && hasCycle(c.id, [])) {
    errors.push(`前置依赖存在循环：${cyclePath.join(' → ')}`);
    break;
  }
}

// 4) 六语言 variants 完整性
let missingLang = 0;
const langStats = {};
LANGUAGES.forEach((l) => { langStats[l] = 0; });
concepts.forEach((c) => {
  const v = c.variants || {};
  LANGUAGES.forEach((l) => {
    if (v[l] && v[l].minimal_code) langStats[l]++;
    else { missingLang++; }
  });
});
const withVariants = concepts.filter((c) => c.variants && Object.keys(c.variants).length);
notes.push(`六语言均有 minimal_code 的知识点：${LANGUAGES.map((l) => `${l}=${langStats[l]}`).join(' ')}`);
if (withVariants.length && missingLang > 0) {
  warnings.push(`${concepts.length - withVariants.length} 个概念无 variants；有 variants 的概念中缺失 ${missingLang} 个语言变体（非全部概念要求六语言，按成熟度分级）`);
}

// 5) semantic_blocks 行号越界
let blockErr = 0;
concepts.forEach((c) => {
  Object.entries(c.variants || {}).forEach(([lang, v]) => {
    if (!v || !v.semantic_blocks || !v.minimal_code) return;
    const lineCount = v.minimal_code.split('\n').length;
    v.semantic_blocks.forEach((b, i) => {
      if (!Number.isInteger(b.start) || !Number.isInteger(b.end) || b.start < 1 || b.end > lineCount || b.end < b.start) {
        blockErr++;
        if (blockErr <= 5) errors.push(`概念 ${c.id} 语言 ${lang} semantic_blocks[${i}] 行号 [${b.start},${b.end}] 越界（代码 ${lineCount} 行）`);
      }
    });
  });
});

// 6) 练习答案合法性 + 位置分布
let exErr = 0;
const ansDist = {};
const exTypes = {};
let totalEx = 0;
concepts.forEach((c) => {
  (c.exercises || []).forEach((e) => {
    totalEx++;
    exTypes[e.type] = (exTypes[e.type] || 0) + 1;
    if (!Array.isArray(e.options) || !Number.isInteger(e.answer) || e.answer < 0 || e.answer >= e.options.length) {
      exErr++;
      if (exErr <= 5) errors.push(`概念 ${c.id} 练习答案越界（answer=${e.answer}, options=${e.options ? e.options.length : 0}）`);
      return;
    }
    ansDist[e.answer] = (ansDist[e.answer] || 0) + 1;
  });
});
if (totalEx > 0) {
  const maxPct = Math.max(...Object.values(ansDist)) / totalEx;
  notes.push(`练习总数 ${totalEx}，题型分布：${Object.entries(exTypes).map(([k, v]) => `${k}=${v}`).join(' ')}`);
  if (maxPct > 0.35) warnings.push(`正确答案位置分布偏差：最高位置占比 ${(maxPct * 100).toFixed(1)}%（目标 ≤35%）`);
}

// 7) 数据链路完整性：concepts-supplement.js 通过文件尾部的 mergeSupplement() 在
//    加载时按 id 去重合并进主数据（不覆盖主数据）。校验合并链路正常：
if (SUP && SUP.concepts && SUP.concepts.length) {
  const overlap = SUP.concepts.filter((c) => mainIdsBeforeMerge.has(c.id)).length;
  const ownOnly = SUP.concepts.length - overlap;
  if (overlap > 0) {
    warnings.push(`supplement 有 ${overlap} 个概念与主数据同 id——合并时被忽略（不覆盖），若意在升级内容请改为直接改主数据或合并后覆盖`);
  } else {
    notes.push(`补充数据合并正常：supplement ${SUP.concepts.length} 个概念均为主数据新增（合并后共 ${concepts.length} 个，位点完整）`);
  }
}

// 8) 反例覆盖统计（L2+ 建议 errors 至少 1 项）
const withErrors = concepts.filter((c) => c.errors && c.errors.length > 0).length;
notes.push(`含反例/错误案例（errors）的知识点：${withErrors}/${concepts.length}`);

// 9) L3/L4 成熟度结构合同（I6-B：175 个 L2 推广的机器门槛）
//    L4 硬性要求：六语言 variants + semantic_blocks + comparisonDimensions + errors + acceptanceTests + commonTask
//    L3 硬性要求：variants（≥3 语言 minimal_code）+ errors ≥ 1 + comparisonDimensions
const LANG6 = ['python', 'javascript', 'java', 'cpp', 'go', 'rust'];
let contractErr = 0;
concepts.forEach((c) => {
  if (c.level === 'L4') {
    const v = c.variants || {};
    const missing = LANG6.filter((l) => !(v[l] && v[l].minimal_code));
    if (missing.length) { contractErr++; errors.push(`概念 ${c.id}（L4）六语言 variants 缺失：${missing.join(',')}`); }
    if (!LANG6.every((l) => v[l] && v[l].semantic_blocks && v[l].semantic_blocks.length)) { contractErr++; errors.push(`概念 ${c.id}（L4）需每语言 semantic_blocks`); }
    if (!c.comparisonDimensions || c.comparisonDimensions.length < 4) { contractErr++; errors.push(`概念 ${c.id}（L4）comparisonDimensions 不足 4 维`); }
    if (!(c.errors || []).length) { contractErr++; errors.push(`概念 ${c.id}（L4）缺反例 errors`); }
    if (!(c.acceptanceTests || []).length) { contractErr++; errors.push(`概念 ${c.id}（L4）缺验收断言 acceptanceTests`); }
    if (!c.commonTask) { contractErr++; errors.push(`概念 ${c.id}（L4）缺同题任务 commonTask`); }
    if (!(c.transferExercises || []).length) { contractErr++; errors.push(`概念 ${c.id}（L4）缺迁移练习 transferExercises`); }
  } else if (c.level === 'L3') {
    const v = c.variants || {};
    const langCount = LANG6.filter((l) => v[l] && v[l].minimal_code).length;
    if (langCount < 3) { contractErr++; errors.push(`概念 ${c.id}（L3）语言变体不足（${langCount}/6，需 ≥3）`); }
    if (!(c.errors || []).length) { contractErr++; errors.push(`概念 ${c.id}（L3）缺反例 errors`); }
    if (!c.comparisonDimensions || c.comparisonDimensions.length < 3) { contractErr++; errors.push(`概念 ${c.id}（L3）comparisonDimensions 不足 3 维`); }
  }
});
if (contractErr === 0) {
  notes.push(`L3/L4 结构合同全部满足（${concepts.filter((c) => c.level === 'L3' || c.level === 'L4').length} 个精讲概念）`);
}

// 10) v2 微型课程合同（含 hook 字段的概念须满足完整 v2 结构）
//     v2 必须有：hook, mentalModel, executionSteps, walkthrough, realWorldExample,
//                confusions(≥1), challenge, connections, nextStep,
//                exercises 带 level(至少 A/B/C 三级), exercises 带 id(唯一)
const v2Fields = ["hook", "mentalModel", "executionSteps", "walkthrough", "realWorldExample", "confusions", "challenge", "connections", "nextStep"];
const v2Concepts = concepts.filter((c) => c.hook);
let v2Err = 0;
const v2ExerciseIds = new Set();

if (v2Concepts.length > 0) {
  notes.push(`v2 微型课程概念：${v2Concepts.length} 个（${v2Concepts.map((c) => c.id).join(", ")}）`);

  v2Concepts.forEach((c) => {
    // 必须字段存在
    v2Fields.forEach((f) => {
      if (c[f] === undefined || c[f] === null) {
        v2Err++;
        errors.push(`概念 ${c.id}（v2）缺字段：${f}`);
      }
    });

    // hook 结构
    if (c.hook) {
      const h = c.hook;
      if (!h.question || !h.options || !Array.isArray(h.options) || h.options.length < 2) {
        v2Err++; errors.push(`概念 ${c.id}（v2）hook 结构不完整（需 question + options ≥2）`);
      }
      if (!Number.isInteger(h.answer) || h.answer < 0 || h.answer >= (h.options || []).length) {
        v2Err++; errors.push(`概念 ${c.id}（v2）hook answer 越界`);
      }
      if (!h.explanation) {
        v2Err++; errors.push(`概念 ${c.id}（v2）hook 缺 explanation`);
      }
    }

    // mentalModel 结构
    if (c.mentalModel && (!c.mentalModel.title || !c.mentalModel.diagram)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）mentalModel 需 title + diagram`);
    }

    // executionSteps 结构
    if (c.executionSteps) {
      if (!Array.isArray(c.executionSteps) || c.executionSteps.length < 1) {
        v2Err++; errors.push(`概念 ${c.id}（v2）executionSteps 至少 1 步`);
      } else {
        c.executionSteps.forEach((s, i) => {
          if (!Number.isInteger(s.line) || s.line < 1) { v2Err++; errors.push(`概念 ${c.id}（v2）executionSteps[${i}] line 无效`); }
          if (!s.explanation) { v2Err++; errors.push(`概念 ${c.id}（v2）executionSteps[${i}] 缺 explanation`); }
        });
      }
    }

    // walkthrough 结构
    if (c.walkthrough) {
      if (!Array.isArray(c.walkthrough) || c.walkthrough.length < 1) {
        v2Err++; errors.push(`概念 ${c.id}（v2）walkthrough 至少 1 条`);
      }
    }

    // confusions ≥ 1
    if (c.confusions && (!Array.isArray(c.confusions) || c.confusions.length < 1)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）confusions 至少 1 项`);
    }

    // exercises 带 level 和 id
    if (c.exercises) {
      const levels = new Set();
      c.exercises.forEach((ex, i) => {
        if (!ex.level) {
          v2Err++; errors.push(`概念 ${c.id}（v2）exercises[${i}] 缺 level（A/B/C/D）`);
        } else {
          levels.add(ex.level);
        }
        if (!ex.id) {
          warnings.push(`概念 ${c.id}（v2）exercises[${i}] 缺 id（建议格式 concept.exNN）`);
        } else {
          if (v2ExerciseIds.has(ex.id)) { v2Err++; errors.push(`练习 id 重复：${ex.id}`); }
          v2ExerciseIds.add(ex.id);
        }
      });
      // 至少 A/B/C 三级
      ["A", "B", "C"].forEach((lv) => {
        if (!levels.has(lv)) {
          v2Err++; errors.push(`概念 ${c.id}（v2）exercises 缺 Level ${lv}（至少需 A/B/C 三级）`);
        }
      });
    }

    // challenge 结构
    if (c.challenge && (!c.challenge.prompt || !c.challenge.solution)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）challenge 需 prompt + solution`);
    }

    // connections 结构
    if (c.connections && (!c.connections.current || !c.connections.diagram)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）connections 需 current + diagram`);
    }

    // nextStep 结构
    if (c.nextStep && (!c.nextStep.title || !c.nextStep.targetId)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）nextStep 需 title + targetId`);
    }
    // nextStep targetId 有效性
    if (c.nextStep && c.nextStep.targetId && !ids.has(c.nextStep.targetId)) {
      v2Err++; errors.push(`概念 ${c.id}（v2）nextStep.targetId "${c.nextStep.targetId}" 无效`);
    }

    // connections 引用有效性
    if (c.connections) {
      (c.connections.prerequisites || []).forEach((p) => { if (!ids.has(p)) { v2Err++; errors.push(`概念 ${c.id}（v2）connections.prerequisites "${p}" 无效`); } });
      (c.connections.related || []).forEach((p) => { if (!ids.has(p)) { v2Err++; errors.push(`概念 ${c.id}（v2）connections.related "${p}" 无效`); } });
      (c.connections.next || []).forEach((p) => { if (!ids.has(p)) { v2Err++; errors.push(`概念 ${c.id}（v2）connections.next "${p}" 无效`); } });
    }

    // realWorldExample connections 有效性
    if (c.realWorldExample && c.realWorldExample.connections) {
      c.realWorldExample.connections.forEach((p) => { if (!ids.has(p)) { v2Err++; errors.push(`概念 ${c.id}（v2）realWorldExample.connections "${p}" 无效`); } });
    }
  });

  if (v2Err === 0) {
    notes.push(`v2 微型课程合同全部满足（${v2Concepts.length} 个概念，${v2ExerciseIds.size} 个练习 ID）`);
  }
}

// —— 汇总 ——
console.log(`Code Atlas 数据质检（${concepts.length} 个概念 / ${modules.length} 个模块）`);
console.log(`成熟度分布：L1=${levelCount.L1}  L2=${levelCount.L2}  L3=${levelCount.L3}  L4=${levelCount.L4}`);
console.log(`v2 微型课程：${v2Concepts.length} 个`);
console.log(`错误 ${errors.length} · 警告 ${warnings.length}`);
notes.forEach((n) => console.log(`  [INFO] ${n}`));
errors.forEach((e) => console.log(`  [ERROR] ${e}`));
warnings.forEach((w) => console.log(`  [WARN ] ${w}`));

process.exit(errors.length > 0 ? 1 : 0);
