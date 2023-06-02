import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
      onClick={props.onOverlayClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
        <p className="popup__header">{`${props.title}`}</p>
        <form
          className="popup__form"
          name={`${props.name}-form`}
          noValidate
          onSubmit={props.onSubmit}
          action="#"
          method="get"
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
