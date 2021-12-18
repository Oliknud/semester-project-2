import { url } from "./api.js";
import { getToken } from "./localStorage.js";
import { adminMenu } from "./adminMenu.js";
const productContainer = document.querySelector(".list-product-container");
adminMenu()
const form = document.querySelector("#admin-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImageUrl = document.querySelector("#product-image");
const productDescription = document.querySelector("#product-description");
const productFeatured = document.querySelector("#featured");

const adminLink = document.querySelector(".admin-link a");
adminLink.classList.add("active");

function productsPage(data) {
    const products = data.data;
    
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
                                                        <a href="edit-product.html?id=${product.id}" class="btn-primary list-product-btn">Edit</a>
                                                    </div>
                                                </div>
                                            </div>`;
        }
    }

    renderProducts(products);
};

function add() {
    event.preventDefault();

    const name = productName.value.trim();
    const price = parseFloat(productPrice.value);
    const imageUrl = productImageUrl.value.trim();
    const description = productDescription.value.trim();
    const featured = productFeatured.checked;

    addNewProduct(name, price, imageUrl, description, featured);
}

async function addNewProduct(name, price, imageUrl, description, featured) {
    const url = "https://pacific-tor-45398.herokuapp.com/api/products";
    const data = JSON.stringify({data: {name: name, price: price, imageUrl: imageUrl, description: description, featured: featured}});
    const token = getToken()

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        
    }
    catch (error) {
        console.log(error)
    }
    location.reload(); 
}

form.addEventListener("submit", add);

fetch(url)
    .then(response => response.json())
    .then(data => {
        productsPage(data)})
    .catch((error) => {
        console.log(error)
    });