import React from 'react'; 
import { Route, Switch } from 'react-router-dom';
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
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';




function App() {
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


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
        //email={} 
        />
          <Switch>

              <Route exact path="/">
              <Main 
                onEditProfile={handleEditProfileClick} 
                onEditAvatar={handleEditAvatarClick} 
                onAddPlace={handleAddPlaceClick}
                cards={cards} 
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                />

              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
        
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

              <PopupWithForm modalName="type_delete-confirm" formName="delete-confirm-form" title="Вы уверены?" buttonValue="Да" onClose={closeAllPopups} />  

              <ImagePopup card={selectedCard} isOpen={isSelectedCardOpen} onClose={closeAllPopups} />

              <Footer />
            </Route>

            <Route exact path="/sign-up">
              <Register />
              <InfoTooltip />
            </Route>  

            <Route exact path="/sign-in">
              <Login />
            </Route>    

          </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
