"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Music,
  Image as ImageIcon,
  Scissors,
  Zap,
  Search,
  Palette,
  ArrowLeftRight,
  Layers,
  SunMedium,
  Eye,
  Pipette,
  EyeOff,
  Minimize2,
  Expand,
  Smartphone,
  Crop,
  FolderInput,
  RotateCw,
  CalendarDays,
  Banknote,
  Receipt,
  Percent,
  GraduationCap,
  CalendarRange,
  Type,
  ListFilter,
  Braces,
  Binary,
  Link as LinkIcon,
  Fingerprint,
  KeyRound,
  QrCode,
  Hash,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Check,
  ShieldCheck,
  Cpu,
  Infinity as InfinityIcon,
  ArrowUpRight,
} from "lucide-react";
import { CATEGORIES, TOOLS, ToolItem } from "@/config/tools";
import { CustomSelect } from "@/components/ui/custom-select";
import { ToolIcon } from "@/components/ui/tool-icon";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Music,
  ImageIcon,
  Scissors,
  Zap,
  Palette,
  ArrowLeftRight,
  Layers,
  Swatch: Palette,
  SunMedium,
  Eye,
  Pipette,
  EyeOff,
  Minimize2,
  UserSquare: ImageIcon,
  Expand,
  Smartphone,
  FileImage: ImageIcon,
  Crop,
  FolderInput,
  RotateCw,
  CalendarDays,
  Banknote,
  Receipt,
  Percent,
  GraduationCap,
  CalendarRange,
  Type,
  ListFilter,
  Braces,
  Binary,
  Link: LinkIcon,
  Fingerprint,
  KeyRound,
  QrCode,
  Hash,
};

// Category Color Branding Inspired by iLovePDF visual identity
const CATEGORY_COLOR_STYLES: Record<
  string,
  {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    accentHover: string;
  }
> = {
  pdf: {
    iconBg: "bg-red-50 dark:bg-red-950/50 border-red-200/80 dark:border-red-900/60",
    iconColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800",
    badgeText: "text-red-700 dark:text-red-300",
    accentHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
  },
  documents: {
    iconBg: "bg-red-50 dark:bg-red-950/50 border-red-200/80 dark:border-red-900/60",
    iconColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800",
    badgeText: "text-red-700 dark:text-red-300",
    accentHover: "group-hover:text-red-600 dark:group-hover:text-red-400",
  },
  images: {
    iconBg: "bg-blue-50 dark:bg-blue-950/50 border-blue-200/80 dark:border-blue-900/60",
    iconColor: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
    badgeText: "text-blue-700 dark:text-blue-300",
    accentHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  calculators: {
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200/80 dark:border-emerald-900/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    accentHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  text: {
    iconBg: "bg-purple-50 dark:bg-purple-950/50 border-purple-200/80 dark:border-purple-900/60",
    iconColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
    badgeText: "text-purple-700 dark:text-purple-300",
    accentHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
  color: {
    iconBg: "bg-rose-50 dark:bg-rose-950/50 border-rose-200/80 dark:border-rose-900/60",
    iconColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
    badgeText: "text-rose-700 dark:text-rose-300",
    accentHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
  },
};

const FAQS = [
  {
    q: "How does TheSwiftTools process files without uploading them to a server?",
    a: "All transformations use WebAssembly (WASM), HTML5 Canvas, and local JavaScript running directly inside your browser. When you drop a file onto a tool, it loads into your computer's RAM. The file never leaves your device and no network request carries your file bytes.",
  },
  {
    q: "Are there any file size limits or usage quotas?",
    a: "No artificial limits exist. Because computation happens on your local hardware rather than cloud servers, you can process as many files as your device memory allows. There are no daily credits, watermarks, or paid subscriptions.",
  },
  {
    q: "Does this work offline?",
    a: "Yes. Once the web application and its WebAssembly modules are cached in your browser, you can disconnect from the internet and continue converting files, formatting code, and calculating taxes completely offline.",
  },
  {
    q: "Is the Salary Tax Calculator updated for current FBR tax slabs?",
    a: "Yes. It implements the official Pakistan Federal Board of Revenue progressive tax slabs for the 2024–2025 and 2025–2026 fiscal years, including monthly and annual breakdowns for salaried individuals.",
  },
  {
    q: "Is my personal data or financial information stored anywhere?",
    a: "None of it is stored. We do not maintain user databases, session storage for files, or logging infrastructure for user payloads. Your data disappears as soon as you close or reload the browser tab.",
  },
];

export default function HomePage() {
  return (
    <React.Suspense fallback={null}>
      <HomeContent />
    </React.Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat") || null;

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(catParam);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(24);
  const [openFaq, setOpenFaq] = React.useState<number>(0);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory(null);
    }
    setCurrentPage(1);
  }, [catParam]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredTools = React.useMemo(() => {
    return TOOLS.filter((tool) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      const matchesCat =
        !selectedCategory ||
        tool.category === selectedCategory ||
        (selectedCategory === "pdf" && tool.category === "documents");
      return matchesQuery && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredTools.length / pageSize) || 1;
  const paginatedTools = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTools.slice(startIndex, startIndex + pageSize);
  }, [filteredTools, currentPage, pageSize]);

  return (
    <main className="flex-1 flex flex-col bg-transparent">
      {/* ─── HERO: ILOVEPDF-STYLE CENTERED TITLE & CATEGORY PILLS ──────────── */}
      <section className="bg-transparent px-4 pt-8 pb-3 sm:pt-16 sm:pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-4 sm:space-y-6">
          {/* Main Title (Generous, bold, high-contrast) */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.14]">
            Every tool you need to work with files in{" "}
            <span className="heading-highlight">one place</span>
          </h1>

          {/* Subtitle (17px-19px comfortable reading font) */}
          <p className="text-base sm:text-lg lg:text-[19px] text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Every tool you need at your fingertips. 100% free, private, and client-side. Merge PDFs, compress images, convert formats, and calculate taxes with zero file uploads.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-zinc-950/90 focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:border-red-600 dark:focus-within:border-red-500 shadow-md shadow-zinc-200/40 dark:shadow-black/40 focus-within:shadow-xl transition-all">
              <Search className="h-5 w-5 text-zinc-400 ml-4 shrink-0 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 44+ tools (compress, pdf, convert, tax)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-3.5 pr-20 text-base font-medium bg-transparent text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none"
              />
              <div className="absolute right-3.5 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-3 py-1 text-xs text-zinc-600 hover:text-zinc-950 dark:hover:text-zinc-100 font-bold cursor-pointer"
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-zinc-500 bg-zinc-200/70 dark:bg-zinc-800 rounded-md border border-zinc-300 dark:border-zinc-700">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* iLovePDF-style Filter Pills (Comfortable 15px font, bold, clear active state) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`text-sm sm:text-[15px] font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${selectedCategory === null
                ? "bg-red-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
            >
              All Tools ({TOOLS.length})
            </button>
            {CATEGORIES.filter((c) => c.id !== "documents").map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = TOOLS.filter(
                (t) => t.category === cat.id || (cat.id === "pdf" && t.category === "documents")
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                  className={`text-sm sm:text-[15px] font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${isSelected
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MAIN TOOL DIRECTORY GRID (SPACIOUS, LARGE READABLE TYPOGRAPHY) ── */}
      <section id="explore" className="mx-auto max-w-7xl px-4 pt-1 pb-10 sm:py-14 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8 scroll-mt-20">
        {/* Count & Pagination Meta Bar */}
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-[15px] text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-3 sm:pb-4">
          <span className="font-medium truncate pr-1">
            Showing <strong className="text-zinc-950 dark:text-zinc-100 tabular-digits">{(currentPage - 1) * pageSize + 1}</strong>–
            <strong className="text-zinc-950 dark:text-zinc-100 tabular-digits">{Math.min(currentPage * pageSize, filteredTools.length)}</strong> of{" "}
            <strong className="text-zinc-950 dark:text-zinc-100 tabular-digits">{filteredTools.length} tools</strong>
          </span>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="font-medium text-xs sm:text-sm hidden sm:inline">Show per page:</span>
            <span className="font-medium text-xs sm:hidden text-zinc-500">Show:</span>
            <CustomSelect
              value={pageSize}
              onChange={(val) => {
                setPageSize(Number(val));
                setCurrentPage(1);
              }}
              options={[
                { value: 24, label: "24 tools" },
                { value: 48, label: "48 tools" },
                { value: 100, label: "All tools" },
              ]}
              size="sm"
              className="w-28 sm:w-36"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 space-y-4 bg-white dark:bg-zinc-900">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              No matching tools found
            </h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              We couldn&apos;t find any tool matching &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="px-6 py-3 rounded-full bg-red-600 text-white text-sm sm:text-base font-bold cursor-pointer hover:bg-red-700 transition-colors shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* iLovePDF-Style Spacious Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedTools.map((tool) => {
                const colors = CATEGORY_COLOR_STYLES[tool.category] || CATEGORY_COLOR_STYLES.text;
                const isReady = tool.status === "ready";

                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white via-white to-zinc-50/75 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 p-6 sm:p-7 shadow-md shadow-zinc-200/50 dark:shadow-black/50 hover:shadow-2xl hover:shadow-zinc-300/50 dark:hover:shadow-black/80 hover:border-red-500/35 dark:hover:border-red-500/35 hover:-translate-y-1.5 transition-all duration-300 min-h-[220px]"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Prominent Colorful Icon & Badge */}
                      <div className="flex items-center justify-between">
                        <ToolIcon toolId={tool.id} category={tool.category} size="md" />

                        {tool.badge && (
                          <span
                            className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${colors.badgeBg} ${colors.badgeText}`}
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>

                      {/* Tool Title: Minimum 18px-20px Bold Font */}
                      <h2
                        className={`text-lg sm:text-[19px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-snug transition-colors ${colors.accentHover}`}
                      >
                        {tool.name}
                      </h2>

                      {/* Tool Description: Minimum 16px Comfortable Font */}
                      <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3 font-normal">
                        {tool.description}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-sm">
                      <span className="font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-xs">
                        {tool.category}
                      </span>
                      <span className="font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5 group-hover:translate-x-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all text-sm">
                        {isReady ? "Open Tool" : "Preview"} <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm sm:text-base font-medium">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Page <strong className="text-zinc-950 dark:text-zinc-100">{currentPage}</strong> of{" "}
                  <strong className="text-zinc-950 dark:text-zinc-100">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex-1 sm:flex-none justify-center h-10 px-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer inline-flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 inline mr-1" /> Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-full text-sm font-bold cursor-pointer transition-colors ${currentPage === page
                          ? "bg-red-600 text-white shadow-xs"
                          : "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex-1 sm:flex-none justify-center h-10 px-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer inline-flex items-center"
                  >
                    Next <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── FEATURE SECTION: "WORK YOUR WAY" (INSP: ILOVEPDF HERO BANNER) ── */}
      <section className="bg-white/75 dark:bg-zinc-900/75 backdrop-blur-xs border-t border-b border-zinc-200/80 dark:border-zinc-800/80 py-8 sm:py-18 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
              The privacy standard for{" "}
              <span className="heading-highlight">modern web utilities</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Why thousands of students, researchers, and professionals choose client-side processing over legacy upload portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-red-100/80 dark:border-zinc-800 bg-gradient-to-b from-white via-white to-red-50/25 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-red-950/20 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                100% In-Browser Privacy
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your private contracts, tax returns, and passport photos never travel across the internet. Files are loaded into local RAM and destroyed when the tab is closed.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-red-100/80 dark:border-zinc-800 bg-gradient-to-b from-white via-white to-red-50/25 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-red-950/20 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                <Cpu className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Native CPU Speed (WASM)
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No waiting for megabytes to upload on slow cellular networks. WebAssembly and Canvas APIs leverage your machine hardware for instantaneous conversion.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-red-100/80 dark:border-zinc-800 bg-gradient-to-b from-white via-white to-red-50/25 dark:from-zinc-900/90 dark:via-zinc-900/90 dark:to-red-950/20 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                <InfinityIcon className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Uncapped &amp; Zero Paywalls
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Because we do not run expensive server file storage, you will never be hit with daily file caps, registration paywalls, or watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEO-OPTIMIZED FAQ SECTION (SEMANTIC TAGS, 18PX HEADINGS) ──────── */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl px-4 py-8 sm:py-20 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8"
      >
        <div className="text-center space-y-3">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            Frequently Asked <span className="heading-highlight">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to know about our free, client-side document and image utilities.
          </p>
        </div>

        <dl className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="py-6">
                <dt>
                  <button
                    onClick={() => setOpenFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-100 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-400 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </dt>
                {isOpen && (
                  <dd className="mt-3.5 text-base sm:text-[17px] text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl pr-4">
                    {faq.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </section>
    </main>
  );
}
