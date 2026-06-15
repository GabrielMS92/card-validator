import { detectBrand } from "../src/detectBrand";

describe("detectBrand — Detecção de bandeira pelo prefixo", () => {
  it("deve retornar 'Visa' para cartão começando com 4", () => {
    expect(detectBrand("4539578763621486")).toBe("Visa");
  });

  it("deve retornar 'Mastercard' para prefixo 51-55", () => {
    expect(detectBrand("5425233430109903")).toBe("Mastercard");
  });

  it("deve retornar 'Mastercard' para prefixo 2221-2720", () => {
    expect(detectBrand("2223000048410010")).toBe("Mastercard");
  });

  it("deve retornar 'American Express' para prefixo 34 ou 37", () => {
    expect(detectBrand("371449635398431")).toBe("American Express");
  });

  it("deve retornar 'Elo' para prefixo conhecido", () => {
    expect(detectBrand("6363680000000007")).toBe("Elo");
  });

  it("deve retornar 'Desconhecida' para número sem padrão", () => {
    expect(detectBrand("9999999999999999")).toBe("Desconhecida");
  });
});
