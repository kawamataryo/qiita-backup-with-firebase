import axios from "axios";
import * as functions from "firebase-functions";
import { Item, User } from "../@types/qiita-type";

axios.defaults.baseURL = "https://qiita.com/api/v2";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  functions.config().qiita.key
}`;

export const fetchPosts = async (page: number, perPage: number) => {
  return await axios.get<Item[]>(
    `/authenticated_user/items?page=${page}&per_page=${perPage}`
  );
};

export const fetchCurrentUser = async () => {
  return await axios.get<User>("/authenticated_user");
};
