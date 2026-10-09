"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, FileText, CheckCircle2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export function SplitPdfTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pdfBuffer, setPdfBuffer] = React.useState<ArrayBuffer | null>(null);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [mode, setMode] = React.useState<"range" | "select">("range");
  const [rangeInput, setRangeInput] = React.useState<string>("");
  const [selectedPages, setSelectedPages] = React.useState<number[]>([]);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [extractedPdfUrl, setExtractedPdfUrl] = React.useState<string | null>(null);
  const [extractedSize, setExtractedSize] = React.useState<number>(0);
  const [extractedPageCount, setExtractedPageCount] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = async (f: File) => {
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) return;
    setError(null);
    setFile(f);
    setExtractedPdfUrl(null);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setPdfBuffer(buffer);
      setPageCount(count);
      setRangeInput(`1-${Math.min(count, 5)}`);
      setSelectedPages(Array.from({ length: Math.min(count, 3) }, (_, i) => i + 1));
    } catch (err: any) {
      console.error(err);
      setError("Failed to open PDF. Ensure file is not corrupted or password-protected.");
    }
  };

  const parseRanges = (input: string, max: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",").map((p) => p.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-").map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(max, Math.max(start, end));
          for (let i = from; i <= to; i++) {
            pages.add(i);
          }
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= max) {
          pages.add(page);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!pdfBuffer || pageCount === 0) return;
    setError(null);
    setIsProcessing(true);

    try {
      const pagesToExtract =
        mode === "range"
          ? parseRanges(rangeInput, pageCount)
          : selectedPages.sort((a, b) => a - b);

      if (pagesToExtract.length === 0) {
        setError("Please select at least one valid page to extract.");
        setIsProcessing(false);
        return;
      }

      const srcDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      // pdf-lib uses 0-based indices
      const indicesToCopy = pagesToExtract.map((p) => p - 1);
      const copiedPages = await newDoc.copyPages(srcDoc, indicesToCopy);
      copiedPages.forEach((p) => newDoc.addPage(p));

      const newBytes = await newDoc.save();
      const blob = new Blob([newBytes as any], { type: "application/pdf" });
      setExtractedPdfUrl(URL.createObjectURL(blob));
      setExtractedSize(blob.size);
      setExtractedPageCount(pagesToExtract.length);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const togglePageSelect = (pageNo: number) => {
    setSelectedPages((prev) =>
      prev.includes(pageNo) ? prev.filter((p) => p !== pageNo) : [...prev, pageNo]
    );
  };

  const downloadExtracted = () => {
    if (!extractedPdfUrl) return;
    const a = document.createElement("a");
    a.href = extractedPdfUrl;
    a.download = `split-${file?.name || "document.pdf"}`;
    a.click();
  };

  const resetAll = () => {
    setFile(null);
    setPdfBuffer(null);
    setPageCount(0);
    setExtractedPdfUrl(null);
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
          onClick={() => document.getElementById("split-pdf-input")?.click()}
          className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="split-pdf-input"
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
            Extract custom pages or ranges (e.g. 1-3, 5, 8-10) with complete browser-side privacy.
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

            {/* Mode Tabs */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setMode("range")}
                  className={`h-11 px-5 rounded-xl text-sm font-bold border transition-all ${
                    mode === "range"
                      ? "border-red-600 bg-red-600 text-white shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  By Page Range
                </button>
                <button
                  onClick={() => setMode("select")}
                  className={`h-11 px-5 rounded-xl text-sm font-bold border transition-all ${
                    mode === "select"
                      ? "border-red-600 bg-red-600 text-white shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Select Individual Pages
                </button>
              </div>

              {mode === "range" ? (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Enter page range to extract:
                  </label>
                  <input
                    type="text"
                    value={rangeInput}
                    onChange={(e) => setRangeInput(e.target.value)}
                    placeholder="e.g. 1-3, 5, 8-12"
                    className="w-full h-11 px-4 text-sm font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-sm text-zinc-500 mt-1">
                    Example format: <code>1-4, 7, 9-10</code> (Max pages: {pageCount})
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <span>Click pages to include in extracted file:</span>
                    <button
                      onClick={() =>
                        setSelectedPages(
                          selectedPages.length === pageCount
                            ? []
                            : Array.from({ length: pageCount }, (_, i) => i + 1)
                        )
                      }
                      className="text-sm font-bold text-red-600 dark:text-red-400 hover:underline"
                    >
                      {selectedPages.length === pageCount ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => {
                      const isSel = selectedPages.includes(p);
                      return (
                        <button
                          key={p}
                          onClick={() => togglePageSelect(p)}
                          className={`h-10 w-12 rounded-lg text-sm font-bold border flex items-center justify-center transition-all ${
                            isSel
                              ? "border-red-600 bg-red-600 text-white shadow-xs"
                              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Split Action */}
            <button
              onClick={splitPdf}
              disabled={isProcessing}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Extracting Pages…
                </>
              ) : (
                "Extract Selected Pages"
              )}
            </button>
          </div>

          {/* Download Results */}
          {extractedPdfUrl && (
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Successfully extracted {extractedPageCount} pages ({(extractedSize / 1024).toFixed(1)} KB)
              </div>
              <button
                onClick={downloadExtracted}
                className="w-full h-13 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Download className="h-5 w-5" />
                Download Extracted PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
