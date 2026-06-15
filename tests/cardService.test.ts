import { validateAndSave } from "../src/cardService";

// ── Mock do Prisma (jest.mock) ─────────────────────────────
// Substitui o módulo real por um objeto simulado.
// Assim, o teste NÃO precisa de um banco de dados real.
jest.mock("../src/prisma", () => ({
  prisma: {
    card: {
      create: jest.fn(),
    },
  },
}));

// Importa o mock já aplicado para configurar retornos
import { prisma } from "../src/prisma";
const mockCreate = prisma.card.create as jest.Mock;

describe("validateAndSave — Integração com Prisma (mockado)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve detectar Visa, validar e salvar no banco", async () => {
    // Configura o retorno simulado do Prisma
    mockCreate.mockResolvedValue({
      id: 1,
      number: "4539578763621486",
      brand: "Visa",
      valid: true,
      createdAt: new Date(),
    });

    const result = await validateAndSave("4539578763621486");

    // Verifica o resultado
    expect(result.brand).toBe("Visa");
    expect(result.valid).toBe(true);
    expect(result.id).toBe(1);

    // Verifica que o Prisma foi chamado com os dados corretos
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        number: "4539578763621486",
        brand: "Visa",
        valid: true,
      },
    });
  });

  it("deve detectar bandeira desconhecida e número inválido", async () => {
    mockCreate.mockResolvedValue({
      id: 2,
      number: "9999999999999999",
      brand: "Desconhecida",
      valid: false,
      createdAt: new Date(),
    });

    const result = await validateAndSave("9999999999999999");

    expect(result.brand).toBe("Desconhecida");
    expect(result.valid).toBe(false);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
