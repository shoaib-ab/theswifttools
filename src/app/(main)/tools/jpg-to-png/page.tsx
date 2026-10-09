import type { Metadata } from "next";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Online Free — No Upload | TheSwiftTools",
  description: "Convert JPG images to PNG format with transparency support. Free, instant, runs 100% in your browser. No file uploads. No signup required.",
};

export default function JpgToPngPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">JPG to PNG</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          JPG to PNG Converter Online — Free & Private
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert any JPG or JPEG image to PNG format instantly in your browser. PNG supports transparency and lossless quality. Your files never leave your device.
        </p>
      </div>

      <ImageFormatConverter
        fromFormat="JPG"
        toFormat="PNG"
        fromMime="image/jpeg"
        toMime="image/png"
        fromExt=".jpg,.jpeg"
        toExt="png"
      />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">JPG vs PNG: When to Use Which?</h2>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">JPG</strong> is ideal for photographs and complex images with many colors. It uses lossy compression, meaning it discards some quality to achieve a smaller file size. JPG does not support transparency.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">PNG</strong> is better for logos, icons, screenshots, and any image where you need crisp edges, text, or a transparent background. PNG uses lossless compression, preserving every pixel exactly. The tradeoff is that PNG files are larger than JPG for photographic content.
          </p>
          <p>
            Convert JPG to PNG when you need to add transparency to an image, preserve exact colors without any lossy compression artifacts, or when working with a design tool that requires PNG input.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert JPG to PNG</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your JPG</strong> — drag and drop or click to browse.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Wait for conversion</strong> — it happens instantly in your browser.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Download the PNG</strong> — click the download button to save the converted file.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Will the converted PNG have a transparent background?", a: "Converting a JPG to PNG does not automatically create transparency — JPG has no transparency channel, so the background will remain as it appears in the original. To remove backgrounds, you would need a separate background removal tool." },
              { q: "Will converting JPG to PNG improve quality?", a: "No. Converting from JPG to PNG saves future quality loss, but it cannot restore quality that was already lost when the JPG was created. The PNG will look identical to the JPG." },
              { q: "Why is the PNG file larger than the JPG?", a: "PNG uses lossless compression which preserves all pixel data, resulting in larger files than JPG for photographic content. This is expected and normal." },
              { q: "Is my file uploaded to a server?", a: "No. The conversion uses the HTML5 Canvas API entirely within your browser. Your image is never sent over the internet." },
              { q: "What is the maximum file size supported?", a: "There is no hard limit enforced by this tool. However, very large images (above 20MP) may be slower to process depending on your device's memory and CPU." },
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
              { href: "/tools/jpg-to-webp", name: "JPG to WebP Converter", desc: "Convert JPG to WebP for smaller sizes." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce image file size with a quality slider." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize images by pixels or percentage." },
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
