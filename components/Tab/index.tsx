import { ReactNode } from "react";

export const Tab = ({
  children,
  onClick,
  isActive = false,
}: {
  children: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-3 border-b-4 font-light text-gray-600 ${
        isActive ? " border-blue-500" : " border-transparent"
      }`}
    >
      {children}
    </button>
  );
};
