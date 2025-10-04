import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/testSetup";

test.describe("Cart Page", () => {
  testSetup(
    "Verify Cart Page UI",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHomePageHeader();

      await cartPage.verifyEmptyCartPage();
    }
  );

  testSetup(
    "Verify Add Product To Cart & Check Cart List",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHomePageHeader();

      await homePage.verifyHomePageHeader();
      await cartPage.getProductDetails("BACKPACK");
      // await cartPage.addProductToCart("BACKPACK");
    }
  );
});
