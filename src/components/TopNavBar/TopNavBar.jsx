"use client";

import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isLogin } from "../../recoil/atoms";
import StyledLink from "next/link";
import Image from "next/image";
import logoImage from "../../../public/img/Logo-SopShop.png";
import menuBtnImage from "../../../public/img/menu_icon.png";
import styles from "./TopNavBar.module.css";

export default function TopNavBar() {
  const [slideState, setSlideState] = useState(null);
  const isLoginState = useRecoilValue(isLogin);
  console.log(isLoginState);

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
          <div className={`${styles.sideMenuOverLay} ${styles[slideState]}`} onClick={() => setSlideState("slideOut")}></div>
          <div className={`${styles.sideMenu} ${styles[slideState]}`}>
            <ul className={styles.sideMenuInner}>
              <li className={styles.sideMenuItem}>
                <button>
                  <StyledLink href={"/login"}>Login</StyledLink>
                </button>
              </li>
              <li className={styles.sideMenuItem}>
                <button>
                  <StyledLink href={""}>Join</StyledLink>
                </button>
              </li>
              <li className={styles.sideMenuItem}>
                <button>
                  <StyledLink href={""}>My Page</StyledLink>
                </button>
              </li>
              <li className={styles.sideMenuItem}>
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
