FROM node:22-alpine

WORKDIR /app

# Dependências nativas que o Prisma exige no Alpine (musl)
RUN apk add --no-cache openssl libc6-compat

# Banco SQLite local (caminho dentro do container)
ENV DATABASE_URL="file:./prisma/dev.db"

COPY package*.json ./
RUN npm install

COPY . .

# Gera o Prisma Client (com binaryTarget musl) e cria as tabelas
RUN npx prisma generate && npx prisma db push

CMD ["npm", "test"]
