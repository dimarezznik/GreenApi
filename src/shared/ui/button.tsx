import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} bg-blue-500 cursor-pointer text-white w-full rounded-xl p-2 hover:bg-blue-600 active:bg-blue-700`}
    >
      {children}
    </button>
  );
};
