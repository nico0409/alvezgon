import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

export default function RegisterForm(props) {
  const { showLoginForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await registerApi(values);

      if (response?.jwt) {
        // showLoginForm();
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("Rrror al registrar el usuario intentelo mas tarde", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          pauseOnFocusLoss: true,
        });
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellido"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contrase??a"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" onClick={showLoginForm}>
          Iniciar sesi??n
        </Button>
        <Button className="submit" type="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

const initialValues = () => {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    name: Yup.string()
      .required("El nombre es requerido")
      .max(20, "El nombre no puede tener mas de 20 caracteres"),
    lastname: Yup.string()
      .required("El apellido es requerido")
      .max(20, "El apellido no puede tener mas de 20 caracteres"),
    username: Yup.string()
      .required("El nombre de usuario es requerido")
      .max(20, "El nombre de usuario no puede tener mas de 20 caracteres"),
    email: Yup.string()
      .required("El email es requerido")
      .email("El email no es valido"), //validacion de email
    password: Yup.string()
      .required("La contrase??a es requerida")
      .min(8, "La contrase??a debe tener al menos 8 caracteres"),
  };
};
