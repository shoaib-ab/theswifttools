"use client";

import * as React from "react";
import { DollarSign, Percent, Calendar, PieChart, Table } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

export function EmiCalculatorTool() {
  const [loanAmount, setLoanAmount] = React.useState<number>(100000);
  const [interestRate, setInterestRate] = React.useState<number>(8.5);
  const [tenureYears, setTenureYears] = React.useState<number>(5);
  const [currencySymbol, setCurrencySymbol] = React.useState<string>("$");

  const calculation = React.useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100; // monthly rate
    const n = tenureYears * 12; // total months

    if (P <= 0 || interestRate <= 0 || tenureYears <= 0) {
      return null;
    }

    // EMI formula: [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalPct = Math.round((P / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    // Amortization schedule (year by year)
    let balance = P;
    const yearlySchedule = [];

    for (let y = 1; y <= tenureYears; y++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const mInterest = balance * r;
        const mPrincipal = emi - mInterest;
        yearlyInterest += mInterest;
        yearlyPrincipal += mPrincipal;
        balance -= mPrincipal;
      }

      yearlySchedule.push({
        year: y,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPct,
      interestPct,
      yearlySchedule,
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="w-full space-y-6">
      {/* Input controls & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm">
          {/* Currency selection */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Loan Parameters
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-500">Currency:</span>
              <div className="w-36">
                <CustomSelect
                  value={currencySymbol}
                  onChange={(val) => setCurrencySymbol(val)}
                  size="xs"
                  options={[
                    { value: "$", label: "$ (USD / CAD / AUD)" },
                    { value: "₨", label: "₨ (PKR / INR)" },
                    { value: "£", label: "£ (GBP)" },
                    { value: "€", label: "€ (EUR)" },
                    { value: "AED", label: "AED" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-blue-500" /> Loan Amount
              </span>
              <div className="relative">
                <span className="absolute left-2.5 top-1.5 text-xs text-zinc-400">{currencySymbol}</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                  className="w-32 h-8 pl-7 pr-2 text-right text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Percent className="h-3.5 w-3.5 text-blue-500" /> Annual Interest Rate (% p.a.)
              </span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-24 h-8 px-2 text-right text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-500" /> Loan Tenure (Years)
              </span>
              <div className="relative">
                <input
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value)))}
                  className="w-24 h-8 px-2 text-right text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(parseInt(e.target.value))}
              className="w-full accent-blue-600 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
            />
          </div>
        </div>

        {/* EMI Summary Card */}
        {calculation && (
          <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Monthly Loan EMI
              </div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                {currencySymbol} {calculation.monthlyEmi.toLocaleString()}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">Payable for {tenureYears * 12} months</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Principal Amount:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {currencySymbol} {loanAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Interest:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {currencySymbol} {calculation.totalInterest.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-700 dark:text-zinc-300 font-semibold">Total Payable:</span>
                <span className="font-bold text-zinc-950 dark:text-zinc-50">
                  {currencySymbol} {calculation.totalPayment.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>Principal ({calculation.principalPct}%)</span>
                <span>Interest ({calculation.interestPct}%)</span>
              </div>
              <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div style={{ width: `${calculation.principalPct}%` }} className="bg-blue-600 h-full" />
                <div style={{ width: `${calculation.interestPct}%` }} className="bg-amber-500 h-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Amortization Schedule Table */}
      {calculation && calculation.yearlySchedule.length > 0 && (
        <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Table className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Yearly Loan Amortization Schedule
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-medium pb-2">
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3">Principal Paid</th>
                  <th className="py-2.5 px-3">Interest Paid</th>
                  <th className="py-2.5 px-3">Total Payment</th>
                  <th className="py-2.5 px-3 text-right">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {calculation.yearlySchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="py-2 px-3 font-semibold text-zinc-800 dark:text-zinc-200">
                      Year {row.year}
                    </td>
                    <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400">
                      {currencySymbol} {row.principal.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-amber-600 dark:text-amber-400">
                      {currencySymbol} {row.interest.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100 font-medium">
                      {currencySymbol} {(row.principal + row.interest).toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right font-medium text-zinc-900 dark:text-zinc-100">
                      {currencySymbol} {row.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
