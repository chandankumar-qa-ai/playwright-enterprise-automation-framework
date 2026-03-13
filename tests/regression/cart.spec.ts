import { test, expect } from "../../fixtures/pageFixture";



test("@regression Cart Page Validation", async ({ cartPage,checkoutPage,page }) => {
  await page.goto('/cart.html')
  expect(await cartPage.CartPageTitle()).toBe("Your Cart");
  await cartPage.gotoCheckout()
  expect(await checkoutPage.CheckoutPageTitle()).toBe("Checkout: Your Information");
});
