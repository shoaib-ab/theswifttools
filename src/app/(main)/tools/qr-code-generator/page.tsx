import type { Metadata } from "next";
import { QrCodeGeneratorTool } from "@/components/tools/qr-code-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QR Code Generator Online Free — Custom High-Res QR Codes | TheSwiftTools",
  description: "Create custom QR codes online for free. Enter URLs, text, or links, customize foreground and background colors, adjust error correction, and download high-resolution PNGs.",
};

export default function QrCodeGeneratorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">QR Code Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          QR Code Generator — <span className="heading-highlight">Free & High Resolution</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Generate clean, scannable QR codes for websites, restaurant menus, business cards, and WiFi connections. Customize brand colors and download high-resolution PNG files instantly.
        </p>
      </div>

      <QrCodeGeneratorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Use High Error-Correction QR Codes?</h2>
          <p>
            Quick Response (QR) codes feature built-in Reed-Solomon error correction algorithms. Setting the error correction level to High (Level H) allows the QR code to be scanned accurately even if up to 30% of the surface area is scratched, covered by a center brand logo, or wrinkled on print material.
          </p>
          <p>
            For digital screens, Medium (Level M) is standard. For physical outdoor posters and merchandise packaging, Quartile (Q) or High (H) is recommended.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do these QR codes ever expire?", a: "No! These are static QR codes that directly encode the underlying link or text into the matrix dots. They will work indefinitely with no monthly fees or expiration dates." },
              { q: "Can I use custom brand colors?", a: "Yes, use the color pickers to customize foreground and background colors. Always ensure high contrast between dark dots and light background for reliable scanner recognition." },
              { q: "Are scans tracked?", a: "No. The Swift Tools does not redirect or track scans. Your QR codes point directly to the destination you provide." },
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
              { href: "/tools/base64-tool", name: "Base64 Encoder / Decoder", desc: "Encode or decode Base64 data." },
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
