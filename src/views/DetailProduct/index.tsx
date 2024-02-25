import { ProductType } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";

const DetailProductView = ({ product }: { product: ProductType }) => {
  return (
    <>
      <h1 className={styles.productDetail__title}>Detail Product</h1>
      <div className={styles.productDetail__item}>
        <div className={styles.productDetail__item__image}>
          <Image
            src={product.image && product.image}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
        <h4 className={styles.productDetail__item__name}>{product.name}</h4>
        <p className={styles.productDetail__item__category}>
          {product.category}
        </p>
        <p className={styles.productDetail__item__price}>
          {product.price &&
            product.price
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
              .replace(",00", "")}
        </p>
      </div>
    </>
  );
};

export default DetailProductView;
