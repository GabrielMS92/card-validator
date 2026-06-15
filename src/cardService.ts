// ============================================================
// cardService.ts — Serviço que valida e salva o cartão no banco
// ============================================================

import { prisma } from "./prisma";
import { detectBrand } from "./detectBrand";
import { validateNumber } from "./validateNumber";

export interface CardResult {
  id: number;
  number: string;
  brand: string;
  valid: boolean;
}

/**
 * Detecta a bandeira, valida o número e persiste o resultado via Prisma.
 */
export async function validateAndSave(cardNumber: string): Promise<CardResult> {
  // DEMO: descomente a linha abaixo para GREEN
  // return _impl(cardNumber);

  throw new Error("Não implementado"); // ← RED: placeholder
}

// ── Implementação (não mexa aqui) ──────────────────────────

async function _impl(cardNumber: string): Promise<CardResult> {
  const number = cardNumber.replace(/\s+/g, "");
  const brand = detectBrand(number);
  const valid = validateNumber(number);

  const card = await prisma.card.create({
    data: { number, brand, valid },
  });

  return {
    id: card.id,
    number: card.number,
    brand: card.brand,
    valid: card.valid,
  };
}
