import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSaveGame } from "../hooks/useGames"
import type { GameStatus } from "../types/game"

export default function AddGame() {
	const navigate = useNavigate()
	const { createGame, loading } = useSaveGame()

	const [title, setTitle] = useState("")
	const [platform, setPlatform] = useState("")
	const [status, setStatus] = useState<GameStatus>("want")
	const [rating, setRating] = useState<number | "">("")
	const [coverUrl, setCoverUrl] = useState("")
	const [notes, setNotes] = useState("")
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault()
		if (!title || !platform) {
			setError("Title and platform are required!")
			return
		}

		try {
			await createGame({
				title,
				platform,
				status,
				rating: rating ? Number(rating) : undefined,
				coverUrl: coverUrl || undefined,
				notes: notes || undefined,
			})
			navigate("/")
		} catch (err: any) {
			setError(err.message || "Could not create the game")
		}
	}

	return (
		<div className="mx-auto max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">
			<h1 className="mb-6 text-2xl font-bold">Add New Game</h1>

			{error && (
				<div className="mb-4 rounded-lg border border-red-800 bg-red-950/50 p-3 text-sm text-red-300">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Title *</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						required
					/>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Platform *</label>
					<input
						type="text"
						value={platform}
						onChange={(e) => setPlatform(e.target.value)}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						placeholder="e.g. PC, Switch, PS5"
						required
					/>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Status</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value as GameStatus)}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
					>
						<option value="want">Want to Play</option>
						<option value="playing">Playing</option>
						<option value="completed">Completed</option>
						<option value="dropped">Dropped</option>
					</select>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Rating (1-5)</label>
					<input
						type="number"
						min="1"
						max="5"
						value={rating}
						onChange={(e) => setRating(e.target.value ? Number(e.target.value) : "")}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
					/>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">
						Cover Image (URL)
					</label>
					<input
						type="url"
						value={coverUrl}
						onChange={(e) => setCoverUrl(e.target.value)}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						placeholder="https://..."
					/>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Notes</label>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						rows={3}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
				>
					{loading ? "Saving..." : "Save Game"}
				</button>
			</form>
		</div>
	)
}
