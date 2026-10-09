"use client";

import * as React from "react";
import { Link2, Copy, Check, RotateCcw, AlertCircle } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

export function UrlEncodeDecodeTool() {
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [encodeType, setEncodeType] = React.useState<"component" | "full">("component");
  const [input, setInput] = React.useState<string>(
    "https://example.com/search?query=web tools & fast=1#results"
  );
  const [output, setOutput] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        if (encodeType === "component") {
          setOutput(encodeURIComponent(input));
        } else {
          setOutput(encodeURI(input));
        }
        setError(null);
      } else {
        if (encodeType === "component") {
          setOutput(decodeURIComponent(input));
        } else {
          setOutput(decodeURI(input));
        }
        setError(null);
      }
    } catch (err: any) {
      setError("Malformed URL encoding sequence.");
      setOutput("");
    }
  }, [input, mode, encodeType]);

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMode("encode")}
              className={`h-10 px-5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                mode === "encode"
                  ? "border-red-600 bg-red-600 text-white shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
              }`}
            >
              Encode URL
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`h-10 px-5 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                mode === "decode"
                  ? "border-red-600 bg-red-600 text-white shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
              }`}
            >
              Decode URL
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 shrink-0">Method:</span>
            <div className="w-72">
              <CustomSelect<"component" | "full">
                value={encodeType}
                onChange={(val) => setEncodeType(val)}
                size="xs"
                options={[
                  {
                    value: "component",
                    label: "encodeURIComponent",
                    description: "Standard query parameters",
                  },
                  {
                    value: "full",
                    label: "encodeURI",
                    description: "Preserves http:// and slashes",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {mode === "encode" ? "Raw URL / Text" : "Encoded URL"}
            </span>
            <button
              onClick={() => setInput("")}
              className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste text or URL here..."
            className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {mode === "encode" ? "Encoded Result" : "Decoded Result"}
            </span>
            <button
              onClick={copyResult}
              disabled={!output}
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
              value={output}
              rows={10}
              className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-y"
            />
          )}
        </div>
      </div>
    </div>
  );
}
