import { FormEvent, useState } from "react";
import useSignUp from "../../hooks/auth/useSignUp";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading, error } = useSignUp();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(username, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 mx-5 bg-white shadow-md rounded px-8 pt-6 pb-8 border-gray-100 border-2">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="signup-username" className="block text-gray-700 text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          id="signup-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signup-email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="signup-password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        {error && <h1 className="text-red-800 text-center font-bold">{error}</h1>}
      </div>
      <div className="flex flex-row">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
          disabled={isLoading}
        >
          Sign Up
        </button>
        {isLoading && <ThreeDots color="#3b82f6" height="40px" width="50px" wrapperClass="px-5" />}
      </div>
    </form>
  );
}
