"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, RotateCw, FileText, CheckCircle2 } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

export function RotatePdfTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pdfBuffer, setPdfBuffer] = React.useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [rotationAngle, setRotationAngle] = React.useState<number>(90); // 90, 180, 270
  const [targetScope, setTargetScope] = React.useState<"all" | "custom">("all");
  const [customPagesInput, setCustomPagesInput] = React.useState<string>("1");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [rotatedPdfUrl, setRotatedPdfUrl] = React.useState<string | null>(null);
  const [rotatedSize, setRotatedSize] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = async (f: File) => {
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) return;
    setError(null);
    setFile(f);
    setRotatedPdfUrl(null);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setPdfBuffer(buffer);
      setPageCount(count);
      setCustomPagesInput(`1-${Math.min(count, 3)}`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to open PDF. Ensure file is not corrupted or password-protected.");
    }
  };

  const rotatePdf = async () => {
    if (!pdfBuffer || pageCount === 0) return;
    setError(null);
    setIsProcessing(true);

    try {
      const doc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
      const pages = doc.getPages();

      let targetIndices: number[] = [];
      if (targetScope === "all") {
        targetIndices = pages.map((_, i) => i);
      } else {
        // Parse custom pages
        const parts = customPagesInput.split(",").map((p) => p.trim());
        const selected = new Set<number>();
        for (const part of parts) {
          if (part.includes("-")) {
            const [s, e] = part.split("-").map(Number);
            if (!isNaN(s) && !isNaN(e)) {
              for (let i = Math.max(1, s); i <= Math.min(pageCount, e); i++) selected.add(i - 1);
            }
          } else {
            const p = parseInt(part, 10);
            if (!isNaN(p) && p >= 1 && p <= pageCount) selected.add(p - 1);
          }
        }
        targetIndices = Array.from(selected);
      }

      if (targetIndices.length === 0) {
        setError("Please specify at least one valid page to rotate.");
        setIsProcessing(false);
        return;
      }

      targetIndices.forEach((idx) => {
        const page = pages[idx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotationAngle) % 360));
      });

      const rotatedBytes = await doc.save();
      const blob = new Blob([rotatedBytes as any], { type: "application/pdf" });
      setRotatedPdfUrl(URL.createObjectURL(blob));
      setRotatedSize(blob.size);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while rotating the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadRotated = () => {
    if (!rotatedPdfUrl) return;
    const a = document.createElement("a");
    a.href = rotatedPdfUrl;
    a.download = `rotated-${file?.name || "document.pdf"}`;
    a.click();
  };

  const resetAll = () => {
    setFile(null);
    setPdfBuffer(null);
    setPageCount(0);
    setRotatedPdfUrl(null);
    setError(null);
  };

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("rotate-pdf-input")?.click()}
          className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="rotate-pdf-input"
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400 shadow-xs mb-5 group-hover:scale-105 transition-transform">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50">
            Select PDF file
          </h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-md">
            Rotate individual or all pages clockwise or counter-clockwise (90°, 180°, 270°). 100% private.
          </p>
          <span className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-md group-hover:bg-red-700 transition-colors">
            Choose PDF File
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-md">
                    {file.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {pageCount} total pages • {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={resetAll}
                className="text-sm font-semibold text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Change File
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            {/* Rotation Direction Options */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Rotation Angle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { angle: 90, label: "90° Right (Clockwise)" },
                  { angle: 180, label: "180° Flip (Upside down)" },
                  { angle: 270, label: "90° Left (Counter-CW)" },
                ].map((item) => (
                  <button
                    key={item.angle}
                    onClick={() => setRotationAngle(item.angle)}
                    className={`h-12 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition-all ${
                      rotationAngle === item.angle
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <RotateCw className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Pages */}
            <div className="space-y-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Pages to Apply
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTargetScope("all")}
                  className={`h-11 px-5 rounded-xl text-sm font-bold border transition-all ${
                    targetScope === "all"
                      ? "border-red-600 bg-red-600 text-white shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  All Pages ({pageCount})
                </button>
                <button
                  onClick={() => setTargetScope("custom")}
                  className={`h-11 px-5 rounded-xl text-sm font-bold border transition-all ${
                    targetScope === "custom"
                      ? "border-red-600 bg-red-600 text-white shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Specific Pages
                </button>
              </div>

              {targetScope === "custom" && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={customPagesInput}
                    onChange={(e) => setCustomPagesInput(e.target.value)}
                    placeholder="e.g. 1, 3, 5-7"
                    className="w-full h-11 px-4 text-sm font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-sm text-zinc-500 mt-1.5">
                    Enter single pages or ranges (e.g. 1, 3-5). Total pages: {pageCount}
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={rotatePdf}
              disabled={isProcessing}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Rotating Pages…
                </>
              ) : (
                "Rotate PDF Document"
              )}
            </button>
          </div>

          {/* Download Results */}
          {rotatedPdfUrl && (
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Successfully rotated PDF document ({(rotatedSize / 1024).toFixed(1)} KB)
              </div>
              <button
                onClick={downloadRotated}
                className="w-full h-13 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Download className="h-5 w-5" />
                Download Rotated PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
