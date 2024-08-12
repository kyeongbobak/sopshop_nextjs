import StyledLink from "next/link";
import Image from "next/image";
import logoImage from "../public/assets/img/Logo-SopShop.png";
import menuBtnImage from "../public/assets/img/menu_icon.png";
import styles from "../styles/topNavBar.module.css";

export default function Navigation() {
  return (
    <div className={styles.wrapper}>
      <StyledLink href={"/"}>
        <Image className={styles.logoImage} src={logoImage} alt="Logo" priority />
      </StyledLink>
      <ul className={styles.navBar}>
        <li>
          <StyledLink href={"/cart"}>Cart</StyledLink>
        </li>
        <li>
          <button>
            <Image className={styles.menuBtnImage} src={menuBtnImage} />
          </button>
        </li>
      </ul>
    </div>
  );
}
