import { getDatabase, ref, onValue } from "firebase/database";

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

    createHTML(){
        //TO-DO add image element and product amount p
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
        productBox.append(this.#feedBtn, this.#playBtn);
        
        this.#addBtn.addEventListener('click', () => {
            this.addToCart();
        })

    }
}
