import type { Metadata } from "next";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JPG to WebP Converter Online Free — Fast & High Quality | TheSwiftTools",
  description: "Convert JPG/JPEG images to next-gen WebP format for fast web delivery and smaller file sizes. Free, private, and runs entirely in your browser.",
};

export default function JpgToWebpPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">JPG to WebP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          JPG to WebP Converter Online — Free & Instant
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert JPG and JPEG photos to next-generation WebP format for superior compression and faster page loading speeds. 100% in-browser conversion.
        </p>
      </div>

      <ImageFormatConverter
        fromFormat="JPG"
        toFormat="WebP"
        fromMime="image/jpeg"
        toMime="image/webp"
        fromExt=".jpg,.jpeg"
        toExt="webp"
      />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Convert JPG to WebP?</h2>
          <p>
            WebP is recommended by Google PageSpeed and modern web performance best practices because it produces files that are on average <strong>25% to 35% smaller</strong> than standard JPEG images at equivalent perceived visual quality.
          </p>
          <p>
            Smaller image files load faster on mobile networks, reduce bandwidth costs for webmasters, and improve Core Web Vitals rankings on search engines like Google.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert JPG to WebP</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your JPG photo</strong> — drag and drop or browse files.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Fast local conversion</strong> — converted immediately with HTML5 canvas.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Download your WebP file</strong> — ready to serve on your website or blog.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is WebP supported on WordPress and Shopify?", a: "Yes, both modern WordPress and Shopify natively support WebP images for media uploads and storefront display." },
              { q: "Will I lose picture quality?", a: "No observable quality loss occurs at default 92% compression settings, while you typically achieve noticeable reductions in file size." },
              { q: "Are my personal pictures safe?", a: "Completely safe. No pictures are ever sent over the internet or saved to remote databases." },
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
              { href: "/tools/compress-image", name: "Compress Image", desc: "Fine-tune compression with slider." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/png-to-webp", name: "PNG to WebP Converter", desc: "Modernize transparent PNG files." },
              { href: "/tools/webp-to-jpg", name: "WebP to JPG Converter", desc: "Convert WebP back to JPG." },
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
