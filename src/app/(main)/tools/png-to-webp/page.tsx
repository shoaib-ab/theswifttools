import type { Metadata } from "next";
import { ImageFormatConverter } from "@/components/tools/image-format-converter";
import { TrustCtaCards } from "@/components/tools/trust-cta-cards";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "PNG to WebP Converter Online Free — Fast & Lossless | TheSwiftTools",
  description: "Convert PNG images to modern WebP format for 30%+ smaller file sizes and faster page speeds while maintaining transparency. Free, private, client-side.",
};

export default function PngToWebpPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-6xl w-full mx-auto space-y-12">
      {/* Tool Header & Breadcrumb */}
      <div className="space-y-3 text-center sm:text-left border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
        >
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=images" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Image Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">PNG to WebP</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          PNG to WebP Converter <span className="heading-highlight">Online Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed font-normal">
          Convert PNG graphics to next-generation WebP format to reduce file sizes dramatically while keeping alpha transparency. Runs 100% inside your browser.
        </p>
      </div>

      {/* 2-Column Content Section: Tool on left, Trust CTAs on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <ImageFormatConverter
            fromFormat="PNG"
            toFormat="WebP"
            fromMime="image/png"
            toMime="image/webp"
            fromExt=".png"
            toExt="webp"
          />
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

      {/* 3-Step Visual Workflow */}
      <section aria-labelledby="workflow-heading" className="space-y-6 pt-6">
        <h2 id="workflow-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          How to Convert PNG to WebP in 3 Easy Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Select PNG File", desc: "Drag and drop or browse your PNG image from your device." },
            { step: "02", title: "Instant Conversion", desc: "Your browser transcodes the image to WebP format in local RAM." },
            { step: "03", title: "Download WebP", desc: "Save the lightweight WebP image directly with zero upload queues." },
          ].map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2"
            >
              <span className="text-2xl font-black font-mono text-red-600 dark:text-red-400">{item.step}</span>
              <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Switch from PNG to WebP? */}
      <section aria-labelledby="why-switch-heading" className="space-y-4 pt-4">
        <h2 id="why-switch-heading" className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
          Why Switch from PNG to WebP?
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <p>
            WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images. Compared to PNG, WebP lossless images are typically <strong className="text-zinc-950 dark:text-zinc-100 font-bold">26% smaller in size</strong>, and WebP lossy images are <strong className="text-zinc-950 dark:text-zinc-100 font-bold">25–34% smaller</strong> than comparable JPEG images.
          </p>
          <p>
            Critically, WebP fully supports 24-bit transparency (alpha channel) just like PNG, but at a fraction of the file size. Converting PNG icons, logos, and product graphics to WebP gives your website faster load speeds and better Google Core Web Vitals scores without losing visual clarity.
          </p>
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
              q: "Does WebP preserve PNG transparent backgrounds?",
              a: "Yes! WebP provides full alpha transparency support, making it an ideal drop-in replacement for transparent PNG assets on websites and mobile apps.",
            },
            {
              q: "Are WebP images supported by all browsers?",
              a: "Yes. All modern browsers including Chrome, Safari, Firefox, Edge, and mobile operating systems natively support WebP images.",
            },
            {
              q: "Is any data uploaded to a server?",
              a: "No. The entire conversion process occurs on your computer or phone using the client-side Canvas API. Your files remain completely private.",
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
            { href: "/tools/webp-to-jpg", name: "WebP to JPG Converter", desc: "Convert WebP images to universal JPG format." },
            { href: "/tools/jpg-to-webp", name: "JPG to WebP Converter", desc: "Convert standard JPG files to modern WebP." },
            { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce file sizes with precision slider." },
            { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
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
