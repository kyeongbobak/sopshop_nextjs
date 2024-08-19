import { getProductDetail } from "../../../api/Product";
import Image from "next/image";
import styles from "./productDetail.module.css";

export default async function productDetail({ params }) {
  const { productId } = params;

  const productInfo = await getProductDetail(productId);
  console.log(productInfo);

  return (
    <div className={styles.wrapper}>
      <Image className={styles.productImage} src={productInfo.image} width={620} height={720} />
      <div className={styles.productDetailWrapper}>
        <p className={styles.productBrandName}>{productInfo.store_name}</p>
        <p className={styles.productName}>{productInfo.product_name}</p>
        <p className={styles.productPrice}>
          {productInfo.price} <span>원</span>
        </p>
        <p className={styles.productShippingInfo}>{productInfo.shipping_method}</p>
      </div>
    </div>
  );
}
