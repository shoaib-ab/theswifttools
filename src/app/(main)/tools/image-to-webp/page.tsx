import type { Metadata } from "next";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image to WebP Converter Online Free | TheSwiftTools",
  description: "Convert any image (JPG, PNG, BMP, GIF) to modern WebP format. Reduce image file size by up to 80% while retaining high visual fidelity.",
};

export default function ImageToWebpPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Image to WebP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Image to WebP Converter Online — Free & Instant
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert JPG, PNG, and GIF images directly into high-efficiency WebP files in your web browser. Free, secure, and private.
        </p>
      </div>

      <ImageFormatConverter
        fromFormat="Image"
        toFormat="WebP"
        fromMime="image/*"
        toMime="image/webp"
        fromExt="image/*"
        toExt="webp"
      />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Modern Websites Choose WebP</h2>
          <p>
            WebP is an open format designed by Google explicitly for the modern web. It supports both lossy and lossless compression, transparency, and animation. WebP pictures are up to 34% smaller than JPEG files and 26% smaller than PNG files at equivalent fidelity.
          </p>
          <p>
            By converting website graphics to WebP, developers reduce data transmission, achieve near-instant initial page loads, and satisfy Google Lighthouse performance requirements.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I convert multiple formats?", a: "Yes, you can upload PNG, JPG, JPEG, and common raster image formats to convert them directly into WebP." },
              { q: "Is this tool completely free?", a: "Yes, 100% free with unlimited conversions and no registration or watermark." },
              { q: "Does WebP work on iPhones and iPads?", a: "Yes, iOS and Safari have supported WebP natively since iOS 14 and macOS Big Sur." },
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
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce file sizes with precision." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/jpg-to-png", name: "JPG to PNG Converter", desc: "Convert JPG to PNG format." },
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
