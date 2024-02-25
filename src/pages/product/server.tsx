import { ProductType } from "@/types/product.type";
import ProductView from "@/views/Product";

const ServerPage = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ServerPage;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
