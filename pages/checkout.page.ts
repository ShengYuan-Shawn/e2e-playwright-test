import { Locator, Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { BasePage } from "./base.page";
import { LocatorsFactory } from "../factory/locatorsFactory";

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly checkoutForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly formErrorMessage: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    const Cart = LocatorsFactory.CART_PAGE;
    const Checkout = LocatorsFactory.CHECKOUT_PAGE;

    this.checkoutButton = page.locator(Cart.CHECKOUT_BUTTON);
    this.checkoutForm = page.locator(Checkout.CHECKOUT_FORM);
    this.firstNameInput = page.locator(Checkout.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(Checkout.LAST_NAME_INPUT);
    this.postalCodeInput = page.locator(Checkout.POSTAL_CODE_INPUT);
    this.formErrorMessage = page.locator(Checkout.ERROR_MESSAGE);
    this.cancelButton = page.locator(Checkout.CANCEL_BUTTON);
    this.continueButton = page.locator(Checkout.CONTINUE_BUTTON);
  }

  async navigateToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
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
    await this.verifyCheckoutFormError("Error: First Name is required");

    // Submit Form With Missing First Name
    await this.inputLastName();
    await this.inputPostalCode();
    await this.verifyCheckoutFormError("Error: First Name is required");

    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();

    // Submit Form With Missing Last Name
    await this.inputFirstName();
    await this.inputPostalCode();
    await this.verifyCheckoutFormError("Error: Last Name is required");

    await this.firstNameInput.clear();
    await this.postalCodeInput.clear();

    // Submit Form With Missing Postal Code
    await this.inputFirstName();
    await this.inputLastName();
    await this.verifyCheckoutFormError("Error: Postal Code is required");

    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
  }

  async inputPersonalDetails() {
    await this.inputFirstName();
    await this.inputLastName();
    await this.inputPostalCode();
  }

  async submitCheckoutForm() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
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
