import { test, expect } from "../../fixtures/pageFixture";




test("@regression Checkout Complete Page", async ({ page,checkoutCompletePage }) => {
  await page.goto("/checkout-complete.html")
  expect(await checkoutCompletePage.CheckoutCompletePageTitle()).toBe("Checkout: Complete!");
  expect(await checkoutCompletePage.SuccessMessage()).toBe("Thank you for your order!");
});
