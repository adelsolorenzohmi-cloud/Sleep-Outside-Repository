import { renderListWithTemplate, getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    // FIX: Changed item.Image to item.Images.PrimaryMedium to match the API data
    return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    init() {
        const cartItems = getLocalStorage(this.key);

        if (cartItems && cartItems.length > 0) {
            this.renderCartContents(cartItems);
            this.calculateCartTotal(cartItems);

            // NEW: Add the listener for the Checkout button here
            const checkoutBtn = document.getElementById("checkoutButton");
            if (checkoutBtn) {
                checkoutBtn.addEventListener("click", () => {
                    window.location.href = "../checkout/index.html";
                });
            }
        } else {
            this.parentElement.innerHTML = "<p>Your cart is empty.</p>";
            const cartFooter = document.querySelector(".cart-footer");
            if (cartFooter) cartFooter.classList.add("hide");
        }
    }

    renderCartContents(items) {
        renderListWithTemplate(cartItemTemplate, this.parentElement, items, "afterbegin", true);
    }

    calculateCartTotal(items) {
        const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
        const totalElement = document.querySelector(".cart-total");
        const footerElement = document.querySelector(".cart-footer");

        if (totalElement && footerElement) {
            totalElement.textContent = `Total: $${total.toFixed(2)}`;
            footerElement.classList.remove("hide");
        }
    }
}