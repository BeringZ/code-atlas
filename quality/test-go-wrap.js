#!/usr/bin/env node
/**
 * test-go-wrap.js — verify-concepts.js 的 Go wrapper 单元测试
 *
 * 覆盖 verify-concepts.js 的 Go 包装逻辑（I15 后续修复）：
 *   - 完整程序（package 声明）原样使用，不重复包裹
 *   - import "x" 单行形式解析为合法 import 块
 *   - import (…) 多行块解析
 *   - 智能导入：只导入实际使用的包，显式声明但未使用的包被排除（杜绝 unused import）
 *
 * 本机无 Go 时 SKIP（CI 矩阵负责真实验证）；有 Go 时真实编译运行断言输出。
 * 运行：node quality/test-go-wrap.js   退出码 0=通过（或 SKIP）
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');

function available(cmd) {
  try { execFileSync('sh', ['-c', `command -v ${cmd}`], { stdio: 'ignore' }); return true; }
  catch { return false; }
}
if (!available('go')) { console.log('本机无 Go，跳过 Go wrapper 单元测试（CI 矩阵负责）'); process.exit(0); }

// 从 verify-concepts.js 提取 wrap 相关函数（不执行完整验证）
const src = fs.readFileSync(path.join(root, 'quality/verify-concepts.js'), 'utf8');
const fnSrc = src.slice(src.indexOf('// 提取前置声明'), src.indexOf('const EXT ='));
const sandbox = { console: { log: () => {} } };
vm.createContext(sandbox);
vm.runInContext(fnSrc, sandbox, { filename: 'wrap-fns.js' });
const wrap = sandbox.wrap;

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? ' — ' + detail : ''}`); }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'go-wrap-test-'));
const cases = [
  ['完整程序原样使用（不重复包裹）', 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println(1)\n}', '1'],
  ['单行 import 解析为合法 import 块', 'import "strings"\ns := "a"\nfmt.Println(strings.Replace(s, "a", "b", 1))', 'b'],
  ['多行 import 块解析且未用包被排除', 'import (\n    "strings"\n    "sync"\n)\nfmt.Println("x")', 'x'],
  ['无 import 仅 fmt 推断导入', 'fmt.Println("hi")', 'hi'],
];
for (const [name, code, expect] of cases) {
  const file = path.join(tmp, 'c.go');
  fs.writeFileSync(file, wrap('go', code));
  try {
    const out = execFileSync('go', ['run', file], { encoding: 'utf8', timeout: 20000, stdio: ['ignore', 'pipe', 'pipe'] });
    check(name, out.trim() === expect, `输出 ${JSON.stringify(out.trim())} 预期 ${expect}`);
  } catch (e) {
    check(name, false, String(e.stderr || e.message).split('\n').filter(Boolean).slice(0, 2).join(' | '));
  }
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n结果：${pass} 通过 / ${fail} 失败`);
process.exit(fail > 0 ? 1 : 0);
