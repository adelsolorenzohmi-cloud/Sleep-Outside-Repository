import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    /*async init() {
        this.listElement.innerHTML = "";
        const list = await this.dataSource.getData();
        const filteredList = this.filterList(list);
        this.renderList(filteredList);
    }*/

    filterList(list) {
        const importantTents = ["880RR", "985RF", "985PR", "344YJ"];
        return list.filter((item) => importantTents.includes(item.Id));
    }

    renderList(list) {
        this.listElement.innerHTML = "";

        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);

    }

}