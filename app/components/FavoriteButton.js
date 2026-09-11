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
      ? "border-amber-400 bg-amber-400 text-neutral-canvas-dark"
      : "border-neutral-border-strong bg-white text-neutral-foreground-strong hover:border-amber-400 hover:text-amber-600 dark:border-neutral-foreground-strong dark:bg-neutral-canvas-dark dark:text-neutral-border dark:hover:text-amber-300",
  ].join(" ");
}
