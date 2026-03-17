// src/js/product.js
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Retrieve the ID from the URL (e.g., .../product.html?product=880RR)
const productId = new URLSearchParams(window.location.search).get("product");

async function init() {
  if (!productId) {
    console.error("No product ID provided in URL");
    return;
  }

  const product = await dataSource.findProductById(productId);

  if (product) {
    console.log("Product loaded successfully:", product);
    // Add your rendering logic here, e.g., renderProductDetails(product);
  } else {
    console.error("Product not found or failed to load.");
  }
}

init();