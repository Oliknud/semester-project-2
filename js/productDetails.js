import { url } from "./api.js";
import { saveCart, getCart} from "./localStorage.js";
import { adminMenu } from "./adminMenu.js";
const qString = document.location.search;
const param = new URLSearchParams(qString);
const id = param.get("id");
const productUrl = url + id;

const productImage = document.querySelector(".product-detail-img");
const productInfo = document.querySelector(".product-info");
const addedToCart = document.querySelector(".added-to-cart-cont");
adminMenu()
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

function handleClick() {
    const id = this.dataset.id
    const name = this.dataset.name
    const desc = this.dataset.desc
    const price = this.dataset.price
    const img = this.dataset.img

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

fetch(productUrl)
    .then(response => response.json())
    .then(data => {
        productDetails(data)})
    .catch((error) => {
        console.log(error)
    });