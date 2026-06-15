# Card Validator — Demo Jest + TDD

Validador de bandeira de cartão de crédito para demonstração do ciclo **Red-Green-Refactor** com **Jest**, **TypeScript** e **Prisma**.

## Stack

- **TypeScript** — tipagem estática
- **Node.js 22** — runtime
- **Prisma + SQLite** — ORM com banco local (sem servidor externo)
- **Jest + ts-jest** — framework de testes

---

## Setup

### Opção 1 — Local (só precisa de Node.js 18+)

```bash
git clone <url-do-repo>
cd card-validator
npm install
npm run setup           # gera Prisma Client + cria o banco SQLite
npm test                # roda os testes
```

### Opção 2 — Docker (não precisa de Node.js instalado)

```bash
git clone <url-do-repo>
cd card-validator
docker compose run test           # builda e roda os testes
docker compose run coverage       # roda com relatório de cobertura
docker compose run watch          # modo watch (reexecuta ao salvar)
```

### Opção 3 — GitHub Codespaces (zero setup)

Abra o repo no Codespaces. O `devcontainer.json` já roda `npm install && npm run setup` automaticamente ao criar o ambiente.

---

## Estrutura do projeto

```
src/
├── detectBrand.ts     ← detecta Visa, Master, Elo, Amex pelo prefixo
├── validateNumber.ts  ← valida o número pelo algoritmo de Luhn
├── cardService.ts     ← serviço que combina ambos + salva via Prisma
└── prisma.ts          ← singleton do PrismaClient

tests/
├── detectBrand.test.ts     ← testes unitários de bandeira
├── validateNumber.test.ts  ← testes unitários do Luhn
└── cardService.test.ts     ← teste com mock do Prisma (jest.mock)
```

---

## Como funciona o toggle RED / GREEN

Cada arquivo de implementação segue o mesmo padrão:

```typescript
export function detectBrand(cardNumber: string): string {
  // ✅ DEMO: descomente a linha abaixo para GREEN
  // return _impl(cardNumber);

  return ""; // ← RED: placeholder (faz o teste falhar)
}

function _impl(cardNumber: string): string {
  // ... implementação real (nunca mexer) ...
}
```

Para alternar entre os estados:

| Estado | O que fazer | Resultado no terminal |
|--------|-------------|-----------------------|
| **RED** | Deixar `_impl()` comentado | Testes falham (vermelho) |
| **GREEN** | Descomentar `_impl()`, comentar placeholder | Testes passam (verde) |

### Via script (prático)

```bash
# Local
node scripts/toggle.js red      # Todos os arquivos → RED
node scripts/toggle.js green    # Todos os arquivos → GREEN
node scripts/toggle.js status   # Mostra o estado atual

# Docker (o volume monta o src local, então o toggle roda no host)
node scripts/toggle.js red
docker compose run test
```

### Via atalho no VS Code (visual para o vídeo)

1. Selecione a linha `// return _impl(cardNumber);`
2. Pressione `Ctrl+/` (descomenta)
3. Selecione a linha `return "";` (ou `return false;` ou `throw ...`)
4. Pressione `Ctrl+/` (comenta)
5. Salve e rode `npm test`

---

## Comandos

### Local

```bash
npm test                  # roda todos os testes
npm run test:watch        # modo watch (reexecuta ao salvar)
npm run test:coverage     # gera relatório de cobertura
npm run demo:red          # alterna para RED + roda os testes
npm run demo:green        # alterna para GREEN + roda os testes
```

### Docker

```bash
docker compose run test       # roda todos os testes
docker compose run watch      # modo watch
docker compose run coverage   # cobertura (resultado fica em ./coverage/)
```

---

## Roteiro de gravação do vídeo

1. `node scripts/toggle.js red` — coloca tudo em RED
2. Abra o VS Code com editor + terminal (split)
3. Grave a tela (OBS, Loom, ou a gravação do Codespaces)
4. **Trecho 1** — `detectBrand`: mostra o teste, roda (`npm test -- detectBrand`), RED → descomenta → GREEN
5. **Trecho 2** — `validateNumber`: mesma coisa
6. **Trecho 3** — `cardService`: mostra o `jest.mock()`, RED → GREEN
7. **Final** — `npm run test:coverage` → todos verdes + tabela de cobertura
8. Pare a gravação (~10 min)
