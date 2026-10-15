import { useEffect, useRef } from "react";

/**
 * A small navy dot that follows the mouse with a soft lag, and grows over links and buttons.
 * Mouse and trackpad only: hidden on touch screens and for visitors who prefer reduced motion.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let frame = 0;
    let shown = false;

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.translate = `${x}px ${y}px`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        x = tx;
        y = ty;
        shown = true;
        dot.dataset["visible"] = "true";
      }
      const target = e.target instanceof Element ? e.target : null;
      dot.dataset["active"] = target?.closest(
        "a, button, [role='button'], input, select, textarea, label",
      )
        ? "true"
        : "false";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      shown = false;
      dot.dataset["visible"] = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
