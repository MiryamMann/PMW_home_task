import { Button } from "@/components/ui/button";
import styles from "./index.module.css";

const SupportUs = () => (
  <section className={styles.section}>
    <h2 className={styles.heading}>Support Our Work</h2>
    <p className={styles.paragraph}>
      PMW relies on donations to continue our work. Your support enables us to expand our research, reach more audiences, and make a lasting impact.
    </p>
    <p className={styles.paragraph}>
      Help us promote peace and accountability by supporting Palestinian Media Watch.
    </p>
    <Button className={styles.button}>Donate Now</Button>
  </section>
);

export default SupportUs;
