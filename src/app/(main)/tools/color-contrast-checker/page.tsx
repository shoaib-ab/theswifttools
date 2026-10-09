import type { Metadata } from "next";
import { ColorContrastTool } from "@/components/tools/color-contrast-checker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG AA & AAA Online Free | TheSwiftTools",
  description: "Check foreground and background color contrast ratio against WCAG 2.1 AA and AAA standards. See pass/fail badges for normal and large text. Free, instant, no signup.",
};

export default function ColorContrastPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Color Contrast Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Color Contrast Checker — WCAG AA & AAA Pass/Fail
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Enter your foreground (text) and background colors to instantly see their contrast ratio and whether they meet WCAG 2.1 Level AA and AAA accessibility standards. Your files never leave your device.
        </p>
      </div>

      <ColorContrastTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What Is Color Contrast Accessibility?</h2>
          <p>
            Color contrast accessibility ensures that text and interactive elements are readable by people with low vision, color deficiencies, or who are viewing screens in bright sunlight. The Web Content Accessibility Guidelines (WCAG) define minimum contrast ratios that websites should meet to be usable by all people.
          </p>
          <p>
            The <strong className="text-zinc-800 dark:text-zinc-200">contrast ratio</strong> compares the relative luminance of the foreground color (text) against the background. A ratio of 1:1 means identical colors (invisible text), while 21:1 is the maximum (black text on white background).
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">WCAG Level AA</strong> is the standard required for most legal and corporate compliance. It requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt bold or 24pt regular).
          </p>
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">WCAG Level AAA</strong> is stricter and used when maximum accessibility is required. It requires at least 7:1 for normal text and 4.5:1 for large text. AAA compliance is not always feasible for all content but is the gold standard.
          </p>
          <p>
            This tool calculates contrast using the official WCAG relative luminance formula, which accounts for how the human eye perceives brightness differences rather than simple color differences.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Check Contrast</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set the Foreground color</strong> — this is your text color. Click the swatch or type a HEX code.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set the Background color</strong> — this is the surface behind the text.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Read the contrast ratio</strong> — shown in the center. Higher is better.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Check the WCAG badges</strong> — green means pass, red means fail for that level and text size.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Adjust colors</strong> until all the levels you need show green badges.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What contrast ratio do I need for my website?", a: "For most websites, WCAG AA is the target. That means 4.5:1 for body text and 3:1 for large headings. If you work on government, healthcare, or financial services sites, you should aim for AAA (7:1) for critical text." },
              { q: "What counts as 'large text' in WCAG?", a: "Large text is 18pt (approximately 24px) or larger for regular weight, or 14pt (approximately 18.67px) or larger for bold text. Body text is typically 12–16px, which falls under the stricter normal text rules." },
              { q: "My design fails AA. What should I do?", a: "The quickest fixes are to darken the text color or lighten the background (for dark text on light backgrounds). If you need to keep the hue, try using a monochromatic shades tool to find a shade that passes." },
              { q: "Does contrast ratio apply to icons and graphics?", a: "WCAG 1.4.11 (Non-text Contrast) requires a 3:1 ratio for UI components like icons, form borders, and data visualizations. This tool is primarily for text, but the ratio displayed applies to any foreground/background pair." },
              { q: "Is this tool free and private?", a: "Yes. All calculations happen in your browser using standard JavaScript math. No data is sent to any server." },
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
              { href: "/tools/color-picker", name: "Color Picker", desc: "Find the right color visually." },
              { href: "/tools/shades-tints-generator", name: "Shades & Tints Generator", desc: "Find a shade that passes contrast requirements." },
              { href: "/tools/color-blindness-simulator", name: "Color Blindness Simulator", desc: "See how your colors look to color-blind users." },
              { href: "/tools/color-palette-generator", name: "Color Palette Generator", desc: "Generate accessible color palettes." },
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
