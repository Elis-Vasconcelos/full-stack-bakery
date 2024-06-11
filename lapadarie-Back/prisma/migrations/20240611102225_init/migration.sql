-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "totalPao" INTEGER NOT NULL,
    "totalPagar" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "totalPao" INTEGER NOT NULL,
    "totalPagar" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Estatisticas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalPao" INTEGER NOT NULL DEFAULT 0,
    "totalPagar" REAL NOT NULL DEFAULT 0,
    "tamanhoFila" INTEGER NOT NULL DEFAULT 0
);
