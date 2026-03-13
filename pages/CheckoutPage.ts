import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly CHECKOUTTITLE: Locator;
  readonly CONTINUETBUTTON: Locator;
  readonly FIRSTNAME: Locator;
  readonly LASTTNAME: Locator;
  readonly ZIPCODE: Locator;

  constructor(page: Page) {
    super(page);
    this.CHECKOUTTITLE = page.getByText("Checkout: Your Information", {
      exact: true,
    });
    this.CONTINUETBUTTON = page.getByRole("button", { name: "Continue" });
    this.FIRSTNAME = page.getByPlaceholder("First Name", { exact: true });
    this.LASTTNAME = page.getByPlaceholder("Last Name", { exact: true });
    this.ZIPCODE = page.getByPlaceholder("Zip/Postal Code", { exact: true });
  }

  async CurrentURL() {
    return await this.getCurrentURL();
  }
  async CheckoutPageTitle(): Promise<string | null> {
    await this.CHECKOUTTITLE.waitFor();
    return await this.CHECKOUTTITLE.textContent();
  }
  async Continue(FirstName: string, LastName: string, ZIP: string) {
    await this.type(this.FIRSTNAME, FirstName);
    await this.type(this.LASTTNAME, LastName);
    await this.type(this.ZIPCODE, ZIP);
    await this.CONTINUETBUTTON.waitFor();
    await this.click(this.CONTINUETBUTTON);
  }
}
