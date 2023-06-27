export function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

export function setCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
