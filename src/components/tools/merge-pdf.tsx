"use client";

import * as React from "react";
import { UploadCloud, Download, Trash2, ArrowUp, ArrowDown, FileText, Plus, CheckCircle2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface PdfItem {
  id: string;
  name: string;
  size: number;
  buffer: ArrayBuffer;
  pageCount: number;
}

export function MergePdfTool() {
  const [pdfFiles, setPdfFiles] = React.useState<PdfItem[]>([]);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [mergedPdfUrl, setMergedPdfUrl] = React.useState<string | null>(null);
  const [mergedSize, setMergedSize] = React.useState<number>(0);
  const [error, setError] = React.useState<string | null>(null);

  const handleFiles = async (fileList: FileList | File[]) => {
    setError(null);
    setMergedPdfUrl(null);

    for (const file of Array.from(fileList)) {
      if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) continue;
      try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageCount = doc.getPageCount();

        setPdfFiles((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
            buffer,
            pageCount,
          },
        ]);
      } catch (err: any) {
        console.error(err);
        setError(`Failed to read "${file.name}". File might be password protected or corrupted.`);
      }
    }
  };

  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((p) => p.id !== id));
    setMergedPdfUrl(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setPdfFiles((prev) => {
      const copy = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return prev;
      const tmp = copy[index];
      copy[index] = copy[target];
      copy[target] = tmp;
      return copy;
    });
    setMergedPdfUrl(null);
  };

  const mergeDocuments = async () => {
    if (pdfFiles.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const mergedDoc = await PDFDocument.create();

      for (const item of pdfFiles) {
        const srcDoc = await PDFDocument.load(item.buffer, { ignoreEncryption: true });
        const copiedPages = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices());
        copiedPages.forEach((page) => mergedDoc.addPage(page));
      }

      const mergedBytes = await mergedDoc.save();
      const blob = new Blob([mergedBytes as any], { type: "application/pdf" });
      setMergedPdfUrl(URL.createObjectURL(blob));
      setMergedSize(blob.size);
    } catch (err: any) {
      console.error(err);
      setError("Failed to merge PDF files. Please ensure files are valid and unencrypted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMerged = () => {
    if (!mergedPdfUrl) return;
    const a = document.createElement("a");
    a.href = mergedPdfUrl;
    a.download = "merged-document.pdf";
    a.click();
  };

  const totalPages = pdfFiles.reduce((acc, cur) => acc + cur.pageCount, 0);

  return (
    <div className="w-full space-y-6">
      {/* Upload area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById("merge-pdf-input")?.click()}
        className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
      >
        <input
          id="merge-pdf-input"
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400 shadow-xs mb-5 group-hover:scale-105 transition-transform">
          <UploadCloud className="h-8 w-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50">
          Select PDF files
        </h3>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-md">
          Select 2 or more PDF documents. Reorder them as desired and merge into a single PDF file instantly.
        </p>
        <span className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-md group-hover:bg-red-700 transition-colors">
          Choose PDF Files
        </span>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      {pdfFiles.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-base font-bold text-zinc-800 dark:text-zinc-200">
            <span>
              <strong>{pdfFiles.length}</strong> files ({totalPages} total pages)
            </span>
            <button
              onClick={() => {
                setPdfFiles([]);
                setMergedPdfUrl(null);
              }}
              className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Files List */}
          <div className="space-y-3">
            {pdfFiles.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {idx + 1}. {file.name}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {file.pageCount} {file.pageCount === 1 ? "page" : "pages"} • {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => moveFile(idx, "up")}
                    disabled={idx === 0}
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, "down")}
                    disabled={idx === pdfFiles.length - 1}
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            onClick={() => document.getElementById("merge-pdf-input")?.click()}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-red-600 cursor-pointer transition-colors"
          >
            <Plus className="h-5 w-5" /> Add More PDF Files
          </div>

          {/* Merge button */}
          {!mergedPdfUrl ? (
            <button
              onClick={mergeDocuments}
              disabled={isProcessing || pdfFiles.length < 2}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Merging PDFs…
                </>
              ) : (
                `Merge ${pdfFiles.length} PDF Documents`
              )}
            </button>
          ) : (
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                Successfully merged into single PDF ({(mergedSize / 1024).toFixed(1)} KB)
              </div>
              <button
                onClick={downloadMerged}
                className="w-full h-13 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Download className="h-5 w-5" />
                Download Merged PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
