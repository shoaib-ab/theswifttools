"use client";

import * as React from "react";
import { FileText, Clock, Volume2, Copy, Check, RotateCcw } from "lucide-react";

export function WordCounterTool() {
  const [text, setText] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  const stats = React.useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMin: 0,
        speakingTimeMin: 0,
        topWords: [] as { word: string; count: number }[],
      };
    }

    const wordsArray = trimmed.match(/\b[^\s]+\b/g) || [];
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: average 200 words per minute
    const readingTimeMin = Math.ceil(words / 200);
    // Speaking time: average 130 words per minute
    const speakingTimeMin = Math.ceil(words / 130);

    // Top words density
    const wordFreq: { [key: string]: number } = {};
    wordsArray.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean.length > 2) {
        wordFreq[clean] = (wordFreq[clean] || 0) + 1;
      }
    });

    const topWords = Object.entries(wordFreq)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
      topWords,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: "Words", value: stats.words.toLocaleString(), highlight: true },
          { label: "Characters", value: stats.charsWithSpaces.toLocaleString() },
          { label: "No Spaces", value: stats.charsNoSpaces.toLocaleString() },
          { label: "Sentences", value: stats.sentences.toLocaleString() },
          { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
          { label: "Reading Time", value: `~${stats.readingTimeMin} min` },
        ].map((item) => (
          <div
            key={item.label}
            className={`p-3.5 rounded-2xl border text-center shadow-xs ${
              item.highlight
                ? "border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/30"
                : "border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60"
            }`}
          >
            <div className={`text-xl font-bold ${item.highlight ? "text-blue-600 dark:text-blue-400" : "text-zinc-900 dark:text-zinc-100"}`}>
              {item.value}
            </div>
            <div className="text-[11px] text-zinc-500 font-medium mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Text Area Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            <FileText className="h-4 w-4 text-blue-500" /> Enter or Paste Text
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
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
          placeholder="Start typing or paste your content here to count words, characters, sentences, paragraphs, and reading time..."
          rows={10}
          className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />

        {/* Quick estimate badges */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-500" /> Reading: <strong>{stats.readingTimeMin} min</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="h-3.5 w-3.5 text-emerald-500" /> Speaking: <strong>{stats.speakingTimeMin} min</strong>
          </span>
        </div>
      </div>

      {/* Top Keywords Density */}
      {stats.topWords.length > 0 && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Top Word Frequency
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map((item) => (
              <div
                key={item.word}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2"
              >
                <span>{item.word}</span>
                <span className="h-4 px-1.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold">
                  {item.count}×
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
