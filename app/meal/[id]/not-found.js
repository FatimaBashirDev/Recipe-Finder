import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-semibold text-brand-primary-hover dark:text-brand-light">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-neutral-foreground dark:text-white">
        Meal not found
      </h1>
      <p className="mt-4 text-neutral-foreground-muted dark:text-neutral-foreground-dark">
        This recipe may no longer be available.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white hover:bg-brand-primary-hover"
      >
        Find another meal
      </Link>
    </main>
  );
}
