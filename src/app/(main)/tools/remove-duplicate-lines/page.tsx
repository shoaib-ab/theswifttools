import type { Metadata } from "next";
import { RemoveDuplicateLinesTool } from "@/components/tools/remove-duplicate-lines";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines Online Free — Deduplicate Lists & Text | TheSwiftTools",
  description: "Quickly remove duplicate lines from lists, CSVs, and text. Support for case-sensitive filtering, whitespace trimming, empty line removal, and sorting. 100% private.",
};

export default function RemoveDuplicateLinesPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Remove Duplicate Lines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Remove Duplicate Lines Online — Clean Lists Free
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Deduplicate lists, email collections, URLs, and database records in seconds. Filter out redundant repetitions and sort alphabetically without cloud uploads.
        </p>
      </div>

      <RemoveDuplicateLinesTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Deduplicate Lists?</h2>
          <p>
            When preparing email marketing subscriber lists, analyzing server log files, or cleaning spreadsheet exports, duplicate entries waste money and corrupt analytical metrics.
          </p>
          <p>
            Our tool analyzes every single line in O(N) linear time, keeping only the first unique instance and stripping out accidental duplicate rows while giving you exact counts of rows removed.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is the comparison case sensitive?", a: "By default, comparison is case-insensitive ('Apple' and 'apple' are treated as duplicates). You can check 'Case Sensitive' if capitalization matters." },
              { q: "Can it handle lists with tens of thousands of lines?", a: "Yes! Modern JavaScript sets can effortlessly deduplicate 100,000+ lines in under a second directly on your computer." },
              { q: "Is my list private?", a: "100% private. Text remains strictly within your browser sandbox." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Text Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/word-counter", name: "Word Counter", desc: "Count words, characters, and reading time." },
              { href: "/tools/case-converter", name: "Case Converter", desc: "Convert text casing." },
              { href: "/tools/json-formatter", name: "JSON Formatter", desc: "Format and validate JSON." },
              { href: "/tools/slug-generator", name: "Slug Generator", desc: "Create clean URL slugs." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="flex flex-col gap-0.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
