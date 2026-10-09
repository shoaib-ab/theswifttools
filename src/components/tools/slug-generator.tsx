"use client";

import * as React from "react";
import { Hash, Copy, Check, Globe, RotateCcw } from "lucide-react";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", "into", "is",
  "it", "no", "not", "of", "on", "or", "such", "that", "the", "their", "then", "there",
  "these", "they", "this", "to", "was", "will", "with"
]);

export function SlugGeneratorTool() {
  const [title, setTitle] = React.useState<string>(
    "10 Best Free Web Developer Tools for 2026 & Beyond!"
  );
  const [separator, setSeparator] = React.useState<string>("-");
  const [toLower, setToLower] = React.useState<boolean>(true);
  const [removeStopWords, setRemoveStopWords] = React.useState<boolean>(false);
  const [domainPrefix, setDomainPrefix] = React.useState<string>("https://mywebsite.com/posts/");
  const [copiedSlug, setCopiedSlug] = React.useState(false);
  const [copiedUrl, setCopiedUrl] = React.useState(false);

  const slug = React.useMemo(() => {
    if (!title.trim()) return "";

    let processed = title.trim();

    // Remove stop words if checked
    if (removeStopWords) {
      const words = processed.split(/\s+/);
      processed = words
        .filter((w) => !STOP_WORDS.has(w.toLowerCase().replace(/[^a-z0-9]/g, "")))
        .join(" ");
    }

    if (toLower) {
      processed = processed.toLowerCase();
    }

    // Replace non-alphanumeric characters with separator
    const sepEscaped = separator === "-" ? "\\-" : separator;
    const regex = new RegExp(`[^a-zA-Z0-9]+`, "g");
    let result = processed.replace(regex, separator);

    // Strip leading and trailing separators
    const edgeRegex = new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, "g");
    result = result.replace(edgeRegex, "");

    return result;
  }, [title, separator, toLower, removeStopWords]);

  const fullUrl = `${domainPrefix}${slug}`;

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Input Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Hash className="h-4 w-4 text-blue-500" /> Enter Article or Page Title
          </span>
          <button
            onClick={() => setTitle("")}
            className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" /> Clear
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How to Build Fast Websites with Next.js in 2026..."
          className="w-full h-11 px-3.5 text-sm font-medium rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Options */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Separator:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSeparator("-")}
                className={`h-7 px-2.5 rounded-lg border font-mono font-bold transition-all ${
                  separator === "-"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                - (Hyphen)
              </button>
              <button
                onClick={() => setSeparator("_")}
                className={`h-7 px-2.5 rounded-lg border font-mono font-bold transition-all ${
                  separator === "_"
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                _ (Underscore)
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={toLower}
              onChange={(e) => setToLower(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Lowercase
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeStopWords}
              onChange={(e) => setRemoveStopWords(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Strip Stop Words (the, a, and, for...)
          </label>
        </div>
      </div>

      {/* Output Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
        {/* Generated Slug */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span>Generated URL Slug</span>
            <button
              onClick={copySlug}
              disabled={!slug}
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 font-medium disabled:opacity-40"
            >
              {copiedSlug ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSlug ? "Copied" : "Copy Slug"}
            </button>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl border border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20 font-mono text-sm font-semibold text-blue-700 dark:text-blue-300 select-all">
            <span>/{slug || "..."}</span>
          </div>
        </div>

        {/* Full URL Live Preview */}
        <div className="space-y-1.5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-emerald-500" /> Full URL Preview
            </span>
            <button
              onClick={copyUrl}
              disabled={!slug}
              className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 font-medium disabled:opacity-40"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedUrl ? "Copied URL" : "Copy Full URL"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={domainPrefix}
              onChange={(e) => setDomainPrefix(e.target.value)}
              className="w-1/3 h-9 px-2.5 text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
            />
            <div className="flex-1 h-9 px-3 flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 font-mono text-xs text-zinc-700 dark:text-zinc-300 truncate">
              {fullUrl}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
