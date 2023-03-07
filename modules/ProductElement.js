import { setCookie, getTotalQuantityFromCookie } from "./cookie.js";

export class ProductElement {
    // HTML manipulation properties
    #parent;
    #container;

    // Product properties
    #name;
    #image;
    #price;
    #quantity;

    /**
    * Construct product container element and inputs for adding to cart.
    *
    * @param {HTMLElement} parent 
    * @param {{
    *   name: string,
    *   image: string,
    *   price: number,
    *   quantity: number
    * }} info
    */
    constructor(parent, info) {
        // HTML manipulation
        this.#parent = parent;
        this.#container = document.createElement('div');
        this.#container.classList.add('product-item')

        // Product information
        this.#name = info.name;
        this.#image = info.image;
        this.#price = info.price;
        this.#quantity = info.quantity;

        this.updateHTML()
    }

    updateHTML() {
        const name = document.createElement('h3');
        name.innerText = this.#name;
        name.classList.add('name');

        const image = document.createElement('img');
        image.src = this.#image;
        image.height = 200;
        image.classList.add('image');

        const price = document.createElement('p');
        price.innerText = `${this.#price} SEK`;
        price.classList.add('price');

        const quantity = document.createElement('p');
        quantity.innerText = `Stocks: ${Math.floor(this.#quantity)}`;
        quantity.classList.add('quantity');

        const input = document.createElement('input');
        input.setAttribute("type", "number");
        input.setAttribute('min', 0)
        input.setAttribute('max', this.#quantity)

        const button = document.createElement('button');
        button.classList.add('add-to-cart');
        button.innerText = 'Add to cart';
        if (this.#quantity <= 0) {
            button.disabled = true;
        }
        button.addEventListener('click', (inputVal) => {
            inputVal.preventDefault();
            inputVal = input.value;
            this.onAddToCart(inputVal)

            const latestValue = input.value;
            input.placeholder = latestValue;
            input.value = '';
        });

        this.#container.append(image, name, price, quantity, input, button)
        this.#parent.append(this.#container)
    }
    // Uppdatera cartCounter i real-time:
    onAddToCart(amount) {
        const expires = new Date(Date.now() + 4 * 60 * 1000);
        setCookie(this.#name, amount, expires);

        const cartLink = document.querySelector('#cart-link');
        const totalQuantity = getTotalQuantityFromCookie();
        cartLink.innerHTML = `Cart: ${totalQuantity}`;
    }
}
