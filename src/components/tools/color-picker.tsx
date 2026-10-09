"use client";
import * as React from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
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

function randomHex(): string {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      title={`Copy ${value}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function ColorPickerTool() {
  const [hex, setHex] = React.useState("#3b82f6");
  const [inputHex, setInputHex] = React.useState("#3b82f6");

  const rgb = hexToRgb(hex) ?? { r: 59, g: 130, b: 246 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexStr = hex.toUpperCase();
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value);
    setInputHex(e.target.value);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputHex(val);
    const normalized = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
      setHex(normalized);
    }
  };

  const handleRgbSlider = (channel: "r" | "g" | "b", value: number) => {
    const next = { ...rgb, [channel]: value };
    const h = next.r.toString(16).padStart(2, "0");
    const g2 = next.g.toString(16).padStart(2, "0");
    const b2 = next.b.toString(16).padStart(2, "0");
    const newHex = `#${h}${g2}${b2}`;
    setHex(newHex);
    setInputHex(newHex);
  };

  return (
    <div className="w-full space-y-6">
      {/* Main picker card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm overflow-hidden">
        {/* Color swatch area */}
        <div
          className="w-full h-40 sm:h-56 transition-colors duration-150"
          style={{ backgroundColor: hex }}
        />

        <div className="p-6 space-y-5">
          {/* Native color picker + hex input */}
          <div className="flex items-center gap-3">
            <label className="relative flex h-12 w-12 shrink-0 cursor-pointer rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-sm">
              <input
                type="color"
                value={hex}
                onChange={handleColorInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Color picker"
              />
              <span className="block w-full h-full rounded-xl" style={{ backgroundColor: hex }} />
            </label>
            <div className="flex-1">
              <label className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-1">HEX Value</label>
              <input
                type="text"
                value={inputHex}
                onChange={handleHexInput}
                maxLength={7}
                className="h-10 w-full px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all uppercase"
                placeholder="#000000"
              />
            </div>
            <button
              onClick={() => { const c = randomHex(); setHex(c); setInputHex(c); }}
              className="h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-xs font-medium flex items-center gap-1.5"
              title="Random color"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Random</span>
            </button>
          </div>

          {/* RGB Sliders */}
          <div className="space-y-3">
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">RGB Sliders</div>
            {(["r", "g", "b"] as const).map((ch) => {
              const colors = { r: "#ef4444", g: "#22c55e", b: "#3b82f6" };
              const labels = { r: "Red", g: "Green", b: "Blue" };
              return (
                <div key={ch} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-medium text-zinc-600 dark:text-zinc-400">{labels[ch]}</span>
                  <input
                    type="range"
                    min={0}
                    max={255}
                    value={rgb[ch]}
                    onChange={(e) => handleRgbSlider(ch, Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: colors[ch] }}
                  />
                  <span className="w-8 text-right text-xs font-mono text-zinc-700 dark:text-zinc-300">{rgb[ch]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "HEX", value: hexStr },
          { label: "RGB", value: rgbStr },
          { label: "HSL", value: hslStr },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-4 flex items-center justify-between gap-2"
          >
            <div>
              <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
              <div className="text-sm font-mono text-zinc-900 dark:text-zinc-100 break-all">{value}</div>
            </div>
            <CopyButton value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
