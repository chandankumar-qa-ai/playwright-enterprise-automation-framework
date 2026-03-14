import { test, expect } from "../../fixtures/pageFixture";

test("@regression Checkout the Product", async ({ page, checkoutPage,overviewPage }) => {
  await page.goto("/checkout-step-one.html");
  expect(await checkoutPage.CheckoutPageTitle()).toBe("Checkout: Your Information",);
  await checkoutPage.Continue("chandan", "kumar", "201305");
  expect(await overviewPage.OverviewPageTitle()).toBe("Checkout: Overview");
});
