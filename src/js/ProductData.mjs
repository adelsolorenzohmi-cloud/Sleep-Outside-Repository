const baseURL = import.meta.env.VITE_SERVER_URL

/*function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}*/


export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  /*
  async getData() {
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return data;
  }*/


  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    // New logic: Query the API directly for the specific ID
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

