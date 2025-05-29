import { useEffect, useState } from "react";
import { getFootnotes } from "@/lib/api";
import styles from "./index.module.css";

interface Footnote {
    id: string;
    content: string;
}

interface FootnotesProps {
    reportId: string;
}

const Footnotes = ({ reportId }: FootnotesProps) => {
    const [footnotes, setFootnotes] = useState<Footnote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getFootnotes(reportId);
            setFootnotes(data);
            setLoading(false);
        };
        load();
    }, [reportId]);

    if (loading) return <p className={styles.loading}>Loading footnotes...</p>;
    if (!footnotes.length) return <p className={styles.empty}>No footnotes found.</p>;

    return (
        <ul className={styles.footnoteList}>
            {footnotes.map((f) => (
                <li key={f.id} className={styles.footnoteItem}>
                    {f.content}
                </li>
            ))}
        </ul>
    );
};

export default Footnotes;
