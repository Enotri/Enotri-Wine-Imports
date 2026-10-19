import { Fragment, useEffect, useRef } from "react";
import type { Producer, Wine } from "@/lib/portfolio";
import { loadScrollKit, prefersReducedMotion } from "@/lib/scroll-kit";

type Photo = { src: string; alt: string; caption?: string | undefined; group?: string | undefined };

/**
 * Scroll story under a producer page: the producer's own summary lit up word by word, a pinned
 * sideways gallery of their photos, and their bottles sliding in. Built only from portfolio data.
 * Each part renders only when there is enough material for it.
 */
export function ProducerStory({
  producer,
  photos,
  wines,
}: {
  producer: Producer;
  photos: Photo[];
  wines: Wine[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottles = wines.filter((w) => w.cutout ?? w.image);
  const showGallery = photos.length >= 3;
  const showBottles = bottles.length >= 1;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      root.classList.add("is-reduced");
      return;
    }

    let cancelled = false;
    const cleanups: Array<() => void> = [];

    void loadScrollKit().then(({ gsap, ScrollTrigger, release }) => {
      if (cancelled) {
        release();
        return;
      }
      cleanups.push(release);

      const ctx = gsap.context(() => {
        // 1. Summary: pinned, words fill from faint to white
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".ps-statement",
              start: "top top",
              end: () => `+=${window.innerHeight * 1.6}`,
              pin: true,
              scrub: 0.6,
            },
          })
          .fromTo(
            ".ps-statement-label",
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.3 },
          )
          .to(".ps-statement .ps-fill", {
            color: "#ffffff",
            stagger: 0.12,
            duration: 0.4,
            ease: "none",
          })
          .to({}, { duration: 0.4 });

        // 2. Gallery: vertical scroll drives the track sideways
        const track = root.querySelector<HTMLElement>(".ps-track");
        if (track) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: ".ps-gallery",
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }

        // 3. Bottles rise in one after another
        gsap.from(".ps-bottle", {
          yPercent: 30,
          autoAlpha: 0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ps-bottles", start: "top 75%", end: "top 25%", scrub: 0.6 },
        });
      }, root);
      cleanups.unshift(() => ctx.revert());
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [producer.name]);

  return (
    <div className="ps" ref={rootRef}>
      <section className="ps-statement" aria-label={`About ${producer.name}`}>
        <div className="ps-statement-inner">
          <span className="ps-statement-label">
            {producer.region}, {producer.country}
          </span>
          <p className="ps-statement-text">
            {producer.summary.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span className="ps-fill">{w}</span>{" "}
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      {showGallery && (
        <section className="ps-gallery" aria-label={`Photos from ${producer.name}`}>
          <div className="ps-track">
            <div className="ps-intro">
              <span className="ps-label">The estate</span>
              <h2 className="ps-heading">{producer.name}, in pictures.</h2>
              <p className="ps-body">Keep scrolling.</p>
            </div>
            {photos.map((p) => (
              <figure className="ps-card" key={p.src}>
                <div className="ps-card-img">
                  <img src={p.src} alt={p.alt} loading="lazy" />
                </div>
                {(p.group || p.caption) && (
                  <figcaption>
                    {p.group && <span className="ps-card-tag">{p.group}</span>}
                    {p.caption && <span className="ps-card-caption">{p.caption}</span>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {showBottles && (
        <section className="ps-bottles" aria-label={`Wines by ${producer.name}`}>
          <span className="ps-label">From the Enotri portfolio</span>
          <h2 className="ps-heading">The wines</h2>
          <ul className="ps-bottle-row">
            {bottles.map((w) => (
              <li className="ps-bottle" key={w.name}>
                <img src={w.cutout ?? w.image} alt={`${w.name} bottle`} loading="lazy" />
                <span className="ps-bottle-name">{w.name}</span>
                <span className="ps-bottle-meta">
                  {w.colour} · {w.grapes}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
