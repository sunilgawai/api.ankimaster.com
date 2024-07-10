/*
  Warnings:

  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Col` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Graves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Revlog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "nid" SET DATA TYPE BIGINT,
ALTER COLUMN "did" SET DATA TYPE BIGINT,
ALTER COLUMN "ord" SET DATA TYPE BIGINT,
ALTER COLUMN "mod" SET DATA TYPE BIGINT,
ALTER COLUMN "usn" SET DATA TYPE BIGINT,
ALTER COLUMN "type" SET DATA TYPE BIGINT,
ALTER COLUMN "queue" SET DATA TYPE BIGINT,
ALTER COLUMN "due" SET DATA TYPE BIGINT,
ALTER COLUMN "ivl" SET DATA TYPE BIGINT,
ALTER COLUMN "factor" SET DATA TYPE BIGINT,
ALTER COLUMN "reps" SET DATA TYPE BIGINT,
ALTER COLUMN "lapses" SET DATA TYPE BIGINT,
ALTER COLUMN "left" SET DATA TYPE BIGINT,
ALTER COLUMN "odue" SET DATA TYPE BIGINT,
ALTER COLUMN "odid" SET DATA TYPE BIGINT,
ALTER COLUMN "flags" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Col" DROP CONSTRAINT "Col_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "crt" SET DATA TYPE BIGINT,
ALTER COLUMN "mod" SET DATA TYPE BIGINT,
ALTER COLUMN "scm" SET DATA TYPE BIGINT,
ALTER COLUMN "ver" SET DATA TYPE BIGINT,
ALTER COLUMN "dty" SET DATA TYPE BIGINT,
ALTER COLUMN "usn" SET DATA TYPE BIGINT,
ALTER COLUMN "ls" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Col_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Graves" DROP CONSTRAINT "Graves_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "usn" SET DATA TYPE BIGINT,
ALTER COLUMN "oid" SET DATA TYPE BIGINT,
ALTER COLUMN "type" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Graves_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "mid" SET DATA TYPE BIGINT,
ALTER COLUMN "mod" SET DATA TYPE BIGINT,
ALTER COLUMN "usn" SET DATA TYPE BIGINT,
ALTER COLUMN "sfld" SET DATA TYPE BIGINT,
ALTER COLUMN "csum" SET DATA TYPE BIGINT,
ALTER COLUMN "flags" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Revlog" DROP CONSTRAINT "Revlog_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "cid" SET DATA TYPE BIGINT,
ALTER COLUMN "usn" SET DATA TYPE BIGINT,
ALTER COLUMN "ease" SET DATA TYPE BIGINT,
ALTER COLUMN "ivl" SET DATA TYPE BIGINT,
ALTER COLUMN "lastIvl" SET DATA TYPE BIGINT,
ALTER COLUMN "factor" SET DATA TYPE BIGINT,
ALTER COLUMN "time" SET DATA TYPE BIGINT,
ALTER COLUMN "type" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Revlog_pkey" PRIMARY KEY ("id");
