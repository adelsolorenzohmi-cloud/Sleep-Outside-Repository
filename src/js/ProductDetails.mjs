function productDetailsTemplate(product) {
    return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2>${product.NameWithoutBrand}</h2>
    <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
    <p class="product-card__price">$${product.ListPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">${product.DescriptionHtmlSimple}</p>
  </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterbegin", productDetailsTemplate(this.product));
    }
}