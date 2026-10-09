"use client";

import * as React from "react";
import { UploadCloud, Download, Trash2, ArrowUp, ArrowDown, FileText, Plus } from "lucide-react";
import jsPDF from "jspdf";
import { CustomSelect } from "@/components/ui/custom-select";

interface ImageItem {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
}

export function ImageToPdfTool() {
  const [images, setImages] = React.useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = React.useState<"a4" | "letter" | "fit">("a4");
  const [orientation, setOrientation] = React.useState<"p" | "l">("p");
  const [margin, setMargin] = React.useState<number>(10); // mm
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleFiles = (fileList: FileList | File[]) => {
    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: file.name,
              size: file.size,
              dataUrl,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          ]);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const copy = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize === "fit" ? "a4" : pageSize,
      });

      images.forEach((item, index) => {
        if (index > 0) {
          pdf.addPage(pageSize === "fit" ? "a4" : pageSize, orientation);
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const usableW = pageWidth - margin * 2;
        const usableH = pageHeight - margin * 2;

        const imgRatio = item.width / item.height;
        let renderW = usableW;
        let renderH = usableW / imgRatio;

        if (renderH > usableH) {
          renderH = usableH;
          renderW = usableH * imgRatio;
        }

        const posX = margin + (usableW - renderW) / 2;
        const posY = margin + (usableH - renderH) / 2;

        pdf.addImage(item.dataUrl, "JPEG", posX, posY, renderW, renderH, undefined, "FAST");
      });

      pdf.save("converted-images.pdf");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById("img-to-pdf-upload")?.click()}
        className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-red-500 hover:bg-red-50/20 dark:hover:border-red-500/80 py-16 px-6 text-center cursor-pointer transition-all"
      >
        <input
          id="img-to-pdf-upload"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400 shadow-xs mb-5 group-hover:scale-105 transition-transform">
          <UploadCloud className="h-8 w-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50">
          Select image files
        </h3>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-md">
          Drag and drop JPG, PNG, or WebP photos. Reorder pages, customize margins, and convert into a single PDF.
        </p>
        <span className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-base shadow-md group-hover:bg-red-700 transition-colors">
          Choose Image Files
        </span>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          {/* Options Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
              PDF Page Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Page Size</label>
                <CustomSelect<"a4" | "letter" | "fit">
                  value={pageSize}
                  onChange={(val) => setPageSize(val)}
                  size="md"
                  options={[
                    { value: "a4", label: "A4 (Standard 210 x 297 mm)" },
                    { value: "letter", label: "Letter (8.5 x 11 in)" },
                    { value: "fit", label: "Fit to Image" },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Orientation</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrientation("p")}
                    className={`h-11 rounded-xl text-sm font-bold border transition-all ${
                      orientation === "p"
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    Portrait
                  </button>
                  <button
                    onClick={() => setOrientation("l")}
                    className={`h-11 rounded-xl text-sm font-bold border transition-all ${
                      orientation === "l"
                        ? "border-red-600 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Margin</label>
                <CustomSelect<number>
                  value={margin}
                  onChange={(val) => setMargin(val)}
                  size="md"
                  options={[
                    { value: 0, label: "No Margin (Full Bleed)" },
                    { value: 10, label: "Normal Margin (10 mm)" },
                    { value: 20, label: "Large Margin (20 mm)" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Image List / Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                {images.length} {images.length === 1 ? "Image" : "Images"} selected
              </span>
              <button
                onClick={() => setImages([])}
                className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-3 shadow-sm relative group flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                    <img src={img.dataUrl} alt={img.name} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex items-center justify-between gap-1 text-xs text-zinc-500">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">Page {idx + 1}</span>
                    <div className="flex items-center gap-1">
                      {idx > 0 && (
                        <button
                          onClick={() => moveImage(idx, "up")}
                          className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100"
                          title="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                      )}
                      {idx < images.length - 1 && (
                        <button
                          onClick={() => moveImage(idx, "down")}
                          className="p-1 hover:text-zinc-900 dark:hover:text-zinc-100"
                          title="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(img.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remove image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div
                onClick={() => document.getElementById("img-to-pdf-upload")?.click()}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 flex flex-col items-center justify-center gap-2 cursor-pointer text-zinc-500 hover:text-red-600 transition-colors"
              >
                <Plus className="h-7 w-7" />
                <span className="text-sm font-bold">Add more</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <button
            onClick={generatePdf}
            disabled={isGenerating}
            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Generating PDF Document…
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Convert & Download PDF ({images.length} pages)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
