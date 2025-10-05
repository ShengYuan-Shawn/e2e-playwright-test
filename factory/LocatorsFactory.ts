export class LocatorsFactory {
  static readonly BASE_PAGE = {
    PAGE_TITLE: ".title",
    HAMBURGER_BUTTON: ".bm-burger-button",
    TEXT_LOGO: ".app_logo",
    CART_BUTTON: ".shopping_cart_link",
    CART_BADGE: ".shopping_cart_badge",
    NAVIGATION_MENU: ".bm-menu",
    CLOSE_BUTTON: "#react-burger-cross-btn",
    PAGE_FOOTER: ".footer",
    TERMS_TEXT: ".footer_copy",
  } as const;

  static readonly LOGIN_PAGE = {
    LOGIN_LOGO: ".login_logo",
    USERNAME_INPUT: "#user-name",
    PASSWORD_INPUT: "#password",
    LOGIN_BUTTON: "#login-button",
    ERROR_MESSAGE: '[data-test="error"]',
  } as const;

  static readonly HOME_PAGE = {
    PRODUCT_FILTER_BUTTON: ".product_sort_container",
    PRODUCT_IMAGE: ".inventory_item_img",
    PRODUCT_NAME: ".inventory_item_name",
    PRODUCT_DESC: ".inventory_item_desc",
    PRODUCT_PRICE: ".inventory_item_price",
  } as const;

  static readonly PRODUCT_SELECTORS = {
    BACKPACK: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-sauce-labs-backpack']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-sauce-labs-backpack']",
    },
    BIKE_LIGHT: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-sauce-labs-bike-light']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-sauce-labs-bike-light']",
    },
    BOLT_SHIRT: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-sauce-labs-bolt-t-shirt']",
    },
    FLEECE_JACKET: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-sauce-labs-fleece-jacket']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-sauce-labs-fleece-jacket']",
    },
    ONESIE: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-sauce-labs-onesie']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-sauce-labs-onesie']",
    },
    RED_SHIRT: {
      ADD_TO_CART_BUTTON: "xpath=//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']",
      REMOVE_BUTTON: "xpath=//button[@id='remove-test.allthethings()-t-shirt-(red)']",
    },
  } as const;

  static readonly CART_PAGE = {
    CART_QUANTITY_TEXT: ".cart_quantity_label",
    CART_DESC_TEXT: ".cart_desc_label",
    CART_PRODUCT_CARD: '.cart_item',
    CART_PRODUCT_QUANTITY: '.cart_quantity',

    CART_FOOTER: ".cart_footer",
    CONTINUE_SHOPPING_BUTTON: "#continue-shopping",
    CHECKOUT_BUTTON: "#checkout",
  } as const;
}

export type BasePageKey = keyof typeof LocatorsFactory.BASE_PAGE;
export type LoginPageKey = keyof typeof LocatorsFactory.LOGIN_PAGE;
export type HomePageKey = keyof typeof LocatorsFactory.HOME_PAGE;
export type ProductKey = keyof typeof LocatorsFactory.PRODUCT_SELECTORS;
export type CartPageKey = keyof typeof LocatorsFactory.CART_PAGE;
