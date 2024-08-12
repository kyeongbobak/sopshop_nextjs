import StyledLink from "next/link";
import Image from "next/image";
import styles from "./ProductItem.module.css";

export default function ProductItem({ productId, productImage, productBrandName, productName, productPrice }) {
  return (
    <li>
      <StyledLink href={`products/${productId}`}>
        <Image src={productImage} width={320} height={380} />
        <p className={styles.brandName}>{productBrandName}</p>
        <p className={styles.productName}>{productName}</p>
        <p className={styles.productPrice}>{productPrice}</p>
      </StyledLink>
    </li>
  );
}
