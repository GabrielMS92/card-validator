/**
 * toggle.js — Alterna os arquivos de implementação entre RED e GREEN.
 *
 * Uso:
 *   node scripts/toggle.js red     → Comenta os _impl(), deixa placeholders
 *   node scripts/toggle.js green   → Descomenta os _impl(), comenta placeholders
 *   node scripts/toggle.js status  → Mostra o estado atual de cada arquivo
 */

const fs = require("fs");
const path = require("path");

const FILES = [
  path.join(__dirname, "..", "src", "detectBrand.ts"),
  path.join(__dirname, "..", "src", "validateNumber.ts"),
  path.join(__dirname, "..", "src", "cardService.ts"),
];

// Padrões que identificam as linhas de toggle
const IMPL_CALL   = /^(\s*)\/\/\s*(return _impl\(.*\);)\s*$/;  // _impl comentado (RED)
const IMPL_ACTIVE = /^(\s*)(return _impl\(.*\);)\s*$/;         // _impl ativo (GREEN)

function toRed(lines) {
  return lines.map((line) => {
    // _impl ativo → comenta
    if (IMPL_ACTIVE.test(line)) {
      return line.replace(IMPL_ACTIVE, "$1// $2");
    }
    // placeholder comentado → descomenta
    if (/^\s*\/\/\s*(return ""|return false|throw new Error)/.test(line)) {
      return line.replace(/\/\/\s*/, "");
    }
    return line;
  });
}

function toGreen(lines) {
  return lines.map((line) => {
    // _impl comentado → descomenta
    if (IMPL_CALL.test(line)) {
      return line.replace(IMPL_CALL, "$1$2");
    }
    // placeholder ativo → comenta
    if (/^\s*(return ""|return false|throw new Error)/.test(line)) {
      return line.replace(/^(\s*)/, "$1// ");
    }
    return line;
  });
}

function getStatus(lines) {
  for (const line of lines) {
    if (IMPL_ACTIVE.test(line)) return "GREEN";
    if (IMPL_CALL.test(line))   return "RED";
  }
  return "???";
}

// ── Main ───────────────────────────────────────────────────

const cmd = process.argv[2] || "status";

for (const file of FILES) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  const name = path.basename(file);

  if (cmd === "status") {
    console.log(`  ${name}: ${getStatus(lines)}`);
  } else if (cmd === "red") {
    fs.writeFileSync(file, toRed(lines).join("\n"), "utf-8");
    console.log(`  ${name} → RED`);
  } else if (cmd === "green") {
    fs.writeFileSync(file, toGreen(lines).join("\n"), "utf-8");
    console.log(`  ${name} → GREEN`);
  } else {
    console.error("Uso: node scripts/toggle.js [red|green|status]");
    process.exit(1);
  }
}
