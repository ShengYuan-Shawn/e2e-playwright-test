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
      await cartPage.verifyProductDetails([
        "BACKPACK",
        "BIKE_LIGHT",
        "BOLT_SHIRT",
        "FLEECE_JACKET",
        "ONESIE",
        "RED_SHIRT",
      ]);
    },
  );

  testSetup("Verify Cart Page UI", async ({ loginPage, cartPage }) => {
    await loginPage.enterValidUsername(process.env.VALID_USER as string);
    await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
    await loginPage.clickLoginButton();

    await cartPage.verifyEmptyCart();
  });

  testSetup(
    "Verify Add Single Product To Cart & Remove Product From Cart",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails(["BACKPACK"]);
      await cartPage.addProduct(["BACKPACK"]);
      await cartPage.navigateToCart();
      await cartPage.verifyCart();
      await cartPage.verifyCartItems(["BACKPACK"]);
      await cartPage.removeProduct(["BACKPACK"]);
      await cartPage.verifyEmptyCart();
    },
  );

  testSetup(
    "Verify Add Multiple Product To Cart & Remove Multiple Product From Cart",
    async ({ loginPage, homePage, cartPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails(["BACKPACK", "BIKE_LIGHT"]);
      await cartPage.addProduct(["BACKPACK", "BIKE_LIGHT"]);
      await cartPage.navigateToCart();
      await cartPage.verifyCart();
      await cartPage.verifyCartItems(["BACKPACK", "BIKE_LIGHT"]);
      await cartPage.removeProduct(["BACKPACK", "BIKE_LIGHT"]);
      await cartPage.verifyEmptyCart();
    },
  );

  testSetup(
    "Verify Add Single Product To Cart & Checkout",
    async ({ loginPage, homePage, cartPage, checkoutPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails(["BACKPACK"]);
      await cartPage.addProduct(["BACKPACK"]);
      await cartPage.navigateToCart();
      await cartPage.verifyCart();
      await cartPage.verifyCartItems(["BACKPACK"]);

      await checkoutPage.navigateToCheckout();
      await checkoutPage.verifyCheckoutForm();
      await checkoutPage.checkoutFormValidation();
      await checkoutPage.inputPersonalDetails();
      await checkoutPage.submitCheckoutForm();
      await checkoutPage.verifyCheckout();
      await checkoutPage.verifyAllCheckoutItems(["BACKPACK"]);
      await checkoutPage.verifyCheckoutOverview(["BACKPACK"]);

      await checkoutPage.clickFinish();
      await checkoutPage.verifyCheckoutComplete();
    },
  );

  testSetup(
    "Verify Multiple Product To Cart & Checkout",
    async ({ loginPage, homePage, cartPage, checkoutPage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();

      await cartPage.verifyProductDetails(["BACKPACK", "BOLT_SHIRT"]);
      await cartPage.addProduct(["BACKPACK", "BOLT_SHIRT"]);
      await cartPage.navigateToCart();
      await cartPage.verifyCart();
      await cartPage.verifyCartItems(["BACKPACK", "BOLT_SHIRT"]);

      await checkoutPage.navigateToCheckout();
      await checkoutPage.verifyCheckoutForm();
      await checkoutPage.checkoutFormValidation();
      await checkoutPage.inputPersonalDetails();
      await checkoutPage.submitCheckoutForm();
      await checkoutPage.verifyCheckout();
      await checkoutPage.verifyAllCheckoutItems(["BACKPACK", "BOLT_SHIRT"]);
      await checkoutPage.verifyCheckoutOverview(["BACKPACK", "BOLT_SHIRT"]);

      await checkoutPage.clickFinish();
      await checkoutPage.verifyCheckoutComplete();
    },
  );
});
