import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();

    const category = getParam("category");

    if (category) {
        const titleElement = document.querySelector("#category-title");
        if (titleElement) {
            const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
            titleElement.innerHTML = `Top Products: ${displayCategory}`;
        }
    }

    const dataSource = new ExternalServices();
    const listElement = document.querySelector(".product-list");
    const listing = new ProductList(category, dataSource, listElement);

    listing.init();
}

init();