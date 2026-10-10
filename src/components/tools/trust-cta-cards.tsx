"use client";

import * as React from "react";
import { Shield, Cpu, Sparkles, Lock } from "lucide-react";

export function TrustCtaCards({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      {/* 100% In-Browser Privacy */}
      <div className="flex-1 flex flex-col justify-center p-4 rounded-2xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-200/40 dark:shadow-black/50 space-y-1 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-lg transition-all">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200">
            <Shield className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            100% In-Browser Privacy
          </h4>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-0.5">
          Zero files uploaded to any server. All processing runs in local device RAM.
        </p>
      </div>

      {/* Instant Client Execution */}
      <div className="flex-1 flex flex-col justify-center p-4 rounded-2xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-200/40 dark:shadow-black/50 space-y-1 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-lg transition-all">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200">
            <Cpu className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            Instant Client Execution
          </h4>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-0.5">
          Wasm &amp; HTML5 Canvas engine eliminates file upload waits and server queues.
        </p>
      </div>

      {/* Free & Unrestricted */}
      <div className="flex-1 flex flex-col justify-center p-4 rounded-2xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-200/40 dark:shadow-black/50 space-y-1 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-lg transition-all">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200">
            <Sparkles className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            Free &amp; Unrestricted
          </h4>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-0.5">
          No subscriptions, registration walls, watermarks, or artificial limits.
        </p>
      </div>

      {/* Zero Data Tracking */}
      <div className="flex-1 flex flex-col justify-center p-4 rounded-2xl bg-gradient-to-b from-white via-white to-zinc-50/80 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-md shadow-zinc-200/40 dark:shadow-black/50 space-y-1 hover:border-red-500/30 dark:hover:border-red-500/30 hover:shadow-lg transition-all">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 text-zinc-800 dark:text-zinc-200">
            <Lock className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
            Zero Data Tracking
          </h4>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pl-0.5">
          Compliant with strict corporate privacy. No analytics cookies or trackers.
        </p>
      </div>
    </div>
  );
}
