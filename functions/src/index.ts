import * as functions from "firebase-functions";
import { fetchCurrentUser, fetchPosts } from "./scripts/client";
import * as admin from "firebase-admin";
import { Item } from "./@types/qiita-type";

admin.initializeApp();

const MAX_PER_PAGE = 100;

export const backupToQiitaItems = functions.https.onRequest(
  async (_request, response) => {
    // Fetch qiita items count from current user data
    const currentUserData = await fetchCurrentUser();
    const itemsCount = currentUserData.data.items_count;

    // Fetch qiita items;
    let items: Item[] = [];
    try {
      await Promise.all(
        [...Array(Math.ceil(itemsCount / MAX_PER_PAGE)).keys()].map(async i => {
          const res = await fetchPosts(i + 1, MAX_PER_PAGE);
          items = [...items, ...res.data];
        })
      );
    } catch (e) {
      console.log(e);
      response.status(400).send("Server error");
      return;
    }

    console.log(items.length);
    // Backup qiita items to firestore;
    try {
      await Promise.all(
        items.map(async item => {
          await admin
            .firestore()
            .collection("sample2")
            .add(item);
        })
      );
    } catch (e) {
      console.log(e);
      response.status(400).send("Server error");
      return;
    }

    response.status(200).send("backup ok");
  }
);
