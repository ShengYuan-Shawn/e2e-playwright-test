import { test } from "@playwright/test";
import { CommonUtils } from "../../utils/commonUtils";
import { HomePage } from "../../pages/HomePage";

test.describe("Home Functionality", () => {
  const baseURL = process.env.BASE_URL || "https://www.saucedemo.com";

  let commonUtils: CommonUtils;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    commonUtils = new CommonUtils(page);
    homePage = new HomePage(page);
    await commonUtils.goTo(baseURL);
  });
  
});
