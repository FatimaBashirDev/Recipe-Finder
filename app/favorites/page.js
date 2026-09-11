"use client";

import Link from "next/link";
import MealGrid from "../components/MealGrid";
import { useFavorites } from "../components/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, isHydrated } = useFavorites();

  if (!isHydrated) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-48 rounded bg-neutral-border dark:bg-neutral-surface-darker" />
          <div className="h-6 w-80 max-w-full rounded bg-neutral-border dark:bg-neutral-surface-darker" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="max-w-3xl">
        <p className="font-semibold text-neutral-foreground-strong dark:text-neutral-foreground-dark-muted">
          Your collection
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-foreground dark:text-white">
          Favorites
        </h1>
        <p className="mt-4 text-lg leading-8 text-neutral-foreground-muted dark:text-neutral-foreground-dark">
          {favorites.length
            ? "Meals you save will stay here on this device."
            : "Save a meal with the star button to find it here later."}
        </p>
      </div>

      <div className="mt-10">
        {favorites.length ? (
          <MealGrid meals={favorites} emptyMessage="No favorites yet." />
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-border-strong p-10 text-center dark:border-neutral-border-muted">
            <p className="text-neutral-foreground-muted dark:text-neutral-foreground-dark">
              Your favorite meals will appear here.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white hover:bg-brand-primary-hover"
            >
              Find meals
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
