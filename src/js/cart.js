import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// 1. Load the consistent header and footer
loadHeaderFooter();

// 2. Initialize the ShoppingCart class
// Parameter 1: The localStorage key (usually "so-cart")
// Parameter 2: The parent element where the cart list should be rendered
const cart = new ShoppingCart("so-cart", document.querySelector(".product-list"));

// 3. Execute the rendering logic
cart.init();