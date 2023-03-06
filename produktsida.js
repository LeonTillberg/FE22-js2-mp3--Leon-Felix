import { getDatabase, ref, onValue } from "firebase/database";
import { Product } from "./modules/product.js";

const db = getDatabase();
const productsRef = ref(db, "TheProducts");

onValue(productsRef, (snapshot) => {
    const products = snapshot.val();
    for (const productId in products) {
        const product = products[productId];
        new Product(product.name, product.image, product.value, product.amount);
    }
});