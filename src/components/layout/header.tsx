"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Zap,
  Menu,
  X,
  ChevronDown,
  FileText,
  ImageIcon,
  Receipt,
  Braces,
  Palette,
  ArrowRight,
  Layers,
  Scissors,
  Minimize2,
  CalendarDays,
  Percent,
  QrCode,
  Lock,
} from "lucide-react";

const MEGAMENU_SECTIONS = [
  {
    title: "PDF & Documents",
    category: "pdf",
    color: "text-red-600 dark:text-red-400",
    tools: [
      { name: "Merge PDF", href: "/tools/merge-pdf", desc: "Combine multiple PDFs in order" },
      { name: "Split PDF", href: "/tools/split-pdf", desc: "Separate pages or extract ranges" },
      { name: "Compress PDF", href: "/tools/compress-pdf", desc: "Reduce file size losslessly" },
      { name: "Word to PDF", href: "/tools/word-to-pdf", desc: "Convert DOCX to standard PDF" },
      { name: "Rotate PDF", href: "/tools/rotate-pdf", desc: "Rotate specific or all pages" },
      { name: "PDF to JPG", href: "/tools/pdf-to-jpg", desc: "Extract PDF pages as images" },
    ],
  },
  {
    title: "Image Studio",
    category: "images",
    color: "text-blue-600 dark:text-blue-400",
    tools: [
      { name: "Compress Image", href: "/tools/compress-image", desc: "Target size down to 20KB-1MB" },
      { name: "Passport Photo Maker", href: "/tools/passport-photo-maker", desc: "Official white-background crop" },
      { name: "Image Resizer", href: "/tools/image-resizer", desc: "Scale dimensions by px or %" },
      { name: "Crop Image", href: "/tools/crop-image", desc: "Visual aspect-ratio cropping" },
      { name: "PNG to WebP", href: "/tools/png-to-webp", desc: "Transcode for web performance" },
      { name: "Image to PDF", href: "/tools/image-to-pdf", desc: "Convert photos into single PDF" },
    ],
  },
  {
    title: "Calculators",
    category: "calculators",
    color: "text-emerald-600 dark:text-emerald-400",
    tools: [
      { name: "Salary Tax (FBR)", href: "/tools/salary-tax-calculator", desc: "Pakistan 2024–2026 tax slabs" },
      { name: "EMI Calculator", href: "/tools/emi-calculator", desc: "Loan amortization schedules" },
      { name: "Age Calculator", href: "/tools/age-calculator", desc: "Exact age in days & minutes" },
      { name: "CGPA Calculator", href: "/tools/cgpa-calculator", desc: "Weighted semester grade GPA" },
      { name: "Percentage Calculator", href: "/tools/percentage-calculator", desc: "Discounts, growth & margins" },
    ],
  },
  {
    title: "Developer & Color",
    category: "text",
    color: "text-purple-600 dark:text-purple-400",
    tools: [
      { name: "JSON Formatter", href: "/tools/json-formatter", desc: "Lint, validate and beautify JSON" },
      { name: "QR Code Generator", href: "/tools/qr-code-generator", desc: "Offline high-res vector QR codes" },
      { name: "UUID Generator", href: "/tools/uuid-generator", desc: "Cryptographic v4 UUID generator" },
      { name: "Color Picker", href: "/tools/color-picker", desc: "HEX, RGB, HSL palette picker" },
      { name: "Gradient Generator", href: "/tools/gradient-generator", desc: "CSS multi-stop linear gradients" },
    ],
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const megaRef = React.useRef<HTMLDivElement>(null);

  // Close megamenu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90 shadow-md shadow-zinc-200/40 dark:shadow-black/40 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-zinc-950 dark:text-zinc-50 group shrink-0 focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-950 dark:text-zinc-50">
              TheSwiftTools
            </span>
          </Link>

          {/* iLovePDF-style Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
            <Link
              href="/tools/merge-pdf"
              className="px-3 py-2 rounded-lg hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors uppercase tracking-wider"
            >
              Merge PDF
            </Link>
            <Link
              href="/tools/split-pdf"
              className="px-3 py-2 rounded-lg hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors uppercase tracking-wider"
            >
              Split PDF
            </Link>
            <Link
              href="/tools/compress-image"
              className="px-3 py-2 rounded-lg hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors uppercase tracking-wider"
            >
              Compress Image
            </Link>
            <Link
              href="/tools/word-to-pdf"
              className="px-3 py-2 rounded-lg hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors uppercase tracking-wider"
            >
              Word to PDF
            </Link>

            {/* Megamenu Trigger Button */}
            <div className="relative" ref={megaRef}>
              <button
                onClick={() => setMegaOpen(!megaOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg uppercase tracking-wider font-bold transition-colors cursor-pointer ${megaOpen
                    ? "text-red-600 bg-red-50 dark:bg-red-950/40"
                    : "hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
              >
                <span>All Tools</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* iLovePDF-Style Megamenu Dropdown */}
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[860px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl z-50">
                  <div className="grid grid-cols-4 gap-6">
                    {MEGAMENU_SECTIONS.map((sec) => (
                      <div key={sec.title} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-100">
                            {sec.title}
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {sec.tools.map((tool) => (
                            <li key={tool.href}>
                              <Link
                                href={tool.href}
                                onClick={() => setMegaOpen(false)}
                                className="group block p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                              >
                                <div className="text-sm sm:text-[15px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                  {tool.name}
                                </div>
                                <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium line-clamp-1 mt-0.5">
                                  {tool.desc}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs sm:text-sm text-zinc-500">
                    <span className="font-medium">All tools execute 100% in your local browser memory.</span>
                    <Link
                      href="/#explore"
                      onClick={() => setMegaOpen(false)}
                      className="font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1.5"
                    >
                      Browse full directory ({44} tools) <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Quick launch / Action */}
          <Link
            href="/#explore"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm hover:shadow transition-all"
          >
            Browse 44 Tools
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {MEGAMENU_SECTIONS.map((sec) => (
            <div key={sec.title} className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-1">
                {sec.title}
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {sec.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-zinc-100"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
