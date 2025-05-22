import { AboutHeaderProps } from "@/models/props/props"; // ✅ שימוש נתמך לפי תקן PMW
import { strings } from "@/lib/strings";
import styles from "./index.module.css";

const AboutHeader = ({ lang }: AboutHeaderProps) => (
  <section className={styles.section}>
    <h1 className={styles.title}>
      {strings[lang].about} {strings[lang].name}
    </h1>
    <p className={styles.description}>
      Palestinian Media Watch is a non-profit organization dedicated to fostering peace by exposing hate and promoting understanding in Palestinian society.
    </p>
  </section>
);

export default AboutHeader;
