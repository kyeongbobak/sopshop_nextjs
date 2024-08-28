"use client";

import Image from "next/image";
import StyledLink from "next/link";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import TabBtnMenu from "../../../components/TabBtnMenu/TabBtnMenu";
import styles from "./login.module.css";
import { useState } from "react";

export default function login() {
  const [isBuyer, setIsBuyer] = useState(true);

  return (
    <div className={styles.wrapper}>
      <StyledLink className={styles.logoImage} href={"/"}>
        <Image src={logoImage} />
      </StyledLink>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"로그인"} />
      <form className={styles.loginForm}>
        <label className="a11y-hidden" htmlFor="id">
          아이디
        </label>
        <input className={styles.styledInput} type="text" placeholder="아이디" />
        <label className="a11y-hidden" htmlFor="userName">
          비밀번호
        </label>
        <input className={styles.styledInput} type="password" placeholder="비밀번호" />
        <button className={styles.LoginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
