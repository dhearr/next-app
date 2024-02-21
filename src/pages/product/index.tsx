import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [products, setProducts] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  type productType = {
    id: number;
    name: string;
    price: number;
    size: string;
  };

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((response) => {
        setProducts(response.data);
      });
  });

  return (
    <div>
      <h1>Product Page</h1>
      {products.map((product: productType) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
};

export default ProductPage;
