import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  page: Page;
  readonly USERNAME: Locator;
  readonly PASSWORD: Locator;
  readonly LOGINBUTTON: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.USERNAME = page.locator("#user-name");
    this.PASSWORD = page.locator("#password");
    this.LOGINBUTTON = page.locator("#login-button");
  }

  async launchApplication(url: string) {
    await this.navigate(url);
  }

  async login(userid: string, password: string) {
    await this.type(this.USERNAME, userid);
    await this.type(this.PASSWORD, password);
    await this.click(this.LOGINBUTTON);
  }
}
