"use client";

import * as React from "react";
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

export function PasswordGeneratorTool() {
  const [length, setLength] = React.useState<number>(16);
  const [useUpper, setUseUpper] = React.useState<boolean>(true);
  const [useLower, setUseLower] = React.useState<boolean>(true);
  const [useNumbers, setUseNumbers] = React.useState<boolean>(true);
  const [useSymbols, setUseSymbols] = React.useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  const generate = React.useCallback(() => {
    let chars = "";
    if (useUpper) chars += avoidAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += avoidAmbiguous ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += avoidAmbiguous ? "23456789" : "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    const randomVals = new Uint32Array(length);
    crypto.getRandomValues(randomVals);

    let res = "";
    for (let i = 0; i < length; i++) {
      res += chars[randomVals[i] % chars.length];
    }
    setPassword(res);
  }, [length, useUpper, useLower, useNumbers, useSymbols, avoidAmbiguous]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  // Entropy calculation
  const strength = React.useMemo(() => {
    let poolSize = 0;
    if (useUpper) poolSize += 26;
    if (useLower) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 28;

    if (!poolSize) return { label: "None", percent: 0, color: "bg-zinc-300" };

    const entropy = Math.round(length * Math.log2(poolSize));

    if (entropy < 40) return { label: "Weak", percent: 25, color: "bg-red-500" };
    if (entropy < 60) return { label: "Fair", percent: 50, color: "bg-amber-500" };
    if (entropy < 80) return { label: "Good", percent: 75, color: "bg-blue-500" };
    return { label: "Very Strong", percent: 100, color: "bg-emerald-500" };
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Generated Password Box */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Generated Password
          </span>
          <span className="text-xs font-semibold flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Strength: <span className="font-bold">{strength.label}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full font-mono text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 bg-transparent focus:outline-none select-all"
          />
          <button
            onClick={generate}
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Generate new password"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={copyPassword}
            className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy Password"}
          </button>
        </div>

        {/* Strength meter bar */}
        <div className="space-y-1">
          <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${strength.percent}%` }}
              className={`h-full transition-all duration-300 ${strength.color}`}
            />
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
          <KeyRound className="h-4 w-4 text-blue-500" /> Password Options
        </h3>

        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <span>Password Length</span>
            <span className="font-bold text-blue-600">{length} characters</span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
          />
        </div>

        {/* Checkbox grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Uppercase Letters (A-Z)
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Lowercase Letters (a-z)
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Numbers (0-9)
          </label>

          <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Special Symbols (!@#$…)
          </label>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Exclude ambiguous characters (like 1, l, I, 0, O)
          </label>
        </div>
      </div>
    </div>
  );
}
