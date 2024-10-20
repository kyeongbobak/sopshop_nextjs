"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./NoticeCreate.module.css";

export default function NoticeSetting() {
  const { register, getValues, handleSubmit } = useForm();
  const router = useRouter();

  const noticePosting = async () => {
    const { noticeTitle, noticeDescription } = getValues();

    const body = {
      description: noticeDescription,
      title: noticeTitle,
      writer: "sop shop",
    };

    try {
      const res = await fetch(`/api/notices`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      router.push(`/Notice`);
      return await res.json();
    } catch (error) {
      console.log("error", error);
    }
    return res;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(noticePosting)}>
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
