import { fetcher } from "@/lib/fetcher/fetcher";
import { ProductType } from "@/types/product.type";
import DetailProductView from "@/views/DetailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter();
  //// CLIENT SIDE RENDERING
  // const { data, error, isLoading } = useSWR(
  //   `/api/products/${query.id}`,
  //   fetcher
  // );

  return (
    <div>
      {/* CLIENT SIDE RENDERING */}
      {/* <DetailProductView product={isLoading ? {} : data.data} /> */}

      {/* SERVER SIDE RENDERING & STATIC SIDE GENERATION */}
      <DetailProductView product={product} />
    </div>
  );
};

export default DetailProductPage;

// export async function getServerSideProps({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
//   const response = await res.json();
//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/products");
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: {
      id: product._id,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const response = await res.json();
  return {
    props: {
      product: response.data,
    },
  };
}
