"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TextRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
};

export default function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setShown(true);

    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      const id = window.setTimeout(show, 80 + delay * 1000);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`text-reveal-scroll ${shown ? "is-shown" : ""} ${className}`.trim()}
      style={{ transitionDelay: shown ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
