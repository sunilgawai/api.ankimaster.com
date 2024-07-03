// @ts-nocheck
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createNote = async (req, res) => {
	const { fields, tags, deckId } = req.body;
	const userId = req.user.id; // Assuming you have authentication middleware

	try {
		const note = await prisma.note.create({
			data: {
				fields,
				tags,
				userId,
				deckId,
			},
		});
		res.json(note);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getNoteById = async (req, res) => {
	const { noteId } = req.params;

	try {
		const note = await prisma.note.findUnique({
			where: { id: parseInt(noteId) },
			include: { cards: true },
		});
		if (!note) {
			return res.status(404).json({ error: "Note not found" });
		}
		res.json(note);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updateNote = async (req, res) => {
	const { noteId } = req.params;
	const { fields, tags } = req.body;

	try {
		const updatedNote = await prisma.note.update({
			where: { id: parseInt(noteId) },
			data: { fields, tags },
		});
		res.json(updatedNote);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteNote = async (req, res) => {
	const { noteId } = req.params;

	try {
		await prisma.note.delete({
			where: { id: parseInt(noteId) },
		});
		res.json({ message: "Note deleted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getNotes = async (req, res) => {
	const { deckId, modelId, query } = req.query;
	const userId = req.user.id;

	try {
		const notes = await prisma.note.findMany({
			where: {
				userId,
				deckId: deckId ? parseInt(deckId) : undefined,
				// Add more filtering options based on modelId and query
			},
			include: { cards: true },
		});
		res.json(notes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
