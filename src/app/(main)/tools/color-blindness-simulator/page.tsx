import type { Metadata } from "next";
import { ColorBlindnessTool } from "@/components/tools/color-blindness-simulator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Blindness Simulator Online Free — Test Your Images | TheSwiftTools",
  description: "Simulate how images and designs look to people with protanopia, deuteranopia, tritanopia, or achromatopsia. Free accessibility tool. No files uploaded to any server.",
};

export default function ColorBlindnessPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Color Blindness Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Color Blindness Simulator — Test Images for Accessibility
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Upload any image or design screenshot and preview how it looks to users with common color-vision deficiencies. 
          Supports protanopia, deuteranopia, tritanopia, and achromatopsia. Your files never leave your device.
        </p>
      </div>

      <ColorBlindnessTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Understanding Color Vision Deficiencies</h2>
          <p>
            Approximately 1 in 12 men and 1 in 200 women worldwide have some form of color vision deficiency. This means roughly 300 million people experience color differently from the majority. Designing without considering their experience excludes a significant portion of your audience.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">Protanopia</strong> (red-blind) affects approximately 1% of males. People with protanopia cannot perceive red light, making reds appear dark and greens appear similar to oranges and yellows.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">Deuteranopia</strong> (green-blind) is the most common form, affecting approximately 1% of males. The green channel is absent, making reds, greens, and browns appear similar.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">Tritanopia</strong> (blue-blind) is rare (about 0.01% of the population). Blue and yellow become confused, and the world appears predominantly red and green.
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">Achromatopsia</strong> is total color blindness — the world is perceived entirely in shades of gray. It affects about 1 in 30,000 people and is often accompanied by light sensitivity.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use the Simulator</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your image</strong> — drag and drop or click to browse. Works with screenshots, logos, charts, and photos.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click each deficiency type</strong> to instantly see how the image looks under that condition.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Compare across modes</strong> — toggle between them quickly to spot problematic color combinations.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Fix issues</strong> — if colors become indistinguishable in simulation, revise your palette using higher contrast or add non-color cues (patterns, labels, icons).</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is this simulation 100% accurate?", a: "The simulation uses established color matrix algorithms based on LMS cone response models. It provides a good approximation of how color-blind users perceive images, but actual experience varies. It is a design tool for identifying problems, not a medical-grade simulation." },
              { q: "What should I do if my design fails the simulation?", a: "Avoid using color alone to convey information. Add text labels, patterns, icons, or shape differences as redundant cues. Increase contrast between critical color pairs. Use the contrast checker tool alongside this simulator." },
              { q: "Do I need to upload my file to a server?", a: "No. The image is processed entirely in your browser using the HTML5 Canvas API. Your files stay on your device." },
              { q: "Which color blindness type should I test first?", a: "Start with deuteranopia — it is the most common form. Then test protanopia. If your design passes both, it is likely accessible to the vast majority of color-blind users." },
              { q: "Is this tool free?", a: "Yes, completely free. No account, no subscription, no watermarks." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Accessibility Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/color-contrast-checker", name: "Color Contrast Checker", desc: "Check WCAG AA/AAA contrast ratios." },
              { href: "/tools/color-palette-generator", name: "Color Palette Generator", desc: "Build accessible, harmonious color palettes." },
              { href: "/tools/image-color-picker", name: "Image Color Picker", desc: "Extract exact colors from any image." },
              { href: "/tools/shades-tints-generator", name: "Shades & Tints Generator", desc: "Find accessible shades within a color family." },
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
