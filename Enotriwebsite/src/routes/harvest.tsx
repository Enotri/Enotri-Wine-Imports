import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef } from "react";
import harvestCss from "../styles/harvest-scroll.css?url";

export const Route = createFileRoute("/harvest")({
  head: () => ({
    meta: [
      { title: "The Harvest at Château de la Grave — Enotri Wine Imports" },
      {
        name: "description",
        content:
          "Scroll through a harvest at Château de la Grave, the Bassereau family's estate in the Côtes de Bourg, Bordeaux, since 1906.",
      },
      { property: "og:title", content: "The Harvest at Château de la Grave" },
      {
        property: "og:description",
        content: "Five generations on Bordeaux's right bank, from vine to cellar.",
      },
    ],
    links: [{ rel: "stylesheet", href: harvestCss }],
  }),
  component: Harvest,
});

// Frames extracted from /videos/home-hero-harvest.mp4 at 10 fps, 1280px wide.
const FRAME_COUNT = 150;
const FRAME_SPEED = 2.0; // film finishes by 50% of the scroll
const IMAGE_SCALE = 1; // full bleed: the film is a photo montage, not a product on a plain background
const STONE = "#e0dad2";
const frameUrl = (i: number) => `/frames/harvest/frame_${String(i + 1).padStart(4, "0")}.webp`;

type Animation =
  "fade-up" | "slide-left" | "slide-right" | "scale-up" | "stagger-up" | "clip-reveal";

type Story = {
  label: string;
  heading: string;
  body: string;
  enter: number;
  leave: number;
  side: "left" | "right";
  animation: Animation;
};

// Facts from the Château de la Grave entry in src/lib/portfolio.ts.
const stories: Story[] = [
  {
    label: "001 / The estate",
    heading: "Since 1906",
    body: "Château de la Grave has been in the Bassereau family since 1906, on the right bank of the Gironde in the Côtes de Bourg. Five generations on, it is still a working vineyard and a family home.",
    enter: 13,
    leave: 26,
    side: "left",
    animation: "slide-left",
  },
  {
    label: "002 / The vineyard",
    heading: "Gravel and clay-limestone",
    body: "Merlot, Cabernet Sauvignon and Malbec drive the reds; Sémillon and Colombard the whites. The estate is in conversion to organic farming.",
    enter: 28,
    leave: 41,
    side: "right",
    animation: "slide-right",
  },
  {
    label: "003 / The harvest",
    heading: "From vine to crate",
    body: "At harvest the pickers work the rows with secateurs and red crates, and each crate is tipped into the bin bound for the cellar.",
    enter: 43,
    leave: 55,
    side: "left",
    animation: "clip-reveal",
  },
  {
    label: "004 / The cellar",
    heading: "Chosen per cuvée",
    body: "Foudres, barrels, concrete vats and terracotta jars are all in use, chosen for each wine rather than by habit: from the classic Rouge and the Malbec-driven Caractère to the amphora-aged Dolia and the estate's méthode traditionnelle sparklers.",
    enter: 74,
    leave: 86,
    side: "right",
    animation: "scale-up",
  },
];

const stats = [
  { value: 1906, label: "In the Bassereau family since" },
  { value: 5, label: "Generations on the estate" },
  { value: 5, label: "Grape varieties" },
  { value: 4, label: "Types of vessel in the cellar" },
];

const STATS_ENTER = 58;
const STATS_LEAVE = 72;

// Centre a section in the viewport when scroll progress reaches `at` (0–1).
const topAt = (at: number) => `calc(${at} * (var(--hs-h) - 100vh) + 50vh)`;

function Harvest() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const container = scrollRef.current;
    const canvas = canvasRef.current;
    const ctx2d = canvas?.getContext("2d");
    if (!root || !container || !canvas || !ctx2d) return;

    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const step = mobile ? 2 : 1; // phones load every second frame
    const wanted: number[] = [];
    for (let i = 0; i < FRAME_COUNT; i += step) wanted.push(i);
    if (reduced) root.classList.add("is-reduced");

    // Canvas: padded cover on stone, crisp on high-DPI screens
    const frames: Array<HTMLImageElement | undefined> = [];
    let current = reduced ? Math.floor(FRAME_COUNT / 4) : 0;
    const nearestLoaded = (i: number) => {
      const snapped = Math.floor(i / step) * step;
      for (let j = snapped; j >= 0; j -= step) if (frames[j]) return j;
      return -1;
    };
    const draw = (i: number) => {
      const idx = nearestLoaded(i);
      const img = idx >= 0 ? frames[idx] : undefined;
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * IMAGE_SCALE;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx2d.fillStyle = STONE;
      ctx2d.fillRect(0, 0, cw, ch);
      ctx2d.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(current);
    };
    resize();
    window.addEventListener("resize", resize);
    cleanups.push(() => window.removeEventListener("resize", resize));

    // Preload: first 10 frames, then the rest; loader stays until all are in
    const bar = q<HTMLDivElement>(".hs-loader-bar");
    const pct = q<HTMLSpanElement>(".hs-loader-percent");
    const loader = q<HTMLDivElement>(".hs-loader");
    let loaded = 0;
    const loadFrame = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) frames[i] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(i);
      }).then(() => {
        loaded += 1;
        const p = Math.round((loaded / wanted.length) * 100);
        if (bar) bar.style.width = `${p}%`;
        if (pct) pct.textContent = `${p}%`;
        if (i === current || (i === 0 && current === 0)) draw(current);
      });

    let revertGsap: (() => void) | undefined;

    const start = async () => {
      await Promise.all(wanted.slice(0, 10).map(loadFrame));
      draw(current);
      await Promise.all(wanted.slice(10).map(loadFrame));
      if (cancelled) return;
      loader?.classList.add("is-done");

      const [{ gsap }, { ScrollTrigger }, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!reduced) {
        const lenis = new LenisMod.default({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
        });
      }

      const ctx = gsap.context(() => {
        // Hero words rise in once the frames are ready
        if (!reduced) {
          gsap.from(".hs-hero-heading .hs-word > span", {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            ease: "power3.out",
          });
          gsap.from(".hs-hero .hs-label, .hs-hero-tagline, .hs-cue", {
            y: 20,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.35,
            ease: "power3.out",
          });
        }

        type Entry = {
          el: HTMLElement;
          enter: number;
          leave: number;
          persist: boolean;
          side: string | undefined;
          tl: gsap.core.Timeline | undefined;
          on: boolean;
          stats: boolean;
        };
        const entries: Entry[] = qa<HTMLElement>("[data-hs-section]").map((el) => {
          const kids = el.querySelectorAll(".hs-label, .hs-heading, .hs-body, .hs-ctas, .hs-stat");
          let tl: gsap.core.Timeline | undefined;
          if (!reduced) {
            tl = gsap.timeline({ paused: true });
            switch (el.dataset["animation"] as Animation) {
              case "fade-up":
                tl.from(kids, {
                  y: 50,
                  opacity: 0,
                  stagger: 0.12,
                  duration: 0.9,
                  ease: "power3.out",
                });
                break;
              case "slide-left":
                tl.from(kids, {
                  x: -80,
                  opacity: 0,
                  stagger: 0.14,
                  duration: 0.9,
                  ease: "power3.out",
                });
                break;
              case "slide-right":
                tl.from(kids, {
                  x: 80,
                  opacity: 0,
                  stagger: 0.14,
                  duration: 0.9,
                  ease: "power3.out",
                });
                break;
              case "scale-up":
                tl.from(kids, {
                  scale: 0.85,
                  opacity: 0,
                  stagger: 0.12,
                  duration: 1,
                  ease: "power2.out",
                });
                break;
              case "stagger-up":
                tl.from(kids, {
                  y: 60,
                  opacity: 0,
                  stagger: 0.15,
                  duration: 0.8,
                  ease: "power3.out",
                });
                break;
              case "clip-reveal":
                tl.from(kids, {
                  clipPath: "inset(100% 0 0 0)",
                  opacity: 0,
                  stagger: 0.15,
                  duration: 1.2,
                  ease: "power4.inOut",
                });
                break;
            }
          }
          return {
            el,
            enter: Number(el.dataset["enter"]) / 100,
            leave: Number(el.dataset["leave"]) / 100,
            persist: el.dataset["persist"] === "true",
            side: el.dataset["side"],
            tl,
            on: false,
            stats: el.classList.contains("section-stats"),
          };
        });

        const numbers = qa<HTMLElement>(".hs-stat-number");
        const runCounters = (on: boolean) => {
          numbers.forEach((n) => {
            const target = Number(n.dataset["value"]);
            if (!on || reduced) {
              n.textContent = reduced ? String(target) : "0";
              return;
            }
            const o = { v: 0 };
            gsap.to(o, {
              v: target,
              duration: 2,
              ease: "power1.out",
              onUpdate: () => {
                n.textContent = String(Math.round(o.v));
              },
            });
          });
        };
        runCounters(false);

        const hero = q<HTMLElement>(".hs-hero");
        const wipe = q<HTMLElement>(".hs-canvas-wrap");
        const overlay = q<HTMLElement>(".hs-overlay");
        const marquee = q<HTMLElement>(".hs-marquee");
        const scrimL = q<HTMLElement>(".hs-scrim-left");
        const scrimR = q<HTMLElement>(".hs-scrim-right");
        const clamp = (v: number) => Math.min(1, Math.max(0, v));

        const update = (p: number) => {
          // Film
          if (!reduced) {
            const accelerated = Math.min(p * FRAME_SPEED, 1);
            const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
            if (index !== current) {
              current = index;
              requestAnimationFrame(() => draw(current));
            }
          }
          // Hero fades, canvas opens in a circle
          if (hero) hero.style.opacity = String(clamp(1 - p * 11));
          if (hero) hero.style.visibility = p > 0.1 ? "hidden" : "visible";
          if (wipe && !reduced) {
            wipe.style.clipPath = `circle(${clamp((p - 0.01) / 0.08) * 75}% at 50% 50%)`;
          }
          // Navy overlay for the stats
          const e = STATS_ENTER / 100;
          const l = STATS_LEAVE / 100;
          const f = 0.04;
          let o = 0;
          if (p >= e - f && p <= e) o = (p - (e - f)) / f;
          else if (p > e && p < l) o = 1;
          else if (p >= l && p <= l + f) o = 1 - (p - l) / f;
          if (overlay) overlay.style.opacity = String(o * 0.9);
          // Marquee drifts left, visible through the first half
          if (marquee) {
            const mIn = clamp((p - 0.11) / 0.04);
            const mOut = clamp((0.57 - p) / 0.04);
            marquee.style.opacity = String(Math.min(mIn, mOut));
            marquee.style.transform = `translateX(${-p * 60}%)`;
          }
          // Sections, scrims, counters
          let side: string | undefined;
          for (const s of entries) {
            const on = p >= s.enter && (s.persist || p <= s.leave);
            if (on && !s.stats) side = s.side;
            if (on === s.on) continue;
            s.on = on;
            if (on) s.tl?.play();
            else s.tl?.reverse();
            if (s.stats) runCounters(on);
          }
          if (scrimL) scrimL.style.opacity = side === "left" ? "1" : "0";
          if (scrimR) scrimR.style.opacity = side === "right" ? "1" : "0";
        };

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => update(self.progress),
          onRefresh: (self) => update(self.progress),
        });
        update(0);
      }, root);
      revertGsap = () => ctx.revert();
      ScrollTrigger.refresh();
    };
    void start();

    return () => {
      cancelled = true;
      revertGsap?.();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const heading = "The harvest at Château de la Grave";

  return (
    <div className="hs" ref={rootRef}>
      <div className="hs-loader" role="status" aria-live="polite">
        <img className="hs-loader-brand" src="/enotri-logo-master.svg" alt="Enotri Wine Imports" />
        <div className="hs-loader-track">
          <div className="hs-loader-bar" />
        </div>
        <span className="hs-loader-percent">0%</span>
      </div>

      <div className="hs-scroll" ref={scrollRef}>
        <div className="hs-stage">
          <div className="hs-canvas-wrap">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="A harvest at Château de la Grave: grapes in hand, the iron gates, the turreted château, pickers in the vines and crates tipped into the bin"
            />
          </div>
          <div className="hs-scrim hs-scrim-left" />
          <div className="hs-scrim hs-scrim-right" />
          <div className="hs-overlay" />
          <div className="hs-marquee" aria-hidden="true">
            <span className="hs-marquee-text">
              Château de la Grave · Côtes de Bourg · Château de la Grave · Côtes de Bourg ·
            </span>
          </div>
          <div className="hs-hero">
            <span className="hs-label">Côtes de Bourg · Bordeaux</span>
            <h1 className="hs-hero-heading">
              {heading.split(" ").map((w, i) => (
                <Fragment key={i}>
                  <span className="hs-word">
                    <span>{w}</span>
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <p className="hs-hero-tagline">
              The Bassereau family have farmed these right-bank slopes since 1906. Scroll through
              their harvest, from the vines to the cellar.
            </p>
            <div className="hs-cue" aria-hidden="true">
              <span className="hs-cue-arrow" />
              Scroll
            </div>
          </div>
        </div>

        {stories.map((s) => (
          <section
            key={s.label}
            className={`hs-section align-${s.side}`}
            style={{ top: topAt((s.enter + s.leave) / 200) }}
            data-hs-section
            data-enter={s.enter}
            data-leave={s.leave}
            data-side={s.side}
            data-animation={s.animation}
          >
            <div className="hs-section-inner">
              <span className="hs-label">{s.label}</span>
              <h2 className="hs-heading">{s.heading}</h2>
              <p className="hs-body">{s.body}</p>
            </div>
          </section>
        ))}

        <section
          className="hs-section section-stats"
          style={{ top: topAt((STATS_ENTER + STATS_LEAVE) / 200) }}
          data-hs-section
          data-enter={STATS_ENTER}
          data-leave={STATS_LEAVE}
          data-animation="stagger-up"
        >
          <span className="hs-label">The estate in numbers</span>
          <div className="hs-stats-grid">
            {stats.map((s) => (
              <div className="hs-stat" key={s.label}>
                <span className="hs-stat-number" data-value={s.value}>
                  {s.value}
                </span>
                <span className="hs-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="hs-section align-left"
          style={{ top: topAt(0.97) }}
          data-hs-section
          data-enter={88}
          data-leave={100}
          data-side="left"
          data-persist="true"
          data-animation="fade-up"
        >
          <div className="hs-section-inner">
            <span className="hs-label">005 / Taste it</span>
            <h2 className="hs-heading">Château de la Grave in Alberta</h2>
            <p className="hs-body">
              Meet the family, explore the full range and ask us about trade pricing for your
              restaurant, shop or hotel.
            </p>
            <div className="hs-ctas">
              <Link
                to="/producers/$slug"
                params={{ slug: "chateau-de-la-grave" }}
                className="hs-button"
              >
                Meet the producer
              </Link>
              <Link to="/contact" className="hs-link">
                Request trade pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
