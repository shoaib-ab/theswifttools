import type { Metadata } from "next";
import { CompressPdfTool } from "@/components/tools/compress-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress PDF Online Free — Reduce PDF File Size | TheSwiftTools",
  description: "Reduce PDF file size online for free while maintaining sharp text and high quality. Ideal for email attachments and portal upload limits. 100% private in browser.",
};

export default function CompressPdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Compress PDF</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Compress PDF Online — Reduce File Size <span className="heading-highlight">Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Shrink oversized PDF documents without sacrificing readable clarity. Clean redundant metadata and compress streams safely in your browser.
        </p>
      </div>

      <CompressPdfTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-compress-heading" className="space-y-3">
          <h2 id="why-compress-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Compress PDF Files?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Many government visa portals, university admission forms, and job application sites enforce strict file size caps (e.g. 2 MB or 5 MB maximum). Similarly, email services often reject attachments larger than 20–25 MB.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Compressing your PDF removes bloat, optimizes object tables, and condenses structural streams so your documents upload smoothly without exceeding upload limits.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Compress a PDF
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your PDF</strong> — drag and drop or browse files from your computer.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Choose compression strength</strong> — pick Recommended or Maximum compression.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Compress & Download</strong> — click &ldquo;Compress PDF Document&rdquo; and save your optimized file.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Will text become blurry after compression?", a: "No. Vector text remains mathematically sharp at any zoom level because fonts are not rasterized." },
              { q: "Is there any cost or subscription?", a: "No, 100% free with no limits on usage or number of files." },
              { q: "Are files kept private?", a: "Yes. All compression algorithms execute inside your local browser sandbox without external transmission." },
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
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF documents." },
              { href: "/tools/split-pdf", name: "Split PDF", desc: "Extract pages from a PDF." },
              { href: "/tools/rotate-pdf", name: "Rotate PDF", desc: "Rotate pages 90 or 180 degrees." },
              { href: "/tools/image-to-pdf", name: "Image to PDF", desc: "Convert photos into PDF files." },
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
