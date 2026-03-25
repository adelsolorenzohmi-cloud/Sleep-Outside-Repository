import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
    // 1. Load templates
    await loadHeaderFooter();

    // 2. Initialize products
    const dataSource = new ExternalServices();
    const listElement = document.querySelector(".product-list");

    if (listElement) {
        // 'tents' is the category passed to ProductList
        const productList = new ProductList("tents", dataSource, listElement);
        productList.init();
    }
}

init();