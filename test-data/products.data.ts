// test-data/products.data.ts
export const PRODUCTS = {
  BACKPACK: {
    NAME: "Sauce Labs Backpack",
    DESC: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    PRICE: "$29.99",
  },
  BIKE_LIGHT: {
    NAME: "Sauce Labs Bike Light",
    DESC: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    PRICE: "$9.99",
  },
  BOLT_SHIRT: {
    NAME: "Sauce Labs Bolt T-Shirt",
    DESC: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    PRICE: "$15.99",
  },
  FLEECE_JACKET: {
    NAME: "Sauce Labs Fleece Jacket",
    DESC: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    PRICE: "$49.99",
  },
  ONESIE: {
    NAME: "Sauce Labs Onesie",
    DESC: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    PRICE: "$7.99",
  },
  RED_SHIRT: {
    NAME: "Test.allTheThings() T-Shirt (Red)",
    DESC: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
    PRICE: "$15.99",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export type Product = typeof PRODUCTS[ProductKey];
