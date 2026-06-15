import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  verbose: true,
  // Cobertura
  collectCoverageFrom: ["src/**/*.ts", "!src/prisma.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
};

export default config;
