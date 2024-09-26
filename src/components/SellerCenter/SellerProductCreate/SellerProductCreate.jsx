"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userToken } from "../../../recoil/atoms";
import { useRouter } from "next/navigation";
import Image from "next/image";
import uploadImage from "../../../../public/img/image.png";
import styles from "./SellerProductCreate.module.css";
import { sellerMakeProduct } from "../../../api/Seller";

export default function SellerProductCreate() {
  const [productPreviewImage, setProductPreviewImage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const token = useRecoilValue(userToken);
  const router = useRouter();

  console.log(token);

  const { register, handleSubmit, getValues } = useForm();

  const fileInputRef = useRef(null);

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProductPreviewImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createProduct = async () => {
    const { productName, productPrice, shippingFee, productStock } = getValues();
    console.log(productName);
    console.log(productPrice);
    console.log(shippingFee);
    console.log(productStock);
    console.log(deliveryMethod);
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("image", productImage);
    formData.append("price", productPrice);
    formData.append("shipping_method", deliveryMethod);
    formData.append("shipping_fee", shippingFee);
    formData.append("stock", productStock);
    formData.append("product_info", "앞접시나 반찬접시");

    const res = await sellerMakeProduct(token, formData);
    console.log(res);

    if (res) {
      const productId = res.product_id;
      router.push(`/products/${productId}`);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form action="" className={styles.productForm} onSubmit={handleSubmit(createProduct)}>
          <div className={styles.formInputWrapper}>
            <div className={styles.imageUploadWrapper}>
              {productPreviewImage ? (
                <img className={styles.productImage} src={productPreviewImage} alt="" />
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
                  <input type="text" {...register("productName")} />
                </div>
              </div>
              <div>
                <span>판매가</span>
                <div className={styles.productDetails}>
                  <input type="text" {...register("productPrice")} />
                  <strong>원</strong>
                </div>
              </div>
              <div>
                <span>배송방법</span>
                <div className={styles.deliveryMethod}>
                  <button type="button" className={deliveryMethod === "택배" ? styles.active : ""} onClick={() => setDeliveryMethod("택배")}>
                    택배
                  </button>
                </div>
              </div>
              <div>
                <span>기본 배송비</span>
                <div className={styles.productDetails}>
                  <input type="text" {...register("shippingFee")} />
                  <strong>원</strong>
                </div>
              </div>
              <div>
                <span>재고</span>
                <div className={styles.productDetails}>
                  <input type="text" {...register("productStock")} />
                  <strong>개</strong>
                </div>
              </div>
            </div>
          </div>
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
        </form>
      </div>
    </>
  );
}
