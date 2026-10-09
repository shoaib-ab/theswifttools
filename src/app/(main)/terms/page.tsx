import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - TheSwiftTools",
  description: "Read the Terms of Service governing your use of TheSwiftTools and our client-side utilities.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "September 25, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/80">
          <Scale className="h-4 w-4 text-red-600" />
          Legal Agreement
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Terms of <span className="heading-highlight">Service</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Highlights Box */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white/70 dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xs dark:border-zinc-800/90 shadow-2xs space-y-5">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
          Terms in Plain English
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              100% Your Content
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You retain complete ownership of all documents, audio, and images you process using our tools.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Free &amp; Open Access
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No subscriptions, hidden costs, or forced registrations for standard client-side usage.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Fair &amp; Responsible
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Do not use the platform to distribute malicious software or attempt to disrupt site availability.
            </p>
          </div>
        </div>
      </div>

      {/* Terms Body */}
      <div className="space-y-12 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TheSwiftTools (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our utilities.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            2. Description of the Service
          </h2>
          <p>
            TheSwiftTools provides browser-based utilities including document converters, audio transcoding, image compression, calculators, and developer formatters. All core conversion operations are performed entirely on the client side using your web browser&apos;s computational resources without uploading files to our servers.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            3. Intellectual Property and Content Ownership
          </h2>
          <p>
            <strong className="text-zinc-950 dark:text-zinc-100 font-bold">Your Files:</strong> We claim no intellectual property rights or ownership over any documents, audio recordings, images, or data you process through our tools. Your files remain your exclusive property.
          </p>
          <p>
            <strong className="text-zinc-950 dark:text-zinc-100 font-bold">Our Platform:</strong> The visual interface, branding, code, documentation, and design of TheSwiftTools are protected by copyright and intellectual property laws. You may not copy, reverse-engineer, or reproduce the platform without prior written consent.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            4. Permitted and Prohibited Uses
          </h2>
          <p>
            You agree to use TheSwiftTools only for lawful purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 pl-1">
            <li>Process content that violates third-party intellectual property rights or applicable local, state, or international laws.</li>
            <li>Attempt to interfere with, compromise, or degrade the integrity or availability of the website infrastructure.</li>
            <li>Use automated scrapers, bots, or malicious scripts to overload our services.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            5. Disclaimer of Warranties
          </h2>
          <p>
            The service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. While we strive to ensure that our tools produce high-accuracy conversion outputs, we do not warrant that output files will always be error-free or perfectly preserve complex third-party proprietary file formats.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, TheSwiftTools and its operators shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use our tools, including but not limited to loss of data or document corruption.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            7. Contact Information
          </h2>
          <p>
            If you have questions regarding these Terms of Service, please reach out via our{" "}
            <Link
              href="/contact"
              className="text-red-600 dark:text-red-400 font-bold underline underline-offset-4 hover:text-red-700 dark:hover:text-red-300"
            >
              Contact Page
            </Link>{" "}
            or email us directly at <strong className="text-zinc-950 dark:text-zinc-50">legal@theswifttools.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
