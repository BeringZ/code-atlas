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
const concepts = D2.concepts.filter((c) => c.level === 'L4');
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

// 每语言：minimal_code → 可运行包装
function wrap(lang, code) {
  if (lang === 'python') return code;
  if (lang === 'javascript') return code;
  if (lang === 'java') return `public class Main {\n    public static void main(String[] args) {\n${code.split('\n').map((l) => '        ' + l).join('\n')}\n    }\n}`;
  if (lang === 'cpp') return `#include <iostream>\n#include <string>\nint main() {\n${code.split('\n').map((l) => '    ' + l).join('\n')}\n    std::cout << std::endl;\n    return 0;\n}`;
  if (lang === 'go') return `package main\n\nimport (\n    "fmt"\n    "unicode/utf8"\n)\n\nfunc main() {\n${code.split('\n').map((l) => '    ' + l).join('\n')}\n}`;
  if (lang === 'rust') return `fn main() {\n${code.split('\n').map((l) => '    ' + l).join('\n')}\n}`;
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

console.log(`验证 L4 概念：${concepts.map((c) => c.id).join(', ')}`);
for (const c of concepts) {
  const expectCP = (c.acceptanceTests || []).find((t) => /codePoints/.test(t.assert));
  for (const lang of ['python', 'javascript', 'java', 'cpp', 'go', 'rust']) {
    const v = c.variants && c.variants[lang];
    if (!v || !v.minimal_code) { console.log(`  ⚠ ${lang}: 缺 minimal_code`); skip++; continue; }
    const file = path.join(tmp, (lang === 'java' ? 'Main' : `c_${lang}`) + `.${EXT[lang]}`);
    fs.writeFileSync(file, wrap(lang, v.minimal_code));
    try {
      const out = RUNNER[lang](file);
      const hasCP = !expectCP || out.includes(String(expectCP.expect));
      if (hasCP) { pass++; console.log(`  ✓ ${lang.padEnd(10)} 输出=${JSON.stringify(out.trim().split('\n').join(' / '))}`); }
      else { fail++; console.log(`  ✗ ${lang} 输出 ${JSON.stringify(out)} 不含预期码点 ${expectCP.expect}`); }
    } catch (e) {
      if (/GO_MISSING/.test(e.message)) { skip++; console.log(`  — go: 本机未安装，CI 矩阵负责`); }
      else { fail++; console.log(`  ✗ ${lang} 运行失败: ${String(e.message).split('\n').slice(0, 4).join(' ')}`); }
    }
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n结果：${pass} 通过 / ${fail} 失败 / ${skip} 跳过`);
process.exit(fail > 0 ? 1 : 0);
