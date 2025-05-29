"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
import styles from "./index.module.css";

interface AddFootnoteProps {
    reportId: string;
}

const AddFootnote = ({ reportId }: AddFootnoteProps) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!content.trim()) return;
        setLoading(true);
        await addDoc(collection(db, "footnotes"), {
            reportId,
            content,
            createdAt: new Date(),
        });
        setContent("");
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <textarea
                className={styles.textarea}
                placeholder="Write a footnote..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                className={styles.button}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Saving..." : "Add Footnote"}
            </button>
        </div>
    );
};

export default AddFootnote;
