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
    createHTML(){
        //TO-DO add image element and product amount p
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        this.#productContainer.append(productBox);

        const productNameH3 = document.createElement("h3");
        const productPriceP = document.createElement("p");
        productBox.append(productNameH3, productPriceP);

        this.#addBtn = document.createElement("button");
        this.#addBtn.classList.add('add-cart-button');
        this.#addBtn.innerText = "Lägg till";

        this.#amountInput = document.createElement("input");
        this.#amountInput.classList.add('amount-input');
        this.#amountInput.setAttribute("type", "number");
        productBox.append(this.#feedBtn, this.#playBtn);
        
        this.#addBtn.addEventListener('click', () => {
            //Look at the amount input and later sessionStorage =>
            //if statement check the amount in firebase so it can't be added
        })

    }
}