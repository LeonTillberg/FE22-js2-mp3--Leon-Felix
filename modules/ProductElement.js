// async function fetchData() {
//     //Add data from firebase and put it on HTML(produkt sida & kundvagn htmls)
// }

// function updateData(product, totalAmount) {
//     update(ref(db), "TheProducts/" + product), {
//         Amount: --totalAmount
//     }
//         .then(() => {
//             console.log(`${product} data updated`);
//         })
//         .catch((error) => {
//             alert('unsuccessful, error: ' + error)
//         });
// }

//     async addToCart() {
//         const amount = this.#amountInput.valueAsNumber;
//         if (!Number.isInteger(amount) || amount <= 0) {
//             console.log("Invalid amount");
//             return;
//         }

//         const productRef = ref(db, "TheProducts/" + this.#name);
//         const productSnapshot = await get(productRef);
//         const product = productSnapshot.val();
//         const availableAmount = product.Amount;

//         if (amount > availableAmount) {
//             console.log("Not enough stock");
//             return;
//         }

//         const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
//         cart[this.#name] = (cart[this.#name] || 0) + amount;
//         sessionStorage.setItem("cart", JSON.stringify(cart));

//         updateData(this.#name, availableAmount - amount);

//         console.log("Product added to cart");
//     }


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
        const name = document.createElement('p');
        name.innerText = this.#name;

        const image = document.createElement('img');
        image.src = this.#image;
        image.height = 200;

        const price = document.createElement('p');
        price.innerText = `${this.#price} SEK`;

        const quantity = document.createElement('p');
        quantity.innerText = `${Math.floor(this.#quantity)}`;

        const input = document.createElement('input');
        input.setAttribute("type", "number");
        const button = document.createElement('button');
        button.innerText = 'Lägg till';
        button.addEventListener('click', (inputVal) => {
            inputVal = input.value;
            this.onAddToCart(inputVal)
        });

        this.#container.append(image, name, price, quantity, input, button)
        this.#parent.append(this.#container)
    }

    onAddToCart(amount) {
        if (amount > this.#quantity) {
            console.log('Not enough stonks');
            return;
        }
    }
}