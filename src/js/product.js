import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

// 1. Load the header and footer templates
loadHeaderFooter();

const dataSource = new ProductData("tents");

// 2. Get the product ID from the URL
const productId = getParam("product");

// 3. Initialize the ProductDetails class
const product = new ProductDetails(productId, dataSource);
product.init();