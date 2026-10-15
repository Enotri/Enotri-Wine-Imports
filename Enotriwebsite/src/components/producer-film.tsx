import { useEffect, useRef, useState } from "react";

type ProducerFilmProps = {
  film: {
    src: string;
    poster: string;
    label: string;
    caption: string;
    /** Optional 4:5 version for phones (below md), used by the "fill" variant. */
    srcSmall?: string;
    posterSmall?: string;
  };
  className?: string;
  /** Caption colour; override on dark backgrounds. */
  captionClassName?: string;
  /**
   * "card" (default): rounded 9:16 frame with the caption below.
   * "fill": fills its container from md up (object-fit: cover), natural 9:16 below md,
   * with the caption laid over the bottom of the video on a dark gradient.
   */
  variant?: "card" | "fill";
};

/**
 * Portrait (9:16) producer film. The poster shows straight away; the video file is only
 * attached once the frame nears the viewport, then plays muted while on screen.
 * Reduced-motion visitors get the poster with controls and no autoplay.
 */
export function ProducerFilm({
  film,
  className = "",
  captionClassName = "text-muted-foreground",
  variant = "card",
}: ProducerFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [poster, setPoster] = useState(film.poster);
  const [reducedMotion, setReducedMotion] = useState(false);
  const visible = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    const small = !!film.srcSmall && window.matchMedia("(max-width: 767px)").matches;
    if (small && film.posterSmall) setPoster(film.posterSmall);

    // Attach the file shortly before it scrolls into view.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSrc(small && film.srcSmall ? film.srcSmall : film.src);
        loader.disconnect();
      },
      { rootMargin: "300px 0px" },
    );
    loader.observe(video);

    if (reduce) return () => loader.disconnect();

    // Play only while at least half of it is visible.
    const player = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visible.current = entry.intersectionRatio >= 0.5;
        if (visible.current) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5] },
    );
    player.observe(video);

    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [film.src, film.srcSmall, film.posterSmall]);

  // The file may attach after it is already on screen: start it then.
  useEffect(() => {
    if (src && visible.current && !reducedMotion) videoRef.current?.play().catch(() => {});
  }, [src, reducedMotion]);

  const video = (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      controls={reducedMotion}
      aria-label={film.label}
      className={
        variant === "fill"
          ? `block w-full object-cover object-center md:absolute md:inset-0 md:aspect-auto md:h-full ${film.srcSmall ? "aspect-[4/5]" : "aspect-[9/16]"}`
          : "aspect-[9/16] w-full rounded-md bg-muted object-cover shadow-soft"
      }
    />
  );

  if (variant === "fill") {
    return (
      <figure className={`relative overflow-hidden bg-ink ${className}`}>
        {video}
        <figcaption
          className={`text-backdrop pointer-events-none absolute left-4 text-sm text-foreground ${reducedMotion ? "bottom-16" : "bottom-4"}`}
        >
          {film.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={className}>
      {video}
      <figcaption className={`mt-2 text-sm ${captionClassName}`}>{film.caption}</figcaption>
    </figure>
  );
}
