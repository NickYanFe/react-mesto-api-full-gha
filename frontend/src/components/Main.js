import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElement = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__header">
          <button
            onClick={() => {
              onEditAvatar(true);
            }}
            className="profile__logo-edit-button"
          >
            <img
              src={currentUser.avatar}
              alt=" Аватар пользователя."
              className="profile__logo"
            />
          </button>

          <div className="profile__edit" aria-label="закрыть">
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onEditProfile(true);
              }}
              className="profile__edit-button"
              aria-label="Редактирование"
            ></button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onAddPlace(true);
          }}
          className="profile__add-button"
          aria-label="Добавление"
        ></button>
      </section>
      <section className="elements__grid">{cardsElement}</section>
    </main>
  );
}

export default Main;
