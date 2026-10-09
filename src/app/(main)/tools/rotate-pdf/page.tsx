import type { Metadata } from "next";
import { RotatePdfTool } from "@/components/tools/rotate-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rotate PDF Online Free — Turn Pages 90, 180 or 270 Degrees | TheSwiftTools",
  description: "Rotate PDF pages online for free. Fix upside-down scans or landscape tables by rotating 90 degrees clockwise, counter-clockwise, or 180 degrees. Private and instant.",
};

export default function RotatePdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=pdf" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Rotate PDF</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Rotate PDF Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Permanently rotate upside-down or sideways PDF pages by 90°, 180°, or 270°. Rotate all pages or target specific page numbers in your browser with zero data uploads.
        </p>
      </div>

      <RotatePdfTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="why-rotate-heading" className="space-y-3">
          <h2 id="why-rotate-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Fix Upside-Down Scans and Landscape Pages
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Scanned receipts, signed contracts, and spreadsheet reports frequently end up rotated sideways or upside-down. Reading sideways documents causes neck strain and creates an unprofessional impression when emailing clients.
          </p>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our client-side PDF rotator modifies the internal PDF viewing matrix flags without recompressing text or pixelating graphics, giving you a crystal-clear, properly oriented document in seconds.
          </p>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Rotate a PDF
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Upload your PDF</strong> — select your file from computer or phone.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Choose rotation angle</strong> — select 90° Clockwise, 180° Flip, or 90° Counter-Clockwise.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Select target pages</strong> — rotate all pages at once or type specific pages (e.g., 2, 4-6).</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Rotate & Download</strong> — click &ldquo;Rotate PDF Document&rdquo; and save instantly.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Is the rotation permanent?", a: "Yes. When you download the rotated PDF, the orientation metadata is saved permanently so it opens upright in all PDF readers." },
              { q: "Does rotating degrade text or image quality?", a: "No. The PDF standard rotates page display coordinates losslessly without altering raster images or text vectors." },
              { q: "Are files uploaded to a remote server?", a: "No. The entire process occurs locally in your browser using pdf-lib." },
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
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF files into one." },
              { href: "/tools/split-pdf", name: "Split PDF", desc: "Extract specific pages from a PDF." },
              { href: "/tools/image-to-pdf", name: "Image to PDF", desc: "Convert photos into PDF documents." },
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
