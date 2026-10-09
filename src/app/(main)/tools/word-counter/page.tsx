import type { Metadata } from "next";
import { WordCounterTool } from "@/components/tools/word-counter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Word Counter Online Free — Count Words, Characters, Reading Time | TheSwiftTools",
  description: "Count words, characters (with and without spaces), sentences, paragraphs, reading time, and keyword frequency in real time. 100% free and private in browser.",
};

export default function WordCounterPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Word Counter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Word Counter Online — <span className="heading-highlight">Real-Time Text Statistics</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Instantly calculate words, character counts, sentences, paragraphs, estimated reading and speaking duration, and keyword density as you type.
        </p>
      </div>

      <WordCounterTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Track Word and Character Counts?</h2>
          <p>
            Whether writing an academic essay with a strict 2,500-word limit, crafting Google Ad headlines (30 characters), writing Twitter/X posts (280 characters), or planning an 8-minute presentation speech, accurate length metrics are crucial.
          </p>
          <p>
            Our tool analyzes whitespace, sentence boundaries, and word frequencies without sending any of your sensitive drafts or proprietary documents over the network.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Common Word & Character Limits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block">X / Twitter:</strong> 280 characters per tweet
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block">SEO Meta Description:</strong> 155–160 characters
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block">Blog Post Optimal Length:</strong> 1,500–2,200 words
            </div>
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block">Speech (5 Minutes):</strong> ~650 words (at 130 WPM)
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How is reading time calculated?", a: "Estimated reading time is calculated using the standard average adult silent reading speed of 200 words per minute (WPM)." },
              { q: "How is speaking time calculated?", a: "Speaking time is estimated at a natural conversational or presentation pace of 130 words per minute." },
              { q: "Does the word counter store my text?", a: "No. Everything runs in-memory in your local browser session." },
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
              { href: "/tools/case-converter", name: "Case Converter", desc: "Convert UPPERCASE, lowercase, Title Case." },
              { href: "/tools/remove-duplicate-lines", name: "Remove Duplicate Lines", desc: "Clean up repetitive lines." },
              { href: "/tools/slug-generator", name: "Slug Generator", desc: "Create SEO-friendly URL slugs." },
              { href: "/tools/json-formatter", name: "JSON Formatter", desc: "Format, validate and minify JSON." },
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
