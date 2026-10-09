import type { Metadata } from "next";
import { HexToRgbTool } from "@/components/tools/hex-to-rgb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HEX to RGB Converter — Also HSL & CMYK | TheSwiftTools",
  description:
    "Convert HEX color codes to RGB, HSL, and CMYK instantly. Also convert RGB to HEX and HSL to HEX. Free, no signup, works entirely in your browser.",
};

export default function HexToRgbPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">HEX to RGB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          HEX to RGB Converter — Plus HSL & CMYK
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Enter a HEX, RGB, or HSL color value and instantly see all four formats — HEX, RGB, HSL, and CMYK. 
          Copy any format in one click. Your files never leave your device.
        </p>
      </div>

      <HexToRgbTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Why Convert Between Color Formats?</h2>
          <p>
            Different tools and workflows use different color formats. CSS and HTML rely heavily on HEX codes, while JavaScript canvas APIs and image editors often require RGB values. Print designers working in professional software like Adobe InDesign or Illustrator frequently need CMYK values. This converter lets you type in whichever format you already have and get all others instantly — no mental math required.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">HEX</strong> is a base-16 representation of the RGB channels packed into a six-character string. For example, <code className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono">#3B82F6</code> breaks down into <code className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono">R=59, G=130, B=246</code>.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">HSL</strong> (Hue, Saturation, Lightness) is the most human-friendly format. To make a color darker without changing its hue, simply lower the lightness value. This format is especially useful in CSS when defining hover states or theme variations.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">CMYK</strong> (Cyan, Magenta, Yellow, Key/Black) is the format used in print. Screen colors defined in RGB are often converted to CMYK before sending files to a printer. Note that not all RGB colors can be perfectly reproduced in CMYK — the CMYK gamut is smaller than the RGB gamut.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Convert Colors</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Choose your input format</strong> — click HEX, RGB, or HSL tab at the top.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Type your color value</strong> into the input fields.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">See all outputs instantly</strong> — HEX, RGB, HSL, and CMYK update in real time.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click the copy icon</strong> next to whichever format you need.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I convert RGB to HEX?", a: "Yes. Switch to the RGB tab, enter your R, G, B values, and the HEX output will appear immediately in the results panel." },
              { q: "Is CMYK conversion accurate for printing?", a: "The CMYK values shown are calculated mathematically from the RGB values. For critical print work, always verify colors in your print production software, as different printers and paper types can affect actual output." },
              { q: "Does this support 3-digit HEX codes like #FFF?", a: "The tool currently works with 6-digit HEX codes. If you have a 3-digit code, expand it by doubling each digit — #FFF becomes #FFFFFF, #F60 becomes #FF6600." },
              { q: "What does the 'alpha' or opacity channel look like in HEX?", a: "Full 6-digit HEX codes represent opaque colors. CSS also supports 8-digit HEX codes with an alpha channel (e.g., #3B82F680 = 50% opacity), but this converter focuses on the 6-digit RGB form." },
              { q: "Is this free to use?", a: "Yes, completely free and private. All conversions happen in your browser — nothing is sent to any server." },
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
              { href: "/tools/color-picker", name: "Color Picker", desc: "Pick any color visually and get HEX, RGB, HSL." },
              { href: "/tools/gradient-generator", name: "CSS Gradient Generator", desc: "Create beautiful linear and radial gradients." },
              { href: "/tools/color-contrast-checker", name: "Color Contrast Checker", desc: "Check WCAG AA/AAA contrast accessibility." },
              { href: "/tools/shades-tints-generator", name: "Shades & Tints Generator", desc: "Generate full shade/tint scales from any color." },
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
