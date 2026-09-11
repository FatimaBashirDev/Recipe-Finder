"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "./FavoritesContext";

export default function MealCard({ meal }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(meal.idMeal);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-neutral-border bg-white shadow-sm dark:border-neutral-border-dark dark:bg-neutral-surface-dark">
      <Link href={`/meal/${meal.idMeal}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-surface-raised dark:bg-neutral-surface-darker">
          <Image
            src={meal.strMealThumb}
            alt={`${meal.strMeal} thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-neutral-foreground line-clamp-2 group-hover:text-brand-primary-hover dark:text-white dark:group-hover:text-brand-lighter">
            {meal.strMeal}
          </h3>
          {meal.strCategory && (
            <p className="mt-2 text-sm text-neutral-foreground-subtle dark:text-neutral-foreground-dark-muted">
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
      ? "border-amber-400 bg-amber-400 text-neutral-canvas-dark"
      : "border-neutral-border bg-white/90 text-neutral-foreground-strong hover:border-amber-400 hover:text-amber-500 dark:border-neutral-foreground-strong dark:bg-neutral-canvas-dark/90 dark:text-neutral-border",
  ].join(" ");
}
