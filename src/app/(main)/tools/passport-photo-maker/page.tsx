import type { Metadata } from "next";
import { PassportPhotoMakerTool } from "@/components/tools/passport-photo-maker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Passport Photo Maker Online Free — US 2x2, UK, EU, CNIC Sizes | TheSwiftTools",
  description: "Create standard passport photos online for free. Official presets for US (2x2 inch), UK/Schengen (35x45mm), Pakistan CNIC, India. Print 4x6 sheet, adjust background and face guides.",
};

export default function PassportPhotoMakerPage() {
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
            <Link href="/?cat=images" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Image Tools</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-zinc-900 dark:text-zinc-100 font-bold" aria-current="page">Passport Photo Maker</li>
        </ol>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Passport Photo Maker <span className="heading-highlight">Online Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Generate compliant biometric passport, visa, and ID photos from your phone or webcam portrait. Align using official head height guidelines and download single photos or printable 4×6 inch multi-packs.
        </p>
      </nav>

      {/* Main Tool Workbench */}
      <section aria-label="Passport Photo Maker Workspace">
        <PassportPhotoMakerTool />
      </section>

      {/* SEO & Guide Section */}
      <div className="space-y-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <section aria-labelledby="requirements-title" className="space-y-4">
          <h2 id="requirements-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Standard Passport Photo Requirements
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            Most government passport authorities require portrait photos taken within the last 6 months that meet strict biometric standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">United States (2×2 Inches)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">51 × 51 mm, head between 25–35 mm from chin to crown, plain white or off-white background.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">UK &amp; Schengen Europe (35×45 mm)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Head height between 29 mm and 34 mm (70-80% of photo area), light grey or plain cream background.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Pakistan CNIC &amp; India OCI</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">35 × 45 mm or 2 × 2 inches depending on whether applying for CNIC, Machine Readable Passport, or OCI.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Expression &amp; Lighting</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Neutral facial expression, mouth closed, eyes open looking directly at camera with even, shadow-free lighting.</p>
            </div>
          </div>
        </section>

        {/* How-To Guide */}
        <section aria-labelledby="how-to-title" className="space-y-4">
          <h2 id="how-to-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Make a Passport Photo at Home
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">1</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Take a Well-Lit Photo</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Stand against a plain wall in natural daylight with your camera at eye level.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">2</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Upload &amp; Select Country</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose your country specification preset (US 2x2, UK 35x45mm, etc.).</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">3</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Align Face in Guide</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Use scale and drag to position chin and crown within the official biometric oval.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">4</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Download Photo or Sheet</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Export a single photo or a 4×6 inch grid (6 photos) for cheap printing at photo kiosks.</p>
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
            {[
              { q: "Can I print the 4x6 inch sheet at CVS, Walgreens, or Walmart?", a: "Yes! Printing a 4x6 photo costs just a few cents at any standard photo kiosk, giving you 6 compliant passport photos for pennies instead of paying $15+ for photo studio fees." },
              { q: "Does the tool remove the background?", a: "The tool lets you select clean background colors (white, off-white, light blue) and adjust canvas background. For best results, take the photo against a plain, well-lit wall." },
              { q: "Are glasses allowed in US passport photos?", a: "No. The US State Department prohibits eyeglasses in passport photos unless you have a signed medical certificate." },
              { q: "Is this tool free?", a: "Yes, 100% free with unlimited generation and no watermarks." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                <dt className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{q}</dt>
                <dd className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related Tools */}
        <section aria-labelledby="related-tools-title" className="space-y-4">
          <h2 id="related-tools-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Related Image Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce photo file size for online visa portals." },
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Resize dimensions in pixels or percentage." },
              { href: "/tools/crop-image", name: "Crop Image", desc: "Crop photos to custom aspect ratios." },
              { href: "/tools/image-to-pdf", name: "Image to PDF", desc: "Combine photos and documents into a clean PDF." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="group flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 hover:border-red-500 hover:shadow-md transition-all">
                <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-normal">{desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
