import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore.js";
import { Link } from "react-router";


const LognPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className=" gradient-background-app min-h-screen flex items-center justify-center ">
      <div className="border rounded-3xl p-8 py-10 rounded shadow-md w-full max-w-md">
        <h2 className="text-[27px] font-bold mb-6 text-center  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border-b  bg-transparent border-gray-300 rounded-md shadow-sm   outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 bg-transparent border-b  border-gray-300 rounded-md shadow-sm outline-none "
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-end text-[15px] text-blue-500  ">
            <Link to={"/signup"} className="hover:underline">
              Create a New account
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full ${
              isLoggingIn ? "bg-gray-400" : "bg-blue-600"
            } text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none `}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LognPage