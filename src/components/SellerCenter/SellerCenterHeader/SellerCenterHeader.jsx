import logoImage from "../../../../public/img/Logo-SopShop.png";
import Image from "next/image";
import StyledLink from "next/link";
import styles from "./SellerCenterHeader.module.css";

export default function SellerCenterHeader() {
  return (
    <>
      <div className={styles.wrapper}>
        <StyledLink href={"/"}>
          <Image className={styles.logoImage} src={logoImage} width={200} alt="logoImage" priority={true} />
        </StyledLink>
        <h1 className={styles.title}>판매자 센터</h1>
      </div>
    </>
  );
}
