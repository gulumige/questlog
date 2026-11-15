import { Link } from "react-router-dom"

export default function NotFound() {
	return (
		<div className="space-y-4 py-20 text-center">
			<h1 className="text-6xl font-black text-indigo-500">404</h1>
			<p className="text-lg text-slate-400">The page or game could not be found.</p>
			<Link
				to="/"
				className="inline-block rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
			>
				Back to the home page
			</Link>
		</div>
	)
}
