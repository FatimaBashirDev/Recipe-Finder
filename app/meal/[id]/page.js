import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "../../components/FavoriteButton";
import { fetchMealById, getMealIngredients } from "@/lib/meal-api";

export default async function MealPage({ params }) {
  const { id } = await params;
  const meal = await fetchMealById(id);

  if (!meal) {
    notFound();
  }

  const ingredients = getMealIngredients(meal);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        ← Back to meal search
      </Link>

      <article className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="relative aspect-square max-h-[520px] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 lg:aspect-auto">
            <Image
              src={meal.strMealThumb}
              alt={`${meal.strMeal} thumbnail`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {meal.strCategory}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                  {meal.strMeal}
                </h1>
                <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                  {meal.strArea} cuisine
                </p>
              </div>
              <FavoriteButton meal={meal} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section aria-labelledby="ingredients-heading">
                <h2
                  id="ingredients-heading"
                  className="text-xl font-bold text-zinc-900 dark:text-white"
                >
                  Ingredients
                </h2>
                <ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {ingredients.map(({ ingredient, measure }) => (
                    <li
                      key={ingredient}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-zinc-700 dark:text-zinc-200">
                        {ingredient}
                      </span>
                      <span className="shrink-0 font-medium text-zinc-500 dark:text-zinc-400">
                        {measure || "To taste"}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="instructions-heading">
                <h2
                  id="instructions-heading"
                  className="text-xl font-bold text-zinc-900 dark:text-white"
                >
                  Instructions
                </h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-zinc-700 dark:text-zinc-300">
                  {meal.strInstructions}
                </p>
              </section>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
