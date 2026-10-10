"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToolIconProps {
  toolId: string;
  category?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-10 w-10 rounded-xl text-xs",
  md: "h-14 w-14 rounded-2xl text-sm",
  lg: "h-16 w-16 rounded-2xl text-base",
};

const SVG_SIZE_MAP = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

/**
 * Custom purpose-built solid SVG tool pictograms in the style of iLovePDF.
 * Bold, filled shapes, high contrast, large icons that are instantly recognizable at a glance.
 */
export function ToolIcon({ toolId, category, className, size = "md" }: ToolIconProps) {
  const svgClass = SVG_SIZE_MAP[size] || "h-8 w-8";
  const iconContent = getToolSvg(toolId, category, svgClass);

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 shadow-md ring-1 ring-black/5 dark:ring-white/10 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg select-none",
        SIZE_MAP[size],
        iconContent.bgClass,
        className
      )}
      aria-hidden="true"
    >
      {iconContent.svg}
    </div>
  );
}

interface SvgConfig {
  bgClass: string;
  svg: React.ReactNode;
}

function getToolSvg(id: string, category: string | undefined, s: string): SvgConfig {
  switch (id) {
    // ═══════════════════════════════════════════════════════════════════════════
    // PDF TOOLS (Bold, punchy solid pictograms)
    // ═══════════════════════════════════════════════════════════════════════════
    case "merge-pdf":
      return {
        bgClass: "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Back Document Sheet */}
            <path d="M5 4a2 2 0 0 1 2-2h5l4 4v3H7a2 2 0 0 0-2 2v9H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="currentColor" fillOpacity="0.45" />
            {/* Front Main Document Sheet */}
            <path d="M8 7a2 2 0 0 1 2-2h6l5 5v10a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V7z" fill="currentColor" />
            {/* Folded corner on front sheet */}
            <path d="M16 5v4a1 1 0 0 0 1 1h4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            {/* Crisp Merge Plus Icon in center of sheet */}
            <circle cx="14.5" cy="15" r="3.5" fill="#ffffff" />
            <path d="M14.5 13v4M12.5 15h4" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      };

    case "split-pdf":
      return {
        bgClass: "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Document sheet */}
            <rect x="4" y="3" width="16" height="18" rx="2" stroke="#ffffff" strokeWidth="2" fill="none" />
            {/* Dashed vertical split line */}
            <line x1="12" y1="4" x2="12" y2="20" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="2.5 2" />
            {/* Clean Scissors cutting through */}
            <circle cx="8" cy="9" r="1.8" stroke="#ffffff" strokeWidth="1.8" />
            <circle cx="8" cy="15" r="1.8" stroke="#ffffff" strokeWidth="1.8" />
            <path d="M9.5 9.8l6.5 4.4M9.5 14.2l6.5-4.4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      };

    case "compress-pdf":
      return {
        bgClass: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* PDF Document in center */}
            <path d="M7 4a1.5 1.5 0 0 1 1.5-1.5h5.5l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 7 20V4z" fill="#ffffff" />
            {/* Folded corner */}
            <path d="M14 2.5V7a1 1 0 0 0 1 1h3.5" fill="#059669" />
            {/* PDF Badge line on document */}
            <rect x="9.5" y="11" width="5" height="1.8" rx="0.9" fill="#059669" />
            {/* Top Downward Compression Arrow */}
            <path d="M12 1v3.5M10 3l2 2 2-2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Bottom Upward Compression Arrow */}
            <path d="M12 23v-3.5M10 21l2-2 2 2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "rotate-pdf":
      return {
        bgClass: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Center Document Sheet */}
            <rect x="7" y="6" width="10" height="12" rx="1.5" fill="#ffffff" />
            <path d="M13 6l4 4h-4V6z" fill="#9333ea" />
            <rect x="9" y="12" width="6" height="1.5" rx="0.75" fill="#9333ea" opacity="0.6" />
            {/* Smooth Circular Rotation Orbit Arrow */}
            <path
              d="M12 2.5a9.5 9.5 0 1 0 9 6.5M21 4.5v4.5h-4.5"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      };

    case "pdf-to-jpg":
      return {
        bgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* PDF Sheet Left */}
            <path d="M3 5a1.5 1.5 0 0 1 1.5-1.5H8l3 3V19a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 3 19V5z" fill="#ffffff" />
            <path d="M4.5 10h4M4.5 13h3" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
            {/* Arrow */}
            <path d="M11.5 12h2.5m-1.2-1.2l1.2 1.2-1.2 1.2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* JPG Photo Right */}
            <rect x="14.5" y="6" width="7" height="11" rx="1.5" fill="#ffffff" />
            <circle cx="16.5" cy="8.5" r="1" fill="#d97706" />
            <path d="M14.5 15l2-2.2 1.5 1.6 1.2-1.4 1.8 2z" fill="#d97706" />
          </svg>
        ),
      };

    case "jpg-to-pdf":
      return {
        bgClass: "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* JPG Photo Left */}
            <rect x="2.5" y="6" width="7" height="11" rx="1.5" fill="#ffffff" />
            <circle cx="4.5" cy="8.5" r="1" fill="#e11d48" />
            <path d="M2.5 15l2-2.2 1.5 1.6 1.2-1.4 1.8 2z" fill="#e11d48" />
            {/* Arrow */}
            <path d="M10 12h2.5m-1.2-1.2l1.2 1.2-1.2 1.2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* PDF Sheet Right */}
            <path d="M13 5a1.5 1.5 0 0 1 1.5-1.5H18l3 3V19a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 13 19V5z" fill="#ffffff" />
            <path d="M14.5 10h4M14.5 13h3" stroke="#e11d48" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ),
      };

    case "word-to-pdf":
      return {
        bgClass: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Word Blue Sheet Left */}
            <rect x="2.5" y="4" width="8" height="14" rx="1.5" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.4" />
            <path d="M4 8.5l1.2 5.5 1.3-4 1.3 4 1.2-5.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arrow */}
            <path d="M11 11.5h2m-1-1.2l1.2 1.2-1.2 1.2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Red PDF Sheet Right */}
            <path d="M13.5 5a1.5 1.5 0 0 1 1.5-1.5H18l3 3V18a1.5 1.5 0 0 1-1.5 1.5H15a1.5 1.5 0 0 1-1.5-1.5V5z" fill="#ef4444" stroke="#ffffff" strokeWidth="1.4" />
            <path d="M18 3.5v3.5h3" fill="#ffffff" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGE STUDIO (Solid photo frames, crop marks, format badges)
    // ═══════════════════════════════════════════════════════════════════════════
    case "compress-image":
      return {
        bgClass: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Center photo card */}
            <rect x="5.5" y="5.5" width="13" height="13" rx="2" fill="#ffffff" />
            <circle cx="9" cy="9.5" r="1.3" fill="#059669" />
            <path d="M5.5 16l3.5-3.5 2.5 2.5 2-2 3.5 3.5v1.5a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V16z" fill="#059669" />
            {/* 4 Inward Corner Chevrons */}
            <path d="M3 3l3.5 3.5m0-3v3h-3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 3l-3.5 3.5m0-3v3h3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 21l3.5-3.5m0 3v-3h-3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21l-3.5-3.5m0 3v-3h3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "passport-photo-maker":
      return {
        bgClass: "bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-indigo-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Viewfinder Corners */}
            <path d="M3.5 7V3.5H7M17 3.5h3.5V7M20.5 17v3.5H17M7 20.5H3.5V17" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Portrait Silhouette */}
            <circle cx="12" cy="9" r="3" fill="#ffffff" />
            <path d="M6.5 18c0-3 2.5-4.5 5.5-4.5s5.5 1.5 5.5 4.5" fill="#ffffff" />
          </svg>
        ),
      };

    case "image-resizer":
      return {
        bgClass: "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Bounding box frame */}
            <rect x="5.5" y="5.5" width="13" height="13" rx="2" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            {/* Diagonal Outward Expand Arrows */}
            <path d="M3 3l3.5 3.5m-3.5 0V3h3.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 3l-3.5 3.5m3.5 0V3h-3.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 21l3.5-3.5m-3.5 0v3.5h3.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 21l-3.5-3.5m3.5 0v3.5h-3.5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "crop-image":
      return {
        bgClass: "bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-cyan-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={s}>
            {/* Photographer's Crop Marks */}
            <path d="M6 2v14a2 2 0 0 0 2 2h14" />
            <path d="M18 22V8a2 2 0 0 0-2-2H2" />
          </svg>
        ),
      };

    case "jpg-to-png":
      return {
        bgClass: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Outer card frame */}
            <rect x="3" y="4" width="18" height="16" rx="2.5" fill="#ffffff" />
            {/* Left half: Solid Blue photo */}
            <path d="M3 6.5a2.5 2.5 0 0 1 2.5-2.5H12v16H5.5A2.5 2.5 0 0 1 3 17.5V6.5z" fill="#2563eb" />
            <circle cx="7" cy="8.5" r="1.3" fill="#ffffff" />
            <path d="M3 16l3-3.2 2.5 2.8 1.5-1.5 2 2H3z" fill="#ffffff" />
            {/* Right half: Checkerboard Transparency Grid */}
            <rect x="12" y="4" width="4.5" height="4" fill="#cbd5e1" />
            <rect x="16.5" y="8" width="4.5" height="4" fill="#cbd5e1" />
            <rect x="12" y="12" width="4.5" height="4" fill="#cbd5e1" />
            <rect x="16.5" y="16" width="4.5" height="4" fill="#cbd5e1" />
            {/* Sparkle */}
            <path d="M17 6.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="#2563eb" />
          </svg>
        ),
      };

    case "png-to-webp":
      return {
        bgClass: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Web Globe Grid */}
            <circle cx="12" cy="12" r="8.5" stroke="#ffffff" strokeWidth="2.2" />
            <ellipse cx="12" cy="12" rx="4" ry="8.5" stroke="#ffffff" strokeWidth="1.6" />
            <line x1="3.5" y1="12" x2="20.5" y2="12" stroke="#ffffff" strokeWidth="1.6" />
            {/* Speed Lightning Spark */}
            <path d="M13 3l-4 8h5l-2 7 6-9h-5l2-6z" fill="#facc15" stroke="#0d9488" strokeWidth="1" />
          </svg>
        ),
      };

    case "webp-to-jpg":
      return {
        bgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Crisp Landscape Photo Card */}
            <rect x="3" y="4" width="18" height="16" rx="2.5" fill="#ffffff" />
            {/* Sun */}
            <circle cx="7.5" cy="8.5" r="2" fill="#d97706" />
            {/* Mountain peaks */}
            <path d="M3 17l4.5-5 3.5 4 3.5-4 5.5 6.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.5z" fill="#d97706" />
          </svg>
        ),
      };

    case "jpg-to-webp":
      return {
        bgClass: "bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-sky-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="#ffffff" strokeWidth="2.2" fill="none" />
            <circle cx="7.5" cy="8.5" r="1.5" fill="#ffffff" />
            {/* Speed lightning cutting through */}
            <path d="M14.5 2.5l-5.5 9h4.5l-2.5 8.5 7.5-10.5h-5l2.5-7z" fill="#ffffff" />
          </svg>
        ),
      };

    case "heic-to-jpg":
      return {
        bgClass: "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-slate-700/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* iPhone Silhouette */}
            <rect x="4" y="2.5" width="10.5" height="19" rx="3" stroke="#ffffff" strokeWidth="2.2" />
            <circle cx="7" cy="5.8" r="1.2" fill="#ffffff" />
            <circle cx="10.8" cy="5.8" r="1.2" fill="#ffffff" />
            <line x1="7.5" y1="19.5" x2="11" y2="19.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M16 11l4 3-4 3" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18.5" cy="7" r="1.8" fill="#38bdf8" />
          </svg>
        ),
      };

    case "image-to-webp":
      return {
        bgClass: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Photo card in middle */}
            <rect x="4" y="5" width="16" height="14" rx="2" fill="#ffffff" />
            <circle cx="8" cy="9" r="1.2" fill="#059669" />
            <path d="M4 16l3.5-3.5 2.5 2.5 2-2 4 4.5H4z" fill="#059669" />
            {/* Inward compression force arrows left & right */}
            <path d="M1 12h2.5m-1.2-1.2L3.5 12 2.3 13.2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 12h-2.5m1.2-1.2L20.5 12l1.2 1.2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "image-to-pdf":
      return {
        bgClass: "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Back photo */}
            <rect x="3" y="6" width="10" height="14" rx="2" fill="#ffffff" opacity="0.5" />
            {/* Front PDF Document with Red Folded Corner */}
            <path d="M8 4a2 2 0 0 1 2-2h6l5 5v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V4z" fill="#ffffff" />
            <path d="M16 2v4a1 1 0 0 0 1 1h4" fill="#e11d48" />
            <circle cx="12" cy="11.5" r="1.3" fill="#e11d48" />
            <path d="M9.5 16l2-2.2 1.5 1.6 1.5-1.5 2 2H9.5z" fill="#e11d48" />
          </svg>
        ),
      };

    case "svg-to-png":
      return {
        bgClass: "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-violet-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            {/* Crisp Vector Pen Tool Nib */}
            <path d="M12 2l4 4-6.5 6.5-4-4L12 2z" fill="#ffffff" />
            <path d="M5.5 8.5L2 19l10.5-3.5-7-7z" fill="#ffffff" opacity="0.85" />
            <circle cx="7" cy="14" r="1.2" fill="#7c3aed" />
            {/* Smooth Bezier Spline Curve with Control Handle Nodes */}
            <path d="M12 18c3-4 6-4 9-2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="21" cy="16" r="1.6" fill="#ffffff" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // COLOR TOOLS (Palettes, Pipettes, Swatches)
    // ═══════════════════════════════════════════════════════════════════════════
    case "color-picker":
      return {
        bgClass: "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-rose-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M19.3 3.3a2.5 2.5 0 0 0-3.5 0l-2.4 2.4 3.5 3.5 2.4-2.4a2.5 2.5 0 0 0 0-3.5zM12 7.1L4.5 14.6V18h3.4L15.4 10.5 12 7.1zM2 21a1 1 0 0 0 1.2.9c1.5-.2 2.3-1.4 3.3-1.4s1.8 1.2 3.3 1.4a1 1 0 0 0 .2-2c-.8-.1-1.3-.6-2-.6s-1.2.5-2.2.5-1.4-.5-2.2-.5-.8.4-1.6.7z" />
          </svg>
        ),
      };

    case "hex-to-rgb":
      return {
        bgClass: "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <line x1="4" y1="8.5" x2="20" y2="8.5" />
            <line x1="4" y1="15.5" x2="20" y2="15.5" />
            <line x1="10" y1="3" x2="7.5" y2="21" />
            <line x1="16.5" y1="3" x2="14" y2="21" />
          </svg>
        ),
      };

    case "gradient-generator":
      return {
        bgClass: "bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            <defs>
              <linearGradient id="grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <rect x="3" y="6" width="18" height="12" rx="3.5" fill="url(#grad-icon)" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="6" cy="18" r="1.8" fill="#ffffff" />
            <circle cx="12" cy="18" r="1.8" fill="#ffffff" />
            <circle cx="18" cy="18" r="1.8" fill="#ffffff" />
          </svg>
        ),
      };

    case "color-palette-generator":
      return {
        bgClass: "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 3.6 8 8 8 1.1 0 2-.9 2-2 0-.5-.2-1-.2-1.5 0-.8.7-1.5 1.5-1.5H15c4.4 0 7-3.6 7-8 0-4.4-4.5-7-10-7zm-5.5 9a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm3.5-4a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm5 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm3.5 4a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z" />
          </svg>
        ),
      };

    case "shades-tints-generator":
      return {
        bgClass: "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-orange-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <rect x="2.5" y="3.5" width="4" height="17" rx="1.5" opacity="0.3" />
            <rect x="7.5" y="3.5" width="4" height="17" rx="1.5" opacity="0.55" />
            <rect x="12.5" y="3.5" width="4" height="17" rx="1.5" opacity="0.8" />
            <rect x="17.5" y="3.5" width="4" height="17" rx="1.5" opacity="1" />
          </svg>
        ),
      };

    case "color-contrast-checker":
      return {
        bgClass: "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-slate-700/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="2.4" />
            <path d="M12 3a9 9 0 0 1 0 18V3z" fill="#ffffff" />
          </svg>
        ),
      };

    case "image-color-picker":
      return {
        bgClass: "bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-rose-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <circle cx="12" cy="12" r="8" />
            <line x1="12" y1="2" x2="12" y2="6.5" />
            <line x1="12" y1="17.5" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6.5" y2="12" />
            <line x1="17.5" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
          </svg>
        ),
      };

    case "color-blindness-simulator":
      return {
        bgClass: "bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-red-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3.5" fill="#ffffff" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // CALCULATORS (Bold, solid numbers, formulas, currencies)
    // ═══════════════════════════════════════════════════════════════════════════
    case "salary-tax-calculator":
      return {
        bgClass: "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className={s}>
            <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" stroke="#ffffff" strokeWidth="2.2" />
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
            <line x1="6" y1="9" x2="6" y2="15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="9" x2="18" y2="15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      };

    case "emi-calculator":
      return {
        bgClass: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M12 2L2 8h20L12 2zm-8 8v8h3v-8H4zm6 0v8h3v-8h-3zm6 0v8h3v-8h-3zM2 20h20v2H2v-2z" />
          </svg>
        ),
      };

    case "age-calculator":
      return {
        bgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="15.5" r="2.5" fill="#ffffff" />
          </svg>
        ),
      };

    case "cgpa-calculator":
      return {
        bgClass: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3zm0 14L5 13.5v3.5c0 3 3.1 5 7 5s7-2 7-5v-3.5L12 17z" />
          </svg>
        ),
      };

    case "percentage-calculator":
      return {
        bgClass: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="7" cy="7" r="2.5" fill="#ffffff" />
            <circle cx="17" cy="17" r="2.5" fill="#ffffff" />
          </svg>
        ),
      };

    case "date-difference-calculator":
      return {
        bgClass: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M7 15h10m-3-3l3 3-3 3" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // DEV & TEXT UTILITIES (Bold code braces, QR, keys, hashes)
    // ═══════════════════════════════════════════════════════════════════════════
    case "json-formatter":
      return {
        bgClass: "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-violet-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <path d="M8 4c-2.5 0-4 1.5-4 4v1.5c0 1.5-1.5 2.5-3 2.5 1.5 0 3 1 3 2.5V16c0 2.5 1.5 4 4 4M16 4c2.5 0 4 1.5 4 4v1.5c0 1.5 1.5 2.5 3 2.5-1.5 0-3 1-3 2.5V16c0 2.5-1.5 4-4 4" />
          </svg>
        ),
      };

    case "qr-code-generator":
      return {
        bgClass: "bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-zinc-800/20 dark:from-zinc-700 dark:to-zinc-900",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <rect x="2.5" y="2.5" width="8" height="8" rx="2" />
            <rect x="4.5" y="4.5" width="4" height="4" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="13.5" y="2.5" width="8" height="8" rx="2" />
            <rect x="15.5" y="4.5" width="4" height="4" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="2.5" y="13.5" width="8" height="8" rx="2" />
            <rect x="4.5" y="15.5" width="4" height="4" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="14" y="14" width="4" height="4" />
            <rect x="18" y="18" width="4" height="4" />
          </svg>
        ),
      };

    case "word-counter":
      return {
        bgClass: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M4 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V3zm4 5h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
          </svg>
        ),
      };

    case "remove-duplicate-lines":
      return {
        bgClass: "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="14" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
            <path d="M17 10l4 4-4 4" />
          </svg>
        ),
      };

    case "url-encode-decode":
      return {
        bgClass: "bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-sky-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        ),
      };

    case "uuid-generator":
      return {
        bgClass: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
            <circle cx="8.5" cy="8.5" r="2" fill="#ffffff" />
            <circle cx="15.5" cy="8.5" r="2" fill="#ffffff" />
            <circle cx="8.5" cy="15.5" r="2" fill="#ffffff" />
            <circle cx="15.5" cy="15.5" r="2" fill="#ffffff" />
          </svg>
        ),
      };

    case "password-generator":
      return {
        bgClass: "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-red-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V6zm3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        ),
      };

    case "slug-generator":
      return {
        bgClass: "bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-slate-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
            <path d="M7 12h2.5M12 12h2.5M17 12h.5" />
          </svg>
        ),
      };

    case "case-converter":
      return {
        bgClass: "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-indigo-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <path d="M4 19l4-12 4 12M5.5 14.5h5" />
            <path d="M16 11a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm3.5 2v6" />
          </svg>
        ),
      };

    case "base64-tool":
      return {
        bgClass: "bg-gradient-to-br from-stone-600 to-zinc-800 text-white shadow-stone-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s}>
            <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
            <path d="M7.5 9h2v6h-2zM14 9h2.5v6H14z" />
          </svg>
        ),
      };

    case "wav-to-mp3":
      return {
        bgClass: "bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-violet-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h5V3h-7z" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // DEFAULT CATEGORY FALLBACKS
    // ═══════════════════════════════════════════════════════════════════════════
    default:
      if (category === "pdf" || category === "documents") {
        return {
          bgClass: "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
          ),
        };
      }
      if (category === "images") {
        return {
          bgClass: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 16H6l4.5-6 3.5 4.5 2.5-3 1.5 4.5zM8.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          ),
        };
      }
      if (category === "calculators") {
        return {
          bgClass: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 4v2H7V7h10zm-6 6H7v-2h4v2zm0 4H7v-2h4v2zm6-4h-4v-2h4v2zm0 4h-4v-2h4v2z" />
            </svg>
          ),
        };
      }
      return {
        bgClass: "bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-zinc-800/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className={s}>
            <path d="M12 2l10 9h-3v11H5V11H2l10-9z" />
          </svg>
        ),
      };
  }
}
