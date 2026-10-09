import type { Metadata } from "next";
import { ShadesTintsTool } from "@/components/tools/shades-tints-generator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shades & Tints Generator Online Free — Full Color Scale | TheSwiftTools",
  description: "Generate a complete 11-stop shade and tint scale from any hex color. Click any swatch to copy its HEX value instantly. Free, no signup, 100% in-browser.",
};

export default function ShadesTintsPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Shades & Tints Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Shades & Tints Generator — Full Color Scale from Any HEX
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Enter any color and get a full 11-stop tonal scale from near-white to near-black, matching the Tailwind CSS shade convention (50–950). Click any swatch to copy its HEX code. Your files never leave your device.
        </p>
      </div>

      <ShadesTintsTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What Are Shades and Tints?</h2>
          <p>
            A <strong className="text-zinc-800 dark:text-zinc-200">shade</strong> is created by adding black to a color, making it darker. A <strong className="text-zinc-800 dark:text-zinc-200">tint</strong> is created by adding white to a color, making it lighter. Together, they form a tonal scale — a range of values from light to dark all sharing the same hue.
          </p>
          <p>
            Design systems like Tailwind CSS, Material Design, and Open Color all use standardized tonal scales (typically 50–950 or 100–900) to ensure consistent visual hierarchy across an entire product. When you build your own design system or a Tailwind CSS custom palette, this tool gives you all 11 stops with copy-ready HEX codes.
          </p>
          <p>
            The numbers follow the convention where lower numbers mean lighter colors and higher numbers mean darker colors. The 500 stop is typically the most "pure" version of your color, closest to what you originally input. The 50 stop is very light (suitable for subtle backgrounds) and the 950 stop is very dark (suitable for text on light surfaces).
          </p>
          <p>
            Using a tonal scale in your design keeps colors feeling cohesive even as they are used at different intensities. For example, you could use shade 100 for a hover background, shade 500 for a button, shade 700 for the button's shadow, and shade 900 for text — all from the same palette row.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use This Tool</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click the color square</strong> or type a HEX code to set your base color.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Browse the 11-stop scale</strong> — from lightest (50) to darkest (950).</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click any swatch</strong> to copy its HEX value to your clipboard instantly.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Use the stops in your CSS</strong> — paste directly into your Tailwind config, CSS variables, or any design tool.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I use these shades in Tailwind CSS?", a: "Yes. The stop numbers (50, 100, 200…950) match Tailwind's convention exactly. Copy the HEX values and add them to your tailwind.config.js under `theme.colors.yourColorName`." },
              { q: "What is the difference between a shade and a tint?", a: "A shade mixes the original color with black (making it darker). A tint mixes it with white (making it lighter). This tool generates both in a single continuous scale." },
              { q: "Why do some tonal scales look slightly off from my original color?", a: "The tool preserves your color's hue while adjusting lightness. Very saturated colors may appear slightly muted at extreme lightness values because full saturation at near-white lightness is physically impossible in HSL color space." },
              { q: "How many stops should I use in my design system?", a: "11 stops (50–950) gives you the most flexibility. Simpler projects might only need 5–7 stops. The key ones for most UIs are 50 (background), 100 (hover state), 300 (border), 500 (primary), 700 (hover on primary), and 900 (text)." },
              { q: "Is this free?", a: "Yes, completely free and private. All color calculations run in your browser." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Color Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/color-palette-generator", name: "Color Palette Generator", desc: "Generate harmonious multi-color palettes." },
              { href: "/tools/color-picker", name: "Color Picker", desc: "Pick any color and get HEX, RGB, HSL." },
              { href: "/tools/color-contrast-checker", name: "Color Contrast Checker", desc: "Test WCAG accessibility for any color pair." },
              { href: "/tools/gradient-generator", name: "CSS Gradient Generator", desc: "Build beautiful gradients from your palette." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="flex flex-col gap-0.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
