"use client";
import * as React from "react";
import { UploadCloud, Download, RotateCcw, Shield } from "lucide-react";

interface ImageFormatConverterProps {
  fromFormat: string; // display label e.g. "JPG"
  toFormat: string;   // display label e.g. "PNG"
  fromMime: string;   // e.g. "image/jpeg"
  toMime: string;     // e.g. "image/png"
  fromExt: string;    // e.g. ".jpg,.jpeg"
  toExt: string;      // e.g. "png"
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageFormatConverter({ fromFormat, toFormat, fromMime, toMime, fromExt, toExt }: ImageFormatConverterProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDrag, setIsDrag] = React.useState(false);
  const [result, setResult] = React.useState<{ url: string; size: number } | null>(null);
  const [isConverting, setIsConverting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const processFile = (f: File) => {
    setError(null);
    setResult(null);
    setFile(f);
    setIsConverting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) { setError("Canvas not supported."); setIsConverting(false); return; }
        // For JPEG output, fill with white background (no transparency)
        if (toMime === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) setResult({ url: URL.createObjectURL(blob), size: blob.size });
            else setError("Conversion failed. Please try another file.");
            setIsConverting(false);
          },
          toMime,
          0.92
        );
      };
      img.onerror = () => { setError("Could not read image file."); setIsConverting(false); };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => { setError("Could not read file."); setIsConverting(false); };
    reader.readAsDataURL(f);
  };

  const download = () => {
    if (!result || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `${base}.${toExt}`;
    a.click();
  };

  const reset = () => { setFile(null); setResult(null); setError(null); };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={(e) => { e.preventDefault(); setIsDrag(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]); }}
          className={`relative rounded-3xl border-2 transition-all p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[360px] ${
            isDrag
              ? "border-red-500 bg-red-50/60 dark:bg-red-950/30 scale-[1.01]"
              : "border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 bg-zinc-50/40 dark:bg-zinc-900/30"
          }`}
        >
          <input id={`fmt-conv-input-${toExt}`} type="file" accept={fromExt} className="hidden" onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} />
          <div className="space-y-4 flex flex-col items-center max-w-md">
            <button
              onClick={() => document.getElementById(`fmt-conv-input-${toExt}`)?.click()}
              className="px-8 sm:px-12 py-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-lg sm:text-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3.5 cursor-pointer"
            >
              <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.4]" />
              Select {fromFormat} File
            </button>

            <div className="space-y-1.5">
              <p className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200">
                or drop {fromFormat} image here
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Converts to <strong className="text-zinc-900 dark:text-zinc-100">{toFormat}</strong> in local browser memory
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                100% In-Browser &bull; Files never leave your device
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold uppercase">{fromFormat}</div>
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-xs">{file.name}</div>
                <div className="text-xs text-zinc-500">{formatBytes(file.size)}</div>
              </div>
            </div>
            <button onClick={reset} className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5 transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />Reset
            </button>
          </div>

          {isConverting && (
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="h-4 w-4 rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-t-zinc-100 animate-spin" />
              Converting to {toFormat}…
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs">{error}</div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Converted successfully — {formatBytes(result.size)}
              </div>
              <button
                onClick={download}
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Download className="h-5 w-5" />
                Download {toFormat} File
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
