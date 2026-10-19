// Shared GSAP + ScrollTrigger + Lenis setup for scroll-driven sections. Lenis is reference-counted
// so several components on one page share a single smooth-scroll instance.

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerT = typeof import("gsap/ScrollTrigger").ScrollTrigger;

export type ScrollKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerT; release: () => void };

let users = 0;
let teardown: (() => void) | undefined;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export async function loadScrollKit(): Promise<ScrollKit> {
  const [{ gsap }, { ScrollTrigger }, LenisMod] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  if (users === 0 && !prefersReducedMotion()) {
    const lenis = new LenisMod.default({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    teardown = () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }
  users += 1;

  let released = false;
  return {
    gsap,
    ScrollTrigger,
    release: () => {
      if (released) return;
      released = true;
      users -= 1;
      if (users === 0) {
        teardown?.();
        teardown = undefined;
      }
    },
  };
}
