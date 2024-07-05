// @ts-nocheck

import { database } from "../services/database";

const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const { parseApkg } = require("../utils/apkgParser");

exports.importDeck = async (req, res) => {
	const { file } = req;
	// console.log("file", file);
	// const userId = req.user.id; // Assuming you have authentication middleware
	const userId = 1; // Assuming you have authentication middleware

	if (!file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	const apkgData = await parseApkg(file.buffer);
	console.log("apkgData", apkgData);

	try {
		// Create deck
		const deck = await database.deck.create({
			data: {
				name: apkgData.name,
				description: apkgData.desc,
				userId: userId,
			},
		});

		// Create notes and cards
		for (const noteData of apkgData.notes) {
			const note = await database.note.create({
				data: {
					fields: noteData.fields,
					tags: noteData.tags,
					userId: userId,
					deckId: deck.id,
				},
			});

			for (const cardData of noteData.cards) {
				await database.card.create({
					data: {
						noteId: note.id,
						deckId: deck.id,
						ordinal: cardData.ordinal,
						dueDate: new Date(cardData.dueDate),
						interval: cardData.interval,
						ease: cardData.ease,
					},
				});
			}
		}

		res
			.status(200)
			.json({ message: "Deck imported successfully", deckId: deck.id });
	} catch (error) {
		console.error("Error importing deck:", error);
		res.status(500).json({ error: "Failed to import deck" });
	}
};

exports.exportCollection = async (req, res) => {
	try {
		const userId = req.user.id; // Assuming you have authentication middleware

		const user = await database.user.findUnique({
			where: { id: userId },
			include: {
				decks: {
					include: {
						notes: {
							include: {
								cards: true,
							},
						},
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const exportData = {
			decks: user.decks.map((deck) => ({
				name: deck.name,
				description: deck.description,
				notes: deck.notes.map((note) => ({
					fields: note.fields,
					tags: note.tags,
					cards: note.cards.map((card) => ({
						ordinal: card.ordinal,
						dueDate: card.dueDate,
						interval: card.interval,
						ease: card.ease,
						suspended: card.suspended,
					})),
				})),
			})),
		};

		const zipFile = new AdmZip();
		zipFile.addFile("collection.json", Buffer.from(JSON.stringify(exportData)));

		const zipBuffer = zipFile.toBuffer();

		res.set("Content-Type", "application/zip");
		res.set("Content-Disposition", "attachment; filename=collection.apkg");
		res.send(zipBuffer);
	} catch (error) {
		console.error("Error exporting collection:", error);
		res.status(500).json({ error: "Failed to export collection" });
	}
};
