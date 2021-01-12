import React from 'react';
import badTooltipImage from '../images/not-registered.svg';
import * as auth from './Auth';


function Login (props) {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    auth.login(password, email)
      .then((data) => {
        if (!data) {
          props.onLoginResult({
            message: 'Что-то пошло не так! Попробуйте ещё раз!',
            image: badTooltipImage});
          return;
        } 
        if (data.token) {
          props.onUserEmail(email);
          resetForm();
          props.onLogin();
          props.history.push('/');
          console.log(props.history);
          return;
        }
      })
      .catch((e) => console.log(e));

  }

  return(
    <div className="authentification">
      <form action="#" className="authentification__containter" onSubmit={handleSubmit} noValidate>
        <fieldset className="authentification__info-input">
          <legend className="authentification__title">
            Вход  
          </legend>
          <label className="authentification__input-field">
            <input type="email" name="email" placeholder="E-mail" className="authentification__input-line" required minLength="2" maxLength="40" 
            value={email} onChange={handleEmailChange} 
            />
          </label>
          <label className="authentification__input-field">
              <input type="password" name="password" placeholder="Пароль" className="authentification__input-line" required minLength="2" maxLength="20" 
              value={password} onChange={handlePasswordChange}               />
            </label>
        </fieldset>
        <input type="submit" className="authentification__save-btn" value="Войти" 
        />
      </form>
    </div>
  );
}

export default Login;