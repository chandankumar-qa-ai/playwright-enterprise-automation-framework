import { test, expect } from "../../fixtures/pageFixture"
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import dotenv from 'dotenv'
import { ENV } from "../../config/env"


test("@smoke Login with Valid Credential", async ({ loginPage,inventoryPage }) => {
  await loginPage.launchApplication(ENV.BASE_URL!);
  await loginPage.login(ENV.USERNAME!, ENV.PASSWORD!);
  expect(await inventoryPage.CurrentURL()).toContain("inventory");
  expect(await inventoryPage.InventoryPageTitle()).toBe("Products");
});
