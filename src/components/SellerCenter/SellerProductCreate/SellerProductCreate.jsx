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
            <div>
              <span>상품명</span>
              <div className={styles.productName}>
                <input type="text" />
              </div>
            </div>
            <div>
              <span>판매가</span>
              <div className={styles.productDetails}>
                <input type="text" />
                <strong>원</strong>
              </div>
            </div>
            <div>
              <span>배송방법</span>
              <div className={styles.deliveryMethod}>
                <button>택배</button>
              </div>
            </div>
            <div>
              <span>기본 배송비</span>
              <div className={styles.productDetails}>
                <input type="text" />
                <strong>원</strong>
              </div>
            </div>
            <div>
              <span>재고</span>
              <div className={styles.productDetails}>
                <input type="text" />
                <strong>원</strong>
              </div>
            </div>
          </div>
        </form>
        <div className={styles.contentsWrapper}>
          <h2>상품 상세 정보</h2>
          <div className={styles.contents}>Editor</div>
          <div className={styles.buttonWrapper}>
            <button type="button" className={styles.cancelBtn}>
              취소
            </button>
            <button type="submit" className={styles.submitBtn}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
