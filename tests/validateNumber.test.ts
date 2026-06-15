import { validateNumber } from "../src/validateNumber";

describe("validateNumber — Algoritmo de Luhn", () => {
  it("deve validar um número Visa correto", () => {
    expect(validateNumber("4539578763621486")).toBe(true);
  });

  it("deve validar um número Mastercard correto", () => {
    expect(validateNumber("5425233430109903")).toBe(true);
  });

  it("deve validar um número Amex correto", () => {
    expect(validateNumber("371449635398431")).toBe(true);
  });

  it("deve rejeitar um número com dígito errado", () => {
    expect(validateNumber("4539578763621480")).toBe(false);
  });

  it("deve rejeitar strings com letras", () => {
    expect(validateNumber("abcd1234efgh5678")).toBe(false);
  });

  it("deve rejeitar número curto demais", () => {
    expect(validateNumber("12345")).toBe(false);
  });
});
