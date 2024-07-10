/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_cardId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Deck";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "Col" (
    "id" INTEGER NOT NULL,
    "crt" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "scm" INTEGER NOT NULL,
    "ver" INTEGER NOT NULL,
    "dty" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "ls" INTEGER NOT NULL,
    "conf" TEXT NOT NULL,
    "models" TEXT NOT NULL,
    "decks" TEXT NOT NULL,
    "dconf" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Col_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" INTEGER NOT NULL,
    "guid" TEXT NOT NULL,
    "mid" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "flds" TEXT NOT NULL,
    "sfld" INTEGER NOT NULL,
    "csum" INTEGER NOT NULL,
    "flags" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" INTEGER NOT NULL,
    "nid" INTEGER NOT NULL,
    "did" INTEGER NOT NULL,
    "ord" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "queue" INTEGER NOT NULL,
    "due" INTEGER NOT NULL,
    "ivl" INTEGER NOT NULL,
    "factor" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "lapses" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "odue" INTEGER NOT NULL,
    "odid" INTEGER NOT NULL,
    "flags" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revlog" (
    "id" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "ease" INTEGER NOT NULL,
    "ivl" INTEGER NOT NULL,
    "lastIvl" INTEGER NOT NULL,
    "factor" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Revlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graves" (
    "id" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "oid" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Graves_pkey" PRIMARY KEY ("id")
);
