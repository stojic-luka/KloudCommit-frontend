import LoginForm from "../components/login/loginForm";
import SignUpForm from "../components/login/signUpForm";

export default function Login() {
  return (
    <>
      <div className="w-full flex justify-center flex-row my-auto p-6">
        <LoginForm />
        <SignUpForm />
      </div>
    </>
  );
}
