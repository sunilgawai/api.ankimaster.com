// User interface
interface User {
	id: number;
	email: string;
	password: string; // Note: In practice, never expose passwords in client-side code
	decks?: Deck[];
	notes?: Note[];
}

// Deck interface
interface Deck {
	id: number;
	name: string;
	description?: string;
	userId: number;
	user?: User;
	notes?: Note[];
	cards?: Card[];
}

// Note interface
interface Note {
	id: number;
	fields: { [key: string]: string }; // Dynamic fields based on the note type
	tags: string[];
	userId: number;
	user?: User;
	deckId: number;
	deck?: Deck;
	cards?: Card[];
}

// Card interface
interface Card {
	id: number;
	noteId: number;
	note?: Note;
	deckId: number;
	deck?: Deck;
	ordinal: number;
	dueDate: Date;
	interval: number;
	ease: number;
	reviews?: Review[];
	suspended: boolean;
}

// Review interface
interface Review {
	id: number;
	cardId: number;
	card?: Card;
	ease: number;
	timeTaken: number;
	reviewedAt: Date;
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
