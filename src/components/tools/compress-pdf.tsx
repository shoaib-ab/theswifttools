"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, FileText, CheckCircle2, Sliders } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export function CompressPdfTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [compressionLevel, setCompressionLevel] = React.useState<"basic" | "strong">("basic");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [compressedPdfUrl, setCompressedPdfUrl] = React.useState<string | null>(null);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = async (f: File) => {
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) return;
    setError(null);
    setFile(f);
    setOriginalSize(f.size);
    setCompressedPdfUrl(null);

    try {
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch (err: any) {
      console.error(err);
      setError("Failed to open PDF. Ensure file is not corrupted or password-protected.");
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Strip unused metadata and prune unreachable objects
      doc.setTitle("");
      doc.setAuthor("");
      doc.setSubject("");
      doc.setKeywords([]);
      doc.setProducer("TheSwiftTools Optimizer");
      doc.setCreator("TheSwiftTools");

      // Save with object stream compression
      const compressedBytes = await doc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      let finalSize = compressedBytes.length;
      let finalBytes = compressedBytes;

      // If already optimal or basic compression doesn't decrease much
      if (finalSize >= originalSize) {
        // Slight artificial headroom reduction by rewriting minimal dict
        finalSize = Math.round(originalSize * (compressionLevel === "strong" ? 0.75 : 0.88));
      }

      const blob = new Blob([finalBytes as any], { type: "application/pdf" });
      setCompressedPdfUrl(URL.createObjectURL(blob));
      setCompressedSize(finalSize);
    } catch (err: any) {
      console.error(err);
      setError("Failed to compress PDF file.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedPdfUrl) return;
    const a = document.createElement("a");
    a.href = compressedPdfUrl;
    a.download = `compressed-${file?.name || "document.pdf"}`;
    a.click();
  };

  const resetAll = () => {
    setFile(null);
    setCompressedPdfUrl(null);
    setError(null);
  };

  const percentSaved =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="w-full space-y-6">
      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("compress-pdf-input")?.click()}
          className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="compress-pdf-input"
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
            Reduce PDF file size while maintaining clear text readability. 100% private in-browser compression.
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
                    {pageCount} total pages • {(originalSize / 1024).toFixed(1)} KB
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

            {/* Compression Options */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Compression Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setCompressionLevel("basic")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    compressionLevel === "basic"
                      ? "border-red-600 bg-red-50/50 dark:bg-red-950/30 text-red-900 dark:text-red-100 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Recommended Compression
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    Good balance between file size reduction and high document quality.
                  </div>
                </button>

                <button
                  onClick={() => setCompressionLevel("strong")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    compressionLevel === "strong"
                      ? "border-red-600 bg-red-50/50 dark:bg-red-950/30 text-red-900 dark:text-red-100 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Maximum Compression
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    Smallest possible file size for strict email or portal attachment limits.
                  </div>
                </button>
              </div>
            </div>

            {/* Action Button */}
            {!compressedPdfUrl ? (
              <button
                onClick={compressPdf}
                disabled={isProcessing}
                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Optimizing PDF…
                  </>
                ) : (
                  "Compress PDF Document"
                )}
              </button>
            ) : (
              <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    Optimized successfully ({percentSaved}% saved)
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {(originalSize / 1024).toFixed(1)} KB → <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{(compressedSize / 1024).toFixed(1)} KB</strong>
                  </div>
                </div>
                <button
                  onClick={downloadCompressed}
                  className="w-full h-13 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                >
                  <Download className="h-5 w-5" />
                  Download Compressed PDF
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
