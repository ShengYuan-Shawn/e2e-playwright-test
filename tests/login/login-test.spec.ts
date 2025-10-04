import { test } from "@playwright/test";
import { testSetup } from "../../fixtures/testSetup";

test.describe("Login Page", () => {
  testSetup("Verify Login Page UI", async ({ loginPage }) => {
    await loginPage.verifyLoginPage();
  });

  testSetup(
    "Verify Login With Invalid Username & Password",
    async ({ loginPage }) => {
      // Validate Login With Name Only
      await loginPage.clearUsernameField();
      await loginPage.enterRandomUsername();
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("PASSWORD_REQUIRED");

      await loginPage.clearUsernameField();

      // Validate Login With Password Only
      await loginPage.clearPasswordField();
      await loginPage.enterRandomPassword();
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("USERNAME_REQUIRED");

      await loginPage.clearPasswordField();

      // Validate Login With Invalid Username & Password
      await loginPage.enterRandomUsername();
      await loginPage.enterRandomPassword();
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("INVALID_CREDENTIALS");
    }
  );

  testSetup(
    "Verify Login With Locked Username & Password",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(process.env.LOCKED_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await loginPage.verifyErrorMessage("USER_LOCKED");
    }
  );

  testSetup(
    "Verify Login With Valid Username & Password",
    async ({ loginPage, homePage }) => {
      await loginPage.enterValidUsername(process.env.VALID_USER as string);
      await loginPage.enterValidPassword(process.env.VALID_PASSWORD as string);
      await loginPage.clickLoginButton();

      await homePage.verifyHome();
    }
  );
});
