/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
}

function setCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function DragonList() {
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
    const updatedCart = cart.map((item) => (item.id === dragonId ?
      { ...item, added: !item.added } : item));

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

  return (
    <div>
      <h1>SpaceX Dragons</h1>
      {dragons.map((dragon) => {
        const added = cart.find((item) => item.id === dragon.id)?.added || false;
        return (
          <div key={dragon.id}>
            <img src={dragon.flickr_images[1]} alt={dragon.name} />
            <h2>{dragon.name}</h2>
            <p>
              ID:
              {dragon.id}
            </p>
            <button type="button" onClick={() => addToCart(dragon.id)}>
              {added ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            {message && <p className="blink">{message}</p>}
          </div>
        );
      })}
    </div>
  );
}

DragonList.propTypes = {
  dragons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flickr_images: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  ),
};

DragonList.defaultProps = {
  dragons: [],
};

export default DragonList;
