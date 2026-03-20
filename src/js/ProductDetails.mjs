import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        if (this.productId) {
            this.product = await this.dataSource.findProductById(this.productId);

            if (this.product) {
                this.renderProductDetails();

                document
                    .getElementById("addToCart")
                    .addEventListener("click", this.addProductToCart.bind(this));
            }
        } else {
            console.error("No product ID provided in URL");
        }
    }

    addProductToCart() {
        let cartItems = getLocalStorage("so-cart");

        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        // Instant redirect to the cart page
        window.location.assign("../cart/index.html");
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    if (productImage) {
        productImage.src = product.Image;
        productImage.alt = product.NameWithoutBrand;
    }

    document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    const cartButton = document.getElementById("addToCart");
    if (cartButton) {
        cartButton.dataset.id = product.Id;
    }
}