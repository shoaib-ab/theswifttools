import type { Metadata } from "next";
import { CgpaCalculatorTool } from "@/components/tools/cgpa-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CGPA Calculator Online Free — 4.0 Scale GPA & Cumulative Calculator | TheSwiftTools",
  description: "Calculate semester GPA and overall cumulative CGPA on a standard 4.0 grading scale. Add courses, credit hours, and grades to track your degree honours standing.",
};

export default function CgpaCalculatorPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">CGPA Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          CGPA Calculator — 4.0 Scale Semester & Cumulative GPA
        </h1>
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl leading-relaxed font-normal">
          Calculate your semester Grade Point Average (GPA) and Cumulative Grade Point Average (CGPA) across university terms. Enter credit hours and letter grades to calculate honours standing instantly.
        </p>
      </div>

      <CgpaCalculatorTool />

      <div className="space-y-8 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="space-y-4 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">How is CGPA Calculated?</h2>
          <p>
            GPA (Grade Point Average) measures academic performance in a single semester, while CGPA (Cumulative Grade Point Average) measures average performance across all completed semesters in your degree program.
          </p>
          <p>
            Both metrics are calculated as a weighted average based on course credit hours:
          </p>
          <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-mono text-xs text-center text-zinc-800 dark:text-zinc-200">
            GPA = Total Quality Points (Credits × Grade Points) / Total Credit Hours
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Standard 4.0 Scale Grade Conversion</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>A / A+:</strong> 4.00 (90–100%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>A-:</strong> 3.67 (85–89%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>B+:</strong> 3.33 (80–84%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>B:</strong> 3.00 (75–79%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>B-:</strong> 2.67 (70–74%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>C+:</strong> 2.33 (65–69%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>C:</strong> 2.00 (60–64%)
            </div>
            <div className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <strong>F:</strong> 0.00 (Below 50%)
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can courses with more credit hours affect GPA more?", a: "Yes! A 4-credit course has double the influence on your final GPA compared to a 2-credit course because quality points are weighted by credits." },
              { q: "How do I calculate cumulative CGPA with previous semesters?", a: "Check the 'Include previous semester(s) cumulative CGPA' box, then enter your prior CGPA and total prior credit hours completed." },
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
              { href: "/tools/percentage-calculator", name: "Percentage Calculator", desc: "Calculate marks percentages." },
              { href: "/tools/age-calculator", name: "Age Calculator", desc: "Calculate exact age from birth date." },
              { href: "/tools/emi-calculator", name: "EMI Calculator", desc: "Calculate tuition or student loan installments." },
              { href: "/tools/date-difference-calculator", name: "Date Difference Calculator", desc: "Count days until exam deadlines." },
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
