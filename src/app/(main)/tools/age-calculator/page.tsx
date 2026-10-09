import type { Metadata } from "next";
import { AgeCalculatorTool } from "@/components/tools/age-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Calculator Online Free — Exact Age in Years, Months, Days | TheSwiftTools",
  description: "Calculate your exact age in years, months, days, hours, and minutes from date of birth. Find out your birth weekday, next birthday countdown, and zodiac sign.",
};

export default function AgeCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Age Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Age Calculator Online — <span className="heading-highlight">Exact Age & Days</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Determine your exact chronological age from your date of birth down to the minute. View detailed lifespan stats, days until your next birthday, and weekday of birth.
        </p>
      </div>

      <AgeCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How is Chronological Age Calculated?</h2>
          <p>
            Chronological age is the exact amount of time that has elapsed from a person&apos;s birth date to the current date (or a specific date in history or the future). Because months have varying lengths (28, 29, 30, or 31 days) and leap years occur every 4 years, calculating age accurately requires taking into account calendar variations.
          </p>
          <p>
            Our calculator handles leap years, month-end date rollovers, and exact time intervals to provide precision answers for job application age eligibility, government document verifications, school admissions, and retirement milestones.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use the Age Calculator</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Select Date of Birth</strong> — choose your birth day, month, and year.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set Age As of Date</strong> — defaults to today&apos;s date, but can be adjusted for past or future dates.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">View breakdown</strong> — see years, months, days, total weeks, hours, and next birthday countdown instantly.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How many days are in a leap year?", a: "A leap year has 366 days instead of 365, adding February 29th to keep the calendar synchronized with Earth's orbit around the sun." },
              { q: "Can I calculate my age on a specific future date?", a: "Yes, simply adjust the 'Age as of Date' to any future date to find out how old you will be then." },
              { q: "Are calculations private?", a: "Yes, all date calculations happen locally in your web browser. No dates are recorded or transmitted." },
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
              { href: "/tools/date-difference-calculator", name: "Date Difference Calculator", desc: "Calculate days between two dates." },
              { href: "/tools/percentage-calculator", name: "Percentage Calculator", desc: "Calculate percent increases and values." },
              { href: "/tools/emi-calculator", name: "EMI / Loan Calculator", desc: "Calculate monthly loan installments." },
              { href: "/tools/salary-tax-calculator", name: "Salary Tax Calculator", desc: "Calculate monthly income taxes." },
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
