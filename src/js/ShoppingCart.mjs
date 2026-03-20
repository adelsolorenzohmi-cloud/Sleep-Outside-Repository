import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    init() {
        const cartItems = getLocalStorage(this.key);
        // Check if cartItems exists and is an array with items
        if (cartItems && cartItems.length > 0) {
            this.renderCartContents(cartItems);
        }
    }

    renderCartContents(items) {
        renderListWithTemplate(cartItemTemplate, this.parentElement, items, "afterbegin", true);
    }
}