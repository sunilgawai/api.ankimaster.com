import {
	Graves,
	Revlog,
	Cards,
	Notes,
	Col,
	PrismaClient,
} from "@prisma/client";

let database: PrismaClient;

declare global {
	var __database: PrismaClient | undefined;
}

if (!global.__database) {
	global.__database = new PrismaClient();
}

database = global.__database;

export { database };

export async function insertColData(data: Col) {
	try {
		await database.col.upsert({
			where: { id: data.id },
			update: {
				crt: data.crt,
				mod: data.mod,
				scm: data.scm,
				ver: data.ver,
				dty: data.dty,
				usn: data.usn,
				ls: data.ls,
				conf: data.conf,
				models: data.models,
				decks: data.decks,
				dconf: data.dconf,
				tags: data.tags,
			},
			create: {
				id: data.id,
				crt: data.crt,
				mod: data.mod,
				scm: data.scm,
				ver: data.ver,
				dty: data.dty,
				usn: data.usn,
				ls: data.ls,
				conf: data.conf,
				models: data.models,
				decks: data.decks,
				dconf: data.dconf,
				tags: data.tags,
			},
		});
	} catch (error) {
		console.error("Error inserting col data:", error);
		throw error;
	}
}

export async function insertNotesData(data: Notes) {
	try {
		await database.notes.upsert({
			where: { id: data.id },
			update: {
				guid: data.guid,
				mid: data.mid,
				mod: data.mod,
				usn: data.usn,
				tags: data.tags,
				flds: data.flds,
				sfld: data.sfld,
				csum: data.csum,
				flags: data.flags,
				data: data.data,
			},
			create: {
				id: data.id,
				guid: data.guid,
				mid: data.mid,
				mod: data.mod,
				usn: data.usn,
				tags: data.tags,
				flds: data.flds,
				sfld:data.sfld,
				csum: data.csum,
				flags: data.flags,
				data: data.data,
			},
		});
	} catch (error) {
		console.error("Error inserting notes data:", error);
		throw error;
	}
}

export async function insertCardsData(data: Cards) {
	try {
		await database.cards.upsert({
			where: { id: data.id },
			update: {
				nid: data.nid,
				did: data.did,
				ord: data.ord,
				mod: data.mod,
				usn: data.usn,
				type: data.type,
				queue: data.queue,
				due: data.due,
				ivl: data.ivl,
				factor: data.factor,
				reps: data.reps,
				lapses: data.lapses,
				left: data.left,
				odue: data.odue,
				odid: data.odid,
				flags: data.flags,
				data: data.data,
			},
			create: {
				id: data.id,
				nid: data.nid,
				did: data.did,
				ord: data.ord,
				mod: data.mod,
				usn: data.usn,
				type: data.type,
				queue: data.queue,
				due: data.due,
				ivl: data.ivl,
				factor: data.factor,
				reps: data.reps,
				lapses: data.lapses,
				left: data.left,
				odue: data.odue,
				odid: data.odid,
				flags: data.flags,
				data: data.data,
			},
		});
	} catch (error) {
		console.error("Error inserting cards data:", error);
		throw error;
	}
}

export async function insertRevlogData(data: Revlog) {
	try {
		await database.revlog.upsert({
			where: { id: data.id },
			update: {
				cid: data.cid,
				usn: data.usn,
				ease: data.ease,
				ivl: data.ivl,
				lastIvl: data.lastIvl,
				factor: data.factor,
				time: data.time,
				type: data.type,
			},
			create: {
				id: data.id,
				cid: data.cid,
				usn: data.usn,
				ease: data.ease,
				ivl: data.ivl,
				lastIvl: data.lastIvl,
				factor: data.factor,
				time: data.time,
				type: data.type,
			},
		});
	} catch (error) {
		console.error("Error inserting revlog data:", error);
		throw error;
	}
}

export async function insertGravesData(data: Graves) {
	try {
		await database.graves.upsert({
			where: { id: data.id },
			update: {
				usn: data.usn,
				oid: data.oid,
				type: data.type,
			},
			create: {
				id: data.id,
				usn: data.usn,
				oid: data.oid,
				type: data.type,
			},
		});
	} catch (error) {
		console.error("Error inserting graves data:", error);
		throw error;
	}
}
