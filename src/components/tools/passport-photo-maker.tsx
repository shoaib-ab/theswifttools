"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, ZoomIn, ZoomOut, Check, Sliders } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

interface PassportPreset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  ratio: number; // width / height
  description: string;
}

const PRESETS: PassportPreset[] = [
  { id: "us", name: "United States (2 x 2 in)", widthMm: 51, heightMm: 51, ratio: 1, description: "US Passport, Visa, Green Card (51 x 51 mm)" },
  { id: "uk_eu", name: "UK & Schengen (35 x 45 mm)", widthMm: 35, heightMm: 45, ratio: 35 / 45, description: "UK, EU, Schengen, Canada Visa" },
  { id: "india", name: "India (35 x 45 mm)", widthMm: 35, heightMm: 45, ratio: 35 / 45, description: "Indian Passport, OCI card" },
  { id: "pakistan", name: "Pakistan (35 x 45 mm)", widthMm: 35, heightMm: 45, ratio: 35 / 45, description: "Nadra CNIC, Machine Readable Passport" },
  { id: "china", name: "China (33 x 48 mm)", widthMm: 33, heightMm: 48, ratio: 33 / 48, description: "Chinese Visa & Passport" },
  { id: "custom_sq", name: "Square Photo (600 x 600 px)", widthMm: 50, heightMm: 50, ratio: 1, description: "Standard square portrait for online portals" },
];

const BACKGROUND_COLORS = [
  { label: "Original", value: "transparent" },
  { label: "White", value: "#ffffff" },
  { label: "Off White", value: "#f4f4f5" },
  { label: "Light Blue", value: "#e0f2fe" },
  { label: "Royal Blue", value: "#2563eb" },
];

export function PassportPhotoMakerTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = React.useState<PassportPreset>(PRESETS[0]);
  const [bgColor, setBgColor] = React.useState<string>("#ffffff");
  const [zoom, setZoom] = React.useState<number>(1);
  const [brightness, setBrightness] = React.useState<number>(100);
  const [contrast, setContrast] = React.useState<number>(100);
  const [offsetX, setOffsetX] = React.useState<number>(0);
  const [offsetY, setOffsetY] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [generateSheet, setGenerateSheet] = React.useState<boolean>(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const handleFileUpload = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setZoom(1);
        setOffsetX(0);
        setOffsetY(0);
        setBrightness(100);
        setContrast(100);
      };
      img.src = src;
    };
    reader.readAsDataURL(f);
  };

  const drawPhoto = React.useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseWidth = 600;
    const baseHeight = Math.round(baseWidth / selectedPreset.ratio);

    if (generateSheet) {
      // 4x6 inch standard photo paper at 300 DPI: 1800 x 1200 px
      canvas.width = 1800;
      canvas.height = 1200;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create a temporary canvas for single passport unit
      const singleCanvas = document.createElement("canvas");
      singleCanvas.width = 500;
      singleCanvas.height = Math.round(500 / selectedPreset.ratio);
      const sCtx = singleCanvas.getContext("2d");
      if (sCtx) {
        if (bgColor !== "transparent") {
          sCtx.fillStyle = bgColor;
          sCtx.fillRect(0, 0, singleCanvas.width, singleCanvas.height);
        }
        sCtx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
        sCtx.save();
        sCtx.translate(singleCanvas.width / 2 + offsetX, singleCanvas.height / 2 + offsetY);
        sCtx.scale(zoom, zoom);
        sCtx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        sCtx.restore();
        sCtx.filter = "none";
      }

      // Draw grid of 2 rows x 3 columns on 4x6 paper
      const cols = 3;
      const rows = 2;
      const cardW = 480;
      const cardH = Math.round(480 / selectedPreset.ratio);
      const startX = (canvas.width - (cols * cardW + (cols - 1) * 40)) / 2;
      const startY = (canvas.height - (rows * cardH + (rows - 1) * 40)) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (cardW + 40);
          const y = startY + r * (cardH + 40);
          ctx.drawImage(singleCanvas, x, y, cardW, cardH);
          // Thin cutting guide border
          ctx.strokeStyle = "#e4e4e7";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cardW, cardH);
        }
      }
    } else {
      canvas.width = baseWidth;
      canvas.height = baseHeight;

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.save();
      ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();
      ctx.filter = "none";

      // Draw biometric oval overlay guide
      ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Head guide oval
      ctx.ellipse(canvas.width / 2, canvas.height * 0.45, canvas.width * 0.28, canvas.height * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [selectedPreset, bgColor, zoom, brightness, contrast, offsetX, offsetY, generateSheet]);

  React.useEffect(() => {
    if (imageSrc) {
      drawPhoto();
    }
  }, [drawPhoto, imageSrc]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const downloadPhoto = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Temporarily redraw without guide lines
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext("2d");
    const img = imgRef.current;
    if (!ctx || !img) return;

    if (generateSheet) {
      ctx.drawImage(canvas, 0, 0);
    } else {
      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
      }
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.save();
      ctx.translate(exportCanvas.width / 2 + offsetX, exportCanvas.height / 2 + offsetY);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx.restore();
    }

    const a = document.createElement("a");
    a.href = exportCanvas.toDataURL("image/jpeg", 0.95);
    a.download = generateSheet
      ? `passport-photos-4x6-${selectedPreset.id}.jpg`
      : `passport-photo-${selectedPreset.id}.jpg`;
    a.click();
  };

  const resetAll = () => {
    setFile(null);
    setImageSrc(null);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setBrightness(100);
    setContrast(100);
  };

  return (
    <div className="w-full space-y-6">
      {!imageSrc ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("passport-upload-input")?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-red-400 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="passport-upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 shadow-sm mb-4">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Upload your portrait photo
          </h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Drag and drop or browse JPG, PNG, or WebP. Choose country preset, align face with guideline, and export ready-to-print passport photos.
          </p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose Portrait Photo
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-5 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Passport Settings
              </span>
              <button
                onClick={resetAll}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Country / Document Standard
              </label>
              <CustomSelect<string>
                value={selectedPreset.id}
                onChange={(val) => {
                  const p = PRESETS.find((x) => x.id === val);
                  if (p) setSelectedPreset(p);
                }}
                size="sm"
                options={PRESETS.map((p) => ({
                  value: p.id,
                  label: p.name,
                  description: p.description,
                }))}
              />
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {selectedPreset.description}
              </p>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Background Color
              </label>
              <div className="flex flex-wrap gap-2">
                {BACKGROUND_COLORS.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => setBgColor(bg.value)}
                    className={`h-8 px-3 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                      bgColor === bg.value
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {bgColor === bg.value && <Check className="h-3 w-3" />}
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
                <span>Scale / Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomOut className="h-4 w-4 text-zinc-400" />
                <input
                  type="range"
                  min="0.4"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                />
                <ZoomIn className="h-4 w-4 text-zinc-400" />
              </div>
            </div>

            {/* Brightness & Contrast */}
            <div className="space-y-3 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <Sliders className="h-3.5 w-3.5" /> Adjustments
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                />
              </div>
            </div>

            {/* Layout Toggle: Single vs 4x6 Printable Sheet */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Output Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGenerateSheet(false)}
                  className={`h-10 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    !generateSheet
                      ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Single Photo
                </button>
                <button
                  onClick={() => setGenerateSheet(true)}
                  className={`h-10 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    generateSheet
                      ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  4×6 Print Sheet (6x)
                </button>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadPhoto}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Download className="h-5 w-5" />
              {generateSheet ? "Download 4×6 Printable Sheet" : "Download Passport Photo"}
            </button>
          </div>

          {/* Interactive Canvas Preview */}
          <div className="lg:col-span-2 space-y-3 flex flex-col items-center">
            <div className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-100/70 dark:border-zinc-800/80 dark:bg-zinc-950/70 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="max-w-full max-h-[420px] object-contain rounded-lg shadow-md border border-zinc-300 dark:border-zinc-700 cursor-move bg-white"
              />
              {!generateSheet && (
                <div className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
                  💡 Drag image on canvas to reposition • Blue dashed oval marks official facial biometric zone
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
