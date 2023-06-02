import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoToolTip from "./InfoTooltip";
import * as apiAuth from "../utils/ApiAuth";
import RegistrationSuccess from "../images/RegistrationSuccess.svg";
import RegistrationNotSuccess from "../images/RegistrationNotSuccess.svg";

import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isPopupImageOpen, setIsPopupImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = React.useState(false);
  const [isLoadingAddPlaceSubmit, setIsLoadingAddPlaceSubmit] =
    React.useState(false);
  const [isLoadingUpdateAVatar, setIsLoadingUpdateAvatar] =
    React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(null);

  const navigate = useNavigate();
  const [infoToolTipData, setInfoToolTipData] = useState({
    title: "",
    logo: "",
  });

  function handleRegisterUser(email, password) {
    apiAuth
      .register(email, password)
      .then(() => {
        setInfoToolTipData({
          logo: RegistrationSuccess,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/signin");
      })
      .catch((err) => {
        setInfoToolTipData({
          logo: RegistrationNotSuccess,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      })
      .finally(handleOpenInfoToolTipPopup);
  }

  function handleAuthUser(email, password) {
    apiAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setInfoToolTipData({
            logo: RegistrationSuccess,
            title: "Вы успешно вошли!",
          });
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoToolTipData({
          logo: RegistrationNotSuccess,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      })
      .finally(handleOpenInfoToolTipPopup);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setHeaderEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  function handleSignIn() {
    navigate("/signin");
  }

  function handleSignUp() {
    navigate("/signup");
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err));

    api
      .handleGetCards()
      .then((cardsData) => {
        setCards(
          cardsData.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupImageOpen(false);
    setIsInfoToolTipOpen(null);
  }

  function closeInfoToolTip() {
    setIsInfoToolTipOpen(null);
  }
  const handleOpenEditProfilePopup = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleOpenEditAvatarPopup = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleOpenAddPlacePopup = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPopupImageOpen(true);
  };

  const handleOpenInfoToolTipPopup = () => {
    setIsInfoToolTipOpen(true);
  };

  const isAnyPopupOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isPopupImageOpen ||
    isInfoToolTipOpen;

  React.useEffect(() => {
    function closeAllPopupsEscapeClick(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isAnyPopupOpened) {
      document.addEventListener("keydown", closeAllPopupsEscapeClick);
      return () => {
        document.removeEventListener("keydown", closeAllPopupsEscapeClick);
      };
    }
  }, [isAnyPopupOpened]);

  const closeAllPopupsOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .handleLikeAdd(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
    api
      .handleLikeRemove(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .handleRemoveCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoadingUpdateUser(true);
    api
      .setUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUpdateUser(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlaceSubmit(true);
    api
      .handleCreateCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingAddPlaceSubmit(false));
  }

  function handleUpdateAvatar(photo) {
    setIsLoadingUpdateAvatar(true);
    api
      .setUserAvatar(photo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingUpdateAvatar(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Header onClick={handleSignIn} buttonText={`Вход`} />

                  <Register onRegister={handleRegisterUser} />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header onClick={handleSignUp} buttonText={`Регистрация`} />
                  <Login onLogin={handleAuthUser} />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header onClick={handleSignIn} buttonText={`Войти`} />

                  <Register
                    // isOpen={isRegistrationPopupOpen}
                    // onClose={closeAllPopups}
                    // onOverlayClose={closeAllPopupsOverlayClick}
                    onRegister={handleRegisterUser}
                  />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    onClick={handleSignOut}
                    headerEmail={headerEmail}
                    buttonText={`Выйти`}
                    route=""
                  />
                  <ProtectedRoute
                    component={Main}
                    cards={cards}
                    onEditProfile={handleOpenEditProfilePopup}
                    onEditAvatar={handleOpenEditAvatarPopup}
                    onAddPlace={handleOpenAddPlacePopup}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    isLoggedIn={isLoggedIn}
                  />

                  <Footer />
                </>
              }
            />
          </Routes>

          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            title={infoToolTipData.title}
            logo={infoToolTipData.logo}
            buttonText={""}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsOverlayClick}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsOverlayClick}
            onLoading={isLoadingUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsOverlayClick}
            onLoading={isLoadingAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsOverlayClick}
            onLoading={isLoadingUpdateAVatar}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isPopupImageOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsOverlayClick}
          />

          <PopupWithForm name="delete-card" title="Вы уверены?">
            <button
              name="submit__button"
              type="submit"
              className="popup__save-button popup-delete-button"
              aria-label="Да"
            >
              Да
            </button>
          </PopupWithForm>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
