import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup-infotooltip ${props.isOpen && "popup_opened"}`}
      onClick={props.onOverlayClose}
    >
      <div className="popup__container popup-infotooltip__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup-infotooltip__logo" src={`${props.logo}`}></img>

        <p className="popup__header popup-infotooltip__header">{`${props.title}`}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;
