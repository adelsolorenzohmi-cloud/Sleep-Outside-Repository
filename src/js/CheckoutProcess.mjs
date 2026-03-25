import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

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
        const summaryElement = document.querySelector(`${this.outputSelector} #itemTotal`);
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
        summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06);
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.querySelector(`${this.outputSelector} #shipping`).innerText = `$${this.shipping.toFixed(2)}`;
        document.querySelector(`${this.outputSelector} #tax`).innerText = `$${this.tax.toFixed(2)}`;
        document.querySelector(`${this.outputSelector} #orderTotal`).innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);

        // Add extra required fields
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal.toFixed(2);
        json.tax = this.tax.toFixed(2);
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const res = await services.checkout(json);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}