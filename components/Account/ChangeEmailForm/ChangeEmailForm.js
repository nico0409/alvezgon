import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

const ChangeEmailForm = (props) => {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (Data) => {
      setLoading(true);
      const response = await updateEmailApi(user._id, Data.email, logout);

      if (!response || response.statusCode === 400) {
        toast.error("Error al actualizar el email");
      } else {
        setReloadUser(true);
        formik.handleReset();
        toast.success("Email actualizado correctamente");
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu correo electrónico{" "}
        <span>(Tu email actual: {user.email})</span>
      </h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="Nuevo email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            placeholder="Confirmar email"
            name="confirmEmail"
            onChange={formik.handleChange}
            value={formik.values.confirmEmail}
            error={formik.errors.confirmEmail}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
};

export default ChangeEmailForm;

const initialValues = () => {
  return {
    email: "",
  };
};
const validationSchema = () => {
  return {
    email: Yup.string().email(true).required(true),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], true)
      .required(true),
  };
};
