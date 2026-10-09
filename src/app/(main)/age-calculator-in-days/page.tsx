import type { Metadata } from "next";
import { AgeCalculatorTool } from "@/components/tools/age-calculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Calculator in Days Online Free — How Many Days Old Are You? | TheSwiftTools",
  description: "Find out exactly how many days old you are from your date of birth. Calculate total days alive, weeks, hours, and minutes with complete accuracy.",
};

export default function AgeCalculatorInDaysPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-4xl w-full mx-auto space-y-10">
      <div className="space-y-2 border-b border-zinc-200/80 pb-6 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/?cat=calculators" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-semibold">Age in Days</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Age Calculator in Days — Find Total Days Lived
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Ever wondered exactly how many days you have been alive on Earth? Enter your birth date to calculate your total days, hours, and countdown to your next milestone.
        </p>
      </div>

      <AgeCalculatorTool />
    </div>
  );
}
