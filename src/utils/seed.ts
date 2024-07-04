// const bcrypt = require("bcryptjs");
import bcrypt from "bcrypt";
import { database } from "../services/database";

async function main() {
	// Create users
	const user1 = await database.user.create({
		data: {
			email: "user1@example.com",
			password: await bcrypt.hash("password123", 10),
		},
	});

	const user2 = await database.user.create({
		data: {
			email: "user2@example.com",
			password: await bcrypt.hash("password456", 10),
		},
	});

	// Create decks
	const deck1 = await database.deck.create({
		data: {
			name: "Japanese Vocabulary",
			description: "Basic Japanese words and phrases",
			userId: user1.id,
		},
	});

	const deck2 = await database.deck.create({
		data: {
			name: "World Capitals",
			description: "Capital cities of countries around the world",
			userId: user1.id,
		},
	});

	const deck3 = await database.deck.create({
		data: {
			name: "Programming Concepts",
			description: "Basic programming concepts and terminologies",
			userId: user2.id,
		},
	});

	// Create notes and cards for Japanese Vocabulary
	const japaneseWords = [
		{ word: "こんにちは", reading: "Konnichiwa", meaning: "Hello" },
		{ word: "ありがとう", reading: "Arigatou", meaning: "Thank you" },
		{ word: "さようなら", reading: "Sayounara", meaning: "Goodbye" },
		{ word: "はい", reading: "Hai", meaning: "Yes" },
		{ word: "いいえ", reading: "Iie", meaning: "No" },
	];

	for (const word of japaneseWords) {
		const note = await database.note.create({
			data: {
				fields: word,
				tags: ["japanese", "vocabulary"],
				userId: user1.id,
				deckId: deck1.id,
			},
		});

		await database.card.create({
			data: {
				noteId: note.id,
				deckId: deck1.id,
				ordinal: 0,
				dueDate: new Date(),
				interval: 0,
				ease: 2.5,
			},
		});
	}

	// Create notes and cards for World Capitals
	const worldCapitals = [
		{ country: "France", capital: "Paris" },
		{ country: "Japan", capital: "Tokyo" },
		{ country: "Australia", capital: "Canberra" },
		{ country: "Brazil", capital: "Brasília" },
		{ country: "Egypt", capital: "Cairo" },
	];

	for (const capital of worldCapitals) {
		const note = await database.note.create({
			data: {
				fields: capital,
				tags: ["geography", "capitals"],
				userId: user1.id,
				deckId: deck2.id,
			},
		});

		await database.card.create({
			data: {
				noteId: note.id,
				deckId: deck2.id,
				ordinal: 0,
				dueDate: new Date(),
				interval: 0,
				ease: 2.5,
			},
		});
	}

	// Create notes and cards for Programming Concepts
	const programmingConcepts = [
		{ concept: "Variable", definition: "A container for storing data values" },
		{ concept: "Function", definition: "A block of organized, reusable code" },
		{
			concept: "Array",
			definition:
				"A data structure for storing multiple values in a single variable",
		},
		{ concept: "Object", definition: "A container for properties and methods" },
		{ concept: "Loop", definition: "A way to repeat a set of statements" },
	];

	for (const concept of programmingConcepts) {
		const note = await database.note.create({
			data: {
				fields: concept,
				tags: ["programming", "computer science"],
				userId: user2.id,
				deckId: deck3.id,
			},
		});

		await database.card.create({
			data: {
				noteId: note.id,
				deckId: deck3.id,
				ordinal: 0,
				dueDate: new Date(),
				interval: 0,
				ease: 2.5,
			},
		});
	}

	// Create some review history
	const cards = await database.card.findMany();
	for (const card of cards) {
		const reviewCount = Math.floor(Math.random() * 5); // 0 to 4 reviews per card
		for (let i = 0; i < reviewCount; i++) {
			await database.review.create({
				data: {
					cardId: card.id,
					ease: Math.floor(Math.random() * 4) + 1, // 1 to 4
					timeTaken: Math.floor(Math.random() * 20000) + 5000, // 5 to 25 seconds
					reviewedAt: new Date(
						Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
					), // Random date within the last 30 days
				},
			});
		}
	}

	console.log("Seed data inserted successfully");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await database.$disconnect();
	});
