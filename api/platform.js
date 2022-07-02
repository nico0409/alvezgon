import { BASE_PATH } from "../utils/constants";

export const getPlatformsApi = async (logout) => {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:asc`;
    const response = await fetch(url);

    if (response.statusCode === 500) {
      throw new Error("Error al obtener las plataformas");
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
