import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { CartPage } from "./products.page";
import {
  CHECKOUT_SELECTORS,
  PRODUCT_IDS,
  CheckoutSelectors,
} from "../selectors";
import { PRODUCTS } from "../test-data/domain/products";
import { ERROR_MESSAGES } from "../test-data/app";
import { faker } from "@faker-js/faker";

export class CheckoutPage extends BasePage {
  private cartPage: CartPage;

  readonly checkoutForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly errorMessage: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly paymentInfo: Locator;
  readonly paymentValue: Locator;
  readonly shippingInfo: Locator;
  readonly shippingValue: Locator;
  readonly priceInfo: Locator;
  readonly priceSubtotal: Locator;
  readonly priceTax: Locator;
  readonly priceTotal: Locator;
  readonly finishButton: Locator;
  readonly successImage: Locator;
  readonly successTitle: Locator;
  readonly sucessMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartPage = new CartPage(page);

    const Checkout = CHECKOUT_SELECTORS;

    this.checkoutForm = page.locator(Checkout.FORM);
    this.firstNameInput = page.locator(Checkout.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(Checkout.LAST_NAME_INPUT);
    this.postalCodeInput = page.locator(Checkout.POSTAL_CODE_INPUT);
    this.errorMessage = page.locator(Checkout.ERROR_MESSAGE);
    this.cancelButton = page.locator(Checkout.CANCEL_BUTTON);
    this.continueButton = page.locator(Checkout.CONTINUE_BUTTON);
    this.paymentInfo = page.locator(Checkout.PAYMENT_INFO);
    this.paymentValue = page.locator(Checkout.PAYMENT_VALUE);
    this.shippingInfo = page.locator(Checkout.SHIPPING_INFO);
    this.shippingValue = page.locator(Checkout.SHIPPING_VALUE);
    this.priceInfo = page.locator(Checkout.PRICE_INFO);
    this.priceSubtotal = page.locator(Checkout.PRICE_SUBTOTAL);
    this.priceTax = page.locator(Checkout.PRICE_TAX);
    this.priceTotal = page.locator(Checkout.PRICE_TOTAL);
    this.finishButton = page.locator(Checkout.FINISH_BUTTON);
    this.successImage = page.locator(Checkout.SUCCESS_IMAGE);
    this.successTitle = page.locator(Checkout.SUCCESS_TITLE);
    this.sucessMessage = page.locator(Checkout.SUCCESS_MESSAGE);
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
      ERROR_MESSAGES.CHECKOUT.FIRSTNAME_REQUIRED,
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
      ERROR_MESSAGES.CHECKOUT.POSTALCODE_REQUIRED,
    );

    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
  }

  async inputPersonalDetails() {
    await this.inputFirstName();
    await this.inputLastName();
    await this.inputPostalCode();
  }

  async verifyCheckout() {
    await expect(this.titleText).toBeVisible();
    await expect(this.titleText).toContainText("Checkout: Overview");

    await expect(this.cartPage.cartQuantityText).toBeVisible();
    await expect(this.cartPage.cartQuantityText).toContainText("QTY");

    await expect(this.cartPage.cartDescText).toBeVisible();
    await expect(this.cartPage.cartDescText).toContainText("Description");
  }

  async verifyAllCheckoutItems(expectedProducts: (keyof typeof PRODUCT_IDS)[]) {
    const selectors = CheckoutSelectors.getSelectors();

    const cards = this.page.locator(selectors.card); // Return locators
    const count = await cards.count();

    expect(count).toBe(expectedProducts.length);
    console.log(`Checkout has ${count} items`);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card).toBeVisible();

      const productName = await this.commonUtils.getText(
        card.locator(selectors.name),
      );
      const productPrice = await this.commonUtils.getText(
        card.locator(selectors.price),
      );
      const productQuantity = await this.commonUtils.getText(
        card.locator(selectors.quantity),
      );

      console.log(
        `Item ${i + 1}: ${productName} - ${productPrice} (Qty: ${productQuantity})`,
      );

      const expectedProduct = expectedProducts[i];
      const productData = PRODUCTS[expectedProduct];

      await expect(card.locator(selectors.name)).toContainText(
        productData.name,
      );
      await expect(card.locator(selectors.price)).toContainText(
        `$${productData.price}`,
      );
      await expect(card.locator(selectors.description)).toContainText(
        productData.description,
      );
    }
  }

  async verifyCheckoutOverview(expectedProducts: (keyof typeof PRODUCT_IDS)[]) {
    // Verify Payment Information
    await expect(this.paymentInfo).toBeVisible();
    await expect(this.paymentInfo).toContainText("Payment Information");
    await expect(this.paymentValue).toBeVisible();
    await expect(this.paymentValue).toContainText(/SauceCard\s+#\d+/);

    // Verify Shipping Information
    await expect(this.shippingInfo).toBeVisible();
    await expect(this.shippingInfo).toContainText("Shipping Information");
    await expect(this.shippingValue).toBeVisible();
    await expect(this.shippingValue).toContainText(
      "Free Pony Express Delivery!",
    );

    // Verify Price Total Information
    await expect(this.priceInfo).toBeVisible();
    await expect(this.priceInfo).toContainText("Price Total");

    await expect(this.priceSubtotal).toBeVisible();
    await expect(this.priceSubtotal).toContainText("Item total: $");

    await expect(this.priceTax).toBeVisible();
    await expect(this.priceTax).toContainText("Tax: $");

    // ===== CALCULATE EXPECTED SUBTOTAL FROM ALL PRODUCTS =====
    let expectedSubtotal = 0;
    for (const productKey of expectedProducts) {
      const productData = PRODUCTS[productKey];
      expectedSubtotal += productData.price;
    }
    console.log(
      `Expected subtotal for ${expectedProducts.length} items: $${expectedSubtotal.toFixed(2)}`,
    );

    // Retrieve Subtotal
    const actualSubtotalText = await this.commonUtils.getText(
      this.priceSubtotal,
    );
    const actualSubtotal = parseFloat(
      actualSubtotalText.replace(/[^0-9.]/g, ""),
    );
    console.log(`Actual subtotal from page: $${actualSubtotal.toFixed(2)}`);

    // Compare Subtotal & Calculated Value
    expect(actualSubtotal).toBe(expectedSubtotal);

    // Retrieve Tax
    const taxText = await this.commonUtils.getText(this.priceTax);
    const productTax = parseFloat(taxText.replace(/[^0-9.]/g, ""));
    console.log(`Tax: $${productTax.toFixed(2)}`);

    // Calculate Expected Total
    const expectedTotal = (expectedSubtotal + productTax).toFixed(2);
    console.log(`Expected total: $${expectedTotal}`);

    // Verify Total
    await expect(this.priceTotal).toBeVisible();
    await expect(this.priceTotal).toContainText("Total: $" + expectedTotal);
  }

  async verifyCheckoutComplete() {
    await expect(this.successImage).toBeVisible();

    await expect(this.successTitle).toBeVisible();
    await expect(this.successTitle).toContainText("Thank you for your order!");

    await expect(this.sucessMessage).toBeVisible();
    await expect(this.sucessMessage).toContainText(
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

    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedError);
  }

  private async checkoutSelector() {
    const selectors = CheckoutSelectors.getSelectors();

    return {
      overviewProductCard: this.page.locator(selectors.card),
      overviewProductQuantity: this.page.locator(selectors.quantity),
      overviewProductName: this.page.locator(selectors.name),
      overviewProductDesc: this.page.locator(selectors.description),
      overviewProductPrice: this.page.locator(selectors.price),
    };
  }
}
