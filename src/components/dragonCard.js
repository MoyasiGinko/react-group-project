/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import useFetchDragons from './fetchData';

function DragonList() {
  const {
    dragons, cart, addToCart, message,
  } = useFetchDragons();

  return (
    <div>
      <h1>SpaceX Dragons</h1>
      {dragons.map((dragon) => {
        const added = cart.find((item) => item.id === dragon.id)?.added || false;
        return (
          <div key={dragon.id}>
            <img className="dragon_img" src={dragon.flickr_images[1]} alt={dragon.name} />
            <h4>{dragon.name}</h4>
            <p>{dragon.description}</p>
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
