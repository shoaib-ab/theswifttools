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
  sm: "h-9 w-9 rounded-lg text-[10px]",
  md: "h-12 w-12 rounded-xl text-xs",
  lg: "h-14 w-14 rounded-2xl text-sm",
};

/**
 * Custom purpose-built solid SVG tool pictograms in the style of iLovePDF.
 * Bold, filled shapes, solid tool identities, and clear visual language.
 */
export function ToolIcon({ toolId, category, className, size = "md" }: ToolIconProps) {
  const iconContent = getToolSvg(toolId, category);

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105 select-none",
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

function getToolSvg(id: string, category?: string): SvgConfig {
  switch (id) {
    // ═══════════════════════════════════════════════════════════════════════════
    // PDF TOOLS (Bold, punchy solid pictograms)
    // ═══════════════════════════════════════════════════════════════════════════
    case "merge-pdf":
      return {
        bgClass: "bg-red-600 text-white shadow-red-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {/* Sheet 1 Left */}
            <path d="M4 4a2 2 0 0 1 2-2h4l4 4v2H6a2 2 0 0 0-2 2v8H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" opacity="0.65" />
            {/* Sheet 2 Main */}
            <path d="M8 8a2 2 0 0 1 2-2h5l4 4v10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V8z" />
            {/* Inward Arrows */}
            <path d="M11 14h6m-2-2 2 2-2 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M7 14h-1m2-2-2 2 2 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ),
      };

    case "split-pdf":
      return {
        bgClass: "bg-orange-600 text-white shadow-orange-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {/* Page 1 */}
            <path d="M3 5a2 2 0 0 1 2-2h4v16H5a2 2 0 0 1-2-2V5z" />
            {/* Page 2 */}
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4V3z" />
            {/* Splitting outward arrows */}
            <path d="M10 12H7m2-2-2 2 2 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M14 12h3m-2-2 2 2-2 2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ),
      };

    case "compress-pdf":
      return {
        bgClass: "bg-emerald-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* PDF Sheet Center */}
            <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
            {/* 4 Inward Corner Arrows */}
            <path d="M4 4l4 4m0-3v3h-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 4l-4 4m0-3v3h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20l4-4m0 3v-3h-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 20l-4-4m0 3v-3h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "rotate-pdf":
      return {
        bgClass: "bg-purple-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Document sheet */}
            <rect x="8" y="7" width="8" height="10" rx="1.5" fill="currentColor" opacity="0.9" />
            {/* Circular Rotation Arrow */}
            <path
              d="M12 3a9 9 0 1 0 8.5 6M20 5v4h-4"
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
        bgClass: "bg-amber-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* PDF sheet */}
            <rect x="3" y="4" width="7" height="10" rx="1.5" fill="currentColor" />
            <text x="4" y="11" fill="#b45309" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">PDF</text>
            {/* Arrow */}
            <path d="M11 9h2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            {/* Photo Image Card */}
            <rect x="14" y="6" width="7" height="12" rx="1.5" fill="#ffffff" />
            <circle cx="16.5" cy="9.5" r="1" fill="#d97706" />
            <path d="M14 16l2.5-3 2 2.5 1.5-1.5 1 2z" fill="#d97706" />
          </svg>
        ),
      };

    case "jpg-to-pdf":
      return {
        bgClass: "bg-amber-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Photo Card */}
            <rect x="3" y="6" width="7" height="12" rx="1.5" fill="#ffffff" />
            <circle cx="5.5" cy="9.5" r="1" fill="#d97706" />
            <path d="M3 16l2.5-3 2 2.5 1.5-1.5 1 2z" fill="#d97706" />
            {/* Arrow */}
            <path d="M11 12h2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            {/* PDF sheet */}
            <rect x="14" y="4" width="7" height="14" rx="1.5" fill="currentColor" />
            <text x="15" y="13" fill="#b45309" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">PDF</text>
          </svg>
        ),
      };

    case "word-to-pdf":
      return {
        bgClass: "bg-blue-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Word Badge Left */}
            <rect x="3" y="5" width="8" height="14" rx="1.5" fill="#1e40af" />
            <text x="4.5" y="15" fill="#ffffff" fontSize="8" fontWeight="900" fontFamily="sans-serif">W</text>
            {/* Arrow */}
            <path d="M11.5 12h2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            {/* PDF Sheet Right */}
            <rect x="14" y="5" width="7" height="14" rx="1.5" fill="#ef4444" />
            <text x="14.8" y="14" fill="#ffffff" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">PDF</text>
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGE STUDIO (Solid photo frames, crop marks, format badges)
    // ═══════════════════════════════════════════════════════════════════════════
    case "compress-image":
      return {
        bgClass: "bg-emerald-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Image frame */}
            <rect x="7" y="7" width="10" height="10" rx="2" fill="#ffffff" />
            <circle cx="10" cy="10" r="1" fill="#059669" />
            <path d="M7 15l3-3 2.5 2.5 2-2 2.5 2.5z" fill="#059669" />
            {/* Corner compression arrows */}
            <path d="M4 4l3.5 3.5m0-3v3h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 4l-3.5 3.5m0-3v3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20l3.5-3.5m0 3v-3h-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 20l-3.5-3.5m0 3v-3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "passport-photo-maker":
      return {
        bgClass: "bg-indigo-600 text-white shadow-indigo-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Crop Viewfinder Corners */}
            <path d="M5 8V5h3M16 5h3v3M19 16v3h-3M8 19H5v-3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* User Silhouette */}
            <circle cx="12" cy="10" r="2.8" fill="#ffffff" />
            <path d="M7.5 17.5a4.5 4.5 0 0 1 9 0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        ),
      };

    case "image-resizer":
      return {
        bgClass: "bg-sky-600 text-white shadow-sky-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <rect x="6" y="6" width="12" height="12" rx="2" stroke="#ffffff" strokeWidth="2" fill="none" />
            {/* 4 Diagonal Resize arrows */}
            <path d="M3 3l5 5m-5 0V3h5M21 3l-5 5m5 0V3h-5M3 21l5-5m-5 0v5h5M21 21l-5-5m5 0v5h-5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      };

    case "crop-image":
      return {
        bgClass: "bg-cyan-600 text-white shadow-cyan-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M6 2v14a2 2 0 0 0 2 2h14" />
            <path d="M18 22V8a2 2 0 0 0-2-2H2" />
          </svg>
        ),
      };

    case "jpg-to-png":
    case "png-to-webp":
    case "webp-to-jpg":
    case "jpg-to-webp":
    case "heic-to-jpg":
    case "image-to-webp":
      return {
        bgClass: "bg-blue-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <rect x="3" y="5" width="8" height="10" rx="1.5" fill="#ffffff" />
            <circle cx="5.5" cy="7.5" r="0.8" fill="#2563eb" />
            <path d="M3 13l2.5-2.5 2 2 1.5-1.5 2 2z" fill="#2563eb" />
            {/* Arrow */}
            <path d="M11.5 12h2.5m-1.5-1.5l1.5 1.5-1.5 1.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14.5" y="8" width="6.5" height="11" rx="1.5" fill="#ffffff" />
            <circle cx="16.5" cy="10.5" r="0.8" fill="#2563eb" />
            <path d="M14.5 17l2-2 1.5 1.5 1-1 2 2z" fill="#2563eb" />
          </svg>
        ),
      };

    case "image-to-pdf":
      return {
        bgClass: "bg-rose-600 text-white shadow-rose-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <rect x="3" y="6" width="7" height="12" rx="1.5" fill="#ffffff" />
            <circle cx="5.5" cy="9.5" r="1" fill="#e11d48" />
            <path d="M3 16l2.5-3 2 2.5 1.5-1.5 1 2z" fill="#e11d48" />
            <path d="M11 12h2" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <rect x="14" y="4" width="7" height="14" rx="1.5" fill="currentColor" />
            <text x="14.8" y="13" fill="#ffffff" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">PDF</text>
          </svg>
        ),
      };

    case "svg-to-png":
      return {
        bgClass: "bg-violet-600 text-white shadow-violet-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            {/* Vector Pen / Curve */}
            <path d="M4 17l4-4 3 3 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="4" cy="17" r="2" fill="#ffffff" />
            <circle cx="11" cy="16" r="1.5" fill="#ffffff" />
            <circle cx="18" cy="9" r="2" fill="#ffffff" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // COLOR TOOLS (Palettes, Pipettes, Swatches)
    // ═══════════════════════════════════════════════════════════════════════════
    case "color-picker":
      return {
        bgClass: "bg-rose-600 text-white shadow-rose-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            {/* Pipette */}
            <path d="M18.8 3.2a2.8 2.8 0 0 0-4 0l-2.4 2.4 4 4 2.4-2.4a2.8 2.8 0 0 0 0-4zM11 7l-7 7v4h4l7-7-4-4zM2 21a1 1 0 0 0 1 1c1.5 0 2-1 3-1s1.5 1 3 1a1 1 0 0 0 0-2c-.5 0-1-.5-2-.5s-1.5.5-2.5.5-1.5-.5-2.5-.5z" />
          </svg>
        ),
      };

    case "hex-to-rgb":
      return {
        bgClass: "bg-pink-600 text-white shadow-pink-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="20" y2="15" />
            <line x1="10" y1="3" x2="8" y2="21" />
            <line x1="16" y1="3" x2="14" y2="21" />
          </svg>
        ),
      };

    case "gradient-generator":
      return {
        bgClass: "bg-fuchsia-600 text-white shadow-fuchsia-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <defs>
              <linearGradient id="grad-bar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect x="3" y="6" width="18" height="12" rx="3" fill="url(#grad-bar)" />
          </svg>
        ),
      };

    case "color-palette-generator":
      return {
        bgClass: "bg-purple-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 2a10 10 0 0 0-10 10c0 4.4 3 8 7 8 1 0 1.5-.5 1.5-1.2 0-.4-.2-.8-.2-1.2a1.8 1.8 0 0 1 1.8-1.8H14a6 6 0 0 0 6-6c0-4.4-3.6-7.8-8-7.8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        ),
      };

    case "shades-tints-generator":
      return {
        bgClass: "bg-orange-600 text-white shadow-orange-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <rect x="3" y="4" width="4" height="16" rx="1" opacity="0.3" />
            <rect x="8" y="4" width="4" height="16" rx="1" opacity="0.6" />
            <rect x="13" y="4" width="4" height="16" rx="1" opacity="0.85" />
            <rect x="18" y="4" width="4" height="16" rx="1" />
          </svg>
        ),
      };

    case "color-contrast-checker":
      return {
        bgClass: "bg-slate-700 text-white shadow-slate-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <circle cx="12" cy="12" r="9" stroke="#ffffff" strokeWidth="2" />
            <path d="M12 3a9 9 0 0 1 0 18V3z" fill="#ffffff" />
          </svg>
        ),
      };

    case "image-color-picker":
      return {
        bgClass: "bg-rose-700 text-white shadow-rose-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <circle cx="12" cy="12" r="8" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <circle cx="12" cy="12" r="2" fill="#ffffff" />
          </svg>
        ),
      };

    case "color-blindness-simulator":
      return {
        bgClass: "bg-red-500 text-white shadow-red-400/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" fill="#ffffff" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // CALCULATORS (Bold, solid numbers, formulas, currencies)
    // ═══════════════════════════════════════════════════════════════════════════
    case "salary-tax-calculator":
      return {
        bgClass: "bg-emerald-600 text-white shadow-emerald-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#ffffff" strokeWidth="2" />
            <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
            <path d="M6 10h1M17 14h1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
      };

    case "emi-calculator":
      return {
        bgClass: "bg-blue-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 2l-9 7h3v11h12V9h3l-9-7zm0 5.5c1.4 0 2.5 1.1 2.5 2.5S13.4 12.5 12 12.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5zm-3 8.5v-1.5c0-1.5 2-2.5 3-2.5s3 1 3 2.5v1.5H9z" />
          </svg>
        ),
      };

    case "age-calculator":
      return {
        bgClass: "bg-amber-600 text-white shadow-amber-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="15" r="2" fill="#ffffff" />
          </svg>
        ),
      };

    case "cgpa-calculator":
      return {
        bgClass: "bg-indigo-600 text-white shadow-indigo-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3zm0 13.8L5 13v4c0 2.8 3.1 5 7 5s7-2.2 7-5v-4l-7 3.8z" />
          </svg>
        ),
      };

    case "percentage-calculator":
      return {
        bgClass: "bg-teal-600 text-white shadow-teal-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <line x1="19" y1="5" x2="5" y2="19" />
            <circle cx="7" cy="7" r="2" fill="#ffffff" />
            <circle cx="17" cy="17" r="2" fill="#ffffff" />
          </svg>
        ),
      };

    case "date-difference-calculator":
      return {
        bgClass: "bg-cyan-600 text-white shadow-cyan-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M8 15h8m-3-3l3 3-3 3" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // DEV & TEXT UTILITIES (Bold code braces, QR, keys, hashes)
    // ═══════════════════════════════════════════════════════════════════════════
    case "json-formatter":
      return {
        bgClass: "bg-violet-600 text-white shadow-violet-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M7 4c-2 0-3 1.5-3 3v2c0 1.5-1 2-2 2 1 0 2 .5 2 2v2c0 1.5 1 3 3 3M17 4c2 0 3 1.5 3 3v2c0 1.5 1 2 2 2-1 0-2 .5-2 2v2c0 1.5-1 3-3 3" />
          </svg>
        ),
      };

    case "qr-code-generator":
      return {
        bgClass: "bg-zinc-900 text-white shadow-zinc-800/20 dark:bg-zinc-800",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="5" y="5" width="3" height="3" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="16" y="5" width="3" height="3" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="5" y="16" width="3" height="3" fill="#18181b" className="dark:fill-zinc-800" />
            <rect x="14" y="14" width="3" height="3" />
            <rect x="18" y="18" width="3" height="3" />
          </svg>
        ),
      };

    case "word-counter":
      return {
        bgClass: "bg-blue-600 text-white shadow-blue-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm4 4h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
          </svg>
        ),
      };

    case "remove-duplicate-lines":
      return {
        bgClass: "bg-purple-600 text-white shadow-purple-500/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
            <path d="M18 10l3 3-3 3" />
          </svg>
        ),
      };

    case "url-encode-decode":
      return {
        bgClass: "bg-sky-700 text-white shadow-sky-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        ),
      };

    case "uuid-generator":
      return {
        bgClass: "bg-emerald-700 text-white shadow-emerald-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <circle cx="9" cy="9" r="1.5" fill="#ffffff" />
            <circle cx="15" cy="9" r="1.5" fill="#ffffff" />
            <circle cx="9" cy="15" r="1.5" fill="#ffffff" />
            <circle cx="15" cy="15" r="1.5" fill="#ffffff" />
          </svg>
        ),
      };

    case "password-generator":
      return {
        bgClass: "bg-red-700 text-white shadow-red-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.7 1.3-3 3-3s3 1.3 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
          </svg>
        ),
      };

    case "slug-generator":
      return {
        bgClass: "bg-slate-700 text-white shadow-slate-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M7 12h2M11 12h2M15 12h2" />
          </svg>
        ),
      };

    case "case-converter":
      return {
        bgClass: "bg-indigo-700 text-white shadow-indigo-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M4 18h4m-2-7v7M14 8h6M17 8v10" />
          </svg>
        ),
      };

    case "base64-tool":
      return {
        bgClass: "bg-stone-700 text-white shadow-stone-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 9h2v6H8M14 9h2v6h-2" />
          </svg>
        ),
      };

    case "wav-to-mp3":
      return {
        bgClass: "bg-violet-700 text-white shadow-violet-600/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ),
      };

    // ═══════════════════════════════════════════════════════════════════════════
    // DEFAULT FALLBACKS BY CATEGORY
    // ═══════════════════════════════════════════════════════════════════════════
    default:
      if (category === "pdf" || category === "documents") {
        return {
          bgClass: "bg-red-600 text-white shadow-red-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
          ),
        };
      }
      if (category === "images") {
        return {
          bgClass: "bg-blue-600 text-white shadow-blue-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 16H6l4.5-6 3.5 4.5 2.5-3 1.5 4.5zM8.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          ),
        };
      }
      if (category === "calculators") {
        return {
          bgClass: "bg-emerald-600 text-white shadow-emerald-500/20",
          svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2 4v2H7V7h10zm-6 6H7v-2h4v2zm0 4H7v-2h4v2zm6-4h-4v-2h4v2zm0 4h-4v-2h4v2z" />
            </svg>
          ),
        };
      }
      return {
        bgClass: "bg-zinc-800 text-white shadow-zinc-700/20",
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M12 2l10 9h-3v11H5V11H2l10-9z" />
          </svg>
        ),
      };
  }
}
