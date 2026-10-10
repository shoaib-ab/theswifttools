import Link from "next/link";
import { ArrowLeft, Home, Compass, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-zinc-50 px-6 py-10 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      {/* Top Bar with brand and theme toggle */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 group"
        >
          <BrandLogo size={32} />
          <span className="font-bold text-base tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            TheSwiftTools
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Main 404 Centerpiece */}
      <div className="my-auto mx-auto w-full max-w-lg text-center py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/80 px-4 py-1 text-xs font-bold text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 shadow-xs mb-6">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
          Error 404 • Page Not Found
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Lost in Space
        </h1>

        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
          The page or tool you are trying to access does not exist, has been migrated, or is operating under a different coordinate.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-base font-bold text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Home className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <Link
            href="/tools/word-to-pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-all shadow-xs cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Try Word to PDF
          </Link>
        </div>

        {/* Quick Directory Links */}
        <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
            Quick Categories
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link
              href="/?cat=documents"
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              Documents
            </Link>
            <Link
              href="/?cat=audio"
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              Audio
            </Link>
            <Link
              href="/?cat=images"
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              Images
            </Link>
            <Link
              href="/?cat=utilities"
              className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              Utilities
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="mx-auto text-center text-xs text-zinc-400 dark:text-zinc-600">
        TheSwiftTools &bull; 100% In-Browser Privacy
      </div>
    </div>
  );
}
