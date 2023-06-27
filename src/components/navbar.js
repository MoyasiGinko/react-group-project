// /*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => (
  <div className="panel-bg">
    <nav id="navbar">
      <span className="Space Text-Style-3">Space</span>
      <span className="dragons Text-Style-6">
        <Link to="/">DRAGONS</Link>
      </span>
      <span className="Profile Text-Style-6">
        <Link to="/profile">PROFILE</Link>
      </span>
    </nav>
  </div>
);

export default NavMenu;
