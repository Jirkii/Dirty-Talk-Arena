import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Primary from "@/components/primary/Primary";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", { email, password });
      console.log("User authenticated:", response.data.user);
      router.push("/");
    } catch (error) {
      console.error("Authentication failed:", error.response.data.message);
    }
  };

  return (
    <Primary>
      <section className="max-w-md mx-auto py-10">
        <div className="flex items-center mb-12 gap-3 justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9348 13.1725C15.3654 13.3446 15.5817 13.8402 15.3237 14.2255C15.0294 14.665 14.6493 15.0442 14.2032 15.3386C13.522 15.7881 12.7196 16.0185 11.9037 15.9988C11.0878 15.9792 10.2975 15.7104 9.6387 15.2287C9.20726 14.9131 8.8458 14.5161 8.573 14.0629C8.33384 13.6656 8.57376 13.181 9.01216 13.0299C9.45056 12.8788 9.91919 13.1274 10.2157 13.4839C10.3367 13.6294 10.4756 13.7603 10.63 13.8732C11.0122 14.1527 11.4708 14.3087 11.9441 14.3201C12.4175 14.3315 12.883 14.1978 13.2782 13.937C13.4379 13.8316 13.583 13.7076 13.7108 13.5681C14.0241 13.2262 14.5042 13.0005 14.9348 13.1725Z"
              fill="#B6FFBD"
            />
            <path
              d="M15 9V10M9 9V10M7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21Z"
              stroke="#B6FFBD"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="font-bold text-3xl text-center">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="mb-2">
              E-mail
            </label>
            <input
              type="email"
              placeholder="E-mail"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="mb-2">
              Heslo
            </label>
            <input
              type="password"
              placeholder="Heslo"
              id="password"
              name="password"
              value={password}
              className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 font-bold text-sm bg-blue-bg rounded hover:bg-black transition-colors mt-2 md:mt-0 flex gap-2 items-center"
          >
            Přihlásit se
          </button>
        </form>
      </section>
    </Primary>
  );
}
