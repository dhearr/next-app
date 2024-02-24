import Link from "next/link";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const [isLaoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
      fullname: e.target.fullname.value,
      password: e.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      e.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="fullname"
              className={styles.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Fullname"
              required
              className={styles.register__form__item__input}
            />
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className={styles.register__form__item__input}
            />
          </div>
          <button
            type="submit"
            className={styles.register__form__item__button}
            disabled={isLaoding}
          >
            {isLaoding ? "Loading..." : "register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? <Link href="/auth/login">Sign In</Link>
      </p>
    </div>
  );
};

export default RegisterView;
