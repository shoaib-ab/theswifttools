"use client";

import * as React from "react";
import { Binary, Copy, Check, RotateCcw, UploadCloud, Download, AlertCircle } from "lucide-react";

export function Base64ToolComponent() {
  const [tab, setTab] = React.useState<"text" | "file">("text");
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");

  // Text mode state
  const [inputText, setInputText] = React.useState<string>("Hello, World! 🚀");
  const [outputText, setOutputText] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  // File mode state
  const [fileName, setFileName] = React.useState<string>("");
  const [fileBase64, setFileBase64] = React.useState<string>("");
  const [isDataUri, setIsDataUri] = React.useState(true);

  // UTF-8 safe text encode/decode
  React.useEffect(() => {
    if (!inputText) {
      setOutputText("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(inputText);
        let binString = "";
        bytes.forEach((b) => (binString += String.fromCharCode(b)));
        setOutputText(btoa(binString));
        setError(null);
      } else {
        const binString = atob(inputText.trim());
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        setOutputText(new TextDecoder().decode(bytes));
        setError(null);
      }
    } catch (err: any) {
      setError("Invalid Base64 sequence or malformed input.");
      setOutputText("");
    }
  }, [inputText, mode]);

  const handleFileUpload = (f: File) => {
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      setFileBase64(dataUri);
    };
    reader.readAsDataURL(f);
  };

  const copyResult = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFileBase64 = () => {
    if (!fileBase64) return;
    const a = document.createElement("a");
    a.href = fileBase64;
    a.download = fileName ? `converted-${fileName}` : "decoded-file.bin";
    a.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-fit">
        <button
          onClick={() => setTab("text")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            tab === "text"
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Text Encode / Decode
        </button>
        <button
          onClick={() => setTab("file")}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            tab === "file"
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          File / Image to Base64
        </button>
      </div>

      {tab === "text" ? (
        <div className="space-y-4">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMode("encode")}
                className={`h-10 px-5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                  mode === "encode"
                    ? "border-red-600 bg-red-600 text-white shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
                }`}
              >
                Encode to Base64
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`h-10 px-5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                  mode === "decode"
                    ? "border-red-600 bg-red-600 text-white shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
                }`}
              >
                Decode from Base64
              </button>
            </div>
            <button
              onClick={() => setInputText("")}
              className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Clear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Textarea */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {mode === "encode" ? "Raw Text / String" : "Base64 Input"}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={mode === "encode" ? "Enter plain text to encode..." : "Paste Base64 string to decode..."}
                rows={10}
                className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
            </div>

            {/* Output Textarea */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </span>
                <button
                  onClick={() => copyResult(outputText)}
                  disabled={!outputText}
                  className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 disabled:opacity-40"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {error ? (
                <div className="h-[210px] p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              ) : (
                <textarea
                  readOnly
                  value={outputText}
                  rows={10}
                  className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-y"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {!fileBase64 ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
              }}
              onClick={() => document.getElementById("base64-file-input")?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-zinc-400 py-16 px-6 text-center cursor-pointer transition-all"
            >
              <input
                id="base64-file-input"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-sm mb-4">
                <UploadCloud className="h-8 w-8" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Upload any file or image
              </h3>
              <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
                Instantly convert images, PDFs, audio, or fonts into Data URI / Base64 format for web development.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
                <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  File: {fileName}
                </div>
                <button
                  onClick={() => {
                    setFileBase64("");
                    setFileName("");
                  }}
                  className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" /> Change File
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsDataUri(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    isDataUri
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-600"
                  }`}
                >
                  Data URI (with mime-type prefix)
                </button>
                <button
                  onClick={() => setIsDataUri(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    !isDataUri
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-600"
                  }`}
                >
                  Raw Base64 (without prefix)
                </button>
              </div>

              <textarea
                readOnly
                value={isDataUri ? fileBase64 : fileBase64.replace(/^data:.*?;base64,/, "")}
                rows={8}
                className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    copyResult(isDataUri ? fileBase64 : fileBase64.replace(/^data:.*?;base64,/, ""))
                  }
                  className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Base64"}
                </button>
                <button
                  onClick={downloadFileBase64}
                  className="h-12 px-5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" /> Download Back to File
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
