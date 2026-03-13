import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }
  async click(element: Locator) {
    await element.click();
  }
  async type(element: Locator, text: string) {
    await element.fill(text);
  }
  async waitForVisible(element: Locator) {
    await element.waitFor();
  }
  async getCurrentURL() {
    return this.page.url();
  }
}
