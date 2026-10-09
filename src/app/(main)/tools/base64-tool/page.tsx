import type { Metadata } from "next";
import { Base64ToolComponent } from "@/components/tools/base64-tool";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder Online Free — Text and File to Base64 | TheSwiftTools",
  description: "Encode text and files to Base64 or decode Base64 strings back to original text and files. Support for full UTF-8 Unicode, images, and Data URIs.",
};

export default function Base64ToolPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Base64 Encoder/Decoder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Base64 Encoder & Decoder Online — Free & Instant
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert text, images, and binary files into Base64 format and Data URIs, or decode Base64 strings back into human-readable text and downloadable files.
        </p>
      </div>

      <Base64ToolComponent />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What is Base64 Encoding?</h2>
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation. It is designed to carry data stored in binary formats across channels that only reliably support text content (such as email via MIME, HTTP headers, XML, and inline HTML data URLs).
          </p>
          <p>
            Encoding in Base64 increases the data size by approximately 33%, but guarantees that characters will not be modified or stripped by legacy transport protocols.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this encoder safe for non-English UTF-8 characters and emojis?", a: "Yes. Our implementation uses standard TextEncoder and TextDecoder interfaces, properly preserving international characters and emojis." },
              { q: "Can I embed small images directly into HTML/CSS with Base64?", a: "Yes. Switch to 'File / Image to Base64', upload your image, and copy the Data URI to paste directly into <img src='...'> or CSS url(...) tags." },
              { q: "Is Base64 encryption?", a: "No! Base64 is an encoding method, not encryption. Anyone can decode a Base64 string instantly." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Dev Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/url-encode-decode", name: "URL Encode / Decode", desc: "Encode or decode URL query strings." },
              { href: "/tools/json-formatter", name: "JSON Formatter", desc: "Format and minify JSON data." },
              { href: "/tools/uuid-generator", name: "UUID Generator", desc: "Generate random UUID v4 identifiers." },
              { href: "/tools/password-generator", name: "Password Generator", desc: "Generate strong passwords." },
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
