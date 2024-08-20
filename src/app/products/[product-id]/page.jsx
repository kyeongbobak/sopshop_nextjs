import { getProductDetail } from "../../../api/Product";
import CountControl from "../../../components/CountControl/CountControl";
import Image from "next/image";
import styles from "./product-detail.module.css";

export default async function productDetail({ params }) {
  const { "product-id": productId } = params;
  const productInfo = await getProductDetail(productId);
  console.log(productInfo);

  return (
    <div className={styles.wrapper}>
      <Image className={styles.productImage} src={productInfo.image} width={620} height={720} alt="productImage" priority />
      <div className={styles.productDetailWrapper}>
        <p className={styles.productBrandName}>{productInfo.store_name}</p>
        <p className={styles.productName}>{productInfo.product_name}</p>
        <p className={styles.productPrice}>
          {productInfo.price.toLocaleString()} <span>원</span>
        </p>
        <p className={styles.productShippingInfo}>{productInfo.shipping_method}</p>
        <CountControl stock={productInfo.stock} price={productInfo.price} />
      </div>
    </div>
  );
}
