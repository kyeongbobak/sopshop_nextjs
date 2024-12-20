"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userToken, isLogin, userType } from "../../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { userLogin } from "../../api/LoginOut";
import { useRouter } from "next/navigation";
import StyledLink from "next/link";
import TabBtnMenu from "../TabBtnMenu/TabBtnMenu";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [isBuyer, setIsBuyer] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const setUserToken = useSetRecoilState(userToken);
  const setIsLogin = useSetRecoilState(isLogin);
  const setUserType = useSetRecoilState(userType);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setUserToken(data.token);
      setIsLogin(true);
      setUserType(data.login_type);
      router.push(`/`);
    },
    onError: (error) => {
      if (error) {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    },
  });

  const handleOnLogin = (data) => {
    data.login_type = isBuyer ? "BUYER" : "SELLER";
    loginMutation.mutate(data);
  };

  return (
    <>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"로그인"} />
      <form className={styles.form} onSubmit={handleSubmit(handleOnLogin)}>
        <label className="a11y-hidden" htmlFor="username">
          아이디
        </label>
        <input
          className={styles.styledInput}
          type="text"
          placeholder="아이디"
          {...register("username", {
            required: "아이디를 입력해주세요.",
          })}
        />
        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
        <label className="a11y-hidden" htmlFor="password">
          비밀번호
        </label>
        <input
          className={styles.styledInput}
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button className={styles.submitBtn} type="submit">
          LOGIN
        </button>
      </form>
      <div className={styles.navigationBtn}>
        <StyledLink href={`/accountsetup/signup`}>
          <span>CREATE ACCOUNT</span>
        </StyledLink>
      </div>
    </>
  );
}
