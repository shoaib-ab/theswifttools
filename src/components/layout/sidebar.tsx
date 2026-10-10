"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/config/tools";
import {
  FileText,
  Music,
  Image as ImageIcon,
  Sparkles,
  Scissors,
  Zap,
  ArrowLeft,
  Shield,
  Search,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  Music,
  ImageIcon,
  Sparkles,
  Scissors,
  Zap,
};

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "pdf", label: "PDF" },
  { id: "images", label: "Images" },
  { id: "calculators", label: "Math" },
  { id: "text", label: "Dev" },
  { id: "color", label: "Color" },
];

const DEFAULT_WIDTH = 320;
const MIN_WIDTH = 240;
const MAX_WIDTH = 500;

export function ToolSidebar() {
  const pathname = usePathname();
  const [width, setWidth] = React.useState(DEFAULT_WIDTH);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedCat, setSelectedCat] = React.useState("all");

  // Restore width and collapsed preferences from localStorage
  React.useEffect(() => {
    try {
      const savedWidth = localStorage.getItem("tools_sidebar_width");
      if (savedWidth) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed)) {
          setWidth(Math.min(Math.max(parsed, MIN_WIDTH), MAX_WIDTH));
        }
      }
      const savedCollapsed = localStorage.getItem("sidebar_collapsed");
      if (savedCollapsed === "true") {
        setIsCollapsed(true);
      }
    } catch {}
  }, []);

  // Handle drag-resizing of sidebar width
  const startResizing = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate width from viewport left edge
      const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
      setWidth(newWidth);
      try {
        localStorage.setItem("tools_sidebar_width", String(newWidth));
      } catch {}
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const filteredTools = React.useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        selectedCat === "all" ||
        tool.category === selectedCat ||
        (selectedCat === "pdf" && tool.category === "documents");
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCat]);

  return (
    <>
      {/* ─── MOBILE DRAWER TRIGGER BAR (< lg) ─────────────────────────────── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-16 z-20">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 shadow-2xs hover:border-red-400 transition-colors cursor-pointer"
        >
          <PanelLeftOpen className="h-3.5 w-3.5 text-red-600" />
          Browse Tools
        </button>
        <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          100% In-Browser
        </span>
      </div>

      {/* ─── MOBILE SLIDE-OVER DRAWER MODAL ────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
              <Link
                href="/#explore"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-red-600 dark:text-zinc-400"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Tools
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filter controls */}
            <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter tools..."
                  className="w-full h-9 pl-9 pr-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    aria-label="Clear filter"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer",
                      selectedCat === cat.id
                        ? "bg-red-600 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 min-h-0">
              {filteredTools.map((tool) => {
                const Icon = ICON_MAP[tool.iconName] || FileText;
                const isActive = pathname === tool.href;
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all",
                      isActive
                        ? "bg-red-600 text-white font-bold"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-zinc-400")} />
                      <span className="truncate">{tool.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING RE-EXPAND PILL BUTTON (Visible when sidebar is closed) ─ */}
      {isCollapsed && (
        <div className="hidden lg:block fixed left-4 top-20 z-40">
          <button
            onClick={toggleCollapse}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-lg text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-400 transition-all cursor-pointer group"
            title="Expand tools sidebar (Adjustable panel)"
            aria-label="Expand tools sidebar"
          >
            <PanelLeftOpen className="h-4 w-4 text-red-600 transition-transform group-hover:scale-110" />
            <span>Browse Tools</span>
          </button>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR (ADJUSTABLE & SMOOTH COLLAPSIBLE) ─────────────── */}
      <aside
        style={{
          width: isCollapsed ? 0 : `${width}px`,
        }}
        className={cn(
          "shrink-0 hidden lg:flex flex-col sticky top-16 h-[calc(100vh-4rem)] z-30 select-none",
          "border-r border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md relative",
          isDragging
            ? "transition-none"
            : "transition-[width,opacity] duration-300 ease-in-out",
          isCollapsed
            ? "border-r-0 opacity-0 pointer-events-none overflow-hidden"
            : "opacity-100 overflow-visible"
        )}
      >
        {/* Inner Fixed Container (prevents layout jumping while sliding width) */}
        <div
          style={{ width: `${width}px` }}
          className="flex flex-col h-full min-h-0 flex-1 relative"
        >
          {/* Top Header: Navigation, Counter & Collapse Toggle */}
          <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800/80 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="flex items-center justify-between">
              <Link
                href="/#explore"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Tools
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {filteredTools.length} / {TOOLS.length}
                </span>
                <button
                  onClick={toggleCollapse}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Close sidebar"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Live Filter Input: Always preserved in DOM */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter tools..."
                className="w-full h-9 pl-9 pr-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium shadow-2xs"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  aria-label="Clear filter"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills: Always preserved in DOM */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer",
                    selectedCat === cat.id
                      ? "bg-red-600 text-white shadow-2xs"
                      : "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Scrollable Navigation List */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 min-h-0">
            {filteredTools.length === 0 ? (
              <div className="text-center py-10 px-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
                <p>No tools matching &ldquo;{search}&rdquo;</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCat("all");
                  }}
                  className="text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer"
                >
                  Reset filter
                </button>
              </div>
            ) : (
              filteredTools.map((tool) => {
                const Icon = ICON_MAP[tool.iconName] || FileText;
                const isActive = pathname === tool.href;

                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all",
                      isActive
                        ? "bg-red-600 text-white shadow-xs font-bold"
                        : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900/80"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-white"
                            : "text-zinc-500 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400"
                        )}
                      />
                      <span className="truncate">{tool.name}</span>
                    </div>
                    {tool.status === "coming-soon" ? (
                      <span
                        className={cn(
                          "text-[10px] uppercase font-mono px-1.5 py-0.5 rounded shrink-0",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                        )}
                      >
                        Soon
                      </span>
                    ) : null}
                  </Link>
                );
              })
            )}
          </div>

          {/* Bottom Pinned Security Badge */}
          <div className="p-3.5 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                    100% In-Browser
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Offline
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                Files run directly in RAM. Zero data uploaded to cloud servers.
              </p>
            </div>
          </div>

          {/* ─── DRAGGABLE RESIZER SPLITTER HANDLE ─────────────────────────── */}
          <div
            onMouseDown={startResizing}
            onDoubleClick={() => setWidth(DEFAULT_WIDTH)}
            className={cn(
              "absolute top-0 -right-1 w-2.5 h-full cursor-col-resize z-40 group select-none transition-colors",
              "hover:bg-red-500/20 active:bg-red-500/30",
              isDragging && "bg-red-500/30"
            )}
            title="Drag to resize panel, double-click to reset (320px)"
            role="separator"
            aria-orientation="vertical"
          >
            {/* Visual subtle hover line indicator */}
            <div
              className={cn(
                "w-0.5 h-full mx-auto transition-colors",
                isDragging
                  ? "bg-red-600"
                  : "bg-transparent group-hover:bg-red-500/70"
              )}
            />
          </div>
        </div>
      </aside>
    </>
  );
}