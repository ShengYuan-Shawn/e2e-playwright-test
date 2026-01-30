import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { CartPage } from "./products.page";
import { CHECKOUT_SELECTORS } from "../selectors";
import { ERROR_MESSAGES } from "../test-data/app";
// import { PRODUCTS, ProductKey } from "../test-data/index";
// import { ERROR_MESSAGES } from "../test-data/index";
import { faker } from "@faker-js/faker";

export class CheckoutPage extends BasePage {
  private cartPage: CartPage;

  readonly checkoutForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly formErrorMessage: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly paymentInfoTitle: Locator;
  readonly paymentValueText: Locator;
  readonly shippingInfoTitle: Locator;
  readonly shippingValueText: Locator;
  readonly priceInfoTitle: Locator;
  readonly priceSubtotalText: Locator;
  readonly priceTaxText: Locator;
  readonly priceTotalText: Locator;
  readonly finishButton: Locator;
  readonly greenCheckImage: Locator;
  readonly thankYouTitle: Locator;
  readonly orderDispatchedText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartPage = new CartPage(page);

    const Checkout = CHECKOUT_SELECTORS;

    this.checkoutForm = page.locator(Checkout.FORM);
    this.firstNameInput = page.locator(Checkout.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(Checkout.LAST_NAME_INPUT);
    this.postalCodeInput = page.locator(Checkout.POSTAL_CODE_INPUT);
    this.formErrorMessage = page.locator(Checkout.ERROR_MESSAGE);
    this.cancelButton = page.locator(Checkout.CANCEL_BUTTON);
    this.continueButton = page.locator(Checkout.CONTINUE_BUTTON);
    this.paymentInfoTitle = page.locator(Checkout.PAYMENT_INFO);
    this.paymentValueText = page.locator(Checkout.PAYMENT_VALUE);
    this.shippingInfoTitle = page.locator(Checkout.SHIPPING_INFO);
    this.shippingValueText = page.locator(Checkout.SHIPPING_VALUE);
    this.priceInfoTitle = page.locator(Checkout.PRICE_INFO);
    this.priceSubtotalText = page.locator(Checkout.PRICE_SUBTOTAL);
    this.priceTaxText = page.locator(Checkout.PRICE_TAX);
    this.priceTotalText = page.locator(Checkout.PRICE_TOTAL);
    this.finishButton = page.locator(Checkout.FINISH_BUTTON);
    this.greenCheckImage = page.locator(Checkout.SUCCESS_IMAGE);
    this.thankYouTitle = page.locator(Checkout.SUCCESS_TITLE);
    this.orderDispatchedText = page.locator(Checkout.SUCCESS_MESSAGE);
    this.backHomeButton = page.locator(Checkout.BACK_HOME_BUTTON);
  }

  async navigateToCheckout() {
    await expect(this.cartPage.checkoutButton).toBeVisible();
    await this.cartPage.checkoutButton.click();
  }

  async verifyCheckoutForm() {
    await expect(this.titleText).toBeVisible();
    await expect(this.titleText).toContainText("Checkout: Your Information");

    await expect(this.checkoutForm).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();

    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toContainText("Cancel");

    await expect(this.continueButton).toBeVisible();
    await expect(this.continueButton).toContainText("Continue");
  }

  async checkoutFormValidation() {
    // Submit Form With Empty Details
    await this.verifyCheckoutFormError(
      ERROR_MESSAGES.CHECKOUT.FIRSTNAME_REQUIRED
    );

    // Submit Form With Missing First Name
    await this.inputLastName();
    await this.inputPostalCode();
    await this.verifyCheckoutFormError(
      ERROR_MESSAGES.CHECKOUT.FIRSTNAME_REQUIRED,
    );

    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();

    // Submit Form With Missing Last Name
    await this.inputFirstName();
    await this.inputPostalCode();
    await this.verifyCheckoutFormError(
      ERROR_MESSAGES.CHECKOUT.LASTNAME_REQUIRED,
    );

    await this.firstNameInput.clear();
    await this.postalCodeInput.clear();

    // Submit Form With Missing Postal Code
    await this.inputFirstName();
    await this.inputLastName();
    await this.verifyCheckoutFormError(
      ERROR_MESSAGES.CHECKOUT.LASTNAME_REQUIRED,
    );

    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
  }

  async inputPersonalDetails() {
    await this.inputFirstName();
    await this.inputLastName();
    await this.inputPostalCode();
  }

  async verifyCheckoutOverview(productKey: ProductKey) {
    const productDetails = PRODUCTS[productKey];

    const cartQuantityText = this.cartPage.cartQuantityText;
    const cartDescText = this.cartPage.cartDescText;

    // Frame Product Product Card, Name, Desc, Price xPath
    const overviewProductCard = this.page.locator("//div[@class='cart_item']");
    const overviewProductQuantity = this.page.locator(
      "//div[@class='cart_item']/div[@class='cart_quantity']",
    );
    const overviewProductName = this.page.locator(
      "//div[@class='cart_item_label']//div[@class='inventory_item_name']",
    );
    const overviewProductDesc = this.page.locator(
      "//div[@class='cart_item_label']/div[@class='inventory_item_desc']",
    );
    const overviewProductPrice = this.page.locator(
      "//div[@class='cart_item_label']/div[@class='item_pricebar']",
    );

    await expect(this.titleText).toBeVisible();
    await expect(this.titleText).toContainText("Checkout: Overview");

    await expect(cartQuantityText).toBeVisible();
    await expect(cartQuantityText).toContainText("QTY");

    await expect(cartDescText).toBeVisible();
    await expect(cartDescText).toContainText("Description");

    // Verify Product Information
    await expect(overviewProductCard).toBeVisible();

    await expect(overviewProductQuantity).toBeVisible();
    await expect(overviewProductQuantity).toHaveText("1");

    await expect(overviewProductName).toBeVisible();
    await expect(overviewProductName).toContainText(productDetails.NAME);

    await expect(overviewProductDesc).toBeVisible();
    await expect(overviewProductDesc).toContainText(productDetails.DESC);

    await expect(overviewProductPrice).toBeVisible();
    await expect(overviewProductPrice).toContainText(productDetails.PRICE);

    // Verify Payment Information
    await expect(this.paymentInfoTitle).toBeVisible();
    await expect(this.paymentInfoTitle).toContainText("Payment Information");
    await expect(this.paymentValueText).toBeVisible();
    await expect(this.paymentValueText).toContainText(/SauceCard\s+#\d+/);

    // Verify Shipping Information
    await expect(this.shippingInfoTitle).toBeVisible();
    await expect(this.shippingInfoTitle).toContainText("Shipping Information");
    await expect(this.shippingValueText).toBeVisible();
    await expect(this.shippingValueText).toContainText(
      "Free Pony Express Delivery!",
    );

    // Verify Price Total Information
    await expect(this.priceInfoTitle).toBeVisible();
    await expect(this.priceInfoTitle).toContainText("Price Total");

    await expect(this.priceSubtotalText).toBeVisible();
    await expect(this.priceSubtotalText).toContainText("Item total: $");

    await expect(this.priceTaxText).toBeVisible();
    await expect(this.priceTaxText).toContainText("Tax: $");

    // Handle Total Price Calculation
    const productSubtotal = parseFloat(
      (await this.commonUtils.getText(this.priceSubtotalText)).replace(
        /[^0-9.]/g,
        "",
      ),
    );
    const productTax = parseFloat(
      (await this.commonUtils.getText(this.priceTaxText)).replace(
        /[^0-9.]/g,
        "",
      ),
    );
    const productTotal = (productSubtotal + productTax).toFixed(2);

    await expect(this.priceTotalText).toBeVisible();
    await expect(this.priceTotalText).toContainText("Total: $" + productTotal);
  }

  async verifyCheckoutComplete() {
    await expect(this.greenCheckImage).toBeVisible();

    await expect(this.thankYouTitle).toBeVisible();
    await expect(this.thankYouTitle).toContainText("Thank you for your order!");

    await expect(this.orderDispatchedText).toBeVisible();
    await expect(this.orderDispatchedText).toContainText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );

    await expect(this.backHomeButton).toBeVisible();
  }

  async submitCheckoutForm() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
  }

  async clickFinish() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
  }

  async clickBackHome() {
    await expect(this.backHomeButton).toBeVisible();
    await this.backHomeButton.click();
  }

  private async inputFirstName() {
    const firstName = faker.person.firstName();

    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(firstName);
  }

  private async inputLastName() {
    const lastName = faker.person.lastName();

    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(lastName);
  }

  private async inputPostalCode() {
    const postalCode = faker.location.zipCode();

    await expect(this.postalCodeInput).toBeVisible();
    await this.postalCodeInput.fill(postalCode);
  }

  private async verifyCheckoutFormError(expectedError: string) {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();

    await expect(this.formErrorMessage).toBeVisible();
    await expect(this.formErrorMessage).toContainText(expectedError);
  }
}
