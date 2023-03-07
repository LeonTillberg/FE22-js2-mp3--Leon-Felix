import Cookies from '../node_modules/js-cookie/dist/js.cookie.min.mjs';
//JS-Cookie Library:
export function setCookie(name, value, expires) {
    Cookies.set(name, value, { expires });
}

export function getCookie(name) {
    return Cookies.get(name);
}

export function getTotalQuantityFromCookie() {
    const cookies = Object.values(Cookies.get());
    let totalQuantity = 0;

    cookies.forEach((value) => {
        if (!isNaN(parseInt(value))) {
            totalQuantity += parseInt(value);
        }
    });

    return totalQuantity;
}

// export function handleSubmit(event){
//     cookieValue = Cookies.get(name)
//     if(cookieValue){

//     }
// }

// När man trycker tas man till kundvagn:
const doneShoppingBtn = document.querySelector('.done-shopping-button');
doneShoppingBtn.addEventListener('click', function () {
    window.location.href = './kundvagn.html';
});





// // När man trycker add to cart så skapas en placeholder av ditt angivna amount:
// function handleInput(event) {
//     const input = event.target;
//     const latestValue = input.value;
//     input.placeholder = latestValue;
// }
// // Skapar kakor för varje produkt som innehåller namn och amount:
// function handleSubmit(event) {
//     event.preventDefault();
//     // Kakans timer på 3min och totala priset för angiven frukt/mängd:
//     const expires = new Date(Date.now() + 3 * 60 * 1000);
//     const productPrice = parseFloat(event.target.parentNode.querySelector('p').innerText.replace(/[^\d.]/g, ''));
//     const totalProductPrice = productPrice * parseFloat(event.target.previousElementSibling.value);

//     // Set:er kakan med angiven mängd och pris*mängds värde:
//     setCookie(`${event.target.dataset.product}`, `${event.target.previousElementSibling.value}:${totalProductPrice}`, expires);

//     // Tömmer input fältet efter man tryckt på knappen:
//     event.target.previousElementSibling.value = "";
// }
// // När man trycker så skapas en kaka med värdet:
// // const addToCartBtns = document.querySelectorAll('[data-product]');
// // const addToCartBtns = document.querySelectorAll('.add-to-cart');
// // addToCartBtns.forEach(function (button) {
// //     button.addEventListener('click', handleSubmit);
// // });

// // // När man trycker tas man till kundvagn:
// // const doneShoppingBtn = document.querySelector('.done-shopping-button');
// // doneShoppingBtn.addEventListener('click', function () {
// //     window.location.href = './kundvagn.html';
// // });

// // När man trycker add to cart så skapas en placeholder av ditt angivna amount:
// // const inputFields = document.querySelectorAll('input[type="number"]');
// // inputFields.forEach(function (input) {
// //     input.addEventListener('input', handleInput);
// // });
