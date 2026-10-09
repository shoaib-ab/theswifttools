import type { Metadata } from "next";
import { SvgToPngTool } from "@/components/tools/svg-to-png";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SVG to PNG Converter Online Free — High Res & Transparent | TheSwiftTools",
  description: "Convert SVG vector files to PNG with transparency support. Choose custom scale multipliers (1x, 2x, 4x, 8x) for ultra-sharp icons and illustrations.",
};

export default function SvgToPngPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">SVG to PNG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          SVG to PNG Converter Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert vector SVG files into crisp, raster PNG images with transparent or solid backgrounds. Scale up to 8x resolution for ultra-sharp Retina and 4K displays.
        </p>
      </div>

      <SvgToPngTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Convert SVG to PNG?</h2>
          <p>
            Scalable Vector Graphics (SVG) are the gold standard for icons and logos on websites, but many platforms (such as Facebook, Instagram, LinkedIn, email clients, and Word documents) do not render SVG files natively.
          </p>
          <p>
            Rasterizing your SVG into a PNG file allows you to share graphics anywhere while maintaining pure transparent backgrounds and razor-sharp edge definition by selecting higher render scales like 2x, 4x, or 8x.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert SVG to PNG</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your SVG file</strong> — drag and drop or browse your local file system.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Select export scale</strong> — pick 1x for original size, or 2x/4x/8x for high-definition render.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set background preference</strong> — keep transparent or choose white/black background fill.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Download PNG</strong> — click the download button to save your PNG immediately.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Will the exported PNG have blurry edges?", a: "No! Because SVG is vector-based, choosing 2x, 4x, or 8x re-renders the math vectors cleanly at the higher pixel dimensions before rasterizing." },
              { q: "Does the output preserve transparency?", a: "Yes, by default transparency is preserved so the PNG can be placed seamlessly over any background." },
              { q: "Is there any file upload to an external server?", a: "No. The SVG parser and HTML5 Canvas rasterization run 100% locally in your browser." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Image Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/png-to-webp", name: "PNG to WebP Converter", desc: "Convert PNG to modern WebP format." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce image file size with slider." },
              { href: "/tools/crop-image", name: "Crop Image", desc: "Crop photos to custom aspect ratios." },
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
