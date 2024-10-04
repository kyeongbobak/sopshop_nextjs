"use client";

import { useEffect, useState } from "react";
import { userToken } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { sellerDeleteProduct, sellerGetProductList, sellerModifyProduct } from "../../../api/SellerFunction";
import Image from "next/image";
import TabTitle from "../../../components/TabTitle/TabTitle";
import styles from "./SellerProductEdit.module.css";

export default function SellerProductEdit() {
  const [sellingProductList, setSellingProductList] = useState([]);
  const titles = ["상품정보", "판매가격", "수정", "삭제"];
  const styling = [{ width: 800 }];

  const token = useRecoilValue(userToken);

  const sellerProductList = async () => {
    const res = await sellerGetProductList(token);
    console.log(res.results);
    setSellingProductList(res.results);
  };

  useEffect(() => {
    sellerProductList();
  }, [token]);

  const handleModifyProduct = async (index) => {
    const product = sellingProductList[index];

    const formData = new FormData();
    formData.append("product_name", `${product.product_name}`);
    formData.append("image", `${product.image}`);
    formData.append("price", `${product.price}`);
    formData.append("shipping_method", `${product.shipping_method}`);
    formData.append("shipping_fee", `${product.shipping_fee}`);
    formData.append("stock", 43);
    formData.append("product_info", "");
    const res = await sellerModifyProduct(token, formData, sellingProductList[index].product_id);

    if (res) {
      sellerProductList();
    }
  };

  const handleDeleteProduct = async (index) => {
    const res = await sellerDeleteProduct(token, sellingProductList[index].product_id);
    if (res.status === 200) {
      await sellerProductList();
    }
    console.log(res);
    return res;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <TabTitle titles={titles} style={styling} />

        {sellingProductList.map((list, index) => (
          <div key={index} className={styles.sellingProductWrapper}>
            <div className={styles.sellingProductInfo}>
              <Image src={list.image} alt="sellingProductImage" width={130} height={130} priority={true} />
              <div className={styles.productInfoDetails}>
                <p className={styles.productName}>{list.product_name}</p>
                <p>Qty : {list.stock}</p>
              </div>
            </div>
            <div className={styles.sellingProductPrice}>
              <p>{list.price.toLocaleString()} 원</p>
            </div>
            <div className={styles.actionButtonWrapper}>
              <button type="button" className={styles.modifyBtn} onClick={() => handleModifyProduct(index)}>
                수정
              </button>
            </div>
            <div className={styles.actionButtonWrapper}>
              <button type="button" className={styles.deleteBtn} onClick={() => handleDeleteProduct(index)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
