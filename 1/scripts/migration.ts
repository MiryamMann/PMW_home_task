import {
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

async function migrateReports() {
  const langs = ["he", "en"];

  for (const lang of langs) {
    // המקור – המבנה הישן
    const oldCol = collection(db, "reports", "lang", lang);
    const snapshot = await getDocs(oldCol);

    for (const document of snapshot.docs) {
      const data = document.data();

      // היעד – המבנה התקני
      const newRef = doc(db, "reports", "lang", lang, document.id);
      await setDoc(newRef, data);

      console.log(`✅ העברנו: ${document.id}`);
    }
  }

  console.log("🚀 הסתיים בהצלחה");
}
