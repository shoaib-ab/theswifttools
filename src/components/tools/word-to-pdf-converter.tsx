"use client";
import * as React from "react";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import mammoth from "mammoth";
import { jsPDF } from "jspdf";
type StepStatus = "idle" | "reading" | "converting" | "ready" | "error";
export function WordToPdfConverter() {
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<StepStatus>("idle");
  const [progress, setProgress] = React.useState(0);
  const [statusText, setStatusText] = React.useState("");
  const [pdfBlobUrl, setPdfBlobUrl] = React.useState<string | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };
  const processSelectedFile = async (selectedFile: File) => {
    if (!selectedFile.name.endsWith(".docx") && !selectedFile.name.endsWith(".doc")) {
      setErrorMessage("Please upload a valid .docx or .doc file.");
      return;
    }
    setErrorMessage(null);
    setFile(selectedFile);
    setStatus("reading");
    setProgress(20);
    setStatusText("Reading file...");
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      setProgress(50);
      setStatus("converting");
      setStatusText("Converting document...");
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      setProgress(75);
      setStatusText("Preparing PDF...");
      const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - margin * 2;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const textContent = tempDiv.innerText || tempDiv.textContent || "";
      const splitText = doc.splitTextToSize(textContent, contentWidth);
      let cursorY = margin + 10;
      const lineHeight = 16;
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      for (let i = 0; i < splitText.length; i++) {
        if (cursorY + lineHeight > pageHeight - margin) {
          doc.addPage();
          cursorY = margin + 10;
        }
        doc.text(splitText[i], margin, cursorY);
        cursorY += lineHeight;
      }
      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(url);
      setProgress(100);
      setStatus("ready");
      setStatusText("Conversion complete! Ready for download.");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err?.message || "Failed to parse Word document in the browser.");
    }
  };
  const handleDownload = () => {
    if (!pdfBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = pdfBlobUrl;
    a.download = (file ? file.name.replace(/\.[>/.]+$/, "") : "document") + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleReset = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setStatusText("");
    setPdfBlobUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm">
        {status === "idle" ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={"group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 px-6 text-center cursor-pointer transition-all " + (isDragOver ? "border-red-500 bg-red-50/50 dark:border-red-500 dark:bg-red-950/20" : "border-zinc-300 hover:border-red-400 bg-zinc-50/50 dark:border-zinc-700/80 dark:bg-zinc-950/40")}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".docx,.doc" className="hidden" />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 group-hover:scale-105 transition-transform shadow-sm">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Drop your Word document here, or <span className="text-red-600 dark:text-red-400 underline underline-offset-4">browse files</span>
            </h3>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              Supports .docx and .doc • Instant conversion • 100% private in your browser
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
                Select Word File
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div className="flex items-center gap-3.5 truncate">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="truncate text-left">
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">{file?.name}</div>
                  <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 font-mono">{file ? (file.size / 1024).toFixed(1) : 0} KB • Ready to convert</div>
                </div>
              </div>
              <button onClick={handleReset} className="text-sm font-semibold text-zinc-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer">
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  {status === "ready" ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Sparkles className="h-5 w-5 text-red-500 animate-spin" />}
                  {statusText}
                </span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{progress}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-red-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {status === "ready" && (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex-1 h-14 bg-red-600 hover:bg-red-700 text-white font-bold gap-2 shadow-md hover:shadow-lg rounded-xl flex items-center justify-center text-base sm:text-lg transition-all cursor-pointer"
                >
                  <Download className="h-5 w-5" /> Download Converted PDF
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto h-14 px-6 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold rounded-xl text-base transition-colors cursor-pointer"
                >
                  Convert Another File
                </button>
              </div>
            )}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 flex items-center gap-2.5 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 text-xs"><AlertCircle className="h-4 w-4 shrink-0" /><span>{errorMessage}</span></div>
        )}
      </div>
      {status === "ready" && pdfBlobUrl && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-zinc-500" /><h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Browser PDF Preview</h4></div>
            <span className="text-[11px] font-mono text-zinc-400">Document Preview</span>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-950 h-[480px]"><iframe src={pdfBlobUrl} className="w-full h-full border-0" title="PDF Document Preview" /></div>
        </div>
      )}
    </div>
  );
}
