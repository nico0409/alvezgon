import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = (props) => {
  const [showLogin, setSohwLogin] = useState(true);
  const { onCloseModal, setTitleModal } = props;

  const showLoginForm = () => {
    setTitleModal("Iniciar sesion");
    setSohwLogin(true);
  };
  const showRegisterForm = () => {
    setTitleModal("Registrate");
    setSohwLogin(false);
  };

  return showLogin ? (
    <LoginForm
      showRegisterForm={showRegisterForm}
      onCloseModal={onCloseModal}
    />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
};

export default Auth;
