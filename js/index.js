import { adminMenu } from "./adminMenu.js";
import { url } from "./api.js";
const cardContainer = document.querySelector(".product-list");
adminMenu()
cardContainer.innerHTML= `<img class="spinner" src="./images/Infinity-1.6s-200px.gif"/>`
function productsPage(data) {
    const products = data.data

    function renderProducts(products) {
        cardContainer.innerHTML = "";
        for (let product of products) {
            let productAtr = product.attributes;
            if(productAtr.featured === true) {
                cardContainer.innerHTML += `<div class="card" style="width: 18rem;">
                                            <img src="${productAtr.imageUrl}" class="card-img-top" alt="featured image">
                                            <div class="card-body">
                                                <h5 class="card-title">${productAtr.name}</h5>
                                                <p class="card-text">${productAtr.price},-</p> 
                                                <a href="product-details.html?id=${product.id}" class="btn btn-primary">View</a>
                                            </div>
                                        </div>`;
            }
            
        }
    }
    renderProducts(products);
}

fetch(url)
    .then(response => response.json())
    .then(data => {
        productsPage(data)
    })
    .catch((error) => {
        console.log(error)
    });