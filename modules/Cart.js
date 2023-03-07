export class Cart {
  constructor(productList) {
    this.productList = productList;
    this.items = {};
    this.total = 0;
    this.init();
  }

  init() {
    this.renderCart();
    this.attachEventListeners();
  }

  attachEventListeners() {
    // attach click event listener to add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', event => {
        const productId = event.target.dataset.productId;
        const product = this.productList.find(product => product.id === productId);
        this.addItem(product);
      });
    });
  }

  addItem(product) {
    // add item to cart
    if (this.items[product.id]) {
      this.items[product.id].quantity++;
      this.items[product.id].total += product.price;
    } else {
      this.items[product.id] = {
        quantity: 1,
        total: product.price
      };
    }
    this.total += product.price;
    this.renderCart();

    // update product quantity in firebase
    const productRef = ref(db, `${productPath}/${product.id}/Amount`);
    get(productRef).then(snapshot => {
      const quantity = snapshot.val();
      if (quantity > 0) {
        update(productRef, { Amount: quantity - 1 });
      } else {
        console.log(`Out of stock: ${product.name}`);
      }
    });
  }

  renderCart() {
    // render cart contents
    const cartContainer = document.querySelector('.cart-items-container');
    let html = '<h2>Cart</h2>';
    let count = 0;
    for (const id in this.items) {
      const product = this.productList.find(product => product.id === id);
      html += `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-item-details">
              <h3>${product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: ${this.items[id].quantity}</p>
              <p>Total: ${this.items[id].total}</p>
            </div>
          </div>
        `;
      count += this.items[id].quantity;
    }
    html += `
        <div class="cart-summary">
          <p>Total items: ${count}</p>
          <p>Total cost: ${this.total}</p>
        </div>
      `;
    cartContainer.innerHTML = html;
  }
}

