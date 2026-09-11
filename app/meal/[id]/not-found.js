import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-semibold text-emerald-700 dark:text-emerald-400">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
        Meal not found
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300">
        This recipe may no longer be available.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        Find another meal
      </Link>
    </main>
  );
}
