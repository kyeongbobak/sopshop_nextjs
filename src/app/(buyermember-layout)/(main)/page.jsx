import { getProducts } from "../../../api/Product";
import ProductItem from "../../../components/ProductItem/ProductItem";
import styles from "./main.module.css";

export default async function main() {
  const products = await getProducts();
  const product = products.results || [];

  return (
    <div>
      <ul className={styles.productList}>
        {product.map((list, index) => (
          <ProductItem key={index} productId={list.product_id} productImage={list.image} productBrandName={list.store_name} productName={list.product_name} productPrice={list.price} />
        ))}
      </ul>
    </div>
  );
}
