import { test, expect } from "../../fixtures/pageFixture";
import { InventoryPage } from "../../pages/InventoryPage";


test("visual regression: inventory page layout", async ({ page, inventoryPage,}) => {
  await page.goto("/inventory.html");
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  expect(await inventoryPage.CurrentURL()).toContain("inventory");
  await test.expect(page).toHaveScreenshot("inventory-page.png", {  animations: 'disabled',maxDiffPixelRatio: 0.01,fullPage: true });
});
