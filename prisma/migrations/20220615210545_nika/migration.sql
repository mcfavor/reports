/*
  Warnings:

  - Added the required column `description` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
