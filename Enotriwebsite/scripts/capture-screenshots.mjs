import { mkdir } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://127.0.0.1:8080";
const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["producers", "/producers/"],
  ["sustainability", "/sustainability"],
  ["wines", "/wines"],
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 1 },
];

async function isServerReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1500) });
    return response.ok;
  } catch {
    return false;
  }
}

let server;
let serverOutput = "";

if (!(await isServerReady())) {
  server = spawn("bun", ["run", "dev", "--", "--host", "127.0.0.1"], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.setEncoding("utf8").on("data", (chunk) => {
    serverOutput += chunk;
    process.stdout.write(chunk);
  });
  server.stderr.setEncoding("utf8").on("data", (chunk) => {
    serverOutput += chunk;
    process.stderr.write(chunk);
  });

  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Vite exited before it was ready.\n${serverOutput}`);
    }
    if (await isServerReady()) {
      ready = true;
      break;
    }
    await delay(500);
  }
  if (!ready) {
    server.kill("SIGTERM");
    throw new Error(`Timed out waiting for Vite at ${baseUrl}.\n${serverOutput}`);
  }
}

let browser;
try {
  browser = await puppeteer.launch({ headless: true });
  for (const viewport of viewports) {
    const page = await browser.newPage(viewport);
    for (const [name, route] of routes) {
      const response = await page.goto(new URL(route, baseUrl).href, {
        waitUntil: "networkidle2",
        timeout: 60_000,
      });
      if (!response?.ok()) {
        throw new Error(`Failed to load ${route}: HTTP ${response?.status() ?? "no response"}`);
      }
      await page.evaluate(() => document.fonts.ready);
      const directory = path.join(process.cwd(), "screenshots", "puppeteer", viewport.name);
      await mkdir(directory, { recursive: true });
      const filePath = path.join(directory, `${name}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved ${filePath}`);
    }
    await page.close();
  }
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    server.kill("SIGTERM");
  }
}
