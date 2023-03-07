import anime from './node_modules/animejs/lib/anime.es.js'
import { Cart } from './modules/Cart.js';
// import { getCookie, setCookie } from './modules/cookie.js';

let cookies = document.cookie;
let cookieArray = cookies.split(';');
const cartContainer = document.querySelector('.cart-items-container');
const totalPrice = document.querySelector('.cart-total');
let fullPrice = 0;

if (cookieArray.length > 0 && cookieArray[0].trim() !== '') {
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        var cookieName = cookie.split('=')[0];
        var cookieValue = cookie.split('=')[1];

        const divs = document.createElement('div');
        cartContainer.append(divs);
        divs.classList.add('divs');

        // const img = document.createElement('img');
        // // img.src = ;                               //Importa bilder från fireBase.
        // img.classList.add(cartImg)

        const name = document.createElement('h3');
        name.innerText = cookieName;
        divs.append(name);

        const amount = document.createElement('p');
        amount.innerText = 'Amount: ' + cookieValue;
        divs.append(amount);

        const price = document.createElement('p');
        const itemPrice = cookieValue * 30;
        price.innerText = 'Price: ' + itemPrice;        // Måste importa priser.
        divs.append(price);

        fullPrice += itemPrice;
    }
    // Beräknar slutpriset:
    totalPrice.innerText = 'Total: ' + fullPrice;

}

else {
    cartContainer.innerHTML = 'Your cart is empty!';
}

const buyBtn = document.querySelector('.buy-button').addEventListener('click', function () {
    const divs = document.querySelectorAll('.divs');
    //Animation:
    const spinAnimation = {
        targets: divs,
        rotate: '360deg',
        duration: 1000,
        easing: 'linear',
    };
    anime(spinAnimation);

    const byePrice = JSON.stringify(fullPrice);
    const message = `Thank you for your purchase of "<span class="total-price">${byePrice}</span>" sek!`;

    const messageContainer = document.querySelector('.bye-message');
    messageContainer.innerHTML = message;

    // Delete cookies:
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const name = cookie.split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    alert('Thank you for your purchase!');

    // Start the animation:
    anime(spinAnimation);

    // Måste uppdatera firebase inventory:

})

const emptyBtn = document.querySelector('.empty-button').addEventListener('click', function () {
    cartContainer.innerHTML = 'Your cart is empty!';
    totalPrice.innerHTML = 'Total: ';
})