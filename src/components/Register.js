import React from 'react';
import { Link } from 'react-router-dom';

function Register (props) {
  return(
    <div className="authentification">
      <form action="#" className="authentification__containter" onSubmit={props.onSubmit} noValidate>
        <fieldset className="authentification__info-input">
          <legend className="authentification__title">
          Регистрация
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
        value="Зарегистрироваться"
        />
        <Link to="/sing-in" className="authentification__hint">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;