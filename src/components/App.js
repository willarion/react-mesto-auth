import React from 'react'; 
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as auth from './Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';




function App() {
  const history = useHistory();

  //получение данных пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    const userInfo = api.getUserInfo();
    
    userInfo
    .then((infoObj) => {
      
      setCurrentUser(infoObj);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
    [] // вызовется только один раз при монтировании компонента
  );

  
  //открытие и закрытие модалок
  const [isEditProfilePopupOpen, changeEditProfilePopupState] = React.useState(false);
  
  const [isEditAvatarPopupOpen, changeEditAvatarPopupState] = React.useState(false);

  const [isAddPlacePopupOpen, changeAddPlacePopupState] = React.useState(false);

  const emptySelectedCard = 
    {
      link: '#',
      name: ''
    }
  const [selectedCard, setSelectedCard] = React.useState(emptySelectedCard);
  const [isSelectedCardOpen, changeSelectedCardState] = React.useState(false);


  function handleEditProfileClick() {
    changeEditProfilePopupState(true);
  }
  
  function handleEditAvatarClick() {
    changeEditAvatarPopupState(true);
  }
  
  function handleAddPlaceClick() {
    changeAddPlacePopupState(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    changeSelectedCardState(true);
  }

  function closeAllPopups() {
    changeEditProfilePopupState(false);
    changeEditAvatarPopupState(false);
    changeAddPlacePopupState(false);
    setSelectedCard(emptySelectedCard);
    changeSelectedCardState(false);
    changeInfoTooltipPopupState(false);
  }


  //редактирование профиля
  function handleUpdateUser(userInfoObj) {
    api.setUserInfo(userInfoObj)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });

  }

  function handleUpdateAvatar(avatarInfoObj) {
    api.setUserAvatar(avatarInfoObj)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });

  }


  //карточки
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
   
    api.getCardList()
    .then((cardsArray) => {
      setCards(cardsArray);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
    [] // вызовется только один раз при монтировании компонента
  );

  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((res) => {
      console.log(res);
      const newCards = cards.filter((c) => c._id !== card._id);

      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(cardInfo) {

    api.addNewCard(cardInfo)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });

  }


  //авторизация
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleUserEmail(email) {
    setUserEmail(email);
  }

  React.useEffect(() => { //tokenCheck
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleUserEmail(res.data.email);
            handleLogin();
            history.push('/');
          }
        })
    } 
  }, [history])


  //кнопки Header
  const [urlAdress, setUrlAdress] = React.useState('');
  const [urlName, setUrlName] = React.useState('');
  const [location, setLocation] = React.useState(window.location.pathname);

  const loc = useLocation();

  React.useEffect(() => {
    setLocation(loc.pathname);
  }, [loc]);
  

  React.useEffect(() => {
    if (!loggedIn) {
      return
    } else if (location === '/') {
      setUrlAdress('/sing-in');
      setUrlName('Выйти');
    }
  }, [location, loggedIn]);
  
  React.useEffect(() => {
    if (location === '/sing-up') {
      setUrlAdress('/sing-in');
      setUrlName('Войти');
    } else if (location === '/sing-in') {
      setUrlAdress('/sing-up');
      setUrlName('Регистрация');
    }
  }, [loggedIn, location]);


  //попап результата регистрации
  const [isInfoTooltipPopupOpen, changeInfoTooltipPopupState] = React.useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState('');
  const [infoTooltipImage, setInfoTooltipImage] = React.useState('');

  function handleAuthenticationResult({message, image}) {
    changeInfoTooltipPopupState(true);
    setInfoTooltipMessage(message);
    setInfoTooltipImage(image);
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
        email={userEmail} 
        urlAdress={urlAdress}
        urlName={urlName}
        onUserEmail={handleUserEmail}
        history={history}
        />
          <Switch>

            <Route path="/sing-up">
              <Register onRegister={handleAuthenticationResult} history={history} />
            </Route>  

            <Route path="/sing-in">
              <Login 
                onLogin={handleLogin} 
                onLoginResult={handleAuthenticationResult}
                onUserEmail={handleUserEmail}
                history={history} 
              />
            </Route> 

            <ProtectedRoute path="/" loggedIn={loggedIn} component={Main} 
              onEditProfile={handleEditProfileClick} 
              onEditAvatar={handleEditAvatarClick} 
              onAddPlace={handleAddPlaceClick}
              cards={cards} 
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />                 

          </Switch>

          {loggedIn && <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />} 
        
          {loggedIn && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> }

          {loggedIn && <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} /> }

          {loggedIn && <PopupWithForm modalName="type_delete-confirm" formName="delete-confirm-form" title="Вы уверены?" buttonValue="Да" onClose={closeAllPopups} /> }

          {loggedIn && <ImagePopup card={selectedCard} isOpen={isSelectedCardOpen} onClose={closeAllPopups} />}

          <InfoTooltip 
               isOpen={isInfoTooltipPopupOpen} 
               onClose={closeAllPopups}
               tooltipImage={infoTooltipImage}
               tooltipMessage={infoTooltipMessage}
              />

          <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
