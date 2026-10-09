import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, Cpu, ArrowRight, HeartHandshake, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - TheSwiftTools",
  description:
    "Learn about TheSwiftTools mission to deliver fast, private, zero-upload web utilities right inside your browser.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-14">
      {/* Hero Section */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-10 dark:border-zinc-800/80 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/80">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Our Mission &amp; Story
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Fast, Private Web Tools for{" "}
          <span className="heading-highlight">Everyone</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-normal">
          TheSwiftTools was created to replace slow, spammy online file converters with clean, instantaneous web utilities that run 100% on your own device.
        </p>
      </div>

      {/* Why We Built This */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
          Why Online File Tools Needed a Change
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <div className="p-7 rounded-2xl border border-zinc-200/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xs dark:border-zinc-800/80 space-y-3 shadow-2xs">
            <h3 className="font-bold text-zinc-950 dark:text-zinc-50 text-lg sm:text-xl">
              The Old Way: Privacy Risk &amp; Delays
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traditional online converters force you to upload confidential documents, contracts, photos, and recordings to remote cloud servers. You wait for files to upload, wait in server conversion queues, and hope that your personal data is not stored or shared.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/30 backdrop-blur-xs space-y-3 shadow-2xs">
            <h3 className="font-bold text-emerald-950 dark:text-emerald-200 text-lg sm:text-xl">
              The SwiftTools Way: 100% Local
            </h3>
            <p className="text-sm sm:text-base text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
              Modern web browsers are capable of remarkable computing power. We engineered our utilities to run locally in your browser memory. Your files are processed on your device and <strong className="font-bold text-emerald-950 dark:text-emerald-100">never leave your computer</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
          Our Three Guiding Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-xs shadow-2xs space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Privacy by Default
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No files are ever sent across the network. Disconnect your internet connection after loading our tools, and they will still work.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-xs shadow-2xs space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Instant Processing
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero network lag or server queue bottlenecks. Conversions start the instant you select your file.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-xs shadow-2xs space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Free &amp; Respectful
            </h3>
            <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No invasive advertising banners, no forced sign-ups, and no paywalls hiding your converted files.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 text-center text-white shadow-xl space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Ready to experience faster, safer web tools?
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Try our Word to PDF converter or explore our full suite of fast, in-browser utilities today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <Link
            href="/tools/word-to-pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-md cursor-pointer"
          >
            <span>Try Word to PDF</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/90 px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <span>Browse All Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
