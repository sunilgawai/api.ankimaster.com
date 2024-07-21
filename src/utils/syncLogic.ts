import { Notes, Cards, Col } from '@prisma/client';
import { database } from '../services/database';

interface SyncData {
  notes: Notes[];
  cards: Cards[];
  col: Col | null;
}

export async function syncWithServer(userId: string, clientData: SyncData): Promise<SyncData> {
  const serverData = await getServerData(userId);
  const mergedData = compareAndMerge(serverData, clientData);
  await updateServerDatabase(mergedData.updatedServerData, userId);
  return mergedData.updatedClientData;
}

async function getServerData(userId: string): Promise<SyncData> {
  const [notes, cards, col] = await Promise.all([
    database.notes.findMany({ where: { userId } }),
    database.cards.findMany({ where: { userId } }),
    database.col.findFirst(),
  ]);

  return { notes, cards, col };
}

function compareAndMerge(serverData: SyncData, clientData: SyncData): { updatedServerData: SyncData; updatedClientData: SyncData } {
  const updatedServerData: SyncData = {
    notes: mergeNotes(serverData.notes, clientData.notes),
    cards: mergeCards(serverData.cards, clientData.cards),
    col: mergeCol(serverData.col, clientData.col),
  };

  return { updatedServerData, updatedClientData: updatedServerData };
}

function mergeNotes(serverNotes: Notes[], clientNotes: Notes[]): Notes[] {
  const mergedNotes = [...serverNotes];
  const serverNoteMap = new Map(serverNotes.map(note => [note.id, note]));

  for (const clientNote of clientNotes) {
    const serverNote = serverNoteMap.get(clientNote.id);

    if (!serverNote) {
      mergedNotes.push(clientNote);
    } else if (clientNote.mod > serverNote.mod) {
      Object.assign(serverNote, clientNote);
    }
  }

  return mergedNotes;
}

function mergeCards(serverCards: Cards[], clientCards: Cards[]): Cards[] {
  const mergedCards = [...serverCards];
  const serverCardMap = new Map(serverCards.map(card => [card.id, card]));

  for (const clientCard of clientCards) {
    const serverCard = serverCardMap.get(clientCard.id);

    if (!serverCard) {
      mergedCards.push(clientCard);
    } else if (clientCard.mod > serverCard.mod) {
      Object.assign(serverCard, clientCard);
    }
  }

  return mergedCards;
}

function mergeCol(serverCol: Col | null, clientCol: Col | null): Col | null {
  if (!serverCol || (clientCol && clientCol.mod > serverCol.mod)) {
    return clientCol;
  }
  return serverCol;
}

async function updateServerDatabase(data: SyncData, userId: string): Promise<void> {
  await database.$transaction(async (database) => {
    // Update notes
    for (const note of data.notes) {
      await database.notes.upsert({
        where: { id: note.id },
        update: note,
        create: { ...note, userId },
      });
    }

    // Update cards
    for (const card of data.cards) {
      await database.cards.upsert({
        where: { id: card.id },
        update: card,
        create: { ...card, userId },
      });
    }

    // Update col
    if (data.col) {
      await database.col.upsert({
        where: { id: data.col.id },
        update: data.col,
        create: data.col,
      });
    }
  });
}