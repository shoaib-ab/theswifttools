import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - TheSwiftTools",
  description: "Learn how TheSwiftTools protects your privacy with 100% in-browser processing and zero file uploads.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 25, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
          <ShieldCheck className="h-4 w-4" />
          Privacy First Architecture
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Privacy <span className="heading-highlight">Policy</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white/70 dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xs dark:border-zinc-800/90 shadow-2xs space-y-5">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
          The SwiftTools Privacy Guarantee
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Zero File Uploads
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your documents and files are never transferred to our servers. All work happens inside your browser RAM.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              No Data Retention
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We have no database of your files, documents, or content. Closing the browser tab completely clears memory.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              No Ad Tracking
            </div>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We do not track your browsing habits across the web or sell personal data to third-party brokers.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Content */}
      <div className="space-y-12 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            1. Core Principle: 100% In-Browser Execution
          </h2>
          <p>
            At TheSwiftTools, your privacy is the cornerstone of how our tools are engineered. Unlike conventional online conversion services that require you to upload confidential documents to remote cloud servers, our utilities run <strong className="text-zinc-950 dark:text-zinc-100 font-bold">entirely on your local device</strong> using standard web browser technologies.
          </p>
          <p>
            When you select or drop a file into any of our tools (such as our Word to PDF converter or image compressors), the file is read directly into your device&apos;s local memory. The conversion code executes locally on your hardware. At no point does the content of your files cross the network to our servers or any third-party infrastructure.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            2. Information We Do Not Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 pl-1">
            <li>We do <strong className="text-zinc-950 dark:text-zinc-100">not</strong> collect or store the files, images, or documents you convert.</li>
            <li>We do <strong className="text-zinc-950 dark:text-zinc-100">not</strong> extract text, metadata, or media information from your files.</li>
            <li>We do <strong className="text-zinc-950 dark:text-zinc-100">not</strong> require user registration, passwords, or personal accounts to use our tools.</li>
            <li>We do <strong className="text-zinc-950 dark:text-zinc-100">not</strong> collect payment card information. All core tools are completely free.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            3. Information We May Process
          </h2>
          <p>
            To deliver a reliable website experience, we process limited, non-identifying operational information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 pl-1">
            <li><strong className="text-zinc-950 dark:text-zinc-100">Theme Preference:</strong> If you toggle between Light and Dark mode, your preference is saved locally on your device via standard browser storage (<code className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">localStorage</code>) so the site remembers your preferred appearance on your next visit.</li>
            <li><strong className="text-zinc-950 dark:text-zinc-100">Tool Launch Notifications:</strong> If you explicitly submit your email address on a &ldquo;Coming Soon&rdquo; tool page to be alerted upon release, we use that address solely to notify you when that tool is activated. We will never sell, rent, or spam your inbox.</li>
            <li><strong className="text-zinc-950 dark:text-zinc-100">Basic Web Server Logs:</strong> Standard technical request logs (IP address, browser user-agent) may be recorded by our hosting infrastructure strictly for security monitoring and preventing denial-of-service attacks.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            4. Cookies and Local Storage
          </h2>
          <p>
            TheSwiftTools does not use intrusive tracking cookies or cross-site tracking beacons. We only use browser <code className="font-mono text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">localStorage</code> to remember functional preferences like your theme (light/dark mode) and local notification bookmarks. You can clear this storage at any time through your browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            5. Third-Party Links
          </h2>
          <p>
            Our website may occasionally contain links to third-party resources or open-source documentation. We are not responsible for the privacy practices or content of external websites. We encourage you to read the privacy statements of any third-party sites you visit.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            6. Changes to This Policy
          </h2>
          <p>
            We may update our Privacy Policy periodically to reflect changes in our tools or legal requirements. Any modifications will be posted directly to this page with an updated &ldquo;Last updated&rdquo; timestamp.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3.5">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
            7. Contact Us
          </h2>
          <p>
            If you have any questions, suggestions, or concerns regarding our privacy practices, please contact us through our{" "}
            <Link
              href="/contact"
              className="text-red-600 dark:text-red-400 font-bold underline underline-offset-4 hover:text-red-700 dark:hover:text-red-300"
            >
              Contact Page
            </Link>{" "}
            or email us directly at <strong className="text-zinc-950 dark:text-zinc-50">privacy@theswifttools.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
