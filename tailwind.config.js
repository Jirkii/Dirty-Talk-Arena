/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        topic: "0 0 20px 0 rgba(0,0,0,0.72)",
        messageList: "0 0 20px 0 rgba(0,0,0,0.3)",
        messageItem: "0 0 20px 0 rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "avatar": "url('/avatar.svg')",
      },
      colors: {
        primary: "#D9D9D9",
        secondary: "#940000",
      },
    },
  },
  plugins: [],
};
