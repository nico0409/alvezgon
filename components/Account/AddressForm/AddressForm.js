import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";
import { createAddressApi, updateAddressApi } from "../../../api/Address";
import { toast } from "react-toastify";

export const AddressForm = (props) => {
  console.log(AddressForm);
  const { setShowModal, setReLoadAddresses, address, newAdrress } = props;
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (values) => {
      newAdrress ? createAddress(values) : updateAddress(values);
    },
  });

  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = { ...formData, users_permissions_user: auth.idUser };
    const response = await createAddressApi(formDataTemp, logout);
    if (response) {
      formik.resetForm();
      toast.success("Dirección creada correctamente");
      setShowModal(false);
      setReLoadAddresses(true);
    } else {
      toast.error("Error al crear la dirección");
    }
    setLoading(false);
  };

  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = { ...formData, users_permissions_user: auth.idUser };
    const response = await updateAddressApi(formDataTemp, logout);
    if (response) {
      formik.resetForm();
      toast.success("Dirección actualizada correctamente");
      setShowModal(false);
      setReLoadAddresses(true);
    } else {
      toast.error("Error al actualizar la dirección");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        label="Titulo Dirección"
        placeholder=" Titulo Dirección"
        name="title"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        error={formik.errors.title}
      />

      <Form.Group widths="equal">
        <Form.Input
          placeholder="Ciudad"
          name="city"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          placeholder="Provincia"
          name="province"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.province}
          error={formik.errors.province}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Calle"
          name="street"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
          error={formik.errors.street}
        />
        <Form.Input
          placeholder="Número"
          name="number"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.number}
          error={formik.errors.number}
        />
        <Form.Input
          placeholder="Código postal"
          name="postalCode"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
      </Form.Group>
      <Form.Input
        placeholder="Entre calles"
        name="betweenStreets"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.betweenStreets}
        error={formik.errors.betweenStreets}
      />
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Piso"
          name="floor"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.floor}
          error={formik.errors.floor}
        />
        <Form.Input
          placeholder="Departamento"
          name="department"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.department}
          error={formik.errors.department}
        />
      </Form.Group>
      <div className="form__actions">
        <Button type="submit" className="submit" loading={loading}>
          {newAdrress ? "Crear" : "Actualizar"}
        </Button>
      </div>
    </Form>
  );
};

export default AddressForm;

const initialValues = (address) => {
  return address
    ? { ...address }
    : {
        title: "",
        city: "",
        province: "",
        street: "",
        number: "",
        postalCode: "",
        betweenStreets: "",
        floor: "",
        department: "",
      };
};
const validationSchema = () => {
  return {
    title: Yup.string().required(true),
    city: Yup.string().required(true),
    province: Yup.string().required(true),
    street: Yup.string().required(true),
    number: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    betweenStreets: Yup.string().required(true),
    floor: Yup.string().required(true),
    department: Yup.string().required(true),
  };
};
