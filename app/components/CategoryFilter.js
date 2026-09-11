export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
  isLoading,
  error,
}) {
  return (
    <section className="mb-8" aria-labelledby="category-filter-heading">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2
          id="category-filter-heading"
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-200"
        >
          Browse categories
        </h2>
        {isLoading && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Loading...
          </span>
        )}
      </div>
      {error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          Could not load categories.
        </p>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-2" role="list">
          <button
            type="button"
            role="listitem"
            onClick={() => onSelect("All")}
            disabled={isLoading}
            className={categoryButtonClass(selectedCategory === "All")}
          >
            All
          </button>
          {categories.map((category) => {
            const name = category.strCategory;
            return (
              <button
                key={name}
                type="button"
                role="listitem"
                onClick={() => onSelect(name)}
                disabled={isLoading}
                className={categoryButtonClass(selectedCategory === name)}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function categoryButtonClass(isSelected) {
  return [
    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
    isSelected
      ? "border-emerald-600 bg-emerald-600 text-white"
      : "border-zinc-300 bg-white text-zinc-700 hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:text-emerald-300",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ");
}
