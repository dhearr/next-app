import styles from "@/styles/404.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <img className={styles.error__image} src="/not_found.png" alt="404" />
      <h1>Page Not Found!</h1>
    </div>
  );
};

export default ErrorPage;
