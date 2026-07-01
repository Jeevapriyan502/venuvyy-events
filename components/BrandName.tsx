"use client";

import Link from "next/link";
import { useHomeSection } from "@/components/HomeWorkspace";

const letters = "Venuvyy".split("");

export default function BrandName() {
  const homeNav = useHomeSection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (homeNav) {
      e.preventDefault();
      homeNav.navigate("home");
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="brand-celebrate group relative inline-flex items-baseline gap-0 text-2xl font-semibold tracking-wide sm:text-3xl"
      aria-label="Venuvyy Events home"
    >
      <span className="brand-sparkle brand-sparkle-1" aria-hidden>
        ✦
      </span>
      <span className="brand-sparkle brand-sparkle-2" aria-hidden>
        ✦
      </span>
      <span className="brand-sparkle brand-sparkle-3" aria-hidden>
        ✦
      </span>
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className="brand-letter inline-block"
          style={{
            animationDelay: `${0.08 + i * 0.09}s, ${1 + i * 0.1}s`,
          }}
        >
          {letter}
        </span>
      ))}
    </Link>
  );
}
