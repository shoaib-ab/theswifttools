import type { Metadata } from "next";
import { SplitPdfTool } from "@/components/tools/split-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Split PDF Online Free — Extract Pages from PDF | TheSwiftTools",
  description: "Split PDF documents online for free. Extract specific pages or custom page ranges (e.g. 1-5, 8). 100% private, no signup, runs directly in your browser.",
};

export default function SplitPdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Split PDF</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Split PDF Online — Extract Pages <span className="heading-highlight">Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Extract specific pages or page ranges from a large PDF document into a new independent file. Fast, secure, and entirely client-side.
        </p>
      </div>

      <SplitPdfTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-split-heading" className="space-y-3">
          <h2 id="why-split-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Split a PDF?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            When you receive a 50-page document but only need to share pages 3 through 7 with a colleague, sending the full file wastes bandwidth and risks sharing confidential unrelated sections.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            With our browser-based PDF splitter, you can pinpoint the exact pages you need and save them as a clean, compact PDF without uploading your confidential files to any third-party server.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Split a PDF
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your PDF</strong> — drag and drop or browse for your document.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Specify pages to extract</strong> — type page numbers (e.g. <code>1-3, 5</code>) or click to select visually.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Extract & Download</strong> — click &ldquo;Extract Selected Pages&rdquo; to download the new PDF.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Can I enter multiple disjoint ranges?", a: "Yes! You can enter comma-separated ranges such as 1-3, 5, 8-12 to package multiple non-consecutive pages together." },
              { q: "Will the extracted PDF lose font formatting?", a: "No. The vector fonts, links, and embedded assets are copied directly using native PDF object streams, preserving full fidelity." },
              { q: "Is this tool completely private?", a: "Yes. All operations run directly in your local browser sandbox via pdf-lib. No document data is ever sent across the web." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-200/80 p-5 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/30">
                <dt className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">{q}</dt>
                <dd className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="related-tools-heading" className="space-y-4">
          <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Related PDF Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF documents into one." },
              { href: "/tools/rotate-pdf", name: "Rotate PDF", desc: "Rotate orientation of PDF pages." },
              { href: "/tools/image-to-pdf", name: "Image to PDF", desc: "Convert photos into PDF documents." },
              { href: "/tools/word-to-pdf", name: "Word to PDF", desc: "Convert docx files to clean PDF." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="group flex flex-col gap-1 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/50 hover:border-red-500 dark:hover:border-red-500 shadow-xs hover:shadow-md transition-all">
                <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{name}</span>
                <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">{desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
