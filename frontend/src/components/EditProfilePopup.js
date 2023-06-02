import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClose,
  onLoading,
  onOverlayClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [about, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? "Сохраняю" : "Сохранить"}
      onOverlayClose={onOverlayClose}
    >
      <input
        name="name"
        id="name"
        type="text"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="name-error popup__input-error"></span>
      <input
        name="about"
        id="about"
        type="text"
        className="popup__input popup__input_type_job"
        placeholder="Профессия"
        required
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={handleChangeDescription}
      />
      <span className="about-error popup__input-error"></span>
      {/* <button
        name="submit__button"
        type="submit"
        className="popup__save-button"
        aria-label="Сохранить"
      >
        Сохранить
      </button> */}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
