export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        // 1. Fetch data - MUST pass the category to your ExternalServices
        const list = await this.dataSource.getData(this.category);

        // 2. Filter the list (Homepage usually only wants 4 specific tents)
        const filteredList = this.filterList(list);

        // 3. Render it to the page
        this.renderList(filteredList);
    }

    filterList(list) {
        // Return only the first 4 products for the homepage
        return list.slice(0, 4);
    }

    renderList(list) {
        this.listElement.innerHTML = "";
        const htmlStrings = list.map(productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
}

function productCardTemplate(product) {
    // API uses Images.PrimaryMedium and ListPrice/FinalPrice
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`;
}