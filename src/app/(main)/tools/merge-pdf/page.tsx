import type { Metadata } from "next";
import { MergePdfTool } from "@/components/tools/merge-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merge PDF Online Free — Combine PDF Files in Seconds | TheSwiftTools",
  description: "Merge multiple PDF files into a single document online for free. Reorder pages, drag and drop files, and download instantly with complete privacy in your browser.",
};

export default function MergePdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Merge PDF</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Merge PDF Online — Combine PDF Files <span className="heading-highlight">Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Combine two or more PDF documents into a single organized file. Arrange files in any order and merge in seconds. Zero uploads — runs 100% privately in your browser.
        </p>
      </div>

      <MergePdfTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-merge-heading" className="space-y-3">
          <h2 id="why-merge-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Merge PDFs Locally?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Combining reports, invoices, legal contracts, or coursework into a unified PDF makes document sharing seamless. Unlike other online converters that upload your confidential contracts and personal bank statements to remote cloud servers, our tool processes everything locally on your machine using modern WebAssembly and JavaScript.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Merge PDF Files
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your PDF files</strong> — select multiple documents from your computer or phone.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Arrange page order</strong> — click the up and down arrows to place each document in the correct sequence.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Merge & Download</strong> — click &ldquo;Merge PDF Documents&rdquo; and save the unified document immediately.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Is there any limit on how many PDFs I can merge?", a: "No. You can merge as many files as you like. Because processing is handled on your device, speed depends only on your local system memory." },
              { q: "Will the original quality or bookmarks be preserved?", a: "Yes, text vectors, high-resolution embedded images, and original page geometry are fully preserved without recompression." },
              { q: "Are my documents safe and private?", a: "100% private. Files never leave your web browser. No cloud storage, no logs, and no external tracking." },
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
              { href: "/tools/split-pdf", name: "Split PDF", desc: "Extract specific pages or page ranges." },
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
