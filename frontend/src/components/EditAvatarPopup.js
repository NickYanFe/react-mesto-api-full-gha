import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
  onLoading,
  onClose,
  onOverlayClose,
}) {
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={onLoading ? "Сохраняю" : "Сохранить"}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
    >
      <input
        name="avatar"
        id="avatar"
        type="url"
        className="popup__input popup__input-avatar-link"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="avatar-error popup__input-error"></span>
      {/* <button
        name="submit__button"
        type="submit"
        className="popup__save-button popup-avatar__update"
        aria-label="Создать"
      >
        Сохранить
      </button> */}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
