-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Personal" (
    "personalId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCompleto" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Personal" ("nombreCompleto", "personalId") SELECT "nombreCompleto", "personalId" FROM "Personal";
DROP TABLE "Personal";
ALTER TABLE "new_Personal" RENAME TO "Personal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
