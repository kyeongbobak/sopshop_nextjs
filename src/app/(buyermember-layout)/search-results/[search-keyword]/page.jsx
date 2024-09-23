import { search } from "../../../../api/Product";
import ProductItem from "../../../../components/ProductItem/ProductItem";
import styles from "./search-results.module.css";

export default async function searchResults({ params }) {
  const { "search-keyword": searchKeyword } = params;

  const decodedString = searchKeyword.replace(/%20/g, " ");
  const searchResults = await search(decodedString);
  const product = searchResults.results || [];

  return (
    <div className={styles.wrapper}>
      <p className={styles.searchResultSummary}>
        <strong>{product.length}</strong>
        <span> 개의 검색 결과</span>
      </p>
      <div className={styles.searchResult}>
        {product.map((product, index) => (
          <ProductItem key={index} productId={product.product_id} productImage={product.image} productBrandName={product.store_name} productName={product.product_name} productPrice={product.price} searchKeyword={searchKeyword} />
        ))}
      </div>
    </div>
  );
}
