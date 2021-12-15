export function getCart() {
    const cart = localStorage.getItem("Cart");

    if (cart === null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
}