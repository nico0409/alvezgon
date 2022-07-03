import { BASE_PATH } from "../utils/constants";

export const getLastGame = async (limit) => {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItem = `_sort=createdAt:desc`;
    const url = `${BASE_PATH}/games?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesByPlatform = async (platform, limit, start) => {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTotalGamesByPlatform = async (platform) => {
  try {
    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
