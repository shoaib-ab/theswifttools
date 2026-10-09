"use client";

import * as React from "react";
import { Percent, ArrowRight, Copy, Check } from "lucide-react";

export function PercentageCalculatorTool() {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = React.useState<number>(15);
  const [val1B, setVal1B] = React.useState<number>(200);

  // Mode 2: X is what percent of Y?
  const [val2A, setVal2A] = React.useState<number>(25);
  const [val2B, setVal2B] = React.useState<number>(100);

  // Mode 3: Percentage Change from X to Y?
  const [val3A, setVal3A] = React.useState<number>(50);
  const [val3B, setVal3B] = React.useState<number>(75);

  // Mode 4: Value +/- X%
  const [val4A, setVal4A] = React.useState<number>(100);
  const [val4Pct, setVal4Pct] = React.useState<number>(20);

  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  // Results
  const res1 = (val1A / 100) * val1B;
  const res2 = val2B !== 0 ? (val2A / val2B) * 100 : 0;
  const res3Diff = val3B - val3A;
  const res3Pct = val3A !== 0 ? (res3Diff / Math.abs(val3A)) * 100 : 0;
  const res4Add = val4A + (val4A * val4Pct) / 100;
  const res4Sub = val4A - (val4A * val4Pct) / 100;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* 4 Multi-calculator grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: What is X% of Y? */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2.5">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-blue-500" /> Percentage of a Number
            </h3>
            <span className="text-[11px] text-zinc-400">X% of Y</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span>What is</span>
            <input
              type="number"
              value={val1A}
              onChange={(e) => setVal1A(Number(e.target.value))}
              className="w-16 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>% of</span>
            <input
              type="number"
              value={val1B}
              onChange={(e) => setVal1B(Number(e.target.value))}
              className="w-24 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>?</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-zinc-500">Result</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {Number(res1.toFixed(4))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(String(res1), "c1")}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 hover:text-zinc-900"
            >
              {copiedKey === "c1" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2.5">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-emerald-500" /> Find Percentage Rate
            </h3>
            <span className="text-[11px] text-zinc-400">X is ?% of Y</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              type="number"
              value={val2A}
              onChange={(e) => setVal2A(Number(e.target.value))}
              className="w-20 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={val2B}
              onChange={(e) => setVal2B(Number(e.target.value))}
              className="w-20 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>?</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-zinc-500">Result</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {Number(res2.toFixed(2))}%
              </div>
            </div>
            <button
              onClick={() => handleCopy(`${res2.toFixed(2)}%`, "c2")}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 hover:text-zinc-900"
            >
              {copiedKey === "c2" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Card 3: Percentage Increase / Decrease */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2.5">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-amber-500" /> Percentage Change
            </h3>
            <span className="text-[11px] text-zinc-400">From X to Y</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span>From</span>
            <input
              type="number"
              value={val3A}
              onChange={(e) => setVal3A(Number(e.target.value))}
              className="w-20 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>to</span>
            <input
              type="number"
              value={val3B}
              onChange={(e) => setVal3B(Number(e.target.value))}
              className="w-20 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-zinc-500">
                {res3Pct >= 0 ? "Increase" : "Decrease"}
              </div>
              <div className={`text-xl font-bold ${res3Pct >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {res3Pct >= 0 ? `+${res3Pct.toFixed(2)}%` : `${res3Pct.toFixed(2)}%`}
              </div>
            </div>
            <button
              onClick={() => handleCopy(`${res3Pct.toFixed(2)}%`, "c3")}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-600 hover:text-zinc-900"
            >
              {copiedKey === "c3" ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Card 4: Add / Subtract Percentage */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2.5">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-purple-500" /> Add or Subtract %
            </h3>
            <span className="text-[11px] text-zinc-400">Value ± %</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              type="number"
              value={val4A}
              onChange={(e) => setVal4A(Number(e.target.value))}
              className="w-20 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>±</span>
            <input
              type="number"
              value={val4Pct}
              onChange={(e) => setVal4Pct(Number(e.target.value))}
              className="w-16 h-8 px-2 text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold"
            />
            <span>%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <div className="text-[11px] text-zinc-500">Plus {val4Pct}%</div>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {Number(res4Add.toFixed(2))}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-zinc-500">Minus {val4Pct}%</div>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {Number(res4Sub.toFixed(2))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
