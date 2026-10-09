import type { Metadata } from "next";
import { DateDifferenceCalculatorTool } from "@/components/tools/date-difference-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Date Difference Calculator Online Free — Days, Weeks, Business Days Between Dates | TheSwiftTools",
  description: "Calculate the exact number of days, weeks, months, and working business days between any two dates. Includes optional end-date toggle and preset intervals.",
};

export default function DateDifferenceCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Date Difference Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Date Difference Calculator — Days Between Dates
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Find the exact elapsed time between two calendar dates. View breakdown by years, months, total days, business working days (excluding weekends), and weeks.
        </p>
      </div>

      <DateDifferenceCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Counting Days and Working Days</h2>
          <p>
            Whether planning project milestone sprints, calculating legal notice periods, measuring visa validity stays, or tracking contract durations, knowing the exact business days versus total calendar days is critical.
          </p>
          <p>
            Our date difference calculator separates standard working days (Monday through Friday) from weekends (Saturday and Sunday) and gives you both exact breakdown formats and overall cumulative day counts.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How to Use the Date Calculator</h2>
          <ol className="list-decimal list-inside space-y-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set Start Date</strong> — choose initial event or baseline date.</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Set End Date</strong> — choose deadline or target date, or click quick buttons (+7, +30, +90 days).</li>
            <li><strong className="text-zinc-800 dark:text-zinc-200">Include End Day (Optional)</strong> — toggle if the terminal date itself counts as an active day.</li>
          </ol>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What does 'Include end date' mean?", a: "Normally, difference calculators calculate (End - Start). If you want both the start day and the end day counted in full (such as a 3-day weekend trip from Friday to Sunday), check 'Include end date'." },
              { q: "Does the calculator account for leap years?", a: "Yes, leap year calendar math (February 29) is calculated automatically." },
              { q: "Are public holidays subtracted from business days?", a: "This calculator excludes Saturdays and Sundays. Since regional bank and statutory holidays vary by country and municipality, specific national holidays are not deducted." },
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
              { href: "/tools/age-calculator", name: "Age Calculator", desc: "Calculate exact age from birth date." },
              { href: "/tools/percentage-calculator", name: "Percentage Calculator", desc: "Calculate percentage changes." },
              { href: "/tools/emi-calculator", name: "EMI Calculator", desc: "Calculate monthly loan installments." },
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
