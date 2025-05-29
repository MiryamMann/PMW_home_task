import { useEffect, useState } from "react";
import { getLatestReports } from "@/lib/api";
import styles from "./index.module.css";

interface Report {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    tags?: string[];
}

interface LatestReportsProps {
    lang: "en" | "he";
    count?: number;
}

const LatestReports = ({ lang, count = 5 }: LatestReportsProps) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getLatestReports(lang, count);
            setReports(data);
            setLoading(false);
        };
        load();
    }, [lang, count]);

    if (loading) return <p className={styles.loading}>Loading latest reports...</p>;
    if (!reports.length) return <p className={styles.empty}>No reports found.</p>;

    return (
        <ul className={styles.list}>
            {reports.map((r) => (
                <li key={r.id} className={styles.item}>
                    <h3 className={styles.title}>{r.title}</h3>
                    <p className={styles.date}>{new Date(r.createdAt).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    );
};

export default LatestReports;
