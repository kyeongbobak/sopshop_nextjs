import { getProducts } from "../../../api/Product";
import { getNotices } from "../../../api/NoticeList";
import Link from "next/link";
import ProductItem from "../../../components/ProductItem/ProductItem";
import TabTitle from "../../../components/TabTitle/TabTitle";
import styles from "./selected-menu.module.css";

export default async function selectedMenu({ params }) {
  const { "selected-menu": selectedMenu } = params;

  const titles = ["No", "Subject", "Writer", "Date"];
  const styling = [{ width: 280 }, { width: 400 }];

  const brandProducts = await getProducts();

  const decodedString = selectedMenu.replace(/%20/g, " ");

  const selectedBrandProducts = brandProducts.results.filter((i) => i.store_name === decodedString);

  const notices = await getNotices();

  const dates = notices.map((i) => new Date(i.date.seconds * 1000).toLocaleString().split(",")[0]);

  const formattedDates = dates.map((date) => {
    const [month, day, year] = date.split(`/`);
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.selectedMenuName}>{decodedString}</h1>
      {selectedBrandProducts.length === 0 ? (
        <>
          {selectedMenu === "Notice" ? (
            <>
              <div className={styles.noticeListWrapper}>
                <TabTitle titles={titles} style={styling} />
                <ul className={styles.noticeList}>
                  {notices.map((list, index) => (
                    <li className={styles.noticeItem} key={index}>
                      <p className={styles.noticeNumber}>{index + 1}</p>
                      <Link className={styles.noticeItemLink} href={`notice-detail/${index}`}>
                        {list.title}
                      </Link>
                      <p className={styles.noticeInfo}>{list.writer}</p>
                      <p className={styles.noticeInfo}>{formattedDates[index]}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className={styles.contents}>Empty</div>
          )}
        </>
      ) : (
        <>
          <div className={styles.brandProductsWrapper}>
            {selectedBrandProducts.map((product, index) => (
              <ProductItem key={index} productId={product.product_id} productImage={product.image} productBrandName={product.store_name} productName={product.product_name} productPrice={product.price} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
