import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/json-formatter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online Free — Beautify & Minify JSON | TheSwiftTools",
  description: "Format, validate, beautify, and minify JSON data online for free. Real-time syntax validation, customizable indentation (2 or 4 spaces), and file export.",
};

export default function JsonFormatterPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">JSON Formatter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          JSON Formatter & Validator Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Clean up messy, unformatted JSON strings into human-readable indented format or compress JSON payloads for production API responses. Detect syntax errors in real time.
        </p>
      </div>

      <JsonFormatterTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Use a JSON Formatter?</h2>
          <p>
            JSON (JavaScript Object Notation) is the ubiquitous standard data format for REST APIs, configuration files, and database schemas. However, compacted API payloads and webhooks often arrive as a single unreadable wall of text.
          </p>
          <p>
            Our in-browser formatter inspects the JSON tree, highlights syntax syntax issues such as missing commas or unescaped quotes, and neatly nests keys with standard 2-space or 4-space indentation.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is it safe to paste confidential API keys or user data?", a: "Yes. Unlike cloud formatters that log payloads, this tool operates strictly within your local browser's JavaScript environment. Zero requests leave your computer." },
              { q: "What is JSON Minification?", a: "Minification strips all unnecessary whitespace, indentations, and newlines to produce the smallest possible byte payload, reducing network transfer size for high-throughput APIs." },
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
              { href: "/tools/base64-tool", name: "Base64 Encoder / Decoder", desc: "Encode or decode Base64 data." },
              { href: "/tools/url-encode-decode", name: "URL Encode / Decode", desc: "Safely encode URL queries." },
              { href: "/tools/uuid-generator", name: "UUID Generator", desc: "Generate UUID v4 identifiers." },
              { href: "/tools/qr-code-generator", name: "QR Code Generator", desc: "Generate instant QR codes." },
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
