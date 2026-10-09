"use client";

import * as React from "react";
import { ListFilter, Copy, Check, RotateCcw, Download } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = React.useState<string>(
    "apple\nbanana\norange\napple\ngrape\nbanana\nwatermelon\napple"
  );
  const [caseSensitive, setCaseSensitive] = React.useState<boolean>(false);
  const [trimLines, setTrimLines] = React.useState<boolean>(true);
  const [removeEmpty, setRemoveEmpty] = React.useState<boolean>(true);
  const [sortOrder, setSortOrder] = React.useState<"original" | "asc" | "desc">("original");
  const [copied, setCopied] = React.useState(false);

  const processed = React.useMemo(() => {
    let rawLines = input.split(/\r?\n/);
    const originalCount = rawLines.length;

    if (trimLines) {
      rawLines = rawLines.map((l) => l.trim());
    }

    if (removeEmpty) {
      rawLines = rawLines.filter((l) => l.length > 0);
    }

    const seen = new Set<string>();
    let uniqueLines: string[] = [];

    rawLines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    });

    if (sortOrder === "asc") {
      uniqueLines.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === "desc") {
      uniqueLines.sort((a, b) => b.localeCompare(a));
    }

    const resultText = uniqueLines.join("\n");
    const duplicatesRemoved = originalCount - uniqueLines.length;

    return {
      resultText,
      originalCount,
      uniqueCount: uniqueLines.length,
      duplicatesRemoved: Math.max(0, duplicatesRemoved),
    };
  }, [input, caseSensitive, trimLines, removeEmpty, sortOrder]);

  const copyResult = () => {
    navigator.clipboard.writeText(processed.resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    const blob = new Blob([processed.resultText], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "deduplicated-lines.txt";
    a.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* Options Bar */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          Deduplication Settings
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-zinc-700 dark:text-zinc-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Case Sensitive
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Trim Leading / Trailing Whitespace
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Remove Empty Lines
          </label>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-zinc-500 shrink-0">Sort:</span>
            <div className="w-56">
              <CustomSelect<"original" | "asc" | "desc">
                value={sortOrder}
                onChange={(val) => setSortOrder(val)}
                size="xs"
                options={[
                  { value: "original", label: "Preserve Original Order" },
                  { value: "asc", label: "Alphabetical (A → Z)" },
                  { value: "desc", label: "Alphabetical (Z → A)" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 text-center shadow-xs">
          <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {processed.originalCount}
          </div>
          <div className="text-[11px] text-zinc-500">Original Lines</div>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 text-center shadow-xs">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {processed.uniqueCount}
          </div>
          <div className="text-[11px] text-zinc-500">Unique Lines</div>
        </div>
        <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 text-center shadow-xs">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {processed.duplicatesRemoved}
          </div>
          <div className="text-[11px] text-zinc-500">Duplicates Removed</div>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Input Lines
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
            placeholder="Paste lines with duplicates here..."
            rows={12}
            className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Unique Output
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyResult}
                className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={downloadResult}
                className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
              >
                <Download className="h-3 w-3" /> Save .txt
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={processed.resultText}
            rows={12}
            className="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}
