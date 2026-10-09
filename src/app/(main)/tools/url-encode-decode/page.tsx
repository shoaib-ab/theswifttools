import type { Metadata } from "next";
import { UrlEncodeDecodeTool } from "@/components/tools/url-encode-decode";
import Link from "next/link";

export const metadata: Metadata = {
  title: "URL Encode & Decode Online Free — Percent-Encoding Converter | TheSwiftTools",
  description: "Encode or decode URLs, percent-encoded query parameters, and web addresses online for free. Supports both encodeURI and encodeURIComponent safely in browser.",
};

export default function UrlEncodeDecodePage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">URL Encode / Decode</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          URL Encode & Decode Online — <span className="heading-highlight">Free & Instant</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert special characters, spaces, and reserved symbols into standard RFC 3986 percent-encoded strings for query parameters, or decode percent sequences back into plain text.
        </p>
      </div>

      <UrlEncodeDecodeTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why is URL Encoding Necessary?</h2>
          <p>
            URLs are restricted to a limited set of ASCII characters. Characters such as spaces, question marks (?), ampersands (&amp;), slashes (/), and non-English alphabets must be represented using percent-encoding (such as <code>%20</code> for spaces) to prevent web servers from misinterpreting URLs.
          </p>
          <p>
            Our tool allows choosing between <strong>encodeURIComponent</strong> (which encodes all delimiters so strings can be safely passed inside URL query values) and <strong>encodeURI</strong> (which preserves primary protocol markers like http://).
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is %20 versus + in URL encoding?", a: "%20 is the official RFC standard encoding for a space character in URL paths and parameters. The '+' symbol is historically used in application/x-www-form-urlencoded forms." },
              { q: "Can I decode entire web addresses?", a: "Yes, select 'Decode URL' and paste the full address to restore human-readable letters and accents." },
              { q: "Is any data uploaded?", a: "No. All conversions happen entirely in your web browser." },
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
              { href: "/tools/json-formatter", name: "JSON Formatter", desc: "Format, validate and minify JSON." },
              { href: "/tools/slug-generator", name: "Slug Generator", desc: "Create SEO-friendly URL slugs." },
              { href: "/tools/uuid-generator", name: "UUID Generator", desc: "Generate random UUID v4 identifiers." },
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
