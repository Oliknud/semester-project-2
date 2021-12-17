const tokenKey = "token";
const userKey = "user";
const cartKey = "cart";

export function saveToken(token) {
    saveStorage(tokenKey, token)
}

export function getToken() {
    return getStorage(tokenKey);
}

export function saveUser(user) {
    return saveStorage(userKey, user);
}

export function getUser() {
    const user = getStorage(userKey)

    if (user) {
        return user.username;
    }
}

export function saveCart(cart) {
    saveStorage(cartKey, cart);
}

export function getCart() {
    return getStorage(cartKey);
}

export function saveStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
    const value = localStorage.getItem(key);

    if (value === null) {
      return [];
    } else {
      return JSON.parse(value);
    }
}