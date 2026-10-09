"use client";

import * as React from "react";
import { UploadCloud, Download, RotateCcw, RotateCw, Crop as CropIcon } from "lucide-react";

interface AspectRatioOption {
  label: string;
  value: number | null; // null for freeform
}

const RATIOS: AspectRatioOption[] = [
  { label: "Freeform", value: null },
  { label: "1:1 Square", value: 1 },
  { label: "16:9 Widescreen", value: 16 / 9 },
  { label: "4:3 Standard", value: 4 / 3 },
  { label: "3:2 Photo", value: 3 / 2 },
  { label: "9:16 Story / Reel", value: 9 / 16 },
];

export function CropImageTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [naturalSize, setNaturalSize] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [rotation, setRotation] = React.useState<number>(0);
  const [selectedRatio, setSelectedRatio] = React.useState<AspectRatioOption>(RATIOS[0]);

  // Crop box in percentage of displayed image (0 - 100)
  const [cropBox, setCropBox] = React.useState<{ x: number; y: number; w: number; h: number }>({
    x: 10,
    y: 10,
    w: 80,
    h: 80,
  });

  const [activeDrag, setActiveDrag] = React.useState<string | null>(null); // 'move' | 'nw' | 'ne' | 'se' | 'sw'
  const [dragStartPos, setDragStartPos] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialBox, setInitialBox] = React.useState(cropBox);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const imageElementRef = React.useRef<HTMLImageElement | null>(null);

  const handleFileUpload = (f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        setRotation(0);
        setCropBox({ x: 10, y: 10, w: 80, h: 80 });
      };
      img.src = src;
    };
    reader.readAsDataURL(f);
  };

  const applyRatio = (ratio: AspectRatioOption) => {
    setSelectedRatio(ratio);
    if (!ratio.value) return;

    // Adjust crop box width/height to match aspect ratio
    const currentW = cropBox.w;
    const targetH = Math.min(90, Math.max(10, currentW / ratio.value));
    setCropBox((prev) => ({
      ...prev,
      h: targetH,
    }));
  };

  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDrag(type);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setInitialBox(cropBox);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeDrag || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dxPercent = ((e.clientX - dragStartPos.x) / rect.width) * 100;
      const dyPercent = ((e.clientY - dragStartPos.y) / rect.height) * 100;

      if (activeDrag === "move") {
        let newX = Math.max(0, Math.min(100 - initialBox.w, initialBox.x + dxPercent));
        let newY = Math.max(0, Math.min(100 - initialBox.h, initialBox.y + dyPercent));
        setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
      } else if (activeDrag === "se") {
        let newW = Math.max(10, Math.min(100 - initialBox.x, initialBox.w + dxPercent));
        let newH = selectedRatio.value
          ? newW / selectedRatio.value
          : Math.max(10, Math.min(100 - initialBox.y, initialBox.h + dyPercent));
        setCropBox((prev) => ({ ...prev, w: newW, h: Math.min(100 - prev.y, newH) }));
      } else if (activeDrag === "nw") {
        let newX = Math.max(0, Math.min(initialBox.x + initialBox.w - 10, initialBox.x + dxPercent));
        let newW = initialBox.w - (newX - initialBox.x);
        let newY = Math.max(0, Math.min(initialBox.y + initialBox.h - 10, initialBox.y + dyPercent));
        let newH = initialBox.h - (newY - initialBox.y);
        setCropBox({ x: newX, y: newY, w: newW, h: newH });
      }
    };

    const handleMouseUp = () => {
      setActiveDrag(null);
    };

    if (activeDrag) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeDrag, dragStartPos, initialBox, selectedRatio]);

  const downloadCropped = () => {
    if (!imageSrc || !naturalSize.w) return;

    const img = new Image();
    img.onload = () => {
      // 1. Create rot canvas if rotated
      let sourceCanvas = document.createElement("canvas");
      if (rotation % 180 !== 0) {
        sourceCanvas.width = naturalSize.h;
        sourceCanvas.height = naturalSize.w;
      } else {
        sourceCanvas.width = naturalSize.w;
        sourceCanvas.height = naturalSize.h;
      }
      const sCtx = sourceCanvas.getContext("2d");
      if (!sCtx) return;

      sCtx.translate(sourceCanvas.width / 2, sourceCanvas.height / 2);
      sCtx.rotate((rotation * Math.PI) / 180);
      sCtx.drawImage(img, -naturalSize.w / 2, -naturalSize.h / 2);

      // 2. Crop
      const cropPixelX = (cropBox.x / 100) * sourceCanvas.width;
      const cropPixelY = (cropBox.y / 100) * sourceCanvas.height;
      const cropPixelW = (cropBox.w / 100) * sourceCanvas.width;
      const cropPixelH = (cropBox.h / 100) * sourceCanvas.height;

      const destCanvas = document.createElement("canvas");
      destCanvas.width = Math.round(cropPixelW);
      destCanvas.height = Math.round(cropPixelH);
      const dCtx = destCanvas.getContext("2d");
      if (!dCtx) return;

      dCtx.drawImage(
        sourceCanvas,
        cropPixelX,
        cropPixelY,
        cropPixelW,
        cropPixelH,
        0,
        0,
        destCanvas.width,
        destCanvas.height
      );

      const a = document.createElement("a");
      a.href = destCanvas.toDataURL("image/png");
      a.download = `cropped-${file?.name?.replace(/\.[^.]+$/, "") || "image"}.png`;
      a.click();
    };
    img.src = imageSrc;
  };

  const resetAll = () => {
    setFile(null);
    setImageSrc(null);
    setRotation(0);
    setCropBox({ x: 10, y: 10, w: 80, h: 80 });
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
          onClick={() => document.getElementById("crop-upload-input")?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-950/40 hover:border-red-400 py-16 px-6 text-center cursor-pointer transition-all"
        >
          <input
            id="crop-upload-input"
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
            Upload an image to crop
          </h3>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-lg">
            Drag and drop or browse JPG, PNG, or WebP. Choose preset aspect ratios or freeform cropping, rotate, and export high-res PNG.
          </p>
          <div className="mt-5">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-sm pointer-events-none">
              Choose Image File
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Crop Settings
              </span>
              <button
                onClick={resetAll}
                className="text-sm font-medium text-zinc-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>

            {/* Aspect Ratio Options */}
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                {RATIOS.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => applyRatio(r)}
                    className={`h-10 px-3 rounded-xl text-sm font-semibold border text-left transition-all truncate cursor-pointer ${
                      selectedRatio.label === r.label
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotation Buttons */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <label className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Rotation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                  className="h-10 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" /> -90° Left
                </button>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="h-10 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <RotateCw className="h-4 w-4" /> +90° Right
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="text-xs font-medium text-zinc-500 space-y-1.5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <p>Original Dimensions: <strong className="text-zinc-800 dark:text-zinc-200 font-mono">{naturalSize.w} × {naturalSize.h} px</strong></p>
              <p>Estimated Crop: <strong className="text-zinc-800 dark:text-zinc-200 font-mono">{Math.round((cropBox.w / 100) * naturalSize.w)} × {Math.round((cropBox.h / 100) * naturalSize.h)} px</strong></p>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadCropped}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CropIcon className="h-5 w-5" />
              Crop & Download Image
            </button>
          </div>

          {/* Interactive Crop Preview Area */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-100/70 dark:border-zinc-800/80 dark:bg-zinc-950/70 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[460px] relative select-none">
              <div
                ref={containerRef}
                className="relative inline-block overflow-hidden shadow-md rounded-lg max-w-full max-h-[440px]"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img
                  ref={imageElementRef}
                  src={imageSrc}
                  alt="Original"
                  className="max-w-full max-h-[440px] block pointer-events-none"
                />

                {/* Crop Box Overlay */}
                <div
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.w}%`,
                    height: `${cropBox.h}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "move")}
                  className="absolute border-2 border-blue-500 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move"
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                    <div className="border-r border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-white" />
                    <div className="border-r border-white" />
                    <div />
                  </div>

                  {/* Corner Handles */}
                  <div
                    onMouseDown={(e) => handleMouseDown(e, "nw")}
                    className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 bg-blue-500 border border-white rounded-full cursor-nwse-resize"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDown(e, "se")}
                    className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 bg-blue-500 border border-white rounded-full cursor-nwse-resize"
                  />
                </div>
              </div>

              <div className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
                💡 Drag box to move • Drag corner handles to resize crop area
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
