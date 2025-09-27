import { Locator, Page } from "@playwright/test";

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(URL: string) {
    await this.page.goto(URL);
  }

  async captureScreenshot() {
    await this.page.screenshot({
      path: "screenshots/fullpage_screenshot.png",
      fullPage: true,
    });
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollTo(0, scrollHeight);
    });
  }
}
