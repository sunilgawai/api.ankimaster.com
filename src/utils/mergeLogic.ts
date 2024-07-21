import { Card, Col, Note, SyncData } from "../types";

export const compareAndMerge = (
  serverData: SyncData,
  clientData: SyncData
): { updatedServerData: SyncData; updatedClientData: SyncData } => {
  const updatedServerData: SyncData = {
    notes: mergeNotes(serverData.notes, clientData.notes),
    cards: mergeCards(serverData.cards, clientData.cards),
    col: mergeCol(serverData.col, clientData.col),
  };

  const updatedClientData: SyncData = {
    notes: updatedServerData.notes,
    cards: updatedServerData.cards,
    col: updatedServerData.col,
  };

  return { updatedServerData, updatedClientData };
};

function mergeNotes(serverNotes: Note[], clientNotes: Note[]): Note[] {
  const mergedNotes = [...serverNotes];
  const serverNoteMap = new Map(serverNotes.map((note) => [note.id, note]));

  for (const clientNote of clientNotes) {
    const serverNote = serverNoteMap.get(clientNote.id);

    if (!serverNote) {
      // New note from client, add it
      mergedNotes.push(clientNote);
    } else if (clientNote.mod > serverNote.mod) {
      // Client note is newer, update server note
      const index = mergedNotes.findIndex((note) => note.id === clientNote.id);
      mergedNotes[index] = clientNote;
    }
    // If server note is newer, keep server version
  }

  return mergedNotes;
}

function mergeCards(serverCards: Card[], clientCards: Card[]): Card[] {
  const mergedCards = [...serverCards];
  const serverCardMap = new Map(serverCards.map((card) => [card.id, card]));

  for (const clientCard of clientCards) {
    const serverCard = serverCardMap.get(clientCard.id);

    if (!serverCard) {
      // New card from client, add it
      mergedCards.push(clientCard);
    } else if (clientCard.mod > serverCard.mod) {
      // Client card is newer, update server card
      const index = mergedCards.findIndex((card) => card.id === clientCard.id);
      mergedCards[index] = clientCard;
    }
    // If server card is newer, keep server version
  }

  return mergedCards;
}

function mergeCol(serverCol: Col | null, clientCol: Col | null): Col | null {
  // For the collection, we'll use a simple "latest wins" strategy
  if (!serverCol || (clientCol && clientCol.mod > serverCol.mod)) {
    return clientCol;
  }
  return serverCol;
}
