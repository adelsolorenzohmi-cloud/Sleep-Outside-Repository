import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

// Instantiate the ProductDetails class.
// This handles the rendering and the "Add to Cart" button internally.
const details = new ProductDetails(productId, dataSource);

// Initialize the page
details.init();