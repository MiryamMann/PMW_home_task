import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where
} from "firebase/firestore";
import { db } from "./firebase";

// ✅ טיפוס הדוח המאוחד – כולל content
export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: number; // מספר (ms since epoch)
  tags?: string[];
}

// ✅ שליפת דוחות אחרונים לפי שפה
export async function getLatestReports(
  lang: "en" | "he",
  count: number
): Promise<Report[]> {
  const q = query(
    collection(db, "reports", "lang", lang),
    orderBy("createdAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content || "",
      createdAt: data.createdAt?.seconds * 1000 || Date.now(),
      tags: data.tags || []
    };
  });
}

// ✅ שליפת דוח בודד לפי מזהה
export async function getReport(
  lang: "en" | "he",
  id: string
): Promise<Report> {
  const ref = doc(db, "reports", "lang", lang, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Report not found");

  const data = snap.data();
  return {
    id: snap.id,
    title: data.title,
    content: data.content || "",
    createdAt: data.createdAt?.seconds * 1000 || Date.now(),
    tags: data.tags || []
  };
}

// ✅ שליפת דוחות לפי תגית
export async function getReportsByTag(
  lang: "en" | "he",
  tag: string,
  count: number = 100
): Promise<Report[]> {
  const q = query(
    collection(db, "reports", "lang", lang),
    where("tags", "array-contains", tag),
    orderBy("createdAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content || "",
      createdAt: data.createdAt?.seconds * 1000 || Date.now(),
      tags: data.tags || []
    };
  });
}

// ✅ שליפת הערות שוליים לפי מזהה דוח
export async function getFootnotes(
  reportId: string
): Promise<{ id: string; content: string }[]> {
  // שימוש בתת־collection בשם "items"
  const col = collection(db, "footnotes", reportId, "items");
  const snap = await getDocs(col);
  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      content: data.content
    };
  });
}
