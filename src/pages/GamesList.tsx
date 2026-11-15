import { Link } from "react-router-dom"

import { useGames, useLocalStorage } from "../hooks/useGames"

const STATUSES = [
	{ label: "All", value: "all" },
	{ label: "Want to play", value: "want" },
	{ label: "Playing", value: "playing" },
	{ label: "Completed", value: "completed" },
	{ label: "Dropped", value: "dropped" },
]

export default function GamesList() {
	const [currentFilter, setCurrentFilter] = useLocalStorage<string>("questlog_filter", "all")
	const { games, loading, error } = useGames(currentFilter)

	return (
		<div className="space-y-6">
			<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
				<h1 className="text-3xl font-bold tracking-tight">My Game Backlog</h1>

				<div className="flex flex-wrap gap-2">
					{STATUSES.map((status) => (
						<button
							key={status.value}
							onClick={() => setCurrentFilter(status.value)}
							className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
								currentFilter === status.value
									? "bg-indigo-600 text-white shadow"
									: "border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
							}`}
						>
							{status.label}
						</button>
					))}
				</div>
			</div>

			{loading ? (
				<div className="animate-pulse py-20 text-center text-slate-400">Loading games... 🎮</div>
			) : error ? (
				<div className="rounded-xl border border-red-800 bg-red-950/50 p-4 text-center text-red-300">
					⚠️ {error}
				</div>
			) : games.length === 0 ? (
				<div className="space-y-2 rounded-2xl border border-slate-800/60 bg-slate-900/30 py-20 text-center text-slate-400">
					<p className="text-lg font-medium text-slate-300">No games here yet!</p>
					<p className="text-xs text-slate-500">You have not added any games with this status.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{games.map((game) => (
						<Link
							key={game.id}
							to={`/games/${game.id}`}
							className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-indigo-500/50"
						>
							<div>
								{game.coverUrl ? (
									<img
										src={game.coverUrl}
										alt={game.title}
										className="mb-3 h-40 w-full rounded-lg object-cover"
									/>
								) : (
									<div className="mb-3 flex h-40 w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-sm text-slate-400">
										{game.title}
									</div>
								)}
								<h3 className="text-lg font-bold transition group-hover:text-indigo-400">
									{game.title}
								</h3>
								<p className="text-xs text-slate-400">{game.platform}</p>
							</div>
							<div className="mt-4 flex items-center justify-between">
								<span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold tracking-wider text-slate-300 uppercase">
									{game.status}
								</span>
								{game.rating && (
									<span className="text-sm font-bold text-amber-400">★ {game.rating}/5</span>
								)}
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
