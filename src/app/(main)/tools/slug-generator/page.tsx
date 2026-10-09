import type { Metadata } from "next";
import { SlugGeneratorTool } from "@/components/tools/slug-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Slug Generator Online Free — SEO Friendly URL Slug Converter | TheSwiftTools",
  description: "Convert article titles, blog headlines, and product names into clean, SEO-friendly URL slugs. Customize separators, remove stop words, and preview full URLs.",
};

export default function SlugGeneratorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Slug Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Slug Generator — Create SEO-Friendly URL Slugs
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Transform post titles and headlines into human-readable, lowercase URL slugs with hyphens or underscores. Strip out stop words and special characters for optimal search engine indexing.
        </p>
      </div>

      <SlugGeneratorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What Makes an SEO-Friendly URL Slug?</h2>
          <p>
            A URL slug is the portion of a web address that identifies a specific page on a website in human-readable terms. Google and search engines use slugs to understand page topic and context before crawling.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <li><strong>Use Hyphens:</strong> Google recommends hyphens (-) over underscores (_) as word separators.</li>
            <li><strong>Stay Lowercase:</strong> Web servers like Linux/Apache treat mixed-case URLs as distinct paths, risking duplicate content penalties.</li>
            <li><strong>Short & Keyword-Rich:</strong> Removing filler words (like &ldquo;the&rdquo;, &ldquo;a&rdquo;, &ldquo;and&rdquo;) keeps URLs concise and easier to share.</li>
          </ul>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What happens to punctuation marks and emojis?", a: "Special characters like !?, @, &, and emojis are automatically stripped out, leaving only clean alphanumeric words." },
              { q: "Can I preview my full domain structure?", a: "Yes, you can edit the domain prefix in the preview box to see how the complete live link appears before copying." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Dev Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/case-converter", name: "Case Converter", desc: "Convert text casing." },
              { href: "/tools/word-counter", name: "Word Counter", desc: "Count words, characters, and reading time." },
              { href: "/tools/url-encode-decode", name: "URL Encode / Decode", desc: "Safely encode URL queries." },
              { href: "/tools/uuid-generator", name: "UUID Generator", desc: "Generate random UUID v4 identifiers." },
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
