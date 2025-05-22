import { awards } from "../data/Awards";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/custom/card";
import { EmojiEvents } from "@mui/icons-material";
import styles from "./index.module.css";

const Awards = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Recognition and Awards</h2>

      <div className={styles.grid}>
        {awards.map((item) => (
          <Card key={item.award}>
            <CardHeader>
              <EmojiEvents className="w-6 h-6 text-[#00A99D]" />
              <CardTitle>{item.award}</CardTitle>
              <CardDescription>
                {item.year} - {item.org}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Awards;
