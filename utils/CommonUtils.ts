import { Locator, Page } from "@playwright/test";

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(URL: string) {
    await this.page.goto(URL);
  }
}
