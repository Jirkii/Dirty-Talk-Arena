/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

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
        avatar: "url('/img/svg/avatar.svg')",
      },
      colors: {
        black: {
          bg: " #262626",
          input: "#363636",
          textInput: "#C2C2C2",
          textSecondary: "#A4A4A4",
          border: "#505050",
          stars: "#D6D6D6",
        },
        blue: {
          bg: "#4f46e5",
        },
        green: "#B6FFBD",
        purple: "#E879F9",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
