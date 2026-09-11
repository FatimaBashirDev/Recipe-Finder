"use client";

import { useFavorites } from "./FavoritesContext";

export default function FavoriteButton({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(meal.idMeal);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => toggleFavorite(meal)}
      className={favoriteButtonClass(saved)}
      title={saved ? "Remove from favorites" : "Save to favorites"}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      <span className="ml-2 text-sm font-semibold">
        {saved ? "Saved" : "Save"}
      </span>
      <span className="sr-only">
        {saved ? `Remove ${meal.strMeal} from favorites` : `Save ${meal.strMeal} to favorites`}
      </span>
    </button>
  );
}

function favoriteButtonClass(saved) {
  return [
    "inline-flex items-center rounded-full border px-4 py-2 shadow-sm transition",
    saved
      ? "border-amber-400 bg-amber-400 text-zinc-950"
      : "border-zinc-300 bg-white text-zinc-700 hover:border-amber-400 hover:text-amber-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:text-amber-300",
  ].join(" ");
}
