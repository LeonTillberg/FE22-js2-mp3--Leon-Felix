//Plain JS Cookie:
export function setCookie(name, value, expires) {
    document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
}
export function getCookie(name) {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() : '';
}

export function getTotalQuantityFromCookie(){
    const cookies = document.cookie.split('; ');
    let totalQuantity = 0;

    cookies.forEach( cookie => {
        const [name, value] = cookie.split('=');
        if(!isNaN(parseInt(value))){
            totalQuantity += parseInt(value);
        }
    })

    return totalQuantity;
}
// När man trycker add to cart så skapas en placeholder av ditt angivna amount:
function handleInput(event) {
    const input = event.target;
    const latestValue = input.value;
    input.placeholder = latestValue;
}
// Skapar kakor för varje produkt som innehåller namn och amount:
function handleSubmit(event) {
    event.preventDefault();
    // Kakans timer på 3min och totala priset för angiven frukt/mängd:
    const expires = new Date(Date.now() + 3 * 60 * 1000);
    const productPrice = parseFloat(event.target.parentNode.querySelector('p').innerText.replace(/[^\d.]/g, ''));
    const totalProductPrice = productPrice * parseFloat(event.target.previousElementSibling.value);

    // Set:er kakan med angiven mängd och pris*mängds värde:
    setCookie(`${event.target.dataset.product}`, `${event.target.previousElementSibling.value}:${totalProductPrice}`, expires);

    // Tömmer input fältet efter man tryckt på knappen:
    event.target.previousElementSibling.value = "";
}
// När man trycker så skapas en kaka med värdet:
// const addToCartBtns = document.querySelectorAll('[data-product]');
// const addToCartBtns = document.querySelectorAll('.add-to-cart');
// addToCartBtns.forEach(function (button) {
//     button.addEventListener('click', handleSubmit);
// });

// När man trycker tas man till kundvagn:
const doneShoppingBtn = document.querySelector('.done-shopping-button');
doneShoppingBtn.addEventListener('click', function () {
    window.location.href = './kundvagn.html';
});

// När man trycker add to cart så skapas en placeholder av ditt angivna amount:
// const inputFields = document.querySelectorAll('input[type="number"]');
// inputFields.forEach(function (input) {
//     input.addEventListener('input', handleInput);
// });
