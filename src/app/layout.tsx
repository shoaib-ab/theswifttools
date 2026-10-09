import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PatternBackground } from "@/components/layout/pattern-background";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TheSwiftTools - In-Browser Utility Software",
  description:
    "Fast, private browser-based utilities for PDF, image optimization, tax calculation, and developer formatters with zero server uploads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 relative selection:bg-zinc-200 dark:selection:bg-zinc-800 overflow-x-hidden"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PatternBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
