function ImagePopup(props) {
  const card = props.card;

  return (
    <div
      className={`popup popup-img ${props.isOpen && "popup_opened"}`}
      onClick={props.onOverlayClose}
    >
      <figure className="popup-img__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup-img__image" src={card.link} alt={card.name} />
        <figcaption className="popup-img__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
