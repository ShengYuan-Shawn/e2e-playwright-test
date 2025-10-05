import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/testSetup";

test.describe("Cart Page", () => {
  testSetup(
    "Verify Cart Page UI",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyEmptyCart();
    }
  );

  testSetup(
    "Verify Add Product To Cart & Remove Product From Cart",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails("BACKPACK");
      await cartPage.addProductToCart("BACKPACK");
      await cartPage.verifyLatestItem("BACKPACK");

      await cartPage.goToHome();
      await cartPage.goToCart();

      await cartPage.removeItemFromCart("BACKPACK");
      await cartPage.verifyEmptyCart();
      await cartPage.goToHome();
    }
  );
});
