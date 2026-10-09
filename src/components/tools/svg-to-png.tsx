"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, Check } from "lucide-react";

export function SvgToPngTool() {
  const [svgContent, setSvgContent] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string>("");
  const [scale, setScale] = React.useState<number>(2); // 1x, 2x, 4x, 8x
  const [bgColor, setBgColor] = React.useState<string>("transparent");
  const [svgDimensions, setSvgDimensions] = React.useState<{ w: number; h: number }>({ w: 300, h: 300 });
  const [pngUrl, setPngUrl] = React.useState<string | null>(null);
  const [pngSize, setPngSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const handleFileUpload = (f: File) => {
    if (!f.name.endsWith(".svg") && f.type !== "image/svg+xml") return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSvgContent(content);

      // Extract native SVG dimensions or viewBox
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      let w = 300;
      let h = 300;
      if (svgEl) {
        const widthAttr = parseFloat(svgEl.getAttribute("width") || "0");
        const heightAttr = parseFloat(svgEl.getAttribute("height") || "0");
        const viewBox = svgEl.getAttribute("viewBox");
        if (widthAttr && heightAttr) {
          w = widthAttr;
          h = heightAttr;
        } else if (viewBox) {
          const parts = viewBox.split(/[\s,]+/).map(Number);
          if (parts.length === 4 && parts[2] && parts[3]) {
            w = parts[2];
            h = parts[3];
          }
        }
      }
      setSvgDimensions({ w, h });
    };
    reader.readAsText(f);
  };

  const convertSvg = React.useCallback(() => {
    if (!svgContent) return;
    setIsProcessing(true);

    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const targetW = Math.round(svgDimensions.w * scale);
      const targetH = Math.round(svgDimensions.h * scale);

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetW, targetH);
      }

      ctx.drawImage(img, 0, 0, targetW, targetH);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (pngBlob) => {
          if (pngBlob) {
            setPngUrl(URL.createObjectURL(pngBlob));
            setPngSize(pngBlob.size);
          }
          setIsProcessing(false);
        },
        "image/png"
      );
    };

    img.onerror = () => {
      setIsProcessing(false);
    };

    img.src = url;
  }, [svgContent, svgDimensions, scale, bgColor]);

  React.useEffect(() => {
    if (svgContent) {
      convertSvg();
    }
  }, [convertSvg, svgContent]);

  const downloadPng = () => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = `${fileName.replace(/\.svg$/i, "")}@${scale}x.png`;
    a.click();
  };

  const reset = () => {
    setSvgContent(null);
    setFileName("");
    setPngUrl(null);
  };

  return (
    <div className="w-full space-y-6">
      {!svgContent ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("svg-upload-input")?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-red-400 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="svg-upload-input"
            type="file"
            accept=".svg,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Upload your SVG vector file
          </h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Convert scalable vector graphics into crisp, high-resolution PNG bitmaps at 1x, 2x, 4x, or 8x scale with transparent or solid background.
          </p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose SVG File
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Settings Card */}
          <div className="lg:col-span-1 space-y-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Export Options
              </span>
              <button
                onClick={resetAll}
                className="text-sm font-semibold text-zinc-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>

            {/* Resolution Scale */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Resolution Scale
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 4, 8].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`h-10 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                      scale === s
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
              <p className="text-xs font-medium text-zinc-500">
                Output Dimensions: <strong className="text-zinc-800 dark:text-zinc-200 font-mono">{Math.round(svgDimensions.w * scale)} × {Math.round(svgDimensions.h * scale)} px</strong>
              </p>
            </div>

            {/* Background Color */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Background
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Transparent", value: "transparent" },
                  { label: "White", value: "#ffffff" },
                  { label: "Black", value: "#000000" },
                ].map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => setBgColor(bg.value)}
                    className={`h-9 px-3.5 rounded-xl text-sm font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      bgColor === bg.value
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {bgColor === bg.value && <Check className="h-4 w-4" />}
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File Info */}
            <div className="text-xs font-medium text-zinc-500 space-y-1.5 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <p className="truncate">File: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{fileName}</span></p>
              {pngSize > 0 && <p>PNG Size: <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">{(pngSize / 1024).toFixed(1)} KB</span></p>}
            </div>

            {/* Download Button */}
            <button
              onClick={downloadPng}
              disabled={!pngUrl || isProcessing}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg hover:shadow-lg transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Download className="h-5 w-5" />
              Download PNG ({scale}x)
            </button>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="w-full rounded-2xl border border-zinc-200/80 bg-[repeating-conic-gradient(#f4f4f5_0_90deg,#ffffff_0_180deg)_0_0/20px_20px] dark:bg-[repeating-conic-gradient(#18181b_0_90deg,#09090b_0_180deg)_0_0/20px_20px] p-6 flex flex-col items-center justify-center min-h-[380px] shadow-sm">
              {pngUrl && (
                <img
                  src={pngUrl}
                  alt="Converted SVG"
                  className="max-w-full max-h-[340px] object-contain drop-shadow-sm"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
