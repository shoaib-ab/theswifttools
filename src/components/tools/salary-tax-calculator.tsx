"use client";

import * as React from "react";
import { Receipt, Check, Copy } from "lucide-react";

export function SalaryTaxCalculatorTool() {
  const [inputPeriod, setInputPeriod] = React.useState<"monthly" | "yearly">("monthly");
  const [salaryInput, setSalaryInput] = React.useState<number>(150000);
  const [copied, setCopied] = React.useState(false);

  const annualIncome = inputPeriod === "monthly" ? salaryInput * 12 : salaryInput;

  const taxDetails = React.useMemo(() => {
    const annual = Math.max(0, annualIncome);
    let annualTax = 0;
    let slabDescription = "";

    if (annual <= 600000) {
      annualTax = 0;
      slabDescription = "Up to PKR 600,000: 0% tax";
    } else if (annual <= 1200000) {
      annualTax = (annual - 600000) * 0.05;
      slabDescription = "PKR 600,000 – 1,200,000: 5% of amount exceeding PKR 600,000";
    } else if (annual <= 2200000) {
      annualTax = 30000 + (annual - 1200000) * 0.15;
      slabDescription = "PKR 1,200,000 – 2,200,000: PKR 30,000 + 15% exceeding PKR 1.2M";
    } else if (annual <= 3200000) {
      annualTax = 180000 + (annual - 2200000) * 0.25;
      slabDescription = "PKR 2,200,000 – 3,200,000: PKR 180,000 + 25% exceeding PKR 2.2M";
    } else if (annual <= 4100000) {
      annualTax = 430000 + (annual - 3200000) * 0.30;
      slabDescription = "PKR 3,200,000 – 4,100,000: PKR 430,000 + 30% exceeding PKR 3.2M";
    } else {
      annualTax = 700000 + (annual - 4100000) * 0.35;
      slabDescription = "Above PKR 4,100,000: PKR 700,000 + 35% exceeding PKR 4.1M";
    }

    // 10% super tax / surcharge if annual taxable income exceeds 10M
    if (annual > 10000000) {
      annualTax += annualTax * 0.1;
      slabDescription += " (+10% Surcharge on High Earners)";
    }

    const monthlyTax = annualTax / 12;
    const monthlyGross = annual / 12;
    const monthlyNet = monthlyGross - monthlyTax;
    const annualNet = annual - annualTax;
    const effectiveRate = annual > 0 ? (annualTax / annual) * 100 : 0;

    return {
      annualGross: annual,
      monthlyGross: Math.round(monthlyGross),
      annualTax: Math.round(annualTax),
      monthlyTax: Math.round(monthlyTax),
      annualNet: Math.round(annualNet),
      monthlyNet: Math.round(monthlyNet),
      effectiveRate: effectiveRate.toFixed(2),
      slabDescription,
    };
  }, [annualIncome]);

  const copyResult = () => {
    const text = `Gross Salary: PKR ${taxDetails.monthlyGross.toLocaleString()}/mo | Tax: PKR ${taxDetails.monthlyTax.toLocaleString()}/mo | Take-Home Net: PKR ${taxDetails.monthlyNet.toLocaleString()}/mo (${taxDetails.effectiveRate}% effective tax)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Input Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Salary Input (Tax Year 2024-25 / 2025-26)
          </span>
          <div className="flex gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <button
              onClick={() => setInputPeriod("monthly")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                inputPeriod === "monthly"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setInputPeriod("yearly")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                inputPeriod === "yearly"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {inputPeriod === "monthly" ? "Monthly Gross Salary (PKR)" : "Annual Gross Salary (PKR)"}
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-zinc-400">PKR</span>
            <input
              type="number"
              value={salaryInput}
              onChange={(e) => setSalaryInput(Math.max(0, Number(e.target.value)))}
              className="w-full h-11 pl-12 pr-4 text-sm font-semibold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Monthly Net Salary */}
        <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Monthly Take-Home
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 my-2">
            PKR {taxDetails.monthlyNet.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500">
            Annual: PKR {taxDetails.annualNet.toLocaleString()}
          </div>
        </div>

        {/* Monthly Tax Deducted */}
        <div className="p-5 rounded-2xl border border-red-500/20 bg-red-50/40 dark:bg-red-950/20 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">
            Monthly Income Tax
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400 my-2">
            PKR {taxDetails.monthlyTax.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500">
            Annual Tax: PKR {taxDetails.annualTax.toLocaleString()}
          </div>
        </div>

        {/* Effective Rate */}
        <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Effective Tax Rate
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 my-2">
            {taxDetails.effectiveRate}%
          </div>
          <div className="text-[11px] text-zinc-500">
            Total tax as % of gross income
          </div>
        </div>
      </div>

      {/* Details & Copy */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Tax Slab Details
          </h3>
          <button
            onClick={copyResult}
            className="h-8 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium flex items-center gap-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied" : "Copy Breakdown"}
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/70 dark:border-zinc-800/70 text-xs text-zinc-700 dark:text-zinc-300">
          <strong>Applied FBR Slab:</strong> {taxDetails.slabDescription}
        </div>

        {/* Slabs reference table */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Official FBR Tax Slabs for Salaried Individuals
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <tr>
                  <th className="py-2 px-3">Annual Salary Range</th>
                  <th className="py-2 px-3">Tax Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400">
                <tr>
                  <td className="py-2 px-3">Up to PKR 600,000</td>
                  <td className="py-2 px-3 font-semibold text-emerald-600">0% (Tax Exempt)</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">PKR 600,001 – 1,200,000</td>
                  <td className="py-2 px-3">5% of amount exceeding PKR 600,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">PKR 1,200,001 – 2,200,000</td>
                  <td className="py-2 px-3">PKR 30,000 + 15% exceeding PKR 1,200,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">PKR 2,200,001 – 3,200,000</td>
                  <td className="py-2 px-3">PKR 180,000 + 25% exceeding PKR 2,200,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">PKR 3,200,001 – 4,100,000</td>
                  <td className="py-2 px-3">PKR 430,000 + 30% exceeding PKR 3,200,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Above PKR 4,100,000</td>
                  <td className="py-2 px-3">PKR 700,000 + 35% exceeding PKR 4,100,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
