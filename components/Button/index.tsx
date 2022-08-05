import { ButtonHTMLAttributes, ReactNode } from "react";

export const Button = ({
  children,
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className=" bg-blue-500 border-0 z-10 rounded text-white hover:bg-blue-800 disabled:bg-gray-400 disabled:text-gray-600"
      {...props}
    >
      {children}
    </button>
  );
};
