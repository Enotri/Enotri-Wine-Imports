import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { producerSlug, producers } from "@/lib/portfolio";
import { EUROPE_MAP, SOUTH_AFRICA_MAP, type MapPanel } from "@/lib/growers-map";
import { loadScrollKit, prefersReducedMotion } from "@/lib/scroll-kit";

// Estates whose towns sit almost on top of each other are nudged apart slightly.
const NUDGE: Record<string, [number, number]> = {
  "Viticultores de Lapuebla": [-11, -2],
  "Bodegas Heras Cordón": [11, 2],
  Pasetti: [-10, -2],
  Zaccagnini: [10, 3],
};

// West to east through the European estates: the path on the map. Neighbouring estates
// (the two in Rioja, the two in Abruzzo) share one point so the line flows.
const ROUTE: string[][] = [
  ["Domaine Gadais"],
  ["Château de la Grave"],
  ["Viticultores de Lapuebla", "Bodegas Heras Cordón"],
  ["Ferrero Federico"],
  ["Corte Moschina"],
  ["Pasetti", "Zaccagnini"],
];

function pinXY(panel: MapPanel, name: string): [number, number] | undefined {
  const xy = panel.pins[name];
  if (!xy) return undefined;
  const n = NUDGE[name] ?? [0, 0];
  return [xy[0] + n[0], xy[1] + n[1]];
}

// Smooth curve through the points (Catmull-Rom as cubic Béziers).
function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0]![0]},${pts[0]![1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

const countries = [...new Set(producers.map((p) => p.country))].sort();

function Panel({
  panel,
  country,
  drawn,
  className = "",
  route,
  uiScale = 1,
  reached,
}: {
  panel: MapPanel;
  country: string | null;
  drawn: boolean;
  className?: string;
  route?: string;
  /** Size of pins and text relative to the main map, for smaller panels. */
  uiScale?: number;
  /** Estates the scroll-drawn route has reached; the rest stay faint. */
  reached?: Set<string>;
}) {
  const [active, setActive] = useState<string | null>(null);
  const scale = uiScale;
  return (
    <div className={`relative ${className}`}>
      <img
        src={panel.src}
        alt=""
        loading="lazy"
        width={panel.width}
        height={panel.height}
        className="block h-auto w-full select-none"
      />
      <svg
        viewBox={`0 0 ${panel.width} ${panel.height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {panel.labels.map((l) => (
          <text
            key={l.text}
            x={l.xy[0]}
            y={l.xy[1]}
            textAnchor="middle"
            className="growers-map__label"
            style={{ fontSize: 46 * scale }}
          >
            {l.text}
          </text>
        ))}
        {route && (
          <path
            d={route}
            pathLength={1}
            className="growers-map__route"
            data-drawn={drawn ? "true" : "false"}
            data-scrubbed="true"
          />
        )}
        {producers.map((p) => {
          const xy = pinXY(panel, p.name);
          if (!xy) return null;
          const dim = country !== null && country !== p.country;
          const s = 1.15 * scale;
          return (
            <Link
              key={p.name}
              to="/producers/$slug"
              params={{ slug: producerSlug(p.name) }}
              aria-label={`${p.name}, ${p.region}, ${p.country}`}
              className="growers-map__pin"
              data-dim={dim ? "true" : "false"}
              data-reached={!reached || reached.has(p.name) ? "true" : "false"}
              onMouseEnter={() => setActive(p.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.name)}
              onBlur={() => setActive(null)}
            >
              <g transform={`translate(${xy[0]} ${xy[1]}) scale(${s})`}>
                {/* larger invisible tap area, then the teardrop pin with its tip on the town */}
                <circle cy={-20} r={40} fill="transparent" />
                <path d="M0 0 C-4 -9 -11 -14 -11 -22 A11 11 0 1 1 11 -22 C11 -14 4 -9 0 0Z" />
                <circle cy={-22} r={4} className="growers-map__pin-eye" />
              </g>
              {active === p.name && (
                <text
                  x={xy[0]}
                  y={xy[1] - 42 * s}
                  textAnchor="middle"
                  className="growers-map__tip"
                  style={{ fontSize: 30 * scale }}
                >
                  {p.name}
                </text>
              )}
            </Link>
          );
        })}
      </svg>
    </div>
  );
}

/** "Explore our growers": relief map with a pin per estate, a path through Europe, country filters. */
export function GrowersMap() {
  const [country, setCountry] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const route = smoothPath(
    ROUTE.map((group) => {
      const pts = group.map((n) => EUROPE_MAP.pins[n]).filter((p): p is [number, number] => !!p);
      return [
        pts.reduce((a, p) => a + p[0], 0) / pts.length,
        pts.reduce((a, p) => a + p[1], 0) / pts.length,
      ] as [number, number];
    }),
  );

  // The route draws as the visitor scrolls past the map; each estate lights up as the line
  // reaches it. Without motion the whole route shows at once.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setDrawn(true);
      setProgress(1);
      return;
    }
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void loadScrollKit().then(({ ScrollTrigger, release }) => {
      if (cancelled) {
        release();
        return;
      }
      const path = el.querySelector<SVGPathElement>(".growers-map__route");
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 45%",
        scrub: true,
        onUpdate: (self) => {
          if (path) path.style.strokeDashoffset = String(1 - self.progress);
          setProgress(Math.round(self.progress * 100) / 100);
        },
      });
      cleanup = () => {
        st.kill();
        release();
      };
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // Stops along the route, plus South Africa once the line is complete.
  const stops = ROUTE.length;
  const reachedCount = Math.min(stops, Math.floor(progress * stops + 0.15));
  const reached = new Set<string>(ROUTE.slice(0, reachedCount).flat());
  if (progress >= 0.98)
    producers.filter((p) => !EUROPE_MAP.pins[p.name]).forEach((p) => reached.add(p.name));
  const current = ROUTE[Math.max(0, reachedCount - 1)];
  const currentLabel =
    reachedCount === 0 || !current
      ? ""
      : current
          .map((n) => {
            const p = producers.find((q) => q.name === n);
            return p ? `${p.name}, ${p.region}` : n;
          })
          .join(" · ");

  const pill = (value: string | null, label: string) => (
    <button
      key={label}
      type="button"
      aria-pressed={country === value}
      onClick={() => setCountry(value)}
      className="growers-map__pill"
    >
      {label}
    </button>
  );

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="home-label">Where our wines come from</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Explore our growers</h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Discover the places our wines are grown.
          </p>
          <div
            role="group"
            aria-label="Show growers by country"
            className="mt-8 flex flex-wrap gap-3 lg:flex-col lg:items-start"
          >
            {pill(null, "All the growers")}
            {countries.map((c) => pill(c, c))}
          </div>
        </div>
        <div ref={ref} className="relative">
          <Panel
            panel={EUROPE_MAP}
            country={country}
            drawn={drawn}
            route={route}
            reached={reached}
          />
          <Panel
            panel={SOUTH_AFRICA_MAP}
            country={country}
            drawn={drawn}
            uiScale={2.2}
            reached={reached}
            className="mt-6 w-1/2 border border-navy/15 bg-background/80 sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:w-[24%]"
          />
          <p className="growers-map__now" aria-hidden="true">
            {currentLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
