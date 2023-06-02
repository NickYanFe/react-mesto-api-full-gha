import React from "react";
import AuthForm from "./AuthForm";

function Register({
  isOpen,
  onLoading,
  onClose,
  onOverlayClose,
  onRegister,
  isLoggedIn,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  if (isLoggedIn) {
    return <redirect to="/" />;
  }

  return (
    <AuthForm
      name={"register"}
      title={"Регистрация"}
      isOpen={isOpen}
      buttonText={onLoading ? "Регистрирую" : "Регистрация"}
      buttonFigcaption={"Уже зарегистрированы?"}
      figcaptionRedirectToLogin={"Войти"}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input
        name="email"
        type="email"
        className="auth__input"
        placeholder="email"
        required
        minLength="2"
        maxLength="30"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        name="password"
        type="password"
        className="auth__input"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="30"
        onChange={handlePasswordChange}
        value={password}
      />
    </AuthForm>
  );
}

export default Register;
