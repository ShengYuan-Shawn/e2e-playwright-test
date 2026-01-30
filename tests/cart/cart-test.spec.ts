import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/testSetup";

test.describe.serial("Cart Page", () => {
  testSetup(
    "Verify All Products",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();
      await cartPage.verifyProductDetails("BACKPACK");
      await cartPage.verifyProductDetails("BIKE_LIGHT");
      await cartPage.verifyProductDetails("BOLT_SHIRT");
      await cartPage.verifyProductDetails("FLEECE_JACKET");
      await cartPage.verifyProductDetails("ONESIE");
      await cartPage.verifyProductDetails("RED_SHIRT");

      await cartPage.verifyEmptyCart();
    },
  );

  testSetup(
    "Verify Cart Page UI",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await cartPage.verifyEmptyCart();
    },
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
      await cartPage.addProductToCart("BIKE_LIGHT");
      // await cartPage.navigateToCart();
      // await cartPage.verifyLatestItem("BACKPACK");
      // await cartPage.removeProductToCart("BACKPACK");
      // await cartPage.verifyEmptyCart();
    },
  );

  testSetup(
    "Verify Add Product To Cart & Checkout",
    async ({ loginPage, homePage, cartPage, checkoutPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails("BACKPACK");
      await cartPage.addProductToCart("BACKPACK");
      await cartPage.navigateToCart();
      await cartPage.verifyLatestItem("BACKPACK");

      await checkoutPage.navigateToCheckout();
      await checkoutPage.verifyCheckoutForm();
      await checkoutPage.checkoutFormValidation();
      await checkoutPage.inputPersonalDetails();
      await checkoutPage.submitCheckoutForm();
      await checkoutPage.verifyCheckoutOverview("BACKPACK");
      await checkoutPage.clickFinish();
      await checkoutPage.verifyCheckoutComplete();
    },
  );
});
