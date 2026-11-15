export type GameStatus = "want" | "playing" | "completed" | "dropped"

export interface Game {
	id: string
	title: string // max 100 characters
	platform: string // max 40 characters
	status: GameStatus
	rating?: number | null // min 1, max 5, nullable is true (null removes the rating)
	coverUrl?: string // must start with http:// or https://
	notes?: string // max 1000 characters
}

export type NewGameInput = {
	title: string // max 100 characters
	platform: string // max 40 characters
	status: GameStatus
	rating?: number | null // min 1, max 5, nullable is true (null removes the rating)
	coverUrl?: string // must start with http:// or https://
	notes?: string // max 1000 characters
}
