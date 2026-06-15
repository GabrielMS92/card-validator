// ============================================================
// validateNumber.ts — Valida o número do cartão (Luhn)
// ============================================================

/**
 * Verifica se o número do cartão é válido usando o algoritmo de Luhn.
 * Retorna true se o dígito verificador estiver correto.
 */
export function validateNumber(cardNumber: string): boolean {
  // DEMO: descomente a linha abaixo para GREEN
  //return _impl(cardNumber);

  return false; // ← RED: placeholder (faz o teste falhar)
}

// ── Implementação (não mexa aqui) ──────────────────────────

function _impl(cardNumber: string): boolean {
  const n = cardNumber.replace(/\s+/g, "");

  // Deve conter apenas dígitos e ter entre 13 e 19 caracteres
  if (!/^\d{13,19}$/.test(n)) return false;

  let sum = 0;
  let alternate = false;

  // Percorre da direita para a esquerda
  for (let i = n.length - 1; i >= 0; i--) {
    let digit = parseInt(n[i], 10);

    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}
