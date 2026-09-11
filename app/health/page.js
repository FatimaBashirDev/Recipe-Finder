export default async function HealthPage() {
  let categories = [];
  let apiError = "";

  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php",
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`TheMealDB returned ${response.status}.`);
    }

    const data = await response.json();
    categories = data.categories ?? [];
  } catch {
    apiError = "TheMealDB API is currently unavailable.";
  }

  if (apiError) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="font-semibold text-brand-primary-hover dark:text-brand-primary-light">
        Health status
      </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-foreground dark:text-white">
          Health Check
        </h1>
        <div
          role="alert"
          className="mt-8 rounded-2xl border border-neutral-border bg-neutral-surface p-6 dark:border-neutral-border-dark dark:bg-neutral-surface-dark"
        >
          <p className="font-semibold text-neutral-foreground dark:text-white">
            Degraded
          </p>
          <p className="mt-2 text-neutral-foreground-muted dark:text-neutral-foreground-dark">
            {apiError}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="font-semibold text-brand-primary-hover dark:text-brand-primary-light">
        Health status
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-neutral-foreground dark:text-white">
        Health Check
      </h1>
      <div className="mt-8 rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm dark:border-neutral-border-dark dark:bg-neutral-surface-dark">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-brand-primary" />
          <p className="font-semibold text-neutral-foreground dark:text-white">
            API reachable
          </p>
        </div>
        <p className="mt-3 text-neutral-foreground-muted dark:text-neutral-foreground-dark">
          TheMealDB is responding successfully with {categories.length}{" "}
          {categories.length === 1 ? "category" : "categories"}.
        </p>
      </div>
    </main>
  );
}
