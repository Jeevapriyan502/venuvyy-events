"use client";

import Image from "next/image";
import {
  CELEBRATION_IMAGES,
  FLOATING_EMOJIS,
  SURPRISE_EMOJIS,
} from "@/lib/celebration-assets";

function ScrollRow({
  reverse,
  duration,
  top,
}: {
  reverse?: boolean;
  duration: string;
  top: string;
}) {
  const track = [...CELEBRATION_IMAGES, ...CELEBRATION_IMAGES];

  return (
    <div className="celebration-scroll-row" style={{ top }}>
      <div
        className={`celebration-scroll-track ${reverse ? "celebration-scroll-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {track.map((img, i) => (
          <div key={`${img.src}-${i}`} className="celebration-scroll-card">
            <Image
              src={img.src}
              alt=""
              width={200}
              height={140}
              className="h-full w-full object-cover"
              sizes="200px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmojiMarquee({
  top,
  duration,
  reverse,
}: {
  top: string;
  duration: string;
  reverse?: boolean;
}) {
  const emojis = [...SURPRISE_EMOJIS, ...SURPRISE_EMOJIS];

  return (
    <div className="celebration-emoji-row" style={{ top }}>
      <div
        className={`celebration-emoji-track ${reverse ? "celebration-scroll-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {emojis.map((emoji, i) => (
          <span key={`${emoji}-${i}`} className="celebration-emoji-chip" aria-hidden>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CelebrationBackground() {
  return (
    <div className="celebration-backdrop" aria-hidden>
      <ScrollRow top="6%" duration="55s" />
      <ScrollRow top="38%" duration="70s" reverse />
      <ScrollRow top="70%" duration="62s" />
      <EmojiMarquee top="22%" duration="38s" />
      <EmojiMarquee top="58%" duration="45s" reverse />

      {FLOATING_EMOJIS.map((item) => (
        <span
          key={`${item.emoji}-${item.top}-${item.left}`}
          className="celebration-float-emoji"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.emoji}
        </span>
      ))}

      <div className="celebration-backdrop-vignette" />
    </div>
  );
}
