import express from "express";
import multer from "multer";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import { unzipSync } from "fflate";
import path from "path";
import fs from "fs";

// Configure multer for file upload handling
const upload = multer({ dest: "uploads/" });

class PackageController {
	static async import(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		// Check if file is provided
		const file = req.file;
		if (!file) {
			return res.status(400).json("No file provided");
		}
		// Read the uploaded file
		const filePath = path.resolve(file.path);
		const buffer = await fs.promises.readFile(filePath);

		let collectionFile: Uint8Array;
		try {
			// Unzip the .apkg file
			const unzipped: Record<string, Uint8Array> = unzipSync(
				new Uint8Array(buffer)
			);
			//   console.log("unzipped", unzipped);

			// Find and read the collection.anki2 file
			collectionFile = unzipped["collection.anki2"];
			if (!collectionFile) {
				console.error("collection.anki2 not found in the package");
				return res
					.status(400)
					.json("collection.anki2 not found in the package");
			}
		} catch (error) {
			console.log("error in unzipping", error);
			return next(error);
		}

		let db: Database;
		try {
			// Load SQL.js
			const loadSqlJs = async (): Promise<SqlJsStatic> => {
				const SQL = await initSqlJs({
					locateFile: (file) => path.join(__dirname, "../../public", file),
				});
				return SQL;
			};
			const SQL = await loadSqlJs();
			db = new SQL.Database(collectionFile);
		} catch (error) {
			console.log("database connection error");
			return next(error);
		}

		try {
			// Example query to get data from the cards table
			const result = db.exec("SELECT * FROM cards");
			if (result.length > 0) {
				const columns = result[0].columns;
				const values = result[0].values;
				const cardData = values.map((row) => {
					let card: Record<string, any> = {};
					columns.forEach((col, index) => {
						card[col] = row[index];
					});
					return card;
				});
				return res.json(cardData);
			} else {
				return res.status(200).json("No cards extracted.");
			}
		} catch (error) {
			console.error("SQL query error", error);
			return next(error);
		}
	}

	static async describeDatabase(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		// Check if file is provided
		const file = req.file;
		if (!file) {
			return res.status(400).json("No file provided");
		}

		// Read the uploaded file
		const filePath = path.resolve(file.path);
		const buffer = await fs.promises.readFile(filePath);

		let collectionFile: Uint8Array;
		try {
			// Unzip the .apkg file
			const unzipped: Record<string, Uint8Array> = unzipSync(
				new Uint8Array(buffer)
			);
			collectionFile = unzipped["collection.anki2"];
			if (!collectionFile) {
				console.error("collection.anki2 not found in the package");
				return res
					.status(400)
					.json("collection.anki2 not found in the package");
			}
		} catch (error) {
			console.log("error in unzipping", error);
			return next(error);
		}

		let db: Database;
		try {
			// Load SQL.js
			const loadSqlJs = async (): Promise<SqlJsStatic> => {
				const SQL = await initSqlJs({
					locateFile: (file) => path.join(__dirname, "../../public", file),
				});
				return SQL;
			};
			const SQL = await loadSqlJs();
			db = new SQL.Database(collectionFile);
		} catch (error) {
			console.log("database connection error");
			return next(error);
		}

		try {
			// Get the list of tables
			const tablesResult = db.exec(
				"SELECT name FROM sqlite_master WHERE type='table'"
			);
			if (tablesResult.length === 0) {
				return res.status(200).json("No tables found.");
			}

			const tables = tablesResult[0].values.flat();
			const schema = tables.map((table) => {
				const columnsResult = db.exec(`PRAGMA table_info(${table})`);
				const columns = columnsResult[0].values.map((row) => ({
					cid: row[0],
					name: row[1],
					type: row[2],
					notnull: row[3],
					dflt_value: row[4],
					pk: row[5],
				}));
				return {
					table,
					columns,
				};
			});

			res.json(schema);
		} catch (error) {
			console.error("Error describing database:", error);
			return next(error);
		}
	}
}

export default PackageController;
