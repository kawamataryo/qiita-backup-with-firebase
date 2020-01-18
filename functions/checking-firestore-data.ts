import * as admin from "firebase-admin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./service-account.json");

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount)
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

const countDocuments = async () => {
  const snap = await db.collection("sample2").get();

  console.log(snap.size);
};

countDocuments();
