import { Locator, Page, expect } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";
import { Navigation } from "../utils/navigationUtils";
import { LocatorsFactory, ProductKey } from "../factory/locatorsFactory";
import { ProductDetails } from "../factory/productDetails";

export class CartPage {
  readonly page: Page;
  readonly commonUtils: CommonUtils;
  readonly navigation: Navigation;
  readonly hamburgerButton: Locator;
  readonly textLogo: Locator;
  readonly cartButton: Locator;
  readonly navigationMenu: Locator;
  readonly closeButton: Locator;
  readonly productText: Locator;
  readonly cartQuantityText: Locator;
  readonly cartDescText: Locator;
  readonly cartFooter: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    const Base = LocatorsFactory.BASE_PAGE;
    const Cart = LocatorsFactory.CART_PAGE;

    this.page = page;
    this.commonUtils = new CommonUtils(page);
    this.navigation = new Navigation(page);
    this.hamburgerButton = page.locator(Base.HAMBURGER_BUTTON);
    this.textLogo = page.locator(Base.TEXT_LOGO);
    this.cartButton = page.locator(Base.CART_BUTTON);
    this.navigationMenu = page.locator(Base.NAVIGATION_MENU);
    this.closeButton = page.locator(Base.CLOSE_BUTTON);
    this.productText = page.locator(Base.PAGE_TITLE);
    this.cartQuantityText = page.locator(Cart.CART_QUANTITY_TEXT);
    this.cartDescText = page.locator(Cart.CART_DESC_TEXT);
    this.cartFooter = page.locator(Cart.CART_FOOTER);
    this.continueShoppingButton = page.locator(Cart.CONTINUE_SHOPPING_BUTTON);
    this.checkoutButton = page.locator(Cart.CHECKOUT_BUTTON);
  }

  async verifyEmptyCartPage() {
    await this.navigation.goToCart();

    await expect(this.hamburgerButton).toBeVisible();
    await expect(this.textLogo).toBeVisible();
    await expect(this.textLogo).toHaveText("Swag Labs");
    await expect(this.cartButton).toBeVisible();

    await expect(this.productText).toBeVisible();
    await expect(this.productText).toHaveText("Your Cart");

    await expect(this.cartQuantityText).toBeVisible();
    await expect(this.cartQuantityText).toHaveText("QTY");
    await expect(this.cartDescText).toBeVisible();
    await expect(this.cartDescText).toHaveText("Description");

    await expect(this.cartFooter).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async getProductDetails(productKey: ProductKey) {
    const ProductMap = ProductDetails.PRODUCT_MAP;

    // Retrieve Product xPath From Maps
    const product = LocatorsFactory.PRODUCT_SELECTORS[productKey];

    // Frame Product Name, Desc, Price xPath
    const productImage = this.page.locator(
      product +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_img']"
    );
    const productName = this.page.locator(
      product +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_name ']"
    );
    const productDesc = this.page.locator(
      product +
        "/ancestor::div[@class='inventory_item']//div[@class='inventory_item_desc']"
    );
    const productPrice = this.page.locator(
      product + "/preceding-sibling::div[@class='inventory_item_price']"
    );
    const addToCartButton = this.page.locator(product);

    switch (productKey) {
      case "BACKPACK": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.BACKPACK.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.BACKPACK.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(ProductMap.BACKPACK.PRICE);

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      case "BIKE_LIGHT": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.BIKE_LIGHT.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.BIKE_LIGHT.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(ProductMap.BIKE_LIGHT.PRICE);

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      case "BOLT_SHIRT": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.BOLT_SHIRT.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.BOLT_SHIRT.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(ProductMap.BOLT_SHIRT.PRICE);

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      case "FLEECE_JACKET": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.FLEECE_JACKET.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.FLEECE_JACKET.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(
          ProductMap.FLEECE_JACKET.PRICE
        );

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      case "ONESIE": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.ONESIE.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.ONESIE.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(ProductMap.ONESIE.PRICE);

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      case "RED_SHIRT": {
        await expect(productImage).toBeVisible();

        await expect(productName).toBeVisible();
        await expect(productName).toContainText(ProductMap.RED_SHIRT.NAME);

        await expect(productDesc).toBeVisible();
        await expect(productDesc).toContainText(ProductMap.RED_SHIRT.DESC);

        await expect(productPrice).toBeVisible();
        await expect(productPrice).toContainText(ProductMap.RED_SHIRT.PRICE);

        await expect(addToCartButton).toBeVisible();
        await expect(addToCartButton).toContainText("Add to cart");
        break;
      }
      default: {
        throw new Error(`Invalid product key: ${productKey}`);
        break;
      }
    }
  }

  async addProductToCart(productKey: ProductKey) {
    const product = LocatorsFactory.PRODUCT_SELECTORS[productKey];
    const addToCartButton = this.page.locator(product);

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }
}
