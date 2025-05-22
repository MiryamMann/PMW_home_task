import Image from "next/image";
import styles from "./index.module.css";

const HeroImage = () => (
  <div className={styles.wrapper}>
    <Image
      src="/assets/misc/pmw-cover.jpeg"
      alt="PMW researchers at work"
      fill
      className={styles.image}
    />
  </div>
);

export default HeroImage;
