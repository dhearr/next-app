import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";

const LoginView = () => {
  const { push } = useRouter();
  const handleLogin = () => {
    push("/product");
  };

  return (
    <div className={styles.login}>
      <h1 className="text-5xl font-bold">Login Page</h1>
      <button onClick={() => handleLogin()}>Login</button>
      <p
        style={{
          color: "blue",
          border: "1px solid blue",
          borderRadius: "8px",
          padding: "5px",
        }}
      >
        don&#39;t have an account?
        <Link href={"/auth/register"}> create account</Link>
      </p>
    </div>
  );
};

export default LoginView;
