/*
  Warnings:

  - Made the column `readingTime` on table `Blogs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blogs" ALTER COLUMN "readingTime" SET NOT NULL,
ALTER COLUMN "readingTime" SET DATA TYPE TEXT;
