"use client";
import * as React from "react";
import { UploadCloud, Download, RotateCcw } from "lucide-react";

export function ImageResizerTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [origSize, setOrigSize] = React.useState<{ w: number; h: number } | null>(null);
  const [mode, setMode] = React.useState<"pixels" | "percent">("pixels");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [percent, setPercent] = React.useState("50");
  const [lock, setLock] = React.useState(true);
  const [result, setResult] = React.useState<string | null>(null);

  const processFile = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setPreview(src);
      const img = new Image();
      img.onload = () => {
        setOrigSize({ w: img.naturalWidth, h: img.naturalHeight });
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
      };
      img.src = src;
    };
    reader.readAsDataURL(f);
  };

  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (lock && origSize && v) {
      const ratio = origSize.h / origSize.w;
      setHeight(String(Math.round(Number(v) * ratio)));
    }
  };

  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (lock && origSize && v) {
      const ratio = origSize.w / origSize.h;
      setWidth(String(Math.round(Number(v) * ratio)));
    }
  };

  const resize = () => {
    if (!preview || !origSize) return;
    const targetW = mode === "pixels" ? Number(width) : Math.round(origSize.w * Number(percent) / 100);
    const targetH = mode === "pixels" ? Number(height) : Math.round(origSize.h * Number(percent) / 100);
    if (!targetW || !targetH) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, targetW, targetH);
      canvas.toBlob((blob) => {
        if (blob) setResult(URL.createObjectURL(blob));
      }, file?.type || "image/jpeg", 0.92);
    };
    img.src = preview;
  };

  const download = () => {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `resized_${file.name}`;
    a.click();
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById("resize-input")?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 hover:border-red-400 bg-zinc-50/50 dark:border-zinc-700/80 dark:bg-zinc-950/40 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input id="resize-input" type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Drop an image here, or <span className="text-red-600 dark:text-red-400 underline underline-offset-4">browse files</span></h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">Supports JPG, PNG, WebP, GIF • 100% In-Browser Privacy</p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose Image File
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-5">
            {origSize && (
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                Original image dimensions: <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{origSize.w} × {origSize.h} px</span>
              </p>
            )}

            {/* Mode tabs */}
            <div className="flex gap-2">
              {(["pixels", "percent"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                    mode === m
                      ? "bg-red-600 text-white border-red-600 shadow-xs"
                      : "bg-white text-zinc-700 border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {m === "pixels" ? "By Pixels" : "By Percentage"}
                </button>
              ))}
            </div>

            {mode === "pixels" ? (
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="h-12 w-full px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  onClick={() => setLock(!lock)}
                  className={`mt-6 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                    lock ? "bg-red-50 border-red-300 text-red-700 dark:bg-red-950/60 dark:border-red-900 dark:text-red-300" : "border-zinc-300 dark:border-zinc-700 text-zinc-600"
                  }`}
                  title={lock ? "Unlock ratio" : "Lock ratio"}
                >
                  {lock ? "🔒 Locked" : "🔓 Free"}
                </button>
                <div className="flex-1 space-y-1.5">
                  <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="h-12 w-full px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  Scale to <span className="font-mono font-extrabold text-red-600 dark:text-red-400">{percent}%</span>
                  {origSize && <span className="text-zinc-500 ml-2 font-normal">({Math.round(origSize.w * Number(percent) / 100)} × {Math.round(origSize.h * Number(percent) / 100)} px)</span>}
                </label>
                <input
                  type="range" min={1} max={200} value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer accent-red-600 dark:accent-red-500 bg-zinc-200 dark:bg-zinc-700"
                />
              </div>
            )}

            <button
              onClick={resize}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Resize Image
            </button>
          </div>

          {result && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 p-4">
                <img src={result} alt="Resized" className="w-full object-contain max-h-72" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={download}
                  className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Download className="h-5 w-5" /> Download Resized Image
                </button>
                <button
                  onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                  className="h-14 px-6 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 text-base font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-5 w-5" /> New Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
