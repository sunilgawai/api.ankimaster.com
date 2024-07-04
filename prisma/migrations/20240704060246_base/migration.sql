/*
  Warnings:

  - You are about to drop the column `data` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `due` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `factor` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `flags` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `lapses` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `left` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `mod` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `odid` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `odue` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `queue` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `usn` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `csum` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `flags` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `guid` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `mid` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `mod` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `sfld` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `usn` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `factor` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `lastIvl` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `usn` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Col` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Grave` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dueDate` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ease` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "data",
DROP COLUMN "due",
DROP COLUMN "factor",
DROP COLUMN "flags",
DROP COLUMN "lapses",
DROP COLUMN "left",
DROP COLUMN "mod",
DROP COLUMN "odid",
DROP COLUMN "odue",
DROP COLUMN "queue",
DROP COLUMN "reps",
DROP COLUMN "type",
DROP COLUMN "usn",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ease" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "csum",
DROP COLUMN "data",
DROP COLUMN "flags",
DROP COLUMN "guid",
DROP COLUMN "mid",
DROP COLUMN "mod",
DROP COLUMN "sfld",
DROP COLUMN "usn";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "factor",
DROP COLUMN "interval",
DROP COLUMN "lastIvl",
DROP COLUMN "type",
DROP COLUMN "usn";

-- DropTable
DROP TABLE "Col";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Grave";
