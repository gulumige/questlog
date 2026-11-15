import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import AddGame from "./pages/AddGame"
import GameDetail from "./pages/GameDetail"
import GamesList from "./pages/GamesList"
import NotFound from "./pages/NotFound"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<GamesList />} />
					<Route path="games/new" element={<AddGame />} />
					<Route path="games/:id" element={<GameDetail />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
