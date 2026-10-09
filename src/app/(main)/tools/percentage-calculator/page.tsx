import type { Metadata } from "next";
import { PercentageCalculatorTool } from "@/components/tools/percentage-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Percentage Calculator Online Free — Percent Increase, Decrease & Change | TheSwiftTools",
  description: "Calculate percentages quickly with 4 essential calculation modes: percentage of a number, percent rate, percentage change (increase/decrease), and value plus/minus percent.",
};

export default function PercentageCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Percentage Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Percentage Calculator — 4 Common Modes Free
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Solve any percentage problem instantly: find what percent of a number is, calculate percent discounts and markups, or measure percentage increase and decrease.
        </p>
      </div>

      <PercentageCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Common Percentage Formulas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">Percentage of a Number:</strong>
              <code>P = (X / 100) × Y</code>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">Percentage Rate:</strong>
              <code>Rate = (X / Y) × 100%</code>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">Percentage Change:</strong>
              <code>Change = ((New - Old) / Old) × 100%</code>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-zinc-900/30">
              <strong className="text-zinc-800 dark:text-zinc-200 block mb-1">Add / Subtract %:</strong>
              <code>Result = Original ± (Original × Rate / 100)</code>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I calculate a sales tax or discount?", a: "Use the 'Add or Subtract %' calculator. Enter the sticker price and discount percentage to find the discounted price and savings." },
              { q: "What is the difference between percentage points and percentage change?", a: "If an interest rate goes from 5% to 6%, it has increased by 1 percentage point, but the percentage increase is (1/5)*100 = 20%." },
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
              { href: "/tools/emi-calculator", name: "EMI / Loan Calculator", desc: "Calculate monthly loan installments." },
              { href: "/tools/salary-tax-calculator", name: "Salary Tax Calculator", desc: "Calculate income tax deductions." },
              { href: "/tools/age-calculator", name: "Age Calculator", desc: "Calculate exact age from birth date." },
              { href: "/tools/cgpa-calculator", name: "CGPA Calculator", desc: "Calculate college and university GPA." },
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
