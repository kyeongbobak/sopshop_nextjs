"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./NoticeCreate.module.css";

export default function noticeSetting() {
  const { register, getValues, handleSubmit } = useForm();
  const router = useRouter();

  const noticePost = async () => {
    const { noticeTitle, noticeDescription } = getValues();

    const currentDate = new Date().toISOString().split("T")[0];

    const body = {
      title: noticeTitle,
      description: noticeDescription,
      writer: "SopShop",
      date: currentDate,
    };

    try {
      const res = await axios.post("/api/notices", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push(`/Notice`);
      return res.data;
    } catch (error) {
      console.error("Error posting notice:", error);
    }
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
