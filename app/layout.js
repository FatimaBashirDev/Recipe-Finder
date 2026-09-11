import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import { FavoritesProvider } from "./components/FavoritesContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Recipe Finder",
  description: "Search and save recipes from TheMealDB.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-neutral-canvas text-neutral-foreground dark:bg-neutral-canvas-dark dark:text-white">
        <FavoritesProvider>
          <div className="border-b border-neutral-border bg-neutral-canvas dark:border-neutral-border-dark dark:bg-neutral-canvas-dark">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Header />
              <nav className="flex items-center gap-2 sm:gap-4" aria-label="Primary navigation">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-foreground-muted hover:bg-neutral-surface-raised hover:text-neutral-foreground dark:text-neutral-foreground-dark dark:hover:bg-neutral-surface-darker dark:hover:text-white"
                >
                  Home
                </Link>
                <Link
                  href="/favorites"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-foreground-muted hover:bg-neutral-surface-raised hover:text-neutral-foreground dark:text-neutral-foreground-dark dark:hover:bg-neutral-surface-darker dark:hover:text-white"
                >
                  Favorites
                </Link>
                <Link
                  href="/health"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-foreground-muted hover:bg-neutral-surface-raised hover:text-neutral-foreground dark:text-neutral-foreground-dark dark:hover:bg-neutral-surface-darker dark:hover:text-white"
                >
                  Health Check
                </Link>
              </nav>
            </div>
          </div>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
