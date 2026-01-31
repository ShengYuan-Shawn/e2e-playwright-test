export const PRODUCT_IDS = {
  BACKPACK: "sauce-labs-backpack",
  BIKE_LIGHT: "sauce-labs-bike-light",
  BOLT_SHIRT: "sauce-labs-bolt-t-shirt",
  FLEECE_JACKET: "sauce-labs-fleece-jacket",
  ONESIE: "sauce-labs-onesie",
  RED_SHIRT: "test.allthethings()-t-shirt-(red)",
} as const;

export class ProductSelectors {
  static getSelectors(productId: keyof typeof PRODUCT_IDS) {
    const product = PRODUCT_IDS[productId];
    const container = `xpath=//button[@id='add-to-cart-${product}']/ancestor::div[@class='inventory_item']`;

    return {
      image: `[data-test="inventory-item-${product}-img"]`,
      name: `${container}//div[@data-test='inventory-item-name']`,
      description: `${container}//div[@data-test='inventory-item-desc']`,
      price: `${container}//div[@data-test='inventory-item-price']`,
      addToCartButton: `xpath=//button[@id="add-to-cart-${product}"]`,
      removeButton: `xpath=//button[@id="remove-${product}"]`,
    };
  }
}

export class CartSelectors {
  static getSelectors(productId: keyof typeof PRODUCT_IDS) {
    const product = PRODUCT_IDS[productId];
    const container = `xpath=//button[@id="remove-${product}"]`;

    return {
      item: `${container}/ancestor::div[@class='cart_item']`,
      quantity: `${container}/ancestor::div[@class='cart_item']//div[@class='cart_quantity']`,
      name: `${container}/ancestor::div[@class='cart_item_label']//div[@class='inventory_item_name']`,
      description: `${container}/ancestor::div[@class='cart_item_label']//div[@class='inventory_item_desc']`,
      price: `${container}/preceding-sibling::div[@class='inventory_item_price']`,
    };
  }
}

export class CheckoutSelectors {
  static getSelectors() {
    return {
      card: "[data-test='inventory-item']",
      quantity: "[data-test='item-quantity']",
      name: "[class='inventory_item_name']",
      description: "[class='inventory_item_desc']",
      price: "[class='item_pricebar']",
    };
  }
}