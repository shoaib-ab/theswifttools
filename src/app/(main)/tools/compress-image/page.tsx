import type { Metadata } from "next";
import { CompressImageTool } from "@/components/tools/compress-image";
import { TrustCtaCards } from "@/components/tools/trust-cta-cards";
import Link from "next/link";
import {
  Zap,
  Shield,
  Sliders,
  Download,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compress Image Online Free — Reduce JPG, PNG, WebP Size | TheSwiftTools",
  description:
    "Compress JPG, PNG, and WebP images online for free. Adjust quality with a slider and see the exact before/after file size. No uploads — runs 100% in your browser.",
};

export default function CompressImagePage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-6xl w-full mx-auto space-y-12">
      {/* Tool Header & Breadcrumb */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Image Tools
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">Compress Image</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Compress Image Online <span className="heading-highlight">Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed font-normal">
          Reduce the file size of JPG, PNG, and WebP images with instant before/after preview. Runs 100% in your browser memory.
        </p>
      </div>

      {/* 2-Column Content Section: Tool on left, Trust CTAs on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <CompressImageTool />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Guaranteed Execution
            </h3>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              RAM ONLY
            </span>
          </div>
          <TrustCtaCards />
        </div>
      </div>

      {/* 4-Step Visual Workflow */}
      <section aria-labelledby="workflow-heading" className="space-y-6 pt-6">
        <h2 id="workflow-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          How to Compress Images in 4 Easy Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Select or Drop",
              desc: "Choose JPG, PNG, or WebP files straight from your device.",
            },
            {
              step: "02",
              title: "Adjust Quality",
              desc: "Use the slider or quick presets (60%, 80%, 92%) to balance size and clarity.",
            },
            {
              step: "03",
              title: "Inspect Preview",
              desc: "Compare original and compressed sizes in real time with side-by-side view.",
            },
            {
              step: "04",
              title: "Save Instantly",
              desc: "Download your compressed image directly with zero server queues.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2 relative"
            >
              <span className="text-2xl font-black font-mono text-red-600 dark:text-red-400">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Compress Images? (2 Core Benefit Cards) */}
      <section aria-labelledby="benefits-heading" className="space-y-6 pt-4">
        <h2 id="benefits-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          Why Compress Your Images?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-2xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200/80 dark:border-red-900/60 flex items-center justify-center text-red-600 dark:text-red-400">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Faster Web Speeds &amp; Better SEO
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              Oversized photos are the primary reason websites load slowly. Compressing down to 80% quality drops 50%–75% of bytes with no perceivable visual loss, boosting Google Core Web Vitals scores.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 shadow-2xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Absolute In-Browser Confidentiality
            </h3>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              Unlike cloud services that upload your personal or corporate photos to external remote servers, our HTML5 Canvas engine processes your images directly in your computer memory.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faq-heading" className="space-y-6 pt-4">
        <h2 id="faq-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {[
            {
              q: "What quality setting should I choose for web photos?",
              a: "75% to 85% is the universal sweet spot for web photography. At 80%, files typically shrink by 50% to 70% while remaining visually identical to the naked eye.",
            },
            {
              q: "Does compressing a PNG image also reduce its size?",
              a: "Yes. PNG files are transcoded through our canvas engine to strip unnecessary metadata and optimize color compression while preserving sharp boundaries.",
            },
            {
              q: "Are my photos uploaded to external servers?",
              a: "No. All compression operations run locally inside your browser memory using Web APIs. Zero bytes are transferred to external cloud systems.",
            },
            {
              q: "Is there a limit on file size or number of images?",
              a: "No artificial limits. Because processing uses your own device's hardware, you can compress as many files as you like with zero subscriptions or quotas.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2"
            >
              <dt className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">
                {q}
              </dt>
              <dd className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related Image Tools */}
      <section aria-labelledby="related-tools-heading" className="space-y-5 pt-4 pb-12">
        <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          Related Image Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              href: "/tools/image-resizer",
              name: "Image Resizer",
              desc: "Resize image dimensions by exact pixels or percentage scale.",
            },
            {
              href: "/tools/crop-image",
              name: "Crop Image",
              desc: "Visual aspect-ratio cropping for social media and passports.",
            },
            {
              href: "/tools/png-to-webp",
              name: "PNG to WebP Converter",
              desc: "Convert PNG images into lightweight next-gen WebP format.",
            },
            {
              href: "/tools/image-to-pdf",
              name: "Image to PDF",
              desc: "Combine multiple photos into a single professional PDF document.",
            },
          ].map(({ href, name, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200/90 bg-white p-5 dark:border-zinc-800/90 dark:bg-zinc-900/50 hover:border-red-500 dark:hover:border-red-500 shadow-2xs hover:shadow-md transition-all"
            >
              <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center justify-between">
                {name}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">
                {desc}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
