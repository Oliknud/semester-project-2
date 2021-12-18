import { getToken } from "./localStorage.js";
import { adminMenu } from "./adminMenu.js";

adminMenu()

const form = document.querySelector("#admin-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImageUrl = document.querySelector("#product-image");
const productDescription = document.querySelector("#product-description");
const productFeatured = document.querySelector("#featured");
const deleteBtn = document.querySelector(".delete-btn");

const qString = document.location.search;
const param = new URLSearchParams(qString);
const id = param.get("id");
const editUrl = `https://pacific-tor-45398.herokuapp.com/api/products/${id}`;

const getInputs = async () => {
    const response = await fetch(editUrl);
    const json = await response.json();
    productName.value = json.data.attributes.name;
    productPrice.value = json.data.attributes.price;
    productDescription.value = json.data.attributes.description;
    productImageUrl.value = json.data.attributes.imageUrl;
    productFeatured .checked = json.data.attributes.featured;
}
getInputs()

function edit() {
    event.preventDefault();

    const name = productName.value.trim();
    const price = parseFloat(productPrice.value);
    const imageUrl = productImageUrl.value.trim();
    const description = productDescription.value.trim();
    const featured = productFeatured.checked;

    editNewProduct(name, price, imageUrl, description, featured);
}

async function editNewProduct(name, price, imageUrl, description, featured) {
    const url = editUrl;
    const data = JSON.stringify({data: {name: name, price: price, imageUrl: imageUrl, description: description, featured: featured}});
    const token = getToken()

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        document.location.href = "./adminPage.html";
    }
    catch (error) {
        console.log(error)
    }
}

async function deleteProduct(name, price, imageUrl, description, featured) {
    const url = editUrl;
    const data = JSON.stringify({data: {name: name, price: price, imageUrl: imageUrl, description: description, featured: featured}});
    const token = getToken()

    const options = {
        method: "DELETE",
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
    document.location.href = "./adminPage.html";
}

deleteBtn.addEventListener("click", ()=> {
    
    const deleteConfirmation = window.confirm("Delete product?");
    if (deleteConfirmation) {
        deleteProduct()
    }
});

form.addEventListener("submit", edit);