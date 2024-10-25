"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUp, validateAccount, validateCompanyNumber } from "../../api/Account";
import { userToken } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Image from "next/image";
import downArrow from "../../../public/img/icon-down-arrow.png";
import upArrow from "../../../public/img/icon-up-arrow.png";
import checkOffIcon from "../../../public/img/icon-check-off.png";
import checkOnIcon from "../../../public/img/icon-check-on.png";
import TabBtnMenu from "../TabBtnMenu/TabBtnMenu";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
  const [isBuyer, setIsBuyer] = useState(true);
  const [activeOption, setActiveOption] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const token = useRecoilValue(userToken);
  console.log(token);

  // 판매자 회원가입 코드 수정해서
  // 비밀번호 일치 여부 검사하는 코드도 수정해서 재배포
  const router = useRouter();

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
  const userConfirmPassword = watch("password2", "");
  const userName = watch("username", "");
  const userFrontNumber = watch("frontNumber", "");
  const userMiddleNumber = watch("middleNumber", "");
  const userEndNumber = watch("endNumber", "");

  const frontNumberList = ["010", "011", "016", "017", "018", "019"];
  const phone_number = [userFrontNumber, userMiddleNumber, userEndNumber].join("");

  // 계정 검증
  const validateAccountMutation = useMutation({
    mutationFn: validateAccount,
    onSuccess: (data) => {
      if (data.Success) {
        setDuplicateMessage(data.Success);
      } else if (data.FAIL_Message) {
        setDuplicateMessage(data.FAIL_Message);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const verifyUserName = () => {
    const body = {
      username: `${userName}`,
    };
    validateAccountMutation.mutate(body, token);
  };

  // 휴대폰 번호, 비밀번호 유효성 검사
  useEffect(() => {
    if (userMiddleNumber || userEndNumber) {
      if (!/^\d{11}$/.test(phone_number) & phone_number) {
        setError("phone_number", {
          type: "phoneNumber-maxlength",
          message: "휴대폰 번호는 10자리 또는 11자리 숫자여야 합니다.",
        });
      } else {
        clearErrors("");
      }
    }

    if (userPassword && userConfirmPassword) {
      if (userPassword !== userConfirmPassword) {
        setError("password2", { type: "matched-password", message: "비밀번호가 일치하지 않습니다." });
      } else {
        clearErrors("password2");
      }
    }
  }, [setError, clearErrors, phone_number, userMiddleNumber, userEndNumber, userPassword, userConfirmPassword]);

  // 사업자 등록번호 검증
  const verifyCompanyNumberMutation = useMutation({
    mutationFn: validateCompanyNumber,
    onSuccess: (data) => {
      setValidationMessage(data.Success);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const verifyCompanyNumber = () => {
    const { companyNumber } = getValues();
    const body = {
      company_registration_number: `${companyNumber}`,
    };

    verifyCompanyNumberMutation.mutate(body);
  };

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      alert("회원가입에 성공하셨습니다.");
      router.push(`/accountsetup/loginout`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 회원가입
  const handleOnSignUp = (data) => {
    data.phone_number = phone_number;
    signUpMutation.mutate(data);
  };

  return (
    <>
      <TabBtnMenu isBuyer={isBuyer} setIsBuyer={setIsBuyer} content={"회원가입"} />
      <form className={styles.form} onSubmit={handleSubmit(handleOnSignUp)}>
        <label className={styles.styledLabel} htmlFor="">
          아이디
        </label>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.styledInput} ${styles.userIdInput}`}
            type="text"
            {...register("username", {
              required: "아이디를 입력해주세요.",
            })}
          />
          <button className={styles.actionBtn} type="button" onClick={verifyUserName}>
            중복확인
          </button>
        </div>
        {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
        {duplicateMessage && <p className={styles.errorMessage}>{duplicateMessage}</p>}
        <label className={styles.styledLabel} htmlFor="">
          비밀번호
        </label>
        <div className={styles.passwordInputWrapper}>
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
              validate: {
                hasLowCase: (value) => /[a-z]/.test(value) || "비밀번호는 한 개 이상의 영소문자가 포함되어야 합니다.",
                hasNumber: (value) => /[0-9]/.test(value) || "비밀번호는 한 개 이상의 숫자가 포함되어야 합니다.",
              },
            })}
            className={styles.styledInput}
          />
          {userPassword ? <Image src={checkOnIcon} alt="checkOnIcon" priority={true} /> : <Image src={checkOffIcon} alt="checkOffIcon" priority={true} />}
        </div>
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          비밀번호 재확인
        </label>
        <div className={styles.passwordInputWrapper}>
          <input
            className={styles.styledInput}
            type="password"
            {...register("password2", {
              required: "비밀번호를 확인해주세요.",
            })}
          />
          {userConfirmPassword ? <Image src={checkOnIcon} alt="checkOnIcon" /> : <Image src={checkOffIcon} alt="checkOffIcon" priority={true} />}
        </div>
        {errors.password2 && <p className={styles.errorMessage}>{errors.password2.message}</p>}
        <label className={styles.styledLabel} htmlFor="">
          이름
        </label>
        <input
          className={styles.styledInput}
          type="text"
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
            <input className={`${styles.styledInput} ${styles.phoneNumberInput} ${styles.frontNumberInput}`} type="text" {...register("frontNumber")} defaultValue={"010"} />
            <button className={styles.selectBtn} onClick={() => setActiveOption(!activeOption)}>
              {activeOption ? <Image width={18} src={downArrow} alt="downArrowIcon" priority={true} /> : <Image width={18} src={upArrow} alt="upArrowIcon" priority={true} />}
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
          <input
            className={`${styles.styledInput} ${styles.phoneNumberInput}`}
            type="text"
            {...register("middleNumber", {
              required: "휴대폰 번호를 입력해주세요",
            })}
          />
          <input
            className={`${styles.styledInput} ${styles.phoneNumberInput}`}
            type="text"
            {...register("endNumber", {
              required: "휴대폰 번호를 입력해주세요.",
            })}
          />
        </div>
        {(errors.middleNumber || errors.endNumber) && <p className={styles.errorMessage}>{errors.middleNumber?.message || errors.endNumber?.message}</p>}
        {errors.phone_number && <p className={styles.errorMessage}>{errors.phone_number.message}</p>}
        {!isBuyer && (
          <div className={styles.sellerSignUpForm}>
            <label className={styles.styledLabel} htmlFor="">
              사업자 등록번호
            </label>
            <div className={styles.inputWrapper}>
              <input
                className={`${styles.styledInput} ${styles.userIdInput}`}
                type="text"
                {...register("companyNumber", {
                  required: "사업자 등록번호를 추가해주세요.",
                })}
              />
              <button className={styles.actionBtn} type="button" onClick={verifyCompanyNumber}>
                인증
              </button>
            </div>
            {errors.companyNumber && <p className={styles.errorMessage}>{errors.companyNumber.message}</p>}
            <p className={styles.errorMessage}>{validationMessage}</p>
            <label className={styles.styledLabel} htmlFor="">
              스토어 이름
            </label>
            <input
              className={styles.styledInput}
              type="text"
              {...register("storeName", {
                required: "스토어명을 입력해주세요.",
              })}
            />
            {errors.storeName && <p className={styles.errorMessage}>{errors.storeName.message}</p>}
          </div>
        )}
        <div className={styles.otherSectionWrapper}>
          <input type="checkbox" required />
          <p className={styles.agreementText}>
            sopshop의 <span>이용약관</span> 및 <span>개인 정보 처리 방침</span>에 대한 내용을 확인하였고 동의합니다.
          </p>
        </div>
        <button className={styles.signBtn} type="submit">
          SIGN IN
        </button>
      </form>
    </>
  );
}
