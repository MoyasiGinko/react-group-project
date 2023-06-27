// /* eslint-disable */
import React, { PureComponent } from 'react';
import DragonList from './dragonCard';
import Navbar from './navbar';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
        <DragonList />
      </div>
    );
  }
}

export default Home;
