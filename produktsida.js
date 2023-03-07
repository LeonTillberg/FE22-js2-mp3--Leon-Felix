import anime from './node_modules/animejs/lib/anime.es.js'

import { firebaseConfig } from './modules/config.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { onValue, ref, getDatabase } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import { ProductElement } from './modules/ProductElement.js';
import { getTotalQuantityFromCookie } from './cookie.js';

// Setup firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Product list table
const productPath = 'TheProducts';
const productListContainer = document.querySelector('.product-container');

// ProductElement objects
const productList = [];

const pathRef = ref(db, productPath);
onValue(pathRef, (snapshot) => {
    const data = snapshot.val();
    for (const id in data) {
        const name = id;
        const { Amount, Price, image } = data[id];
        productList.push(new ProductElement(productListContainer, {
            name,
            image,
            price: Price,
            quantity: Amount
        }));
    }
});
// Ny kod. Uppdatera cartCounter i real-time:
const cartLink = document.querySelector('#cart-link');
updateCartCounter();
document.addEventListener("cartUpdated", updateCartCounter);

const doneShoppingBtn = document.querySelector('.done-shopping-button');
doneShoppingBtn.addEventListener('click', function () {
    // Knappen vill inte funkar utan en debugger av nån anledning.
    // Den slutar även funka om man tar bort samma variabel från Cookie.js.
    debugger;
    window.location.href = './kundvagn.html';
});

function updateCartCounter() {
    cartLink.innerHTML = `Cart: ${getTotalQuantityFromCookie()}`;
}

//1. Uppdatera cartQuantiy i real-time.         CHECK
//2. Done Shopping ska ta en till nästa sida.   CHECK
//3. fixa cart-sidan.
//4. Animera något.
//5. Gör om cookies till deras library.         