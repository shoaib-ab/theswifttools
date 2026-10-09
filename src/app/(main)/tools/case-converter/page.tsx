import type { Metadata } from "next";
import { CaseConverterTool } from "@/components/tools/case-converter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Converter Online Free — UPPERCASE, lowercase, Title Case, camelCase | TheSwiftTools",
  description: "Convert text case online instantly. Convert to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. 100% free.",
};

export default function CaseConverterPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Case Converter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Case Converter Online — Transform Text Case Instantly
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Change capitalization of your text with one click. Switch between UPPERCASE, lowercase, Title Case, programmer casing (camelCase, snake_case), and sentence structure.
        </p>
      </div>

      <CaseConverterTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Supported Case Styles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">Title Case:</strong>
              Capitalizes the first letter of every word (e.g., &ldquo;The Quick Brown Fox&rdquo;).
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">Sentence Case:</strong>
              Capitalizes the first letter of each sentence following periods or question marks.
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">camelCase &amp; PascalCase:</strong>
              Removes spaces and capitalizes words for JavaScript and TypeScript variable/class names.
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-0.5">snake_case &amp; kebab-case:</strong>
              Separates words with underscores or dashes for database columns, file names, and URLs.
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Accidentally left Caps Lock on? How do I fix it?", a: "Paste the text into the box and click 'Sentence case' or 'lowercase' to instantly correct inverted capitalization." },
              { q: "Is there any text limit?", a: "You can convert full articles, code files, and documents with thousands of lines in milliseconds." },
              { q: "Does this tool upload my text anywhere?", a: "No. Conversion happens strictly within your browser." },
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
              { href: "/tools/remove-duplicate-lines", name: "Remove Duplicate Lines", desc: "Deduplicate lines in lists." },
              { href: "/tools/slug-generator", name: "Slug Generator", desc: "Generate clean SEO slugs." },
              { href: "/tools/json-formatter", name: "JSON Formatter", desc: "Format and validate JSON data." },
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
