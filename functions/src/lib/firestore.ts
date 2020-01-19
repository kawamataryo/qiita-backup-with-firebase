import { Item } from "../@types/qiita-type";
import * as admin from "firebase-admin";
import * as dayjs from "dayjs";

admin.initializeApp();

export const addItemsToFirestore = async (items: Item[]): Promise<void> => {
  // Backup Qiita items to firestore;
  const itemsRef = admin
    .firestore()
    .collection("qiita-backups")
    .doc(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    .collection("items");

  await Promise.all(
    items.map(async item => {
      await itemsRef.add(item);
    })
  );
};
