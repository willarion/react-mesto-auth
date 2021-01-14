import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';



function Header (props) {

  function singOut() {
    if (props.urlName === 'Выйти') {
      localStorage.removeItem('jwt');
      props.onUserEmail('');
      props.history.push('/sing-in');
      console.log(localStorage)
    } else {
      return;
    }
  }

  console.log(props.email);

  return (
    <header className="header">
      <div className="header__logo" style={{ backgroundImage: `url(${headerLogo})` }} ></div>
      <div className="header__status">
        <p className="header__user-email">{props.email}</p>
        <Link to={props.urlAdress} className="header__link" onClick={singOut}>{props.urlName}</Link>
      </div>
    </header>
  )
}

export default Header; 