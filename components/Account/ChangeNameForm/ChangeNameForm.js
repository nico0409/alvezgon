import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ChangeNameForm = (props) => {
  const { user } = props;
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="change-name-form">
      <h4>Cambia tu nombr y apellido</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            label="Nombre"
            placeholder="Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            label="Apellido"
            placeholder="Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};
const initialValues = (props) => {
  const { name = "", lastname = "" } = props;
  return {
    name,
    lastname,
  };
};

const validationSchema = () => {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
};
export default ChangeNameForm;
