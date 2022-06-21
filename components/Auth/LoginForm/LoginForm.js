const LoginForm = (props) => {
  const { showRegisterForm } = props;
  return (
    <div>
      <div className="login-form">
        <div className="login-form__title">
          <h2>Inicia session</h2>
        </div>
        <div className="login-form__content">
          <div className="login-form__content__input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="login-form__content__input">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" />
          </div>
          <div className="login-form__content__button">
            <button>Iniciar session</button>
          </div>
          <div className="login-form__content__button">
            <button onClick={showRegisterForm}>Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
