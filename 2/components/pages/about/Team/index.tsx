import { team } from "./data/Team";
import styles from "./index.module.css";

const Team = () => (
  <section className={styles.section}>
    <h2 className={styles.heading}>Meet the Team</h2>
    <div className={styles.grid}>
      {team.map((member) => (
        <div key={member.name} className={styles.memberRow}>
          <p className={styles.memberName}>{member.name}</p>
          <p className={styles.memberRole}>{member.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Team;
