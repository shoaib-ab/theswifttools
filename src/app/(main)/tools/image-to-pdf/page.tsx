import type { Metadata } from "next";
import { ImageToPdfTool } from "@/components/tools/image-to-pdf";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image to PDF Converter Online Free — Multiple Images to 1 PDF | TheSwiftTools",
  description: "Convert JPG, PNG, WebP images to PDF document. Combine multiple images into a single PDF, reorder pages, adjust margins, and download instantly.",
};

export default function ImageToPdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Image to PDF</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Image to PDF Converter Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert one or multiple images into a single clean PDF document. Arrange page order, set custom page orientations and margins, and download in seconds.
        </p>
      </div>

      <ImageToPdfTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Combine Images into a PDF?</h2>
          <p>
            When submitting receipts, scanned invoices, university assignments, or application portfolios, sending dozens of loose image files is messy and often rejected by document submission portals.
          </p>
          <p>
            Converting images into a single PDF standardizes page dimensions (like A4 or US Letter), preserves chronological sequence, ensures high print compatibility, and makes sharing via email easy and professional.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert Images to PDF</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your images</strong> — select or drag & drop one or multiple photos.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Reorder pages</strong> — use the up/down arrows to position each page where you want it.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Configure layout</strong> — choose page size (A4, Letter), orientation (Portrait, Landscape), and margins.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Generate PDF</strong> — click &ldquo;Convert &amp; Download PDF&rdquo; to download your document.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I combine both JPG and PNG images in the same PDF?", a: "Yes! You can upload a mix of JPG, JPEG, PNG, and WebP files. All formats will be unified into the same PDF file." },
              { q: "Is there a page limit?", a: "There is no strict artificial page limit. You can compile dozens of images directly in your browser." },
              { q: "Are my files uploaded to a cloud server?", a: "No. The PDF generation engine runs entirely within your browser via jsPDF. Your sensitive documents stay strictly on your local device." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/jpg-to-pdf", name: "JPG to PDF Converter", desc: "Dedicated JPG photos to PDF converter." },
              { href: "/tools/merge-pdf", name: "Merge PDF", desc: "Combine multiple PDF documents into one." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce photo file sizes before converting." },
              { href: "/tools/passport-photo-maker", name: "Passport Photo Maker", desc: "Create compliant passport photos." },
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
