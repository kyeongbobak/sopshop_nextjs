"use client";

import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./NoticeCreate.module.css";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function NoticeSetting() {
  const { register, getValues, handleSubmit } = useForm();
  const router = useRouter();

  const noticePost = async () => {
    const { noticeTitle, noticeDescription } = getValues();

    const body = {
      date: serverTimestamp(),
      description: noticeDescription,
      title: noticeTitle,
      writer: "SopShop",
    };

    try {
      const res = await addDoc(collection(db, "notices"), body);
      console.log(res);
      console.log(res.id);

      router.push(`/Notice`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(noticePost)}>
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
