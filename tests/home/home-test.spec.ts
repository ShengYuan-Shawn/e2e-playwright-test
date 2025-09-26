import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/Base";

test.describe("Home Functionality", () => {
  testSetup("Verify Navigation Menu", async ({ loginPage, homePage }) => {
    await loginPage.enterValidUsername(process.env.VALID_USER as string);
    await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
    await loginPage.clickLoginButton();

    await homePage.verifyHomePage();

    await homePage.clickHamburgerMenu();
    await homePage.verifyNavigationList();
    await homePage.clickCloseButton();
  });
});
