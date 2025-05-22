import { milestones } from "./data/milestones";
import styles from "./index.module.css";

const Timeline = () => {
  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Key Milestones</h3>
      <div className={styles.grid}>
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className={styles.card}>
            <div className={styles.lineWrapper}>
              <div className={styles.dot} />
              <div
                className={
                  index === 0 || index === milestones.length - 1
                    ? styles.halfLine
                    : styles.fullLine
                }
              />
              {(index === 0 || index === milestones.length - 1) && (
                <div className={styles.dottedLine} />
              )}
            </div>
            <div className="mt-2 px-4 text-center">
              <p className={styles.year}>{milestone.year}</p>
              <p className={styles.event}>{milestone.event}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
