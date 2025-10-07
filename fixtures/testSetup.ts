import { test } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";

export interface TestFixtures {
  commonUtils: CommonUtils;
  loginPage: LoginPage;
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
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

  cartPage: async ({ page, commonUtils }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page, commonUtils }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

testSetup.afterEach(async ({ page, context }) => {
  await page.close();
  await context.close();
});
