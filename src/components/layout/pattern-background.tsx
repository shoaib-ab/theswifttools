"use client";

import * as React from "react";

export function PatternBackground() {
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          // Smooth optical depth: parallax background shifts at 14% of user scroll speed
          setOffsetY(scrollY * 0.14);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize immediately
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pattern-bg fixed inset-x-0 -top-28 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        height: "calc(100vh + 1000px)",
        transform: `translate3d(0, ${-offsetY}px, 0)`,
        willChange: "transform",
      }}
    />
  );
}
