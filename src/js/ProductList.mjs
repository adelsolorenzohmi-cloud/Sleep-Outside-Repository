import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // 1. Determine the category to fetch. 
        const categoryToFetch = this.category || "tents";

        // 2. Fetch the data from the API
        const list = await this.dataSource.getData(categoryToFetch);

        // 3. Logic: Determine if we are on the Landing Page or a Category Page
        // We check the URL for the "?category=" parameter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryInUrl = urlParams.get("category");

        const filteredList = categoryInUrl ? list : list.slice(0, 4);

        // 4. Render the final list
        this.renderList(filteredList);
    }

    renderList(list) {
        // Uses the utility function to inject the HTML into the DOM
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
}