"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MessageSquare, CheckCircle2, Send, HelpCircle, Sparkles } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState("general");
  const [message, setMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/80">
          <MessageSquare className="h-4 w-4 text-red-600" />
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Contact &amp; <span className="heading-highlight">Support</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed font-normal">
          Have a question, feedback, or a tool you&apos;d love to see on TheSwiftTools? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-3 rounded-2xl border border-zinc-200/80 bg-white/80 dark:bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xs dark:border-zinc-800/80 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                Message Sent!
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <strong className="text-zinc-950 dark:text-zinc-100">{name}</strong>. We review all feedback and will respond to <strong className="text-zinc-950 dark:text-zinc-100">{email}</strong> within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="mt-4 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-bold transition-all shadow-sm cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50">
                Send us a direct message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-950 text-base text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-950 text-base text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
                  Topic / Category
                </label>
                <CustomSelect
                  value={category}
                  onChange={(val) => setCategory(String(val))}
                  options={[
                    { value: "general", label: "General Feedback" },
                    { value: "feature", label: "Request a New Tool" },
                    { value: "bug", label: "Report a Bug / Issue" },
                    { value: "partnership", label: "Partnership or Press" },
                  ]}
                  size="md"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 block">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind or describe the tool you'd like to see..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-950 text-base text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-y leading-relaxed font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info & Direct Reachout */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:bg-zinc-900/50 p-6 backdrop-blur-xs dark:border-zinc-800/80 space-y-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-200/60 dark:border-red-800/60 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50">
                  Direct Email
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  support@theswifttools.com
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
              For urgent technical inquiries, API requests, or bug reports, feel free to email our engineering desk directly.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 dark:bg-zinc-900/50 p-6 backdrop-blur-xs dark:border-zinc-800/80 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <HelpCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              Frequently Asked
            </div>
            <div className="space-y-3 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300">
              <div>
                <strong className="text-zinc-950 dark:text-zinc-50 block mb-1 font-bold">
                  Are tools really 100% free?
                </strong>
                Yes! There are no subscriptions, limits, or hidden payment paywalls.
              </div>
              <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <strong className="text-zinc-950 dark:text-zinc-50 block mb-1 font-bold">
                  Can you add my requested tool?
                </strong>
                We actively build requested community tools. Drop your suggestion in the message box above!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
