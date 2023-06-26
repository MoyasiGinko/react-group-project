/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DragonList() {
  const [dragons, setDragons] = useState([]);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('API request made'); // Add this console.log statement
    fetch('https://api.spacexdata.com/v4/dragons')
      .then((response) => response.json())
      .then((data) => setDragons(data))
      .catch((error) => error);
  }, []);

  const addToCart = (dragonId) => {
    if (cart[dragonId]) {
      const updatedCart = { ...cart };
      delete updatedCart[dragonId];
      setCart(updatedCart);
      setMessage('Removed from cart');
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        [dragonId]: true,
      }));
      setMessage('Added to cart');
    }
    setTimeout(() => {
      setMessage('');
    }, 1500);
  };

  console.log(cart);

  return (
    <div>
      <h1>SpaceX Dragons</h1>
      {dragons.map((dragon) => (
        <div key={dragon.id}>
          <img src={dragon.flickr_images[1]} alt={dragon.name} />
          <h2>{dragon.name}</h2>
          <p>
            ID:
            {dragon.id}
          </p>
          <button type="button" onClick={() => addToCart(dragon.id)}>
            {cart[dragon.id] ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          {message && <p className="blink">{message}</p>}
        </div>
      ))}
    </div>
  );
}

DragonList.propTypes = {
  dragons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flickr_images: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ),
};

DragonList.defaultProps = {
  dragons: [],
};

export default DragonList;
