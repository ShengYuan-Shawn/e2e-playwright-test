export class LocatorsFactory {
  static readonly BASE_PAGE = {
    PAGE_TITLE: ".title",
    HAMBURGER_BUTTON: ".bm-burger-button",
    TEXT_LOGO: ".app_logo",
    CART_BUTTON: ".shopping_cart_link",
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
    PRODUCT_PRICE: ".inventory_item_price",
  } as const;

  static readonly CART_PAGE = {
    CART_QUANTITY_TEXT: ".cart_quantity_label",
    CART_DESC_TEXT: ".cart_desc_label",
    CART_FOOTER: ".cart_footer",
    CONTINUE_SHOPPING_BUTTON: "#continue-shopping",
    CHECKOUT_BUTTON: "#checkout",
  } as const;
}
