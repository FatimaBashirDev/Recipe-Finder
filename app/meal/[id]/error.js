"use client";

import { useEffect } from "react";

export default function MealError({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-semibold text-red-600 dark:text-red-400">
        Unable to load this meal
      </p>
      <h1 className="mt-3 text-3xl font-bold text-neutral-foreground dark:text-white">
        Please try again
      </h1>
      <p className="mt-4 text-neutral-foreground-muted dark:text-neutral-foreground-dark">
        The recipe details could not be retrieved from TheMealDB.
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-7 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white hover:bg-brand-primary-hover"
      >
        Try again
      </button>
    </main>
  );
}

