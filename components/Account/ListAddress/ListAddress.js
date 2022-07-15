import React, { useState, useEffect, CSSProperties } from "react";
import { Grid, Button } from "semantic-ui-react";
import { getAddressesApi, deleteAddressApi } from "../../../api/Address";
import { map, size } from "lodash";
import useAuth from "../../../hooks/useAuth";
import BeatLoader from "react-spinners/BeatLoader";

const ListAddress = (props) => {
  const { reloadAddresses, setReLoadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  console.log(auth);
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReLoadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (addresses === null)
    return <BeatLoader cssOverride={override} color="#f36100d8" />;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna direccion </h3>
      ) : (
        <Grid>
          {map(addresses, (address, index) => {
            return (
              <Grid.Column key={index} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  logout={logout}
                  setReLoadAddresses={setReLoadAddresses}
                  openModal={openModal}
                />
              </Grid.Column>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default ListAddress;

const Address = (props) => {
  const { address, logout, setReLoadAddresses, openModal } = props;
  const [loading, setLoading] = useState(false);

  const deleteAddress = async () => {
    setLoading(true);
    const response = await deleteAddressApi(address._id, logout);

    if (response) {
      setReLoadAddresses(true);
    }
    setLoading(false);
  };

  return (
    <div className="address">
      <p className="title-address">{address.title}</p>
      <p>
        <p>{address.province}</p>
        <p>{address.city}</p>
        <p>{address.postal_code}</p>
      </p>
      <p>
        <p>{address.street}</p>
        <p>{address.number}</p>
      </p>
      <p>
        <p>{address.floor}</p>
        <p>{address.apartment}</p>
      </p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loading}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
};
