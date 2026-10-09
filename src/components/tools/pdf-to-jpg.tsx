"use client";

import * as React from "react";
import { UploadCloud, Download, FileText, CheckCircle2 } from "lucide-react";

interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
}

export function PdfToJpgTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [pages, setPages] = React.useState<RenderedPage[]>([]);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = async (f: File) => {
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) return;
    setError(null);
    setFile(f);
    setPages([]);
    setIsProcessing(true);
    setProgress("Loading PDF document…");

    try {
      // Dynamic import to avoid SSR issues
      const pdfjsLib = await import("pdfjs-dist");
      // Set worker source
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "3.11.174"}/pdf.worker.min.js`;
      }

      const buffer = await f.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      const rendered: RenderedPage[] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Rendering page ${i} of ${numPages}…`);
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 }); // High quality 1.5x scale

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await (page.render as any)({ canvas, canvasContext: ctx, viewport }).promise;
          const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
          rendered.push({ pageNumber: i, dataUrl });
        }
      }

      setPages(rendered);
      setProgress("");
    } catch (err: any) {
      console.error(err);
      setError("Failed to convert PDF pages. The file may be password-protected or unsupported.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPage = (p: RenderedPage) => {
    const a = document.createElement("a");
    a.href = p.dataUrl;
    a.download = `${file?.name?.replace(/\.[^.]+$/, "") || "document"}-page-${p.pageNumber}.jpg`;
    a.click();
  };

  const downloadAllPages = () => {
    pages.forEach((p, idx) => {
      setTimeout(() => {
        downloadPage(p);
      }, idx * 250);
    });
  };

  const resetAll = () => {
    setFile(null);
    setPages([]);
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
          onClick={() => document.getElementById("pdf-to-jpg-input")?.click()}
          className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="pdf-to-jpg-input"
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
            Convert each page of your PDF into high-quality JPG images. 100% private in your browser.
          </p>
          <span className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-md group-hover:bg-red-700 transition-colors">
            Choose PDF File
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-md">
                    {file.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                onClick={resetAll}
                className="text-sm font-semibold text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Change File
              </button>
            </div>

            {isProcessing && (
              <div className="flex items-center gap-3 text-base font-medium text-zinc-700 dark:text-zinc-300 py-4">
                <div className="h-5 w-5 rounded-full border-2 border-zinc-300 border-t-red-600 animate-spin" />
                {progress}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            {pages.length > 0 && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-base font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    Converted {pages.length} {pages.length === 1 ? "page" : "pages"} to JPG
                  </div>
                  {pages.length > 1 && (
                    <button
                      onClick={downloadAllPages}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-colors"
                    >
                      <Download className="h-4 w-4" /> Download All Pages
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {pages.map((p) => (
                    <div
                      key={p.pageNumber}
                      className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/40 p-3 flex flex-col justify-between hover:border-zinc-300 transition-all"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white border border-zinc-200 dark:border-zinc-700 shadow-xs mb-3">
                        <img
                          src={p.dataUrl}
                          alt={`Page ${p.pageNumber}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          Page {p.pageNumber}
                        </span>
                        <button
                          onClick={() => downloadPage(p)}
                          className="h-8 px-3 rounded-lg bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors shadow-xs flex items-center gap-1.5"
                        >
                          <Download className="h-3.5 w-3.5" /> Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
