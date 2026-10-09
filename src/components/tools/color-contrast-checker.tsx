"use client";
import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return { r: parseInt(clean.slice(0, 2), 16), g: parseInt(clean.slice(2, 4), 16), b: parseInt(clean.slice(4, 6), 16) };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }): number {
  const l1 = relativeLuminance(fg.r, fg.g, fg.b);
  const l2 = relativeLuminance(bg.r, bg.g, bg.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ColorContrastTool() {
  const [fg, setFg] = React.useState("#1a1a2e");
  const [bg, setBg] = React.useState("#f8fafc");

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const ratio = fgRgb && bgRgb ? contrastRatio(fgRgb, bgRgb) : null;
  const ratioDisplay = ratio ? ratio.toFixed(2) : "--";

  const aaNormal = ratio ? ratio >= 4.5 : false;
  const aaLarge = ratio ? ratio >= 3 : false;
  const aaaaNormal = ratio ? ratio >= 7 : false;
  const aaaLarge = ratio ? ratio >= 4.5 : false;

  const Badge = ({ pass, label }: { pass: boolean; label: string }) => (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
      pass ? "bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50"
           : "bg-red-50 text-red-700 border border-red-200/70 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50"
    }`}>
      {pass ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Live preview */}
      <div
        className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-8 text-center space-y-2 shadow-sm"
        style={{ backgroundColor: bg }}
      >
        <p className="text-2xl font-bold" style={{ color: fg }}>Large Text Sample (18pt+)</p>
        <p className="text-sm" style={{ color: fg }}>Normal text sample — the quick brown fox jumps over the lazy dog. This sentence demonstrates how readable your color combination is at standard body text sizes.</p>
        <p className="text-xs" style={{ color: fg }}>Small text (12pt) — contrast requirements are stricter at smaller sizes.</p>
      </div>

      {/* Color pickers */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { label: "Foreground (Text)", color: fg, setColor: setFg },
            { label: "Background", color: bg, setColor: setBg },
          ] as const).map(({ label, color, setColor }) => (
            <div key={label} className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
              <div className="flex items-center gap-2">
                <label className="relative h-10 w-10 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 cursor-pointer shrink-0">
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <span className="block w-full h-full" style={{ backgroundColor: color }} />
                </label>
                <input
                  type="text"
                  value={color.toUpperCase()}
                  onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColor(v); }}
                  maxLength={7}
                  className="h-10 flex-1 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 uppercase"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Ratio display */}
        <div className="flex items-center justify-center py-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">{ratioDisplay}:1</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Contrast Ratio</div>
          </div>
        </div>

        {/* WCAG badges */}
        <div className="grid grid-cols-2 gap-2">
          <Badge pass={aaLarge} label="AA Large Text" />
          <Badge pass={aaNormal} label="AA Normal Text" />
          <Badge pass={aaaLarge} label="AAA Large Text" />
          <Badge pass={aaaaNormal} label="AAA Normal Text" />
        </div>
      </div>
    </div>
  );
}
