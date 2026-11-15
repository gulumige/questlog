import { useState, useEffect } from "react"

import type { Game, NewGameInput } from "../types/game"

const HANDLE = "gulumige"
const BASE_URL = `https://questlog-api.vercel.app/api/${HANDLE}`

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error(error)

			return initialValue
		}
	})

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value

			setStoredValue(valueToStore)

			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.error(error)
		}
	}

	return [storedValue, setValue] as const
}

export function useGames(statusFilter?: string) {
	const [games, setGames] = useState<Game[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true)
			setError(null)

			try {
				let url = `${BASE_URL}/games`

				if (statusFilter && statusFilter !== "all") {
					url += `?status=${statusFilter}`
				}

				const response = await fetch(url)

				if (!response.ok) {
					throw new Error("Kunde inte hämta spel från servern.")
				}

				const data = await response.json()

				setGames(data)
				setError(null)
			} catch (err: any) {
				setError(err.message || "Något gick fel")
				setGames([])
			} finally {
				setLoading(false)
			}
		}

		fetchGames()
	}, [statusFilter])

	return { games, loading, error }
}

export function useGame(id: string | undefined) {
	const [game, setGame] = useState<Game | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!id) return

		const fetchGame = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await fetch(`${BASE_URL}/games/${id}`)

				if (!response.ok) {
					if (response.status === 404) throw new Error("The game was not found (404)")
					throw new Error("Could not fetch the game")
				}

				const data = await response.json()

				setGame(data)
			} catch (err: any) {
				console.error(err)

				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchGame()
	}, [id])

	return { game, loading, error }
}

export function useSaveGame() {
	const [loading, setLoading] = useState(false)

	const createGame = async (newGame: NewGameInput) => {
		setLoading(true)
		try {
			const res = await fetch(`${BASE_URL}/games`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newGame),
			})

			if (!res.ok) throw new Error("Could not create the game")

			return await res.json()
		} finally {
			setLoading(false)
		}
	}

	const updateGame = async (id: string, updates: Partial<Game>) => {
		setLoading(true)

		try {
			const res = await fetch(`${BASE_URL}/games/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
			})

			if (!res.ok) throw new Error("Could not update the game")

			return await res.json()
		} finally {
			setLoading(false)
		}
	}

	const deleteGame = async (id: string) => {
		setLoading(true)

		try {
			const res = await fetch(`${BASE_URL}/games/${id}`, { method: "DELETE" })

			if (!res.ok) throw new Error("Could not delete the game")

			return true
		} finally {
			setLoading(false)
		}
	}

	return { createGame, updateGame, deleteGame, loading }
}
