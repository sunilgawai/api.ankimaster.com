import sqlite3 from "sqlite3";

type SqliteCallback<T> = (err: Error | null, result: T) => void;

function promisify<T>(
	method: (sql: string, params: any, callback: SqliteCallback<T>) => void
): (sql: string, params?: any) => Promise<T>;
function promisify<T>(
	method: (sql: string, callback: SqliteCallback<T>) => void
): (sql: string) => Promise<T>;
function promisify<T>(
	method: (callback: SqliteCallback<T>) => void
): () => Promise<T>;

function promisify(method: Function) {
	return function (this: any, ...args: any[]): Promise<any> {
		return new Promise((resolve, reject) => {
			method.call(this, ...args, (err: Error | null, result: any) => {
				if (err) reject(err);
				else resolve(result);
			});
		});
	};
}

export function createPromisifiedDb(db: sqlite3.Database) {
	return {
		get: promisify(db.get).bind(db),
		all: promisify(db.all).bind(db),
		run: promisify(db.run).bind(db),
		exec: promisify(db.exec).bind(db),
        // @ts-ignore
		close: promisify(db.close).bind(db),
	};
}
