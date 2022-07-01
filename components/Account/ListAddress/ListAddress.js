import React, { useState, useEffect } from "react";
import { getAddressesApi } from "../../../api/Address";
import useAuth from "../../../hooks/useAuth";

const ListAddress = () => {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return <div>ListAddress</div>;
};

export default ListAddress;
