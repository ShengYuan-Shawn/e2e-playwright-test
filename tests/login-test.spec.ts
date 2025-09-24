import { test } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test.describe("Login Functionality", () => {
  const baseURL = process.env.BASE_URL || "https://www.saucedemo.com/";

  let commonUtils: CommonUtils;
  let loginPage: LoginPage;
  let homePage: HomePage

  // Setup that runs before each test
  test.beforeEach(async ({ page }) => {
    commonUtils = new CommonUtils(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await commonUtils.goTo(baseURL);
  });

  test("Verify Login Page UI", async () => {
    await loginPage.verifyLoginPage();
  });

  test("Verify Login With Invalid Username & Password", async () => {
    // Validate Login With Name Only
    await loginPage.clearUsernameInput();
    await loginPage.inputRandomUsername();
    await loginPage.loginUser();
    await loginPage.errorMessageValidation("password");

    await loginPage.clearUsernameInput();

    // Validate Login With Password Only
    await loginPage.clearPasswordInput();
    await loginPage.inputRandomPassword();
    await loginPage.loginUser();
    await loginPage.errorMessageValidation("username");

    await loginPage.clearPasswordInput();

    // Validate Login With Invalid Username & Password
    await loginPage.inputRandomUsername();
    await loginPage.inputRandomPassword();
    await loginPage.loginUser();
    await loginPage.errorMessageValidation();
  });

  test("Verify Login With Locked Username & Password", async () => {
    await loginPage.inputValidUsername(process.env.LOCKED_USER);
    await loginPage.inputValidPassword(process.env.VALID_PASSWORD);
    await loginPage.loginUser();
    await loginPage.errorMessageValidation("locked");
  });

  test("Verify Login With Valid Username & Password", async () => {
    await loginPage.inputValidUsername(process.env.VALID_USER);
    await loginPage.inputValidPassword(process.env.VALID_PASSWORD);
    await loginPage.loginUser();

    await homePage.verifyHomePage();
  });
});
