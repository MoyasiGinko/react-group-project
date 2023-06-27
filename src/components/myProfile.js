import React, { useEffect, useState } from 'react';
import NavMenu from './navbar';
import { getCartFromLocalStorage } from './localStorage';

function MyProfile() {
  const [dragon, setDragon] = useState(null);

  const fetchDragonData = async (dragonId) => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v4/dragons/${dragonId}`,
      );
      const data = await response.json();
      setDragon(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    const addedDragon = storedCart.find((item) => item.added);
    if (addedDragon) {
      fetchDragonData(addedDragon.id);
    }
  }, []);

  return (
    <>
      <NavMenu />
      <div>
        <h2>My Profile</h2>
        <h3>Dragon Added:</h3>
        {dragon ? (
          <div>
            <img src={dragon.flickr_images[1]} alt={dragon.name} />
            <h4>{dragon.name}</h4>
            <p>
              ID:
              {dragon.id}
            </p>
          </div>
        ) : (
          <p>No dragon added.</p>
        )}
      </div>
    </>
  );
}

export default MyProfile;
