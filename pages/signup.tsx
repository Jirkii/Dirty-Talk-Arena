import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Primary from "@/components/primary/Primary";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [validationEmail, setValidationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const [name, setName] = useState("");
  const [validationName, setValidationName] = useState("");
  const [color, setColor] = useState("");
  const [logo, setLogo] = useState("");
  const router = useRouter();

  const fetchNewColorAndLogo = async () => {
    const { data } = await axios.get("/api/signup");
    setColor(data.color);

    // Pokud je to první načtení stránky, nastavíme logo
    if (!logo) {
      setLogo(data.logo);
    }
  };

  // Načtěte barvu a logo při načtení stránky
  useEffect(() => {
    fetchNewColorAndLogo();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validace
    if (!email || !email.includes("@")) {
      return setValidationEmail("Neplatný e-mail.");
    }
    if (!password || password.length < 6) {
      return setValidationPassword("Heslo musí mít alespoň 6 znaků.");
    }
    if (!name || name.length < 2) {
      return setValidationName("Jméno musí mít alespoň 2 znaky.");
    }

    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
        name,
        color,
        logo,
      });
      console.log("User registered:", response.data.user);
      router.push(response.data.redirectTo);
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
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
            className=""
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
          <h1 className="font-bold text-3xl text-center">Registrace</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
              onChange={e => setEmail(e.target.value)}
              className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
            />
            {validationEmail && (
              <p className="text-red-500 text-xs mt-1">{validationEmail}</p>
            )}
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
              onChange={e => setPassword(e.target.value)}
              className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
            />
            {validationPassword && (
              <p className="text-red-500 text-xs mt-1">{validationPassword}</p>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-black-input p-3 w-full rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:border-transparent focus:ring-black-textInput text-black-textInput"
            />
            {validationName && (
              <p className="text-red-500 text-xs mt-1">{validationName}</p>
            )}
          </div>
          <div className="flex gap-3 items-center justify-center mb-7">
            <div
              className="w-16 h-16 rounded-full"
              style={{ backgroundColor: color }}
            >
              <img src={`/img/user-monkeys/${logo}`} className="w-full"></img>
            </div>
            <div className="">
              <span>{name}</span>
              <button
                type="button"
                className="flex items-center gap-1 text-green underline"
                onClick={fetchNewColorAndLogo}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.50016 2.16665C5.01136 2.16665 3.69708 2.91754 2.91673 4.06248H4.3335V5.14581H1.0835V1.89581H2.16683V3.24963C3.15473 1.93463 4.72763 1.08331 6.50016 1.08331C9.49168 1.08331 11.9168 3.50844 11.9168 6.49998H10.8335C10.8335 4.10674 8.89341 2.16665 6.50016 2.16665ZM2.16683 6.49998C2.16683 8.89322 4.10693 10.8333 6.50016 10.8333C7.98899 10.8333 9.30323 10.0824 10.0836 8.93748H8.66683V7.85415H11.9168V11.1041H10.8335V9.7503C9.8456 11.0653 8.27271 11.9166 6.50016 11.9166C3.50862 11.9166 1.0835 9.4915 1.0835 6.49998H2.16683Z"
                    fill="currentColor"
                  />
                </svg>
                Změna barvy
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 w-full  py-3 font-bold text-sm bg-blue-bg rounded hover:bg-black transition-colors mt-2 md:mt-0"
          >
            Registrovat
          </button>
        </form>
      </section>
    </Primary>
  );
}
