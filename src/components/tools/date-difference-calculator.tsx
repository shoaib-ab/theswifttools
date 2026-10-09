"use client";

import * as React from "react";
import { CalendarRange, Calendar, Copy, Check, Briefcase } from "lucide-react";

export function DateDifferenceCalculatorTool() {
  const [startDate, setStartDate] = React.useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = React.useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });
  const [includeEndDay, setIncludeEndDay] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const diff = React.useMemo(() => {
    if (!startDate || !endDate) return null;
    let start = new Date(startDate);
    let end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    let isReversed = false;
    if (start > end) {
      isReversed = true;
      const tmp = start;
      start = end;
      end = tmp;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate() + (includeEndDay ? 1 : 0);

    if (days < 0) {
      months -= 1;
      const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Exact days difference
    const oneDayMs = 1000 * 60 * 60 * 24;
    let totalDays = Math.round((end.getTime() - start.getTime()) / oneDayMs) + (includeEndDay ? 1 : 0);

    // Business days (Mon-Fri)
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(start);
    const limit = includeEndDay ? new Date(end.getTime() + oneDayMs) : end;

    while (cur < limit) {
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeek = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDaysInWeek,
      businessDays,
      weekendDays,
      totalHours,
      totalMinutes,
      isReversed,
    };
  }, [startDate, endDate, includeEndDay]);

  const copyResult = () => {
    if (!diff) return;
    const text = `Difference: ${diff.years} years, ${diff.months} months, ${diff.days} days (${diff.totalDays} total days / ${diff.businessDays} business days).`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Inputs Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-500" /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 px-3.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-500" /> End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-3.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={includeEndDay}
              onChange={(e) => setIncludeEndDay(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Include end date in calculation (+1 day)
          </label>

          <div className="flex gap-2">
            {[
              { label: "+7 Days", add: 7 },
              { label: "+30 Days", add: 30 },
              { label: "+90 Days", add: 90 },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  const d = new Date(startDate);
                  d.setDate(d.getDate() + p.add);
                  setEndDate(d.toISOString().split("T")[0]);
                }}
                className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {diff && (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Total Duration
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-1">
                {diff.years > 0 && `${diff.years} years, `}
                {diff.months > 0 && `${diff.months} months, `}
                {diff.days} days
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Equal to <strong>{diff.totalDays.toLocaleString()} days</strong> ({diff.totalWeeks} weeks and {diff.remainingDaysInWeek} days)
              </div>
            </div>

            <button
              onClick={copyResult}
              className="h-9 px-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Result"}
            </button>
          </div>

          {/* Business Days vs Weekends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-medium">Working / Business Days</div>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {diff.businessDays.toLocaleString()} days
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-medium">Weekend Days</div>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {diff.weekendDays.toLocaleString()} days
                </div>
              </div>
            </div>
          </div>

          {/* Unit conversions */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Alternative Time Units
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Total Days", value: `${diff.totalDays.toLocaleString()} days` },
                { label: "Total Weeks", value: `${diff.totalWeeks.toLocaleString()} weeks` },
                { label: "Total Hours", value: `${diff.totalHours.toLocaleString()} hours` },
                { label: "Total Minutes", value: `${diff.totalMinutes.toLocaleString()} minutes` },
              ].map((u) => (
                <div key={u.label} className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-950/40">
                  <div className="text-[11px] text-zinc-500">{u.label}</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    {u.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
