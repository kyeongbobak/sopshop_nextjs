import { getProductDetail } from "../../../api/Product";
import ProductDetailsPanel from "../../../components/ProductDetails/ProductDetailsPanel/ProductDetailsPanel";
import ProductDetailButtonActions from "../../../components/ProductDetails/ProductDetailsButtonActions/ProductDetailButtonActions";

import Image from "next/image";
import styles from "./product-detail.module.css";
import ProductDetailsTabs from "../../../components/ProductDetails/ProductDetailsTabs/ProductDetailsTabs";

export default async function productDetail({ params }) {
  const { "product-id": productId } = params;
  const productInfo = await getProductDetail(productId);
  console.log(productInfo);

  return (
    <div className={styles.wrapper}>
      <div className={styles.productDetailWrapper}>
        <Image className={styles.productImage} src={productInfo.image} width={620} height={720} alt="productImage" priority />
        <div className={styles.productDetailInner}>
          <p className={styles.productBrandName}>{productInfo.store_name}</p>
          <p className={styles.productName}>{productInfo.product_name}</p>
          <p className={styles.productPrice}>
            {productInfo.price.toLocaleString()} <span>원</span>
          </p>
          <p className={styles.productShippingInfo}>{productInfo.shipping_method}</p>
          <ProductDetailsPanel stock={productInfo.stock} price={productInfo.price} />
          <ProductDetailButtonActions />
        </div>
      </div>
      <ProductDetailsTabs />
    </div>
  );
}
