import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly INVENTORYTITLE: Locator;
  readonly SHOPPINGCARTBADGE: Locator;
  readonly CARTICON: Locator;

  constructor(page: Page) {
    super(page);
    this.INVENTORYTITLE = page.getByText("Products", { exact: true });
    this.SHOPPINGCARTBADGE = page.locator(".shopping_cart_badge");
    this.CARTICON = page.locator(".shopping_cart_link");
  }

  async CurrentURL() {
    return await this.getCurrentURL();
  }
  async InventoryPageTitle(): Promise<string | null> {
    return await this.INVENTORYTITLE.textContent();
  }

  async AddProduct(productName: string[]) {
    for (const name of productName) {
      await this.page
        .locator(".inventory_item_description")
        .filter({ hasText: name })
        .locator(".pricebar button")
        .click();
    }
  }

  async getCartBadgeCount(): Promise<string | null> {
    await this.SHOPPINGCARTBADGE.waitFor();
    return (await this.SHOPPINGCARTBADGE.textContent()) ?? "";
  }
  async gotoCart() {
    await this.SHOPPINGCARTBADGE.waitFor();
    await this.click(this.CARTICON);
  }
}
