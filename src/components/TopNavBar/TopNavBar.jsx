"use client";

import StyledLink from "next/link";
import Image from "next/image";
import logoImage from "../../../public/img/Logo-SopShop.png";
import menuBtnImage from "../../../public/img/menu_icon.png";
import styles from "../TopNavBar/TopNavBar.module.css";
import { useState } from "react";

export default function TopNavBar() {
  const [slideState, setSlideState] = useState(null);

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
          <button onClick={() => setSlideState("slideIn")}>
            <Image className={styles.menuBtnImage} src={menuBtnImage} alt="menuBtnIcon" priority />
          </button>
        </li>
      </ul>
      {slideState && (
        <>
          <div className={`${styles.sideNavBarOverLay} ${styles[slideState]}`} onClick={() => setSlideState("slideOut")}></div>
          <div className={`${styles.sideNavBar} ${styles[slideState]}`}>
            <ul>
              <li>
                <button>
                  <StyledLink href={""}>Login</StyledLink>
                </button>
              </li>
              <li>
                <button>
                  <StyledLink href={""}>Join</StyledLink>
                </button>
              </li>
              <li>
                <button>
                  <StyledLink href={""}>My</StyledLink>
                </button>
              </li>
              <li>
                <button>
                  <StyledLink href={""}>Order</StyledLink>
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}