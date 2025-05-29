import { useEffect, useState } from "react";
import { getReportsByTag } from "@/lib/api";
import styles from "./index.module.css";

interface Report {
    id: string;
    title: string;
    createdAt: number;
    tags?: string[];
}

interface ReportsByTagProps {
    tag: string;
    lang: "en" | "he";
    count?: number;
}

const ReportsByTag = ({ tag, lang, count = 10 }: ReportsByTagProps) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getReportsByTag(lang, tag, count);
            setReports(data);
            setLoading(false);
        };
        load();
    }, [lang, tag, count]);

    if (loading) return <p className={styles.loading}>Loading reports...</p>;
    if (!reports.length) return <p className={styles.empty}>No reports found for this tag.</p>;

    return (
        <ul className={styles.reportList}>
            {reports.map((r) => (
                <li key={r.id} className={styles.reportItem}>
                    <h3 className={styles.title}>{r.title}</h3>
                    <p className={styles.date}>{new Date(r.createdAt).toLocaleString()}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReportsByTag;
