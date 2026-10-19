import { useEffect, useRef, type ReactNode } from "react";
import { loadScrollKit, prefersReducedMotion } from "@/lib/scroll-kit";

export type ScrollStep = {
  kicker: string;
  title: string;
  body: string;
  media?: { src: string; alt: string };
};

/**
 * A pinned section that steps through items as the visitor scrolls: each step slides in and the
 * previous one slides out, with a progress rail. Without motion it is a plain stacked list.
 * Styles live in src/styles/scroll-steps.css (link it in the route's head).
 */
export function ScrollSteps({
  eyebrow,
  heading,
  intro,
  steps,
  tone = "stone",
  footer,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  steps: ScrollStep[];
  tone?: "stone" | "navy";
  footer?: ReactNode;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      root.classList.add("is-reduced");
      return;
    }
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void loadScrollKit().then(({ gsap, ScrollTrigger, release }) => {
      if (cancelled) {
        release();
        return;
      }
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".sst-step", root);
        const bar = root.querySelector<HTMLElement>(".sst-bar");
        const count = root.querySelector<HTMLElement>(".sst-count-now");
        gsap.set(items, { autoAlpha: 0, yPercent: 12 });
        gsap.set(items[0] ?? [], { autoAlpha: 1, yPercent: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * (0.9 * steps.length)}`,
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleY(${self.progress})`;
              if (count) {
                const n = Math.min(steps.length, Math.floor(self.progress * steps.length) + 1);
                count.textContent = String(n).padStart(2, "0");
              }
            },
          },
        });
        tl.to({}, { duration: 0.5 });
        items.forEach((item, i) => {
          if (i === 0) return;
          const prev = items[i - 1];
          if (prev) tl.to(prev, { autoAlpha: 0, yPercent: -12, duration: 0.5, ease: "power2.in" });
          tl.to(item, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: "power2.out" }, "<0.25");
          tl.to({}, { duration: 0.6 });
        });
        tl.to({}, { duration: 0.4 });
      }, root);
      ScrollTrigger.refresh();
      cleanup = () => {
        ctx.revert();
        release();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [steps.length]);

  return (
    <section ref={rootRef} className={`sst sst--${tone}`}>
      <div className="sst-inner">
        <div className="sst-head">
          <p className="eyebrow sst-eyebrow">{eyebrow}</p>
          <h2 className="sst-heading">{heading}</h2>
          {intro && <p className="sst-intro">{intro}</p>}
          <div className="sst-progress" aria-hidden="true">
            <span className="sst-count">
              <span className="sst-count-now">01</span> / {String(steps.length).padStart(2, "0")}
            </span>
            <span className="sst-rail">
              <span className="sst-bar" />
            </span>
          </div>
          {footer && <div className="sst-footer">{footer}</div>}
        </div>
        <ol className="sst-steps">
          {steps.map((s) => (
            <li className="sst-step" key={s.title}>
              {s.media && (
                <img className="sst-media" src={s.media.src} alt={s.media.alt} loading="lazy" />
              )}
              <span className="sst-kicker">{s.kicker}</span>
              <h3 className="sst-title">{s.title}</h3>
              <p className="sst-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
