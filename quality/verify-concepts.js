#!/usr/bin/env node
/**
 * verify-concepts.js — L4 知识点六语言运行验证（计划书「示例代码真实运行验证」）
 *
 * 对每个 level==='L4' 的概念，提取六语言 minimal_code，生成可运行包装，
 * 用本机运行时执行，并断言输出包含预期码点数（acceptanceTests 的 codePoints）。
 * Go 在本机缺失时标记 SKIP（CI 矩阵负责）。
 *
 * 运行：node quality/verify-concepts.js   退出码 0=全部通过
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const os = require('os');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
['concept-data.js', 'concepts-supplement.js'].forEach((f) => {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
});
const D2 = sandbox.window.CODE_ATLAS_2;
const concepts = D2.concepts.filter((c) => c.level === 'L3' || c.level === 'L4');
if (!concepts.length) { console.log('无 L4 概念，跳过'); process.exit(0); }

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ca-verify-'));
let pass = 0, fail = 0, skip = 0;

function run(cmd, args, cwd) {
  return execFileSync(cmd, args, { cwd, encoding: 'utf8', timeout: 20000, stdio: ['ignore', 'pipe', 'pipe'] });
}
function available(cmd) {
  try { execFileSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' }); return true; }
  catch { return false; }
}

// 提取前置声明（import / #include / use）到包装外层（I5-A：六语言样板带 import 时的修正）
function extractPrelude(lang, code) {
  const lines = code.split('\n');
  const isPre = (l) => {
    const s = l.trim();
    if (lang === 'java') return s.startsWith('import ');
    if (lang === 'cpp') return s.startsWith('#include');
    if (lang === 'rust') return s.startsWith('use ') && s.includes('::');
    if (lang === 'go') return s.startsWith('import '); // I12-B：Go 标准库 import 提取
    return false;
  };
  return { prelude: lines.filter(isPre).join('\n'), body: lines.filter((l) => !isPre(l)).join('\n') };
}

// 每语言：minimal_code → 可运行包装
function wrap(lang, code) {
  const { prelude, body } = extractPrelude(lang, code);
  const indent = (s) => s.split('\n').map((l) => '    ' + l).join('\n');
  if (lang === 'python') return code;
  if (lang === 'javascript') return code;
  if (lang === 'java') return `${prelude}\npublic class Main {\n    public static void main(String[] args) {\n${indent(body)}\n    }\n}`;
  if (lang === 'cpp') return `${prelude}\n#include <iostream>\n#include <string>\nint main() {\n${indent(body)}\n    std::cout << std::endl;\n    return 0;\n}`;
  if (lang === 'go') return `package main\n\nimport (\n    "fmt"\n    "unicode/utf8"${prelude ? '\n    ' + prelude.split('\n').map((l) => l.trim()).join('\n    ') : ''}\n)\n\nfunc main() {\n${indent(body)}\n}`;
  if (lang === 'rust') return `${prelude}\nfn main() {\n${indent(body)}\n}`;
  return null;
}
const EXT = { python: 'py', javascript: 'mjs', java: 'java', cpp: 'cpp', go: 'go', rust: 'rs' };
const RUNNER = {
  python: (f) => run(available('python3') ? 'python3' : 'python', [f], tmp),
  javascript: (f) => run('node', [f], tmp),
  java: (f) => { run('javac', [f], tmp); return run('java', ['-cp', tmp, 'Main'], tmp); },
  cpp: (f) => { run('g++', ['-std=c++17', f, '-o', path.join(tmp, 'a.out')], tmp); return run(path.join(tmp, 'a.out'), [], tmp); },
  go: (f) => { if (!available('go')) throw new Error('GO_MISSING'); return run('go', ['run', f], tmp); },
  rust: (f) => { run('rustc', ['-O', f, '-o', path.join(tmp, 'rs.out')], tmp); return run(path.join(tmp, 'rs.out'), [], tmp); },
};

console.log(`验证 L3+ 概念：${concepts.map((c) => c.id).join(', ')}`);
for (const c of concepts) {
  // 泛化断言（I5-A）：取第一条验收测试的期望值（支持数字 codePoints 与字符串 result）
  const at = (c.acceptanceTests || [])[0];
  const expectVal = at ? String(at.expect) : null;
  for (const lang of ['python', 'javascript', 'java', 'cpp', 'go', 'rust']) {
    const v = c.variants && c.variants[lang];
    if (!v || !v.minimal_code) { console.log(`  ⚠ ${lang}: 缺 minimal_code`); skip++; continue; }
    const file = path.join(tmp, (lang === 'java' ? 'Main' : `c_${lang}`) + `.${EXT[lang]}`);
    fs.writeFileSync(file, wrap(lang, v.minimal_code));
    try {
      const out = RUNNER[lang](file);
      const hasVal = !expectVal || out.includes(expectVal);
      if (hasVal) { pass++; console.log(`  ✓ ${lang.padEnd(10)} 输出=${JSON.stringify(out.trim().split('\n').join(' / '))}`); }
      else { fail++; console.log(`  ✗ ${lang} 输出 ${JSON.stringify(out)} 不含预期 ${expectVal}`); }
    } catch (e) {
      if (/GO_MISSING/.test(e.message)) { skip++; console.log(`  — go: 本机未安装，CI 矩阵负责`); }
      else { fail++; console.log(`  ✗ ${lang} 运行失败: ${String(e.message).split('\n').slice(0, 4).join(' ')}`); }
    }
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n结果：${pass} 通过 / ${fail} 失败 / ${skip} 跳过`);
process.exit(fail > 0 ? 1 : 0);
