import fs from "fs";
import { chromium } from "@playwright/test";
import { ENV } from "../../config/env";

const STORAGE_STATE_PATH = "storageState.json";
const INVENTORY_PATH = "/inventory.html";

function getRequiredValue(name: string, value?: string): string {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

async function globalSetup() {
  const browser = await chromium.launch();
  const baseUrl = getRequiredValue("BASE_URL", ENV.BASE_URL);
  const username = getRequiredValue("SAUCE_USERNAME", ENV.USERNAME);
  const password = getRequiredValue("SAUCE_PASSWORD", ENV.PASSWORD);

  try {
    if (fs.existsSync(STORAGE_STATE_PATH)) {
      const storedContext = await browser.newContext({
        storageState: STORAGE_STATE_PATH,
      });
      const storedPage = await storedContext.newPage();

      await storedPage.goto(`${baseUrl}${INVENTORY_PATH}`, {
        waitUntil: "domcontentloaded",
      });

      if (storedPage.url().includes(INVENTORY_PATH)) {
        console.log("Session is still valid.");
        await storedContext.close();
        return;
      }

      console.log("Session expired. Re-logging.");
      await storedContext.close();
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.fill("#user-name", username);
    await page.fill("#password", password);
    await page.click("#login-button");
    await page.waitForURL(`**${INVENTORY_PATH}`);

    await context.storageState({
      path: STORAGE_STATE_PATH,
    });

    await context.close();
  } finally {
    await browser.close();
  }
}

export default globalSetup;
