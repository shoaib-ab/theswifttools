"use client";

import Link from "next/link";
import {
  Zap,
  Shield,
  Sparkles,
  Lock,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative z-40 w-full">
      {/* Top Value / Trust Highlights Strip (Zero lines, clean grid above footer) */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {/* Card 1: Privacy */}
            <div className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-200/40 dark:shadow-black/50 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/70 hover:-translate-y-1 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:border-red-200/80 dark:group-hover:border-red-900/60 transition-all duration-200 mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                100% In-Browser Privacy
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Zero files uploaded to any server. All processing runs entirely inside local device RAM.
              </p>
            </div>

            {/* Card 2: Client Execution */}
            <div className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-200/40 dark:shadow-black/50 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/70 hover:-translate-y-1 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:border-red-200/80 dark:group-hover:border-red-900/60 transition-all duration-200 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Instant Client Execution
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Wasm &amp; HTML5 Canvas engine eliminates file upload waits and server queues.
              </p>
            </div>

            {/* Card 3: Free & Unrestricted */}
            <div className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-200/40 dark:shadow-black/50 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/70 hover:-translate-y-1 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:border-red-200/80 dark:group-hover:border-red-900/60 transition-all duration-200 mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Free &amp; Unrestricted
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                No subscriptions, registration walls, watermarks, or artificial restrictions.
              </p>
            </div>

            {/* Card 4: Zero Tracking */}
            <div className="group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-200/40 dark:shadow-black/50 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/70 hover:-translate-y-1 transition-all duration-300">
              <div className="h-11 w-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200 group-hover:bg-red-50 dark:group-hover:bg-red-950/40 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:border-red-200/80 dark:group-hover:border-red-900/60 transition-all duration-200 mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                Zero Data Tracking
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                Compliant with strict corporate privacy. No analytics cookies or ad telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Island Footer Section (Max-width, White/Red gradient, Box shadow, Bottom spacing) */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 text-zinc-600 dark:text-zinc-400">
        <div className="mx-auto max-w-7xl rounded-3xl sm:rounded-[2rem] border border-red-100/90 dark:border-zinc-800 bg-gradient-to-b from-white via-white to-red-50/35 dark:from-zinc-900/95 dark:via-zinc-900/95 dark:to-red-950/20 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12">
            {/* Brand & Security Column */}
            <div className="lg:col-span-2 space-y-5">
              <Link
                href="/"
                className="flex items-center gap-2.5 text-zinc-950 dark:text-zinc-50 group w-fit"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5 fill-current" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-zinc-950 dark:text-zinc-50">
                  TheSwiftTools
                </span>
              </Link>

              <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed font-normal">
                High-performance in-browser utility suite engineered for developers, designers, and students. Every tool runs 100% locally in your browser memory for peak speed and privacy.
              </p>

              {/* Live Operational Status (Clean, subtle, non-AI styling) */}
              <div className="flex items-center gap-2.5 pt-1">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80">
                  <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  44 Tools Operational &bull; 100% Client-Side
                </span>
              </div>
            </div>

            {/* PDF & Document Suite */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-950 dark:text-zinc-100 text-sm uppercase tracking-wider">
                PDF &amp; Documents
              </h3>
              <ul className="space-y-2.5 text-[15px]">
                {[
                  { name: "Word to PDF", href: "/tools/word-to-pdf" },
                  { name: "Merge PDF", href: "/tools/merge-pdf" },
                  { name: "Split PDF", href: "/tools/split-pdf" },
                  { name: "Compress PDF", href: "/tools/compress-pdf" },
                  { name: "Rotate PDF", href: "/tools/rotate-pdf" },
                  { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
                  { name: "Image to PDF", href: "/tools/image-to-pdf" },
                ].map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Studio */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-950 dark:text-zinc-100 text-sm uppercase tracking-wider">
                Image Studio
              </h3>
              <ul className="space-y-2.5 text-[15px]">
                {[
                  { name: "Compress Image", href: "/tools/compress-image" },
                  { name: "Passport Photo Maker", href: "/tools/passport-photo-maker" },
                  { name: "Image Resizer", href: "/tools/image-resizer" },
                  { name: "Crop Image", href: "/tools/crop-image" },
                  { name: "JPG to PNG", href: "/tools/jpg-to-png" },
                  { name: "PNG to WebP", href: "/tools/png-to-webp" },
                  { name: "HEIC to JPG", href: "/tools/heic-to-jpg" },
                ].map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators & Legal */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-950 dark:text-zinc-100 text-sm uppercase tracking-wider">
                Calculators &amp; Trust
              </h3>
              <ul className="space-y-2.5 text-[15px]">
                {[
                  { name: "Salary Tax (FBR)", href: "/tools/salary-tax-calculator" },
                  { name: "EMI Loan Calculator", href: "/tools/emi-calculator" },
                  { name: "CGPA Calculator", href: "/tools/cgpa-calculator" },
                  { name: "JSON Formatter", href: "/tools/json-formatter" },
                  { name: "QR Code Generator", href: "/tools/qr-code-generator" },
                  { name: "Zero-Storage Policy", href: "/privacy" },
                  { name: "Architecture & Mission", href: "/about" },
                  { name: "Contact & Feedback", href: "/contact" },
                ].map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-red-100/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div>
              &copy; {currentYear} TheSwiftTools. Client-side local execution without tracking cookies.
            </div>
            <div className="flex items-center gap-6 font-medium">
              <Link
                href="/privacy"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/contact"
                className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
