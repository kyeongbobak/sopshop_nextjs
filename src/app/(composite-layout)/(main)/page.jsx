import ProductItem from "../../../components/ProductItem/ProductItem";
import { getProducts } from "../../../api/Product";
import styles from "./main.module.css";

export default async function main() {
  const products = await getProducts();

  const product = products.results || [];

  return (
    <div>
      <ul className={styles.productList}>
        {product.map((product, index) => (
          <ProductItem key={index} productId={product.product_id} productImage={product.image} productBrandName={product.store_name} productName={product.product_name} productPrice={product.price} />
        ))}
      </ul>
    </div>
  );
}
