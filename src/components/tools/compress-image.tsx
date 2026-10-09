"use client";

import * as React from "react";
import {
  UploadCloud,
  Download,
  RotateCcw,
  Sparkles,
  FileCheck,
  Shield,
  Zap,
  ArrowRight,
  Sliders,
} from "lucide-react";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function CompressImageTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [quality, setQuality] = React.useState<number>(80);
  const [compressed, setCompressed] = React.useState<{ url: string; size: number } | null>(null);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [isDrag, setIsDrag] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const processFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    compressImage(f, quality);
  };

  const compressImage = React.useCallback(
    (sourceFile: File, q: number) => {
      setIsCompressing(true);
      const img = new Image();
      const objectUrl = URL.createObjectURL(sourceFile);
      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setIsCompressing(false);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const mime = sourceFile.type === "image/png" ? "image/jpeg" : sourceFile.type;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressed({
                url: URL.createObjectURL(blob),
                size: blob.size,
              });
            }
            setIsCompressing(false);
            URL.revokeObjectURL(objectUrl);
          },
          mime,
          q / 100
        );
      };

      img.onerror = () => {
        setIsCompressing(false);
        URL.revokeObjectURL(objectUrl);
      };
    },
    []
  );

  React.useEffect(() => {
    if (file) {
      compressImage(file, quality);
    }
  }, [quality, file, compressImage]);

  const download = () => {
    if (!compressed || !file) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed_${file.name.replace(/\.[^.]+$/, "")}.${file.type === "image/png" ? "jpg" : "jpg"}`;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setCompressed(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        id="compress-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) processFile(e.target.files[0]);
        }}
      />

      {!file ? (
        /* High-Impact iLovePDF-Style Upload Hero Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDrag(true);
          }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDrag(false);
            if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
          }}
          className={`relative rounded-3xl border-2 transition-all p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px] ${
            isDrag
              ? "border-red-500 bg-red-50/60 dark:bg-red-950/30 scale-[1.01]"
              : "border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 bg-zinc-50/40 dark:bg-zinc-900/30"
          }`}
        >
          {/* Main Select Button (Prominent Brand Red CTA) */}
          <div className="space-y-5 flex flex-col items-center max-w-md">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 sm:px-12 py-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3.5 cursor-pointer"
            >
              <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.4]" />
              Select Image files
            </button>

            <div className="space-y-2">
              <p className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200">
                or drop images here
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Supports JPG, PNG, and WebP format up to 50 MB
              </p>
            </div>

            {/* Supported Formats Pills */}
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-2xs">
                JPG
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-2xs">
                PNG
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-2xs">
                WEBP
              </span>
            </div>

            {/* Privacy Guarantee Pill */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                100% In-Browser &bull; Files never leave your device
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Active Processing & Quality Customization Workspace */
        <div className="space-y-6">
          {/* Header Action Bar with Reset */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 truncate">
              <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-100 truncate">
                {file.name}
              </span>
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Change Image
            </button>
          </div>

          {/* Size Comparison Banner */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Original */}
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Original Size
                </span>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 font-mono mt-1">
                  {formatBytes(file.size)}
                </div>
              </div>

              {/* Compressed */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center relative">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Compressed Size
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  {isCompressing ? "Compressing..." : compressed ? formatBytes(compressed.size) : "--"}
                </div>
                {compressed && !isCompressing && (
                  <span className="inline-block mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full">
                    Saved {formatBytes(file.size - compressed.size)} (
                    {Math.max(0, Math.round((1 - compressed.size / file.size) * 100))}% smaller)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Quality Tuning Controls */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-red-600" />
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Compression Ratio &amp; Quality
                </h4>
              </div>
              <span className="text-xl font-black font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-xl border border-red-200 dark:border-red-900/60 self-start sm:self-auto">
                {quality}% Quality
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Max Compression", val: 60, desc: "Smallest size" },
                { label: "Recommended", val: 80, desc: "Best balance" },
                { label: "High Quality", val: 92, desc: "Crisp photos" },
              ].map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => setQuality(preset.val)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                    quality === preset.val
                      ? "bg-red-600 text-white border-red-600 shadow-2xs"
                      : "bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {preset.label} ({preset.val}%)
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer accent-red-600 dark:accent-red-500 bg-zinc-200 dark:bg-zinc-700"
              />
              <div className="flex justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <span>Smaller File (10%)</span>
                <span>Balanced (80%)</span>
                <span>Original Quality (100%)</span>
              </div>
            </div>
          </div>

          {/* Visual Side-by-Side Preview */}
          {preview && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Original Image
                </span>
                <div className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 h-56 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={preview}
                    alt="Original"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Compressed Output Preview
                </span>
                <div className="rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 h-56 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                  {compressed ? (
                    <img
                      src={compressed.url}
                      alt="Compressed Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-zinc-400">Rendering preview...</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={download}
              disabled={!compressed || isCompressing}
              className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
            >
              <Download className="h-5 w-5" />
              Download Compressed Image
            </button>
            <button
              onClick={reset}
              className="h-14 px-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 text-base font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="h-5 w-5" />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
