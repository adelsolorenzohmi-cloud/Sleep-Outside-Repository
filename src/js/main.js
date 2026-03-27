import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

async function init() {
    // 1. Load header and footer first
    await loadHeaderFooter();

    // 2. Initialize the data source
    const dataSource = new ExternalServices();

    // 3. Find where the products should go
    const listElement = document.querySelector(".product-list");

    if (listElement) {      
        const productList = new ProductList(null, dataSource, listElement);
        productList.init();
    }
}

init();