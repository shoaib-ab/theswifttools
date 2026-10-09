"use client";

import * as React from "react";
import { Type, Copy, Check, RotateCcw } from "lucide-react";

export function CaseConverterTool() {
  const [text, setText] = React.useState<string>("The quick brown fox jumps over the lazy dog");
  const [copied, setCopied] = React.useState(false);

  // Conversion functions
  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());

  const toSentence = () => {
    const res = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(res);
  };

  const toTitle = () => {
    const res = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    setText(res);
  };

  const toCamel = () => {
    const words = text
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .trim()
      .split(/\s+/);
    if (!words.length) return;
    const res = words
      .map((w, i) =>
        i === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join("");
    setText(res);
  };

  const toPascal = () => {
    const words = text
      .replace(/[^a-zA-Z0-9 ]/g, " ")
      .trim()
      .split(/\s+/);
    const res = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");
    setText(res);
  };

  const toSnake = () => {
    const res = text
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    setText(res);
  };

  const toKebab = () => {
    const res = text
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setText(res);
  };

  const toAlternating = () => {
    let res = "";
    for (let i = 0; i < text.length; i++) {
      res += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }
    setText(res);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Transformation Action Buttons */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          Transform Case
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "UPPERCASE", fn: toUpper },
            { label: "lowercase", fn: toLower },
            { label: "Sentence case", fn: toSentence },
            { label: "Title Case", fn: toTitle },
            { label: "camelCase", fn: toCamel },
            { label: "PascalCase", fn: toPascal },
            { label: "snake_case", fn: toSnake },
            { label: "kebab-case", fn: toKebab },
            { label: "aLtErNaTiNg", fn: toAlternating },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.fn}
              className="h-9 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-white dark:hover:bg-zinc-900 transition-colors shadow-2xs"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <Type className="h-4 w-4 text-blue-500" /> Text Content
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyText}
              disabled={!text}
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 disabled:opacity-40 transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={() => setText("")}
              disabled={!text}
              className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1 disabled:opacity-40 transition-colors"
            >
              <RotateCcw className="h-3 w-3" /> Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert between case formats..."
          rows={8}
          className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />

        <div className="text-[11px] text-zinc-500">
          Character Count: {text.length} • Word Count: {text.trim() ? text.trim().split(/\s+/).length : 0}
        </div>
      </div>
    </div>
  );
}
