import type { Metadata } from "next";
import { ColorPaletteTool } from "@/components/tools/color-palette-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Palette Generator Online Free — Harmonious Palettes | TheSwiftTools",
  description: "Generate beautiful, harmonious color palettes from any base color. Choose from complementary, triadic, tetradic, analogous, or monochromatic modes. Copy any swatch in one click.",
};

export default function ColorPalettePage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-5xl w-full mx-auto space-y-12">
      <div className="space-y-3 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Color Palette Generator</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
          Color Palette Generator — Free Online Harmonious Palettes
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Generate professionally harmonious color palettes from any base color using color theory. Choose your harmony mode, copy any swatch, or randomize for instant inspiration.
        </p>
      </div>

      <ColorPaletteTool />

      <div className="space-y-10 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <section aria-labelledby="what-is-harmony-heading" className="space-y-4">
          <h2 id="what-is-harmony-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            What Is Color Harmony?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Color harmony describes the pleasing arrangement of colors based on their relationships on the color wheel. Professional designers use these relationships — not guesswork — to build cohesive visual systems that feel intentional and balanced.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Complementary</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Colors sit opposite each other on the wheel. They create maximum contrast and vibrancy for CTAs and accents.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Triadic</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Uses three equally spaced colors. Vibrant while remaining balanced for rich multi-colored designs.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Analogous</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Colors adjacent on the color wheel. Produces calm, organic combinations seen in nature.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">Monochromatic</h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Single hue with varying lightness levels. Clean, sophisticated and easiest to balance.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-to-heading" className="space-y-4">
          <h2 id="how-to-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How to Use the Palette Generator
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Pick a base color</strong> using the interactive color picker or type any custom HEX code.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Choose a harmony mode</strong> — complementary, triadic, tetradic, analogous, or monochromatic.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Click any swatch</strong> to copy its HEX value directly to your clipboard.</li>
            <li><strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Click Random</strong> to generate a fresh base color for instant design inspiration.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-4">
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-4">
            {[
              { q: "Which harmony mode should I use for a website?", a: "For most websites, analogous palettes feel natural and professional. Use complementary when you want a strong accent color to draw attention. Monochromatic is great for minimalist designs." },
              { q: "How many colors does a good palette need?", a: "Most design systems use 3–5 colors: a primary brand color, 1–2 accent colors, and neutral tones for backgrounds and text. More colors can create visual noise." },
              { q: "Can I use these colors commercially?", a: "Yes. The palettes generated here are mathematical calculations — there is no copyright on color combinations." },
              { q: "What is the 60-30-10 rule?", a: "A classic design rule: use your dominant color for 60% of the design (backgrounds, large areas), your secondary for 30% (content areas, cards), and your accent for 10% (buttons, links, highlights)." },
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
              { href: "/tools/shades-tints-generator", name: "Shades & Tints Generator", desc: "Generate a full tonal scale from any color." },
              { href: "/tools/gradient-generator", name: "CSS Gradient Generator", desc: "Create beautiful CSS gradients from your palette." },
              { href: "/tools/color-contrast-checker", name: "Color Contrast Checker", desc: "Check WCAG accessibility for your color pairs." },
              { href: "/tools/color-picker", name: "Color Picker", desc: "Pick any color and get HEX, RGB, HSL." },
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
