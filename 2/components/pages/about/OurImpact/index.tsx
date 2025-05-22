import { Check } from "@mui/icons-material";
import styles from "./index.module.css";

const OurImpact = () => {
  const points = [
    "Been cited by government officials in policy discussions",
    "Informed international media coverage on Palestinian issues",
    "Contributed to changes in foreign aid policies",
    "Raised awareness about the content of Palestinian education",
    "Provided crucial context for peace negotiations",
  ];

  return (
    <>
      <h2 className={styles.heading}>Our Impact</h2>
      <p className={styles.paragraph}>
        Since our founding in 1996, Palestinian Media Watch has become a leading authority on Palestinian media and society. Our work has:
      </p>
      <div className={styles.grid}>
        {points.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <Check className={styles.icon} />
            <p className="text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
      <p className={styles.lastParagraph}>
        We strive to provide accurate, timely, and actionable information to promote peace and understanding in the region.
      </p>
    </>
  );
};

export default OurImpact;
