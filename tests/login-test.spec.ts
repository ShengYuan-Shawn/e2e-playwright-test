import { test } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Functionality", () => {
  const baseURL = process.env.BASE_URL || "https://www.saucedemo.com/";

  test("Verify Login Page UI", async ({ page }) => {
    const commonUtils = new CommonUtils(page);
    await commonUtils.goTo(baseURL);

    const loginPage = new LoginPage(page);
    await loginPage.verifyLoginPageUI();
  });

  test("Verify Login With Invalid User", async ({ page }) => {
    const commonUtils = new CommonUtils(page);
    await commonUtils.goTo(baseURL);

    const loginPage = new LoginPage(page);
    await loginPage.loginInvalidUser();
  });

  // test("Verify Login With Valid User", async ({ page }) => {
  //   const commonUtils = new CommonUtils(page);
  //   await commonUtils.goTo(baseURL);

  //   const loginPage = new LoginPage(page);
  // });
});
