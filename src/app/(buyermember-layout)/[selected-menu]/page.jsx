import { getProducts } from "../../../api/Product";
import { getNotices } from "../../api/notices/route";
import ProductItem from "../../../components/ProductItem/ProductItem";
import styles from "./selected-menu.module.css";

export default async function selectedMenu({ params }) {
  const { "selected-menu": selectedMenu } = params;

  const brandProducts = await getProducts();
  const decodedString = selectedMenu.replace(/%20/g, " ");

  const selectedBrandProducts = brandProducts.results.filter((i) => i.store_name === decodedString);

  const notices = await getNotices();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.selectedMenuName}>{decodedString}</h1>

      <div className={styles.notices}>
        <h2>공지 사항</h2>
        {notices.length === 0 ? (
          <div>공지 사항이 없습니다.</div>
        ) : (
          <ul>
            {notices.map((notice, index) => (
              <li key={index}>
                <h3>{notice.title}</h3>
                <p>{notice.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

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
