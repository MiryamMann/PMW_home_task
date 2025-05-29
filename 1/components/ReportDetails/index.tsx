import { useEffect, useState } from "react";
import { getReport } from "@/lib/api";
import Footnotes from "../Footnotes";
import AddFootnote from "@/components/AddFootnote";
import styles from "./index.module.css";

interface Report {
    id: string;
    title: string;
    content: string; 
    createdAt: number;
    tags?: string[];
}

interface ReportDetailsProps {
    reportId: string;
    lang: "en" | "he";
}

const ReportDetails = ({ reportId, lang }: ReportDetailsProps) => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getReport(lang, reportId);
            setReport(data);
            setLoading(false);
        };
        load();
    }, [reportId, lang]);

    if (loading) return <p className={styles.loading}>Loading report...</p>;
    if (!report) return <p className={styles.error}>Report not found.</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{report.title}</h1>
            <p className={styles.date}>{new Date(report.createdAt).toLocaleString()}</p>
            <div className={styles.content}>{report.content}</div>

            <AddFootnote reportId={report.id} />
            <Footnotes reportId={report.id} />
        </div>
    );
};

export default ReportDetails;
