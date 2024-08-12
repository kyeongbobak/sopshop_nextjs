import StyledLink from "next/link";
import Image from "next/image";
import logoImage from "../../../public/img/Logo-SopShop.png";
import menuBtnImage from "../../../public/img/menu_icon.png";
import styles from "../TopNavBar/TopNavBar.module.css";

export default function TopNavBar() {
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
            <Image className={styles.menuBtnImage} src={menuBtnImage} alt="menuBtnIcon" priority />
          </button>
        </li>
      </ul>
    </div>
  );
}
