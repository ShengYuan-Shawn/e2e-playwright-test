export const PRODUCT_IDS = {
  BACKPACK: "sauce-labs-backpack",
  BIKE_LIGHT: "sauce-labs-bike-light",
  BOLT_SHIRT: "sauce-labs-bolt-t-shirt",
  FLEECE_JACKET: "sauce-labs-fleece-jacket",
  ONESIE: "sauce-labs-onesie",
  RED_SHIRT: "test.allthethings()-t-shirt-(red)",
} as const;

export class ProductSelectors {
  static addToCart(productId: string): string {
    return `#add-to-cart-${productId}`;
  }

  static remove(productId: string): string {
    return `#remove-${productId}`;
  }
}
