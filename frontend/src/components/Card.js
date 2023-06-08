// import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id; //определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((id) => id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`; // Создаём переменную, которую после зададим в `className` для кнопки лайка

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="element">
      <div className="element__image-wrapper">
        <button type="button" className="popup__fp-button" aria-label="Открыть">
          <img
            className="element__image"
            src={card.link}
            alt={card.name}
            onClick={handleCardClick}
          />
        </button>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <h2 className="element__like-counter">{card.likes.length}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
