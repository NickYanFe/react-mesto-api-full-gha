import React from "react";
import logo from "../images/logo.svg";

function Header({ onClick, buttonText, headerEmail }) {
  const headerButtonClick = () => {
    onClick(true);
  };

  return (
    <div className="header">
      <img src={logo} alt=" Место. Россия." className="header__logo" />
      <section className="header__menu">
        <p className="header__user-email">{headerEmail}</p>
        <button onClick={headerButtonClick} className="header__button">
          {buttonText}
        </button>
      </section>
    </div>
  );
}

export default Header;
