"use client";

export default function SearchBar({ value, onChange, onSearch, isSearching }) {
  function handleSubmit(event) {
    event.preventDefault();
    const query = value.trim();

    if (!query) {
      return;
    }

    onSearch(query);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <label
        htmlFor="meal-search"
        className="mb-2 block text-sm font-semibold text-neutral-foreground-strong dark:text-neutral-border-strong"
      >
        Search by meal name
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="meal-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Try chicken, pasta, or cake"
          disabled={isSearching}
          className="min-h-12 flex-1 rounded-xl border border-neutral-border-strong bg-neutral-canvas px-4 text-neutral-foreground placeholder:text-neutral-placeholder focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-soft dark:border-neutral-foreground-strong dark:bg-neutral-surface-dark dark:text-white dark:focus:ring-brand-ring-dark"
        />
        <button
          type="submit"
          disabled={isSearching || !value.trim()}
          className="min-h-12 rounded-xl bg-brand-primary px-6 font-semibold text-white transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-brand-accent"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
