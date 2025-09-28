import { Page } from "@playwright/test";

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(URL: string) {
    await this.page.goto(URL);
  }

  async captureScreenshot() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotName = `screenshots_${timestamp}`;
    await this.page.screenshot({
      path: `screenshots/${screenshotName}.png`,
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
