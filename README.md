# Questlog

A personal game backlog web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Track games you want to play, are currently playing, have completed, or dropped — complete with ratings, cover art, and personal notes.

- **Target Grade:** VG
- **API Handle:** `ditt-handle`
- **Live Demo:** <https://questlog.vercel.app/gulumige>

---

## ✨ Features

- **Full CRUD Support:** Create new games, browse your backlog, inspect and edit full game details (title, platform, status, rating, cover URL, notes), and delete entries.
- **Status Filtering:** Filter games by _All_, _Want to play_, _Playing_, _Completed_, and _Dropped_.
- **Persistent Filter State:** Your active filter choice is saved automatically in `localStorage`.
- **Responsive UI & Feedback:** Loading indicators, empty-state views, error handling (`response.ok` checks), and a custom 404 page.

---

## How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd questlog
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm run dev
   ```

---

## Architecture & Custom Hooks

To keep UI components clean, declarative, and focused strictly on rendering, all data-fetching and persistence logic has been extracted into custom hooks in `src/hooks/useGames.ts`:

- **`useGames(status)`** — Fetches the game list from the Questlog API, applying optional query filtering (`?status=...`) while managing `loading` and `error` states.
- **`useGame(id)`** — Fetches a single game by ID for the detail/edit view, handling 404 responses and network errors.
- **`useSaveGame()`** — Encapsulates all mutating API requests (`POST` to create, `PATCH` to update any combination of `GameChanges` fields, and `DELETE` to remove a game) alongside a shared loading state.
- **`useLocalStorage(key, initialValue)`** — Synchronizes state with `window.localStorage` so the selected status filter persists across page reloads.

**Why this structure?**
Separating API communication and state management from presentation components eliminates duplicate `fetch` boilerplate, simplifies error handling, and makes the logic easy to maintain and reuse across views.
