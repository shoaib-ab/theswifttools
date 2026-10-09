"use client";

import * as React from "react";
import { Braces, Copy, Check, RotateCcw, Download, AlertCircle, CheckCircle } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

export function JsonFormatterTool() {
  const [input, setInput] = React.useState<string>(
    JSON.stringify(
      {
        site: "TheSwiftTools",
        version: "2.0",
        active: true,
        tools: ["Word to PDF", "Image Resizer", "Color Picker"],
        settings: { theme: "dark", clientOnly: true },
      },
      null,
      2
    )
  );

  const [indent, setIndent] = React.useState<number>(2);
  const [copied, setCopied] = React.useState(false);
  const [status, setStatus] = React.useState<{ valid: boolean; message: string }>({
    valid: true,
    message: "Valid JSON",
  });

  const validateAndFormat = (indentSpaces: number) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSpaces);
      setInput(formatted);
      setStatus({ valid: true, message: "Valid JSON formatted successfully" });
    } catch (err: any) {
      setStatus({ valid: false, message: err.message || "Invalid JSON syntax" });
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setStatus({ valid: true, message: "Valid JSON minified successfully" });
    } catch (err: any) {
      setStatus({ valid: false, message: err.message || "Invalid JSON syntax" });
    }
  };

  const checkValidation = (val: string) => {
    if (!val.trim()) {
      setStatus({ valid: true, message: "Empty JSON" });
      return;
    }
    try {
      JSON.parse(val);
      setStatus({ valid: true, message: "Valid JSON" });
    } catch (err: any) {
      setStatus({ valid: false, message: err.message || "Invalid JSON syntax" });
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    checkValidation(val);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([input], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formatted.json";
    a.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Braces className="h-4 w-4 text-blue-500" /> Actions:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => validateAndFormat(indent)}
                className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                Beautify / Format
              </button>
              <button
                onClick={minify}
                className="h-10 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                Minify
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="shrink-0">Indent:</span>
              <div className="w-28">
                <CustomSelect<number>
                  value={indent}
                  onChange={(val) => {
                    setIndent(val);
                    validateAndFormat(val);
                  }}
                  size="xs"
                  options={[
                    { value: 2, label: "2 Spaces" },
                    { value: 4, label: "4 Spaces" },
                  ]}
                />
              </div>
            </div>

            <button
              onClick={copyJson}
              className="h-8 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1 hover:bg-zinc-50"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={downloadJson}
              className="h-8 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1 hover:bg-zinc-50"
            >
              <Download className="h-3 w-3" /> Save .json
            </button>
          </div>
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            {status.valid ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="h-3.5 w-3.5" /> {status.message}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                <AlertCircle className="h-3.5 w-3.5" /> {status.message}
              </span>
            )}
          </div>
          <button
            onClick={() => setInput("")}
            className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Clear
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          rows={16}
          placeholder="Paste or type raw JSON here..."
          spellCheck={false}
          className="w-full p-4 font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y leading-relaxed"
        />

        <div className="flex justify-between text-[11px] text-zinc-500">
          <span>{input.length} characters</span>
          <span>{input.split("\n").length} lines</span>
        </div>
      </div>
    </div>
  );
}
