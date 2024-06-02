import { FormEvent, useState } from "react";
import useLogin from "../../hooks/auth/useLogin";
import { ThreeDots } from "react-loader-spinner";

/**
 * Renders a login form component with input fields for email and password.
 * Handles form submission by calling the `login` function with the entered values.
 *
 * @return {JSX.Element} The login form component.
 */
export default function LoginForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 border-gray-100 border-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label htmlFor="login-username" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input type="text" id="login-username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-6">
        <label htmlFor="login-password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <h1 className="text-red-800 text-center font-bold">{error}</h1>}
      </div>
      <div className="flex flex-row">
        <button type="submit" className="btn-blue" disabled={isLoading}>
          Login
        </button>
        {isLoading && <ThreeDots color="#3b82f6" height="40px" width="50px" wrapperClass="px-5" />}
      </div>
    </form>
  );
}
