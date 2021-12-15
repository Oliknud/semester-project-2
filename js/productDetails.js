import { url } from "./api.js";
import { getCart } from "./getCart.js";

const qString = document.location.search;
const param = new URLSearchParams(qString);
const id = param.get("id");
const productUrl = url + id;
console.log(productUrl)

const productImage = document.querySelector(".product-detail-img");
const productInfo = document.querySelector(".product-info");

function productDetails(product) {
    const productAtr = product.data.attributes;
    productImage.innerHTML = `<img src="${productAtr.imageUrl}" alt="product image" />`
    productInfo.innerHTML += `<h1>${productAtr.name}</h1>
                              <p>${productAtr.description}</p>
                              <div class="product-price">
                                <h3>${productAtr.price},-</h3>
                                <a class="cart-btn" data-id="${product.data.id}" data-name="${productAtr.name}" data-desc="${productAtr.description}" data-price="${productAtr.price}" data-img="${productAtr.imageUrl}">Add to cart</a>
                              </div>`

    const addToCart = document.querySelector(".cart-btn");
    addToCart.addEventListener("click", handleClick);
}


/* const dataset = '" data-id="${product.id}" data-name="${productAtr.name}" data-desc="${productAtr.description}" data-price="${productAtr.price}" data-img="${productAtr.imageUrl}"'*/

function handleClick() {
    console.log(event)
    const id = this.dataset.id
    const name = this.dataset.name
    const desc = this.dataset.desc
    const price = this.dataset.price
    const img = this.dataset.img
    console.log(desc)
    const currentCart = getCart();

    const exists = currentCart.find(function (cartItem) {
      return cartItem.id === id;
    });

    if (exists === undefined) {
      const product = { id, name, desc, price, img };
      currentCart.push(product);
      saveCart(currentCart);
    } else {
      const newCart = currentCart.filter((cartItem) => cartItem.id !== id);
      saveCart(newCart);
    }
}

function saveCart(cart) {
    localStorage.setItem("Cart", JSON.stringify(cart));
}

fetch(productUrl)
    .then(response => response.json())
    .then(data => {

        productDetails(data)})
    .catch((error) => {
        console.log(error)
    });