// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";

const environment = process.env.ENV || "qa";
console.log("env", environment);

// dotenv.config();

dotenv.config({
  path: `.env.${environment}`,
});

//Update environment in allure-report
const allureResults = "allure-results";
fs.mkdirSync(allureResults, { recursive: true });
fs.writeFileSync(
  `${allureResults}/environment.properties`,
  `Environment=${environment.toUpperCase()}
Browser=${process.env.BROWSER}
Application_URL=${process.env.APP_BASE_URL}
`,
);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: process.env.PARALLEL === "true",
  retries: Number(process.env.RETRY) || 1,
  workers: Number(process.env.WORKER) || 1,
  timeout: Number(process.env.TEST_TIMEOUT) || 30 * 1000,
  globalTimeout: Number(process.env.GLOBAL_TIMEOUT) || 3_600_000,
  expect: {
    timeout: Number(process.env.EXPECT_TIMEOUT) || 5000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright-report", open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
    ["json", { outputFile: "reports/results.json" }],
    ["junit", { outputFile: "reports/results.xml" }],
    ["allure-playwright", { outputFolder: "reports/allure-results" }],
  ],
  outputDir: "reports/test-results",
  use: {
    headless: process.env.HEADLESS === "true",
    screenshot: "on",
    video: "on",
    trace: "on",
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 10 * 1000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30 * 1000,
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
