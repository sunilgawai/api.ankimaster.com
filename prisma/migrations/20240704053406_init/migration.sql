-- CreateTable
CREATE TABLE "Col" (
    "id" INTEGER NOT NULL,
    "crt" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "scm" BIGINT NOT NULL,
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
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "guid" TEXT NOT NULL,
    "mid" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "tags" TEXT[],
    "fields" JSONB NOT NULL,
    "sfld" INTEGER NOT NULL,
    "csum" INTEGER NOT NULL,
    "flags" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "deckId" INTEGER NOT NULL,
    "ordinal" INTEGER NOT NULL,
    "mod" INTEGER NOT NULL,
    "usn" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "queue" INTEGER NOT NULL,
    "due" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "factor" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "lapses" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "odue" INTEGER NOT NULL,
    "odid" INTEGER NOT NULL,
    "flags" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "suspended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "ease" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usn" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "lastIvl" INTEGER NOT NULL,
    "factor" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grave" (
    "id" SERIAL NOT NULL,
    "usn" INTEGER NOT NULL,
    "oid" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Grave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "cardTemplates" JSONB NOT NULL,
    "css" TEXT,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
