"use client";

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import StyledLink from "next/link";
import styles from "./SellerCenterHeader.module.css";

export default function SellerCenterHeader() {
  return (
    <>
      <div className={styles.wrapper}>
        <StyledLink href={"/"}>
          <Image className={styles.logoImage} src={logoImage} width={200} alt="logoImage" priority={true} />
        </StyledLink>
        <h1 className={styles.title}>
          <Link href="/dashboard">판매자 센터</Link>
        </h1>
      </div>
    </>
  );
}
