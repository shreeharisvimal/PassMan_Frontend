import React from 'react';
import './navbar.css';
import { useSelector } from 'react-redux';

const logoSrc = '/PassMan-logo.png';

function Navbar() {
  const user = useSelector((state) => state.auth_user);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoSrc} alt="App Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <h1>PassMan</h1>
      </div>
      <div className="navbar-right">
        <span className="navbar-username">{user.credential}</span>
      </div>
    </nav>
  );
}

export default Navbar;
