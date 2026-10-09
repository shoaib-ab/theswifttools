"use client";
import * as React from "react";
import { Copy, Check, RefreshCw, Lock, Unlock } from "lucide-react";

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

function generatePalette(baseHex: string, mode: string): string[] {
  const { h, s, l } = hexToHsl(baseHex);
  switch (mode) {
    case "complementary":
      return [baseHex, hslToHex((h + 180) % 360, s, l)];
    case "triadic":
      return [baseHex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case "tetradic":
      return [baseHex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    case "analogous":
      return [hslToHex((h - 30 + 360) % 360, s, l), baseHex, hslToHex((h + 30) % 360, s, l)];
    case "monochromatic":
      return [
        hslToHex(h, s, Math.max(10, l - 40)),
        hslToHex(h, s, Math.max(10, l - 20)),
        baseHex,
        hslToHex(h, s, Math.min(90, l + 20)),
        hslToHex(h, s, Math.min(90, l + 40)),
      ];
    default:
      return [baseHex];
  }
}

function randomHex() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0").toUpperCase();
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5 text-white/80" />}
    </button>
  );
}

const MODES = [
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
  { id: "tetradic", label: "Tetradic" },
  { id: "analogous", label: "Analogous" },
  { id: "monochromatic", label: "Monochromatic" },
];

export function ColorPaletteTool() {
  const [baseColor, setBaseColor] = React.useState("#6366f1");
  const [mode, setMode] = React.useState("complementary");
  const [locked, setLocked] = React.useState<boolean[]>([]);

  const palette = generatePalette(baseColor, mode);

  // Sync locked array length
  React.useEffect(() => {
    setLocked(Array(palette.length).fill(false));
  }, [mode]);

  const handleRandom = () => {
    const newBase = randomHex();
    setBaseColor(newBase);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Base Color</label>
            <div className="flex items-center gap-2.5">
              <label className="relative h-11 w-11 rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 cursor-pointer shrink-0 shadow-xs">
                <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
                <span className="block w-full h-full" style={{ backgroundColor: baseColor }} />
              </label>
              <input
                type="text"
                value={baseColor}
                onChange={(e) => { const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`; if (/^#[0-9a-fA-F]{6}$/.test(v)) setBaseColor(v.toUpperCase()); }}
                maxLength={7}
                className="h-11 w-32 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500 uppercase"
              />
              <button
                onClick={handleRandom}
                className="h-11 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 hover:border-red-500 transition-colors flex items-center gap-2 text-sm font-bold shadow-xs cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                Random
              </button>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Harmony Mode</label>
            <div className="flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${
                    mode === m.id
                      ? "bg-red-600 text-white border-red-600 shadow-xs"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Palette swatches */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {palette.map((color, i) => (
          <div key={i} className="space-y-2.5">
            <div
              className="rounded-2xl h-32 sm:h-40 flex items-end justify-between p-3 border border-zinc-200/40 shadow-xs hover:shadow-md transition-shadow"
              style={{ backgroundColor: color }}
            >
              <CopyButton value={color} />
              <button
                onClick={() => setLocked((prev) => { const next = [...prev]; next[i] = !next[i]; return next; })}
                className="p-2 rounded-lg bg-black/20 hover:bg-black/40 backdrop-blur-xs transition-colors text-white"
                title={locked[i] ? "Unlock" : "Lock"}
              >
                {locked[i] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 text-center">{color}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
