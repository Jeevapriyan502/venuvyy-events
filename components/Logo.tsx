import Image from "next/image";

type LogoProps = {
  showTagline?: boolean;
  showTitle?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  blend?: boolean;
  animate?: boolean;
};

export default function Logo({
  showTagline = false,
  showTitle = false,
  size = "md",
  blend = true,
  animate = false,
}: LogoProps) {
  const sizes = {
    sm: { w: 140, h: 40 },
    md: { w: 180, h: 52 },
    lg: { w: 240, h: 68 },
    hero: { w: 320, h: 90 },
  };

  const s = sizes[size];

  const image = (
    <Image
      src="/logo.png"
      alt="Venuvyy Events"
      width={s.w}
      height={s.h}
      className="h-auto w-auto max-h-full object-contain object-left"
      style={{ width: "auto", height: "auto", maxHeight: s.h }}
      priority
    />
  );

  if (blend) {
    return (
      <div className={`logo-layered ${animate ? "logo-pop-in" : ""}`}>
        <div className="logo-layer-back" aria-hidden />
        <div className="logo-layer-mid" aria-hidden />
        <div
          className={`logo-layer-front ${size === "hero" ? "px-5 py-4" : "px-3 py-2"}`}
        >
          {image}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${animate ? "logo-pop-in" : ""}`}>
      {image}
      {(showTitle || showTagline) && (
        <div className="flex flex-col">
          {showTitle && (
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Venuvyy Events
            </span>
          )}
          {showTagline && (
            <span className="text-xs text-muted">Creating Moments, Capturing Memories</span>
          )}
        </div>
      )}
    </div>
  );
}
