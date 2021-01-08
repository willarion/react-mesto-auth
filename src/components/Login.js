import React from 'react';
import { Link } from 'react-router-dom';

function Login (props) {
  return(
    <div className="authentification">
      <form action="#" className="authentification__containter" onSubmit={props.onSubmit} noValidate>
        <fieldset className="authentification__info-input">
          <legend className="authentification__title">
            {/* {props.title} */}
            Привет
            </legend>
          <label className="authentification__input-field">
            <input type="email" name="email" placeholder="E-mail" className="authentification__input-line" required minLength="2" maxLength="40" 
            // value={} onChange={} 
            />
          </label>
          <label className="authentification__input-field">
              <input type="password" name="password" placeholder="Пароль" className="authentification__input-line" required minLength="2" maxLength="20" 
              // value={} onChange={} 
              />
            </label>
        </fieldset>
        <input type="submit" className="authentification__save-btn" 
        //value={props.buttonValue} 
        />
        <Link 
        // to={} 
        className="authentification__hint">
          ку-ку
        </Link>
      </form>
    </div>
  );
}

export default Login;