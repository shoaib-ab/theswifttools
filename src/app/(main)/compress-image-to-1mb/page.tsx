import type { Metadata } from "next";
import { CompressImageTool } from "@/components/tools/compress-image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress Image to 1MB Online Free — Reduce JPG/PNG to 1 MB | TheSwiftTools",
  description: "Compress oversized RAW and smartphone images to 1MB or less online for free. Fast, high-quality, and 100% private in browser.",
};

export default function CompressImageTo1MbPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Compress to 1MB</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Compress Image to 1MB Online — Free & Instant
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Bring multi-megabyte DSLR and smartphone captures under 1 Megabyte for email sharing and website headers.
        </p>
      </div>

      <CompressImageTool targetKb={1000} />
    </div>
  );
}
