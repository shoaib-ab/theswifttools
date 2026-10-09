import type { Metadata } from "next";
import { EmiCalculatorTool } from "@/components/tools/emi-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EMI Calculator Online Free — Monthly Loan & Mortgage Payment | TheSwiftTools",
  description: "Calculate your monthly loan EMI, total interest, and complete year-by-year amortization schedule for home loans, car loans, or personal financing. Free & instant.",
};

export default function EmiCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">EMI Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          EMI Calculator — <span className="heading-highlight">Monthly Loan Installment</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Estimate your Equated Monthly Installment (EMI), total interest payable, and full loan amortization schedule for personal, vehicle, or mortgage financing.
        </p>
      </div>

      <EmiCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">What is EMI and How is it Computed?</h2>
          <p>
            An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month so that over a specified number of years, the loan is paid off in full.
          </p>
          <p>
            The standard mathematical formula used by commercial banks is:
          </p>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs text-center text-zinc-800 dark:text-zinc-200">
            EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
          </div>
          <p className="text-xs text-zinc-500">
            Where <strong>P</strong> is Principal loan amount, <strong>r</strong> is monthly interest rate (annual rate / 12 / 100), and <strong>n</strong> is total number of monthly payments.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use the EMI Calculator</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Enter Loan Amount</strong> — the total principal borrowed.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set Interest Rate</strong> — the annual percentage rate (APR) charged by your bank.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Select Loan Tenure</strong> — the duration in years over which the loan will be repaid.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Review schedule</strong> — examine the month-by-month and year-by-year amortization table.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How can I reduce my monthly EMI?", a: "You can reduce your monthly EMI by extending your loan tenure (though this increases total interest paid), negotiating a lower interest rate, or making a larger initial down payment." },
              { q: "Does the schedule account for pre-payments?", a: "This calculator models standard amortizing fixed-rate loans. Lump-sum early prepayments will shorten your loan term and reduce remaining interest." },
              { q: "Does this include bank processing fees or taxes?", a: "No, this computes pure loan principal and interest amortization. Check with your lender for applicable documentation charges." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-zinc-200/80 p-6 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">{q}</h3>
                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed font-normal">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "/tools/salary-tax-calculator", name: "Salary Tax Calculator", desc: "Calculate monthly income taxes." },
              { href: "/tools/percentage-calculator", name: "Percentage Calculator", desc: "Calculate percent increases and values." },
              { href: "/tools/age-calculator", name: "Age Calculator", desc: "Calculate exact age from birth date." },
              { href: "/tools/date-difference-calculator", name: "Date Difference Calculator", desc: "Calculate days between dates." },
            ].map(({ href, name, desc }) => (
              <Link key={href} href={href} className="flex flex-col gap-0.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <span className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">{name}</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">{desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
