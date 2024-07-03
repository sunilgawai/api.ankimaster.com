// @ts-nocheck

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDeck = async (req, res) => {
	const { name, description } = req.body;
	const userId = req.user.id;

	try {
		const deck = await prisma.deck.create({
			data: {
				name,
				description,
				userId,
			},
		});
		res.json(deck);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getAllDecks = async (req, res) => {
	const userId = req.user.id;

	try {
		const decks = await prisma.deck.findMany({
			where: { userId },
		});
		res.json(decks);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getDeckById = async (req, res) => {
	const { deckId } = req.params;

	try {
		const deck = await prisma.deck.findUnique({
			where: { id: parseInt(deckId) },
			include: { notes: true, cards: true },
		});
		if (!deck) {
			return res.status(404).json({ error: "Deck not found" });
		}
		res.json(deck);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updateDeck = async (req, res) => {
	const { deckId } = req.params;
	const { name, description } = req.body;

	try {
		const updatedDeck = await prisma.deck.update({
			where: { id: parseInt(deckId) },
			data: { name, description },
		});
		res.json(updatedDeck);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteDeck = async (req, res) => {
	const { deckId } = req.params;

	try {
		await prisma.deck.delete({
			where: { id: parseInt(deckId) },
		});
		res.json({ message: "Deck deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
