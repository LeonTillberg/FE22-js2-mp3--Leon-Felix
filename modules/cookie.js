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

export function handleSubmit(event){
    cookieValue = Cookies.get(name)
    if(cookieValue){
    }
}

// När man trycker tas man till kundvagn:
const doneShoppingBtn = document.querySelector('.done-shopping-button');
doneShoppingBtn.addEventListener('click', function () {
    window.location.href = './kundvagn.html';
});