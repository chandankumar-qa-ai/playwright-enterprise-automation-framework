import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  readonly CHECKOUTCOMPLETETITLE: Locator;
  readonly SUCCESSMSG: Locator;

  constructor(page: Page) {
    super(page);
    this.CHECKOUTCOMPLETETITLE = page.getByText("Checkout: Complete!", { exact: true });
    this.SUCCESSMSG = page.getByText("Thank you for your order!", { exact:true });
  }

  async CurrentURL() {
    return await this.getCurrentURL();
  }
  async CheckoutCompletePageTitle(): Promise<string | null> {
    await this.CHECKOUTCOMPLETETITLE.waitFor();
    return await this.CHECKOUTCOMPLETETITLE.textContent();
  }
  async SuccessMessage() {
    return await this.SUCCESSMSG.textContent()
  }
}
