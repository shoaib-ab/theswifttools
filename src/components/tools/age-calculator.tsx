"use client";

import * as React from "react";
import { Calendar, Copy, Check, Clock, Sparkles } from "lucide-react";

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = React.useState<string>("2000-01-01");
  const [targetDate, setTargetDate] = React.useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [copied, setCopied] = React.useState(false);

  const stats = React.useMemo(() => {
    if (!birthDate || !targetDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Days in previous month of target
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total units
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Day of birth
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDay = dayNames[birth.getDay()];

    // Next birthday countdown
    const nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Zodiac sign
    const bMonth = birth.getMonth() + 1;
    const bDay = birth.getDate();
    let zodiac = "";
    if ((bMonth === 3 && bDay >= 21) || (bMonth === 4 && bDay <= 19)) zodiac = "Aries ♈";
    else if ((bMonth === 4 && bDay >= 20) || (bMonth === 5 && bDay <= 20)) zodiac = "Taurus ♉";
    else if ((bMonth === 5 && bDay >= 21) || (bMonth === 6 && bDay <= 20)) zodiac = "Gemini ♊";
    else if ((bMonth === 6 && bDay >= 21) || (bMonth === 7 && bDay <= 22)) zodiac = "Cancer ♋";
    else if ((bMonth === 7 && bDay >= 23) || (bMonth === 8 && bDay <= 22)) zodiac = "Leo ♌";
    else if ((bMonth === 8 && bDay >= 23) || (bMonth === 9 && bDay <= 22)) zodiac = "Virgo ♍";
    else if ((bMonth === 9 && bDay >= 23) || (bMonth === 10 && bDay <= 22)) zodiac = "Libra ♎";
    else if ((bMonth === 10 && bDay >= 23) || (bMonth === 11 && bDay <= 21)) zodiac = "Scorpio ♏";
    else if ((bMonth === 11 && bDay >= 22) || (bMonth === 12 && bDay <= 21)) zodiac = "Sagittarius ♐";
    else if ((bMonth === 12 && bDay >= 22) || (bMonth === 1 && bDay <= 19)) zodiac = "Capricorn ♑";
    else if ((bMonth === 1 && bDay >= 20) || (bMonth === 2 && bDay <= 18)) zodiac = "Aquarius ♒";
    else zodiac = "Pisces ♓";

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      bornDay,
      daysToNextBday,
      zodiac,
    };
  }, [birthDate, targetDate]);

  const copySummary = () => {
    if (!stats) return;
    const text = `Age: ${stats.years} years, ${stats.months} months, ${stats.days} days (${stats.totalDays.toLocaleString()} total days). Born on a ${stats.bornDay}. Zodiac: ${stats.zodiac}.`;
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
              <Calendar className="h-3.5 w-3.5 text-blue-500" /> Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full h-10 px-3.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-500" /> Age as of Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-10 px-3.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {stats ? (
        <div className="space-y-6">
          {/* Main Primary Result Card */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Exact Age
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-1">
                {stats.years} <span className="text-base font-normal text-zinc-500">years</span> {stats.months} <span className="text-base font-normal text-zinc-500">months</span> {stats.days} <span className="text-base font-normal text-zinc-500">days</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Born on a <strong className="text-zinc-800 dark:text-zinc-200">{stats.bornDay}</strong> • Zodiac: {stats.zodiac}
              </div>
            </div>

            <button
              onClick={copySummary}
              className="h-9 px-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors shrink-0"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy Age"}
            </button>
          </div>

          {/* Next Birthday & Fun Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-medium">Next Birthday In</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {stats.daysToNextBday} days
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] text-zinc-500 font-medium">Day of Birth</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {stats.bornDay}
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown in other time units */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Lifespan in Other Units
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Total Months", value: stats.totalMonths.toLocaleString() },
                { label: "Total Weeks", value: stats.totalWeeks.toLocaleString() },
                { label: "Total Days", value: stats.totalDays.toLocaleString() },
                { label: "Total Hours", value: stats.totalHours.toLocaleString() },
                { label: "Total Minutes", value: stats.totalMinutes.toLocaleString() },
                { label: "Total Seconds", value: stats.totalSeconds.toLocaleString() },
              ].map((unit) => (
                <div key={unit.label} className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-950/40">
                  <div className="text-[11px] text-zinc-500">{unit.label}</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    {unit.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-xs text-center border border-amber-200 dark:border-amber-800">
          Please select a valid date of birth earlier than the target date.
        </div>
      )}
    </div>
  );
}
