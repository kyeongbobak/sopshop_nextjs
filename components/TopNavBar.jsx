import Image from "next/image";
import styles from "../styles/topnavbar.module.css";
import LogoImage from "../public/assets/images/Logo-SopShop.png";

export default function Navigation() {
  return (
    <div>
      <a>
        <Image className={styles.image} src={LogoImage} alt="Logo" priority />
      </a>
      <ul></ul>
    </div>
  );
}
