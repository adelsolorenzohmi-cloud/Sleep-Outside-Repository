import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

const services = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // 1. Subtotal
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

        // 2. Shipping ($10 for first item, $2 for each additional)
        this.shipping = 10 + (this.list.length - 1) * 2;

        // 3. Tax (6%)
        this.tax = (this.itemTotal * 0.06).toFixed(2);

        // 4. Order Total
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const subtotalEl = document.querySelector("#itemSubtotal");
        const shippingEl = document.querySelector("#shipping");
        const taxEl = document.querySelector("#tax");
        const orderTotalEl = document.querySelector("#orderTotal");

        if (subtotalEl) subtotalEl.innerText = `$${this.itemTotal.toFixed(2)}`;
        if (shippingEl) shippingEl.innerText = `$${this.shipping}`;
        if (taxEl) taxEl.innerText = `$${this.tax}`;
        if (orderTotalEl) orderTotalEl.innerText = `$${this.orderTotal}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const res = await services.checkout(json);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {           
            const existingAlerts = document.querySelectorAll(".alert");
            existingAlerts.forEach(alert => alert.remove());

            // The API returns errors as an object, we loop through them
            for (let key in err.message) {
                alertMessage(err.message[key]);
            }
        }
    }
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};
    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
    }));
}