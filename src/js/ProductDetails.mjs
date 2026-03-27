import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // 1. Get the product data
        this.product = await this.dataSource.findProductById(this.productId);

        // 2. Draw the HTML to the page
        this.renderProductDetails("main");

        // 3. ATTACH THE LISTENER (The button now exists in the DOM)
        const addButton = document.getElementById("addToCart");
        if (addButton) {
            addButton.addEventListener("click", this.addToCart.bind(this));
        }
    }

    addToCart() {
        let cartItems = getLocalStorage("so-cart");
        if (!Array.isArray(cartItems)) cartItems = [];

        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.prepareTemplate();
        }
    }

    prepareTemplate() {
        return `<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider" src="${this.product.Images.PrimaryLarge}" alt="${this.product.NameWithoutBrand}" />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    </section>`;
    }
}