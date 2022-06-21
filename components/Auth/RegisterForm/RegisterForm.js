import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const RegisterForm = (props) => {
  const { showLoginForm } = props;
  return (
    <Form className="login-form">
      <Form.Input name="name" type="text" placeholder="Nombre" />
      <Form.Input name="lastname " type="text" placeholder="Apellido" />
      <Form.Input
        name="username "
        type="text"
        placeholder="Nombre de Usuario"
      />
      <Form.Input name="email" type="email" placeholder="Email" />
      <Form.Input name="password" type="password" placeholder="Contraseña" />
      <div className="actions">
        <Button type="button" onClick={showLoginForm}>
          Iniciar sesion
        </Button>
        <Button className="submit" type="submit">
          Registrarse
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
