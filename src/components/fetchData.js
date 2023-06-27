/* eslint-disable no-console */
import { useEffect, useState } from 'react';

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

function setCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function useFetchDragons() {
  const [dragons, setDragons] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('API request made');
    fetch('https://api.spacexdata.com/v4/dragons')
      .then((response) => response.json())
      .then((data) => {
        setDragons(data);
        const storedCart = getCartFromLocalStorage();
        if (storedCart.length > 0) {
          setCart(storedCart);
        } else {
          const initialCart = data.map((dragon) => ({
            id: dragon.id,
            added: false,
          }));
          setCart(initialCart);
          setCartToLocalStorage(initialCart);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (dragonId) => {
    const updatedCart = cart.map((item) => (item.id === dragonId
      ? { ...item, added: !item.added } : item));

    setCart(updatedCart);
    setCartToLocalStorage(updatedCart);

    setMessage(
      updatedCart.find((item) => item.id === dragonId)?.added
        ? 'Added to cart'
        : 'Removed from cart',
    );

    setTimeout(() => {
      setMessage('');
    }, 1500);
  };

  return {
    dragons, cart, addToCart, message,
  };
}

export default useFetchDragons;
