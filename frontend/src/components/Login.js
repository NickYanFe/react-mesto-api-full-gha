import AuthForm from "./AuthForm";
import React from "react";

function Login({
  isLoggedIn,
  isOpen,
  onLogin,
  onLoading,
  onClose,
  onOverlayClose,
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
    onLogin(email, password);
  }

  if (isLoggedIn) {
    return <redirect to="/" />;
  }

  return (
    <AuthForm
      name={"Login"}
      title={"Вход"}
      isOpen={isOpen}
      buttonText={onLoading ? "Вхожу" : "Вход"}
      buttonFigcaption={""}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      <input
        name="Email"
        type="email"
        className="popup__input auth__input"
        placeholder="Email"
        required
        minLength="2"
        maxLength="30"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        name="Password"
        type="password"
        className="popup__input auth__input"
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

export default Login;
