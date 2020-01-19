import * as functions from "firebase-functions";
import { fetchCurrentUserAllItems } from "./lib/client";
import { addItemsToFirestore } from "./lib/firestore";

const REGION = "asia-northeast1";

export const backupToQiitaItems = functions
  .region(REGION)
  .https.onRequest(async (_req, res) => {
    try {
      const items = await fetchCurrentUserAllItems();
      await addItemsToFirestore(items);
      res.status(200).send(`Successfully saved ${items.length} items.`);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .send("A server error has occurred. Check logs in firebase console.");
    }
  });
