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
          <StyledLink href={"/About"}>About</StyledLink>
        </li>
        <li className={styles.sideMenuItem}>
          <StyledLink href={"/Shop"}>Shop</StyledLink>
        </li>
        <div className={styles.brandSidedMenu}>
          <li className={styles.brandSideMenuItem}>
            <StyledLink href={"/FLOPS"} className={`${selected === "FLOPS" ? styles.active : styles.brandSideMenuItemLInk} `} onClick={() => setSelected("FLOPS")}>
              FLOPS
            </StyledLink>
          </li>
          <li className={styles.brandSideMenuItem}>
            <StyledLink href={"/Ditto"} className={`${selected === "Ditto" ? styles.active : styles.brandSideMenuItemLink} `} onClick={() => setSelected("Ditto")}>
              Ditto
            </StyledLink>
          </li>
          <li className={styles.brandSideMenuItem}>
            <StyledLink href={"/Too_much_shop"} className={`${selected === "Too_much_shop" ? styles.active : styles.brandSideMenuItemLink} `} onClick={() => setSelected("Too_much_shop")}>
              Too_much_shop
            </StyledLink>
          </li>
        </div>
        <div className={styles.sideMenuItemWrapper}>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/Notice"}>Notice</StyledLink>
          </li>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/Q and A"}>Q & A</StyledLink>
          </li>
          <li className={styles.sideMenuItem}>
            <StyledLink href={"/Review"}>Review</StyledLink>
          </li>
        </div>
      </ul>
      <SearchBar />
    </div>
  );
}
