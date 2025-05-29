"use client";

import { useState, useEffect } from "react";
import TagSelector from "@/components/TagSelector";
import ReportsByTag from "../ReportByTag";
import styles from "./index.module.css";

export interface Report {
  id: string;
  title: string;
  createdAt: number;
  tags?: string[];
}

interface HomePageProps {
  defaultTag?: string;
  initialReports?: Report[];
}

const TAGS = ["israel", "protest", "politics", "security", "education"];

const HomePage = ({ defaultTag = "he", initialReports = [] }: HomePageProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(defaultTag);
  const [lang, setLang] = useState<"en" | "he">("he");
  const [reports, setReports] = useState<Report[]>(initialReports);

  useEffect(() => {
    setSelectedTag(defaultTag);
    setReports(initialReports);
  }, [defaultTag, initialReports]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <label className="mr-2 font-medium">שפה:</label>
        <select
          className={styles.select}
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "he")}
        >
          <option value="he">עברית</option>
          <option value="en">English</option>
        </select>

        <TagSelector
          tags={TAGS}
          selectedTag={selectedTag}
          onSelect={setSelectedTag}
        />
      </div>

      {selectedTag ? (
        <ReportsByTag tag={selectedTag} lang={lang} />
      ) : (
        <p className="text-gray-500 text-center mt-6">בחרי תגית להצגת דוחות.</p>
      )}
    </div>
  );
};

export default HomePage;
