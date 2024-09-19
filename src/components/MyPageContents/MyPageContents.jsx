"use client";

import { userToken } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import styles from "./MyPageContents.module.css";

export default function MyPageContents() {
  const token = useRecoilValue(userToken);

  return (
    <>
      <div className={styles.wrapper}></div>
    </>
  );
}
