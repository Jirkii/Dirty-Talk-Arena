import { FC } from "react";

interface InputProps {
  type: string;
  label: string;
  id: string;
  name: string;
}

const Input: FC<InputProps> = ({ type, label, id, name }) => {
  return (
    <>
      <div className="mb-5 flex flex-col">
        <label className="mb-1" htmlFor={id}>
          {label}:
        </label>
        <input
          type={type}
          name={name}
          id={id}
          className="rounded-full px-3 py-2 border-secondary border w-full"
        />
      </div>
    </>
  );
};

export default Input;
