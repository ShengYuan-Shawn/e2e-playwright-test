import { Page, Locator } from "@playwright/test";

export class CommonUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
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
