import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "./FavoritesContext";

export default function MealCard({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(meal.idMeal);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Link href={`/meal/${meal.idMeal}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={meal.strMealThumb}
            alt={`${meal.strMeal} thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-zinc-900 line-clamp-2 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
            {meal.strMeal}
          </h3>
          {meal.strCategory && (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {meal.strCategory}
            </p>
          )}
        </div>
      </Link>
      <button
        type="button"
        aria-pressed={saved}
        onClick={(event) => {
          event.stopPropagation();
          toggleFavorite(meal);
        }}
        className={favoriteButtonClass(saved)}
        title={saved ? "Remove from favorites" : "Save to favorites"}
      >
        <span aria-hidden="true">{saved ? "★" : "☆"}</span>
        <span className="sr-only">
          {saved ? `Remove ${meal.strMeal} from favorites` : `Save ${meal.strMeal} to favorites`}
        </span>
      </button>
    </article>
  );
}

function favoriteButtonClass(saved) {
  return [
    "absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-lg leading-none shadow-sm transition",
    saved
      ? "border-amber-400 bg-amber-400 text-zinc-950"
      : "border-zinc-200 bg-white/90 text-zinc-700 hover:border-amber-400 hover:text-amber-500 dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-200",
  ].join(" ");
}
