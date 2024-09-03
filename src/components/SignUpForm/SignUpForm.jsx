"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validateAccount } from "../../api/Account";
import { userToken } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import downArrow from "../../../public/img/icon-down-arrow.png";
import upArrow from "../../../public/img/icon-up-arrow.png";
import TabBtnMenu from "../TabBtnMenu/TabBtnMenu";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
  const [isBuyer, setIsBuyer] = useState(true);
  const [activeOption, setActiveOption] = useState(false);
  const [warningMessage, setWarningMessage] = useState();

  const frontNumberList = ["010", "011", "016", "017", "018", "019"];
  const token = useRecoilValue(userToken);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const userPassword = watch("password", "");
  const userPasswordConfirm = watch("passwordConfirm", "");
  const userName = watch("username", "");

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (userPassword && userPassword) {
      if (userPassword !== userPasswordConfirm) {
        setError("passwordConfirm", {
          type: "password-mismatch",
          message: "비밀번호가 일치하지 않습니다",
        });
      } else if (userPassword.length < 8) {
        setError("passwordConfirm", {
          type: "password-maxlength",
          message: "비밀번호는 8자 이상이어야 합니다.",
        });
      } else if (userPassword.search(/[a-z]/gi) < 0) {
        setError("passwordConfirm", {
          type: "password-Pattern",
          message: "비밀번호는 한 개 이상의 영소문자가 필수적으로 들어가야 합니다.",
        });
      } else if (userPassword.search(/[0-9]/gi) < 0) {
        setError("passwordConfirm", {
          type: "password-Pattern",
          message: "비밀번호는 한 개 이상의 숫자가 필수적으로 들어가야 합니다.",
        });
      }
    } else {
      clearErrors("passwordConfirm");
    }
  }, [setError, clearErrors, userPassword, userPasswordConfirm]);

  const verifyUserName = async () => {
    const body = {
      username: `${userName}`,
    };
    await validateAccount(body, token);
  };

  const handleOnSignUp = (data) => {
    console.log(data);
    const { frontNumber, middleNumber, endNumber } = getValues();

    if (!frontNumber || !middleNumber || !endNumber) {
      setWarningMessage("휴대폰 번호를 입력해주세요!");
    }
  };

  return (
    <>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"회원가입"} />
      <form className={styles.form} onSubmit={handleSubmit(handleOnSignUp)}>
        <label className={styles.styledLabel} htmlFor="">
          아이디
        </label>
        <div className={styles.userIdWrapper}>
          <input
            type="text"
            {...register("username", {
              required: "아이디를 입력해주세요.",
            })}
            className={`${styles.styledInput} ${styles.userIdInput}`}
          />
          <button className={styles.actionBtn} type="button" onClick={verifyUserName}>
            중복확인
          </button>
        </div>
        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          비밀번호
        </label>
        <input
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          className={styles.styledInput}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          비밀번호 재확인
        </label>
        <input type="password" {...register("passwordConfirm")} className={styles.styledInput} />
        {errors.passwordConfirm && <p className={styles.errorMessage}>{errors.passwordConfirm.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          이름
        </label>
        <input
          type="text"
          className={styles.styledInput}
          {...register("name", {
            required: "이름을 입력해주세요.",
          })}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          휴대폰 번호
        </label>
        <div className={styles.phoneNumberWrapper}>
          <div>
            <input {...register("frontNumber")} defaultValue={"010"} type="text" className={`${styles.styledInput} ${styles.phoneNumberInput} ${styles.frontNumberInput}`} />
            <button className={styles.selectBtn} onClick={() => setActiveOption(!activeOption)}>
              {activeOption ? <Image width={18} src={downArrow} alt="downArrowIcon" priority /> : <Image width={18} src={upArrow} alt="upArrowIcon" priority />}
            </button>
            {activeOption && (
              <ul className={styles.dropDownMenu}>
                {frontNumberList.map((value, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setValue("frontNumber", value);
                      setActiveOption(!activeOption);
                    }}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input type="text" className={`${styles.styledInput} ${styles.phoneNumberInput}`} {...register("middleNumber")} />
          <input type="text" className={`${styles.styledInput} ${styles.phoneNumberInput}`} {...register("endNumber")} />
        </div>
        <p className={styles.errorMessage}>{warningMessage}</p>
        {!isBuyer && (
          <div className={styles.sellerSignUpForm}>
            <label className={styles.styledLabel} htmlFor="">
              사업자 등록번호
            </label>
            <div className={styles.userIdWrapper}>
              <input type="text" className={`${styles.styledInput} ${styles.userIdInput}`} />
              <button className={styles.actionBtn} type="button">
                인증
              </button>
            </div>
            <label className={styles.styledLabel} htmlFor="">
              스토어 이름
            </label>
            <input type="text" className={styles.styledInput} />
          </div>
        )}
        <div className={styles.otherSectionWrapper}>
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
