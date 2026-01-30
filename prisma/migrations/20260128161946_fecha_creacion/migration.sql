-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todos" (
    "todoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tarea" TEXT NOT NULL,
    "importancia" TEXT,
    "fechaInicio" DATETIME NOT NULL,
    "tiempoEstimado" TEXT,
    "fechaFin" DATETIME,
    "personalId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Todos_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal" ("personalId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todos" ("estado", "fechaFin", "fechaInicio", "importancia", "personalId", "tarea", "tiempoEstimado", "todoId") SELECT "estado", "fechaFin", "fechaInicio", "importancia", "personalId", "tarea", "tiempoEstimado", "todoId" FROM "Todos";
DROP TABLE "Todos";
ALTER TABLE "new_Todos" RENAME TO "Todos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
