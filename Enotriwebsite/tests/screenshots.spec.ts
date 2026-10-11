import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const routes = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "producers", path: "/producers/" },
  { name: "sustainability", path: "/sustainability" },
  { name: "wines", path: "/wines" },
  { name: "grave", path: "/producers/chateau-de-la-grave" },
];

test.describe("public page screenshots", () => {
  for (const route of routes) {
    test(route.name, async ({ page }, testInfo) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("body")).toBeVisible();

      if (route.path === "/") {
        await expect(
          page.getByRole("heading", { level: 1, name: /Good wine has a sense of place/ }),
        ).toBeVisible();
        await page.evaluate(() =>
          document.querySelectorAll("img").forEach((image) => (image.loading = "eager")),
        );
        await expect
          .poll(
            () =>
              page.evaluate(() =>
                [...document.querySelectorAll("img")]
                  .filter((image) => image.getBoundingClientRect().top < window.innerHeight)
                  .every((image) => image.complete && image.naturalWidth > 0),
              ),
            { timeout: 20000 },
          )
          .toBe(true);
      }

      const screenshotDirectory = path.join(process.cwd(), "screenshots", testInfo.project.name);
      await mkdir(screenshotDirectory, { recursive: true });
      await page.screenshot({
        path: path.join(screenshotDirectory, `${route.name}.png`),
        fullPage: true,
      });
    });
  }
});
