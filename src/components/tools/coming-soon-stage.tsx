"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Music,
  Image as ImageIcon,
  Sparkles,
  Scissors,
  Zap,
  Bell,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { ToolItem } from "@/config/tools";
import { ToolIcon } from "@/components/ui/tool-icon";

export function ComingSoonStage({ tool }: { tool: ToolItem }) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(`notified_${tool.id}`);
      if (saved) setSubscribed(true);
    } catch {}
  }, [tool.id]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    try {
      localStorage.setItem(`notified_${tool.id}`, email);
      setSubscribed(true);
    } catch {}
  };

  return (
    <div className="flex-1 px-4 py-8 sm:px-8 max-w-3xl w-full mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        <Link
          href="/"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Tools
        </Link>
        <span>/</span>
        <span className="capitalize">{tool.category}</span>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
          {tool.name}
        </span>
      </div>

      {/* Main Coming Soon Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 sm:p-10 text-center dark:border-zinc-800/80 dark:bg-zinc-900/60 shadow-sm space-y-6">
        <div className="flex justify-center">
          <ToolIcon toolId={tool.id} category={tool.category} size="lg" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50">
            <Clock className="h-3.5 w-3.5" />
            Coming Soon
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {tool.name}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* 3 Simple User Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <div className="p-3.5 rounded-xl border border-zinc-200/70 bg-zinc-50/70 dark:border-zinc-800/70 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              100% Free
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No subscriptions, hidden limits, or paywalls.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200/70 bg-zinc-50/70 dark:border-zinc-800/70 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              <Shield className="h-4 w-4 text-blue-500" />
              Private & Safe
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Files are never uploaded to any server.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200/70 bg-zinc-50/70 dark:border-zinc-800/70 dark:bg-zinc-900/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              <Zap className="h-4 w-4 text-amber-500" />
              Fast & Simple
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Conversions happen instantly in your browser.
            </p>
          </div>
        </div>

        {/* Notify Me */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 max-w-md mx-auto">
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-medium border border-emerald-200/80 dark:border-emerald-800/50">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>You&apos;ll be notified as soon as this tool goes live!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Want to know when it&apos;s ready?
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 flex-1 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all"
                />
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-sm cursor-pointer"
                >
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Suggested Tool Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800/50 shadow-xs">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Word to PDF Converter
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/60">
                Ready Now
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Convert .docx documents to clean PDF format directly in your browser.
            </p>
          </div>
        </div>

        <Link
          href="/tools/word-to-pdf"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <span>Use Word to PDF</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
