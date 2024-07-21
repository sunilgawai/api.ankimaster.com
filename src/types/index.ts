// User interface
export interface User {
	id: number;
	email: string;
	password: string; // Note: In practice, never expose passwords in client-side code
	decks?: Deck[];
	notes?: Note[];
}

// Deck interface
export interface Deck {
	id: number;
	name: string;
	description?: string;
	category: "Uncategorized" | string;
	userId: number | null;
	user?: User;
	notes?: Note[];
	cards?: Card[];
	subdecks: Deck[];
	createdAt: number; // date num in unix epoch
	last_tested: number; // date num in unix epoch - will contain same value as deckScores related date
	last_score: number;
}

export interface Note {
	id: string;
	guid: string;
	mid: number;
	mod: number;
	usn: number;
	tags: string;
	flds: string;
	sfld: string;
	csum: number;
	flags: number;
	data: string;
	userId: string;
}

export interface Card {
	id: string;
	nid: string;
	did: number;
	ord: number;
	mod: number;
	usn: number;
	type: number;
	queue: number;
	due: number;
	ivl: number;
	factor: number;
	reps: number;
	lapses: number;
	left: number;
	odue: number;
	odid: number;
	flags: number;
	data: string;
	userId: string;
}

export interface Col {
	id: string;
	crt: number;
	mod: number;
	scm: number;
	ver: number;
	dty: number;
	usn: number;
	ls: number;
	conf: string;
	models: string;
	decks: string;
	dconf: string;
	tags: string;
}

export interface SyncData {
	notes: Note[];
	cards: Card[];
	col: Col | null;
}

// Model interface (for note types)
interface Model {
	id: number;
	name: string;
	fields: string[];
	cardTemplates: CardTemplate[];
	css?: string;
}

// Card Template interface
interface CardTemplate {
	name: string;
	questionFormat: string;
	answerFormat: string;
	browserQuestionFormat?: string;
	browserAnswerFormat?: string;
}

// ReviewInfo interface (for getting next cards to review)
interface ReviewInfo {
	noteId: number;
	cardOrd: number;
	buttonCount: number;
	nextReviewTimes: number[];
	mediaFiles: string[];
}

// Interfaces for API requests and responses

interface CreateNoteRequest {
	modelId: number;
	fields: { [key: string]: string };
	tags: string[];
	deckId: number;
}

interface UpdateNoteRequest {
	fields?: { [key: string]: string };
	tags?: string[];
}

interface CreateDeckRequest {
	name: string;
	description?: string;
}

interface UpdateDeckRequest {
	name?: string;
	description?: string;
}

interface SubmitReviewRequest {
	cardId: number;
	ease: number;
	timeTaken: number;
}

interface BuryOrSuspendCardRequest {
	cardId: number;
	action: "bury" | "suspend";
}

interface GetNextReviewCardsRequest {
	deckId: number;
	limit?: number;
}

// You can also create response interfaces for your API endpoints
interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}
