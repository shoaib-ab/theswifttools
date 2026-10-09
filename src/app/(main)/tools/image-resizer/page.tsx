import type { Metadata } from "next";
import { ImageResizerTool } from "@/components/tools/image-resizer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Resizer Online Free — Resize by Pixels or Percentage | TheSwiftTools",
  description: "Resize images to exact dimensions in pixels or scale by percentage. Maintain aspect ratio, instant preview, and download. 100% private in browser.",
};

export default function ImageResizerPage() {
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
          <li className="text-zinc-900 dark:text-zinc-100 font-bold" aria-current="page">Image Resizer</li>
        </ol>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Image Resizer <span className="heading-highlight">Online Free</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Resize JPG, PNG, and WebP images to exact pixel dimensions or reduce/increase by percentage while preserving aspect ratio. Completely private with zero uploads.
        </p>
      </nav>

      {/* Main Tool Workbench */}
      <section aria-label="Image Resizer Workspace">
        <ImageResizerTool />
      </section>

      {/* SEO & Guide Section */}
      <div className="space-y-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <section aria-labelledby="why-resize-title" className="space-y-4">
          <h2 id="why-resize-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Why Resize Images Before Uploading?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            Modern cameras and smartphones shoot photos with dimensions often exceeding 4000x3000 pixels. For display on social media, blogs, or emails, dimensions rarely need to exceed 1200–1920 pixels. Uploading full-resolution photos wastes bandwidth, slows down web page rendering, and can exceed upload limits on forms and portals.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            With our browser-based image resizer, you can set precise width and height values while keeping aspect ratio locked so images never stretch or distort. You can also pick percentage scaling for quick batch downsizes like 50% or 25%.
          </p>
        </section>

        {/* How-To Guide */}
        <section aria-labelledby="how-to-title" className="space-y-4">
          <h2 id="how-to-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            How to Resize Your Image
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">1</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Upload Your Image</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Drag and drop any JPG, PNG, or WebP picture into the upload zone.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">2</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Select Resize Mode</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose &ldquo;By Pixels&rdquo; for fixed dimensions or &ldquo;By Percentage&rdquo; for quick scaling.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">3</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Set Dimensions</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter width or height. Keep &ldquo;Locked&rdquo; enabled to maintain aspect ratio automatically.</p>
              </div>
            </li>
            <li className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white font-bold text-base">4</span>
              <div>
                <strong className="text-base font-bold text-zinc-900 dark:text-zinc-100 block mb-1">Download Resized Image</strong>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Click &ldquo;Resize Image&rdquo; and immediately download your optimized picture.</p>
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
              { q: "Will resizing lower the quality of my image?", a: "Downscaling (reducing dimensions) actually concentrates pixel detail and sharpens the appearance on screen. Upscaling (enlarging beyond original dimensions) can cause blurriness as new pixels must be interpolated." },
              { q: "How do I maintain the image aspect ratio?", a: "By default, 'Lock Aspect Ratio' is enabled. When you change width, height automatically calculates proportionately, and vice versa." },
              { q: "Are my uploaded photos safe and confidential?", a: "Yes. Processing is completed locally in your web browser via client-side canvas technology. No images are sent to any remote server or stored in the cloud." },
              { q: "What formats can I resize?", a: "You can resize JPG, JPEG, PNG, WebP, and standard web image formats supported by modern browsers." },
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
              { href: "/tools/compress-image", name: "Compress Image", desc: "Reduce image file size with quality slider." },
              { href: "/tools/crop-image", name: "Crop Image", desc: "Crop photos to custom or standard aspect ratios." },
              { href: "/tools/passport-photo-maker", name: "Passport Photo Maker", desc: "Create standardized biometric passport photos." },
              { href: "/tools/jpg-to-png", name: "JPG to PNG Converter", desc: "Convert JPG to PNG format with transparency." },
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
