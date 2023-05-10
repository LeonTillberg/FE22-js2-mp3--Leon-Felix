import { firebaseConfig } from './modules/config.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js'
import { onValue, ref, getDatabase, update, get } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js'
import anime from './node_modules/animejs/lib/anime.es.js'

// Setup firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let cookies = document.cookie;
let cookieArray = cookies.split(';');
const cartContainer = document.querySelector('.cart-items-container');
const messageContainer = document.querySelector('.bye-message');
const totalPrice = document.querySelector('.cart-total');
let fullPrice = 0;

let cookieNameArray = [];
let cookieQuantityArray = [];

// Display the cart
if (cookieArray.length > 0 && cookieArray[0].trim() !== '') {
    for (var i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        const cookieName = cookie.split('=')[0];
        const cookieValue = cookie.split('=')[1];

        const divs = document.createElement('div');
        divs.classList.add('cart-item');
        cartContainer.append(divs);
        divs.classList.add('divs');

        const name = document.createElement('h3');
        name.innerText = cookieName;
        divs.append(name);

        const amount = document.createElement('p');
        amount.innerText = 'Amount: ' + cookieValue;
        divs.append(amount);

        const pathRef = ref(db, 'TheProducts/' + cookieName);
        onValue(pathRef, (snapshot) => {
            const data = snapshot.val();
            const price = data.Price;
            const image = data.image;
            console.log(`Name: ${cookieName}, Quantity: ${cookieValue}, ` + 'Price:', price);

            const priceP = document.createElement('p');
            priceP.innerText = 'Price: ' + price;
            divs.append(priceP);

            fullPrice += price * cookieValue;
            console.log('fullprice: ' + fullPrice);
            // Beräknar slutpriset:
            totalPrice.innerText = 'Total: ' + fullPrice;

            const img = document.createElement('img');
            img.src = image;
            divs.append(img)
            img.classList.add('img')
        });


        cookieNameArray.push(cookieName);
        cookieQuantityArray.push(cookieValue);
    }
} else {
    cartContainer.innerHTML = 'Your cart is empty!';
}

//Animation:
const spinAnimation = {
    targets: 'button',
    rotate: '360deg',
    duration: 1000,
    easing: 'linear',
};

console.log('name array: ' + cookieNameArray);
console.log('quantity array: ' + cookieQuantityArray);

const buyBtn = document.querySelector('.buy-button').addEventListener('click', function () {
    const divs = document.querySelectorAll('.divs');
    anime(spinAnimation);

    const byePrice = JSON.stringify(fullPrice);
    console.log('byeprice: ' + byePrice);
    if (fullPrice > 0) {
        const message = `Thank you for your purchase of "<span class="total-price">${byePrice}</span>" sek!`;
        messageContainer.innerHTML = message;
        // totalPrice.innerHTML = 'Total: ';
    }
    else {
        const message = 'Choose products first!'
        messageContainer.innerHTML = message;
    }
    fullPrice = 0;

    cartContainer.innerHTML = 'Your cart is empty!';

    // Delete cookies:
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const name = cookie.split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    updateProductQuantities(cookieNameArray, cookieQuantityArray)
        .then(() => {
            console.log('Updated database');
            totalPrice.style.display = 'none';

            //Clear cookies:
            for (let i = 0; i < cookieNameArray.length; i++) {
                document.cookie = `${cookieNameArray[i]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }

        })
        .catch((error) => {
            console.error(error);
        });

    cookieNameArray = [];
    cookieQuantityArray = [];

    anime(spinAnimation);

})

async function updateProductQuantities(cookieNameArray, cookieQuantityArray) {
    for (let i = 0; i < cookieNameArray.length && i < cookieQuantityArray.length; i++) {
        const pathRef = ref(db, 'TheProducts/' + cookieNameArray[i]);
        const snapshot = await get(pathRef);
        const data = snapshot.val();
        const currentQuantity = data.Amount;
        const newQuantity = currentQuantity - cookieQuantityArray[i];
        if (newQuantity >= 0) {
            // Update the quantity in the database
            const updates = {};
            updates['Amount'] = newQuantity;
            await update(ref(db, 'TheProducts/' + cookieNameArray[i]), updates);
        } else {
            console.log('Insufficient stock!');
        }
    }
}

const emptyBtn = document.querySelector('.empty-button').addEventListener('click', function () {
    cartContainer.innerHTML = 'Your cart is empty!';
    totalPrice.innerHTML = 'Total: ';
    messageContainer.innerHTML = '';
    fullPrice = 0;

    // Delete cookies:
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const name = cookie.split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
});
