"use client";
import * as React from "react";
import { Copy, Check, Plus, Trash2, RefreshCw, Download } from "lucide-react";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

function uid() {
  return Math.random().toString(36).substring(2, 9);
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

function buildGradientCSS(type: "linear" | "radial", angle: number, stops: ColorStop[]) {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopStr = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");
  if (type === "linear") return `linear-gradient(${angle}deg, ${stopStr})`;
  return `radial-gradient(circle, ${stopStr})`;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy CSS"}
    </button>
  );
}

export function GradientGeneratorTool() {
  const [type, setType] = React.useState<"linear" | "radial">("linear");
  const [angle, setAngle] = React.useState(135);
  const [stops, setStops] = React.useState<ColorStop[]>([
    { id: uid(), color: "#6366f1", position: 0 },
    { id: uid(), color: "#ec4899", position: 100 },
  ]);

  const gradient = buildGradientCSS(type, angle, stops);
  const cssOutput = `background: ${gradient};`;

  const addStop = () => {
    const mid = Math.round((stops[0]?.position + stops[stops.length - 1]?.position) / 2) || 50;
    setStops((prev) => [...prev, { id: uid(), color: randomColor(), position: mid }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStop = (id: string, key: keyof ColorStop, value: string | number) => {
    setStops((prev) => prev.map((s) => s.id === id ? { ...s, [key]: value } : s));
  };

  const randomGradient = () => {
    const count = Math.floor(Math.random() * 2) + 2;
    setStops(
      Array.from({ length: count }, (_, i) => ({
        id: uid(),
        color: randomColor(),
        position: Math.round((i / (count - 1)) * 100),
      }))
    );
    setAngle(Math.round(Math.random() * 360));
  };

  const downloadGradient = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    let grad: CanvasGradient;
    if (type === "linear") {
      const rad = (angle - 90) * (Math.PI / 180);
      const x1 = 0.5 - 0.5 * Math.cos(rad), y1 = 0.5 - 0.5 * Math.sin(rad);
      const x2 = 0.5 + 0.5 * Math.cos(rad), y2 = 0.5 + 0.5 * Math.sin(rad);
      grad = ctx.createLinearGradient(x1 * 800, y1 * 400, x2 * 800, y2 * 400);
    } else {
      grad = ctx.createRadialGradient(400, 200, 0, 400, 200, 400);
    }
    sorted.forEach((s) => grad.addColorStop(s.position / 100, s.color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 400);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "gradient.png";
    a.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* Live preview */}
      <div
        className="w-full h-48 sm:h-64 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm transition-all duration-300"
        style={{ background: gradient }}
      />

      {/* Controls */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-5">
        {/* Type + angle */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Gradient Type</label>
            <div className="flex gap-2.5">
              {(["linear", "radial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`h-11 px-5 text-sm font-bold rounded-xl border transition-all ${
                    type === t
                      ? "bg-red-600 text-white border-red-600 shadow-xs"
                      : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {type === "linear" && (
            <div className="flex-1 space-y-2">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Angle: <span className="font-mono text-zinc-900 dark:text-zinc-100">{angle}°</span>
              </label>
              <input
                type="range" min={0} max={360} value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-red-600 dark:accent-red-500"
              />
            </div>
          )}
        </div>

        {/* Color stops */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Color Stops</label>
            <button
              onClick={addStop}
              className="flex items-center gap-1.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Stop
            </button>
          </div>
          <div className="space-y-2.5">
            {stops.map((stop) => (
              <div key={stop.id} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, "color", e.target.value)}
                  className="h-9 w-9 rounded-lg cursor-pointer border-0 p-0 bg-transparent shrink-0"
                  title="Pick stop color"
                />
                <span className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 w-24 hidden sm:block">{stop.color.toUpperCase()}</span>
                <div className="flex-1 flex items-center gap-2.5">
                  <input
                    type="range" min={0} max={100}
                    value={stop.position}
                    onChange={(e) => updateStop(stop.id, "position", Number(e.target.value))}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer accent-red-600 dark:accent-red-500"
                  />
                  <span className="text-sm font-mono font-bold text-zinc-600 dark:text-zinc-400 w-10 text-right">{stop.position}%</span>
                </div>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">CSS Output</span>
          <div className="flex items-center gap-2">
            <button
              onClick={randomGradient}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 hover:border-red-500 transition-colors shadow-xs"
            >
              <RefreshCw className="h-4 w-4" />
              Random
            </button>
            <button
              onClick={downloadGradient}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 hover:border-red-500 transition-colors shadow-xs"
            >
              <Download className="h-4 w-4" />
              PNG
            </button>
            <CopyButton value={cssOutput} />
          </div>
        </div>
        <pre className="text-sm font-mono bg-zinc-50 dark:bg-zinc-950/60 rounded-xl p-4 text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap break-all border border-zinc-100 dark:border-zinc-800 leading-relaxed">
          {cssOutput}
        </pre>
      </div>
    </div>
  );
}
