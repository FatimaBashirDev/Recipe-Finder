import Link from "next/link";

export default function Header() {
  return (
    <Link
      href="/"
      className="text-xl font-bold tracking-tight text-neutral-foreground dark:text-white"
    >
      Recipe Finder
    </Link>
  );
}
