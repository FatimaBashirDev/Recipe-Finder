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
        className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200"
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
          className="min-h-12 flex-1 rounded-xl border border-zinc-300 bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-emerald-900"
        />
        <button
          type="submit"
          disabled={isSearching || !value.trim()}
          className="min-h-12 rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-emerald-500"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
