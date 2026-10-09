import * as React from "react";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 min-w-0 flex flex-col bg-transparent w-full">
      {children}
    </main>
  );
}