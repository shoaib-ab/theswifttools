"use client";
import * as React from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";

// ─── Color math helpers ───────────────────────────────────────────────────
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number) {
  const sl = s / 100, ll = l / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * sl;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ll - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToCmyk(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────
export function HexToRgbTool() {
  const [hexInput, setHexInput] = React.useState("#3B82F6");
  const [rgbInput, setRgbInput] = React.useState({ r: "59", g: "130", b: "246" });
  const [hslInput, setHslInput] = React.useState({ h: "217", s: "91", l: "60" });
  const [activeFrom, setActiveFrom] = React.useState<"hex" | "rgb" | "hsl">("hex");

  // Derive current rgb from whatever is active
  const currentRgb: { r: number; g: number; b: number } = React.useMemo(() => {
    if (activeFrom === "hex") return hexToRgb(hexInput) ?? { r: 0, g: 0, b: 0 };
    if (activeFrom === "rgb") return { r: +rgbInput.r || 0, g: +rgbInput.g || 0, b: +rgbInput.b || 0 };
    const h = +hslInput.h || 0, s = +hslInput.s || 0, l = +hslInput.l || 0;
    return hslToRgb(h, s, l);
  }, [activeFrom, hexInput, rgbInput, hslInput]);

  const derived = React.useMemo(() => {
    const { r, g, b } = currentRgb;
    const hsl = rgbToHsl(r, g, b);
    const cmyk = rgbToCmyk(r, g, b);
    return {
      hex: rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    };
  }, [currentRgb]);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-6">
        {/* Color preview */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0" style={{ backgroundColor: derived.hex }} />
          <div>
            <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{derived.hex}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{derived.rgb}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-zinc-100 dark:border-zinc-800">
          {(["hex", "rgb", "hsl"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFrom(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-t-md -mb-px border-b-2 transition-colors ${
                activeFrom === tab
                  ? "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
          <span className="ml-1 text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1"><ArrowLeftRight className="h-3 w-3" />Convert from</span>
        </div>

        {/* Input: HEX */}
        {activeFrom === "hex" && (
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">HEX Color Code</label>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              maxLength={7}
              className="h-11 w-full px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all uppercase"
              placeholder="#RRGGBB"
            />
          </div>
        )}

        {/* Input: RGB */}
        {activeFrom === "rgb" && (
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">RGB Values (0–255)</label>
            <div className="grid grid-cols-3 gap-2">
              {(["r", "g", "b"] as const).map((ch) => (
                <div key={ch}>
                  <span className="block text-[11px] text-zinc-400 mb-1 uppercase">{ch}</span>
                  <input
                    type="number" min={0} max={255}
                    value={rgbInput[ch]}
                    onChange={(e) => setRgbInput((p) => ({ ...p, [ch]: e.target.value }))}
                    className="h-11 w-full px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input: HSL */}
        {activeFrom === "hsl" && (
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">HSL Values</label>
            <div className="grid grid-cols-3 gap-2">
              {([["h", "H (0–360)"], ["s", "S (0–100)"], ["l", "L (0–100)"]] as const).map(([ch, label]) => (
                <div key={ch}>
                  <span className="block text-[11px] text-zinc-400 mb-1">{label}</span>
                  <input
                    type="number" min={0} max={ch === "h" ? 360 : 100}
                    value={hslInput[ch]}
                    onChange={(e) => setHslInput((p) => ({ ...p, [ch]: e.target.value }))}
                    className="h-11 w-full px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "HEX", value: derived.hex },
          { label: "RGB", value: derived.rgb },
          { label: "HSL", value: derived.hsl },
          { label: "CMYK", value: derived.cmyk },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
              <div className="text-sm font-mono text-zinc-900 dark:text-zinc-100">{value}</div>
            </div>
            <CopyButton value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
