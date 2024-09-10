import StyledLink from "next/link";
import Image from "next/image";
import styles from "./ProductItem.module.css";

export default function ProductItem({ productId, productImage, productBrandName, productName, productPrice }) {
  return (
    <li>
      <StyledLink href={`products/${productId}`}>
        <Image className={styles.productImage} src={productImage} alt="productImg" width={320} height={380} priority={true} />
      </StyledLink>
      <p className={styles.brandName}>{productBrandName}</p>
      <StyledLink href={`products/${productId}`}>
        <p className={styles.productName}>{productName}</p>
      </StyledLink>
      <p className={styles.productPrice}>{productPrice.toLocaleString()}</p>
    </li>
  );
}
