import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const registerApi = async (formData) => {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginApi = async (formData) => {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resetPasswordApi = async (email) => {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMeApi = async (logout) => {
  try {
    const url = `${BASE_PATH}/users/me`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await authFetch(url, params, logout);
    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateNameApi = async (idUser, data, logout) => {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await authFetch(url, params, logout);
    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateEmailApi = async (idUser, email, logout) => {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await authFetch(url, params, logout);
    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePasswordApi = async (idUser, password, logout) => {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const response = await authFetch(url, params, logout);
    return response ? response : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
