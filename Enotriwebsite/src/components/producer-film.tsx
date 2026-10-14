import { useEffect, useRef, useState } from "react";

type ProducerFilmProps = {
  film: { src: string; poster: string; label: string; caption: string };
  className?: string;
};

/**
 * Portrait (9:16) producer film. The poster shows straight away; the video file is only
 * attached once the frame nears the viewport, then plays muted while on screen.
 * Reduced-motion visitors get the poster with controls and no autoplay.
 */
export function ProducerFilm({ film, className = "" }: ProducerFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [reducedMotion, setReducedMotion] = useState(false);
  const visible = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);

    // Attach the file shortly before it scrolls into view.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSrc(film.src);
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
  }, [film.src]);

  // The file may attach after it is already on screen: start it then.
  useEffect(() => {
    if (src && visible.current && !reducedMotion) videoRef.current?.play().catch(() => {});
  }, [src, reducedMotion]);

  return (
    <figure className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={film.poster}
        muted
        playsInline
        loop
        preload="metadata"
        controls={reducedMotion}
        aria-label={film.label}
        className="aspect-[9/16] w-full rounded-md bg-muted object-cover shadow-soft"
      />
      <figcaption className="mt-2 text-sm text-muted-foreground">{film.caption}</figcaption>
    </figure>
  );
}
