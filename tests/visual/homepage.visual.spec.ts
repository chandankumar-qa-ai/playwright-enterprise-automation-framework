import { test, expect } from "../../fixtures/pageFixture"
import { InventoryPage } from "../../pages/InventoryPage";
import dotenv from 'dotenv'
import { ENV } from "../../config/env"

const validUser = { username: 'standard_user', password: 'secret_sauce' };

test('visual regression: inventory page layout', async ({ page,inventoryPage }) => {
  await page.goto("/inventory.html");
  expect(await inventoryPage.CurrentURL()).toContain("inventory");
  await test.expect(page).toHaveScreenshot('inventory-page.png', { fullPage: true });
});







