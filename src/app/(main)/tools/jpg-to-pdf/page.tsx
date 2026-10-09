import type { Metadata } from "next";
import { ImageToPdfTool } from "@/components/tools/image-to-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JPG to PDF Converter Online Free — Convert JPG/JPEG to PDF | TheSwiftTools",
  description: "Convert JPG and JPEG photos into a clean PDF document for free. Combine multiple photos into one PDF, adjust margins and page orientation. 100% private.",
};

export default function JpgToPdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">JPG to PDF</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          JPG to PDF Converter Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert one or multiple JPG/JPEG images into a single organized PDF document. Drag to reorder, configure A4 or Letter sizes, and download instantly.
        </p>
      </div>

      <ImageToPdfTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-convert-heading" className="space-y-3">
          <h2 id="why-convert-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Why Convert JPG to PDF?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            When emailing receipts, bank statements, identification documents, or photo homework assignments, sending dozens of loose .jpg files is inconvenient for recipients.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Converting your JPG photos into a single PDF arranges them in a numbered order, fits them to standard printer paper sizes, and ensures they can be opened without issue on any device.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Convert JPG to PDF
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your JPG images</strong> — drag and drop or browse files from your computer or phone.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Order your pages</strong> — use the arrows to set page order.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Select orientation & margins</strong> — choose Portrait or Landscape and margin size.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Download PDF</strong> — click to generate and save your unified PDF instantly.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Can I convert multiple JPGs into one PDF file?", a: "Yes, you can upload as many JPG photos as you need and combine them all into a single organized PDF file." },
              { q: "Will the PDF lose photo quality?", a: "No, the converter embeds the JPEG data cleanly into the PDF page stream to maintain high visual clarity." },
              { q: "Is this free and secure?", a: "Yes, 100% free with unlimited conversions, and runs completely offline in your browser." },
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
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/tools/image-to-pdf", name: "Image to PDF", desc: "Convert PNG, WebP, and JPG to PDF." },
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF files into one." },
              { href: "/tools/split-pdf", name: "Split PDF", desc: "Extract specific pages from a PDF." },
              { href: "/tools/rotate-pdf", name: "Rotate PDF", desc: "Rotate orientation of PDF pages." },
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
