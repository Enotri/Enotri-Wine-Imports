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
const FRAME_SPEED = 1.35; // film finishes around 74% of the film scroll, before the numbers
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
    leave: 30,
    side: "left",
    animation: "slide-left",
  },
  {
    label: "002 / The vineyard",
    heading: "Gravel and clay-limestone",
    body: "Merlot, Cabernet Sauvignon and Malbec drive the reds; Sémillon and Colombard the whites. The estate is in conversion to organic farming.",
    enter: 33,
    leave: 50,
    side: "right",
    animation: "slide-right",
  },
  {
    label: "003 / The harvest",
    heading: "From vine to crate",
    body: "At harvest the pickers work the rows with secateurs and red crates, and each crate is tipped into the bin bound for the cellar.",
    enter: 54,
    leave: 72,
    side: "left",
    animation: "clip-reveal",
  },
];

const stats = [
  { value: 1906, label: "In the Bassereau family since" },
  { value: 5, label: "Generations on the estate" },
  { value: 5, label: "Grape varieties" },
  { value: 4, label: "Types of vessel in the cellar" },
];

const STATS_ENTER = 78;

// Pinned statements; the last one lights up word by word.
const statements = [
  "Five generations on the same slopes.",
  "Merlot, Cabernet Sauvignon and Malbec on gravel and clay-limestone.",
  "Foudre, barrel, concrete or clay, chosen for each wine.",
];
const finalStatement = "We bring the work of independent growers to Alberta.";

// Horizontal gallery: photos and captions from the producer page.
const year = [
  {
    tag: "Prune",
    src: "/images/grave/people-lou-bassereau-4.webp",
    caption: "Pruning in winter",
    alt: "Pruning the vines in winter at Château de la Grave",
  },
  {
    tag: "Ripen",
    src: "/images/grave/vineyard-img-20260718-wa0000.webp",
    caption: "Véraison in July",
    alt: "Grapes colouring at véraison",
  },
  {
    tag: "Pick",
    src: "/images/grave/harvest-2025harvest.webp",
    caption: "Picking by hand",
    alt: "Two pickers carrying a red crate through the vines",
  },
  {
    tag: "Tip",
    src: "/images/grave/harvest-image00025.webp",
    caption: "Tipping into the bin",
    alt: "A crate of grapes tipped into the harvest bin",
  },
  {
    tag: "Age",
    src: "/images/grave/cellar-20260907160119.webp",
    caption: "The barrel hall",
    alt: "Rows of barrels in the cellar",
  },
  {
    tag: "Clay",
    src: "/images/grave/cellar-2.webp",
    caption: "Terracotta jars for Dolia",
    alt: "Terracotta jars in the cellar",
  },
];

// Centre a film section in the viewport when film progress reaches `at` (0–1).
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
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const step = mobile ? 2 : 1; // phones load every second frame
    const wanted: number[] = [];
    for (let i = 0; i < FRAME_COUNT; i += step) wanted.push(i);
    if (reduced) root.classList.add("is-reduced");

    // Custom cursor: a dot that trails the mouse and opens into a ring over links and photos
    const cursor = q<HTMLDivElement>(".hs-cursor");
    if (cursor && finePointer && !reduced) {
      root.classList.add("has-cursor");
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let cx = mx;
      let cy = my;
      let raf = 0;
      const move = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.classList.add("is-visible");
        const target = e.target instanceof Element ? e.target : null;
        const hot = target?.closest("a, button, [data-cursor]");
        cursor.classList.toggle("is-hot", Boolean(hot));
        cursor.dataset["label"] = hot?.getAttribute("data-cursor") ?? "";
      };
      const leave = () => cursor.classList.remove("is-visible");
      const loop = () => {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        raf = requestAnimationFrame(loop);
      };
      loop();
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      });
    }

    // Canvas: full-bleed cover, crisp on high-DPI screens
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
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
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

        /* ---------- 1. Film: frames, wipe, side text, numbers ---------- */
        type Entry = {
          enter: number;
          leave: number;
          persist: boolean;
          side: string | undefined;
          tl: gsap.core.Timeline | undefined;
          on: boolean;
          stats: boolean;
        };
        const entries: Entry[] = qa<HTMLElement>("[data-hs-section]").map((el) => {
          const kids = el.querySelectorAll(".hs-label, .hs-heading, .hs-body, .hs-stat");
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
          if (!reduced) {
            const accelerated = Math.min(p * FRAME_SPEED, 1);
            const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
            if (index !== current) {
              current = index;
              requestAnimationFrame(() => draw(current));
            }
          }
          if (hero) {
            hero.style.opacity = String(clamp(1 - p * 11));
            hero.style.visibility = p > 0.1 ? "hidden" : "visible";
          }
          if (wipe && !reduced) {
            wipe.style.clipPath = `circle(${clamp((p - 0.01) / 0.08) * 75}% at 50% 50%)`;
          }
          // Navy fades in for the numbers and stays, handing over to the navy section below
          const e = STATS_ENTER / 100;
          if (overlay) overlay.style.opacity = String(clamp((p - (e - 0.04)) / 0.04) * 0.92);
          if (marquee) {
            const mIn = clamp((p - 0.11) / 0.04);
            const mOut = clamp((0.76 - p) / 0.04);
            marquee.style.opacity = String(Math.min(mIn, mOut));
            marquee.style.transform = `translateX(${-p * 60}%)`;
          }
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

        if (reduced) return;

        /* ---------- 2. Pinned statements: lines swap, the last fills word by word ---------- */
        const lines = qa<HTMLElement>(".hs-statement:not(.hs-final)");
        const words = qa<HTMLElement>(".hs-final .hs-fill");
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: ".hs-statements",
            start: "top top",
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            scrub: 0.6,
          },
        });
        lines.forEach((line, i) => {
          st.fromTo(
            line,
            { autoAlpha: 0, yPercent: 40, filter: "blur(6px)" },
            { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
            i === 0 ? 0 : ">-0.1",
          );
          st.to(
            line,
            { autoAlpha: 0, yPercent: -40, filter: "blur(6px)", duration: 1, ease: "power2.in" },
            "+=0.6",
          );
        });
        st.fromTo(
          ".hs-final",
          { autoAlpha: 0, yPercent: 40 },
          { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "power2.out" },
          ">-0.1",
        );
        st.to(words, { color: "#ffffff", stagger: 0.25, duration: 0.6, ease: "none" });
        st.to({}, { duration: 0.8 });

        /* ---------- 3. Family photo grows from an inset to full screen ---------- */
        const grow = gsap.timeline({
          scrollTrigger: {
            trigger: ".hs-grow",
            start: "top top",
            end: () => `+=${window.innerHeight * 1.6}`,
            pin: true,
            scrub: 0.6,
          },
        });
        grow
          .fromTo(
            ".hs-grow-media",
            { clipPath: mobile ? "inset(48% 6% 6% 6%)" : "inset(16% 6% 16% 52%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 1 },
          )
          .fromTo(
            ".hs-grow-media img",
            { scale: 1.25 },
            { scale: 1, ease: "power2.inOut", duration: 1 },
            0,
          )
          .to(".hs-grow-copy", { autoAlpha: 0, x: -40, duration: 0.45 }, 0)
          .fromTo(
            ".hs-grow-caption",
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            0.6,
          );

        /* ---------- 4. Horizontal gallery driven by vertical scroll ---------- */
        const track = q<HTMLElement>(".hs-year-track");
        if (track) {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: ".hs-year",
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          qa<HTMLElement>(".hs-card-img img").forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: ".hs-year",
                  start: "top top",
                  end: () => `+=${distance()}`,
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        }

        /* ---------- 5. Closing photo drifts behind the call to action ---------- */
        gsap.fromTo(
          ".hs-cta-media img",
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".hs-cta",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.from(".hs-cta-inner > *", {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hs-cta",
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
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
      <div className="hs-cursor" aria-hidden="true" />

      <div className="hs-loader" role="status" aria-live="polite">
        <img className="hs-loader-brand" src="/enotri-logo-master.svg" alt="Enotri Wine Imports" />
        <div className="hs-loader-track">
          <div className="hs-loader-bar" />
        </div>
        <span className="hs-loader-percent">0%</span>
      </div>

      {/* 1. Film */}
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
          style={{ top: topAt(0.95) }}
          data-hs-section
          data-enter={STATS_ENTER}
          data-leave={100}
          data-persist="true"
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
      </div>

      {/* 2. Pinned statements */}
      <section className="hs-statements" aria-label="What makes Château de la Grave">
        <div className="hs-statements-inner">
          {statements.map((s) => (
            <p className="hs-statement" key={s}>
              {s}
            </p>
          ))}
          <p className="hs-statement hs-final">
            {finalStatement.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span className="hs-fill">{w}</span>{" "}
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* 3. Inset photo grows to full screen */}
      <section className="hs-grow">
        <div className="hs-grow-copy">
          <span className="hs-label">004 / The family</span>
          <h2 className="hs-grow-heading">A working vineyard and a family home</h2>
          <p className="hs-body">
            Five generations of the Bassereau family have farmed these slopes since the estate was
            bought in 1906.
          </p>
        </div>
        <div className="hs-grow-media" data-cursor="">
          <img
            src="/images/grave/people-famille-bassereau.webp"
            alt="The Bassereau family in their vineyard"
            loading="lazy"
          />
        </div>
        <p className="hs-grow-caption">The Bassereau family, Château de la Grave</p>
      </section>

      {/* 4. Horizontal gallery */}
      <section className="hs-year" aria-label="From vine to cellar">
        <div className="hs-year-track">
          <div className="hs-year-intro">
            <span className="hs-label">005 / Vine to cellar</span>
            <h2 className="hs-year-heading">One estate, start to finish.</h2>
            <p className="hs-body">
              The same family prunes the vines, picks the fruit and chooses the vessel for each
              wine. Keep scrolling.
            </p>
          </div>
          {year.map((c) => (
            <figure className="hs-card" key={c.tag} data-cursor="">
              <div className="hs-card-img">
                <img src={c.src} alt={c.alt} loading="lazy" />
              </div>
              <figcaption>
                <span className="hs-card-tag">{c.tag}</span>
                <span className="hs-card-caption">{c.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Call to action */}
      <section className="hs-cta">
        <div className="hs-cta-media">
          <img
            src="/images/grave/estate-017.webp"
            alt="The turreted façade of Château de la Grave"
            loading="lazy"
          />
        </div>
        <div className="hs-cta-inner">
          <span className="hs-label">006 / Taste it</span>
          <h2 className="hs-cta-heading">Château de la Grave in Alberta</h2>
          <p className="hs-body">
            Meet the family, explore the full range and ask us about trade pricing for your
            restaurant, shop or hotel.
          </p>
          <div className="hs-ctas">
            <Link
              to="/producers/$slug"
              params={{ slug: "chateau-de-la-grave" }}
              className="hs-button"
              data-cursor="Open"
            >
              Meet the producer
            </Link>
            <Link to="/contact" className="hs-link" data-cursor="Ask">
              Request trade pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
