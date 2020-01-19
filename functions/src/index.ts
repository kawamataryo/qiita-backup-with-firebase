import * as functions from "firebase-functions";
import { fetchCurrentUserAllItems } from "./lib/client";
import { addItemsToFirestore } from "./lib/firestore";

const REGION = "asia-northeast1";
const BACKUP_SCHEDULE = "0 9 * * 1";

export const backupQiitaItems = functions
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

export const scheduledBackupQiitaItems = functions.pubsub
  .schedule(BACKUP_SCHEDULE)
  .onRun(async _context => {
    try {
      const items = await fetchCurrentUserAllItems();
      await addItemsToFirestore(items);
      console.log(`Successfully saved ${items.length} items.`);
    } catch (e) {
      console.log(`A error has occurred.${e}`);
    }
  });
