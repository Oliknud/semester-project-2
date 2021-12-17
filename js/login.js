import { saveToken, saveUser } from "./localStorage.js";

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector(".error-message");
const email = document.querySelector("#email-input");
const password = document.querySelector("#password-input");
const regex = /\S+@\S+\.\S+/;

function validate() {
    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    if (!email.value.match(regex)) {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }
    
    if (password.value.trim().length < 3) {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
    }

    login(emailValue, passwordValue);
}

async function login(email, password) {
    const url = "https://pacific-tor-45398.herokuapp.com/api/auth/local";
    const data = JSON.stringify({identifier: email, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        if (json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "./adminPage.html"
        }
        if (json.error) {
            errorMessage.style.display = "block";
        }
    }
    catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", validate);