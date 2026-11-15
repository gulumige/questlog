import { Outlet, Link } from "react-router-dom"

export default function Layout() {
	return (
		<div className="flex min-h-screen flex-col bg-slate-950 text-white">
			<header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
				<div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
					<Link
						to="/"
						className="text-2xl font-black tracking-wider text-indigo-400 transition hover:text-indigo-300"
					>
						🎮 Questlog
					</Link>
					<nav className="flex items-center gap-4">
						<Link
							to="/"
							className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-800"
						>
							Game Backlog
						</Link>
						<Link
							to="/games/new"
							className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
						>
							+ Add Game
						</Link>
					</nav>
				</div>
			</header>

			<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
				<Outlet />
			</main>

			<footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
				Questlog
			</footer>
		</div>
	)
}
