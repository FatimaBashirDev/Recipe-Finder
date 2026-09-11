"use client";

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
          className="text-sm font-semibold text-neutral-foreground-strong dark:text-neutral-border-strong"
        >
          Browse categories
        </h2>
        {isLoading && (
          <span className="text-sm text-neutral-foreground-subtle dark:text-neutral-foreground-dark-muted">
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
      ? "border-brand-primary bg-brand-primary text-white"
      : "border-neutral-border-strong bg-neutral-canvas text-neutral-foreground-strong hover:border-brand-accent hover:text-brand-primary-hover dark:border-neutral-foreground-strong dark:bg-neutral-surface-dark dark:text-neutral-border-strong dark:hover:text-brand-lighter",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ");
}
