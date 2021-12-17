import { url } from "./api.js";
import { adminMenu } from "./adminMenu.js";
const productContainer = document.querySelector(".list-product-container");
const search = document.querySelector(".search");
adminMenu()

function productsPage(data) {
    const products = data.data
    
    function renderProducts(products) {
        productContainer.innerHTML = "";

        for (let product of products) {
            let productAtr = product.attributes;
            productContainer.innerHTML += `<div class="list-product">
                                                <img src="${productAtr.imageUrl}" alt="product image" />
                                                <div class="list-product-info">
                                                    <h3>${productAtr.name}</h3>
                                                    <p>${productAtr.description}</p>
                                                    <div>
                                                        <h4>${productAtr.price} ,-</h4>
                                                        <a href="product-details.html?id=${product.id}" class="btn-primary list-product-btn">View</a>
                                                    </div>
                                                </div>
                                            </div>`;
        }
    }

    renderProducts(products);

    search.onkeyup = function() {
        const value = event.target.value.trim().toLowerCase();
        console.log(value)
        
        const filtered = products.filter(function(product) {
            if(product.attributes.name.toLowerCase().startsWith(value)) {
                return true; 
            }
        })

        renderProducts(filtered);
        console.log(filtered)

        if (value === "") {
            renderProducts(products);
        }
    }
};



fetch(url)
    .then(response => response.json())
    .then(data => {
        productsPage(data)})
    .catch((error) => {
        console.log(error)
    });
