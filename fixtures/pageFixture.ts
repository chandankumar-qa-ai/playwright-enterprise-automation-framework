import { test as Base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { OverviewPage } from "../pages/OverviewPage";
import { CartPage } from "../pages/CartPage";

type PageFixture = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  overviewPage: OverviewPage;
  checkoutPage: CheckoutPage;
};

export const test = Base.extend<PageFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  overviewPage: async ({ page }, use) => {
    await use(new OverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});
export { expect } from "@playwright/test";
