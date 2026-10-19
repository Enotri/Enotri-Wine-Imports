import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Globe2, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Map as MlMap, Marker as MlMarker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { producerSlug, producers, wines } from "@/lib/portfolio";

// Free vector tiles (no account or key), recoloured to the Enotri palette once loaded.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const LAND = "#f1ede6";
const WATER = "#a9bcd3";
const INK = "#00205b";

type LngLat = [number, number];

// Each estate's home town (approximate) and the wine region it is grouped under on the map.
const ESTATES: Record<string, { region: string; lngLat: LngLat }> = {
  "Château de la Grave": { region: "Bordeaux", lngLat: [-0.559, 45.042] },
  "Domaine Gadais": { region: "Loire", lngLat: [-1.418, 47.143] },
  "Viticultores de Lapuebla": { region: "Rioja", lngLat: [-2.57, 42.494] },
  "Bodegas Heras Cordón": { region: "Rioja", lngLat: [-2.563, 42.466] },
  "Ferrero Federico": { region: "Piedmont", lngLat: [8.15, 44.686] },
  "Corte Moschina": { region: "Veneto", lngLat: [11.287, 45.479] },
  Pasetti: { region: "Abruzzo", lngLat: [13.886, 42.256] },
  Zaccagnini: { region: "Abruzzo", lngLat: [13.961, 42.218] },
  "Stellenrust Family Vineyards": { region: "Stellenbosch", lngLat: [18.81, -33.95] },
};

const COUNTRIES: Record<
  string,
  { code: string; group: "EU" | "SA"; pin: LngLat; center: LngLat; zoom: number }
> = {
  France: { code: "FRA", group: "EU", pin: [1.9, 46.7], center: [2.3, 46.3], zoom: 4.9 },
  Spain: { code: "ESP", group: "EU", pin: [-3.7, 40.1], center: [-3.6, 40.2], zoom: 5 },
  Italy: { code: "ITA", group: "EU", pin: [12.6, 42.9], center: [12.4, 42.4], zoom: 4.9 },
  "South Africa": { code: "SA", group: "SA", pin: [24.5, -29.5], center: [23.5, -29.5], zoom: 4.6 },
};

const WORLD_BOUNDS: [LngLat, LngLat] = [
  [-30, -42],
  [58, 62],
];
const EUROPE = { center: [4.5, 44.5] as LngLat, zoom: 3.9, pin: [9, 48.5] as LngLat };

const estates = producers
  .filter((p) => ESTATES[p.name])
  .map((p) => ({ ...p, ...ESTATES[p.name]! }));
const countryNames = Object.keys(COUNTRIES).filter((c) => estates.some((e) => e.country === c));
const regionNames = [...new Set(estates.map((e) => e.region))];
const regionCountry = (r: string) => estates.find((e) => e.region === r)!.country;
const regionCentre = (r: string): LngLat => {
  const pts = estates.filter((e) => e.region === r).map((e) => e.lngLat);
  return [
    pts.reduce((a, p) => a + p[0], 0) / pts.length,
    pts.reduce((a, p) => a + p[1], 0) / pts.length,
  ];
};

type View =
  | { level: "world" }
  | { level: "europe" }
  | { level: "country"; country: string }
  | { level: "region"; region: string; focus?: string };

function pinEl(label: string, onClick: () => void, small = false) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `pmap-pin${small ? " pmap-pin--region" : ""}`;
  el.setAttribute("aria-label", `Show ${label}`);
  el.innerHTML = `<span class="pmap-pin__body"><span class="pmap-pin__label"></span></span>`;
  el.querySelector(".pmap-pin__label")!.textContent = label;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  return el;
}

const GRAPES = `<svg viewBox="0 0 32 40" aria-hidden="true" class="pmap-estate__icon">
  <path d="M16 6 C17 2 21 0 25 1 C23 4 20 6 16 6Z" class="pmap-estate__leaf"/>
  <path d="M16 6 V10" stroke="currentColor" stroke-width="1.6" fill="none"/>
  ${[
    [10, 13],
    [16, 13],
    [22, 13],
    [7, 19],
    [13, 19],
    [19, 19],
    [25, 19],
    [10, 25],
    [16, 25],
    [22, 25],
    [13, 31],
    [19, 31],
    [16, 37],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`)
    .join("")}
</svg>`;

function estateEl(name: string, href: string, onOpen: () => void, focused: boolean) {
  const el = document.createElement("a");
  el.href = href;
  el.className = `pmap-estate${focused ? " is-focused" : ""}`;
  el.innerHTML = `${GRAPES}<span class="pmap-estate__name"></span>`;
  el.querySelector(".pmap-estate__name")!.textContent = name;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  });
  return el;
}

function Picker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="pmap-select">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pmap-select__chevron" aria-hidden="true" />
    </label>
  );
}

// Accent- and case-insensitive, so "chateau" finds "Château" and "heras cordon" finds "Heras Cordón".
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const searchIndex = producers.map((p) => ({
  name: p.name,
  where: `${p.region}, ${p.country}`,
  text: fold(
    [
      p.name,
      p.region,
      p.country,
      ...wines.filter((w) => w.producer === p.name).map((w) => w.name),
    ].join(" "),
  ),
}));

/** Type-ahead search over producer names, regions, countries and their wines. */
function ProducerSearch({ onPick }: { onPick: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const terms = fold(q).split(/\s+/).filter(Boolean);
  const results = terms.length
    ? searchIndex.filter((r) => terms.every((t) => r.text.includes(t)))
    : searchIndex;

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const pick = (name: string) => {
    setOpen(false);
    setQ("");
    onPick(name);
  };

  if (!open) {
    return (
      <button
        type="button"
        className="pmap-search__toggle"
        onClick={() => setOpen(true)}
        aria-label="Search producers"
      >
        <Search aria-hidden="true" />
      </button>
    );
  }

  return (
    <div className="pmap-search">
      <Search className="pmap-search__icon" aria-hidden="true" />
      <input
        ref={input}
        type="search"
        role="combobox"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
        aria-label="Search producers, regions or wines"
        placeholder="Search producers, regions or wines"
        className="pmap-search__input"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            const r = results[active];
            if (r) pick(r.name);
          } else if (e.key === "Escape") {
            setOpen(false);
            setQ("");
          }
        }}
      />
      <button
        type="button"
        className="pmap-search__close"
        onClick={() => {
          setOpen(false);
          setQ("");
        }}
        aria-label="Close search"
      >
        <X aria-hidden="true" />
      </button>
      <ul id={listId} role="listbox" className="pmap-search__list">
        {results.length === 0 ? (
          <li className="pmap-search__empty">No producer matches “{q}”. Try a region or grape.</li>
        ) : (
          results.map((r, n) => (
            <li
              key={r.name}
              id={`${listId}-${n}`}
              role="option"
              aria-selected={n === active}
              className="pmap-search__option"
              onMouseEnter={() => setActive(n)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(r.name);
              }}
            >
              <span>{r.name}</span>
              <span className="pmap-search__where">{r.where}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

/** Producers page hero: a zoomable map that drills from the world down to each estate. */
export function ProducersMap({
  producer,
  id,
}: {
  /** Open zoomed in on this estate (producer pages) instead of the world view. */
  producer?: string;
  id?: string;
} = {}) {
  const navigate = useNavigate();
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<MlMap | null>(null);
  const lib = useRef<typeof import("maplibre-gl") | null>(null);
  const markers = useRef<MlMarker[]>([]);
  const firstMove = useRef(true);
  const [ready, setReady] = useState(false);
  const home: View = (() => {
    const e = producer ? ESTATES[producer] : undefined;
    return e && producer
      ? { level: "region", region: e.region, focus: producer }
      : { level: "world" };
  })();
  const [view, setView] = useState<View>(home);
  const openProducer = (name: string) =>
    navigate({ to: "/producers/$slug", params: { slug: producerSlug(name) } });

  // Producer pages reuse this component, so re-centre on the new estate after navigating.
  useEffect(() => {
    if (producer) setView(home);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [producer]);

  // Create the map in the browser only (it needs WebGL and the DOM).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ml = await import("maplibre-gl");
      if (cancelled || !box.current) return;
      lib.current = ml;
      const m = new ml.Map({
        container: box.current,
        style: STYLE_URL,
        bounds: WORLD_BOUNDS,
        fitBoundsOptions: { padding: 40 },
        renderWorldCopies: false,
        scrollZoom: false,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
      });
      m.touchZoomRotate.disableRotation();
      m.addControl(new ml.NavigationControl({ showCompass: false }), "bottom-right");
      m.on("style.load", () => {
        const set = (id: string, prop: Parameters<MlMap["setPaintProperty"]>[1], v: string) => {
          if (m.getLayer(id)) m.setPaintProperty(id, prop, v);
        };
        set("background", "background-color", LAND);
        set("water", "fill-color", WATER);
        set("waterway", "line-color", WATER);
        set("park", "fill-color", LAND);
        set("landcover_wood", "fill-color", "#e9e4da");
        set("landuse_residential", "fill-color", "#e9e4da");
        for (const id of ["boundary_2", "boundary_3", "boundary_disputed"]) {
          set(id, "line-color", "rgba(0,32,91,0.35)");
        }
        for (const l of m.getStyle().layers) {
          if (l.type !== "symbol") continue;
          if (/highway|road_shield|airport|label_other|waterway_line/.test(l.id)) {
            m.setLayoutProperty(l.id, "visibility", "none");
          } else {
            m.setPaintProperty(l.id, "text-color", INK);
            // Keep the world view clean, as on the drill-down maps it is modelled on.
            m.setLayerZoomRange(l.id, Math.max(l.minzoom ?? 0, 3.5), l.maxzoom ?? 24);
          }
        }
        setReady(true);
      });
      map.current = m;
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Move the camera and swap the pins whenever the view changes.
  useEffect(() => {
    const m = map.current;
    const ml = lib.current;
    if (!ready || !m || !ml) return;
    m.resize();
    markers.current.forEach((mk) => mk.remove());
    const add = (el: HTMLElement, at: LngLat, anchor: "bottom" | "center" = "bottom") =>
      markers.current.push(new ml.Marker({ element: el, anchor }).setLngLat(at).addTo(m));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Jump straight to the first view; animate every move after that.
    const move = { essential: true, duration: reduce || firstMove.current ? 0 : 1600 };
    firstMove.current = false;

    if (view.level === "world") {
      m.fitBounds(WORLD_BOUNDS, { padding: 40, ...move });
      if (countryNames.some((c) => COUNTRIES[c]!.group === "EU")) {
        add(
          pinEl("EU", () => setView({ level: "europe" })),
          EUROPE.pin,
        );
      }
      for (const c of countryNames.filter((c) => COUNTRIES[c]!.group === "SA")) {
        add(
          pinEl(COUNTRIES[c]!.code, () => setView({ level: "country", country: c })),
          COUNTRIES[c]!.pin,
        );
      }
    } else if (view.level === "europe") {
      m.flyTo({ center: EUROPE.center, zoom: EUROPE.zoom, ...move });
      for (const c of countryNames.filter((c) => COUNTRIES[c]!.group === "EU")) {
        add(
          pinEl(COUNTRIES[c]!.code, () => setView({ level: "country", country: c })),
          COUNTRIES[c]!.pin,
        );
      }
    } else if (view.level === "country") {
      const c = COUNTRIES[view.country]!;
      m.flyTo({ center: c.center, zoom: c.zoom, ...move });
      for (const r of regionNames.filter((r) => regionCountry(r) === view.country)) {
        add(
          pinEl(r, () => setView({ level: "region", region: r }), true),
          regionCentre(r),
        );
      }
    } else {
      const here = estates.filter((e) => e.region === view.region);
      const focus = here.find((e) => e.name === view.focus);
      if (focus) {
        m.flyTo({ center: focus.lngLat, zoom: 10, ...move });
      } else {
        const b = new ml.LngLatBounds(here[0]!.lngLat, here[0]!.lngLat);
        here.forEach((e) => b.extend(e.lngLat));
        m.fitBounds(b, { padding: 140, maxZoom: 9, ...move });
      }
      for (const e of here) {
        const slug = producerSlug(e.name);
        add(
          estateEl(
            e.name,
            `/producers/${slug}`,
            () => void navigate({ to: "/producers/$slug", params: { slug } }),
            e.name === view.focus,
          ),
          e.lngLat,
          "center",
        );
      }
    }
  }, [view, ready, navigate]);

  const country =
    view.level === "country"
      ? view.country
      : view.level === "region"
        ? regionCountry(view.region)
        : "";
  const region = view.level === "region" ? view.region : "";
  const picked = view.level === "region" ? (view.focus ?? "") : "";
  const regionOptions = regionNames.filter((r) => !country || regionCountry(r) === country);
  const producerOptions = estates
    .filter((e) => (region ? e.region === region : !country || e.country === country))
    .map((e) => e.name);

  return (
    <section
      id={id}
      className={`pmap${producer ? " pmap--compact" : ""}`}
      aria-label="Map of our producers"
    >
      <div className="pmap__controls">
        <ProducerSearch onPick={openProducer} />
        <Picker
          label="Select a country"
          value={country}
          options={countryNames}
          onChange={(c) => setView(c ? { level: "country", country: c } : { level: "world" })}
        />
        <Picker
          label="Select a region"
          value={region}
          options={regionOptions}
          onChange={(r) =>
            setView(
              r
                ? { level: "region", region: r }
                : country
                  ? { level: "country", country }
                  : { level: "world" },
            )
          }
        />
        <Picker
          label="Select a producer"
          value={picked}
          options={producerOptions}
          onChange={(p) => {
            if (p) void openProducer(p);
            else setView(country ? { level: "country", country } : { level: "world" });
          }}
        />
      </div>

      <div ref={box} className="pmap__canvas" />

      {view.level !== "world" && (
        <button
          type="button"
          className="pmap__globe"
          onClick={() => setView({ level: "world" })}
          aria-label="Back to the world view"
        >
          <Globe2 className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {!producer && (
        <div className="pmap__title" data-hidden={view.level !== "world"}>
          <h1>Explore our producers</h1>
        </div>
      )}
    </section>
  );
}
