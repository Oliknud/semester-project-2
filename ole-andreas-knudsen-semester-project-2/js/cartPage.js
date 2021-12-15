import { getCart } from "./getCart.js";
/* const clearBtn = document.querySelector(".clear-btn"); */
const cartContainer = document.querySelector(".cart-container");

const cart = getCart();

/* clearBtn.addEventListener("click", clearitems); */

cart.forEach(function (product) {
    cartContainer.innerHTML += `<div class="list-product">
                                            <img src="${product.img}" alt="product image" />
                                            <div class="list-product-info">
                                                <h3>${product.name}</h3>
                                                <p>${product.desc}</p>
                                                <div>
                                                    <h4>${product.price} ,-</h4>
                                                </div>
                                            </div>
                                        </div>`;
                                        console.log(product.desc)
});

/* function clearitems() {
    localStorage.clear();
    container.innerHTML = `<h2>No favourites</h2>`;
} */

if(cart.length === 0){
    container.innerHTML = `<h2>No favourites</h2>`;
}