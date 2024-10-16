"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userToken } from "../../../recoil/atoms";
import { useRouter, usePathname } from "next/navigation";
import { sellerGetProductList, sellerMakeProduct, sellerModifyProduct } from "../../../api/SellerFunction";
import Image from "next/image";
import uploadImage from "../../../../public/img/image.png";
import styles from "./SellerProductManage.module.css";

export default function SellerProductCreate() {
  const [productPreviewImage, setProductPreviewImage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [modifyingProduct, setModifyingProduct] = useState("");

  const token = useRecoilValue(userToken);
  const router = useRouter();
  const pathname = usePathname();

  const [action, id] = pathname.split(`/`).slice(-2);

  useEffect(() => {
    if (action === "modify") {
      selectedProduct();
    }
  }, [action]);

  const selectedProduct = async () => {
    const res = await sellerGetProductList(token);
    const product = res.results.find((_, index) => index === Number(id));

    setModifyingProduct(product);
    if (product) {
      setValue("productName", product.product_name);
      setValue("productPrice", product.price);
      setValue("shippingFee", product.shipping_fee);
      setValue("productStock", product.stock);
      setDeliveryMethod(product.shipping_method);
      if (product.image) {
        setProductPreviewImage(product.image);
      }
    }
    return res;
  };

  const { register, handleSubmit, getValues, setValue } = useForm();

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

  // 상품 등록하기
  const createProduct = async () => {
    const { productName, productPrice, shippingFee, productStock } = getValues();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("image", productImage);
    formData.append("price", productPrice);
    formData.append("shipping_method", deliveryMethod);
    formData.append("shipping_fee", shippingFee);
    formData.append("stock", productStock);
    formData.append("product_info", "앞접시나 반찬접시");

    const res = await sellerMakeProduct(token, formData);

    if (res) {
      const productId = res.product_id;
      router.push(`/products/${productId}`);
    }
  };

  // 상품 수정하기
  const handleModifyProduct = async () => {
    const { productName, productPrice, shippingFee, productStock } = getValues();

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("image", productImage);
    formData.append("price", productPrice);
    formData.append("shipping_method", `${modifyingProduct.shipping_method}`);
    formData.append("shipping_fee", shippingFee);
    formData.append("stock", productStock);
    formData.append("product_info", "");

    const res = await sellerModifyProduct(token, formData, modifyingProduct.product_id);

    if (res) {
      router.push(`/dashboard`);
    }
    return res;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form action="" className={styles.productForm} onSubmit={handleSubmit(createProduct)}>
          <div className={styles.formInputWrapper}>
            <div className={styles.imageUploadWrapper}>
              {productPreviewImage ? (
                <img className={styles.productImage} src={productPreviewImage} alt="" onClick={handleUploadImage} />
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
              {action === "modify" ? (
                <>
                  <button type="button" className={styles.submitBtn} onClick={() => handleModifyProduct()}>
                    수정하기
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className={styles.submitBtn}>
                    저장하기
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
