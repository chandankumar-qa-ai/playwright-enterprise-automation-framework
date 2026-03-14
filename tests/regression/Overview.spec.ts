import { test, expect } from "../../fixtures/pageFixture";




test("@regression Finish The Order", async ({ page,overviewPage,checkoutCompletePage }) => {
  await page.goto("/checkout-step-two.html")
  expect(await overviewPage.OverviewPageTitle()).toBe("Checkout: Overview");
  await overviewPage.SubmitOrder();
  expect(await checkoutCompletePage.CheckoutCompletePageTitle()).toBe("Checkout: Complete!");

});
