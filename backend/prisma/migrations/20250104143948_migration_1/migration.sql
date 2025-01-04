/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Blogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Blogs_title_key" ON "Blogs"("title");
