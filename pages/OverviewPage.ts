import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverviewPage extends BasePage {
  readonly OVERVIEWTTITLE: Locator;
  readonly FINISHBUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.OVERVIEWTTITLE = page.getByText("Checkout: Overview", { exact: true });
    this.FINISHBUTTON = page.getByRole("button", { name: "Finish" });
  }

  async CurrentURL() {
    return await this.getCurrentURL();
  }
  async OverviewPageTitle(): Promise<string | null> {
    await this.OVERVIEWTTITLE.waitFor();
    return await this.OVERVIEWTTITLE.textContent();
  }
  async SubmitOrder() {
    await this.click(this.FINISHBUTTON);
  }
}
