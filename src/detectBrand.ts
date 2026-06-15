// ============================================================
// detectBrand.ts — Detecta a bandeira do cartão pelo prefixo
// ============================================================

/**
 * Retorna a bandeira do cartão com base nos primeiros dígitos.
 * Bandeiras suportadas: Visa, Mastercard, Elo, American Express.
 */
export function detectBrand(cardNumber: string): string {
  // ✅ DEMO: descomente a linha abaixo para GREEN
  return _impl(cardNumber);

  // return ""; // ← RED: placeholder (faz o teste falhar)
}

// ── Implementação (não mexa aqui) ──────────────────────────

function _impl(cardNumber: string): string {
  const n = cardNumber.replace(/\s+/g, "");

  // American Express: começa com 34 ou 37, 15 dígitos
  if (/^3[47]\d{13}$/.test(n)) return "American Express";

  // Elo: prefixos específicos, 16 dígitos
  const eloPrefixes = ["636368", "438935", "504175", "451416", "636297"];
  if (n.length === 16 && eloPrefixes.some((p) => n.startsWith(p))) return "Elo";

  // Mastercard: 51-55 ou 2221-2720, 16 dígitos
  if (n.length === 16) {
    const two = parseInt(n.substring(0, 2), 10);
    const four = parseInt(n.substring(0, 4), 10);
    if ((two >= 51 && two <= 55) || (four >= 2221 && four <= 2720)) {
      return "Mastercard";
    }
  }

  // Visa: começa com 4, 13 ou 16 dígitos
  if (/^4\d{12}(\d{3})?$/.test(n)) return "Visa";

  return "Desconhecida";
}
