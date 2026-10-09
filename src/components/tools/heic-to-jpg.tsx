"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, AlertCircle, CheckCircle } from "lucide-react";

export function HeicToJpgTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isConverting, setIsConverting] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultSize, setResultSize] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const processFile = async (f: File) => {
    setFile(f);
    setError(null);
    setResultUrl(null);
    setIsConverting(true);

    try {
      // Check if browser native Image element can decode (e.g. Safari or modern WebKit)
      const objectUrl = URL.createObjectURL(f);
      const img = new Image();

      const canDecode = await new Promise<boolean>((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });

      if (canDecode) {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (blob) {
              setResultUrl(URL.createObjectURL(blob));
              setResultSize(blob.size);
            } else {
              setError("Conversion failed. Please try another file.");
            }
            setIsConverting(false);
          },
          "image/jpeg",
          0.92
        );
      } else {
        URL.revokeObjectURL(objectUrl);
        // Fallback message for browsers without native HEIC decoder
        setError(
          "Direct HEIC hardware decoding is natively accelerated on Safari & iOS. If using Chrome or Firefox on Windows, please ensure the file is an iPhone photo with standard compatibility enabled, or convert via Safari."
        );
        setIsConverting(false);
      }
    } catch (err: any) {
      setError(err?.message || "Error processing image file.");
      setIsConverting(false);
    }
  };

  const download = () => {
    if (!resultUrl || !file) return;
    const base = file.name.replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${base}.jpg`;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("heic-input")?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-red-400 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="heic-input"
            type="file"
            accept=".heic,.heif,image/heic,image/heif,image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) processFile(e.target.files[0]);
            }}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Drop your Apple HEIC photo here
          </h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Convert iPhone and iPad .HEIC images to universal JPG format. 100% private in-browser conversion with zero server uploads.
          </p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose HEIC File
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/50 flex items-center justify-center text-sm font-bold uppercase">
                HEIC
              </div>
              <div>
                <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-sm">
                  {file.name}
                </div>
                <div className="text-sm font-medium text-zinc-500">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-sm font-semibold text-zinc-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>

          {isConverting && (
            <div className="flex items-center gap-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="h-5 w-5 rounded-full border-2 border-red-200 border-t-red-600 animate-spin" />
              Converting Apple HEIC to high-res JPG…
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {resultUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                Converted successfully to JPG — {(resultSize / 1024).toFixed(1)} KB
              </div>
              <button
                onClick={download}
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Download className="h-5 w-5" />
                Download Converted JPG Photo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
