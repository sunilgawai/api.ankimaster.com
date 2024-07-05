import AdmZip from "adm-zip";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Database } from "sqlite3";
import path from "path";
import fs from "fs-extra";
import os from "os";
import { promisify } from "util";

interface ColRow {
	name: string;
	desc: string;
}

interface NoteRow {
	id: number;
	flds: string;
	tags: string;
}

interface CardRow {
	ord: number;
	due: number;
	ivl: number;
	factor: number;
}

export const parseApkg = async (input: string | Buffer): Promise<any> => {
	console.log("parseApkg", input);
	let zip: AdmZip;

	if (typeof input === "string") {
		// If input is a file path
		zip = new AdmZip(input);
	} else if (Buffer.isBuffer(input)) {
		// If input is a buffer
		zip = new AdmZip(input);
	} else {
		throw new Error("Invalid input: expected string (file path) or Buffer");
	}

	let sqliteBuffer: any;
	sqliteBuffer = zip.readFile("collection.anki2");

	if (!sqliteBuffer) {
		throw new Error("collection.anki2 not found in the .apkg file");
	}
	const tempFile = await fs.mkdtemp(path.join(os.tmpdir(), "anki-"));
	const dbPath = path.join(tempFile, "collection.anki2");

	await fs.writeFile(dbPath, sqliteBuffer);

	const db = new sqlite3.Database(dbPath);

	const dbGet = promisify(db.get).bind(db);
	const dbAll = promisify(db.all).bind(db);
	const dbClose = promisify(db.close).bind(db);

	try {
		const result: any = {
			name: "",
			desc: "",
			notes: [],
		};

		const colRow:any = await dbGet("SELECT name, desc FROM col");
		if (colRow) {
			result.name = colRow.name;
			result.desc = colRow.desc;
		}

		const notes:any = await dbAll("SELECT id, flds, tags FROM notes");
		for (const row of notes) {
			const note: any = {
				fields: JSON.parse(row.flds),
				tags: row.tags.split(" "),
				cards: [],
			};

			const cards:any = await dbAll(
				"SELECT ord, due, ivl, factor FROM cards"
			);

			for (const cardRow of cards) {
				note.cards.push({
					ordinal: cardRow.ord,
					dueDate: new Date(cardRow.due * 1000),
					interval: cardRow.ivl,
					ease: cardRow.factor / 1000,
				});
			}

			result.notes.push(note);
		}

		await dbClose();

		// Clean up: remove the temporary file
		await fs.unlink(dbPath);
		await fs.rmdir(tempFile);

		return result;
	} catch (error) {
		console.error("Error processing SQLite database:", error);
		throw error;
	}
};
