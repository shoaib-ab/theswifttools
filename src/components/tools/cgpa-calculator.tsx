"use client";

import * as React from "react";
import { GraduationCap, Plus, Trash2, RotateCcw } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

interface CourseRow {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

const GRADES = [
  { label: "A+ / A (4.00)", points: 4.0 },
  { label: "A- (3.67)", points: 3.67 },
  { label: "B+ (3.33)", points: 3.33 },
  { label: "B (3.00)", points: 3.0 },
  { label: "B- (2.67)", points: 2.67 },
  { label: "C+ (2.33)", points: 2.33 },
  { label: "C (2.00)", points: 2.0 },
  { label: "C- (1.67)", points: 1.67 },
  { label: "D+ (1.33)", points: 1.33 },
  { label: "D (1.00)", points: 1.0 },
  { label: "F (0.00)", points: 0.0 },
];

export function CgpaCalculatorTool() {
  const [courses, setCourses] = React.useState<CourseRow[]>([
    { id: "1", name: "Mathematics I", credits: 3, gradePoint: 4.0 },
    { id: "2", name: "Computer Programming", credits: 4, gradePoint: 3.67 },
    { id: "3", name: "English Communication", credits: 3, gradePoint: 3.33 },
    { id: "4", name: "Physics Lab", credits: 2, gradePoint: 4.0 },
  ]);

  // Previous cumulative fields
  const [hasPreviousCgpa, setHasPreviousCgpa] = React.useState(false);
  const [prevCgpa, setPrevCgpa] = React.useState<number>(3.5);
  const [prevCredits, setPrevCredits] = React.useState<number>(30);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: `Course ${prev.length + 1}`,
        credits: 3,
        gradePoint: 4.0,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, val: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  // Calculations
  const stats = React.useMemo(() => {
    let semesterCredits = 0;
    let semesterPoints = 0;

    courses.forEach((c) => {
      semesterCredits += c.credits;
      semesterPoints += c.credits * c.gradePoint;
    });

    const semesterGpa = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;

    let finalCgpa = semesterGpa;
    let totalCredits = semesterCredits;

    if (hasPreviousCgpa && prevCredits > 0) {
      const prevPoints = prevCgpa * prevCredits;
      totalCredits = prevCredits + semesterCredits;
      finalCgpa = (prevPoints + semesterPoints) / totalCredits;
    }

    let standing = "Good Standing";
    if (finalCgpa >= 3.7) standing = "Distinction / First Class Honours";
    else if (finalCgpa >= 3.0) standing = "Second Class Upper (Honours)";
    else if (finalCgpa >= 2.0) standing = "Satisfactory";
    else standing = "Academic Probation";

    return {
      semesterGpa: semesterGpa.toFixed(2),
      finalCgpa: finalCgpa.toFixed(2),
      semesterCredits,
      totalCredits,
      standing,
    };
  }, [courses, hasPreviousCgpa, prevCgpa, prevCredits]);

  const resetAll = () => {
    setCourses([
      { id: "1", name: "Course 1", credits: 3, gradePoint: 4.0 },
      { id: "2", name: "Course 2", credits: 3, gradePoint: 3.5 },
    ]);
    setHasPreviousCgpa(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {hasPreviousCgpa ? "Cumulative CGPA" : "Semester GPA"}
          </div>
          <div className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 my-1">
            {stats.finalCgpa} <span className="text-xs font-normal text-zinc-500">/ 4.00</span>
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">
            {stats.standing}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Semester GPA
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 my-1">
            {stats.semesterGpa}
          </div>
          <div className="text-[11px] text-zinc-500">
            For {stats.semesterCredits} credit hours
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Total Credits
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 my-1">
            {stats.totalCredits}
          </div>
          <div className="text-[11px] text-zinc-500">
            Credit hours completed
          </div>
        </div>
      </div>

      {/* Courses Table Form */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-blue-500" /> Current Semester Courses
          </h3>
          <button
            onClick={resetAll}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="grid grid-cols-12 gap-2 sm:gap-3 items-center p-2 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60"
            >
              <div className="col-span-12 sm:col-span-5">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                  placeholder={`Course ${idx + 1}`}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="col-span-5 sm:col-span-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-zinc-500">Credits:</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, "credits", Math.max(1, Number(e.target.value)))}
                    className="w-16 h-9 px-2 text-center text-xs font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="col-span-5 sm:col-span-3">
                <CustomSelect<number>
                  value={course.gradePoint}
                  onChange={(val) => updateCourse(course.id, "gradePoint", val)}
                  size="sm"
                  options={GRADES.map((g) => ({
                    value: g.points,
                    label: g.label,
                  }))}
                />
              </div>

              <div className="col-span-2 sm:col-span-1 flex justify-end">
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-2 text-zinc-400 hover:text-red-600 disabled:opacity-30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCourse}
          className="w-full py-2.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Another Course
        </button>

        {/* Previous CGPA Accordion/Toggle */}
        <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={hasPreviousCgpa}
              onChange={(e) => setHasPreviousCgpa(e.target.checked)}
              className="rounded accent-blue-600 h-4 w-4"
            />
            Include previous semester(s) cumulative CGPA
          </label>

          {hasPreviousCgpa && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500">Prior CGPA (out of 4.0)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={prevCgpa}
                  onChange={(e) => setPrevCgpa(parseFloat(e.target.value) || 0)}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500">Prior Completed Credit Hours</label>
                <input
                  type="number"
                  min="1"
                  value={prevCredits}
                  onChange={(e) => setPrevCredits(parseInt(e.target.value) || 0)}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
