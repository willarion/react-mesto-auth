import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from './Auth';
import goodTooltipImage from '../images/registered.svg';
import badTooltipImage from '../images/not-registered.svg';



function Register (props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.register(password, email)
      .then((res) => {
        if (res) {
          props.onRegister({
            message: 'Вы успешно зарегистрировались!',
            image: goodTooltipImage});
          return res;
        } else {
          console.log(res.status)
          props.onRegister({
            message: 'Что-то пошло не так! Попробуйте ещё раз!',
            image: badTooltipImage});
        }
      })
      .then(() => props.history.push('/sign-in'))
      .catch((e) => console.log(e));
  }

  return(
    <div className="authentification">
      <form action="#" className="authentification__containter" onSubmit={handleSubmit} noValidate>
        <fieldset className="authentification__info-input">
          <legend className="authentification__title">
            Регистрация
          </legend>
          <label className="authentification__input-field">
            <input type="email" name="email" placeholder="E-mail" className="authentification__input-line" required minLength="2" maxLength="40" 
            value={email} onChange={handleEmailChange} 
            />
          </label>
          <label className="authentification__input-field">
              <input type="password" name="password" placeholder="Пароль" className="authentification__input-line" required minLength="2" maxLength="20" 
              value={password} onChange={handlePasswordChange} 
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