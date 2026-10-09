"use client";
import * as React from "react";
import { UploadCloud } from "lucide-react";

type DeficiencyType = "normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

// Simplified color matrix simulation (LMS cone space approximations)
function simulateDeficiency(imageData: ImageData, type: DeficiencyType): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    let nr = r, ng = g, nb = b;
    if (type === "protanopia") {
      // Red-blind: Lose red cone
      nr = 0.567 * r + 0.433 * g;
      ng = 0.558 * r + 0.442 * g;
      nb = 0.242 * g + 0.758 * b;
    } else if (type === "deuteranopia") {
      // Green-blind: Lose green cone
      nr = 0.625 * r + 0.375 * g;
      ng = 0.7 * r + 0.3 * g;
      nb = 0.3 * g + 0.7 * b;
    } else if (type === "tritanopia") {
      // Blue-blind: Lose blue cone
      nr = 0.95 * r + 0.05 * g;
      ng = 0.433 * g + 0.567 * b;
      nb = 0.475 * g + 0.525 * b;
    } else if (type === "achromatopsia") {
      // Total color blindness (grayscale)
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      nr = ng = nb = gray;
    }
    data[i] = Math.round(nr * 255);
    data[i + 1] = Math.round(ng * 255);
    data[i + 2] = Math.round(nb * 255);
  }
  return new ImageData(data, imageData.width, imageData.height);
}

const DEFICIENCIES: Array<{ id: DeficiencyType; label: string; desc: string }> = [
  { id: "normal", label: "Normal Vision", desc: "How most people see color" },
  { id: "protanopia", label: "Protanopia", desc: "Red-blind (~1% of males)" },
  { id: "deuteranopia", label: "Deuteranopia", desc: "Green-blind (~1% of males)" },
  { id: "tritanopia", label: "Tritanopia", desc: "Blue-blind (rare, ~0.01%)" },
  { id: "achromatopsia", label: "Achromatopsia", desc: "Total color blindness (rare)" },
];

export function ColorBlindnessTool() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [active, setActive] = React.useState<DeficiencyType>("normal");
  const [isDrag, setIsDrag] = React.useState(false);
  const originalRef = React.useRef<HTMLCanvasElement>(null);
  const displayRef = React.useRef<HTMLCanvasElement>(null);

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const orig = originalRef.current;
      if (!orig) return;
      orig.width = img.naturalWidth;
      orig.height = img.naturalHeight;
      orig.getContext("2d")?.drawImage(img, 0, 0);
      applyDeficiency(active);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const applyDeficiency = React.useCallback((type: DeficiencyType) => {
    const orig = originalRef.current;
    const disp = displayRef.current;
    if (!orig || !disp) return;
    disp.width = orig.width;
    disp.height = orig.height;
    const ctxOrig = orig.getContext("2d");
    const ctxDisp = disp.getContext("2d");
    if (!ctxOrig || !ctxDisp) return;
    const imgData = ctxOrig.getImageData(0, 0, orig.width, orig.height);
    const simulated = simulateDeficiency(imgData, type);
    ctxDisp.putImageData(simulated, 0, 0);
  }, []);

  React.useEffect(() => {
    if (imageSrc) applyDeficiency(active);
  }, [active, applyDeficiency, imageSrc]);

  return (
    <div className="w-full space-y-6">
      {/* Hidden canvas for original image data */}
      <canvas ref={originalRef} className="hidden" />

      {!imageSrc ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={(e) => { e.preventDefault(); setIsDrag(false); if (e.dataTransfer.files?.[0]) loadImage(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById("cb-input")?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 px-6 text-center cursor-pointer transition-all ${
            isDrag ? "border-red-500 bg-red-50/50 dark:border-red-500 dark:bg-red-950/20" : "border-zinc-300 hover:border-red-400 bg-zinc-50/50 dark:border-zinc-700/80 dark:bg-zinc-950/40"
          }`}
        >
          <input id="cb-input" type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) loadImage(e.target.files[0]); }} />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Drop an image to simulate color blindness</h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">JPG, PNG, WebP • 100% In-Browser Privacy</p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose Image File
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Deficiency selector */}
          <div className="flex flex-wrap gap-2.5">
            {DEFICIENCIES.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                  active === d.id
                    ? "bg-red-600 text-white border-red-600 shadow-xs"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
                }`}
                title={d.desc}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Simulated image */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
            <canvas ref={displayRef} className="w-full" style={{ display: "block" }} />
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            {DEFICIENCIES.find((d) => d.id === active)?.desc}
          </div>

          <button
            onClick={() => setImageSrc(null)}
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline"
          >
            Load a different image
          </button>
        </div>
      )}
    </div>
  );
}
