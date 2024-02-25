import styles from "@/styles/404.module.scss";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <Image
        className={styles.error__image}
        src="/not_found.png"
        alt="404"
        width={500}
        height={500}
      />
      <h1>Page Not Found!</h1>
    </div>
  );
};

export default ErrorPage;
