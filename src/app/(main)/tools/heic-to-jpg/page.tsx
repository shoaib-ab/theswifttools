import type { Metadata } from "next";
import { HeicToJpgTool } from "@/components/tools/heic-to-jpg";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter Online Free — iPhone Photos to JPG | TheSwiftTools",
  description: "Convert Apple HEIC and HEIF photos from iPhone or iPad to universally compatible JPG format. Free, private, and instant.",
};

export default function HeicToJpgPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      {/* Header & Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="space-y-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <ol className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          <li>
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/?cat=images" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Image Tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-900 dark:text-zinc-100 font-bold" aria-current="page">HEIC to JPG</li>
        </ol>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          HEIC to JPG Converter Online
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert Apple High Efficiency Image Container (.HEIC) photos into universal JPEG format to view on Windows, Android, and web portals. 100% free and private.
        </p>
      </nav>

      {/* Main Tool Workbench */}
      <section aria-label="HEIC to JPG Workspace">
        <HeicToJpgTool />
      </section>

      {/* SEO & Guide Section */}
      <div className="space-y-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <section aria-labelledby="what-is-heic-title" className="space-y-4">
          <h2 id="what-is-heic-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            What is HEIC and Why Convert It?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            HEIC (High Efficiency Image Container) is the default image format used by iPhones and iPads since iOS 11. While it offers excellent compression and preserves live photo data, many non-Apple platforms, Windows computers, Android phones, and online job or visa application portals cannot open .heic files.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            Converting HEIC to JPG transforms your Apple photos into the most universally recognized format in the world, ensuring anyone can view and print your pictures without specialized software.
          </p>
        </section>

        {/* How-To Guide */}
        <section aria-labelledby="how-to-title" className="space-y-4">
          <h2 id="how-to-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Convert HEIC to JPG
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">1</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Upload Your HEIC Photo</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Drag and drop your iPhone .heic file into the upload zone.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">2</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Instant In-Browser Conversion</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">The browser decodes and converts pixels locally with full fidelity.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 sm:col-span-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">3</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Download JPG Photo</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Click &ldquo;Download Converted JPG Photo&rdquo; to save anywhere.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-title" className="space-y-4">
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "How do I take JPG photos on iPhone instead of HEIC?", a: "Go to Settings > Camera > Formats on your iPhone and select 'Most Compatible'. This forces the iPhone to save all future photos as standard JPGs." },
              { q: "Is conversion private?", a: "Yes. Processing takes place locally in your web browser with complete privacy." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                <dt className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{q}</dt>
                <dd className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related Tools */}
        <section aria-labelledby="related-tools-title" className="space-y-4">
          <h2 id="related-tools-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Related Image Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/tools/jpg-to-png", name: "JPG to PNG Converter", desc: "Convert JPG to transparent PNG format." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce photo file sizes with precision." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/passport-photo-maker", name: "Passport Photo Maker", desc: "Create biometric passport photos." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 hover:border-red-500 hover:shadow-md transition-all">
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-normal">{desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
