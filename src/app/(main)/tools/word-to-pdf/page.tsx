import type { Metadata } from "next";
import Link from "next/link";
import { WordToPdfConverter } from "@/components/tools/word-to-pdf-converter";
import { ShieldCheck, Zap, Lock, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Word to PDF Converter - Free & Private | TheSwiftTools",
  description:
    "Convert Word (.docx) to PDF format directly in your browser. 100% free, private, and no files uploaded.",
};

export default function WordToPdfPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      {/* Header & Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="space-y-3 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <ol className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          <li>
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/?cat=documents" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Documents</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-900 dark:text-zinc-100 font-bold" aria-current="page">Word to PDF</li>
        </ol>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Word to PDF Converter <span className="heading-highlight">Online Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Convert Microsoft Word (.docx) files into clean, shareable PDFs in seconds. 
          Fast, completely private, and files never leave your device.
        </p>
      </nav>

      {/* Main Interactive Tool Zone */}
      <section aria-label="Word to PDF Converter Workspace">
        <WordToPdfConverter />
      </section>

      {/* Helpful Info Section */}
      <div className="space-y-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        {/* Simple benefits */}
        <section aria-labelledby="benefits-title" className="space-y-4">
          <h2 id="benefits-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Why Use TheSwiftTools Word to PDF Converter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <ShieldCheck className="h-7 w-7 text-emerald-600 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">100% Client-Side Privacy</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Your confidential documents stay entirely inside your computer. Nothing is ever sent to or stored on cloud servers.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <Zap className="h-7 w-7 text-red-600 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Instant Local Processing</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                No waiting in upload queues or dealing with file upload limits. Conversion starts immediately upon drop.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <FileCheck className="h-7 w-7 text-blue-600 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Universal Compatibility</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                Generates standardized PDF files ready for printing, email distribution, legal archiving, or resume submission.
              </p>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section aria-labelledby="how-to-title" className="space-y-4">
          <h2 id="how-to-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Convert Word to PDF
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">1</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Select File</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Drag &amp; drop your <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">.docx</code> file into the upload area.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">2</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Local Conversion</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Your document is parsed and rendered into PDF format inside your browser.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">3</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Download PDF</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Preview the generated document and click &ldquo;Download Converted PDF&rdquo;.</p>
              </div>
            </li>
          </ol>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-title" className="space-y-4">
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <dt className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Are my documents private?
              </dt>
              <dd className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, completely. Everything runs locally in your web browser. Your files are never sent over the internet or saved to any external server.
              </dd>
            </div>

            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
              <dt className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Is this tool free to use?
              </dt>
              <dd className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Yes, it is 100% free with no sign-ups, subscriptions, or watermarks.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
