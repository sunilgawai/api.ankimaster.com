/*
  Warnings:

  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `mid` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `mod` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `usn` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `flags` on the `Notes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "mid" SET DATA TYPE INTEGER,
ALTER COLUMN "mod" SET DATA TYPE INTEGER,
ALTER COLUMN "usn" SET DATA TYPE INTEGER,
ALTER COLUMN "flags" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("id");
