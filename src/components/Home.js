/* eslint-disable */
import React, { PureComponent, useState } from 'react';
import PropTypes from 'prop-types';
import DragonList from './dragonCard';
import Navbar from './navbar';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>
        Count:
        {count}
      </p>
      <button type="button" onClick={increment}>
        Increment
      </button>
    </div>
  );
}

class Home extends PureComponent {
  render() {
    const { title } = this.props;

    return (
        <div>
        <Navbar />
        <h1>{title}</h1>
        <Counter />
        <DragonList />
      </div>
    );
  }
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
