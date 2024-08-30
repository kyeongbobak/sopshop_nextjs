"use client";

import { useState } from "react";
import TabBtnMenu from "../TabBtnMenu/TabBtnMenu";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
  const [isBuyer, setIsBuyer] = useState(true);

  return (
    <>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"회원가입"} />
      <form className={styles.signupForm}>
        <label className={styles.styleLabel} htmlFor="">
          아이디
        </label>
        <div className={styles.userIdWrapper}>
          <input type="text" className={`${styles.styleInput} ${styles.userIdInput}`} />
          <button className={styles.confirmBtn} type="button">
            중복확인
          </button>
        </div>
        <label className={styles.styleLabel} htmlFor="">
          비밀번호
        </label>
        <input type="text" className={styles.styleInput} />
        <label className={styles.styleLabel} htmlFor="">
          비밀번호 재확인
        </label>
        <input type="text" className={styles.styleInput} />
        <label className={styles.styleLabel} htmlFor="">
          이름
        </label>
        <input type="text" className={styles.styleInput} />
        <label className={styles.styleLabel} htmlFor="">
          휴대폰 번호
        </label>
        <div className={styles.phoneNumberWrapper}>
          <input type="text" className={`${styles.styleInput} ${styles.phoneNumberInput} ${styles.frontNumberInput}`} />
          <input type="text" className={`${styles.styleInput} ${styles.phoneNumberInput}`} />
          <input type="text" className={`${styles.styleInput} ${styles.phoneNumberInput}`} />
        </div>
        {!isBuyer && (
          <div className={styles.sellerSignUpForm}>
            <label className={styles.styleLabel} htmlFor="">
              사업자 등록번호
            </label>
            <div className={styles.userIdWrapper}>
              <input type="text" className={`${styles.styleInput} ${styles.userIdInput}`} />
              <button className={styles.confirmBtn} type="button">
                인증
              </button>
            </div>
            <label className={styles.styleLabel} htmlFor="">
              스토어 이름
            </label>
            <input type="text" className={styles.styleInput} />
          </div>
        )}
        <div className={styles.agreementWrapper}>
          <input type="checkbox" required />
          <p className={styles.agreementText}>
            sopshop의 <span>이용약관</span> 및 <span>개인 정보 처리 방침</span>에 대한 내용을 확인하였고 동의합니다.
          </p>
        </div>
        <button type="submit" className={styles.signBtn}>
          SIGN IN
        </button>
      </form>
    </>
  );
}
