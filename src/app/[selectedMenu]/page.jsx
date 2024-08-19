import { getProducts } from "../../api/Product";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./selectedMenu.module.css";

export default async function selectedMenu({ params }) {
  const { selectedMenu } = params;
  console.log(params);
  const brandProducts = await getProducts();
  const decodedString = selectedMenu.replace(/%20/g, " ");
  const selectedBrandProducts = brandProducts.results.filter((i) => i.store_name === decodedString);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.selectedMenuName}>{decodedString}</h1>
      {selectedBrandProducts.length === 0 ? (
        <div className={styles.contents}>Empty</div>
      ) : (
        <div className={styles.brandProductsWrapper}>
          {selectedBrandProducts.map((product, index) => (
            <ProductItem key={index} productId={product.product_id} productImage={product.image} productBrandName={product.store_name} productName={product.product_name} productPrice={product.price} />
          ))}
        </div>
      )}
    </div>
  );
}
