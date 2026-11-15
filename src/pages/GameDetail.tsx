import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { useGame, useSaveGame } from "../hooks/useGames"

export default function GameDetail() {
	const { id } = useParams<{ id: string }>()
	const { game, loading, error } = useGame(id)

	if (loading)
		return <div className="animate-pulse py-20 text-center text-slate-400">Loading game...</div>

	if (error)
		return (
			<div className="rounded-xl border border-red-800 bg-red-950/50 p-4 text-center text-red-300">
				⚠️ {error}
			</div>
		)

	if (!game) return null

	return <GameEditor key={game.id} game={game} id={id} />
}

function GameEditor({ game, id }: { game: any; id?: string }) {
	const navigate = useNavigate()
	const { deleteGame, updateGame, loading: saving } = useSaveGame()
	const [title, setTitle] = useState(game.title)
	const [platform, setPlatform] = useState(game.platform)
	const [status, setStatus] = useState<"want" | "playing" | "completed" | "dropped">(game.status)
	const [rating, setRating] = useState<number | "">(game.rating ?? "")
	const [coverUrl, setCoverUrl] = useState(game.coverUrl ?? "")
	const [notes, setNotes] = useState(game.notes ?? "")

	const handleDelete = async () => {
		if (!id || !confirm("Are you sure you want to delete this game?")) return
		await deleteGame(id)
		navigate("/")
	}

	const handleSaveChanges = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!id) return

		try {
			await updateGame(id, {
				title,
				platform,
				status,
				rating: rating === "" ? null : Number(rating),
				coverUrl: coverUrl || undefined,
				notes: notes || undefined,
			})
		} catch (err: any) {
			alert("Failed to update game: " + err.message)
		} finally {
			navigate("/")
		}
	}

	return (
		<div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-extrabold">Edit Game Details</h1>
				<button
					type="button"
					onClick={handleDelete}
					disabled={saving}
					className="rounded-lg border border-red-800 bg-red-900/40 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-900"
				>
					Delete Game
				</button>
			</div>

			<form onSubmit={handleSaveChanges} className="space-y-4">
				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						maxLength={100}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						required
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="mb-1 block text-xs font-semibold text-slate-400">Platform</label>
						<input
							type="text"
							value={platform}
							onChange={(e) => setPlatform(e.target.value)}
							maxLength={40}
							className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
							required
						/>
					</div>

					<div>
						<label className="mb-1 block text-xs font-semibold text-slate-400">Status</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as any)}
							className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						>
							<option value="want">Want to play</option>
							<option value="playing">Playing</option>
							<option value="completed">Completed</option>
							<option value="dropped">Dropped</option>
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="mb-1 block text-xs font-semibold text-slate-400">Rating (1-5)</label>
						<input
							type="number"
							min="1"
							max="5"
							value={rating}
							onChange={(e) => setRating(e.target.value ? e.target.valueAsNumber : "")}
							className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
							placeholder="No rating"
						/>
					</div>

					<div>
						<label className="mb-1 block text-xs font-semibold text-slate-400">Cover URL</label>
						<input
							type="url"
							value={coverUrl}
							onChange={(e) => setCoverUrl(e.target.value)}
							className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
						/>
					</div>
				</div>

				<div>
					<label className="mb-1 block text-xs font-semibold text-slate-400">Notes</label>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						rows={3}
						maxLength={1000}
						className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={saving}
					className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
				>
					{saving ? "Saving changes..." : "Save Changes"}
				</button>
			</form>
		</div>
	)
}
