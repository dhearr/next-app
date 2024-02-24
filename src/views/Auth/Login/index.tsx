import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {
  const [isLaoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        e.target.reset();
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className={styles.login__form__item__input}
            />
          </div>
          <button
            type="submit"
            className={styles.login__form__item__button}
            disabled={isLaoding}
          >
            {isLaoding ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <p className={styles.login__link}>
        Don&#39;t Have an account? <Link href="/auth/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginView;
