import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly CARTTITLE: Locator;
  readonly CHECKOUTBUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.CARTTITLE = page.getByText("Your Cart", { exact: true });
    this.CHECKOUTBUTTON = page.getByText("Checkout", { exact: true });
  }

  async CurrentURL() {
    return await this.getCurrentURL();
  }
  async CartPageTitle(): Promise<string | null> {
    await this.CARTTITLE.waitFor();
    return await this.CARTTITLE.textContent();
  }
  async gotoCheckout() {
    await this.CHECKOUTBUTTON.waitFor();
    await this.click(this.CHECKOUTBUTTON);
  }
}
