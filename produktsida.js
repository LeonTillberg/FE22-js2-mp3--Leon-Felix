import anime from './node_modules/animejs/lib/anime.es.js'

import { firebaseConfig } from './modules/config.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { onValue, ref, getDatabase } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import { ProductElement } from './modules/ProductElement.js';
import { getTotalQuantityFromCookie } from './main.js';

// Setup firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Cart
const cartLink = document.querySelector('#cart-link');
cartLink.innerHTML = `Cart: ${getTotalQuantityFromCookie()}`;

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
        }))
    }
    document.querySelectorAll('button').forEach(element => {
        element.addEventListener('click', () => {
            cartLink.innerHTML = `Cart: ${getTotalQuantityFromCookie()}`;
            console.log('meow');
        })
    });
})

