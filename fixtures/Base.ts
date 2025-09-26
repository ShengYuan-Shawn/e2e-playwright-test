import { test } from "@playwright/test";
import { CommonUtils } from "../utils/CommonUtils";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

export interface TestFixtures {
  commonUtils: CommonUtils;
  loginPage: LoginPage;
  homePage: HomePage;
}

export const baseURL = process.env.BASE_URL || "https://www.saucedemo.com";

export const testSetup = test.extend<TestFixtures>({
  commonUtils: async ({ page }, use) => {
    const commonUtils = new CommonUtils(page);
    await commonUtils.goTo(baseURL);
    await page.context().clearCookies();
    await use(commonUtils);
  },

  loginPage: async ({ page, commonUtils }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page, commonUtils }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

testSetup.afterEach(async ({ page, context }) => {
  await page.close();
  await context.close();
});
