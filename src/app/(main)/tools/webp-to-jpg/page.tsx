import type { Metadata } from "next";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WebP to JPG Converter Online Free — Fast & Private | TheSwiftTools",
  description: "Convert WebP images to JPG format for maximum compatibility across older software, photo editors, and systems. 100% free and in-browser.",
};

export default function WebpToJpgPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">WebP to JPG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          WebP to JPG Converter Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert WebP files downloaded from websites into universally compatible JPG format. Works completely offline on your device with no upload queue.
        </p>
      </div>

      <ImageFormatConverter
        fromFormat="WebP"
        toFormat="JPG"
        fromMime="image/webp"
        toMime="image/jpeg"
        fromExt=".webp"
        toExt="jpg"
      />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Convert WebP to JPG?</h2>
          <p>
            While WebP is excellent for website performance, many desktop software programs, older photo editing apps, printers, and document submission portals do not yet fully accept .webp files.
          </p>
          <p>
            JPG (JPEG) is the world&apos;s most universally accepted image format. Converting your WebP image to JPG ensures that it can be opened, viewed, and edited on any device, operating system, or software package without error.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert WebP to JPG</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Select your WebP image</strong> — drop it into the upload box.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Instant conversion</strong> — the browser converts it directly using canvas.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Download JPG</strong> — click the button to save your universal JPG file.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What happens to transparency when converting to JPG?", a: "JPG does not support transparent backgrounds. Any transparent areas in your WebP image will automatically be filled with clean white background." },
              { q: "Is the conversion quality high?", a: "Yes, our converter exports at high JPEG quality (92%), preserving fine details and vibrant color accuracy." },
              { q: "Is there any file upload or privacy risk?", a: "None whatsoever. The file is rendered and converted entirely inside your browser's local sandbox." },
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
              { href: "/tools/jpg-to-png", name: "JPG to PNG Converter", desc: "Convert JPG photos to PNG format." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce file sizes with precision." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/png-to-webp", name: "PNG to WebP Converter", desc: "Modernize PNG files to WebP format." },
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
