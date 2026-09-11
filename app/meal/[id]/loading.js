export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="aspect-square rounded-3xl bg-zinc-200 dark:bg-zinc-800 lg:aspect-auto lg:min-h-[520px]" />
          <div className="space-y-5">
            <div className="h-12 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-10 h-8 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-5 rounded bg-zinc-200 dark:bg-zinc-800"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
