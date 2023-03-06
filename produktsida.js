// import { getDatabase, ref, onValue } from "firebase/database";
// import { initializeApp } from "./node_modules/firebase/firebase-app-compat.js";
// import { getDatabase, ref, update } from "./node_modules/firebase/firebase-database.js"

// import { initializeApp } from './node_modules/firebase/firebase-app.js';
import { initializeApp } from "./node_modules/firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, update } from './node_modules/firebase/firebase-database.js';

export const firebaseConfig = {
    apiKey: "AIzaSyAqmiEe8TtSYZoHkkoY1X5ReoGH01sl2QU",
    authDomain: "storesite-e8d7c.firebaseapp.com",
    databaseURL: "https://storesite-e8d7c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "storesite-e8d7c",
    storageBucket: "storesite-e8d7c.appspot.com",
    messagingSenderId: "886798905451",
    appId: "1:886798905451:web:8adb49015e1acbc770012e",
    measurementId: "G-2WWX90KVMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getDatabase();

async function fetchData() {
    //Add data from firebase and put it on HTML(produkt sida & kundvagn htmls)

}

function updateData(product, totalAmount) {
    update(ref(db), "TheProducts/" + product), {
        Amount: --totalAmount
    }
        .then(() => {
            console.log(`${product} data updated`);
        })
        .catch((error) => {
            alert('unsuccessful, error: ' + error)
        });

}

export class Product {
    #name;
    #image;
    #value;
    #amount;
    #amountInput;
    #productContainer;
    #addBtn;
    constructor(name, image, value, amount) {
        this.#name = name;
        this.#image = image;
        this.#value = value;
        this.#amount = amount;
        this.#productContainer = document.querySelector('#product-container');
        this.createHTML();
    }

    async addToCart() {
        const amount = this.#amountInput.valueAsNumber;
        if (!Number.isInteger(amount) || amount <= 0) {
            console.log("Invalid amount");
            return;
        }

        const productRef = ref(db, "TheProducts/" + this.#name);
        const productSnapshot = await get(productRef);
        const product = productSnapshot.val();
        const availableAmount = product.Amount;

        if (amount > availableAmount) {
            console.log("Not enough stock");
            return;
        }

        const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
        cart[this.#name] = (cart[this.#name] || 0) + amount;
        sessionStorage.setItem("cart", JSON.stringify(cart));

        updateData(this.#name, availableAmount - amount);

        console.log("Product added to cart");
    }

    createHTML() {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        this.#productContainer.append(productBox);

        const productNameH3 = document.createElement("h3");
        productNameH3.innerText = this.#name;

        const productPriceP = document.createElement("p");
        productPriceP.innerText = this.#value;

        const productImage = document.createElement('img');
        productImage.src = this.#image;
        productImage.alt = this.#name;
        productImage.width = 200;
        productImage.height = 200;

        const productAmount = document.createElement('p');
        productAmount.innerText = this.#amount;

        productBox.append(productNameH3, productAmount, productPriceP, productImage);

        this.#addBtn = document.createElement("button");
        this.#addBtn.classList.add('add-cart-button');
        this.#addBtn.innerText = "Lägg till";

        this.#amountInput = document.createElement("input");
        this.#amountInput.classList.add('amount-input');
        this.#amountInput.setAttribute("type", "number");
        productBox.append(this.#amountInput, this.#addBtn);

        this.#addBtn.addEventListener('click', () => {
            this.addToCart();
        })

    }
}

const productsRef = ref(db, "TheProducts");

onValue(productsRef, (snapshot) => {
    const products = snapshot.val();
    for (const productId in products) {
        const product = products[productId];
        new Product(product.name, product.image, product.price, product.amount);
    }
});