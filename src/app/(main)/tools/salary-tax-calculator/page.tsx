import type { Metadata } from "next";
import { SalaryTaxCalculatorTool } from "@/components/tools/salary-tax-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salary Tax Calculator Pakistan Online — FBR Slabs 2024-25 & 2025-26 | TheSwiftTools",
  description: "Calculate income tax on salary for salaried individuals in Pakistan using the latest official FBR income tax slabs. See monthly tax, annual tax, and take-home net salary.",
};

export default function SalaryTaxCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Salary Tax Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Salary Tax Calculator (Pakistan) — <span className="heading-highlight">Latest FBR Slabs</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Calculate your monthly and annual income tax deduction according to the latest Federal Board of Revenue (FBR) tax slabs for salaried individuals. View exact net take-home salary.
        </p>
      </div>

      <SalaryTaxCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">FBR Income Tax on Salary Explained</h2>
          <p>
            Under the Income Tax Ordinance in Pakistan, employers are legally required to deduct income tax at source from salaried individuals on a monthly basis. The taxable amount is determined using progressive tax brackets (slabs) passed in the annual Finance Act by the Federal Government.
          </p>
          <p>
            The exemption threshold currently stands at PKR 600,000 per year (PKR 50,000 per month). If your annual salary is PKR 600,000 or below, zero income tax is deducted. For earnings beyond this threshold, tax is computed incrementally across progressive brackets from 5% up to 35%.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Calculate Your Salary Tax</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Select Monthly or Annual</strong> — choose whether to input your monthly wage or total yearly package.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Enter Gross Salary</strong> — type your basic salary plus all taxable allowances.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Instant Results</strong> — review monthly tax, annual tax liability, effective percentage, and net take-home cash.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is medical allowance taxable in Pakistan?", a: "Medical allowance up to 10% of basic salary is exempt from tax under Clause 139 of Part I of the Second Schedule, provided free medical treatment or hospitalization is not reimbursed by the employer." },
              { q: "Are allowances like House Rent and Conveyance taxable?", a: "Yes, house rent allowance, conveyance allowance, and cost of living allowances are fully taxable under salary income." },
              { q: "What is the surcharge for high earners?", a: "A 10% surcharge on tax is applicable on annual taxable income exceeding PKR 10 million." },
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
              { href: "/tools/percentage-calculator", name: "Percentage Calculator", desc: "Calculate percent increases and discounts." },
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
