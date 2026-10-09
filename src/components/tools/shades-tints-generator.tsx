"use client";
import * as React from "react";
import { Copy, Check } from "lucide-react";

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
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
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function generateScale(hex: string): Array<{ shade: number; hex: string; textColor: string }> {
  const { h, s } = hexToHsl(hex);
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return shades.map((shade) => {
    const l = Math.round(95 - (shade / 1000) * 88);
    const colorHex = hslToHex(h, s, Math.max(5, Math.min(95, l)));
    const lightness = Math.round(95 - (shade / 1000) * 88);
    return { shade, hex: colorHex, textColor: lightness > 50 ? "#1a1a1a" : "#ffffff" };
  });
}

function Swatch({ shade, hex, textColor }: { shade: number; hex: string; textColor: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer w-full text-left"
      style={{ backgroundColor: hex }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold" style={{ color: textColor }}>{shade}</span>
        <span className="text-xs font-mono" style={{ color: textColor, opacity: 0.75 }}>{hex}</span>
      </div>
      <span style={{ color: textColor, opacity: 0.7 }}>
        {copied ? <Check className="h-3.5 w-3.5" style={{ color: "#22c55e" }} /> : <Copy className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}

export function ShadesTintsTool() {
  const [color, setColor] = React.useState("#6366f1");
  const scale = generateScale(color);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <label className="relative h-12 w-12 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 cursor-pointer shrink-0">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
            <span className="block w-full h-full" style={{ backgroundColor: color }} />
          </label>
          <div className="flex-1">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Base Color</label>
            <input
              type="text"
              value={color.toUpperCase()}
              onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`; if (/^#[0-9a-fA-F]{6}$/.test(v)) setColor(v); }}
              maxLength={7}
              className="h-10 w-36 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-mono text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 uppercase"
            />
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Click any swatch to copy its HEX value to your clipboard.</p>
      </div>

      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-4 space-y-1.5">
        {scale.map(({ shade, hex: h, textColor }) => (
          <Swatch key={shade} shade={shade} hex={h} textColor={textColor} />
        ))}
      </div>
    </div>
  );
}
