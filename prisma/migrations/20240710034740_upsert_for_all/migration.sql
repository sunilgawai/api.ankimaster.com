/*
  Warnings:

  - Changed the type of `csum` on the `Notes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Notes" DROP COLUMN "csum",
ADD COLUMN     "csum" BIGINT NOT NULL;
