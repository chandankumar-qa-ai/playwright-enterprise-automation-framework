import { test, expect } from "../../fixtures/pageFixture"
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

const weburl = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";
const product: string[] = ["Sauce Labs Bike Light"];

test("@login Login with Valid Credential", async ({ loginPage,inventoryPage }) => {
  await loginPage.launchApplication(weburl);
  await loginPage.login(username, password);
  expect(await inventoryPage.CurrentURL()).toContain("inventory");
  expect(await inventoryPage.InventoryPageTitle()).toBe("Products");
});
