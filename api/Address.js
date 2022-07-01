import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const createAddressApi = async (address, logout) => {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const response = await authFetch(url, params, logout);
    if (!response) {
      throw new Error("Error al crear la dirección");
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressesApi = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/addresses?users_permissions_user=${idUser}`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await authFetch(url, params, logout);
    if (response.statusCode === 500) {
      throw new Error("Error al obtener las direcciones");
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
