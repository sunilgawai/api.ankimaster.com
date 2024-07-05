import multer from "multer";
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const cardController = require("../controllers/card.controller");
const deckController = require("../controllers/deck.controller");
const reviewController = require("../controllers/review.controller");
const packageController = require('../controllers/package.controller');

// Note routes
router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getNotes);
router.get("/notes/:noteId", noteController.getNoteById);
router.put("/notes/:noteId", noteController.updateNote);
router.delete("/notes/:noteId", noteController.deleteNote);

// Card routes
router.get("/notes/:noteId/cards", cardController.getCardsByNoteId);
router.get("/cards/:cardId", cardController.getCardById);
router.put("/cards/:cardId", cardController.updateCard);

// Deck routes
router.post("/decks", deckController.createDeck);
router.get("/decks", deckController.getAllDecks);
router.get("/decks/:deckId", deckController.getDeckById);
router.put("/decks/:deckId", deckController.updateDeck);
router.delete("/decks/:deckId", deckController.deleteDeck);

// Review routes
router.get("/review", reviewController.getNextReviewCards);
router.post("/review", reviewController.submitReview);
router.post("/review/action", reviewController.buryOrSuspendCard);

const upload = multer({ storage: multer.memoryStorage() });
// Imports/Exports
router.post('/import',upload.single('apkg'), packageController.importDeck);
router.get('/export', packageController.exportCollection);

module.exports = router;
