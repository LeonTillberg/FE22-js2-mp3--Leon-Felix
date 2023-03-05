export class Product {
    #name;
    #image;
    #value;
    #amount;
    #amountInput;
    #productContainer;
    constructor(name, image, value, amount) {
        this.#name = name;
        this.#image = image;
        this.#value = value;
        this.#amount = amount;
        this.#productContainer = document.querySelector('#product-container');
        this.createHTML();
    }
    createHTML(){
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        this.#productContainer.append(productBox);

        this.#updateText = document.createElement("h3");
        const hungerP = document.createElement("p");
        const happinessP = document.createElement("p");
        this.#animalContainer.append(this.#updateText, hungerP, happinessP);
        this.#updateText.innerText = `${this.#name} the ${this.#type}`;

        // super.initiateStatus(hungerP, happinessP)

        this.#addBtn = document.createElement("button");
        this.#addBtn.innerText = "Lägg till";
        this.#amountInput = document.createElement("input");
        this.#amountInput.setAttribute("type", "number");
        // tamagotchi.append(this.#feedBtn, this.#playBtn);
        

    }
}