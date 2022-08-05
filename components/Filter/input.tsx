import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="border border-gray-300 bg-gray-100 rounded px-2 text-gray-600"
  />
);
