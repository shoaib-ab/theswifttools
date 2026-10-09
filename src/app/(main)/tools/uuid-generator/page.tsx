import type { Metadata } from "next";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UUID Generator Online Free — Cryptographically Secure UUID v4 | TheSwiftTools",
  description: "Generate cryptographically secure random UUID v4 identifiers online for free. Bulk generate up to 50 UUIDs at once with customizable casing and hyphens.",
};

export default function UuidGeneratorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">UUID Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          UUID Generator Online — <span className="heading-highlight">Secure UUID v4</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Generate RFC 4122 compliant version 4 Universally Unique Identifiers (UUIDs) using your browser&apos;s cryptographically secure pseudo-random number generator (CSPRNG).
        </p>
      </div>

      <UuidGeneratorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What is a UUID Version 4?</h2>
          <p>
            A UUID (Universally Unique Identifier) or GUID (Globally Unique Identifier) is a 128-bit value used to uniquely identify database primary keys, session tokens, and distributed computing transactions without centralized coordination.
          </p>
          <p>
            Version 4 UUIDs are randomly generated. Out of 128 bits, 122 bits are entirely random, resulting in 2<sup>122</sup> (or roughly 5.3 × 10<sup>36</sup>) unique possibilities. The probability of generating a duplicate collision is so infinitesimally small that it is practically zero.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this cryptographically random?", a: "Yes. Identifiers are generated using Web Crypto API's window.crypto.randomUUID() method, ensuring high-entropy entropy generation." },
              { q: "Can I generate bulk batches?", a: "Yes, use the quantity slider to generate up to 50 UUIDs simultaneously, with one-click copy to clipboard." },
              { q: "What is the difference between UUID and GUID?", a: "They are essentially the same standard; 'GUID' is Microsoft's terminology, while 'UUID' is the official RFC 4122 / ISO specification." },
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
              { href: "/tools/password-generator", name: "Password Generator", desc: "Generate strong secure passwords." },
              { href: "/tools/base64-tool", name: "Base64 Encoder / Decoder", desc: "Encode or decode Base64 data." },
              { href: "/tools/qr-code-generator", name: "QR Code Generator", desc: "Generate downloadable QR codes." },
              { href: "/tools/slug-generator", name: "Slug Generator", desc: "Create clean URL slugs." },
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
