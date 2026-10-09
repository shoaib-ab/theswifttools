import type { Metadata } from "next";
import { GradientGeneratorTool } from "@/components/tools/gradient-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSS Gradient Generator Online — Free Linear & Radial | TheSwiftTools",
  description:
    "Create beautiful CSS linear and radial gradients with unlimited color stops, live preview, angle control, and one-click copy. Download your gradient as a PNG image. Free, no signup.",
};

export default function GradientGeneratorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Gradient Generator</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          CSS Gradient Generator — Linear & Radial Gradients Online
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Build stunning CSS gradients with unlimited color stops, real-time preview, angle control, and instant one-click copy or PNG download.
        </p>
      </div>

      <GradientGeneratorTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="what-is-gradient-heading" className="space-y-4">
          <h2 id="what-is-gradient-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            What Is a CSS Gradient?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            CSS gradients allow you to create smooth transitions between two or more colors without using a raster image. They are defined entirely in CSS code, which means they scale perfectly at any resolution and require zero HTTP requests — making them a performance-friendly choice for web design.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Linear Gradients</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Transitions colors along a straight line at a specified degree angle. Perfect for modern hero sections, buttons, and subtle surfaces.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Radial Gradients</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Radiates outward from a center coordinate in circular patterns. Ideal for spotlights, glow effects, and decorative accents.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Use the Gradient Generator
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Choose Linear or Radial</strong> using the gradient type toggle.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Set the angle</strong> for linear gradients using the angle slider or degree input.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Adjust color stops</strong> by clicking swatches to pick colors and dragging stop positions.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Copy CSS or save PNG</strong> to integrate the generated gradient into your project.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "How do I use the generated CSS in my project?", a: "Copy the CSS output and paste it into your stylesheet as the `background` or `background-image` property for any CSS selector. It works in all modern browsers without vendor prefixes." },
              { q: "Can I add more than two colors?", a: "Yes. Click 'Add Stop' to add as many color stops as you want. Each stop has its own color picker and position slider so you can place colors at precise percentages." },
              { q: "What angle makes a diagonal gradient?", a: "A 135° angle gives you a classic top-left to bottom-right diagonal. 45° goes top-right to bottom-left. 0° is top to bottom and 90° is left to right." },
              { q: "What is the difference between this and a background image?", a: "CSS gradients are generated by the browser on the fly. They are infinitely scalable, do not require server requests, and are specified fully in CSS. Background images are raster files that must be downloaded." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-200/80 p-5 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/30">
                <dt className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">{q}</dt>
                <dd className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="related-tools-heading" className="space-y-4">
          <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Related Color Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/tools/color-picker", name: "Color Picker", desc: "Pick colors visually and get HEX, RGB, HSL." },
              { href: "/tools/color-palette-generator", name: "Color Palette Generator", desc: "Generate harmonious multi-color palettes." },
              { href: "/tools/shades-tints-generator", name: "Shades & Tints Generator", desc: "Create full shade and tint scales." },
              { href: "/tools/hex-to-rgb", name: "HEX to RGB Converter", desc: "Convert between all major color formats." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="group flex flex-col gap-1 rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/50 hover:border-red-500 dark:hover:border-red-500 shadow-xs hover:shadow-md transition-all">
                <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{name}</span>
                <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">{desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
