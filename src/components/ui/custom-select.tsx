"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption<T extends string | number = string> = {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export interface CustomSelectProps<T extends string | number = string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  menuClassName?: string;
  size?: "xs" | "sm" | "md" | "lg";
  id?: string;
  "aria-label"?: string;
}

const SIZE_STYLES = {
  xs: "h-7 px-2 text-xs rounded-lg gap-1",
  sm: "h-9 px-3 text-xs sm:text-sm rounded-lg gap-1.5",
  md: "h-11 px-3.5 text-sm sm:text-base rounded-xl gap-2",
  lg: "h-13 px-4 text-base rounded-xl gap-2.5",
};

const CHEVRON_SIZES = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-4.5 w-4.5",
};

export function CustomSelect<T extends string | number = string>({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className,
  menuClassName,
  size = "md",
  id,
  "aria-label": ariaLabel,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = React.useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  // Click outside listener
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const nextIndex = Math.min(currentIndex + 1, options.length - 1);
        if (!options[nextIndex]?.disabled) {
          onChange(options[nextIndex].value);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === value);
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (!options[prevIndex]?.disabled) {
          onChange(options[prevIndex].value);
        }
      }
    }
  };

  const handleSelect = (optValue: T) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block w-full text-left", className)}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between font-medium transition-all select-none cursor-pointer",
          "border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-50",
          "hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-2xs",
          "focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-600 dark:focus:border-red-500",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          isOpen && "border-red-600 dark:border-red-500 ring-2 ring-red-500/20 shadow-xs",
          SIZE_STYLES[size]
        )}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <ChevronDown
          className={cn(
            "text-zinc-400 dark:text-zinc-500 shrink-0 transition-transform duration-200",
            CHEVRON_SIZES[size],
            isOpen && "rotate-180 text-red-600 dark:text-red-400"
          )}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute left-0 z-50 mt-1.5 w-full min-w-[140px] max-h-64 overflow-y-auto rounded-xl",
            "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl",
            "p-1.5 space-y-0.5 animate-in fade-in-0 zoom-in-95 duration-100",
            menuClassName
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors select-none cursor-pointer",
                  opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
                  isSelected
                    ? "bg-red-50 text-red-600 font-bold dark:bg-red-950/60 dark:text-red-400"
                    : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-950 dark:hover:text-zinc-50"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <div className="truncate">
                    <div className="truncate">{opt.label}</div>
                    {opt.description && (
                      <div className="text-[11px] font-normal text-zinc-400 dark:text-zinc-500 truncate">
                        {opt.description}
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 ml-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
