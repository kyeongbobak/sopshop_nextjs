import { getProductDetail } from "../../../../api/Product";

import Image from "next/image";
import styles from "./product-detail.module.css";
import ProductDetailsTabs from "../../../../components/ProductDetails/ProductDetailsTabs/ProductDetailsTabs";
import ProductDetailsActions from "../../../../components/ProductDetails/ProductDetailsActions/ProductDetailsActions";

export default async function productDetail({ params }) {
  const { "product-id": productId } = params;
  const productInfo = await getProductDetail(productId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.productDetailWrapper}>
        <Image className={styles.productImage} src={productInfo.image} width={620} height={720} alt="productImage" priority={true} />
        <div className={styles.productDetailInner}>
          <p className={styles.productBrandName}>{productInfo.store_name}</p>
          <p className={styles.productName}>{productInfo.product_name}</p>
          <p className={styles.productPrice}>
            {productInfo.price.toLocaleString()} <span>원</span>
          </p>
          <p className={styles.productShippingInfo}>{productInfo.shipping_method === "PARCEL" ? "택배배송" : "무료배송"}</p>

          <ProductDetailsActions stock={productInfo.stock} productId={productInfo.product_id} price={productInfo.price} />
        </div>
      </div>
      <ProductDetailsTabs />
    </div>
  );
}
