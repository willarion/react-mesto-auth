import React from 'react';
import headerLogo from '../images/logo.svg';


function Header () {
  return (
    <header className="header">
      <div className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }} ></div>
    </header>
  )
}

export default Header; 