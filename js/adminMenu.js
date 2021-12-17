import { getUser } from "./localStorage.js";

export function adminMenu() {
    const userContainer = document.querySelector("#user-active");
    const adminLink = document.querySelector(".admin-link");
    const username = getUser();

    if (username) {
        userContainer.innerHTML = `<p>Logged in as ${username}</p>
                                    <a class="nav-link log-out" href="login.html">Log out</a>`;

        adminLink.innerHTML += `<a class="nav-link" href="./adminPage.html">Admin</a>`

        const logOut = document.querySelector(".log-out");
        logOut.addEventListener("click", function() {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        });
    } else {
        userContainer.innerHTML = `<a class="nav-link" href="login.html">Log in</a>`;
    }
}