import type { Metadata } from "next";
import { ImageColorPickerTool } from "@/components/tools/image-color-picker";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Color Picker — Pick Any Pixel Color Online Free | TheSwiftTools",
  description: "Upload any image and click any pixel to instantly get its HEX and RGB color values. Free eyedropper tool that runs entirely in your browser. No files uploaded.",
};

export default function ImageColorPickerPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=color" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Color Tools</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Image Color Picker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Image Color Picker — Eyedropper Tool Online Free
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Upload any image and click any pixel to instantly extract its exact HEX and RGB color values. Perfect for identifying brand colors, matching design assets, or sampling colors from photos. Your files never leave your device.
        </p>
      </div>

      <ImageColorPickerTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">When Do You Need an Image Color Picker?</h2>
          <p>
            Imagine you receive a brand asset — a logo, a product photo, or a UI screenshot — and you need to extract a specific color from it. Without a pixel-level picker, you are guessing or using desktop tools that require installation. This browser-based image color picker lets you upload the image, click the exact pixel you need, and immediately get its precise color value.
          </p>
          <p>
            Designers use image color pickers to <strong className="text-zinc-800 dark:text-zinc-200">match brand colors</strong> from existing assets, identify exact hues in reference photos for mood boards, or verify that a screenshot matches the intended design. Developers use them to compare against a design mockup when debugging CSS color values.
          </p>
          <p>
            The tool renders your image onto an HTML5 Canvas element and uses the <code className="text-[11px] bg-zinc-100 dark:bg-zinc-800 px-1 rounded font-mono">getImageData()</code> API to read pixel values at the exact coordinate you click. This happens instantly, entirely in your browser — your image is never sent anywhere.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Pick a Color from an Image</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Upload your image</strong> — drag and drop it onto the upload zone or click to browse.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click any pixel</strong> on the displayed image (the cursor changes to a crosshair).</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">See the color instantly</strong> — a swatch appears with the HEX and RGB values.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Click the color value</strong> to copy it to your clipboard.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What image formats does this support?", a: "Any image format your browser can render — JPG, PNG, WebP, GIF, SVG, and BMP. Most modern browsers support all of these natively." },
              { q: "Is my image uploaded to a server?", a: "No. The image is read entirely in your browser using the FileReader and Canvas APIs. It never leaves your device, which means it is safe to use with confidential design assets or personal photos." },
              { q: "Why does the color picked sometimes look slightly different from what I expected?", a: "Screens display colors differently based on color profiles, gamma correction, and monitor calibration. The color picked is the raw pixel value in the image file, which may look slightly different from what you see on screen due to display rendering." },
              { q: "Can I pick colors from a HEIC or RAW photo?", a: "HEIC and RAW formats are not supported by browser Canvas APIs in most cases. Convert your image to JPG or PNG first — you can use the HEIC to JPG converter on this site." },
              { q: "How accurate is the pixel-level color picking?", a: "It is exact — the HEX and RGB values returned are precisely what is stored in the image file at that pixel coordinate. There is no approximation or rounding in the color extraction process." },
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
              { href: "/tools/color-picker", name: "Color Picker", desc: "Pick any color from the wheel and get all formats." },
              { href: "/tools/hex-to-rgb", name: "HEX to RGB Converter", desc: "Convert between HEX, RGB, HSL, and CMYK." },
              { href: "/tools/color-blindness-simulator", name: "Color Blindness Simulator", desc: "See how your image looks to color-blind users." },
              { href: "/tools/heic-to-jpg", name: "HEIC to JPG", desc: "Convert iPhone photos to JPG before color picking." },
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
