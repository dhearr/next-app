import { ProductType } from "@/types/product.type";
import ProductView from "@/views/Product";

const StaticPage = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default StaticPage;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
