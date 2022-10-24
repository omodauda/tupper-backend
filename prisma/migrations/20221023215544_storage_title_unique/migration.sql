/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `storages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "storages_title_key" ON "storages"("title");
