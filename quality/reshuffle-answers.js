#!/usr/bin/env node
/**
 * reshuffle-answers.js — 习题答案位置随机化修复（一次性迁移脚本）
 *
 * 背景（质检报告 v0.1 发现）：Code Atlas 369 道练习题中 338 道（91.6%）的
 * 正确答案固定在第 2 个选项（answer: 1），违反计划书「正确答案位置随机化并
 * 做分布检查，单一位置不高于 35%」的量化验收指标，会形成猜题规律。
 *
 * 做法：对每道题的 options 做确定性 Fisher-Yates 洗牌（固定 seed，结果可复现
 * 可审查），answer 跟随原正确答案的新位置。选项集合不变，仅顺序变化，
 * 干扰项语义不受影响。
 *
 * 同时修复：function.lambda → function.closure 的循环前置依赖（破环）。
 *
 * 运行：node quality/reshuffle-answers.js    （会就地改写概念数据文件，运行前请先 git commit 备份）
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SEED = 20260803; // 固定 seed：结果可复现
// mulberry32 确定性 PRNG
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const files = ['concept-data.js', 'concepts-supplement.js'];
const blockRe = /"options":\s*(\[.*?\]),\s*"answer":\s*(\d+)/gs;
let total = 0;
const posDist = {};
const afterDist = {};

for (const f of files) {
  const fp = path.join(__dirname, '..', f);
  let t = fs.readFileSync(fp, 'utf8');
  const rng = mulberry32(SEED + files.indexOf(f));
  t = t.replace(blockRe, (whole, optsStr, ansStr) => {
    total++;
    const opts = JSON.parse(optsStr);
    const origAnswer = parseInt(ansStr, 10);
    posDist[origAnswer] = (posDist[origAnswer] || 0) + 1;
    if (!Array.isArray(opts) || origAnswer < 0 || origAnswer >= opts.length) {
      console.error(`  跳过（结构异常）：${whole.slice(0, 60)}`);
      return whole;
    }
    const correct = opts[origAnswer];
    shuffle(opts, rng);
    const newAnswer = opts.indexOf(correct); // 洗牌后正确答案的新位置
    afterDist[newAnswer] = (afterDist[newAnswer] || 0) + 1;
    return `"options": ${JSON.stringify(opts, null, 0).replace(/,/g, ', ')}, "answer": ${newAnswer}`;
  });

  // 修复循环依赖：function.lambda 不应依赖 function.closure（讲闭包才依赖匿名函数）
  if (f === 'concept-data.js') {
    const before = t.includes('"function.lambda"') ? t : t;
    const lambdaBlock = t.match(/"id": "function\.lambda"[^}]*"prerequisites":\s*\[[^\]]*\]/s);
    if (lambdaBlock) {
      const patched = lambdaBlock[0].replace(
        /"prerequisites":\s*(\[[^\]]*\])/s,
        (m, arr) => {
          const pre = JSON.parse(arr).filter((p) => p !== 'function.closure');
          return `"prerequisites": ${JSON.stringify(pre)}`;
        }
      );
      if (patched !== lambdaBlock[0]) {
        t = t.replace(lambdaBlock[0], patched);
        console.log('  已修复 function.lambda 的循环前置依赖（移除 function.closure）');
      }
    }
  }
  fs.writeFileSync(fp, t, 'utf8');
  console.log(`${f} 处理完成（${(blockRe.lastIndex = 0, t.match(blockRe) ? '重写' : '')}）`);
}

console.log(`\n共洗牌 ${total} 道题`);
console.log('修复前答案位置分布:', JSON.stringify(posDist));
console.log('修复后答案位置分布:', JSON.stringify(afterDist));
const maxPct = Math.max(...Object.values(afterDist)) / total;
console.log(`修复后最高位置占比: ${(maxPct * 100).toFixed(1)}%（目标 ≤35%）`);
