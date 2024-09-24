"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import uploadImage from "../../../../public/img/image.png";
import styles from "./SellerProductCreate.module.css";

export default function SellerProductCreate() {
  const [productImage, setProductImage] = useState("");

  const fileInputRef = useRef(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form action="" className={styles.formSection}>
          <div className={styles.imageUploadWrapper}>
            {productImage ? (
              <img className={styles.productImage} src={productImage} alt="" />
            ) : (
              <div className={styles.previewImage}>
                <Image src={uploadImage} alt="uploadImage" onClick={handleUploadImage} />
              </div>
            )}
            <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
          </div>
          <div className={styles.productDetailsWrapper}>
            <div className={styles.productName}>
              <span>상품명</span>
              <input type="text" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
