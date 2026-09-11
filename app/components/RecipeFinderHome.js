"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import MealGrid from "./MealGrid";
import SearchBar from "./SearchBar";
import {
  fetchCategories,
  fetchMealsByName,
  fetchMealsByCategory,
} from "@/lib/meal-api";

export default function RecipeFinderHome() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [meals, setMeals] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const requestRef = useRef(0);

  const loadCategories = useCallback(async () => {
    setIsCategoriesLoading(true);
    setCategoriesError("");

    try {
      setCategories(await fetchCategories());
    } catch {
      setCategoriesError("Categories are unavailable.");
    } finally {
      setIsCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      loadCategories();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadCategories]);

  const searchMeals = useCallback(async (query) => {
    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setSearchInput(query);
    setSearchQuery(query);
    setSelectedCategory("All");
    setHasSearched(true);
    setIsLoading(true);
    setError("");

    try {
      const results = await fetchMealsByName(query);

      if (requestRef.current === requestId) {
        setMeals(results);
      }
    } catch {
      if (requestRef.current === requestId) {
        setMeals([]);
        setError("Could not search meals. Please try again.");
      }
    } finally {
      if (requestRef.current === requestId) {
        setIsLoading(false);
      }
    }
  }, []);

  const selectCategory = useCallback(
    async (category) => {
      const requestId = requestRef.current + 1;
      requestRef.current = requestId;
      setSelectedCategory(category);
      setSearchQuery("");
      setSearchInput("");
      setHasSearched(category !== "All");
      setIsLoading(true);
      setError("");

      try {
        const results =
          category === "All" ? [] : await fetchMealsByCategory(category);

        if (requestRef.current === requestId) {
          setMeals(results);
        }
      } catch {
        if (requestRef.current === requestId) {
          setMeals([]);
          setError("Could not load meals for this category. Please try again.");
        }
      } finally {
        if (requestRef.current === requestId) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  const resultHeading = searchQuery
    ? `Results for "${searchQuery}"`
    : selectedCategory !== "All"
      ? `${selectedCategory} meals`
      : "Find your next meal";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="max-w-3xl">
        <p className="font-semibold text-emerald-700 dark:text-emerald-400">
          Discover something delicious
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          What are you craving today?
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          Search thousands of recipes or browse by category to find step-by-step
          meal inspiration.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900 sm:p-6">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={searchMeals}
          isSearching={isLoading}
        />
      </section>

      <div className="mt-10">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={selectCategory}
          isLoading={isCategoriesLoading}
          error={categoriesError}
        />
      </div>

      <section aria-labelledby="results-heading" className="mt-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {selectedCategory === "All" && !searchQuery ? "Search or browse" : "Recipes"}
            </p>
            <h2 id="results-heading" className="mt-1 text-2xl font-bold text-zinc-900 dark:text-white">
              {resultHeading}
            </h2>
          </div>
          {hasSearched && !isLoading && !error && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {meals.length} {meals.length === 1 ? "meal" : "meals"}
            </p>
          )}
        </div>

        {isLoading ? (
          <MealGridSkeleton />
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        ) : !hasSearched ? (
          <MealGrid meals={[]} emptyMessage="Enter a meal name or choose a category to see recipes." />
        ) : (
          <MealGrid
            meals={meals}
            emptyMessage={
              searchQuery
                ? `No meals found for "${searchQuery}".`
                : `No meals found in ${selectedCategory}.`
            }
          />
        )}
      </section>
    </main>
  );
}

function MealGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading meals">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="aspect-[4/3] animate-pulse bg-zinc-200 dark:bg-zinc-800" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
