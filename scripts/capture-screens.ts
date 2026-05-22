import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.TRACKER_BASE_URL ?? "http://localhost:3000";
const EMAIL = process.env.TRACKER_ADMIN_EMAIL ?? "admin@tracker.local";
const PASSWORD = process.env.TRACKER_ADMIN_PASSWORD ?? "admin123";
const OUT_DIR = path.join(process.cwd(), "public", "screenshots");

const captures = [
  { route: "/dashboard", file: "dashboard.png" },
  { route: "/board", file: "kanban.png" },
  { route: "/sprint", file: "sprint.png" },
];

async function captureFirstTask(page: import("playwright").Page) {
  await page.goto(`${BASE}/tasks`, { waitUntil: "networkidle" });
  const firstLink = page.locator('a[href^="/tasks/"]').first();
  await firstLink.waitFor({ state: "visible", timeout: 5_000 });
  const href = await firstLink.getAttribute("href");
  if (!href) throw new Error("No task link found on /tasks page");
  await page.goto(`${BASE}${href}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT_DIR, "task-detail.png"), fullPage: false });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "tr-TR",
  });
  const page = await context.newPage();

  // login
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.fill('input[name="email"], input[type="email"]', EMAIL);
  await page.fill('input[name="password"], input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 10_000 });

  for (const c of captures) {
    console.log(`[capture] ${c.route} → ${c.file}`);
    await page.goto(`${BASE}${c.route}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(OUT_DIR, c.file), fullPage: false });
  }

  console.log("[capture] /tasks/[first] → task-detail.png");
  await captureFirstTask(page);

  await browser.close();
  console.log(`[capture] done — ${OUT_DIR}`);
}

main().catch((err) => {
  console.error("[capture] error:", err);
  process.exit(1);
});
