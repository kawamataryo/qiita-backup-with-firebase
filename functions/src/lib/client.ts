import axios, { AxiosResponse } from "axios";
import * as functions from "firebase-functions";
import { Item, User } from "../@types/qiita-type";

axios.defaults.baseURL = "https://qiita.com/api/v2";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  functions.config().qiita.key
}`;

const MAX_PER_PAGE = 100;

export const fetchItems = async (
  page: number,
  perPage: number
): Promise<AxiosResponse<Item[]>> => {
  return await axios.get<Item[]>(
    `/authenticated_user/items?page=${page}&per_page=${perPage}`
  );
};

export const fetchCurrentUser = async (): Promise<AxiosResponse<User>> => {
  return await axios.get<User>("/authenticated_user");
};

export const fetchCurrentUserAllItems = async (): Promise<Item[]> => {
  // Get Qiita items count from current user data
  const currentUserData = await fetchCurrentUser();
  const itemsCount = currentUserData.data.items_count;

  // Fetch all items;
  let items: Item[] = [];
  await Promise.all(
    [...Array(Math.ceil(itemsCount / MAX_PER_PAGE)).keys()].map(async i => {
      const res = await fetchItems(i + 1, MAX_PER_PAGE);
      items = [...items, ...res.data];
    })
  );
  return items;
};
