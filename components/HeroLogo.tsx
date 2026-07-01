"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }

    el.animate(
      [
        { opacity: 0, transform: "scale(0.35) translateY(48px)", filter: "blur(12px)" },
        { opacity: 1, transform: "scale(1.12) translateY(-8px)", filter: "blur(0px)", offset: 0.55 },
        { opacity: 1, transform: "scale(0.96) translateY(2px)", filter: "blur(0px)", offset: 0.75 },
        { opacity: 1, transform: "scale(1) translateY(0)", filter: "blur(0px)" },
      ],
      { duration: 1400, easing: "cubic-bezier(0.22, 1.3, 0.36, 1)", fill: "forwards" }
    );
  }, []);

  return (
    <div ref={ref} className="logo-layered hero-logo-shell" style={{ opacity: 0 }}>
      <div className="logo-layer-back" aria-hidden />
      <div className="logo-layer-mid" aria-hidden />
      <div className="logo-layer-front">
        <Image
          src="/logo.png"
          alt="Venuvyy Events"
          width={340}
          height={96}
          className="h-auto w-auto max-h-[96px] object-contain"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}
