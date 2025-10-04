import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/testSetup";

test.describe("Home Page", () => {
  testSetup("Verify Navigation Menu", async ({ loginPage, homePage }) => {
    await loginPage.enterValidUsername(process.env.VALID_USER as string);
    await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
    await loginPage.clickLoginButton();

    await homePage.verifyHome();
    await homePage.openMenu();
    await homePage.verifyNavigationList();
    await homePage.closeMenu();
  });

  testSetup(
    "Verify Product Filter Options",
    async ({ loginPage, homePage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();
      await homePage.verifyProductFilter();
    }
  );

  testSetup(
    "Verify Product Filter Based On Price",
    async ({ loginPage, homePage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();
      await homePage.selectFilterOption('lohi');
      await homePage.verifyProductListSequence('ascending');
      await homePage.selectFilterOption('hilo');
      await homePage.verifyProductListSequence('descending');
    }
  );

  testSetup("Verify Footer Content", async ({ loginPage, homePage }) => {
    await loginPage.enterValidUsername(process.env.VALID_USER as string);
    await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
    await loginPage.clickLoginButton();

    await homePage.verifyHome();
    await homePage.verifyFooter();
  });
});
