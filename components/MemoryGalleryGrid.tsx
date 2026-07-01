"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type GalleryItem = {
  id: string;
  title: string | null;
  caption: string | null;
  imageUrl: string;
};

function ScrollRow({
  items,
  reverse,
  duration,
}: {
  items: GalleryItem[];
  reverse?: boolean;
  duration: string;
}) {
  const track = [...items, ...items];

  return (
    <div className="memory-gallery-row">
      <div
        className={`memory-gallery-track ${reverse ? "memory-gallery-track-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {track.map((item, i) => (
          <article key={`${item.id}-${i}`} className="memory-gallery-card group">
            <Image
              src={item.imageUrl}
              alt={item.title || "Happy client memory"}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="320px"
            />
            <div className="memory-gallery-card-shine" aria-hidden />
            <div className="memory-gallery-card-overlay">
              {item.title && (
                <h3 className="text-sm font-semibold tracking-wide text-white">{item.title}</h3>
              )}
              {item.caption && (
                <p className="font-description mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">
                  {item.caption}
                </p>
              )}
              {!item.title && !item.caption && (
                <p className="text-xs font-medium uppercase tracking-widest text-white/90">
                  A moment to remember
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function MemoryGalleryGrid({ images }: { images: GalleryItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const secondRowItems =
    images.length > 1 ? [...images].slice().reverse() : images;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="memory-gallery-section scroll-mt-20 border-b border-border py-20 md:py-24"
    >
      <div className="section-wrap">
        <div
          className={`memory-gallery-header transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="section-label text-warm">Memory gallery</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Our happy clients
              </h2>
              <p className="font-description mt-4 max-w-xl text-muted">
                Real celebrations, real smiles — a glimpse of the memories we&apos;ve helped create.
              </p>
            </div>
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div
          className={`memory-gallery-stage mt-12 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <div className="memory-gallery-fade memory-gallery-fade-left" aria-hidden />
          <div className="memory-gallery-fade memory-gallery-fade-right" aria-hidden />

          <ScrollRow items={images} duration="52s" />
          {images.length > 1 && (
            <ScrollRow items={secondRowItems} reverse duration="64s" />
          )}

          <p className="memory-gallery-hint">Hover to pause · scrolls automatically</p>
        </div>
      ) : (
        <div className="section-wrap">
          <div
            className={`card mt-12 border-dashed p-12 text-left transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <p className="font-description text-muted">
              Client memories will appear here — add photos from the admin dashboard.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
