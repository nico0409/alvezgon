import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export const isFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await authFetch(url, params, logout);
    if (response.statusCode === 500) {
      throw new Error("Error al obtener los favoritos");
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_permissions_user: idUser,
        game: idGame,
      }),
    };
    const response = await authFetch(url, params, logout);
    if (response.statusCode === 500) {
      throw new Error("Error al agregar al favorito");
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteFavoriteApi = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout);

    if (size(dataFound) > 0) {
      const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await authFetch(url, params, logout);
      if (response.statusCode === 500) {
        throw new Error("Error al eliminar del favorito");
      } else {
        return response;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFavoriteApi = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await authFetch(url, params, logout);
    if (response.statusCode === 500) {
      throw new Error("Error al obtener los favoritos");
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
