/*
  Warnings:

  - You are about to alter the column `sfld` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `csum` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "sfld" SET DATA TYPE INTEGER,
ALTER COLUMN "csum" SET DATA TYPE INTEGER;
