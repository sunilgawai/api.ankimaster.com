// @ts-nocheck

import { database } from "../services/database";

exports.getCardsByNoteId = async (req, res) => {
	const { noteId } = req.params;

	try {
		const cards = await database.card.findMany({
			where: { noteId: parseInt(noteId) },
		});
		res.json(cards);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getCardById = async (req, res) => {
	const { cardId } = req.params;

	try {
		const card = await database.card.findUnique({
			where: { id: parseInt(cardId) },
		});
		if (!card) {
			return res.status(404).json({ error: "Card not found" });
		}
		res.json(card);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updateCard = async (req, res) => {
	const { cardId } = req.params;
	const { deckId } = req.body;

	try {
		const updatedCard = await database.card.update({
			where: { id: parseInt(cardId) },
			data: { deckId: parseInt(deckId) },
		});
		res.json(updatedCard);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
