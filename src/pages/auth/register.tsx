import Link from "next/link";

const RegisterPage = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <p>
        already have an account?
        <Link href={"/auth/login"}> Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
