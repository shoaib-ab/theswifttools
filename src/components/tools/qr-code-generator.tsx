"use client";

import * as React from "react";
import { QrCode, Download, Copy, Check, Palette } from "lucide-react";
import QRCodeLib from "qrcode";
import { CustomSelect } from "@/components/ui/custom-select";

export function QrCodeGeneratorTool() {
  const [content, setContent] = React.useState<string>("https://theswifttools.com");
  const [size, setSize] = React.useState<number>(300);
  const [fgColor, setFgColor] = React.useState<string>("#000000");
  const [bgColor, setBgColor] = React.useState<string>("#ffffff");
  const [errorLevel, setErrorLevel] = React.useState<"L" | "M" | "Q" | "H">("M");
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const generateQr = React.useCallback(async () => {
    if (!content.trim() || !canvasRef.current) return;

    try {
      await QRCodeLib.toCanvas(canvasRef.current, content, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
      });

      const url = canvasRef.current.toDataURL("image/png");
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  }, [content, size, fgColor, bgColor, errorLevel]);

  React.useEffect(() => {
    generateQr();
  }, [generateQr]);

  const downloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const copyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.clipboard?.write) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-2 space-y-5 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <QrCode className="h-4 w-4 text-blue-500" /> QR Code Data & Options
          </div>

          {/* Content Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              URL or Text Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter URL, website link, text message, or contact info..."
              rows={3}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Color & Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Palette className="h-3 w-3" /> Foreground Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-8 w-10 p-0 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-24 h-8 px-2 text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 uppercase"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Palette className="h-3 w-3" /> Background Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-10 p-0 border border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-24 h-8 px-2 text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 uppercase"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Error Correction
              </label>
              <CustomSelect<"L" | "M" | "Q" | "H">
                value={errorLevel}
                onChange={(val) => setErrorLevel(val)}
                size="sm"
                options={[
                  { value: "L", label: "Low (7% recovery)" },
                  { value: "M", label: "Medium (15% recovery)" },
                  { value: "Q", label: "Quartile (25% recovery)" },
                  { value: "H", label: "High (30% recovery)" },
                ]}
              />
            </div>
          </div>

          {/* Size Preset Buttons */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Download Dimensions
            </label>
            <div className="flex gap-2">
              {[250, 400, 600, 1000].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    size === s
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-600"
                  }`}
                >
                  {s} × {s} px
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Canvas Preview Card */}
        <div className="lg:col-span-1 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm flex flex-col items-center justify-between space-y-5">
          <div className="p-3 bg-zinc-100/60 dark:bg-zinc-950/60 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center">
            <canvas ref={canvasRef} className="max-w-[220px] max-h-[220px] rounded-lg shadow-xs" />
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={downloadPng}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Download className="h-5 w-5" />
              Download PNG Image
            </button>
            <button
              onClick={copyImage}
              className="w-full h-12 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
              {copied ? "Image Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
