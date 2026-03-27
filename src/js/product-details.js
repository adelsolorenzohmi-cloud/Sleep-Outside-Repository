import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Initialize the shared Header and Footer
loadHeaderFooter();

// 2. Set up the data source (the API)
const dataSource = new ExternalServices();

// 3. Get the Product ID from the URL (e.g., ?product=880RR)
const productId = getParam("product");

// 4. Create an instance of ProductDetails and start it
const product = new ProductDetails(productId, dataSource);
product.init();