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
      <div className="max-w-2xl mx-auto shadow-topic my-20 rounded-lg">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10">
          <div className="flex flex-col mb-3">
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
              className="border-primary border rounded-lg px-2 py-3"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="mb-2">
              Heslo
            </label>
            <input
              type="password"
              placeholder="Heslo"
              id="password"
              name="password"
              value={password}
              className="border-primary border rounded-lg px-2 py-3"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-10 border-primary border px-6 py-3 rounded-lg bg-secondary text-white font-medium hover:bg-black transition-colors"
          >
            Přihlásit se
          </button>
        </form>
      </div>
    </Primary>
  );
}
