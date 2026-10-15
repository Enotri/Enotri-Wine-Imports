import { useEffect, useRef, type ReactNode } from "react";

type ScrollExpandHeroProps = {
  /** Still shown inside the expanding frame, and the video poster when a video is supplied. */
  mediaSrc: string;
  mediaAlt: string;
  /** Optional vineyard video. When present it replaces the still inside the frame. */
  videoSrc?: string;
  /** Full-bleed image sitting behind the frame. */
  bgSrc: string;
  bgAlt: string;
  titleLead: string;
  titleTrail: string;
  scrollCue: string;
  children: ReactNode;
};

/**
 * Home-page hero whose media starts as a small centred frame and expands to fill the
 * viewport as the visitor scrolls, while the title splits apart and the page copy fades in.
 *
 * Progress is a single registered custom property, `--sh-p` (0 → 1), declared in styles.css.
 * Chrome and other browsers with scroll-driven animations drive it natively from a
 * `view()` timeline with no JavaScript at all. The effect below is only installed as a
 * fallback where that is unsupported, and is skipped entirely for reduced-motion visitors.
 */
export function ScrollExpandHero({
  mediaSrc,
  mediaAlt,
  videoSrc,
  bgSrc,
  bgAlt,
  titleLead,
  titleTrail,
  scrollCue,
  children,
}: ScrollExpandHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play the film only when the visitor allows motion; otherwise the poster stays as a still.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [videoSrc]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    section.dataset["shFallback"] = "true";

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? -rect.top / travel : 0;
      section.style.setProperty("--sh-p", String(Math.min(1, Math.max(0, progress))));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="sh">
      <div className="sh-pin">
        <img src={bgSrc} alt={bgAlt} className="sh-bg" fetchPriority="high" />

        <div className="sh-frame">
          {videoSrc ? (
            <video
              ref={videoRef}
              className="sh-media"
              src={videoSrc}
              poster={mediaSrc}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={mediaAlt}
            />
          ) : (
            <img src={mediaSrc} alt={mediaAlt} className="sh-media" fetchPriority="high" />
          )}
        </div>

        <h1 className="sh-title">
          <span className="sh-title-lead text-backdrop">{titleLead}</span>
          <span className="sh-title-trail text-backdrop">{titleTrail}</span>
        </h1>

        <p className="sh-cue" aria-hidden="true">
          <span className="text-backdrop inline-block">{scrollCue}</span>
        </p>

        <div className="sh-copy">{children}</div>
      </div>
    </section>
  );
}
