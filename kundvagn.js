import { Cart } from './modules/Cart.js';
// import { getCookie, setCookie } from './modules/cookie.js';

let cookies = document.cookie;
let cookieArray = cookies.split(';');
const cartContainer = document.querySelector('.cart-items-container');

let fullPrice = 0; 

for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    var cookieName = cookie.split('=')[0];
    var cookieValue = cookie.split('=')[1];

    console.log(cookieName + ': ' + cookieValue);

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
    const itemPrice = cookieValue*30; 
    price.innerText = 'Price: ' + itemPrice;        // Måste importa priset från firebase.
    divs.append(price);

    fullPrice += itemPrice; 
}

const totalPrice = document.querySelector('.cart-total');
totalPrice.innerText = 'Total: ' + fullPrice;

