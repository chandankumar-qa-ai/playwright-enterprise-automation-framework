import { test, expect } from "../../fixtures/pageFixture";

const product: string[] = ["Sauce Labs Bike Light"];

test("@regression Add Product to the Cart", async ({ inventoryPage, cartPage, page }) => {
  await page.goto("/inventory.html");
  expect(await inventoryPage.CurrentURL()).toContain("inventory");
  expect(await inventoryPage.InventoryPageTitle()).toBe("Products");
  await inventoryPage.AddProduct(product);
  await inventoryPage.gotoCart();
  expect(await cartPage.CartPageTitle()).toBe("Your Cart");
});
