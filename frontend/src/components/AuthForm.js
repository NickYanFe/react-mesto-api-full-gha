import React from "react";
import { Link } from "react-router-dom";

function AuthForm(props) {
  return (
    <>
      <h1 className="auth__header">{`${props.title}`}</h1>
      <form className="auth__form" noValidate onSubmit={props.onSubmit}>
        {props.children}
        <button className="auth__save" type="submit">
          {props.buttonText || "Сохранить"}
        </button>
        <figcaption className="auth__figcaption">
          {" "}
          {props.buttonFigcaption}
          <Link to="/signin" className="auth__signin-link">
            {" "}
            {props.figcaptionRedirectToLogin}
          </Link>
        </figcaption>
      </form>
    </>
  );
}

export default AuthForm;
