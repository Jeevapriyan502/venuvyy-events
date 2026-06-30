import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function Logo({
  variant = "dark",
  showTagline = true,
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";

  const sizes = {
    sm: { img: 48, title: "text-lg", tagline: "text-[0.55rem]" },
    md: { img: 64, title: "text-2xl md:text-3xl", tagline: "text-[0.65rem] md:text-xs" },
    lg: { img: 96, title: "text-4xl md:text-5xl", tagline: "text-xs md:text-sm" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Image
        src="/logo.png"
        alt="Venuvyy Events"
        width={s.img}
        height={s.img}
        className="h-auto w-auto shrink-0"
        priority
      />
      <div className="flex flex-col">
        <span
          className={`font-logo leading-none tracking-[0.12em] ${s.title} ${
            isDark
              ? "bg-gradient-to-b from-[#f0d78c] via-[#d4af37] to-[#9a7b2e] bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          VENUVYY EVENTS
        </span>
        {showTagline && (
          <span
            className={`font-tagline mt-1.5 uppercase tracking-[0.35em] ${s.tagline} ${
              isDark ? "text-[#c9a227]" : "text-[#d4af37]/90"
            }`}
          >
            Creating Moments, Capturing Memories
          </span>
        )}
      </div>
    </div>
  );
}
