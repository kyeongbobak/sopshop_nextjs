"use client";

import { useForm } from "react-hook-form";
import { userToken } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { sellerPostNotice } from "../../../api/Seller";
import styles from "./Notice.module.css";

export default function noticeSetting() {
  const { register, getValues, handleSubmit } = useForm();

  const token = useRecoilValue(userToken);

  console.log(token);

  const noticePost = async () => {
    const { noticeTitle, noticeDescription } = getValues();
    console.log(noticeTitle);
    console.log(noticeDescription);

    const body = {
      title: noticeTitle,
      description: noticeDescription,
    };

    const res = await sellerPostNotice(body, token);
    console.log(res);
  };

  return (
    <>
      <form action="" className={styles.form} onSubmit={handleSubmit(noticePost)}>
        <div className={styles.noticeTitle}>
          <label htmlFor="" className={styles.label}>
            Title
          </label>
          <input type="text" {...register("noticeTitle")} />
        </div>
        <div className={styles.noticeDescription}>
          <label htmlFor="" className={styles.label}>
            Contents
          </label>
          <textarea cols={97} rows={20} {...register("noticeDescription")} />
        </div>
        <div className={styles.submitBtnWrapper}>
          <button type="submit">등록</button>
        </div>
      </form>
    </>
  );
}
