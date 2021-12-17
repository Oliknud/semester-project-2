import { saveCart, getStorage } from "./localStorage.js";
import { adminMenu } from "./adminMenu.js";
const cartContainer = document.querySelector(".cart-container");
const totalPrice = document.querySelector(".total-price");
adminMenu()

const cart = getStorage("cart");

function renderCart() {
    if(cart.length === 0){
        cartContainer.innerHTML = `<h2 class="emptyMsg">The cart is empty</h2>`;
    } else {
        cartContainer.innerHTML = "";
    }
    
    cart.forEach(function (product) {
        cartContainer.innerHTML += `<div class="list-product">
                                                <img src="${product.img}" alt="product image" />
                                                <div class="list-product-info">
                                                    <h3>${product.name}</h3>
                                                    <img class="cart-remove-item" src="./images/x-circle.svg" alt="remove from cart button" data-id="${product.id}"/>
                                                    <p>${product.desc}</p>
                                                    <div>
                                                        <h4>${product.price} ,-</h4>
                                                    </div>
                                                </div>
                                            </div>`;
    });
    totalPrice.innerHTML = `<h5>Total price: ${totalSum()},-</h5>`

    const removeItem = document.querySelectorAll(".cart-remove-item");
    removeItem.forEach((button) => {
        button.addEventListener("click", removeStoredItem);
    })
}

const totalSum = () => {
    const prices = cart.map((item)=>{
        return item.price * cart.filter(obj => obj.id === item.id).length;
    })

    if (prices.length === 0) {
        return 0;
    }

    const reducer = (x, y) => x + y;

    return prices.reduce(reducer)
}

renderCart()


function removeStoredItem() {
    const id = this.dataset.id;
    const items = cart;
    const index = items.findIndex(product => product.id === id);

    if (index > -1) {
        items.splice(index, 1);
    }
    saveCart(items)
    renderCart(items)
    totalSum();
}