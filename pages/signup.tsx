import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Primary from "@/components/primary/Primary";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
        name,
      });
      console.log("User registered:", response.data.user);
      router.push(response.data.redirectTo);
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
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
              name="email"
              placeholder="E-mail"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-primary border rounded-lg px-2 py-3"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="mb-2">
              Heslo
            </label>
            <input
              type="password"
              name="password"
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-primary border rounded-lg px-2 py-3"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-2">
              Přezdívka
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-primary border rounded-lg px-2 py-3"
            />
          </div>
          <button
            type="submit"
            className="mt-10 border-primary border px-6 py-3 rounded-lg bg-secondary text-white font-medium hover:bg-black transition-colors"
          >
            Registrovat
          </button>
        </form>
      </div>
    </Primary>
  );
}
