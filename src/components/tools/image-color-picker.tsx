"use client";
import * as React from "react";
import { UploadCloud, Copy, Check } from "lucide-react";

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function ImageColorPickerTool() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [pickedColor, setPickedColor] = React.useState<{ hex: string; rgb: string } | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);
  const [isDrag, setIsDrag] = React.useState(false);

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) loadImage(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDrag(false);
    if (e.dataTransfer.files?.[0]) loadImage(e.dataTransfer.files[0]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const px = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(px[0], px[1], px[2]);
    setPickedColor({ hex, rgb: `rgb(${px[0]}, ${px[1]}, ${px[2]})` });
  };

  // Draw image to canvas when imageSrc changes
  React.useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full space-y-6">
      {!imageSrc ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDrag(true); }}
          onDragLeave={() => setIsDrag(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("img-color-input")?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 px-6 text-center cursor-pointer transition-all ${
            isDrag ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900" : "border-zinc-300 hover:border-zinc-400 bg-zinc-50/50 dark:border-zinc-700/80 dark:bg-zinc-950/40"
          }`}
        >
          <input id="img-color-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Drop an image here, or <span className="text-blue-600 dark:text-blue-400 underline underline-offset-4">browse files</span></h3>
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">JPG, PNG, WebP, GIF • Click any pixel to pick its color</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full cursor-crosshair max-h-[500px] object-contain"
              style={{ display: "block" }}
            />
          </div>
          <button
            onClick={() => { setImageSrc(null); setPickedColor(null); }}
            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline"
          >
            Load a different image
          </button>
        </div>
      )}

      {pickedColor && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-16 w-16 rounded-xl border border-zinc-200 dark:border-zinc-700 shrink-0 shadow-sm" style={{ backgroundColor: pickedColor.hex }} />
          <div className="flex-1 space-y-2">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Picked color</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "HEX", value: pickedColor.hex },
                { label: "RGB", value: pickedColor.rgb },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => copy(value)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <span className="text-[10px] text-zinc-400 mr-0.5">{label}</span>
                  {value}
                  {copied === value ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-zinc-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {imageSrc && !pickedColor && (
        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 py-2">
          Click anywhere on the image above to pick a color
        </div>
      )}
    </div>
  );
}
