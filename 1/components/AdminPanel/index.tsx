"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Report {
  id: string;
  title: string;
  createdAt: { seconds: number };
  tags: string[];
}

export default function AdminPanel() {
  const [reports, setReports] = useState<Report[]>([]);
  const [form, setForm] = useState({ id: "", title: "", tags: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    (window as any).migrateReports = migrateReports;
    loadReports();
  }, []);

  async function migrateReports() {
    const langs = ["he", "en"];
    let moved = 0;

    for (const lang of langs) {
      const oldCol = collection(db, "reports", "lang", lang);
      const snapshot = await getDocs(oldCol);

      for (const document of snapshot.docs) {
        const data = document.data();
        const newRef = doc(db, "reports", "lang", lang, document.id);
        await setDoc(newRef, data);
        moved++;
        console.log(`✅ העברנו: ${document.id}`);
        console.log("📄 copied doc:", document.id, "createdAt =", data.createdAt);
      }
    }

    console.log(`🚀 הסתיים. הועברו ${moved} דוחות.`);
  }

  async function loadReports() {
    const snapshot = await getDocs(collection(db, "reports", "lang", "he"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Report[];
    setReports(data);
  }

  async function saveReport(e: React.FormEvent) {
    e.preventDefault();

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const isEdit = !!editingId;
    const id = isEdit ? editingId : crypto.randomUUID();

    const ref = doc(db, "reports", "lang", "he", id);
    const data = {
      title: form.title,
      tags,
      ...(isEdit ? {} : { createdAt: serverTimestamp() }),
    };

    if (isEdit) {
      await updateDoc(ref, data);
    } else {
      await setDoc(ref, data);
    }

    setForm({ id: "", title: "", tags: "" });
    setEditingId(null);
    loadReports();
  }

  function editReport(r: Report) {
    setForm({
      id: r.id,
      title: r.title,
      tags: r.tags.join(", "),
    });
    setEditingId(r.id);
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("את בטוחה שברצונך למחוק את הדוח?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "reports", "lang", "he", id));
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("שגיאה במחיקת הדוח:", error);
      alert("מחיקה נכשלה");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">🛠️ ממשק ניהול דוחות</h2>

      <form onSubmit={saveReport} className="space-y-3">
        <input
          type="text"
          placeholder="כותרת"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="תגיות (מופרדות בפסיק)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "עדכון דוח" : "יצירת דוח"}
        </button>
      </form>

      <hr />

      <ul className="space-y-3">
        {reports.map((r) => (
          <li key={r.id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <strong>{r.title}</strong> <br />
              <small className="text-sm text-gray-500">{r.tags?.join(", ")}</small>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => editReport(r)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                עריכה
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                מחיקה
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
