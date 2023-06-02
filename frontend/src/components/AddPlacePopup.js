import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onAddPlace,
  onClose,
  onOverlayClose,
  onLoading,
}) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"new-place"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
      buttonText={onLoading ? "Сохраняю" : "Создать"}
    >
      <input
        name="name"
        id="new-place"
        type="text"
        className="popup__input popup__input_type_place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handleChangePlaceName}
      />
      <span className="new-place-error popup__input-error"></span>
      <input
        name="link"
        id="link"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        value={placeLink}
        onChange={handleChangePlaceLink}
      />
      <span className="link-error popup__input-error"></span>
      {/* <button
        name="submit__button"
        type="submit"
        className="popup__save-button"
        aria-label="Создать"
      >
        Создать
      </button> */}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
