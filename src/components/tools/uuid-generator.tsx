"use client";

import * as React from "react";
import { Fingerprint, Copy, Check, RefreshCw } from "lucide-react";

export function UuidGeneratorTool() {
  const [quantity, setQuantity] = React.useState<number>(5);
  const [useUppercase, setUseUppercase] = React.useState<boolean>(false);
  const [useHyphens, setUseHyphens] = React.useState<boolean>(true);
  const [useBraces, setUseBraces] = React.useState<boolean>(false);
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const generateUuids = React.useCallback(() => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = crypto.randomUUID();
      if (!useHyphens) id = id.replace(/-/g, "");
      if (useUppercase) id = id.toUpperCase();
      if (useBraces) id = `{${id}}`;
      list.push(id);
    }
    setUuids(list);
  }, [quantity, useUppercase, useHyphens, useBraces]);

  React.useEffect(() => {
    generateUuids();
  }, [generateUuids]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySingle = (val: string, idx: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Options Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Fingerprint className="h-4 w-4 text-blue-500" /> Generator Settings
          </span>
          <button
            onClick={generateUuids}
            className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" /> Regenerate
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-zinc-700 dark:text-zinc-300">
          {/* Quantity */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-medium">Quantity:</span>
              <span className="font-semibold text-blue-600">{quantity}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-auto pb-1">
            <input
              type="checkbox"
              checked={useHyphens}
              onChange={(e) => setUseHyphens(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Include Hyphens (-)
          </label>

          <label className="flex items-center gap-2 cursor-pointer mt-auto pb-1">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            UPPERCASE
          </label>

          <label className="flex items-center gap-2 cursor-pointer mt-auto pb-1">
            <input
              type="checkbox"
              checked={useBraces}
              onChange={(e) => setUseBraces(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Enclose in Braces &#123; &#125;
          </label>
        </div>
      </div>

      {/* Generated List */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Generated UUID v4 Identifiers ({uuids.length})
          </span>
          <button
            onClick={copyAll}
            className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 font-medium"
          >
            {copiedAll ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            {copiedAll ? "Copied All" : "Copy All"}
          </button>
        </div>

        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {uuids.map((id, idx) => (
            <div
              key={id + idx}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-zinc-300 transition-colors"
            >
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate select-all">
                {id}
              </span>
              <button
                onClick={() => copySingle(id, idx)}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shrink-0"
                title="Copy UUID"
              >
                {copiedIdx === idx ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
