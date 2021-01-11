import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';



function Header (props) {

  return (
    <header className="header">
      <div className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }} ></div>
      <div className="header__status">
        <p className="header__user-email">{props.email}Емейл</p>
        <Link to={props.urlAdress} className="header__link">{props.urlName}</Link>
      </div>
    </header>
  )
}

export default Header; 