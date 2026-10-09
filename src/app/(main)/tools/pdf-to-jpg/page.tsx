import type { Metadata } from "next";
import { PdfToJpgTool } from "@/components/tools/pdf-to-jpg";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online Free — High Quality Pages to Images | TheSwiftTools",
  description: "Convert PDF pages to JPG images online for free. Extract all pages or individual images in high resolution. 100% private, runs directly in your browser.",
};

export default function PdfToJpgPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">PDF to JPG</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          PDF to JPG Converter Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert each page of any PDF document into crisp, high-resolution JPG images. Download single pages or the entire set with complete privacy.
        </p>
      </div>

      <PdfToJpgTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-convert-heading" className="space-y-3">
          <h2 id="why-convert-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Convert PDF to JPG?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Sharing a PDF on social media, inserting a slide into a presentation, or uploading an infographic to a website often requires an image format like JPG rather than a document container.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our tool parses and renders every page of your PDF into crisp, clear JPEG images directly inside your browser so you can download and use individual pages anywhere without waiting for external server processing.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Convert PDF to JPG
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your PDF</strong> — drag and drop your document into the box or choose from your files.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Wait for render</strong> — pages render directly via browser canvas in high definition.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Download JPGs</strong> — save individual pages or all pages at once in a click.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Is there a limit on how many pages can be converted?", a: "No artificial limit. Large documents render page-by-page directly in memory on your device." },
              { q: "Is the resolution clear enough for printing?", a: "Yes, pages are rendered at 1.5x supersampled scale for high-definition clarity suitable for display and printing." },
              { q: "Are files uploaded to external servers?", a: "No. The PDF parsing is 100% client-side; your documents never leave your browser." },
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
              { href: "/tools/jpg-to-pdf", name: "JPG to PDF Converter", desc: "Convert photos into PDF documents." },
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF files into one." },
              { href: "/tools/split-pdf", name: "Split PDF", desc: "Extract specific pages from a PDF." },
              { href: "/tools/compress-pdf", name: "Compress PDF", desc: "Reduce PDF document file size." },
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
