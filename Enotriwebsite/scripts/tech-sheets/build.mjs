// Builds the Enotri wine info sheets (two-page PDFs) into public/docs/.
// Layout is a clone of the Château de la Grave "Les Choses En Rosé" sheet.
//
//   node scripts/tech-sheets/build.mjs            # every sheet
//   node scripts/tech-sheets/build.mjs pasetti    # only files whose name contains "pasetti"
//
// Needs Google Chrome installed (it prints the HTML to PDF headlessly).

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { sheets } from "./wines.mjs";

const ROOT = resolve(import.meta.dirname, "../..");
const OUT = join(ROOT, "public/docs");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const PLUM = "#76546a";
// Default accent (title bar, Vibe and Sales Facts boxes); a sheet can set its own `accent`.
const PERIWINKLE = "#8faaee";
const OLIVE = "#918a64";
const STRIPE = "#d6d2c2";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const dir = mkdtempSync(join(tmpdir(), "enotri-sheets-"));

// Chrome embeds WebP in PDFs uncompressed, so hand it JPEG (photos) or PNG (cut-outs).
const converted = new Map();
const file = (p) => {
  let src = join(ROOT, p);
  if (src.endsWith(".webp")) {
    if (!converted.has(src)) {
      const alpha = execFileSync("sips", ["-g", "hasAlpha", src]).toString().includes("yes");
      const out = join(dir, `${converted.size}.${alpha ? "png" : "jpg"}`);
      execFileSync("sips", ["-s", "format", alpha ? "png" : "jpeg", "-s", "formatOptions", "82", src, "--out", out], { stdio: "ignore" });
      converted.set(src, out);
    }
    src = converted.get(src);
  }
  return pathToFileURL(src).href;
};

// The Enotri wordmark, recoloured white for the plum block.
const logo = readFileSync(join(ROOT, "public/enotri-logo-master.svg"), "utf8")
  .replace(/<\?xml[^>]*>/, "")
  .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#ffffff"')
  .replace(/<title[\s\S]*?<\/desc>/, "");

const css = `
:root { --accent: ${PERIWINKLE}; }
@page { size: letter; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; }
body { font-family: "Times New Roman", Times, serif; color: #222; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 952px; height: 1232px; overflow: hidden; zoom: 0.857; break-after: page; }
.page:last-child { break-after: auto; }
.bar { position: absolute; left: 0; right: 0; top: 163px; height: 62px; background: var(--accent); }
.bar h1 { position: absolute; left: 325px; right: 24px; top: 50%; transform: translateY(-50%); font-weight: 400; font-size: 27px; color: #fff; line-height: 1.1; }
.logo { position: absolute; left: 55px; top: 0; width: 238px; height: 225px; background: ${PLUM}; display: grid; place-items: center; }
.logo svg { width: 180px; height: auto; margin-top: 30px; }
.foot { position: absolute; left: 55px; right: 55px; bottom: 0; height: 77px; background: ${PLUM}; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 42px; font-size: 25px; }
.foot span:last-child { font-size: 21px; }

/* page 1 */
.bv { position: absolute; left: 307px; right: 60px; top: 50px; }
.bv h2 { font-weight: 400; font-size: 24px; color: #111; }
.bv p { margin-top: 2px; font-size: 19.5px; line-height: 1.32; font-weight: 700; font-style: italic; color: ${PLUM}; }
.land { position: absolute; left: 0; right: 0; top: 231px; height: 370px; object-fit: cover; width: 100%; }
.story { position: absolute; left: 55px; width: 492px; top: 618px; font-size: 17px; line-height: 1.66; }
.story p + p { margin-top: 10px; }
.story p:first-child::first-letter { float: left; font-size: 40px; line-height: 0.9; padding: 3px 3px 0 0; font-weight: 700; color: ${PLUM}; }
.family { position: absolute; left: 578px; top: 565px; width: 263px; height: 263px; background: #fff; padding: 6px; border: 1px solid #ccc; }
.family img { width: 100%; height: 100%; object-fit: cover; }
.vibe { position: absolute; left: 578px; top: 880px; width: 263px; min-height: 167px; background: var(--accent); color: #fff; text-align: center; padding: 12px 14px; font-size: 27px; line-height: 1.25; display: flex; flex-direction: column; justify-content: center; }
.vibe b { font-style: italic; }

/* page 2 */
.bottle { position: absolute; left: 92px; top: 262px; width: 190px; height: 520px; object-fit: contain; object-position: center top; }
.specs { position: absolute; left: 354px; width: 536px; top: 291px; border-collapse: collapse; font-size: 14px; }
.specs caption { background: ${OLIVE}; color: #fff; text-align: left; font-size: 25px; padding: 9px 24px; caption-side: top; }
.specs th, .specs td { text-align: left; vertical-align: top; padding: 4px 12px; line-height: 1.3; }
.specs th { width: 140px; font-weight: 400; color: #333; }
.specs tr:nth-child(odd) { background: ${STRIPE}; }
.vit { position: absolute; left: 358px; width: 530px; }
.vit h2 { font-weight: 400; font-size: 29px; color: ${PLUM}; letter-spacing: 0.01em; }
.vit p { margin-top: 8px; font-size: 15.5px; line-height: 1.5; }
.facts { position: absolute; left: 56px; width: 282px; background: var(--accent); color: #fff; padding: 12px 24px 18px; }
.facts h2 { font-weight: 400; font-size: 25px; }
.facts li { list-style: none; font-size: 16px; line-height: 1.3; font-weight: 700; font-style: italic; margin-top: 4px; }
.facts li::before { content: "• "; }
`;

function render(s) {
  const title = `<h1>${esc(s.name)}</h1>`;
  const specs = s.specs.filter(([, v]) => v);
  const skuLine = s.sku ? ` SKU# ${esc(s.sku)}` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(s.name)}: wine info sheet</title><style>${css}${s.accent ? `:root { --accent: ${s.accent}; }` : ""}</style></head><body>
<section class="page">
  <div class="bar">${title}</div>
  <div class="logo">${logo}</div>
  <div class="bv"><h2>Comments of a Bon Vivant:</h2><p>${esc(s.bonVivant)}</p></div>
  <img class="land" src="${file(s.photos.landscape)}" alt="">
  <div class="story">${s.story.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
  <div class="family"><img src="${file(s.photos.family)}" alt="" style="object-position: ${s.photos.familyPosition ?? "center"}"></div>
  <div class="vibe"><div>Vibe: <b>${esc(s.vibe)}</b></div><div>Emotions/Occasions:</div>${s.occasions.map((o) => `<div><b>${esc(o)}</b></div>`).join("")}</div>
  <div class="foot"><span>Roots Matter</span><span>${esc(s.name)}${skuLine}</span></div>
</section>
<section class="page">
  <div class="bar">${title}</div>
  <div class="logo">${logo}</div>
  <img class="bottle" src="${file(s.bottle)}" alt="">
  <table class="specs" id="specs"><caption>${s.sku ? `SKU: ${esc(s.sku)}` : "Technical data"}</caption>
    ${specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}
  </table>
  <div class="vit" id="vit"><h2>VITICULTURE</h2>${s.viticulture.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
  <div class="facts" id="facts"><h2>SALES FACTS:</h2><ul>${s.salesFacts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
  <div class="foot"><span>Roots Matter</span><span>rallings@enotri.ca|780.906.7531</span></div>
</section>
<script>
  // Stack Viticulture under the spec table, and pin Sales Facts to sit above the footer.
  const t = document.getElementById("specs").getBoundingClientRect();
  const z = 0.857;
  document.getElementById("vit").style.top = (t.bottom / z - 1232 + 30) + "px";
  const f = document.getElementById("facts");
  f.style.top = Math.max(840, 1232 - 77 - 28 - f.offsetHeight) + "px";
</script>
</body></html>`;
}

const only = process.argv[2];
for (const s of sheets.filter((x) => !only || x.file.includes(only))) {
  const html = join(dir, `${s.file}.html`);
  writeFileSync(html, render(s));
  const pdf = join(OUT, `${s.file}.pdf`);
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--allow-file-access-from-files",
    "--virtual-time-budget=4000",
    `--print-to-pdf=${pdf}`,
    pathToFileURL(html).href,
  ], { stdio: "ignore" });
  console.log(`built ${pdf.replace(ROOT + "/", "")}  (preview: ${html})`);
}
