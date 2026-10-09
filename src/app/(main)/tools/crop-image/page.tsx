import type { Metadata } from "next";
import { CropImageTool } from "@/components/tools/crop-image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crop Image Online Free — Custom & Fixed Aspect Ratios | TheSwiftTools",
  description: "Crop photos online for free. Custom freeform crop or standard aspect ratios: 1:1 square, 16:9, 4:3, 9:16 story. Rotate and export high-resolution images instantly.",
};

export default function CropImagePage() {
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
          <li className="text-zinc-900 dark:text-zinc-100 font-bold" aria-current="page">Crop Image</li>
        </ol>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Crop Image <span className="heading-highlight">Online Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Trim borders, center subjects, or crop pictures for Instagram, YouTube, and LinkedIn with freeform selection or precise aspect ratio presets. 100% private in-browser tool.
        </p>
      </nav>

      {/* Main Tool Workbench */}
      <section aria-label="Image Cropping Workspace">
        <CropImageTool />
      </section>

      {/* SEO & Guide Section */}
      <div className="space-y-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <section aria-labelledby="why-crop-title" className="space-y-4">
          <h2 id="why-crop-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Why Crop Your Images?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            Cropping removes unnecessary background clutter, emphasizes the main subject, and reframes composition using Rule of Thirds alignment for professional-grade photography.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">1:1 Square (Instagram & Profiles)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Best for Instagram square feed posts, profile avatars, and eCommerce store product grids.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">16:9 Widescreen (YouTube & Headers)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Ideal for YouTube video thumbnails, website banner headers, and slide presentations.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">9:16 Vertical (Stories & Reels)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Tailored for full-screen smartphone experiences: Instagram Stories, TikTok, and YouTube Shorts.</p>
            </div>
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">4:3 Standard (Photography & Prints)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Classic photo print ratio, digital photo frames, and desktop wallpapers.</p>
            </div>
          </div>
        </section>

        {/* How-To Guide */}
        <section aria-labelledby="how-to-title" className="space-y-4">
          <h2 id="how-to-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Crop an Image Online
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">1</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Upload Your Image</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Drag and drop any JPG, PNG, or WebP photo into the workspace.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">2</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Choose an Aspect Ratio</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Pick Freeform or lock presets like 1:1, 16:9, or 9:16.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">3</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Adjust and Rotate</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Reposition the crop area, resize with handles, or rotate if necessary.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">4</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Download Cropped Image</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Click &ldquo;Crop &amp; Download Image&rdquo; to save full-resolution output.</p>
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
              { q: "Does cropping reduce image sharpness?", a: "No. Cropping only cuts away unwanted outer pixels; the remaining image area retains its full original pixel resolution without loss of clarity." },
              { q: "Can I rotate the image while cropping?", a: "Yes, use the rotation buttons (-90° / +90°) to orient photos correctly before framing your crop." },
              { q: "Is this tool private?", a: "100% private. All processing occurs locally via client-side canvas, without sending files over the network." },
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
              { href: "/tools/image-resizer", name: "Image Resizer", desc: "Scale dimensions in pixels or exact percentage." },
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce image file sizes with real-time quality slider." },
              { href: "/tools/passport-photo-maker", name: "Passport Photo Maker", desc: "Create standardized biometric passport photos." },
              { href: "/tools/jpg-to-png", name: "JPG to PNG Converter", desc: "Convert JPG to transparent PNG format." },
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
