import { FC } from "react";

interface ButtonProps {
  label: string;
}

const Button: FC<ButtonProps> = ({ label }) => {
  return (
    <button
      className="bg-secondary rounded-full px-5 py-3 text-white font-semibold hover:bg-black"
      type="submit"
    >
      {label}
    </button>
  );
};

export default Button;
