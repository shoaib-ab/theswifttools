import type { Metadata } from "next";
import { ColorPickerTool } from "@/components/tools/color-picker";
import { ShieldCheck, Zap, Copy } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Picker Online Free — HEX, RGB, HSL | TheSwiftTools",
  description:
    "Free online color picker with HEX, RGB, and HSL output. Pick any color with sliders or the native color wheel. One-click copy for every format. No signup needed.",
};

export default function ColorPickerPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      {/* Breadcrumb + Header */}
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Color Picker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Color Picker Online — <span className="heading-highlight">HEX, RGB & HSL</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Pick any color using the visual wheel or RGB sliders. Copy the exact HEX, RGB, or HSL value in one click. 
          Your files never leave your device.
        </p>
      </div>

      {/* Tool */}
      <ColorPickerTool />

      {/* Info Sections */}
      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        {/* Feature badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, title: "100% Private", body: "All processing happens in your browser. No colors, files, or data are sent to any server." },
            { icon: <Zap className="h-5 w-5 text-blue-500" />, title: "Instant Updates", body: "Move any slider or click the color wheel and all values update in real time, instantly." },
            { icon: <Copy className="h-5 w-5 text-purple-500" />, title: "One-Click Copy", body: "Copy HEX, RGB, or HSL values to your clipboard with a single click — no highlighting needed." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              {icon}
              <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-2">{title}</h2>
              <p className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">{body}</p>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What Is a Color Picker?</h2>
          <p>
            A color picker is an essential tool for designers, developers, and digital artists. It lets you select any color visually and immediately get its precise numeric values in the formats that different software and coding environments accept.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">HEX (hexadecimal)</strong> is the format used in CSS, HTML, and most design applications. A HEX color looks like <code className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono">#3B82F6</code> — the six characters encode red, green, and blue values in pairs.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">RGB</strong> expresses the same color as three numbers from 0 to 255, one for each channel: red, green, and blue. It is used in CSS, JavaScript canvas APIs, and many image editing programs.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">HSL</strong> stands for Hue, Saturation, and Lightness. It is often the most intuitive format because it maps closely to how humans think about color — rotating the hue shifts the base color, and adjusting lightness makes it darker or lighter without changing the hue.
          </p>
          <p>
            Use the random color button to discover new palettes, or enter a known HEX code directly to inspect its RGB and HSL equivalents. The large color swatch updates instantly so you always see exactly what you are working with.
          </p>
        </div>

        {/* How to use */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use This Tool</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click the color square</strong> on the left to open the native color wheel and pick any color.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Type a HEX code</strong> directly into the HEX input field (e.g., <code className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono">#FF5733</code>).</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Drag the RGB sliders</strong> to fine-tune each color channel independently.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click Random</strong> to generate a surprise color for inspiration.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click the copy icon</strong> next to HEX, RGB, or HSL to copy the value to your clipboard.</li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the difference between HEX, RGB, and HSL?",
                a: "They are three different ways to represent the same color. HEX is used in HTML/CSS code, RGB is used in JavaScript and canvas APIs, and HSL is useful when you want to adjust hue, saturation, or lightness independently. All three describe the same visible color."
              },
              {
                q: "Does this color picker work offline?",
                a: "Yes. Once the page loads, all calculations run in your browser using JavaScript. You can disconnect your internet and the tool will continue to work without any interruption."
              },
              {
                q: "Can I use this to pick colors from my screen?",
                a: "This tool uses the browser's built-in color picker, which on supported browsers (Chrome, Edge) can include a screen eyedropper feature. Click the colored square to open the wheel and look for the eyedropper icon."
              },
              {
                q: "How accurate are the converted values?",
                a: "The conversions use standard mathematical formulas. HEX and RGB are exact lossless conversions. HSL values are rounded to the nearest whole number, which introduces a negligible rounding difference of less than 1%."
              },
              {
                q: "Is this tool free?",
                a: "Yes, completely free with no sign-up, no subscription, and no watermarks. Use it as many times as you need."
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related tools */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Color Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/hex-to-rgb", name: "HEX ↔ RGB Converter", desc: "Convert between HEX, RGB, HSL, and CMYK." },
              { href: "/tools/gradient-generator", name: "CSS Gradient Generator", desc: "Build beautiful CSS gradients with live preview." },
              { href: "/tools/color-palette-generator", name: "Color Palette Generator", desc: "Generate harmonious palettes from any base color." },
              { href: "/tools/color-contrast-checker", name: "Color Contrast Checker", desc: "Check WCAG AA/AAA accessibility contrast ratios." },
            ].map(({ href, name, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-0.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
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
