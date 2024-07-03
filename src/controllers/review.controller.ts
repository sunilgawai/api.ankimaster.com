// @ts-nocheck
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getNextReviewCards = async (req, res) => {
	const { deckId, limit = 1 } = req.query;
	const userId = req.user.id;

	try {
		const cards = await prisma.card.findMany({
			where: {
				deckId: parseInt(deckId),
				deck: { userId },
				suspended: false,
				dueDate: { lte: new Date() },
			},
			orderBy: { dueDate: "asc" },
			take: parseInt(limit),
			include: { note: true },
		});
		res.json(cards);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.submitReview = async (req, res) => {
	const { cardId, ease, timeTaken } = req.body;

	try {
		const review = await prisma.review.create({
			data: {
				cardId: parseInt(cardId),
				ease: parseInt(ease),
				timeTaken: parseInt(timeTaken),
			},
		});

		// Update card due date and ease factor based on the review
		// This is a simplified version; you may want to implement a more sophisticated algorithm
		const card = await prisma.card.update({
			where: { id: parseInt(cardId) },
			data: {
				dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set due date to tomorrow
				ease: { increment: 0.1 }, // Increase ease factor slightly
				interval: { multiply: 2 }, // Double the interval
			},
		});

		res.json({ review, card });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.buryOrSuspendCard = async (req, res) => {
	const { cardId, action } = req.body;

	try {
		let updatedCard;
		if (action === "bury") {
			updatedCard = await prisma.card.update({
				where: { id: parseInt(cardId) },
				data: { dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) }, // Set due date to tomorrow
			});
		} else if (action === "suspend") {
			updatedCard = await prisma.card.update({
				where: { id: parseInt(cardId) },
				data: { suspended: true },
			});
		} else {
			return res.status(400).json({ error: "Invalid action" });
		}
		res.json(updatedCard);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
