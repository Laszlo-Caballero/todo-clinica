-- CreateTable
CREATE TABLE "Personal" (
    "personalId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCompleto" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Todos" (
    "todoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tarea" TEXT NOT NULL,
    "importancia" TEXT,
    "fechaInicio" DATETIME NOT NULL,
    "tiempoEstimado" TEXT,
    "fechaFin" DATETIME,
    "personalId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Todos_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("personalId") ON DELETE RESTRICT ON UPDATE CASCADE
);
