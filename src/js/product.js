import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    const productId = getParam("product");
    const dataSource = new ExternalServices();

    const product = new ProductDetails(productId, dataSource);
    product.init();
}

init();