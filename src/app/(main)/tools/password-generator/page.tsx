import type { Metadata } from "next";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Password Generator Online Free — Strong, Secure & Random Passwords | TheSwiftTools",
  description: "Generate strong, secure, and random passwords online for free. Customize length, uppercase, numbers, symbols, and avoid ambiguous characters. 100% private.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=text" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Text & Dev Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Password Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Password Generator — <span className="heading-highlight">Strong & Random Passwords</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Create uncrackable passwords using cryptographically secure hardware randomness. Customize character sets, evaluate entropy bits, and copy with one click.
        </p>
      </div>

      <PasswordGeneratorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Use a Strong Random Password?</h2>
          <p>
            Credential stuffing and dictionary brute-force attacks crack common passwords in seconds. Reusing passwords across multiple websites means a breach on a single forum compromises your email, banking, and cloud storage accounts.
          </p>
          <p>
            A 16-character random password containing uppercase letters, lowercase letters, numbers, and symbols provides over 100 bits of cryptographic entropy — requiring millions of years for modern supercomputers to guess.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is it safe to generate passwords in the browser?", a: "Yes! Passwords are generated exclusively on your local device using the browser's crypto.getRandomValues API. No password data is ever sent across the network or logged." },
              { q: "What is the recommended password length?", a: "Security standards recommend at least 14 to 16 characters for critical accounts such as primary email, password managers, and banking portals." },
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
              { href: "/tools/uuid-generator", name: "UUID Generator", desc: "Generate random UUID v4 identifiers." },
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
