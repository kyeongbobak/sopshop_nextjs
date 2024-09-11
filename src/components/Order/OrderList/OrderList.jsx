"use client";

import { userToken } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import useGetCartProducts from "../../../hook/useGetCartProducts";
import useProductInfos from "../../../hook/useProductInfos";
import Image from "next/image";
import styles from "./OrderList.module.css";

export default function OrderList() {
  const token = useRecoilValue(userToken);
  console.log(token);

  const { cartList, productIds } = useGetCartProducts(token);
  const { productInfos } = useProductInfos(token, productIds);

  console.log(productInfos);
  console.log(cartList);

  const sumProductPrice = productInfos.reduce((acc, cur, index) => {
    return acc + cur.price * cartList[index].quantity;
  }, 0);
  const sumShippingPrice = productInfos.reduce((acc, cur) => acc + cur.shipping_fee, 0);

  return (
    <>
      {productInfos.length === 0 ? (
        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>주문 내역이 없습니다.</div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          {productInfos.map((product, index) => (
            <div className={styles.productInfoWrapper} key={index}>
              <div className={styles.productInfo}>
                <Image className={styles.productImage} src={product.image} alt="productImg" priority={true} width={104} height={120} />
                <div className={styles.productInfoDetails}>
                  <p className={styles.storeName}>{product.store_name}</p>
                  <p className={styles.productName}>{product.product_name}</p>
                  {cartList && <p className={styles.productCount}>Qty : {cartList[index].quantity} </p>}
                </div>
              </div>
              <div className={styles.disCount}>0</div>
              <div className={styles.shippingFee}> {product.shipping_fee ? `${product.shipping_fee.toLocaleString()} 원` : "무료배송"}</div>
              <div className={styles.totalProductPrice}>{sumProductPrice.toLocaleString()} 원</div>
            </div>
          ))}
          <div className={styles.totalPriceCal}>
            <span>Total Product Price</span>
            <p>{sumProductPrice.toLocaleString()} 원</p>
            <span>+</span>
            <span>Total Shipping Fee</span>
            <p>{sumShippingPrice.toLocaleString()} 원</p>
            <span> Total Order Price :</span>
            <p>{(sumProductPrice + sumShippingPrice).toLocaleString()} 원</p>
          </div>
        </div>
      )}
    </>
  );
}
