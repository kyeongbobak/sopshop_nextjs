import TopNavBar from "../../components/TopNavBar/TopNavBar";
import ProductItem from "../../components/ProductItem/ProductItem";
import { getProducts } from "../../api/Product";

export default async function main() {
  const products = await getProducts();
  const product = products.results || [];

  return (
    <div>
      <TopNavBar />
      <ul>
        {product.map((product) => (
          <ProductItem key={product.id} productId={product.id} productImage={product.image} productBrandName={product.store_name} productName={product.product_name} productPrice={product.price} />
        ))}
      </ul>
    </div>
  );
}
