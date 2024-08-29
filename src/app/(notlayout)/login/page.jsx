"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import StyledLink from "next/link";
import logoImage from "../../../../public/img/Logo-SopShop.png";
import TabBtnMenu from "../../../components/TabBtnMenu/TabBtnMenu";
import styles from "./login.module.css";
import { useState } from "react";

export default function login() {
  const [isBuyer, setIsBuyer] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnLogin = (data) => {
    console.log(data);
    data.login_type = isBuyer ? "BUYER" : "SELLER";
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <StyledLink className={styles.logoImage} href={"/"}>
        <Image src={logoImage} alt="logoImage" priority />
      </StyledLink>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"로그인"} />
      <form className={styles.loginForm} onSubmit={handleSubmit(handleOnLogin)}>
        <label className="a11y-hidden" htmlFor="id">
          아이디
        </label>
        <input
          className={styles.styledInput}
          type="text"
          placeholder="아이디"
          {...register("userId", {
            required: "아이디를 입력해주세요.",
          })}
        />
        {errors.userId && <p className={styles.errorMessage}>{errors.userId.message}</p>}
        <label className="a11y-hidden" htmlFor="userName">
          비밀번호
        </label>
        <input
          className={styles.styledInput}
          type="password"
          placeholder="비밀번호"
          {...register("userPassword", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        {errors.userPassword && <p className={styles.errorMessage}>{errors.userPassword.message}</p>}
        <button className={styles.LoginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
