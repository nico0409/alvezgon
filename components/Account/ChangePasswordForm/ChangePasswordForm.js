import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

export const ChangePasswordForm = (props) => {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user._id,
        values.password,
        logout
      );
      if (!response) {
        toast.error("Error al actualizar el password");
      } else {
        toast.success("Password actualizado correctamente");
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambia tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Form.Input
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Guardar
        </Button>
      </Form>
    </div>
  );
};
const initialValues = () => {
  return {
    password: "",
    confirmPassword: "",
  };
};
const validationSchema = () => {
  return {
    password: Yup.string().required(true).min(6, true),
    confirmPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password"), null], true),
  };
};
