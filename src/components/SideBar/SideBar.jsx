"use client";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import StyledLink from "next/link";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const [selected, setSelected] = useState("FLOPS");
  return (
    <div className={styles.wrapper}>
      <ul className={styles.sideMenu}>
        <li className={styles.sideMenuItem}>
          <StyledLink href={"/"}>About</StyledLink>
        </li>
        <li className={styles.sideMenuItem}>
          <StyledLink href={"/"}>Shop</StyledLink>
        </li>
        <div className={styles.brandSidedMenu}>
          <li className={styles.brandSideMenuItem}>
            <StyledLink className={`${selected === "FLOPS" ? styles.active : styles.brandSideMenuItemLInk} `} href={"/"} onClick={() => setSelected("FLOPS")}>
              FLOPS
            </StyledLink>
          </li>
          <li className={styles.brandSideMenuItem}>
            <StyledLink className={`${selected === "Ditto" ? styles.active : styles.brandSideMenuItemLink} `} href={"/"} onClick={() => setSelected("Ditto")}>
              Ditto
            </StyledLink>
          </li>
          <li className={styles.brandSideMenuItem}>
            <StyledLink className={`${selected === "Too_much_shop" ? styles.active : styles.brandSideMenuItemLink} `} href={"/"} onClick={() => setSelected("Too_much_shop")}>
              Too_much_shop
            </StyledLink>
          </li>
        </div>
        <div className={styles.sideMenuItemWrapper}>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/"}>Notice</StyledLink>
          </li>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/"}>Q & A</StyledLink>
          </li>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/"}>Review</StyledLink>
          </li>
        </div>
      </ul>
      <SearchBar />
    </div>
  );
}
