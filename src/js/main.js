import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
    // 1. Load templates
    await loadHeaderFooter();

    // 2. Initialize products
    const dataSource = new ExternalServices();
    const listElement = document.querySelector(".product-list");

    if (listElement) {
        const productList = new ProductList("tents", dataSource, listElement);
        productList.init();
    }
}

init();