// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, update } from "firebase/database";
// import {getDatabase, ref, set, child, update, remove};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqmiEe8TtSYZoHkkoY1X5ReoGH01sl2QU",
    authDomain: "storesite-e8d7c.firebaseapp.com",
    databaseURL: "https://storesite-e8d7c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "storesite-e8d7c",
    storageBucket: "storesite-e8d7c.appspot.com",
    messagingSenderId: "886798905451",
    appId: "1:886798905451:web:8adb49015e1acbc770012e",
    measurementId: "G-2WWX90KVMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getDatabase();

async function fetchData() {
//Add data from firebase and put it on HTML(produkt sida & kundvagn htmls)

}

function updateData(product, totalAmount){
    update(ref(db), "TheProducts/" + product),{
        Amount: --totalAmount
    }
    .then(() =>{
        console.log(`${product} data updated`);
    })
    .catch((error) => {
        alert('unsuccessful, error: ' + error)
    });

}