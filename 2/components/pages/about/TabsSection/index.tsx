import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutHeader from "../AboutHeader";
import OurStory from "../OurStory";
import Team from "../Team";
import styles from "./index.module.css";

// טיפוס לפרופס lang
interface TabsSectionProps {
  lang: "en" | "he";
}

const TabsSection = ({ lang }: TabsSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.heading}>Learn More</h2>
    <Tabs defaultValue="about" className={styles.tabs}>
      <TabsList className={styles.tabsList}>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="about" className={styles.tabsContent}>
        <AboutHeader lang={lang} />
        <OurStory />
      </TabsContent>
      <TabsContent value="team" className={styles.tabsContent}>
        <Team />
      </TabsContent>
    </Tabs>
  </section>
);

export default TabsSection;
