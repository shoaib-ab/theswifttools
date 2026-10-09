import type { Metadata } from "next";
import { CompressImageTool } from "@/components/tools/compress-image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online Free — Reduce JPG/PNG to 50 KB | TheSwiftTools",
  description: "Compress images to 50KB online for free. Adjust quality to meet online form upload limits. Free, private, and runs directly in your browser.",
};

export default function CompressImageTo50KbPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Compress to 50KB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Compress Image to 50KB Online — Free & Instant
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Resize and compress your image to 50 KB or less. Commonly required for online application submissions, passport photos, and national ID cards.
        </p>
      </div>

      <CompressImageTool targetKb={50} />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Why 50KB?</h2>
          <p>
            50 Kilobytes is one of the most common standard file upload constraints for national identification portals, bank account registration forms, and university exam applications.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Other Target Sizes</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link href="/compress-image-to-20kb" className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400">Compress to 20KB</Link>
            <Link href="/compress-image-to-100kb" className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400">Compress to 100KB</Link>
            <Link href="/compress-image-to-200kb" className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400">Compress to 200KB</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
